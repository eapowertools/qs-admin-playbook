$(document).ready(function() {
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, "includes", {
            enumerable: false,
            value: function(obj) {
                var newArr = this.filter(function(el) {
                    return el == obj;
                });
                return newArr.length > 0;
            }
        });
    }

    if (!Array.from) {
        Array.from = (function() {
            var toStr = Object.prototype.toString;
            var isCallable = function(fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function(value) {
                var number = Number(value);
                if (isNaN(number)) {
                    return 0;
                }
                if (number === 0 || !isFinite(number)) {
                    return number;
                }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function(value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            // The length property of the from method is 1.
            return function from(arrayLike /*, mapFn, thisArg */ ) {
                // 1. Let C be the this value.
                var C = this;

                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);

                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }

                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }

                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }

                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);

                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }

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
                        let difference = rawClasses[i].filter(function(x) { return ![category].includes(x) });
                        for (z in categoryMap) {
                            if (categoryMap[z][0] == category) {
                                categoryMap[z][1].push(difference);
                            }

                        }
                    }
                });
        }

        // get distinct values for each
        categoryMap.forEach(function(row) {
            row[1] = [].concat.apply([], row[1]);
            var newArray = [];
            for (var i = 0; i < row[1].length; i++) {
                if (newArray.indexOf(row[1][i]) === -1 && row[1][i] !== '') {
                    newArray.push(row[1][i]);
                }
            }
            row[1] = newArray;
        });

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
                        let difference = rawClasses[i].filter(function(x) { return ![tooling].includes(x) });
                        for (z in toolingMap) {
                            if (toolingMap[z][0] == tooling) {
                                toolingMap[z][1].push(difference);
                            }

                        }
                    }
                });
        }

        // get distinct values for each
        toolingMap.forEach(function(row) {
            row[1] = [].concat.apply([], row[1]);
            var newArray = [];
            for (var i = 0; i < row[1].length; i++) {
                if (newArray.indexOf(row[1][i]) === -1 && row[1][i] !== '') {
                    newArray.push(row[1][i]);
                }
            }
            row[1] = newArray;
        });

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
                        var categoryIntersection = categoryFilterSelections.filter(function(element) { return classList.includes(element) });
                        var toolingIntersection = toolingFilterSelections.filter(function(element) { return classList.includes(element) });

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
            columnFilteredEntriesMap = [].concat.apply([], columnFilteredEntriesMap);
            var columnFilteredEntriesMapFlat = [];
            for (var i = 0; i < columnFilteredEntriesMap.length; i++) {
                if (columnFilteredEntriesMapFlat.indexOf(columnFilteredEntriesMap[i]) === -1 && columnFilteredEntriesMap[i] !== '') {
                    columnFilteredEntriesMapFlat.push(columnFilteredEntriesMap[i]);
                }
            }

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
                $(this)[0].firstChild.innerHTML = $(this)[0].firstChild.innerHTML.replace($(this)[0].firstChild.innerText, $(this)[0].firstChild.innerText + ' (' + itemCount + ')');
            } catch (e) {}
        })
    })

    $(".navigation-list-child-list").each(function() {
        try {
            var context = $(this);
            children = context.find('li');
            a = context.prev("a").children();
            innerText = $(this)[0].parentElement.firstChild.innerText.replace('&', 'and');
            innerHTML = $(this)[0].parentElement.firstChild.innerHTML.replace('&amp;', 'and');
            count = children.length
            if (innerText != 'System Planning') {
                childrenRemove = context.find('li > ul').length;
                count = children.length - childrenRemove;
            } else {
                childrenRemove = context.find('.navigation-list-grandchild-list > .navigation-list-item').length;
                count = children.length - childrenRemove;
            }
            $(this)[0].parentElement.firstChild.innerHTML = innerHTML.replace(innerText, innerText.replace(' and ', ' & ') + ' (' + count + ')');
            a.data('cnt', count);
        } catch (e) {}
    });
});
