$(document).ready(function() {

    try {
        // initialize select pickers
        $(".selectpicker").selectpicker();

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

        // array to store filter selections into
        var playbookSelections = [];

        // array to store all of the categories and tooling options into
        var rawClasses = [];

        // establish category map
        var categoryMap = [];

        // establish tooling options map
        var toolingMap = [];

        // compile all classes into an array, where categories and tooling options will come from
        var rowIndex = 0;
        for (let i = 0; i < playbookTableColumns; i++) {
            rowIndex = 0;
            columnFilteredEntries = [];
            Array.from(playbookFullTable.rows).forEach(function() {
                if (rowIndex > 0) {
                    try {
                        var classList = Array.from($(playbookFullTable.rows[rowIndex].cells[i])[0].firstElementChild.classList);
                        rawClasses.push(classList);
                    } catch (err) {
                        var classList = [];
                        rawClasses.push(classList);
                    }
                }
                rowIndex++;
            });
        }

        // grab the selections from the filters (so the playbook can render the first time)
        categoryFilterSelections = $('#categoryFilter').val();
        toolingFilterSelections = $('#toolingFilter').val();
        reRenderPlaybook();

        // get categories
        $('#categoryFilter')
            .children('option')
            .each(function(index, elem) {
                categoryMap.push([
                    $(elem).val(), []
                ]);
            });

        // create array of array with [category,[tooling options]]
        for (var i in rawClasses) {
            $('#categoryFilter')
                .children('option')
                .each(function(index, elem) {
                    var category = $(elem).val();
                    if (rawClasses[i].includes(category)) {
                        let difference = rawClasses[i].filter(x => ![category].includes(x));
                        for (z in categoryMap) {
                            if (categoryMap[z][0] == category) {
                                categoryMap[z][1].push(difference);
                            }

                        }
                    }
                });
        }

        // get distinct values for each
        for (var i in categoryMap) {
            categoryMap[i][1] = [...new Set(categoryMap[i][1].flat())]
        }

        // get tooling options
        $('#toolingFilter')
            .children('option')
            .each(function(index, elem) {
                toolingMap.push([
                    $(elem).val(), []
                ]);
            });

        // create array of array with [tooling options,[category]]
        for (var i in rawClasses) {
            $('#toolingFilter')
                .children('option')
                .each(function(index, elem) {
                    var tooling = $(elem).val();
                    if (rawClasses[i].includes(tooling)) {
                        let difference = rawClasses[i].filter(x => ![tooling].includes(x));
                        for (z in toolingMap) {
                            if (toolingMap[z][0] == tooling) {
                                toolingMap[z][1].push(difference);
                            }

                        }
                    }
                });
        }

        // get distinct values for each
        for (var i in toolingMap) {
            toolingMap[i][1] = [...new Set(toolingMap[i][1].flat())]
        }


        // re-render the playbook on change of filters
        $('.selectpicker').on('change', function() {
            categoryFilterSelections = $('#categoryFilter').val();
            toolingFilterSelections = $('#toolingFilter').val();

            reRenderPlaybook();
        });

        function reRenderPlaybook() {
            // get all cells that match and build them into an array of column value arrays
            var newFilteredPlaybookEntries = []
            var columnFilteredEntriesMap = []
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
                                columnFilteredEntriesMap.push(classList);
                            }
                            // if there aren't any selections in the tooling filter
                            else if (toolingFilterSelections.length == 0) {
                                columnFilteredEntries.push(cellHTMLValue);
                                columnFilteredEntriesMap.push(classList);
                            }
                        }
                        // if there is no selection in the category filter and a selection in the tooling filter and the class of the cell matches
                        else if (categoryFilterSelections.length == 0 && toolingFilterSelections.length >= 1 && toolingIntersection.length >= 1) {
                            columnFilteredEntries.push(cellHTMLValue);
                            columnFilteredEntriesMap.push(classList);
                            // if there aren't any selections in the category or tooling filters
                        } else if (categoryFilterSelections.length == 0 && toolingFilterSelections.length == 0) {
                            columnFilteredEntries.push(cellHTMLValue);
                            columnFilteredEntriesMap.push(classList);
                        }
                    }
                    rowIndex++;
                });
                newFilteredPlaybookEntries.push(columnFilteredEntries)

            }

            // filter list of entries without
            var columnFilteredEntriesMapFlat = [...new Set(columnFilteredEntriesMap.flat(1))];

            // green white gray for the tooling filter
            $('#toolingFilter')
                .children('option')
                .each(function(index, elem) {
                    // if there are no selections in the category filter and there are selections in the tooling filter
                    if (categoryFilterSelections.length == 0 && toolingFilterSelections.length >= 1) {
                        // if the tooling selection includes the value, green
                        if (toolingFilterSelections.includes($(elem).val())) {
                            $(elem).removeClass('dark-gray');
                            $(elem).removeClass('light-gray');
                            $(elem).addClass('green');
                        }
                        // else, light gray
                        else {
                            $(elem).removeClass('dark-gray');
                            $(elem).removeClass('green');
                            $(elem).prop('enabled', true);
                            $(elem).addClass('light-gray');
                        }
                    }
                    // if there aren't any selections in either filter, white
                    else if (toolingFilterSelections.length == 0 && categoryFilterSelections.length == 0) {
                        $(elem).removeClass('dark-gray');
                        $(elem).removeClass('light-gray');
                        $(elem).removeClass('green');
                    }
                    // if there are selections in the category filter
                    else if (categoryFilterSelections.length >= 1) {
                        // if the element isn't possible, dark gray
                        var darkGrayCheck = false;
                        for (var i in categoryFilterSelections) {
                            for (var z in categoryMap) {
                                if (categoryFilterSelections[i] == categoryMap[z][0]) {
                                    if (categoryMap[z][1].includes($(elem).val())) {
                                        var darkGrayCheck = true + darkGrayCheck;
                                    }
                                }
                            }
                        }
                        if (darkGrayCheck == 0) {
                            $(elem).removeClass('light-gray');
                            $(elem).removeClass('green');
                            $(elem).addClass('dark-gray');
                        }
                        // if there are selections in the tooling filter and the tooling filter includes the value, green
                        else if (toolingFilterSelections.length >= 1 && toolingFilterSelections.includes($(elem).val())) {
                            $(elem).removeClass('dark-gray');
                            $(elem).removeClass('light-gray');
                            $(elem).addClass('green');


                        }
                        // if there are selections in both, check to see any non-selected are possible, light gray
                        else if (categoryFilterSelections.length >= 1 && toolingFilterSelections.length >= 1) {
                            for (var i in categoryFilterSelections) {
                                for (var z in categoryMap) {
                                    if (categoryFilterSelections[i] == categoryMap[z][0]) {
                                        if (categoryMap[z][1].includes($(elem).val())) {
                                            $(elem).removeClass('dark-gray');
                                            $(elem).removeClass('green');
                                            $(elem).addClass('light-gray');
                                        }
                                    }
                                }
                            }
                        }
                        // else, set to white
                        else {
                            $(elem).removeClass('dark-gray');
                            $(elem).removeClass('light-gray');
                            $(elem).removeClass('green');
                        }
                    }
                    // else, set to white
                    else {
                        $(elem).removeClass('dark-gray');
                        $(elem).removeClass('light-gray');
                        $(elem).removeClass('green');
                    }

                });

            // refresh the filter
            $('#toolingFilter').selectpicker('refresh');

            // green white gray for the category filter
            $('#categoryFilter')
                .children('option')
                .each(function(index, elem) {
                    // if there are no selections in the tooling filter and there are selections in the category filter
                    if (toolingFilterSelections.length == 0 && categoryFilterSelections.length >= 1) {
                        // if the category selection includes the value, green
                        if (categoryFilterSelections.includes($(elem).val())) {
                            $(elem).removeClass('dark-gray');
                            $(elem).removeClass('light-gray');
                            $(elem).addClass('green');
                        }
                        // else, light gray
                        else {
                            $(elem).removeClass('dark-gray');
                            $(elem).removeClass('green');
                            $(elem).prop('enabled', true);
                            $(elem).addClass('light-gray');
                        }
                    }
                    // if there aren't any selections in either filter, white
                    else if (categoryFilterSelections.length == 0 && toolingFilterSelections.length == 0) {
                        $(elem).removeClass('dark-gray');
                        $(elem).removeClass('light-gray');
                        $(elem).removeClass('green');
                    }
                    // if there are selections in the tooling filter
                    else if (toolingFilterSelections.length >= 1) {
                        // if the element isn't included, dark gray
                        var darkGrayCheck = false;
                        for (var i in toolingFilterSelections) {
                            for (var z in toolingMap) {
                                if (toolingFilterSelections[i] == toolingMap[z][0]) {
                                    if (toolingMap[z][1].includes($(elem).val())) {
                                        var darkGrayCheck = true + darkGrayCheck;
                                    }
                                }
                            }
                        }
                        if (darkGrayCheck == 0) {
                            $(elem).removeClass('light-gray');
                            $(elem).removeClass('green');
                            $(elem).addClass('dark-gray');
                        }
                        // if there are selections in the category filter and the category filter includes the value, green
                        else if (categoryFilterSelections.length >= 1 && categoryFilterSelections.includes($(elem).val())) {
                            $(elem).removeClass('dark-gray');
                            $(elem).removeClass('light-gray');
                            $(elem).addClass('green');
                        }
                        // if there are selections in both, check to see any non-selected are possible, light gray
                        else if (toolingFilterSelections.length >= 1 && categoryFilterSelections.length >= 1) {
                            for (var i in toolingFilterSelections) {
                                for (var z in toolingMap) {
                                    if (toolingFilterSelections[i] == toolingMap[z][0]) {
                                        if (toolingMap[z][1].includes($(elem).val())) {
                                            $(elem).removeClass('dark-gray');
                                            $(elem).removeClass('green');
                                            $(elem).addClass('light-gray');
                                        }
                                    }
                                }
                            }
                        }
                        // else, set to white
                        else {
                            $(elem).removeClass('dark-gray');
                            $(elem).removeClass('light-gray');
                            $(elem).removeClass('green');
                        }
                    }
                    // else, set to white
                    else {
                        $(elem).removeClass('dark-gray');
                        $(elem).removeClass('light-gray');
                        $(elem).removeClass('green');
                    }
                });

            // refresh the category filter
            $('#categoryFilter').selectpicker('refresh');


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
    } catch (e) {

    }

    // nav labels
    $('.navigation-list-child-list').each(function() {
        $($(this)[0].childNodes).each(function() {
            var itemCount = 0;
            try {
                var itemCount = $(this)[0].childNodes[1].childElementCount;
                $(this)[0].innerHTML = $(this)[0].innerHTML.replace($(this)[0].innerText, $(this)[0].innerText + ' (' + itemCount + ')');
            } catch (e) {}
        })
    })

    $(".navigation-list-child-list").each(function() {
        try {
            var context = $(this);
            children = context.find('li');
            a = context.prev("a").children();
            innerText = $(this)[0].parentElement.innerText.replace('&', 'and');
            innerHTML = $(this)[0].parentElement.innerHTML.replace('&amp;', 'and');
            count = children.length
            if (innerText != 'System Planning') {
                childrenRemove = context.find('li > ul').length;
                count = children.length - childrenRemove;
            } else {
                childrenRemove = context.find('.navigation-list-grandchild-list > .navigation-list-item').length;
                count = children.length - childrenRemove;
            }
            $(this)[0].parentElement.innerHTML = innerHTML.replace(innerText, innerText.replace(' and ', ' & ') + ' (' + count + ')');
            a.data('cnt', count);
        } catch (e) {}
    });
});
