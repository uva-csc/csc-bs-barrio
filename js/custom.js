/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.csc_bs_sass = {
    attach: function(context, settings) {

      $(document).ready(() => {
        // Move node edit links etc. up to top admin nav bar. "Tabs" Block must be in a footer or somewhere on the page.
        if ($('#toolbar-bar').length > 0 && $('#node-admin-links').length > 0) {
          $('#node-admin-links').appendTo('#toolbar-bar');
        }
        // Enable mobil menu button
        $('#navbar-main').on('click', '.navbar-toggler', (e) => {
          const btn = $(e.currentTarget);
          const menu = $('#main-menu-list');
          if (btn.attr('aria-expanded') === 'false') {
            menu.addClass('show');
            btn.attr('aria-expanded', 'true');
          } else {
            menu.removeClass('show');
            btn.attr('aria-expanded', 'false');
          }
          // console.log('clicked!', e, $(e.currentTarget).attr('aria-expanded'));
        });
      });

    }
  };

})(jQuery, Drupal);
