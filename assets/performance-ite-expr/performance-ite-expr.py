from z3 import If, BitVec, simplify, Extract, Concat, BitVecVal, Context
from z3 import Solver, And, Or, sat as Sat

def xtime(a):
    thenval = (((a << 1) ^ 0x1B) & 0xFF)
    elseval = (a << 1)
    condval = (a & 0x80)
    return thenval if condval else elseval

def xtime_branch(a):
    elseval = (a << 1)
    thenval = (elseval ^ 0x1B)
    condval = (a & 0x80)
    return If(condval != 0, thenval, elseval)

def xtime_branchless(a):
    elseval = (a << 1)
    thenval = (elseval ^ 0x1B)
    condval = (a >> 7) # it can be 0 or 1
    return elseval ^ ((thenval ^ elseval) & -(condval))

def xtime_broadcasted(a):
    elseval = (a << 1)
    thenval = (elseval ^ 0x1B)
    msb = Extract(7, 7, a)
    condmask = Concat(*([msb] * 8)) # broadcast a single bit to 8 bits
    return elseval ^ ((thenval ^ elseval) & condmask)

def xtime_cancelled(a):
    elseval = (a << 1)
    msb = Extract(7, 7, a)
    condmask = Concat(*([msb] * 8)) # broadcast a single bit to 8 bits
    return elseval ^ (0x1B & condmask)

def verify_correctness(symbolic_xtime):
    ''' Verify that the given symbolic xtime function (modeled with Z3)
        it is equivalent to the original xtime function (Python
        function).

        The verification is done by brute force: we explore the 2**8
        possible pairs of input/output for the xtime (Python) function
        and we compare them with the output of the symbolic function
        (Z3).
    '''
    a = BitVec('a', 8)
    solver = Solver()

    full_search = [And(a == i, symbolic_xtime(a) == xtime(i)) for i in range(256)]
    if solver.check(Or(*full_search)) != Sat:
        raise Exception(f"The model {symbolic_xtime} is not equivalent to {xtime}")

    print(f"{symbolic_xtime.__name__} good")

def null_experiment(symfn, n_rounds, ctx):
    ''' Ignores the symfn and create a null experiment (a trivial
        bitmask operation).

        Use this to have an idea of the minimum resources required
        to operate with Z3.

        n_rounds is ignored (must be 1).
        '''
    assert n_rounds == 1
    elapsed = 0
    a = BitVec('a', 8, ctx)

    begin = now()
    dummy = a == 0x01010101
    elapsed += now() - begin

    return dummy, elapsed


def single_bitvec_experiment(symfn, n_rounds, ctx):
    ''' Explore the 256 different values of a 8 bits BitVec
        computing xtime() for each value and comparing the concrete
        values with the symbolic values.

        n_rounds is ignored (must be 1).
        '''
    assert n_rounds == 1
    elapsed = 0
    a = BitVec('a', 8, ctx)

    correct = [xtime(i) for i in range(256)]

    begin = now()
    full_search = [And(a == i, symfn(a) == correct[i]) for i in range(256)]
    full_search = Or(*full_search)
    elapsed += now() - begin

    return full_search, elapsed

def mix_two_bitvec_experiment(symfn, n_rounds, ctx):
    ''' Explore the 65536 different values of two 8 bits BitVecs
        computing a mix of xors and xtime() operations for each pair
        and comparing the concrete values with the symbolic values.

        n_rounds is ignored (must be 1).
        '''
    assert n_rounds == 1
    elapsed = 0

    A = [BitVec('a%i' % i, 8, ctx) for i in range(2)]
    a = list(A) # preserve original values (A)

    begin = now()
    t = a[0] ^ a[1]
    u = a[0]
    a[0] ^= t ^ symfn(a[0] ^ a[1])
    a[1] ^= t ^ symfn(a[1] ^ u)
    elapsed += now() - begin

    full_search = []
    for B0 in range(256):
        tmp = []
        for B1 in range(256):
            b0, b1 = B0, B1 # preserve original values (B)

            t = b0 ^ b1
            u = b0
            b0 ^= t ^ xtime(b0 ^ b1)
            b1 ^= t ^ xtime(b1 ^ u)

            begin = now()
            eq = And(A[0] == B0, A[1] == B1, a[0] == b0, a[1] == b1)
            elapsed += now() - begin
            tmp.append(eq)

        begin = now()
        or1 = Or(*tmp)
        elapsed += now() - begin
        full_search.append(or1)

    begin = now()
    full_search = Or(*full_search)
    elapsed += now() - begin
    return full_search, elapsed

