import pandas as pd, seaborn as sns, matplotlib.pyplot as plt
import os.path


tips = sns.load_dataset("tips")
penguins = sns.load_dataset("penguins")
fmri = sns.load_dataset("fmri")
anscombe = sns.load_dataset("anscombe")

tmp = sns.load_dataset("flights")
flights = tmp.pivot("month", "year", "passengers") # tidy format
del tmp

sns.set_theme(style="white", color_codes=True)

def simplify_and_save(grid, name, show=False):
    ''' Take a Seaborn's grid and save it as an image named as specified.
        If <show> is True, show it too.

        The labels, the ticks and the "spines" (axes)  will be removed
        to have a tight clean image.
        '''
    grid.set(yticklabels=[], xticklabels=[], xlabel=None, ylabel=None)

    sns.despine(left=True, right=True, top=True, bottom=True)

    grid.fig.tight_layout()
    grid.fig.savefig(name)
    if show:
        plt.show()

    plt.close()


#-------------------
# Categorical plots
#-------------------

x = "day"
y = "total_bill"
hue = "sex"

fg = sns.catplot(x=x, y=y, hue=hue,
                    kind="violin", split=True, data=tips,
                    legend=False)

simplify_and_save(fg, 'violin-split.png')


fg = sns.catplot(x=x, y=y, hue=hue,
                    kind="boxen", data=tips,
                    k_depth='full',
                    legend=False)

simplify_and_save(fg, 'boxen-full.png')

fg = sns.catplot(x=x, y=y, hue=hue,
                    kind="box", data=tips,
                    dodge=True, fliersize=5, linewidth=3,
                    legend=False)

simplify_and_save(fg, 'box-dodge-true.png')

fg = sns.catplot(x=x, y=y, hue=hue,
                    kind="strip", data=tips,
                    dodge=False,
                    s=10,
                    legend=False)

simplify_and_save(fg, 'strip-dodge-false.png')

#-------------------
# Categorical plots (statistical estimator)
#-------------------

fg = sns.catplot(x=x, y=y, hue=hue,
                    kind="bar", data=tips,
                    legend=False)

simplify_and_save(fg, 'bar.png')

fg = sns.catplot(x=x, y=y, hue=hue,
                    kind="point", data=tips, ci=35,
                    legend=False)

simplify_and_save(fg, 'point.png')


#-------------------
# Distribution plots
#-------------------

x = "flipper_length_mm"
y = None
hue = "species"

fg = sns.displot(data=penguins, x=x, y=y, hue=hue,
                kind = 'hist',
                element="step", legend=False)

simplify_and_save(fg, 'hist-step.png')

fg = sns.displot(data=penguins, x=x, y=y, hue=hue,
                kind = 'hist',
                multiple='stack', legend=False)

simplify_and_save(fg, 'hist-stack.png')

fg = sns.displot(data=penguins, x=x, y=y, hue=hue,
                kind = 'hist',
                multiple='dodge', legend=False)

simplify_and_save(fg, 'hist-dodge.png')

fg = sns.displot(data=penguins, x=x, y=y, hue=hue,
                kind = 'ecdf', legend=False, linewidth=3)

simplify_and_save(fg, 'ecdf.png')

fg = sns.displot(data=penguins, x=x, y=y, hue=hue,
                kind = 'kde', legend=False, linewidth=3)

simplify_and_save(fg, 'kde-uni.png')

y = "bill_length_mm"
fg = sns.displot(data=penguins, x=x, y=y, hue=hue,
                kind = 'kde', legend=False, linewidths=3, levels=5)

simplify_and_save(fg, 'kde-bi.png')


fg = sns.displot(data=penguins, x=x, y=y, hue=hue,
                kind = 'hist', legend=False)

simplify_and_save(fg, 'hist-bi.png')


#-------------------
# Relational plots
#-------------------

x="total_bill"
y="tip"
hue = "smoker"

fg = sns.relplot(data=tips, x=x, y=y, hue=hue,
                kind = 'scatter', legend=False, s=80)

simplify_and_save(fg, 'scatter.png')


x = "timepoint"
y = "signal"
hue = "region"

fg = sns.relplot(data=fmri, x=x, y=y, hue=hue,
                kind = 'line', legend=False, linewidth=3)

simplify_and_save(fg, 'line.png')

#-------------------
# Regression plots
#-------------------

x="total_bill"
y="tip"
hue = "smoker"

fg = sns.lmplot(data=tips, x=x, y=y, hue=hue,
        legend=False, line_kws={'linewidth':3},
        scatter_kws={'s':80})

simplify_and_save(fg, 'lm-regression.png')

fg = sns.lmplot(data=tips, x=x, y=y, hue=hue,
                legend=False, order=3,
                line_kws={'linewidth':3},
                scatter_kws={'s':80})

simplify_and_save(fg, 'lm-order3.png')


x="x"
y="y"
hue=None

fg = sns.lmplot(data=anscombe.query("dataset == 'III'"),
                x=x, y=y, hue=hue,
                legend=False, robust=True,
                line_kws={'linewidth':3},
                scatter_kws={'s':80})

simplify_and_save(fg, 'lm-robust.png')

