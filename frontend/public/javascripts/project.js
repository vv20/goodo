$(document).ready(() => {
    // console.log("hello world");
    $('body').on('click', '.panel-clickable[data-href]', function () {
        if (window.location.hash) {
            window.location.hash = $(this).data('href');
        } else {
            window.location.href = $(this).data('href');
        }
    })
});