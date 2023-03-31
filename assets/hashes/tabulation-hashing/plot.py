import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

from plotting import show

df = pd.read_csv('cache-results-run-457513.csv')

#   # Evolution of 32-32 full in 32k cache (little use)
#   df2 = df[(df.table == '32-32') & (df.cache_sz == 32768) & (df.himpl == 'f') & (df.cache_asso==0)]
#   fig,  (ax1, ax2) = plt.subplots(1, 2, subplot_kw=dict(yscale='log'))
#   sns.scatterplot(data=df2, x=df2.order, y=df2.D1mr, ax=ax1)
#   sns.scatterplot(data=df2, x=df2.order, y=df2.D1mw, ax=ax2)
#   fig.tight_ladyout()


# 32-32 vs 64-64 full in 32k cache
with show(save="cmp_cache_32-32_and_64-64_full.svg"):
    df2 = df[(df.cache_sz == 32768) & (df.himpl == 'f') & (df.cache_asso==0)]
    fig,  (ax1, ax2) = plt.subplots(1, 2, subplot_kw=dict(yscale='log'))
    sns.scatterplot(data=df2, x=df2.order, hue=df2.table, y=df2.D1mr, ax=ax1)
    sns.scatterplot(data=df2, x=df2.order, hue=df2.table, y=df2.D1mw, ax=ax2)
    fig.tight_layout()


#   # f vs b 64-64 in 32k cache
#   df2 = df[(df.table == '64-64') & (df.cache_sz == 32768) & (df.cache_asso==0)]
#   fig,  (ax1, ax2) = plt.subplots(1, 2, subplot_kw=dict(yscale='log'))
#   sns.scatterplot(data=df2, x=df2.order, hue=df2.himpl, y=df2.D1mr, ax=ax1)
#   sns.scatterplot(data=df2, x=df2.order, hue=df2.himpl, y=df2.D1mw, ax=ax2)
#   fig.tight_layout()


#   # f vs b 64-64 in 16k cache (with batch len of 1)
#   df2 = df[(df.table == '64-64') & (df.cache_sz == 16384) & (df.blen == 1) & (df.cache_asso==0)]
#   fig,  (ax1, ax2) = plt.subplots(1, 2, subplot_kw=dict(yscale='log'))
#   sns.scatterplot(data=df2, x=df2.order, hue=df2.himpl, y=df2.D1mr, ax=ax1)
#   sns.scatterplot(data=df2, x=df2.order, hue=df2.himpl, y=df2.D1mw, ax=ax2)
#   fig.tight_layout()


#   # batch length for 64-64 in 16k cache (hard to read)
#   df2 = df[(df.table == '64-64') & (df.cache_sz == 16384) & (df.himpl == 'b') & (df.cache_asso==0)]
#   fig,  (ax1, ax2) = plt.subplots(1, 2, subplot_kw=dict(yscale='log'))
#   sns.scatterplot(data=df2, x=df2.order, hue=df2.blen.astype("category"), y=df2.D1mr, ax=ax1)
#   sns.scatterplot(data=df2, x=df2.order, hue=df2.blen.astype("category"), y=df2.D1mw, ax=ax2)
#   fig.tight_layout()

#   # batch length for 64-64 in 16k cache; order 22; blen < 64; compare with f
#   df2 = df[(df.table == '64-64') & (df.cache_sz == 16384) & (df.order == 22) & (df.cache_asso==0) & (df.blen < 60)]
#   fig,  (ax1, ax2) = plt.subplots(1, 2)
#   sns.scatterplot(data=df2, x=df2.blen, y=df2.D1mr, hue=df2.himpl, ax=ax1)
#   sns.scatterplot(data=df2, x=df2.blen, y=df2.D1mw, hue=df2.himpl, ax=ax2)
#   fig.tight_layout()


#   # batch length for 64-64 in 16k cache; order 22; blen < 64; compare with asso and himpl
#   df2 = df[(df.table == '64-64') & (df.cache_sz == 16384) & (df.order == 22) & (df.blen < 60)]
#   fig,  (ax1, ax2) = plt.subplots(1, 2)
#   sns.scatterplot(data=df2, x=df2.blen, y=df2.D1mr, hue=df2[['cache_asso', 'himpl']].apply(tuple, axis=1), ax=ax1)
#   sns.scatterplot(data=df2, x=df2.blen, y=df2.D1mw, hue=df2[['cache_asso', 'himpl']].apply(tuple, axis=1), ax=ax2)
#   fig.tight_layout()



df = pd.read_csv('runtime-results-run-4248.csv')

# Compare f with l
with show(save="cmp_runtime_32-32_and_64-64_full_lin.svg"):
    fig,  (ax1, ax2) = plt.subplots(1, 2, subplot_kw=dict(yscale='log'))
    df2 = df[(df.table == '32-32') & (df.himpl != 'b')]
    sns.lineplot(data=df2, x=df2.order, y=df2.timens, hue=df2.himpl, estimator='min', ax=ax1)
    df2 = df[(df.table == '64-64') & (df.himpl != 'b')]
    sns.lineplot(data=df2, x=df2.order, y=df2.timens, hue=df2.himpl, estimator='min', ax=ax2)
    fig.tight_layout()


# Compare noise of f and l
with show(save="cmp_runtime_noise_full_lin.svg"):
    fig,  (ax1, ax2) = plt.subplots(2, 1, subplot_kw=dict(xscale='log'))
    df2 = df[(df.himpl == 'f') & (df.table == '64-64')]
    sns.kdeplot(data=df2, x=df2.timens, hue=df2.order, ax=ax1)
    df2 = df[(df.himpl == 'l') & (df.table == '64-64')]
    sns.kdeplot(data=df2, x=df2.timens, hue=df2.order, ax=ax2)
    fig.tight_layout()



