/*jshint esversion: 6 */
/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  // Behaviors for Admin screens
  Drupal.behaviors.csc_bs_sass_admin = {
    attach: function(context, settings) {
      $(document).ready(() => {
        // Move node edit links etc. up to top admin nav bar. "Tabs" Block must be in a footer or somewhere on the page.
        if ($('#toolbar-bar').length > 0 && $('#node-admin-links').length > 0) {
          $('#node-admin-links').appendTo('#toolbar-bar');
        }
      });

    }
  };

  // Global Listener Behaviors
  Drupal.behaviors.csc_bs_sass_global_listeners = {
    attach: function(context, settings) {
      $(document).ready(() => {
        $('div.icon.show-search').hover(function(e) {
          $('#search-block-form').addClass('show');
        });
      });

    }
  };

  Drupal.behaviors.csc_bs_sass_other = {
    attach: function(context, settings) {
      $(document).ready(() => {
        // Initialize animate on scroll.
        AOS.init({
          duration: 1200,
        });
        // Search box expanding
        // console.log("adding click handler", $('.search-container .search-button')?.length);
        $('.search-container .search-button').on('click', function(e) {
          // console.log("Clicked", e.which, e);
          e.preventDefault();
          let inbox = $(this).parents('.search-container').find('.search-input');
          if (inbox.hasClass('active')) {
            inbox.removeClass('active');
          } else {
            inbox.addClass('active');
            // Somehow Calendar JS removes this or doesn't allow it to get set. This is for calendar page.
            setTimeout(function() {
              if (!inbox.hasClass('active')) {
                inbox.addClass('active');
              }
            }, 200, inbox);
          }
          return false;
        });
      });
    }
  };

})(jQuery, Drupal);
