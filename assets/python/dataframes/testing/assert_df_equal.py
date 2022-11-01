import pandas as pd
from pandas.testing import assert_frame_equal

def assert_df_equal(obtained_df, expected_df, group_by=[], sort_by=[], ignore=[], hide_grouped=False, check_exact=True, rtol=1e-5, atol=1e-8, ignore_unexpected=False, ignore_missing=False, to_string_kwargs={}):
    # if we don't want to show the group-by columns we can ignore
    # them from the check because there will not be difference
    # possible in these columns anyways (by construction)
    # so ignoring them it is just for the side effect of not showing them
    if hide_grouped:
        ignore = ignore + group_by

    diffs = []

    # See the whole dataframe as the single group in case of
    # the user don't wanting to group the rows
    singleton_group = False
    if not group_by:
        group_by = lambda *args: singleton_group
        singleton_group = True

    obtained_g = obtained_df.groupby(group_by, dropna=False)
    expected_g = expected_df.groupby(group_by, dropna=False)

    obtained_group_names = {key for key, item in obtained_g}
    expected_group_names = {key for key, item in expected_g}

    common_group_names = obtained_group_names & expected_group_names
    unexpected_group_names = obtained_group_names - expected_group_names
    missing_group_names = expected_group_names - obtained_group_names

    # Check if we have unexpected groups or missing groups.
    # These are groups that cannot be compared with any other row
    # in the opposite dataframes and therefore they are straight
    # differences by definition
    if not ignore_unexpected:
        for name in sorted(unexpected_group_names):
            ob = pd.DataFrame(obtained_g.get_group(name))
            if sort_by:
                ob.sort_values(sort_by, inplace=True)


            if ignore:
                ob = ob.drop(columns=ignore)

            ob["DF"] = "obtained"

            msg = f"Unexpected (not expected) group {name!r}\n\n{ob.to_string(**to_string_kwargs)}"
            diffs.append(msg)

    if not ignore_missing:
        for name in sorted(missing_group_names):
            ex = pd.DataFrame(expected_g.get_group(name))
            if sort_by:
                ex.sort_values(sort_by, inplace=True)

            if ignore:
                ex = ex.drop(columns=ignore)

            ex["DF"] = "expected"

            msg = f"Missing (not obtained) group {name!r}\n\n{ex.to_string(**to_string_kwargs)}"
            diffs.append(msg)

    # Compare group by group, sorting them if sort_by is given.
    common_diff_cnt = 0
    for name in sorted(common_group_names):
        ob = pd.DataFrame(obtained_g.get_group(name))
        ex = pd.DataFrame(expected_g.get_group(name))

        if sort_by:
            ob.sort_values(sort_by, inplace=True)
            ex.sort_values(sort_by, inplace=True)

        ob.reset_index(drop=True, inplace=True)
        ex.reset_index(drop=True, inplace=True)

        if ignore:
            ob = ob.drop(columns=ignore)
            ex = ex.drop(columns=ignore)

        try:
            assert_frame_equal(ob, ex, check_exact=check_exact, rtol=rtol, atol=atol, check_like=True, check_dtype=False)
        except Exception as err:
            ob["DF"] = "obtained"
            ex["DF"] = "expected"

            merged = pd.concat([ob, ex]).sort_index()

            if singleton_group:
                msg = f"{err}"
            else:
                msg = f"For group {name!r}: {err}"

            msg = f"{msg}\n\n{merged.to_string(**to_string_kwargs)}"
            diffs.append(msg)
            common_diff_cnt += 1

    if diffs:
        stats = f"{len(unexpected_group_names)} unexpected groups"
        if ignore_unexpected:
            stats += " (ignored)"

        stats += f"; {len(missing_group_names)} missing groups"
        if ignore_missing:
            stats += " (ignored)"

        stats += f"; {len(common_group_names)} groups in common of which {common_diff_cnt} has differences"
        msg = f"Found {len(diffs)} difference{'s' if len(diffs) > 1 else ''}.\n{stats}.\nDetails follows:\n\n"
        raise AssertionError(msg + "\n\n".join(diffs))

