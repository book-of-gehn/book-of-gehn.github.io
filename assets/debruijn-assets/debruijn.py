from more_itertools import collapse, take

'''
>>> import sys
>>> sys.path.append("./_posts/debruijn")
>>> from debruijn import _FKM_recursive, _test_is_debruijn_seq, debruijn
'''

from enum import Enum
class FMK_Sequece_Type(Enum):
    PreNecklaces = 1
    LyndonWords = 2
    Necklaces = 3
    DeBruijn = 4

def _FKM_recursive(k_alphabet, n_length, seq_type=FMK_Sequece_Type.DeBruijn):
    ''' Build a cyclic De Bruijn sequence of substrings of <n>
        length that can be formed from the alphabet of <k> symbols
        (the natural numbers 0, 1, 2, .., k-1).

        The algorithm is based on Frank Ruskey's "Combinatorial Generation"
        which it is a description of the FKM algorithm (recursive
        version) (Fredricksen, Kessler and Maiorana).

        It is a generator that yield subsequences of symbols (integers):

        >>> tuple(_FKM_recursive(k_alphabet=2, n_length=4))
        ([0], [0, 0, 0, 1], [0, 0, 1, 1], [0, 1], [0, 1, 1, 1], [1])

        To obtain a generator of symbols (integers) you can use more_itertools

        >>> from more_itertools import collapse
        >>> tuple(collapse(_FKM_recursive(k_alphabet=2, n_length=4)))
        (0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1)

        It requires O(k*n) memory and runs faster than linear
        respect count of the substrings however the current implementation
        is recursive which may be a problem for larger inputs.

        >>> k, n = 2, 2
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True

        >>> k, n = 2, 3
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True

        >>> k, n = 2, 4
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True

        >>> k, n = 2, 5
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True

        >>> k, n = 3, 2
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True

        >>> k, n = 4, 3
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True

        >>> k, n = 3, 4
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True

        >>> k, n = 4, 5
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True

        >>> k, n = 6, 5
        >>> _test_is_debruijn_seq(_FKM_recursive(k, n), k_alphabet=k, n_length=n, is_cyclic=True)
        True
    '''
    k = k_alphabet
    n = n_length

    if k == 1:
        yield 0
        return

    a = [0] * k * n

    if seq_type == FMK_Sequece_Type.PreNecklaces:
        yield from _FMK_gen_prenecklaces(1, 1, a, k, n)
    elif seq_type == FMK_Sequece_Type.LyndonWords:
        yield from _FMK_gen_lyndon_words(1, 1, a, k, n)
    elif seq_type == FMK_Sequece_Type.Necklaces:
        yield from _FMK_gen_necklaces(1, 1, a, k, n)
    elif seq_type == FMK_Sequece_Type.DeBruijn:
        yield from _FMK_gen_debruijn(1, 1, a, k, n)
    else:
        raise ValueError("Unknown sequece type")


def _FMK_gen_prenecklaces(t, p, a, k, n):
    if t > n:
        yield a[1:n+1]
    else:
        a[t] = a[t - p]
        yield from _FMK_gen_prenecklaces(t + 1, p, a, k, n)
        for j in range(a[t - p] + 1, k):
            a[t] = j
            yield from _FMK_gen_prenecklaces(t + 1, t, a, k, n)

def _FMK_gen_lyndon_words(t, p, a, k, n):
    if t > n:
        if p == n:
            yield a[1:n+1]
    else:
        a[t] = a[t - p]
        yield from _FMK_gen_lyndon_words(t + 1, p, a, k, n)
        for j in range(a[t - p] + 1, k):
            a[t] = j
            yield from _FMK_gen_lyndon_words(t + 1, t, a, k, n)

def _FMK_gen_necklaces(t, p, a, k, n):
    if t > n:
        if  n % p == 0:
            yield a[1:n+1]
    else:
        a[t] = a[t - p]
        yield from _FMK_gen_necklaces(t + 1, p, a, k, n)
        for j in range(a[t - p] + 1, k):
            a[t] = j
            yield from _FMK_gen_necklaces(t + 1, t, a, k, n)

def _FMK_gen_debruijn(t, p, a, k, n):
    if t > n:
        if n % p == 0:
            yield a[1:p+1]
    else:
        a[t] = a[t - p]
        yield from _FMK_gen_debruijn(t + 1, p, a, k, n)
        for j in range(a[t - p] + 1, k):
            a[t] = j
            yield from _FMK_gen_debruijn(t + 1, t, a, k, n)

