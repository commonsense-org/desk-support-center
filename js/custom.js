// target the table body
	// loop through the <tr> of the body
		// loop through the col of the tr
			// target the class='topic'
				// save the h4 element in memory
				// target class='articles'
					// get the href from it and save it in memory
					// assign the href to the above saved h4 element
var tableBody = $('.row-1 tbody');
var rows = $(tableBody.find('tr'));
rows.each(function(index, row) {
	row = $(row);
	var columns = row.find('td');
	columns.each(function(indexCol, td) {
		td = $(td);
		var h4 = td.find('h4');
		var link = td.find('h5 a').attr('href');
		h4.wrap('<a href="' + link + '" target="_blank"></a>');
	});
});



