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
        /*
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
         */
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

        // Calendar listener to close when clicked outside calendar
        const calid = 'block-csc-bs-sass-views-block-calendar-fullcalendar-block';
        const calel = document.getElementById(calid);
        const callink = document.getElementById('calendar-link');
        window.addEventListener('click', function(e){
          const isCalLink = $(e.target).attr("class")?.includes('fc-');  // Full calendar classes always begin with fc-
          if (!calel.contains(e.target) && !callink.contains(e.target) && !isCalLink){
            calel.classList.remove('show');
          }
        });
      });
    }
  };

  Drupal.toggleCalendar = (e) => {
    if (e) { e.preventDefault(); }
    const calel = $("#block-csc-bs-sass-views-block-calendar-fullcalendar-block");
    if (calel.hasClass('show')) {
      calel.removeClass('show');
    } else {
      calel.addClass('show');
      window.dispatchEvent(new Event('resize')); // Need to trigger resize event to get calendar to show inside div.
    }
    return false;
  };
})(jQuery, Drupal);
