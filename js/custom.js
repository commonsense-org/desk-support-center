// THIS MUST BE ADDED INLINE TO THE DESK HTML DOC

if ($( window ).width() < 500) {

    $(".slick-target").slick();
}
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

var set = false;
if (window.location.pathname.slice(window.location.pathname.length - 8) === 'articles') {
  $('#company-support-portal').addClass('topics');
  set = true;
}
if (window.location.pathname.slice(window.location.pathname.length - 6) === 'search') {
  $('#company-support-portal').addClass('topics search-page');
  set = true;
}
if (!set && window.location.pathname !== '/') {
    $('#company-support-portal').addClass('topics question-page');
}
  // ---- row 8: edit the styles of the twitter iframe
  var twitterDiv = $('.row-8 .twitter-container');
  twitterDiv.hide();
  setTimeout(function() {
    var iframe = $('iframe').contents();
    iframe.find(".timeline-Header").css('display', 'none');
    iframe.find(".timeline-Footer").css('display', 'none');
    iframe.find(".timeline-Tweet-media").css('display', 'none');

    // get the text out of twitter and append respective element
    var csmTweet = $('.csm-twitter iframe').contents().find('.timeline-Tweet-text').html();
    $('.csm-twitter').html(csmTweet);
    var edTweet = $('.ed-twitter iframe').contents().find('.timeline-Tweet-text').html();
    $('.ed-twitter').html(edTweet);
    var kaTweet = $('.ka-twitter iframe').contents().find('.timeline-Tweet-text').html();
    $('.ka-twitter').html(kaTweet);
    // show the twitter section after loaded
    twitterDiv.show();
  }, 2500);

// make the footer links clickable
$('.row-8 .url-open').click(function() {
  var url = $(this).attr('data');
  window.open(url, "_self");
});
// Footer open-close effect on mobile
$('.parent-menu-item').click(function() {
  $(this).toggleClass('expanded');
});