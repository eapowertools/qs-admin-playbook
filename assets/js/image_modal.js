$(function() {
    $('img').on('click', function(clickedImage) {
        if (clickedImage.currentTarget.parentElement.className != 'no-modal') {
            var modalSourceImg = clickedImage.currentTarget.src;
            $('#modalImageUrl').attr('src', modalSourceImg);
            $('#imageModal').modal('show'); 
        }
    });
});

$(function() {
    $('.info-icon-modal').on('click', function() {
        $('#imageModal').find('.modal-body').empty().append(toolingTable);
        $('#imageModal').modal('show');
    });
});

var toolingTable = '<table><tr><th>Tooling Option</th><th>Description</th></tr>';
toolingTable += '<tr><td>Native</td><td><span style="font-weight:400;font-style:normal">At least one method is offered that can be completed using capabilities or apps which come with a default Qlik Sense Enterprise installation.</span><br></td></tr>';
toolingTable += '<tr><td>Qlik-Cli Script Available</td><td><span style="font-weight:400;font-style:normal">This activity offers Qlik-Cli scripts for automation purposes.</span><br></td></tr>';
toolingTable += '<tr><td>Scripting Optional</td><td><span style="font-weight:400;font-style:normal">This activity can involve some type of scripting, including Qlik-Cli scripts.</span><br></td></tr>';
toolingTable += '<tr><td>Scripting Required</td><td><span style="font-weight:400;font-style:normal">This activity requires the use of scripts.</span><br></td></tr>';
toolingTable += '<tr><td>Tooling Optional</td><td><span style="font-weight:400;font-style:normal">While a native method exists, a more feature rich approach involves a Qlik application or other third-party tool which does not come bundled with Qlik Sense Enterprise.</span><br></td></tr>';
toolingTable += '<tr><td>Tooling Required</td><td><span style="font-weight:400;font-style:normal">This activity requires the use of a Qlik app or third party tool which does not come bundled with Qlik Sense Enterprise.</span><br></td></tr>';
toolingTable += '</table>';
