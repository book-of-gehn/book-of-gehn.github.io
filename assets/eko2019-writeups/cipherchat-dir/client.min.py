# -*- coding: utf-8 -*-
# uncompyle6 version 3.4.0
# Embedded file name: client.min.py
# Compiled at: 2019-09-07 23:02:48
# Size of source mod 2**32: 1193 bytes
import socket
import sys
key_seed = 0
key_shift = 0

def encxor(t):
    out = ''
    key = key_seed
    for n in t.encode('latin-1'):
        if n == 0:
            break

        while 1:
            x = n ^ key
            key = (key + key_shift) % 256
            if x == 0 or x == key:
                pass
            else:
                break

        out += chr(x)

    out += chr(0)
    return out.encode('latin-1')

print('# Connecting')
try:
    sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    ip = socket.gethostbyname('localhost')
    sk.connect((ip, 12345))
    _, port = sk.getsockname()
    key_seed = (port & 65280) >> 8
    key_shift = port & 255
    res1 = encxor(sk.recv(4096).decode('latin-1')).decode('latin-1')
    print('{}'.format(res1))
except socket.error:
    print('Failed to connect')
    sys.exit()
else:
    print('> ', end='', flush=True)
    for line in sys.stdin:
        res2 = encxor(line.rstrip())
        try:
            sk.send(res2)
            res1 = encxor(sk.recv(4096).decode('latin-1')).decode('latin-1')
        except socket.error:
            print('Connection error')
            sys.exit(1)
        else:
            if res1[0:3] == 'Bye':
                break
            print('{}'.format(res1))
            print('> ', end='', flush=True)

    sk.close()
