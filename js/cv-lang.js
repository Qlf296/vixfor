/**
 * cv-lang.js — ForgCV standalone language module
 *
 * SCOPE: controls CV content language + cover letter language ONLY.
 *        The site UI stays 100% in English at all times.
 *
 * Exposes:
 *   window.CV_LANG_DICT      — full 8-language dictionary
 *   window.cvLang            — currently selected CV language (string)
 *   window.letterLang        — currently selected letter language (string)
 *   window.updateCVLanguage(lang)     — call from #cvLanguage select
 *   window.updateLetterLanguage(lang) — call from #letterLanguage select
 *
 * Extensibility:
 *   - Add a lang key + dict object to CV_LANG_DICT to support a new language.
 *   - Dispatch 'cvLangChange' / 'letterLangChange' CustomEvents for integrations.
 */

(function () {
  'use strict';

  /* ── Full 8-language dictionary ─────────────────────────────────────────── */
  var CV_LANG_DICT = {
    en: {
      profile:     'Profile',
      experience:  'Experience',
      education:   'Education',
      skills:      'Skills',
      languages:   'Languages',
      contact:     'Contact',
      summary:     'Professional Summary',
      rtl: false
    },
    fr: {
      profile:     'Profil',
      experience:  'Expériences professionnelles',
      education:   'Formation',
      skills:      'Compétences',
      languages:   'Langues',
      contact:     'Contact',
      summary:     'Profil professionnel',
      rtl: false
    },
    nl: {
      profile:     'Profiel',
      experience:  'Werkervaring',
      education:   'Opleiding',
      skills:      'Vaardigheden',
      languages:   'Talen',
      contact:     'Contact',
      summary:     'Professioneel profiel',
      rtl: false
    },
    es: {
      profile:     'Perfil',
      experience:  'Experiencia profesional',
      education:   'Formación',
      skills:      'Habilidades',
      languages:   'Idiomas',
      contact:     'Contacto',
      summary:     'Resumen profesional',
      rtl: false
    },
    ar: {
      profile:     'الملف الشخصي',
      experience:  'الخبرة المهنية',
      education:   'التعليم',
      skills:      'المهارات',
      languages:   'اللغات',
      contact:     'معلومات الاتصال',
      summary:     'الملخص المهني',
      rtl: true
    },
    ru: {
      profile:     'Профиль',
      experience:  'Опыт работы',
      education:   'Образование',
      skills:      'Навыки',
      languages:   'Языки',
      contact:     'Контакты',
      summary:     'Профессиональное резюме',
      rtl: false
    },
    de: {
      profile:     'Profil',
      experience:  'Berufserfahrung',
      education:   'Ausbildung',
      skills:      'Kenntnisse',
      languages:   'Sprachen',
      contact:     'Kontakt',
      summary:     'Berufliches Profil',
      rtl: false
    },
    pt: {
      profile:     'Perfil',
      experience:  'Experiência profissional',
      education:   'Formação académica',
      skills:      'Competências',
      languages:   'Idiomas',
      contact:     'Contacto',
      summary:     'Perfil profissional',
      rtl: false
    }
  };

  /* ── Persisted state ────────────────────────────────────────────────────── */
  var cvLang     = localStorage.getItem('fgcv_cv_lang')     || 'en';
  var letterLang = localStorage.getItem('fgcv_letter_lang') || 'en';

  // Validate stored value is still a known lang
  if (!CV_LANG_DICT[cvLang])     cvLang     = 'en';
  if (!CV_LANG_DICT[letterLang]) letterLang = 'en';

  /* ── Public API ─────────────────────────────────────────────────────────── */
  window.CV_LANG_DICT = CV_LANG_DICT;
  window.cvLang       = cvLang;
  window.letterLang   = letterLang;

  /**
   * updateCVLanguage(lang)
   * Called by #cvLanguage select onchange.
   * Updates CV output language + RTL dir on .cv-container.
   * Does NOT touch the site UI.
   */
  window.updateCVLanguage = function (lang) {
    if (!CV_LANG_DICT[lang]) return;
    window.cvLang = lang;
    localStorage.setItem('fgcv_cv_lang', lang);

    // RTL on CV output containers
    var isRTL = CV_LANG_DICT[lang].rtl;
    var dir   = isRTL ? 'rtl' : 'ltr';
    var containers = document.querySelectorAll(
      '#cv-preview, .cv-preview-inner, #cv-render, .cv-render, .cv-container'
    );
    containers.forEach(function (el) { el.dir = dir; });

    // Sync the select element value in case called programmatically
    var sel = document.getElementById('cvLanguage');
    if (sel && sel.value !== lang) sel.value = lang;

    // Refresh live preview
    if (typeof updatePreview === 'function') updatePreview();

    document.dispatchEvent(new CustomEvent('cvLangChange', { detail: { lang: lang } }));
  };

  /**
   * updateLetterLanguage(lang)
   * Called by #letterLanguage select onchange.
   * Sets RTL on cover letter textarea.
   * Does NOT touch the site UI.
   */
  window.updateLetterLanguage = function (lang) {
    if (!CV_LANG_DICT[lang]) return;
    window.letterLang = lang;
    localStorage.setItem('fgcv_letter_lang', lang);

    // RTL on letter textarea / result container
    var isRTL = CV_LANG_DICT[lang].rtl;
    var dir   = isRTL ? 'rtl' : 'ltr';
    ['cl-result-text', 'cl-result-preview'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.dir = dir;
    });

    // Sync the select element
    var sel = document.getElementById('letterLanguage');
    if (sel && sel.value !== lang) sel.value = lang;

    document.dispatchEvent(new CustomEvent('letterLangChange', { detail: { lang: lang } }));
  };

  /* ── Init selects on DOMContentLoaded ──────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var cvSel = document.getElementById('cvLanguage');
    if (cvSel) {
      cvSel.value = window.cvLang;
      cvSel.addEventListener('change', function () {
        window.updateCVLanguage(this.value);
      });
    }

    var ltSel = document.getElementById('letterLanguage');
    if (ltSel) {
      ltSel.value = window.letterLang;
      ltSel.addEventListener('change', function () {
        window.updateLetterLanguage(this.value);
      });
    }
  });

})();
