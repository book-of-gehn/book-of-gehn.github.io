'use strict'
//Gehn

/*
 * Example of sets definitions:

var setdefs = {
    "Information": {sz: 12, c: "red"},
    "Overlap":  12,
    "Circles":  12,
    "Redundancy": {sz: 4, sets: ["Information", "Overlap"]},
    "Pie Charts": {sz: 4, sets: ["Information", "Circles"]},
    "Eclipses":   {sz: 4, sets: ["Overlap", "Circles"]},
    "Venn Diagrams": {sz: 2, sets: ["Information", "Overlap", "Circles"]},
    "Mathematics": 8,
    "Physics": 8,
    "Music": 8,
    "Cool Stuff": {sz: 2, sets: ["Mathematics", "Physics"]},
};
*/
function venn_diagram(selector, sets_definitions, chart = venn.VennDiagram()) {
    let def = sets_definitions;
    let ret = [];
    let colormap = {};
    let mapped = Object.keys(def).map(k => [k, def[k]])
    for (const [label,val] of mapped) {
        let obj = 0;
        if (Number.isInteger(val)) {
            obj = {sets: [label], size: val};
        }
        else {
            const sets = val.sets || [label];
            obj = {sets: sets, label: label, size: val.sz};
            if ('c' in val) {
                colormap[label] = val.c;
            }
        }

        ret.push(obj);
    }

    let orig_colour_func = chart.colours();

    function colormap_func(k) {
        if (k in colormap) {
            return colormap[k];
        }
        return orig_colour_func(k);
    }

    chart.colours(colormap_func);
    d3.select(selector).datum(ret).call(chart);

    return [chart, ret, colormap];
}

