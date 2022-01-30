# Run me as:
# python -m distributing.constant_rate.examples.clock_drift

from ..constant_rate import constant_rate_loop, stoppable
from ...clock.clock import now
from time import sleep

from ...plotting import show

import numpy as np
import pandas as pd
import seaborn as sns

def fixed_sleep_loop(func, rate):
    func = stoppable(func)
    it = 0
    while True:
        v = func(it)
        if v is StopIteration:
            break
        sleep(rate)
        it += 1

def time_drift(it):
    global data, ref

    if it == 0:
        ref = now()
        real = 0    # aka (it * rate) == (0 * rate) == 0
    else:
        real = now() - ref

    expected = it * rate

    data.append(real - expected)
    if it > max_it:
        raise StopIteration


ref = None  # time reference value, set at the begin of each loop.

rate = 1/60
max_it = 1 // rate    # cnt iterations in 1 secs

# Run and collect the drifts in each iteration
# with the function is called inside of a 'fixed sleep' loop
data = []
fixed_sleep_loop(time_drift, rate)
drifts_in_fixed_sleep_loop = list(data)

# Run and collect the drifts in each iteration
# with the function is called inside of a 'constant rate' loop
data = []
constant_rate_loop(time_drift, rate)
drifts_in_constant_rate_loop = list(data)

del data
assert len(drifts_in_fixed_sleep_loop) == len(drifts_in_constant_rate_loop)

data = list(zip(drifts_in_fixed_sleep_loop, drifts_in_constant_rate_loop))
data = pd.DataFrame(data, columns=["Fixed Sleep", "Constant Rate"])

with show('clock_drift.png', style='white'):
    sns.lineplot(data=data, linewidth=2)
    sns.despine()
