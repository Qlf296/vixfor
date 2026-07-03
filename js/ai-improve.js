/**
 * ForgCV — Rule-based "AI Improve" for CV & Cover Letter fields
 *
 * CV Builder:
 *   Injects "✨ Improve with AI" button after #cv-summary (or first .form-textarea).
 *   Transforms the textarea text with rule-based substitutions and shows a preview
 *   with Apply / Keep original actions.
 *
 * Cover Letter:
 *   Same button injected after #cl-experience and #cl-motivation.
 *   Applies additional professional tone transforms.
 *
 * Globals expected:
 *   cvf_track(event, label)  — defined in analytics.js (may be a no-op stub)
 *
 * Usage:
 *   Loaded with <script defer src="js/ai-improve.js"></script>
 *   window.ForgCVAIImprove.init() is called automatically on DOMContentLoaded.
 */
(function () {
  'use strict';

  /* ── Shared weak-verb substitution map ──────────────────── */
  var WEAK_VERBS = [
    [/\bwas responsible for\b/gi, 'led'],
    [/\bparticipated in\b/gi,     'delivered'],
    [/\bworked on\b/gi,           'developed'],
    [/\bhelped with\b/gi,         'contributed to'],
    [/\bdid\b/g,                  'executed'],
    [/\bmade\b/g,                 'created'],
  ];

  /* ── Cover-letter extra substitution map ────────────────── */
  var CL_SUBS = [
    [/^Hi,/im,                    'Dear Hiring Manager,'],
    [/^Hello,/im,                 'Dear Hiring Manager,'],
    [/\bI want\b/gi,              'I am seeking'],
    [/\bI would like\b/gi,        'I am eager to'],
    [/\bI think\b/gi,             'I believe'],
    [/\breally\b/gi,              'genuinely'],
    [/\ba lot\b/gi,               'significantly'],
  ];

  /* ── Core text transformer ──────────────────────────────── */
  function improveText(raw, isCoverLetter) {
    var text = raw;

    /* 1. Apply weak-verb replacements */
    WEAK_VERBS.forEach(function (pair) {
      text = text.replace(pair[0], pair[1]);
    });

    /* 2. Cover-letter-specific replacements */
    if (isCoverLetter) {
      CL_SUBS.forEach(function (pair) {
        text = text.replace(pair[0], pair[1]);
      });
    }

    /* 3. Capitalize the first word of each sentence
          Matches: start of string or after . ! ? followed by whitespace */
    text = text.replace(/(^|[.!?]\s+)([a-z])/g, function (m, pre, letter) {
      return pre + letter.toUpperCase();
    });

    /* 4. Add measurable-results note to sentences that contain no digits */
    text = text.replace(/([^.!?\n]+[.!?])/g, function (sentence) {
      if (/\d/.test(sentence)) return sentence;
      /* Only append to declarative sentences (not very short ones like "Led.") */
      var trimmed = sentence.trim();
      if (trimmed.length < 20) return sentence;
      /* Insert before the terminal punctuation */
      return trimmed.replace(/([.!?])$/, ' (achieving measurable results)$1');
    });

    /* 5. Collapse multiple spaces */
    text = text.replace(/ {2,}/g, ' ');

    /* 6. Trim trailing whitespace from each line */
    text = text.split('\n').map(function (line) {
      return line.replace(/\s+$/, '');
    }).join('\n');

    return text.trim();
  }

  /* ── Shared button / preview styles (injected once) ─────── */
  var STYLES_ID = 'fgcv-ai-styles';
  function ensureStyles() {
    if (document.getElementById(STYLES_ID)) return;
    var s = document.createElement('style');
    s.id = STYLES_ID;
    s.textContent = [
      '.fgcv-ai-btn{',
        'display:inline-block;',
        'border:1.5px solid var(--clr-accent,#5B57FF);',
        'color:var(--clr-accent,#5B57FF);',
        'background:transparent;',
        'padding:6px 14px;',
        'border-radius:8px;',
        'font-size:0.8rem;',
        'font-weight:600;',
        'cursor:pointer;',
        'margin-top:6px;',
        'transition:background 0.15s,color 0.15s;',
        'line-height:1.4;',
      '}',
      '.fgcv-ai-btn:hover{',
        'background:var(--clr-accent,#5B57FF);',
        'color:#fff;',
      '}',
      '.fgcv-ai-preview{',
        'background:var(--clr-surface,#fff);',
        'border:1.5px solid rgba(91,87,255,0.3);',
        'border-radius:10px;',
        'padding:1rem;',
        'margin-top:8px;',
        'font-size:0.85rem;',
        'color:var(--clr-text-2,#555);',
        'white-space:pre-wrap;',
        'word-break:break-word;',
        'display:none;',
      '}',
      '.fgcv-ai-actions{',
        'display:none;',
        'gap:0.5rem;',
        'margin-top:6px;',
        'flex-wrap:wrap;',
      '}',
      '.fgcv-ai-apply{',
        'padding:5px 14px;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer;',
        'background:var(--clr-accent,#5B57FF);color:#fff;border:none;',
        'transition:opacity 0.15s;',
      '}',
      '.fgcv-ai-apply:hover{opacity:0.85;}',
      '.fgcv-ai-keep{',
        'padding:5px 14px;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer;',
        'background:transparent;border:1.5px solid var(--clr-border,#e2e2e2);',
        'color:var(--clr-text-2,#555);',
        'transition:border-color 0.15s;',
      '}',
      '.fgcv-ai-keep:hover{border-color:var(--clr-text-2,#555);}',
    ].join('');
    document.head.appendChild(s);
  }

  /* ── Wire up one textarea ───────────────────────────────── */
  function wireTextarea(textarea, isCoverLetter, trackLabel) {
    if (!textarea) return;
    if (textarea.dataset.fgcvAiWired) return; // idempotent
    textarea.dataset.fgcvAiWired = '1';

    /* Wrapper — needed so we can insert siblings after the textarea */
    var container = document.createElement('div');
    container.style.cssText = 'position:relative;';

    /* Insert wrapper around textarea */
    var parent = textarea.parentNode;
    parent.insertBefore(container, textarea);
    container.appendChild(textarea);

    /* Improve button */
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fgcv-ai-btn';
    btn.textContent = isCoverLetter ? '✨ Make it more professional' : '✨ Improve with AI';
    container.appendChild(btn);

    /* Preview box */
    var preview = document.createElement('div');
    preview.className = 'fgcv-ai-preview';
    preview.setAttribute('aria-live', 'polite');
    container.appendChild(preview);

    /* Actions row */
    var actions = document.createElement('div');
    actions.className = 'fgcv-ai-actions';
    actions.style.display = 'none';

    var applyBtn = document.createElement('button');
    applyBtn.type = 'button';
    applyBtn.className = 'fgcv-ai-apply';
    applyBtn.textContent = 'Apply ✓';

    var keepBtn = document.createElement('button');
    keepBtn.type = 'button';
    keepBtn.className = 'fgcv-ai-keep';
    keepBtn.textContent = 'Keep original ✗';

    actions.appendChild(applyBtn);
    actions.appendChild(keepBtn);
    container.appendChild(actions);

    /* State */
    var improved = '';

    function hidePreview() {
      preview.style.display  = 'none';
      actions.style.display  = 'none';
    }

    /* Click: Improve button */
    btn.addEventListener('click', function () {
      var raw = textarea.value;
      if (!raw.trim()) {
        preview.textContent = 'Nothing to improve yet — type some text first.';
        preview.style.display = 'block';
        actions.style.display = 'none';
        return;
      }

      improved = improveText(raw, isCoverLetter);

      if (improved === raw.trim()) {
        preview.textContent = '✅ Your text is already polished!';
        preview.style.display = 'block';
        actions.style.display = 'none';
      } else {
        preview.textContent   = improved;
        preview.style.display = 'block';
        actions.style.display = 'flex';
      }

      if (typeof cvf_track === 'function') {
        cvf_track('ai_improve', trackLabel);
      }
    });

    /* Click: Apply */
    applyBtn.addEventListener('click', function () {
      textarea.value = improved;
      /* Fire native input event so live-preview listeners (cv-generator.js) pick it up */
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      hidePreview();
    });

    /* Click: Keep original */
    keepBtn.addEventListener('click', function () {
      hidePreview();
    });
  }

  /* ── Inject for CV builder ──────────────────────────────── */
  function initCV() {
    var target = document.getElementById('cv-summary');
    if (!target) {
      target = document.querySelector('.form-textarea');
    }
    wireTextarea(target, false, 'cv_field');
  }

  /* ── Inject for Cover Letter ────────────────────────────── */
  function initCoverLetter() {
    var fields = [
      document.getElementById('cl-experience'),
      document.getElementById('cl-motivation'),
    ];
    fields.forEach(function (el) {
      wireTextarea(el, true, 'letter_field');
    });
  }

  /* ── Boot ───────────────────────────────────────────────── */
  function init() {
    ensureStyles();
    initCV();
    initCoverLetter();
  }

  /* ── Public API ─────────────────────────────────────────── */
  window.ForgCVAIImprove = {
    init: function () {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    }
  };

  /* ── Auto-init ──────────────────────────────────────────── */
  window.ForgCVAIImprove.init();

})();
