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
        const els = once('.search-container', '.search-button', context);
        els.forEach(function (el) {
          $(el).on('click', function(e) {
            e.preventDefault();
            let inbox = $(this).parents('.search-container').find('.search-input');
            if (inbox.hasClass('active')) {
              inbox.removeClass('active');
            } else {
              inbox.addClass('active');
            }
            return false;
          });
        });

      }); // End of Document Ready
    }
  };

})(jQuery, Drupal);