import numpy as np
def encrypt_rounds_experiment(symfn, n_rounds, ctx, seed=20210610):
    ''' Encrypt symbolically 16 random bytes by mixing and xoring
        the plaintext with a 16 8-bits BitVecs key n_rounds times.
        Then do the same but encrypt concretely the same plaintext
        and 16 random bytes as key.

        Both, the symbolic ciphertext and the concrete ciphertext are
        then compared.
        '''
    elapsed = 0

    def bytes2matrix(text):
        """ Converts a 16-byte array into a 4x4 matrix.  """
        return [list(text[i:i+4]) for i in range(0, len(text), 4)]

    def add_round_key(s, k):
        for i in range(4):
            for j in range(4):
                s[i][j] ^= k[i][j]

    def shift_rows(s):
        s[0][1], s[1][1], s[2][1], s[3][1] = s[1][1], s[2][1], s[3][1], s[0][1]
        s[0][2], s[1][2], s[2][2], s[3][2] = s[2][2], s[3][2], s[0][2], s[1][2]
        s[0][3], s[1][3], s[2][3], s[3][3] = s[3][3], s[0][3], s[1][3], s[2][3]

    def mix_single_column(a, fn):
        # see Sec 4.1.2 in The Design of Rijndael
        t = a[0] ^ a[1] ^ a[2] ^ a[3]
        u = a[0]
        a[0] ^= t ^ fn(a[0] ^ a[1])
        a[1] ^= t ^ fn(a[1] ^ a[2])
        a[2] ^= t ^ fn(a[2] ^ a[3])
        a[3] ^= t ^ fn(a[3] ^ u)

    def mix_columns(s, fn):
        for i in range(4):
            mix_single_column(s[i], fn)

    def do_rounds(keytext, plaintext, fn):
        key_matrix = bytes2matrix(keytext)
        plain_state = bytes2matrix(plaintext)

        add_round_key(plain_state, key_matrix)

        for i in range(n_rounds):
            shift_rows(plain_state)
            mix_columns(plain_state, fn)
            add_round_key(plain_state, key_matrix)

        shift_rows(plain_state)
        add_round_key(plain_state, key_matrix)

        # ciphertext
        return sum(plain_state, [])

    # Arbitrary chosen and fixed key and plain texts
    random_state = np.random.RandomState(seed)
    keytext = random_state.bytes(16)
    plaintext = random_state.bytes(16)

    # Symbolic.....
    K = [BitVec('K%02i' % i, 8, ctx) for i in range(16)]
    P = [BitVecVal(p, 8, ctx) for p in plaintext]
    assert len(K) == len(P) == 16

    begin = now()
    C = do_rounds(K, P, symfn)  # symbolic ciphertext
    elapsed += now() - begin
    assert len(C) == 16

    # Concrete......
    ciphertext = do_rounds(keytext, plaintext, xtime) # concrete ciphertext
    assert len(ciphertext) == 16

    # Now compare the symbolic and the concrete ciphertexts
    begin = now()
    eq = And(*[C[i] == ciphertext[i] for i in range(16)])
    elapsed += now() - begin

    return eq, elapsed


from time import perf_counter
def now():
    return perf_counter()