def debruijn(k_alphabet, n_length, cyclic=True):
    ''' Build a cyclic De Bruijn sequence of substrings of <n>
        length that can be formed from the alphabet of <k> symbols
        (the natural numbers 0, 1, 2, .., k-1).

        A De Bruijn sequence is the minimum sequence that contains
        all the possible substrings of length <n> that you can build
        from a set of <k> symbols.

        For example, for the symbols {0,1} (k=2), you can have 4
        different 2-length substrings: 00, 01, 10 and 11.

        The De Bruijn sequence is then:

        >>> sequence = tuple(debruijn(k_alphabet=2, n_length=2))
        >>> sequence
        (0, 0, 1, 1)

        From 0011 you can read with a sliding window of 2 character size
        all the possible substrings: [00]11, 0[01]1, 00[11].

        The De Bruijn sequence is cyclic so te get the missing substring
        you need to wrap around: 0]01[1

        If you prefer, `debruijn` can return a non-cyclic "full" sequence:

        >>> sequence = tuple(debruijn(k_alphabet=2, n_length=2, cyclic=False))
        >>> sequence
        (0, 0, 1, 1, 0)

        If <k_alphabet> is a sequence or a mapping, it will be used
        to translate the natural numbers yielded by the function
        into those symbols.

        For example the following sequence defines 2 symbols (False, True):

        >>> symbols = 'FT'

        Therefore the De Bruijn sequence for (2, 4) is:

        >>> sequence = tuple(debruijn(k_alphabet=symbols, n_length=4))
        >>> sequence
        ('F', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 'T')

        It is responsability of the caller than <k_alphabet> has no duplicated
        symbols.

        Other sequences types are possible like list of words:

        >>> symbols = ['False', 'True']
        >>> sequence = tuple(debruijn(k_alphabet=symbols, n_length=2))
        >>> sequence
        ('False', 'False', 'True', 'True')

        Or even a mapping is accepted:

        >>> symbols = {0: 'False', 1: 'True'}
        >>> sequence = tuple(debruijn(k_alphabet=symbols, n_length=2))
        >>> sequence
        ('False', 'False', 'True', 'True')

        To yield a full non-cyclic De Bruijn sequence, you can do:

        >>> symbols = {0: 'False', 1: 'True'}
        >>> sequence = tuple(debruijn(k_alphabet=symbols, n_length=2, cyclic=False))
        >>> sequence
        ('False', 'False', 'True', 'True', 'False')
    '''

    if isinstance(k_alphabet, int):
        k = k_alphabet
        int2sym = None
    else:
        k = len(k_alphabet)
        if not hasattr(k_alphabet, '__getitem__'):
            raise TypeError("The k_alphabet must be an integer of a sequence/mapping.")
        int2sym = k_alphabet

    n = n_length

    gen = collapse(_FKM_recursive(k, n))
    if int2sym is None:
        if cyclic:
            yield from gen
        else:
            head = take(n-1, gen) # return a list
            yield from head
            yield from gen
            yield from head
    else:
        if cyclic:
            yield from (int2sym[s] for s in gen)
        else:
            head = take(n-1, gen)
            yield from (int2sym[s] for s in head)
            yield from (int2sym[s] for s in gen)
            yield from (int2sym[s] for s in head)


def _test_is_debruijn_seq(seq, k_alphabet, n_length, is_cyclic):
    ''' Test whatever the given sequence is a De Bruijn sequence
        for a set of <k> symbols and substrings of <n> length.

        >>> seq = tuple('00010111')
        >>> k, n = 2, 3

        >>> _test_is_debruijn_seq(seq, k, n, is_cyclic=True)
        True

        >>> seq = tuple('00000100011001010011101011011111')
        >>> k, n = 2, 5

        >>> _test_is_debruijn_seq(seq, k, n, is_cyclic=True)
        True

        >>> seq = tuple('0000111101100101')
        >>> k, n = 2, 4

        >>> _test_is_debruijn_seq(seq, k, n, is_cyclic=True)
        True

        >>> seq = tuple('aabacadbbcbdccdd')
        >>> k, n = 4, 2

        >>> _test_is_debruijn_seq(seq, k, n, is_cyclic=True)
        True

    '''

    k = k_alphabet
    n = n_length

    seq = tuple(collapse(seq))
    if is_cyclic:
        # make the sequence no-cyclic; makes the further
        # algorithm easier
        seq += seq[:n-1]

    substrings = set()
    for i in range(len(seq)-n+1):
        s = seq[i:i+n]
        assert len(s) == n
        if s in substrings:
            print("The substring '%s' is duplicated at index %i" % (s, i))
            return False

        substrings.add(s)

    expected_count = k**n
    if len(substrings) != expected_count:
        print(
          "Expected to have %i unique substrings of length n=%i for a set of k=%i symbols but found %i unique substrings." %
            (expected_count, n, k, len(substrings))
            )
        return False

    return True
