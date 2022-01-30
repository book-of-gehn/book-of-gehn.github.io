import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

from math import sqrt
import contextlib

# From https://nipunbatra.github.io/2014/08/latexify/
def latexify(fig_width=None, fig_height=None, columns=1, usetex=True):
    """Set up matplotlib's RC params for LaTeX plotting.
    Call this before plotting a figure.

    Parameters
    ----------
    fig_width : float, optional, inches
    fig_height : float,  optional, inches
    columns : {1, 2}
    """

    # code adapted from http://www.scipy.org/Cookbook/Matplotlib/LaTeX_Examples

    # Width and max height in inches for IEEE journals taken from
    # computer.org/cms/Computer.org/Journal%20templates/transactions_art_guide.pdf

    assert(columns in [1,2])

    if fig_width is None:
        fig_width = 3.39 if columns==1 else 6.9 # width in inches

    if fig_height is None:
        golden_mean = (sqrt(5)-1.0)/2.0    # Aesthetic ratio
        fig_height = fig_width*golden_mean # height in inches

    MAX_HEIGHT_INCHES = 8.0
    if fig_height > MAX_HEIGHT_INCHES:
        print("WARNING: fig_height too large: %4.f so will reduce to %4.f inches" % (fig_height, MAX_HEIGHT_INCHES))
        fig_height = MAX_HEIGHT_INCHES

    params = {'backend': 'ps',
              'text.latex.preamble': [r'\usepackage{gensymb}'],
              'axes.labelsize':  8, # fontsize for x and y labels (was 10)
              'axes.titlesize':  8,
              'legend.fontsize': 8, # was 10
              'xtick.labelsize': 8,
              'ytick.labelsize': 8,
              'text.usetex': usetex,
              'figure.figsize': [fig_width,fig_height],
              'font.family': 'serif',
              'font.size':       8, # was 10
              'lines.markersize': 3,
    }

    return params

# https://stackoverflow.com/questions/14827650/pyplot-scatter-plot-marker-size
_inside_of_a_show_and_save_context = False

@contextlib.contextmanager
def show(save=None, latexify_kargs={}, skip=False):
    global _inside_of_a_show_and_save_context
    if skip:
        yield
        return

    are_we_the_outer_context = False
    if not _inside_of_a_show_and_save_context:
        plt.close()

        _inside_of_a_show_and_save_context = True
        are_we_the_outer_context = True

        if not save and 'usetex' not in latexify_kargs:
            latexify_kargs = latexify_kargs.copy()
            latexify_kargs['usetex'] = False # disable latex, it is faster

        sns.set(context='paper', style='darkgrid', rc=latexify(**latexify_kargs))

    yield

    if are_we_the_outer_context:
        _inside_of_a_show_and_save_context = False

        plt.tight_layout()
        if save:
            plt.savefig(save, bbox_inches='tight', dpi=600)

        plt.show()
        sns.set() # reset to seaborn's default




dfperf = pd.read_parquet('assets/performance-ite-expr/perf-results.pq')
dfz3st = pd.read_parquet('assets/performance-ite-expr/z3-stats-results.pq')

df = pd.concat([
    dfperf,
    dfz3st.drop(columns=['experiment', 'func', 'simplified'])
    ],
    axis=1)

with show('mean-check-elapsed-per-func-experiment.svg', {'usetex': False}, True):
    sns.catplot(data=df, kind='bar', x='func', y='check-elapsed',
            hue='simplified', hue_order=[True, False],
            col='experiment', sharey=False, col_wrap=2)

with show('min-check-elapsed-per-func-in-encrypt-experiment.svg',
        {'usetex': False}, True):
    sns.catplot(data=df.query('experiment == "encrypt_rounds_experiment"'),
            kind='bar', x='func', y='check-elapsed',
            hue='simplified', hue_order=[True, False],
            estimator=np.min, legend=False
            )

with show('rel-check-elapsed-and-added-eqs.svg', {'usetex': False}, True):
    sns.regplot(data=df, x='added eqs', y='check-elapsed')


with show('mean-added-eqs-per-func-in-encrypt-experiment.svg',
        {'usetex': False}):
    sns.catplot(data=df.query('experiment == "encrypt_rounds_experiment"'),
            kind='bar', x='func', y='added eqs',
            hue='simplified', hue_order=[True, False],
            legend=False
            )
