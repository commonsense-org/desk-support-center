var normalizeHomeLinks = function () {
  var homeURL = window.location.origin
  // Check for preview mode
  var isPreviewMode = window.location.pathname.indexOf('/membersupport/') > -1;
  if (window.location.host.indexOf('.force.com')) isPreviewMode = true;
  
  if (isPreviewMode) {
    homeURL += '/membersupport/s/'
  }
  var homeLinks = jQuery('.home-link').attr('href', homeURL);
  console.log('homeLinks', homeLinks);
  
  return homeURL;
}

// Functions to run after page has had a change to load
var postProcess = setTimeout(function () {
  if (jQuery) {
    // Setup toggles for footer menu on mobile
    var items = jQuery('.parent-menu-item').click(function(evt) {
      jQuery(this).toggleClass('expanded');
    }); 

    normalizeHomeLinks();

    // Setup slick slider if needed
    if (jQuery( window ).width() < 500) {
      console.log('Format Slick');
      jQuery(".slick-target").slick();
    } else {
      console.log('No Slick');
    }
  } else {
    console.warn('jQuery not found')
  }
}, 2000)
