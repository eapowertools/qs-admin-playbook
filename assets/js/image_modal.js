$(function() {
    $('img').on('click', function(clickedImage) {
        var modalSourceImg = clickedImage.currentTarget.src;
        $('#modalImageUrl').attr('data', modalSourceImg);
        $('#imageModal').modal('show');
    });
});