import pandas as pd
def measure_performance(experiment_fn, symfn, simplify_before, n_rounds, min_time, min_iter, max_iter):
    ''' Run the given experiment with n_rounds and using the given
        symbolic function.

        Repeat the experiment several times and return the minimum
        elapsed time that it took in checking the formula and the
        minimum elapsed time that it took in building the formula.

        How many times will depend of how much time it takes to run
        a single experiment.

        Return the results as a dictionary.
        '''
    name = symfn.__name__
    experiment_name = experiment_fn.__name__

    simpl_fn = (lambda A: simplify(symfn(A))) if simplify_before else symfn

    _s = "(simplified)" if simplify_before else "(not simplified)"
    print(f"Running {experiment_name} ({n_rounds} rounds) with {name} {_s}")

    results = []
    check_elapsed = []
    build_elapsed = []
    z3_stats = []

    min_check_elapsed = 2**31
    min_build_elapsed = 2**31

    loop_cnt = 0
    while True:
        ctx = Context()
        experiment_formula, t = experiment_fn(simpl_fn, n_rounds, ctx)
        build_elapsed.append(t)
        min_build_elapsed = min(min_build_elapsed, t)

        solver = Solver(ctx=ctx)
        begin = now()
        ret = solver.check(experiment_formula)
        t = now() - begin
        assert ret == Sat

        stats = solver.statistics()
        stats_dict = {k: stats.get_key_value(k) for k in stats.keys()}
        stats_dict.update({
            'func': name,
            'experiment': experiment_name,
            'simplified': simplify_before
            })

        z3_stats.append(stats_dict)
        del ctx

        check_elapsed.append(t)
        min_check_elapsed = min(min_check_elapsed, t)

        # Take the minimum elapsed time "so far" and multiply it by
        # how many loops we did.
        # We want to run a few times if each loop takes too much time
        # however we don't want to loop few times if just by bad-luck
        # only one of the iterations took too much time.
        # For that reason we use the minimum time to be the best
        # representative.
        loop_cnt += 1
        best_iteration_took = min_build_elapsed + min_check_elapsed
        if ((best_iteration_took * loop_cnt) > min_time and loop_cnt >= min_iter) or loop_cnt >= max_iter:
            break

    assert len(check_elapsed) == len(build_elapsed) == loop_cnt
    df = pd.DataFrame({
            'check-elapsed': check_elapsed,
            'build-elapsed': build_elapsed,
            'func': [name] * loop_cnt,
            'experiment': [experiment_name] * loop_cnt,
            'rounds': [n_rounds] * loop_cnt,
            'it': list(range(loop_cnt)),
            'simplified': [simplify_before] * loop_cnt
            })

    df2 = pd.DataFrame(z3_stats)
    return df, df2


symfunctions = [
        xtime_branch,
        xtime_branchless,
        xtime_broadcasted,
        xtime_cancelled
        ]

experiments = [
        (null_experiment, 1),
        (single_bitvec_experiment, 1),
        (mix_two_bitvec_experiment, 1),
        (encrypt_rounds_experiment, 1),
          ##(encrypt_rounds_experiment, 2),
          ##(encrypt_rounds_experiment, 5),
          ##(encrypt_rounds_experiment, 10),
          ##(encrypt_rounds_experiment, 20),
          ##(encrypt_rounds_experiment, 50),
          ##(encrypt_rounds_experiment, 100),
          ##(encrypt_rounds_experiment, 200),
          ##(encrypt_rounds_experiment, 500),
        ]

verify=False
if verify:
    for symfn in symfunctions:
        verify_correctness(symfn)

runperf=True
if runperf:
    min_time = 5
    min_iter = 20
    max_iter = 100
    results = []
    for symfn in symfunctions:
        for experiment_fn, n_rounds in experiments:
            ret = measure_performance(experiment_fn, symfn, True, n_rounds, min_time, min_iter, max_iter)
            results.append(ret)

            ret = measure_performance(experiment_fn, symfn, False, n_rounds, min_time, min_iter, max_iter)
            results.append(ret)

    # Execution statistics
    df = pd.concat((r[0] for r in results), ignore_index=True)
    df.to_parquet('perf-results.pq')

    # Solver statistics
    df = pd.concat((r[1] for r in results), ignore_index=True)
    df.to_parquet('z3-stats-results.pq')
