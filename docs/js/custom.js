var normalizeHomeLinks = function () {
  var homeURL = window.location.origin
  // Check for preview mode
  var overwriteHomeLink = window.location.pathname.indexOf('/membersupport/') > -1;
  if (window.location.host.indexOf('.force.com')) overwriteHomeLink = true;
  
  if (overwriteHomeLink) {
    homeURL += '/membersupport/s/'
  }
  var homeLinks = jQuery('.home-link').attr('href', homeURL);
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
    csWatchForModal('.themeLayoutStarterWrapper');

    // Setup slick slider if needed
    if (jQuery( window ).width() < 768) {
      // Fomrat slick elements
      jQuery(".slick-target").slick();
    }
  } else {
    console.warn('jQuery not found')
  }
}, 2000)

// Watch for modal changes
var csWatchForModal = function (targetEl) {
  var $el = jQuery(targetEl);
  var $body = jQuery('body');
  if ($el.length) {
    var config = { attributes: true, subtree: false };
    var observer = new MutationObserver(function (mutationsList, observer) {
      for(var mutation of mutationsList) {
        if (mutation.type == 'attributes' && mutation.attributeName == 'class') {
          var hasNoScroll = $el.hasClass('no-scroll');
          if (hasNoScroll) {
            $body.addClass('cs-no-scroll');
          } else {
            $body.removeClass('cs-no-scroll');
          }
        }
      }
    });
    observer.observe($el[0], config);
  } else {
    console.warn('could not find modal observation target')
  }
}
