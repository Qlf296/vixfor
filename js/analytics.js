/**
 * ForgCV Analytics — GA4 Event Tracking
 * Vanilla JS only. No frameworks. No cookies beyond GA4 defaults.
 *
 * GA4 Measurement ID: G-2WV74B73MT (ForgCV — forgcv.com)
 *
 * Events tracked:
 *   - cta_click          : CTA button clicks
 *   - start_cv           : User begins CV creation (engagement)
 *   - generate_cv        : User finishes / downloads CV (conversion)
 *   - download_pdf       : PDF export clicked (conversion)
 *   - cv_template_select : Template switched
 *   - language_change    : i18n language switch
 *   - page_section_view  : Key sections enter viewport
 */

(function () {
  'use strict';

  var GA_ID = 'G-2WV74B73MT';

  // ─── Initialise GA4 ───────────────────────────────────────────────────────
  (function loadGA4() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      page_title: document.title,
      page_location: location.href,
      anonymize_ip: true
    });
  })();

  // ─── Global helper ────────────────────────────────────────────────────────
  window.cvf_track = function (event_name, label, extra) {
    if (typeof window.gtag !== 'function') return;
    var params = {};
    if (typeof label === 'string') {
      params.event_label = label;
    } else if (label && typeof label === 'object') {
      // cvf_track('start_cv', {source:'hero'}) shorthand
      Object.keys(label).forEach(function (k) { params[k] = label[k]; });
    }
    if (extra && typeof extra === 'object') {
      Object.keys(extra).forEach(function (k) { params[k] = extra[k]; });
    }
    params.page = params.page || location.pathname;
    window.gtag('event', event_name, params);
  };

  // ─── CTA clicks (delegated) ───────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a[href*="create-cv-free"], button.btn-primary, .btn-w, .btn-primary');
    if (!el) return;
    var label = (el.textContent || '').trim().slice(0, 60) || el.href || 'unknown';
    var section = el.closest('[class*="hero"]')       ? 'hero'
                : el.closest('[class*="top-bar"]')    ? 'top_bar'
                : el.closest('[class*="mid-cta"]')    ? 'mid_cta'
                : el.closest('[class*="bottom-cta"]') ? 'bottom_cta'
                : el.closest('[class*="rb-bottom"]')  ? 'rb_bottom'
                : el.closest('[class*="pr-bottom"]')  ? 'pr_bottom'
                : 'other';
    cvf_track('cta_click', label, { cta_section: section });
  });

  // ─── start_cv — first interaction with generator form ────────────────────
  var startTracked = false;
  function watchGeneratorStart() {
    var form = document.querySelector('#cv-form, .generator-form, [id*="generator"], [data-cv-form]');
    if (!form) return;
    form.addEventListener('input', function () {
      if (startTracked) return;
      startTracked = true;
      cvf_track('start_cv', 'First field input', { source: 'generator_form' });
    }, { passive: true });
  }

  // ─── generate_cv — user completes / previews the CV ─────────────────────
  // Fires when user clicks the preview/generate button (data-cv-generate)
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-cv-generate], #generate-btn, #preview-btn, .cv-generate-btn');
    if (!el) return;
    cvf_track('generate_cv', 'CV generated', { source: location.pathname });
  });

  // ─── download_pdf — PDF export ────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[id*="download"], [id*="pdf"], [class*="download"], [class*="pdf-btn"], [data-pdf]');
    if (!el) return;
    cvf_track('download_pdf', 'PDF export', { source: location.pathname });
  });

  // ─── Template selection ───────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.tpl-select-card, [data-template], [data-tpl]');
    if (!card) return;
    var tplName = card.getAttribute('data-tpl') ||
                  card.getAttribute('data-template') ||
                  (card.querySelector('.tpl-name, h4, h3') || {}).textContent ||
                  'unknown';
    cvf_track('cv_template_select', tplName.trim());
  });

  // ─── Language switcher ────────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lang], .lang-btn, [id*="lang"]');
    if (!btn) return;
    var lang = btn.getAttribute('data-lang') || btn.textContent.trim().slice(0, 5);
    cvf_track('language_change', lang);
  });

  // ─── Section view (Intersection Observer) ─────────────────────────────────
  function trackSectionViews() {
    if (!('IntersectionObserver' in window)) return;
    var targets = document.querySelectorAll(
      '.cp-hero, .seo-page-hero, .cv-page-hero, .generator-page, ' +
      '.faq-section, .bottom-cta, .final-cta-band, .rb-hero, .pr-hero'
    );
    if (!targets.length) return;
    var seen = new Set();
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var key = entry.target.className.split(' ')[0];
        if (seen.has(key)) return;
        seen.add(key);
        cvf_track('page_section_view', key);
      });
    }, { threshold: 0.25 });
    targets.forEach(function (el) { obs.observe(el); });
  }

  // ─── Boot ─────────────────────────────────────────────────────────────────
  function boot() {
    watchGeneratorStart();
    trackSectionViews();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
