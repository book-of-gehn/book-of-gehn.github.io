$(document).ready(function () {
var create_html_text_for_post = function create_html_text_for_post (doc) {
    const txt = `
        <span class="index-single-post">
            <hr class="slender post-layout">
            <a href="articles/${doc.path}">
                <h2 class="larger">${doc.title}</h2>
            </a>
        </span>
        `

    return txt;
}

const blog_search_lunr_idx = lunr.Index.load(blog_search_index.lunr_idx);

var searchForm = document.querySelector('#blog-search-form'),
    searchField = searchForm.querySelector('input')

$('#search_results').hide();
$('#reset_search').hide();

searchForm.addEventListener('reset', function (event) {
    $('#search_error').empty();
    $('#search_results').empty();
    $('#search_results').hide();
    $('#reset_search').hide();
})

searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    $('#search_error').empty();

    var query = searchField.value,
        results = undefined,
        search_results = $('#search_results')

    if (!query)
        return;

    try {
        results = blog_search_lunr_idx.search(query)
    } catch(e) {
        if (e instanceof lunr.QueryParseError) {
            $('#search_error').append(`<p>Sorry, I couldn't understand you: "syntax error".</p>`);
            return
        } else {
            throw e
        }
    }

    $('#reset_search').show();
    search_results.empty();

    results.forEach(function (result) {
        var doc = blog_search_index.ref2doc[result.ref],
            txt = create_html_text_for_post(doc)

        search_results.append(txt);
    })
    search_results.show();
})
});
