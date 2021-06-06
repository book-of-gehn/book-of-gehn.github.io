# Run me as:
# python -m distributing.constant_rate.constant_rate

from ..clock.clock import now
from time import sleep

def stoppable(func):
    def wrapper(*args, **kargs):
        try:
            return func(*args, **kargs)
        except StopIteration:
            return StopIteration

    return wrapper

def constant_rate_loop(func, rate):
    func = stoppable(func)
    t1 = now()
    it = 0
    while True:
        v = func(it)
        if v is StopIteration:
            break

        t2 = now()
        rest = rate - (t2 - t1)
        if rest < 0:
            behind = -rest  # this is always positive
            rest = rate - behind % rate
            lost = behind + rest
            t1 += lost
            it += int(lost // rate)  # floor division

        sleep(rest)
        t1 += rate
        it += 1

