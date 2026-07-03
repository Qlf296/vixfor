/**
 * ForgCV — Email Capture Modal
 * Shows a one-time email opt-in modal 3 seconds after the user
 * clicks a CV or cover-letter download button.
 *
 * localStorage keys:
 *   fgcv_email_shown     — JSON timestamp of last modal display
 *   fgcv_email_captured  — "true" once a valid email is stored
 *
 * Globals expected:
 *   cvf_track(event, label)  — defined in analytics.js (may be a no-op stub)
 *
 * Usage:
 *   Loaded with <script defer src="js/email-capture.js"></script>
 *   window.ForgCVEmailCapture.init() is called automatically on DOMContentLoaded.
 */
(function () {
  'use strict';

  /* ── Constants ─────────────────────────────────────────── */
  var COOLDOWN_MS  = 7 * 24 * 60 * 60 * 1000; // 7 days
  var DELAY_MS     = 3000;                      // 3 s after download click
  var LS_SHOWN_KEY = 'fgcv_email_shown';
  var LS_CAP_KEY   = 'fgcv_email_captured';
  // TODO: add Formspree endpoint
  var FORMSPREE_URL = '';

  /* ── Storage helpers ────────────────────────────────────── */
  function lsGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  /* ── Throttle check ─────────────────────────────────────── */
  function shouldShow() {
    var ts = lsGet(LS_SHOWN_KEY);
    if (!ts) return true;
    return (Date.now() - parseInt(ts, 10)) > COOLDOWN_MS;
  }

  /* ── Email validation ───────────────────────────────────── */
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  /* ── Build modal HTML ───────────────────────────────────── */
  function buildModal(source) {
    var title    = source === 'cv_download' ? '📄 Your CV is downloading!' : '📝 Your cover letter is downloading!';
    var subtitle = 'Get weekly job tips &amp; stand out from other candidates →';

    var html = [
      '<div id="fgcv-email-overlay" role="dialog" aria-modal="true" aria-label="Stay in touch" ',
          'style="position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.52);',
                 'display:flex;align-items:center;justify-content:center;padding:1rem;',
                 'animation:fgcv-fadein 0.22s ease both;">',

        '<div id="fgcv-email-card" ',
             'style="position:relative;width:100%;max-width:420px;background:var(--clr-surface,#fff);',
                    'border-radius:20px;padding:2rem;',
                    'box-shadow:0 24px 64px rgba(0,0,0,0.22),0 4px 16px rgba(91,87,255,0.12);',
                    'animation:fgcv-slidein 0.28s cubic-bezier(.22,.68,0,1.2) both;">',

          /* Close button */
          '<button id="fgcv-email-close" aria-label="Close" ',
                  'style="position:absolute;top:14px;right:16px;background:none;border:none;',
                         'font-size:1.25rem;line-height:1;cursor:pointer;color:var(--clr-text-3,#888);',
                         'padding:4px 6px;border-radius:6px;" ',
                  'type="button">✕</button>',

          /* Title */
          '<h2 style="margin:0 0 0.35rem;font-size:1.2rem;font-weight:700;',
                     'color:var(--clr-text,#111);padding-right:2rem;">',
            title,
          '</h2>',

          /* Subtitle */
          '<p style="margin:0 0 1.2rem;font-size:0.9rem;color:var(--clr-text-2,#555);">',
            subtitle,
          '</p>',

          /* Form */
          '<div id="fgcv-email-form-wrap">',
            '<input id="fgcv-email-input" type="email" placeholder="your@email.com" autocomplete="email" ',
                   'style="display:block;width:100%;box-sizing:border-box;',
                          'border:1.5px solid var(--clr-border,#e2e2e2);border-radius:10px;',
                          'padding:0.65rem 0.9rem;font-size:0.95rem;',
                          'color:var(--clr-text,#111);background:var(--clr-bg,#fafafa);',
                          'margin-bottom:0.75rem;outline:none;transition:border-color 0.15s;" />',

            '<p id="fgcv-email-error" role="alert" ',
               'style="display:none;margin:0 0 0.55rem;font-size:0.8rem;color:#e53e3e;"></p>',

            '<button id="fgcv-email-submit" type="button" ',
                    'style="display:block;width:100%;padding:0.7rem 1rem;',
                           'background:linear-gradient(135deg,#5B57FF,#7C3AED);',
                           'color:#fff;font-size:0.95rem;font-weight:700;',
                           'border:none;border-radius:10px;cursor:pointer;',
                           'letter-spacing:0.01em;transition:opacity 0.15s;">',
              'Subscribe &mdash; it\'s free &nbsp;→',
            '</button>',

            '<p style="margin:0.75rem 0 0;font-size:0.78rem;text-align:center;',
                      'color:var(--clr-text-3,#888);">',
              'No spam. Unsubscribe anytime.',
            '</p>',
          '</div>',  /* /#fgcv-email-form-wrap */

          /* Success state (hidden initially) */
          '<div id="fgcv-email-success" style="display:none;text-align:center;padding:0.5rem 0;">',
            '<p style="font-size:1.05rem;font-weight:600;color:var(--clr-text,#111);margin:0;">',
              '✅ Thanks! We\'ll keep you updated.',
            '</p>',
          '</div>',

        '</div>',  /* /#fgcv-email-card */
      '</div>',    /* /#fgcv-email-overlay */

      /* Keyframe animations injected once */
      '<style id="fgcv-email-styles">',
        '@keyframes fgcv-fadein{from{opacity:0}to{opacity:1}}',
        '@keyframes fgcv-slidein{from{opacity:0;transform:translateY(18px) scale(0.97)}to{opacity:1;transform:none}}',
        '#fgcv-email-input:focus{border-color:var(--clr-accent,#5B57FF);',
          'box-shadow:0 0 0 3px rgba(91,87,255,0.15);}',
        '#fgcv-email-submit:hover{opacity:0.88;}',
      '</style>',
    ].join('');

    return html;
  }

  /* ── Show modal ─────────────────────────────────────────── */
  function showModal(source) {
    if (document.getElementById('fgcv-email-overlay')) return; // already open
    if (!shouldShow()) return;

    // Record display timestamp
    lsSet(LS_SHOWN_KEY, String(Date.now()));

    document.body.insertAdjacentHTML('beforeend', buildModal(source));

    var overlay  = document.getElementById('fgcv-email-overlay');
    var card     = document.getElementById('fgcv-email-card');
    var closeBtn = document.getElementById('fgcv-email-close');
    var input    = document.getElementById('fgcv-email-input');
    var submit   = document.getElementById('fgcv-email-submit');
    var error    = document.getElementById('fgcv-email-error');
    var formWrap = document.getElementById('fgcv-email-form-wrap');
    var success  = document.getElementById('fgcv-email-success');

    function close() {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      var styles = document.getElementById('fgcv-email-styles');
      if (styles && styles.parentNode) styles.parentNode.removeChild(styles);
    }

    function showSuccess() {
      formWrap.style.display = 'none';
      success.style.display  = 'block';
      setTimeout(close, 2000);
    }

    function handleSubmit() {
      var val = input.value;
      if (!isValidEmail(val)) {
        error.textContent = 'Please enter a valid email address.';
        error.style.display = 'block';
        input.focus();
        return;
      }

      error.style.display = 'none';
      lsSet(LS_CAP_KEY, 'true');

      if (typeof cvf_track === 'function') {
        cvf_track('email_capture_submit', source);
      }

      // Optional Formspree submission
      if (FORMSPREE_URL) {
        var fd = new FormData();
        fd.append('email', val.trim());
        fd.append('source', source);
        fetch(FORMSPREE_URL, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
          .catch(function () {}); // fire and forget — don't block UX on network errors
      }

      showSuccess();
    }

    /* Event: close button */
    closeBtn.addEventListener('click', close);

    /* Event: click outside card */
    overlay.addEventListener('click', function (e) {
      if (!card.contains(e.target)) close();
    });

    /* Event: Escape key */
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escHandler);
      }
    });

    /* Event: submit button */
    submit.addEventListener('click', handleSubmit);

    /* Event: Enter key in input */
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleSubmit();
    });

    input.focus();
  }

  /* ── Attach download button listeners ───────────────────── */
  function attachListeners() {
    var cvBtn  = document.getElementById('btn-download-pdf');
    var clBtn  = document.getElementById('btn-cl-download');

    if (cvBtn) {
      cvBtn.addEventListener('click', function () {
        setTimeout(function () { showModal('cv_download'); }, DELAY_MS);
      });
    }

    if (clBtn) {
      clBtn.addEventListener('click', function () {
        setTimeout(function () { showModal('letter_download'); }, DELAY_MS);
      });
    }
  }

  /* ── Public API ─────────────────────────────────────────── */
  window.ForgCVEmailCapture = {
    init: function () {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachListeners);
      } else {
        attachListeners();
      }
    }
  };

  /* ── Auto-init ──────────────────────────────────────────── */
  window.ForgCVEmailCapture.init();

})();
