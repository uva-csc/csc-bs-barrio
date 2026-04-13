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

      // Accordion Scroll Fix (show open item)
      // Prevent reattachment
      if ($(context).hasClass('accordion-scroll-fix-processed')) {
        return;
      }
      $(context).addClass('accordion-scroll-fix-processed');

      const container = document.querySelector('.ckeditor-accordion-container');
      if (!container) return;

      container.addEventListener('click', function (e) {
        const header = e.target.closest('dt');
        if (!header) return;

        setTimeout(() => {
          const activePanel = container.querySelector('dd.active');
          if (activePanel) {
            const relatedHeader = activePanel.previousElementSibling;
            if (relatedHeader && relatedHeader.tagName.toLowerCase() === 'dt') {
              const yOffset = -80; // adjust this based on your sticky header height
              const y = relatedHeader.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }
        }, 300);
      });
      // End of Accordion Scroll fix
    }
  }; // end of global listeners

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
            const screenwidth = $(window).width();
            const socialdiv = $('.csc-social-header'); //csc-social-header d-none d-xl-block
            if (inbox.hasClass('active')) {
              inbox.removeClass('active');
              setTimeout(() => {
                socialdiv.addClass('d-xl-block');
              }, 500);
            } else {
              inbox.addClass('active');
              setTimeout(() => {
                $('#kw').focus();
              }, 300);
              if (screenwidth < 1400) {
                socialdiv.removeClass('d-xl-block');
              }
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
        }); // End of Calendar Time Titles

        // Social media link fix
        const smlinks = once('fixSocialLinks', 'ul.social-media-links--platforms a', context);
        // console.log("smlinks", smlinks);
        setTimeout(() => {
          smlinks.forEach(function (ael) {
            ael.setAttribute('tabindex', '0');
          });
        }, 500);

        // People page default to staff
        if (
          window.location.pathname === '/people' &&
          window.location.search === ''
        ) {
          window.location.replace('/people?f%5B0%5D=roles%3Astaff');
        }
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
          selectors: 'nav-link--events',
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
            if (myhash?.length > 0) {
              data.hashes.forEach((hdata, hindex) => {
                if (hdata.hash === myhash) {
                  $('.nav-item li.dropdown-item a.active').removeClass('active');
                  $(`.nav-item li.dropdown-item`).has(`a.${hdata.selectors}`).addClass('active');
                }
              });
            }
            $(`.nav-item li.dropdown-item`).has(`a.${data.selectors}`).addClass('active');
          }
        }); // end of paths.forEach

        $(window).on('hashchange', function () {
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
              $(`.nav-item li.dropdown-item`).has(`a.${data.selectors}`).addClass('active');
            }
          });
        }); // End of on hash change
      }); // End of document ready
    } // End of attach
  } // End of csc_bs_sass_menu_highlight behavior

  Drupal.behaviors.csc_bs_sass_calendar = {
    attach: function(context, settings) {
      $(document).ready(() => {
        $('div#today-link a').click((e) => {
          e.preventDefault();
          $('td.is-today').get(0).scrollIntoView();
          return false;
        })
      });
    }
  } // End of Calendar

})(jQuery, Drupal);
