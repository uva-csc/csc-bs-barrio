/**
 * @file
 * Wires the shared #video-player-modal iframe to whichever card triggered it.
 */

(function (Drupal, once) {

  'use strict';

  Drupal.behaviors.cscVideoModal = {
    attach: function (context) {
      once('csc-video-modal', '#video-player-modal', context).forEach(function (modalEl) {
        // Move to a direct child of body. Left nested in the view markup, some
        // ancestor establishes a CSS containing block for fixed-position
        // elements (couldn't pin down which — none of the usual transform/
        // filter/contain/perspective/will-change checks matched), which makes
        // the modal size itself against the content column instead of the
        // viewport and breaks both centering and the near-fullscreen sizing.
        document.body.appendChild(modalEl);

        var iframe = modalEl.querySelector('iframe');
        var titleEl = modalEl.querySelector('.modal-title');

        modalEl.addEventListener('show.bs.modal', function (event) {
          var trigger = event.relatedTarget;
          if (!trigger) {
            return;
          }
          var src = trigger.getAttribute('data-video-src');
          var title = trigger.getAttribute('data-video-title') || '';
          iframe.src = src ? src + '?autoplay=1' : '';
          iframe.title = title;
          titleEl.textContent = title;
        });

        modalEl.addEventListener('hidden.bs.modal', function () {
          // Clear the src so playback actually stops when the modal closes.
          iframe.src = '';
        });
      });
    }
  };

})(Drupal, once);
