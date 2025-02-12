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
        if (AOS?.init) {
          AOS.init({
            duration: 1200,
          });
        }

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


        // Calendar Time Titles
        // Adds a title attribute with the event title to the time element in a calendar entry so hover over works for it as well
        const ctels = once('.js-drupal-fullcalendar', '.fc-time[data-start]', context);
        ctels.forEach(function (ctel) {
          if (ctel?.nextSibling) {
            const nsatt = ctel.nextSibling.getAttribute('title');
            if (nsatt && nsatt?.length > 0) {
              ctel.setAttribute('title', nsatt);
            }
          }
        });
      }); // End of Document Ready
    }
  };  // End of csc_bs_sass_other behavior

  Drupal.behaviors.csc_bs_sass_social_media = {
    attach: function(context, settings) {
      $(document).ready(() => {
        const checkIG = () => {
          const igbq = $('div.instagram-feed blockquote.instagram-media');
          if (igbq?.length > 0) {
            igbq.addClass('failed').attr('title', 'Screenshot of CSC’s Instagram feed').click((e) => {
              window.open('https://www.instagram.com/uvacsc/', '_blank').focus();
            });
          }
        };
        setTimeout(checkIG, 1500);

        const checkFB = () => {
          const fbpg = $('div.fb-page blockquote.fb-xfbml-parse-ignore');
          // console.log(fbpg);
          if (fbpg?.length > 0) {
            $('div.fb-page').addClass('failed').attr('title', 'Screenshot of CSC’s Facebook feed').click((e) => {
              window.open('https://www.facebook.com/UVACSC/', '_blank').focus();
            });
          }
        }
        setTimeout(checkFB, 3000);
      }); // End of document ready
    }
  } // End of csc_bs_sass_social_media behavior

  // Fixes drop down menu items not getting highlighted when on their page
  Drupal.behaviors.csc_bs_sass_menu_highlight = {
    attach: function(context, settings) {
      // fix give menu link so it opens in new window
      $('a.nav-link-https--wwwgivecampuscom-campaigns-19165-donations-new').attr('target', '_blank');
      // Fix menu highlighting (greyed out) for specific links that aren't working
      const paths = [
        {
          path: '/research/salon',
          selectors: 'nav-link--research-salon'
        },
        {
          path: '/contact-us',
          selectors: 'nav-link--csc-contact-info'
        },
        {
          path: '/research',
          selectors: 'nav-link--research'
        },
        {
          path: '/events',
          selectors: 'nav-link--events'
        },
        {
          path: '/events',
          hashes: [
            {
              hash: '#dropins',
              selectors: 'nav-link--eventsdropins',
            },
            {
              hash: '#special-events',
              selectors: 'nav-link--eventsspecial-events',
            }
          ]
        },
        {
          path: '/students/opportunities',
          hashes: [
            {
              hash: '#ccsa',
              selectors: 'nav-link--students-opportunitiesccsa',
            },
          ]
        },
      ];
      $(document).ready(() => {
        const loc = window.location.pathname;
        const myhash = window.location.hash;
        paths.forEach((data, index) => {
          if (data.path === loc) {
            if (data?.hashes) {
              data.hashes.forEach((hdata, hindex) => {
                if (hdata.hash === myhash) {
                  $('.nav-item li.dropdown-item a.active').removeClass('active');
                  $(`.nav-item li.dropdown-item`).has(`a.${hdata.selectors}`).addClass('active');
                }
              });
            } else {
              $(`.nav-item li.dropdown-item`).has(`a.${data.selectors}`).addClass('active');
            }
          }
        }); // end of paths.forEach

        $(window).on('hashchange', function () {
          console.log("Hash changed to: " + location.hash);
          const loc = window.location.pathname;
          const myhash = window.location.hash;
          paths.forEach((data, index) => {
            if (data.path === loc) {
              data.hashes.forEach((hdata, hindex) => {
                if (hdata.hash === myhash) {
                  $('.nav-item li.dropdown-item a.is-active').removeClass('is-active');
                  $('.nav-item li.dropdown-item.active').removeClass('active');
                  $(`.nav-item li.dropdown-item`).has(`a.${hdata.selectors}`).addClass('active');
                }
              });
            }
          });
        }); // End of on hash change
      }); // End of document ready
    } // End of attach
  } // End of csc_bs_sass_menu_highlight behavior

})(jQuery, Drupal);
