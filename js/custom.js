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

        // Menu links can't be set to target=_blank, only link=_blank, so converting classes 'new-window' to target=_blank
        $('.new-window a, a.new-window').attr('target', '_blank');

        // Scroll to top links (a.scrolltop)
        const aels = once('body', 'a.scrolltop', context);
        aels.forEach(function (ael) {
          $(ael).on('click', function(e) {
            e.preventDefault();
            window.scrollTo(0,0);
            return false;
          });
        }); // End of scroll to top links

      }); // End of Document Ready
    }
  };  // End of csc_bs_sass_other behavior

  Drupal.behaviors.csc_bs_sass_social_media = {
    attach: function(context, settings) {
      $(document).ready(() => {
        const checkIG = () => {
          const igbq = $('div.instagram-feed blockquote.instagram-media');
          if (igbq?.length > 0) {
            igbq.addClass('failed').click((e) => {
              window.open('https://www.instagram.com/uvacsc/', '_blank').focus();
            });
          }
        };
        setTimeout(checkIG, 1500);

        const checkFB = () => {
          const fbpg = $('div.fb-page blockquote.fb-xfbml-parse-ignore');
          console.log(fbpg);
          if (fbpg?.length > 0) {
            $('div.fb-page').addClass('failed').click((e) => {
              window.open('https://www.facebook.com/UVACSC/', '_blank').focus();
            });
          }
        }
        setTimeout(checkFB, 1500);
      }); // End of document ready
    }
  } // End of csc_bs_sass_social_media behavior

})(jQuery, Drupal);
