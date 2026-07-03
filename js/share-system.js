/**
 * ForgCV — Viral Share System
 * Injects a compact share strip below the download area after a CV or
 * cover-letter download button is clicked.
 *
 * Injection targets:
 *   CV download     → element with class .download-actions  (insertAdjacentHTML afterend)
 *   Letter download → element with id   #cl-result-actions  (insertAdjacentHTML afterend)
 *
 * Globals expected:
 *   cvf_track(event, label)  — defined in analytics.js (may be a no-op stub)
 *
 * Usage:
 *   Loaded with <script defer src="js/share-system.js"></script>
 *   window.ForgCVShare.init() is called automatically on DOMContentLoaded.
 */
(function () {
  'use strict';

  /* ── URLs ───────────────────────────────────────────────── */
  var BASE_URL = 'https://forgcv.com/?utm_source=share&utm_medium=cv_download&utm_campaign=viral';
  var LI_URL   = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(BASE_URL);
  var WA_URL   = 'https://wa.me/?text=' + encodeURIComponent(
    'I just created my CV for free 📄 Try ForgCV: ' + BASE_URL
  );

  var PANEL_ID = 'forgcv-share-panel';

  /* ── Track helper ───────────────────────────────────────── */
  function track(platform) {
    if (typeof cvf_track === 'function') {
      cvf_track('share_click', platform);
    }
  }

  /* ── Build panel HTML ───────────────────────────────────── */
  function buildPanel() {
    var useNative = !!(navigator.share);

    var buttonsHTML;
    if (useNative) {
      buttonsHTML = [
        '<button class="fgcv-share-btn" data-action="native" ',
                'style="background:linear-gradient(135deg,#5B57FF,#7C3AED);color:#fff;border:none;">',
          'Share &rarr;',
        '</button>',
      ].join('');
    } else {
      buttonsHTML = [
        '<button class="fgcv-share-btn" data-action="copy_link" ',
                'style="background:var(--clr-surface,#fff);color:var(--clr-text,#111);',
                       'border:1.5px solid var(--clr-border,#e2e2e2);">',
          '🔗 Copy link',
        '</button>',
        '<button class="fgcv-share-btn" data-action="linkedin" ',
                'style="background:#0A66C2;color:#fff;border:none;">',
          '💼 LinkedIn',
        '</button>',
        '<button class="fgcv-share-btn" data-action="whatsapp" ',
                'style="background:#25D366;color:#fff;border:none;">',
          '💬 WhatsApp',
        '</button>',
      ].join('');
    }

    var html = [
      '<div id="' + PANEL_ID + '" ',
           'style="overflow:hidden;max-height:0;transition:max-height 0.35s cubic-bezier(.4,0,.2,1);',
                  'margin-top:0.75rem;">',
        '<div style="background:var(--clr-surface,#fff);border:1.5px solid var(--clr-border,#e2e2e2);',
                    'border-radius:var(--r-xl,14px);padding:0.9rem 1rem;">',

          '<p style="margin:0 0 0.6rem;font-size:0.8rem;font-weight:600;',
                    'color:var(--clr-text-2,#555);letter-spacing:0.01em;">',
            'Share ForgCV with a friend who\'s job hunting:',
          '</p>',

          '<div id="fgcv-share-btns" ',
               'style="display:flex;flex-wrap:wrap;gap:0.5rem;">',
            buttonsHTML,
          '</div>',

        '</div>',
      '</div>',

      /* Button styles injected once */
      '<style id="fgcv-share-styles">',
        '.fgcv-share-btn{',
          'padding:0.45rem 0.9rem;border-radius:var(--r-full,999px);',
          'font-size:0.82rem;font-weight:600;cursor:pointer;',
          'transition:opacity 0.15s,transform 0.1s;white-space:nowrap;',
          'line-height:1.4;',
        '}',
        '.fgcv-share-btn:hover{opacity:0.85;transform:translateY(-1px);}',
        '.fgcv-share-btn:active{transform:translateY(0);}',
      '</style>',
    ].join('');

    return html;
  }

  /* ── Inject panel next to a trigger element ─────────────── */
  function injectPanel(anchor) {
    if (!anchor) return;
    if (document.getElementById(PANEL_ID)) return; // already injected

    anchor.insertAdjacentHTML('afterend', buildPanel());

    // Animate open on next frame
    var panel = document.getElementById(PANEL_ID);
    if (!panel) return;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        panel.style.maxHeight = '200px';
      });
    });

    /* Wire up button actions */
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('.fgcv-share-btn');
      if (!btn) return;

      var action = btn.getAttribute('data-action');

      if (action === 'copy_link') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(BASE_URL).then(function () {
            var orig = btn.textContent;
            btn.textContent = '✅ Copied!';
            setTimeout(function () { btn.textContent = orig; }, 2000);
          }).catch(function () {});
        } else {
          /* Fallback for older browsers */
          var ta = document.createElement('textarea');
          ta.value = BASE_URL;
          ta.style.position = 'fixed';
          ta.style.opacity  = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (err) {}
          document.body.removeChild(ta);
          var orig2 = btn.textContent;
          btn.textContent = '✅ Copied!';
          setTimeout(function () { btn.textContent = orig2; }, 2000);
        }
        track('copy_link');
      }

      else if (action === 'linkedin') {
        window.open(LI_URL, '_blank', 'noopener,noreferrer');
        track('linkedin');
      }

      else if (action === 'whatsapp') {
        window.open(WA_URL, '_blank', 'noopener,noreferrer');
        track('whatsapp');
      }

      else if (action === 'native') {
        if (navigator.share) {
          navigator.share({
            title: 'ForgCV',
            text:  'Create your CV free',
            url:   BASE_URL
          }).then(function () {
            track('native');
          }).catch(function () {});
        }
      }
    });
  }

  /* ── Find the best anchor element for injection ─────────── */
  function findAnchor(triggerId) {
    if (triggerId === 'btn-download-pdf') {
      // Try the closest .download-actions container first; fall back to button itself
      var btn = document.getElementById('btn-download-pdf');
      if (!btn) return null;
      var wrap = btn.closest('.download-actions');
      return wrap || btn;
    }
    if (triggerId === 'btn-cl-download') {
      var resultActions = document.getElementById('cl-result-actions');
      if (resultActions) return resultActions;
      var clBtn = document.getElementById('btn-cl-download');
      return clBtn || null;
    }
    return null;
  }

  /* ── Attach click listeners ─────────────────────────────── */
  function attachListeners() {
    var cvBtn = document.getElementById('btn-download-pdf');
    var clBtn = document.getElementById('btn-cl-download');

    if (cvBtn) {
      cvBtn.addEventListener('click', function () {
        injectPanel(findAnchor('btn-download-pdf'));
      });
    }

    if (clBtn) {
      clBtn.addEventListener('click', function () {
        injectPanel(findAnchor('btn-cl-download'));
      });
    }
  }

  /* ── Public API ─────────────────────────────────────────── */
  window.ForgCVShare = {
    init: function () {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachListeners);
      } else {
        attachListeners();
      }
    }
  };

  /* ── Auto-init ──────────────────────────────────────────── */
  window.ForgCVShare.init();

})();
