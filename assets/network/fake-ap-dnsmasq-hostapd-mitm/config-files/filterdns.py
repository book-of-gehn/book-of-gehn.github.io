
# apt-get install build-essential python3-dev libnetfilter-queue-dev
# pip install NetfilterQueue scapy
from netfilterqueue import NetfilterQueue
import socket
from scapy.all import *

def handle(nfpkt):
    pkt = IP(nfpkt.get_payload())

    # Check if it's a DNS query packet (qr=0)
    if DNS in pkt and pkt[DNS].qr == 0:
        queries = pkt[DNS].qd

        for query in queries:
            # Check for A (IPv4) and AAAA (IPv6)
            if query.qtype != 1 and query.qtype != 28:
                nfpkt.drop()
                return

        nfpkt.accept()
        return True

    nfpkt.drop()
    return


nfqueue = NetfilterQueue()
nfqueue.bind(1, handle)
s = socket.fromfd(nfqueue.get_fd(), socket.AF_UNIX, socket.SOCK_STREAM)
try:
    nfqueue.run_socket(s)
except KeyboardInterrupt:
    pass
finally:
    s.close()
    nfqueue.unbind()
