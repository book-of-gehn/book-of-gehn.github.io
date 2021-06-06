import numpy as np
import struct

from collections import namedtuple
from Crypto.Cipher import AES
from cryptonita import B

'''
>>> from cryptonita import B

>>> import sys
>>> sys.path.append("./assets/matasano")

>>> from challenge import *

'''

SecretConfig = namedtuple('SecretConfig', ['rnd', 'key', 'iv', 'enc_mode',
                                           'prefix', 'posfix',
                                           'pad_mode', 'nonce', 'lnonce',
                                           'n8', 'n16', 'n32', 'n64',
                                           'kargs'])

def generate_config(config=None, **kargs):
    r'''Generate a pseudo random configuration suitable for the challenges.

        To make the output random but consistent, pass a fixed seed as the
        random state:

        >>> r = 42
        >>> c = generate_config(random_state=r)

        >>> (c.key, c.iv)
        ('f\xdc\xe1_\xb3=\xea\xcb\\\x03b\xf3\x0e\x95\xf5.',
         'j\xf4c\xbbG\xd4\x99\xc7\xbc\xaeA\x99\x14,\xcb\x98')

        To prove that it is random, pick another seed:

        >>> c = generate_config(random_state=r+1)
        >>> (c.key, c.iv)
        ('D7t\x1d@M2\x7f\xff\xc8\xeb\x9b1\x9fX\x1a',
         '\x15\xe9%":\xf8\x15&\x10H\x97=3\xe1\x10,')

        Now, if you want one of the attribute to be fixed, just pass it
        as a parameter:

        >>> c = generate_config(random_state=r, key='AAAABBBB')
        >>> (c.key, c.iv)
        ('AAAABBBB', 'j\xf4c\xbbG\xd4\x99\xc7\xbc\xaeA\x99\x14,\xcb\x98')

        Notice how in the last output we got the same random iv that we got
        when the r was 42 some examples above. This is because, internally,
        each call to generate_config will generate/consume the same amount
        of random bytes so no matter how many other attributes are fixed
        (like the key in this case), the random attribute will get the same
        value for a fixed seed.

        Now, given a previous created configuration we can update it: all
        its random attributes will be regenerated again, its fixed attributes
        will remain constant.

        >>> c = generate_config(config=c)
        >>> (c.key, c.iv)
        ('AAAABBBB', 'H\xebSs\xa68\xa7\x10\x11Ue\x03\x83)\xea\xf2')

        You can fix additional parameters

        >>> c = generate_config(config=c, iv='CCCCDDDD')
        >>> (c.key, c.iv)
        ('AAAABBBB', 'CCCCDDDD')

        And you can even unfix (make it random) again:

        >>> c = generate_config(config=c, iv=None)
        >>> (c.key, c.iv)
        ('AAAABBBB', '\xcd5\x97\xb6\x82jR\xd9\x00\xcf\xc2\xc2\x04D\xc3\xb8')

    '''
    if config is not None:
        prev_kargs = config.kargs.copy()
        prev_kargs.update(kargs)
        kargs = prev_kargs

    random_state = kargs.get('random_state', 0)
    if not isinstance(random_state, np.random.RandomState):
        random_state = np.random.RandomState(random_state)
    kargs['random_state'] = random_state

    block_size = kargs.get('block_size', 16)
    kargs['block_size'] = block_size

    min_size = kargs.get('min_size', max(block_size//4, 1))
    kargs['min_size'] = min_size

    assert min_size <= block_size

    tmp = random_state.bytes(block_size)
    key = kargs.get('key')
    if key is None:
        key = B(tmp)

    tmp = random_state.bytes(block_size)
    iv = kargs.get('iv')
    if iv is None:
        iv = B(tmp)

    tmp = random_state.randint(2)
    enc_mode = kargs.get('enc_mode')
    if enc_mode is None:
        enc_mode = ['ecb', 'cbc'][tmp]

    tmp = random_state.bytes(block_size)
    # between min (inclusive) and block_size (not inclusive)
    tmp = tmp[:random_state.randint(min_size, block_size)]
    prefix = kargs.get('prefix')
    if prefix is None:
        prefix = B(tmp)

    tmp = random_state.bytes(block_size)
    # between min (inclusive) and block_size (not inclusive)
    tmp = tmp[:random_state.randint(min_size, block_size)]
    posfix = kargs.get('posfix')
    if posfix is None:
        posfix = B(tmp)

    tmp = random_state.randint(1)
    pad_mode = kargs.get('pad_mode')
    if pad_mode is None:
        pad_mode = ['pkcs#7'][tmp]

    tmp = random_state.bytes(16)
    nonce = kargs.get('nonce')
    if nonce is None:
        nonce = B(tmp)

    tmp = random_state.bytes(128)
    lnonce = kargs.get('lnonce')
    if lnonce is None:
        lnonce = B(tmp)

    tmp = random_state.bytes(1+2+4+8)
    n8, n16, n32, n64 = struct.unpack('>BHIQ', tmp)
    n8 = kargs.get('n8', n8)
    n16 = kargs.get('n16', n16)
    n32 = kargs.get('n32', n32)
    n64 = kargs.get('n64', n64)

    return SecretConfig(random_state, key, iv, enc_mode, prefix, posfix, pad_mode,
            nonce, lnonce, n8, n16, n32, n64, kargs)

def encrypt(block, key, block_size):
    r'''Encrypt the given block with the given key using AES.
        The block's size must be equal to <block_size> and
        it must by 16, 24 or 32 bytes.

            >>> key = 'aaaabbbbccccdddd'
            >>> c = encrypt(B('AAAABBBBCCCCDDDD'), key, 16)
            >>> c
            '\x9c\x00\x16G\xeaO\xbb\xadX\xafmR\xef\xf2\x12\x07'

            >>> p = decrypt(c, key, 16)
            >>> p
            'AAAABBBBCCCCDDDD'

        Shorter blocks need padding. Larger blocks need to chain
        the encryption using ECB, CBC, ...

        Neither of those services are provided by this function and
        it will fail in those scenarios.

            >>> encrypt(B('shorter'), key, 16)
            Traceback (most recent call last):
            <...>
            ValueError: Invalid block size. Found 7 but expected 16. Padding of shorter blocks or chaining of longer blocks are up to you.

            >>> encrypt(B('larger' * 10), key, 16)
            Traceback (most recent call last):
            <...>
            ValueError: Invalid block size. Found 60 but expected 16. Padding of shorter blocks or chaining of longer blocks are up to you.

    '''
    if len(block) != block_size:
        raise ValueError("Invalid block size. Found %i but expected %i. Padding of shorter blocks or chaining of longer blocks are up to you." % (len(block), block_size))

    if block_size not in (16, 24, 32):
        raise ValueError("Invalid block size. Block size of %i is not supported by AES." % block_size)

    # create a AES object on each call. This is totally inefficient
    # but it is for learning purposes:
    #   we want to implement ECB, CBC and others ourselves
    return B(AES.new(key, AES.MODE_ECB).encrypt(block))

def decrypt(block, key, block_size):
    if len(block) != block_size:
        raise ValueError("Invalid block size. Found %i but expected %i. Padding of shorter blocks or chaining of longer blocks are up to you." % (len(block), block_size))

    # create a AES object on each call. See encrypt
    return B(AES.new(key, AES.MODE_ECB).decrypt(block))


def enc_ecb(plaintext, key, block_size=16):
    r'''Encrypt the plaintext in ECB mode with the given key and given
        block_size.

            >>> key = 'aaaabbbbccccdddd'

            >>> c = enc_ecb(B('AAAABBBBCCCCDDDD' * 2), key, 16)
            >>> p = dec_ecb(c, key, 16)

            >>> p
            'AAAABBBBCCCCDDDDAAAABBBBCCCCDDDD'

        If the plaintext's size is not multiple of block_size, raise an
        exception.
        It is up to you to pad the input first.

            >>> enc_ecb(B('AAAABBBBCCCCDDDD333'), key, 16)
            Traceback (most recent call last):
            <...>
            ValueError: Invalid message size. Found 19 which is not divisible by 16. Padding of shorter messages is up to you.

    '''
    if len(plaintext) % block_size != 0:
        raise ValueError("Invalid message size. Found %i which is not divisible by %i. Padding of shorter messages is up to you." % (len(plaintext), block_size))

    cipher_blocks = (encrypt(b, key, block_size) for b in plaintext.nblocks(block_size))
    return B(b''.join(cipher_blocks))

def dec_ecb(ciphertext, key, block_size=16):
    if len(ciphertext) % block_size != 0:
        raise ValueError("Invalid message size. Found %i which is not divisible by %i. Padding of shorter messages is up to you." % (len(ciphertext), block_size))

    plain_blocks = (decrypt(b, key, block_size) for b in ciphertext.nblocks(block_size))
    return B(b''.join(plain_blocks))


def enc_cbc(plaintext, key, iv):
    r'''Encrypt the plaintext in CBC mode with the given key and given
        initialization vector.

        The block's size is taken from the length of the initialization
        vector directly.

            >>> key = 'aaaabbbbccccdddd'
            >>> iv  = B('1111222233334444')

            >>> c = enc_cbc(B('AAAABBBBCCCCDDDD' * 2), key, iv)
            >>> p = dec_cbc(c, key, iv)

            >>> p
            'AAAABBBBCCCCDDDDAAAABBBBCCCCDDDD'

        If the plaintext's size is not multiple of block_size, raise an
        exception.
        It is up to you to pad the input first.

            >>> enc_cbc(B('AAAABBBBCCCCDDDD333'), key, iv)
            Traceback (most recent call last):
            <...>
            ValueError: Invalid message size. Found 19 which is not divisible by 16. Padding of shorter messages is up to you.

    '''
    block_size = len(iv)

    if len(plaintext) % block_size != 0:
        raise ValueError("Invalid message size. Found %i which is not divisible by %i. Padding of shorter messages is up to you." % (len(plaintext), block_size))

    prev = iv
    cipher_blocks = []
    for p in plaintext.nblocks(block_size):
        tmp = encrypt(p ^ prev, key, block_size)
        cipher_blocks.append(tmp)
        prev = tmp

    return B(b''.join(cipher_blocks))

def dec_cbc(ciphertext, key, iv):
    block_size = len(iv)

    if len(ciphertext) % block_size != 0:
        raise ValueError("Invalid message size. Found %i which is not divisible by %i. Padding of shorter messages is up to you." % (len(ciphertext), block_size))

    prev = iv
    plain_blocks = []
    for c in ciphertext.nblocks(block_size):
        tmp = decrypt(c, key, block_size)
        plain_blocks.append(tmp ^ prev)
        prev = c

    return B(b''.join(plain_blocks))

def enc_ctr(plaintext, key, nonce, counter=0, block_size=16):
    if isinstance(nonce, int):
        nonce = struct.pack('<Q', nonce)
    else:
        nonce = nonce[:8]

    assert block_size == 16
    cipher_blocks = []
    for pblock in plaintext.nblocks(block_size):
        ctr = struct.pack('<Q', counter)
        src = B(nonce + ctr)

        assert len(src) == block_size

        kstream = encrypt(src, key, block_size)
        cblock = pblock ^ kstream[:len(pblock)]

        cipher_blocks.append(cblock)
        counter += 1

    return B(b''.join(cipher_blocks))

def dec_ctr(ciphertext, key, nonce, counter=0, block_size=16):
    return enc_ctr(ciphertext, key, nonce, counter, block_size)

