import timeit
from cryptonita.stats.kasiski import as_ngram_repeated_positions, merge_overlaping, frequency_of_deltas
from cryptonita import B

import math
import numpy as np

import plotting
import seaborn as sns
import matplotlib.pyplot as plt

def perf__as_ngram_repeated_positions(number, repeat, s):
    num_steps = 8

    total_sz = len(s)
    step_sz = total_sz // num_steps

    env = globals().copy()
    y = []
    for i in range(num_steps):
        l = (i+1)*step_sz

        sub_s = s[:l]
        cmd = 'as_ngram_repeated_positions(sub_s, n=3)'

        env.update(locals())
        t = min(timeit.repeat(cmd, globals=env, number=number, repeat=repeat))
        print("Length", l, t)

        y.append(t)

    y = [t/y[0] for t in y]
    x = list(range(1, num_steps+1))
    sns.scatterplot(x, y, s=30)

    plt.plot([], [])

    # perfect fit of the polynomial of order 1 (lineal)
    fit = np.polyfit(x, y, 1)

    # create the polynomio P(x) = y
    P = np.poly1d(fit)

    # plot
    plt.plot(x, [P(i) for i in x], linestyle='--')


def perf__merge_overlaping(number, repeat, s):
    l3_positions = as_ngram_repeated_positions(s, n=3)

    num_steps = 8

    total_sz = len(l3_positions)
    step_sz = total_sz // num_steps

    env = globals().copy()
    y = []
    for i in range(num_steps):
        l = (i+1)*step_sz
        pos_sorted = l3_positions[:l]
        cmd = 'merge_overlaping(pos_sorted)'

        env.update(locals())
        t = min(timeit.repeat(cmd, globals=env, number=number, repeat=repeat))
        print("Length", l, t)

        y.append(t)

    y = [t/y[0] for t in y]
    x = list(range(1, num_steps+1))
    sns.scatterplot(x, y, s=30)

    plt.plot([], [])

    # perfect fit of the polynomial of order 1 (lineal)
    fit = np.polyfit(x, y, 1)

    # create the polynomio P(x) = y
    P = np.poly1d(fit)

    # plot
    plt.plot(x, [P(i) for i in x], linestyle='--')

def perf__frequency_of_deltas(number, repeat, s):
    num_steps = 8

    total_sz = len(s)
    step_sz = total_sz // num_steps

    env = globals().copy()
    y = []
    for i in range(num_steps):
        l = (i+1)*step_sz
        sub_s = s[:l]
        cmd = 'frequency_of_deltas(sub_s)'

        env.update(locals())
        t = min(timeit.repeat(cmd, globals=env, number=number, repeat=repeat))
        print("Length", l, t)

        y.append(t)

    y = [t/y[0] for t in y]
    x = list(range(1, num_steps+1))
    sns.scatterplot(x, y, s=30)

    # trick to make matplotlib to use the 'next' color in its color
    # pallete as 'scatterplot' resets the cycle.
    plt.plot([], [])

    # perfect fit of the polynomial of order 1 (lineal)
    fit = np.polyfit(x, y, 1)

    # create the polynomio P(x) = y
    P = np.poly1d(fit)

    # plot
    plt.plot(x, [P(i) for i in x], linestyle='--')

    # now, perfect fit of the polynomial of order 2 (quadratic)
    fit = np.polyfit(x, y, 2)
    P = np.poly1d(fit)
    plt.plot(x, [P(i) for i in x], linestyle='--')


s = B(open('assets/kasiski/data', 'rb').read())
if False:
    with plotting.show("as_ngram_repeated_positions.png"):
        perf__as_ngram_repeated_positions(number=1, repeat=20, s=s)

    with plotting.show("merge_overlaping.png"):
        perf__merge_overlaping(number=10, repeat=20, s=s)

if True:
    with plotting.show("frequency_of_deltas.png"):
        perf__frequency_of_deltas(number=1, repeat=20, s=s)

s = B(b'A' * 4096)
if False:
    with plotting.show("as_ngram_repeated_positions_worst_case.png"):
        perf__as_ngram_repeated_positions(number=1, repeat=20, s=s)

    with plotting.show("merge_overlaping_worst_case.png"):
        perf__merge_overlaping(number=10, repeat=20, s=s)

if True:
    with plotting.show("frequency_of_deltas_worst_case.png"):
        perf__frequency_of_deltas(number=1, repeat=20, s=s)
