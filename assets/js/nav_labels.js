$('.navigation-list-child-list').each(function() {
    $($(this)[0].childNodes).each(function() {
        var itemCount = 0;
        try {
            var itemCount = $(this)[0].childNodes[1].childElementCount;
            $(this)[0].innerHTML = $(this)[0].innerHTML.replace($(this)[0].innerText, $(this)[0].innerText + ' (' + itemCount + ')');
        } catch (e) {}
    })
})
