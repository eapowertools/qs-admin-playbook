$(function() {
    $('img').on('click', function(clickedImage) {
        var modalSourceImg = clickedImage.currentTarget.src;
        $('#modalImageUrl').attr('src', modalSourceImg);
        $('#imageModal').modal('show');
    });
});
