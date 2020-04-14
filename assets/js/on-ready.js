$(document).ready(function() {
    // establish select pickers

    $('#categoryFilter').selectpicker().on('loaded.bs.select', function(e) {

        // save the element
        var $el = $(this);

        // the list items with the options
        var $lis = $el.data('selectpicker').$element[0].options;

        $lis.each(function(i) {

            // get the title from the option
            var tooltip_title = i.title;

            $(this).tooltip({
                'title': tooltip_title,
                'placement': 'top'
            });

        });

    });

    // get full playbook table
    var playbookFullTable = document.getElementById('playbook');

    // columns in playbook table
    var playbookTableColumns = playbookFullTable.rows[0].cells.length;

    // get all column names
    var columnNames = []
    for (let i = 0; i < playbookTableColumns; i++) {
        var cellHTMLValue = $(playbookFullTable.rows[0].cells[i]).html();
        columnNames.push(cellHTMLValue)
    }

    var playbookSelections = [];

    $(document).ready(function() {
        $('.selectpicker').selectpicker({});
    })

    $('#categoryFilter').on('change', function() {
        playbookFilterSelections = $('#categoryFilter').val();
        reRenderPlaybook();
    });

    function reRenderPlaybook() {
        // get all cells that match and build them into an array of column value arrays
        var newFilteredPlaybookEntries = []
        var rowIndex = 0;
        for (let i = 0; i < playbookTableColumns; i++) {
            rowIndex = 0;
            columnFilteredEntries = []
            Array.from(playbookFullTable.rows).forEach(function() {
                if (rowIndex > 0) {
                    var cellHTMLValue = $(playbookFullTable.rows[rowIndex].cells[i]).html();
                    var cellLinkValue = $(playbookFullTable.rows[rowIndex].cells[i]).html().split('docs/').pop().split('/')[0];
                    if (playbookFilterSelections.length >= 1 && playbookFilterSelections.includes(cellLinkValue)) {
                        columnFilteredEntries.push(cellHTMLValue)
                    } else if (playbookFilterSelections.length == 0) {
                        columnFilteredEntries.push(cellHTMLValue)
                    }
                }
                rowIndex++;
            });
            newFilteredPlaybookEntries.push(columnFilteredEntries)
        }

        // get max number or rows in any column of new table
        var newPlaybookMaxRows = 0;
        for (var i = 0; i < newFilteredPlaybookEntries.length; i++) {
            if (newFilteredPlaybookEntries[i].length > newPlaybookMaxRows) {
                newPlaybookMaxRows = newFilteredPlaybookEntries[i].length;
            }
        }

        // build new table HTML
        var newPlaybookTableHTML = '<div class="table-wrapper"><table id="playbook"><thead><tr>';

        // build columns
        $.each(columnNames, function(i, val) {
            newPlaybookTableHTML += '<th>' + val + '</th>';
        });

        newPlaybookTableHTML += '</tr></thead><tbody>';

        // for the total number of rows in the new table
        for (let i = 0; i < newPlaybookMaxRows; i++) {
            newPlaybookTableHTML += '<tr>';
            // for each column, pick the cell from the current row and add it if not null
            $.each(newFilteredPlaybookEntries, function(z, entry) {
                if ((i > 0 && entry[i] != undefined) || (i == 0 && entry[i] != undefined)) {
                    newPlaybookTableHTML += '<td>' + entry[i] + '</td>';
                } else {
                    newPlaybookTableHTML += '<td>' + '' + '</td>';
                }
            });

            newPlaybookTableHTML += '</tr>';
        }

        newPlaybookTableHTML += '</tr></tbody></table>';

        // remove the old playbook table
        $('#playbook').parent().remove();

        // insert the new playbook table
        $("#main-content").append($.parseHTML(newPlaybookTableHTML));

        return;
    }

});