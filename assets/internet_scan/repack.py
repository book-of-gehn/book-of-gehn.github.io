import ijson
import sys
import pickle
import pandas as pd
from tqdm import tqdm
import ipaddress
import numpy as np

#   {
#       'ip': '165.221.32.138',
#       'timestamp': '1619562631',
#       'ports': [
#           {
#               'port': 21,
#               'proto': 'tcp',
#               'status': 'open',
#               'reason': 'syn-ack',
#               'ttl': 245
#           }
#       ]
#   }
hosts = ijson.items(sys.stdin, 'item')

from pandas.api.types import CategoricalDtype

reason_cat = CategoricalDtype([
    'syn-ack',
    'syn-ack-ece-cwr',
    'syn-ack-ece',
    'syn-psh-ack',
    'syn-ack-cwr',
    'fin-syn-ack'
    ])

port_cat = CategoricalDtype([
    '21',
    '22',
    '23',
    '80',
    '443',
    '3389',
    '4444',
    '5601',
    '8000',
    '8443',
    '9200',
    ])


def save_df(rows, fileno):
    global reason_cat, port_cat

    columns = ['ip', 'timestamp', 'port', 'ttl', 'reason']
    df = pd.DataFrame(rows, columns=columns)

    # clean up
    rows.clear()

    # We use the same 'reason' categories to be consistent across
    # multiple dataframes.
    # This is critical because merging/concatenating two dataframes
    # with different (but semantically-equivalent) category sets will
    # *not* raise any error but it will convert the column(s) into
    # object type
    # The same for 'port'.
    # The rest of the re-typing is for using smaller data types.
    df = df.astype({
        'ip': np.uint32,
        'timestamp': np.uint32,
        'port': port_cat,
        'ttl': np.uint8,
        'reason': reason_cat
        })

    # Save. 'brotli' yielded better compression ratio
    # when compared with snappy y gzip.
    compression = 'brotli'
    df.to_parquet(
            f'scan{fileno:04}.pq',
            compression=compression,
            version='2.0'
            )

    df = df[['ip', 'port', 'ttl', 'reason']].groupby('ip').agg({
        'port': 'count',
        'ttl': ['min', 'max'],
        'reason': 'nunique',
    })

    # groupby() makes 'ip' the new index and agg() makes the aggregated
    # columns a 2-level columns (MultiIndex)
    # To access TTL minimum we will have to write df['ttl']['min'].
    # We don't have this complexity so we can remap the columns
    # so the above is named now as 'ttl_min'.
    df.columns = df.columns.map('_'.join)

    # now we reset the index. This has two effects: the MultiIndex
    # disappears and the 'ip' is not longer an index.
    df = df.reset_index()

    # We know that the dataset has less than 255 ports and reasons
    # so uint8 is enough
    df = df.astype({
        'ip': np.uint32,
        'port_count': np.uint8,
        'reason_count': np.uint8
        })

    df.to_parquet(
            f'agg{fileno:04}.pq',
            compression=compression,
            version='2.0'
            )

# https://www.kaggle.com/signalspikes/internet-port-scan-1
# all the ports in the dataset are TCP Open ports
N = 64802621
bucket_size = 5000000
i = 0
rows = []
fileno = 0
for host in tqdm(hosts, total=N):
    ip, timestamp, ports = host['ip'], int(host['timestamp']), host['ports']

    ip = ipaddress.ip_address(ip)
    assert ip.version == 4

    ip = int(ip)

    for port in ports:
        num, proto, ttl = int(port['port']), port['proto'], int(port['ttl'])
        status, reason = port['status'], port['reason']

        assert proto == 'tcp'
        assert status == 'open'
        assert ttl < 256

        # ensure string type so Parquet understands that it is
        # a categorical type and not a quantity
        num = str(num)
        rows.append((ip, timestamp, num, ttl, reason))

    i += 1
    if i % bucket_size == 0:
        save_df(rows, fileno)
        fileno += 1

if rows:
    save_df(rows, fileno)

assert not rows
