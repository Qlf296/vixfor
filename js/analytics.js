/**
 * ForgCV Analytics — GA4 (RGPD-gated)
 * GA4 is loaded ONLY after explicit cookie consent via cookie-consent.js
 * GA4 ID: G-2WV74B73MT
 */
(function () {
  'use strict';

  var GA_ID = 'G-2WV74B73MT';
  var loaded = false;

  function loadGA4() {
    if (loaded) return;
    loaded = true;
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
    boot();
  }

  // Gate: only load after consent
  if (window.forgcv_analytics_allowed === true) {
    loadGA4();
  } else {
    window.addEventListener('forgcv_consent_ready', function (e) {
      if (e.detail && e.detail.analytics === true) loadGA4();
    });
  }

  // No-op stub so cvf_track never throws before consent
  window.cvf_track = window.cvf_track || function () {};

  function setupTracker() {
    window.cvf_track = function (event_name, label, extra) {
      if (typeof window.gtag !== 'function') return;
      var params = {};
      if (typeof label === 'string') {
        params.event_label = label;
      } else if (label && typeof label === 'object') {
        Object.keys(label).forEach(function (k) { params[k] = label[k]; });
      }
      if (extra && typeof extra === 'object') {
        Object.keys(extra).forEach(function (k) { params[k] = extra[k]; });
      }
      params.page = params.page || location.pathname;
      window.gtag('event', event_name, params);
    };
  }

  function boot() {
    setupTracker();
    // CTA clicks
    document.addEventListener('click', function (e) {
      var el = e.target.closest('a[href*="create-cv-free"], .btn-primary');
      if (!el) return;
      var label = (el.textContent || '').trim().slice(0, 60) || 'cta';
      var section = el.closest('.hero,.cv-page-hero,.seo-hero') ? 'hero'
                  : el.closest('.mid-cta-band') ? 'mid_cta'
                  : el.closest('.final-cta-band,.cta-section') ? 'bottom_cta' : 'other';
      cvf_track('cta_click', label, { cta_section: section });
    });
    // Generator start
    var startTracked = false;
    var firstField = document.querySelector('#cv-firstname');
    if (firstField) {
      firstField.addEventListener('input', function () {
        if (startTracked) return;
        startTracked = true;
        cvf_track('start_cv', 'First field input');
      }, { passive: true });
    }
    // PDF download
    document.addEventListener('click', function (e) {
      if (e.target.closest('#btn-download-pdf, .cl-download-btn')) {
        cvf_track('download_pdf', 'PDF export', { source: location.pathname });
      }
    });
    // Template select
    document.addEventListener('click', function (e) {
      var card = e.target.closest('[data-tpl]');
      if (card) cvf_track('cv_template_select', card.getAttribute('data-tpl'));
    });
    // Language change
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lang]');
      if (btn) cvf_track('language_change', btn.getAttribute('data-lang'));
    });
    // Section views
    if ('IntersectionObserver' in window) {
      var targets = document.querySelectorAll('.hero,.cv-page-hero,.seo-hero,.generator-page,.final-cta-band');
      var seen = new Set();
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var k = e.target.className.split(' ')[0];
          if (!seen.has(k)) { seen.add(k); cvf_track('page_section_view', k); }
        });
      }, { threshold: 0.25 }).observe && targets.forEach(function (el) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var k = el.className.split(' ')[0];
            if (!seen.has(k)) { seen.add(k); cvf_track('page_section_view', k); }
          });
        }, { threshold: 0.25 }).observe(el);
      });
    }
  }

})();
