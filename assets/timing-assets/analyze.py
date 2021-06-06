import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


fname = '/home/user/QubesIncoming/ext5/clock_times.gz'
d = pd.read_csv(fname, sep=' ', header=None, names=['clock type', 'tval'], dtype={'clock type': 'category'})

# For each category calculate the first order differences for
# the values of the rows
for c in d['clock type'].cat.categories:
    selected_rows = d.loc[:, 'clock type'] == c
    differences = d.loc[selected_rows].loc[:, 'tval'].diff()
    d.loc[selected_rows, 'tval'] = differences

# Describe each cateogry
for c in d['clock type'].cat.categories:
    selected_rows = d['clock type'] == c
    print("Clock type:", c)
    print(d[selected_rows].describe())
    print()

# Drop some clock types that have little value
for c in ('time', 'tofd', 'ruse', 'mraw'):
    selected_rows = d['clock type'] == c
    d.drop(d[selected_rows].index, inplace=True)

d['clock type'].cat.remove_unused_categories(inplace=True)

# Drop outliners (the 1% most larger values)
for c in d['clock type'].cat.categories:
    selected_rows = d['clock type'] == c
    q = d[selected_rows]['tval'].quantile(.99)

    selected_rows = selected_rows & (d['tval'] > q)
    d.drop(d[selected_rows].index, inplace=True)

# Plot as you want
sns.catplot(data=d, x='clock type', y='tval', kind='box')
plt.show()
