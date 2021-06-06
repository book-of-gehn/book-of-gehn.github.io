
function fix_syntax_highlight(ev) {
    // pip install selectq
    //   cond = (val('text()') == 'blt') | (val('text()') == 'b') | (val('text()').startswith('mov')) | ...
    //   div = sQ.select('div', attr('class').contains('language-nasm'))
    //   xpath = div.select('span', cond)

    // Make some ASM instructions "keywords"
    var xpath = ".//div[contains(@class,'language-nasm')]//span[(((text() = 'blt') or (text() = 'b')) or starts-with(text(), 'mov')) or starts-with(text(), 'ldm') or starts-with(text(), 'stm') or starts-with(text(), 'ldr') or starts-with(text(), 'bx') or starts-with(text(), 'bl') or starts-with(text(), 'bne') or starts-with(text(), 'mvn') or starts-with(text(), 'beq') or starts-with(text(), 'svc') or starts-with(text(), 'cmn') or starts-with(text(), 'bhi')]";
    var elems_iter = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);

    var elems = [];
    var el = elems_iter.iterateNext();
    while (el) {
        elems.push(el);
        el = elems_iter.iterateNext();
    }
    for (var i = 0; i < elems.length; i++) {
        var el = elems[i];
        el.classList.add('k'); // keyword
        el.classList.remove('n'); // noun
    }

    // Remove the 'err' class, it just *too* distracting
    // Apply this to C++, ASM, Python and Shell
    var xpath = ".//div[contains(@class,'language-cpp') or contains(@class,'language-nasm') or contains(@class,'language-python') or contains(@class,'language-shell')]//span[@class='err']"
    var elems_iter = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);

    var elems = [];
    var el = elems_iter.iterateNext();
    while (el) {
        elems.push(el);
        el = elems_iter.iterateNext();
    }
    for (var i = 0; i < elems.length; i++) {
        var el = elems[i];
        el.classList.remove('err'); // syntax error
    }
}

document.addEventListener('DOMContentLoaded', fix_syntax_highlight);
