$(document).ready(function() {
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

    $('.selectpicker').on('change', function() {
        categoryFilterSelections = $('#categoryFilter').val();
        toolingFilterSelections = $('#toolingFilter').val();
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
                    try {
                        var classList = Array.from($(playbookFullTable.rows[rowIndex].cells[i])[0].firstElementChild.classList);
                    } catch (err) {
                        var classList = [];
                    }
                    var cellHTMLValue = $(playbookFullTable.rows[rowIndex].cells[i]).html();
                    var categoryIntersection = categoryFilterSelections.filter(element => classList.includes(element));
                    var toolingIntersection = toolingFilterSelections.filter(element => classList.includes(element));


                    // if there is a selection in the category filter and the class of the cell matches
                    if (categoryFilterSelections.length >= 1 && categoryIntersection.length >= 1) {
                        // if there is a selection in the tooling filter and the class of the cell matches
                        if (toolingFilterSelections.length >= 1 && toolingIntersection.length >= 1 && categoryIntersection.length >= 1) {
                            columnFilteredEntries.push(cellHTMLValue);
                        }
                        // if there aren't any selections in the tooling filter
                        else if (toolingFilterSelections.length == 0) {
                            columnFilteredEntries.push(cellHTMLValue);
                        }
                    }
                    // if there is no selection in the category filter and a selection in the tooling filter and the class of the cell matches
                    else if (categoryFilterSelections.length == 0 && toolingFilterSelections.length >= 1 && toolingIntersection.length >= 1) {
                        columnFilteredEntries.push(cellHTMLValue);
                        // if there aren't any selections in the category or tooling filters
                    } else if (categoryFilterSelections.length == 0 && toolingFilterSelections.length == 0) {
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