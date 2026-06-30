/**
 * ForgCV Cookie Consent — RGPD/GDPR Compliant
 * - Blocks GA4 until explicit accept
 * - 3 options: Accept All / Refuse / Customize
 * - Stores preference in localStorage (no cookie for the banner itself)
 * - Fires window.forgcv_consent_ready when analytics may load
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'fgcv_consent';
  var CONSENT_VERSION = '1';

  // ── Read stored preference ────────────────────────────────────────────────
  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  function setConsent(analytics, version) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        analytics: analytics,
        version: version || CONSENT_VERSION,
        date: new Date().toISOString()
      }));
    } catch (e) {}
  }

  // ── Fire event so analytics.js can load ──────────────────────────────────
  function fireConsentReady(allowed) {
    window.forgcv_analytics_allowed = allowed;
    var evt = new CustomEvent('forgcv_consent_ready', { detail: { analytics: allowed } });
    window.dispatchEvent(evt);
  }

  // ── If already decided, skip banner ──────────────────────────────────────
  var stored = getConsent();
  if (stored && stored.version === CONSENT_VERSION) {
    fireConsentReady(stored.analytics === true);
    return;
  }

  // ── Build banner HTML ─────────────────────────────────────────────────────
  var BANNER_CSS = [
    '#fgcv-consent{position:fixed;bottom:0;left:0;right:0;z-index:99999;',
    'background:var(--clr-surface,#fff);border-top:1px solid var(--clr-border,#e5e7eb);',
    'box-shadow:0 -8px 32px rgba(0,0,0,.10);padding:1rem 1.25rem;',
    'display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:space-between;',
    'animation:fgcv-slide-up .3s ease-out}',
    '@keyframes fgcv-slide-up{from{transform:translateY(100%)}to{transform:translateY(0)}}',
    '#fgcv-consent .fgcv-c-text{flex:1;min-width:200px;font-size:.82rem;',
    'color:var(--clr-text-2,#6b7280);line-height:1.5}',
    '#fgcv-consent .fgcv-c-text a{color:var(--clr-accent,#5B57FF);text-decoration:underline}',
    '#fgcv-consent .fgcv-c-text strong{color:var(--clr-text,#0F1225)}',
    '#fgcv-consent .fgcv-c-btns{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}',
    '#fgcv-btn-accept{background:var(--clr-accent,#5B57FF);color:#fff;border:none;',
    'padding:.55rem 1.1rem;border-radius:8px;font-size:.82rem;font-weight:700;',
    'cursor:pointer;white-space:nowrap;transition:opacity .15s}',
    '#fgcv-btn-accept:hover{opacity:.88}',
    '#fgcv-btn-refuse{background:transparent;color:var(--clr-text-2,#6b7280);',
    'border:1px solid var(--clr-border,#e5e7eb);padding:.5rem 1rem;border-radius:8px;',
    'font-size:.82rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:border-color .15s}',
    '#fgcv-btn-refuse:hover{border-color:var(--clr-text-2,#6b7280)}',
    '#fgcv-btn-custom{background:transparent;color:var(--clr-accent,#5B57FF);',
    'border:none;padding:.5rem .75rem;font-size:.78rem;font-weight:600;',
    'cursor:pointer;text-decoration:underline;white-space:nowrap}',
    /* Modal */
    '#fgcv-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100000;',
    'display:none;align-items:center;justify-content:center;padding:1rem}',
    '#fgcv-modal-bg.open{display:flex}',
    '#fgcv-modal{background:var(--clr-surface,#fff);border-radius:16px;',
    'padding:1.75rem;max-width:440px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.2)}',
    '#fgcv-modal h3{font-size:1.05rem;font-weight:800;margin-bottom:.25rem;',
    'color:var(--clr-text,#0F1225)}',
    '#fgcv-modal p{font-size:.8rem;color:var(--clr-text-2,#6b7280);margin-bottom:1.25rem;line-height:1.55}',
    '.fgcv-toggle-row{display:flex;align-items:center;justify-content:space-between;',
    'padding:.75rem 0;border-bottom:1px solid var(--clr-border,#e5e7eb)}',
    '.fgcv-toggle-row:last-of-type{border-bottom:none}',
    '.fgcv-toggle-label{font-size:.85rem;font-weight:700;color:var(--clr-text,#0F1225)}',
    '.fgcv-toggle-desc{font-size:.75rem;color:var(--clr-text-2,#6b7280);margin-top:2px}',
    '.fgcv-switch{position:relative;width:42px;height:24px;flex-shrink:0}',
    '.fgcv-switch input{opacity:0;width:0;height:0;position:absolute}',
    '.fgcv-slider{position:absolute;inset:0;background:#d1d5db;border-radius:12px;',
    'transition:background .2s;cursor:pointer}',
    '.fgcv-slider:before{content:"";position:absolute;width:18px;height:18px;',
    'border-radius:50%;background:#fff;top:3px;left:3px;transition:transform .2s;',
    'box-shadow:0 1px 3px rgba(0,0,0,.2)}',
    'input:checked+.fgcv-slider{background:var(--clr-accent,#5B57FF)}',
    'input:checked+.fgcv-slider:before{transform:translateX(18px)}',
    '.fgcv-modal-actions{display:flex;gap:.625rem;margin-top:1.25rem}',
    '#fgcv-btn-save{flex:1;background:var(--clr-accent,#5B57FF);color:#fff;border:none;',
    'padding:.65rem;border-radius:8px;font-size:.85rem;font-weight:700;cursor:pointer}',
    '#fgcv-btn-close-modal{flex:1;background:transparent;',
    'border:1px solid var(--clr-border,#e5e7eb);color:var(--clr-text-2,#6b7280);',
    'padding:.65rem;border-radius:8px;font-size:.85rem;font-weight:600;cursor:pointer}'
  ].join('');

  var legalPath = (location.pathname.indexOf('/seo/') !== -1 ||
                   location.pathname.indexOf('/legal/') !== -1)
                   ? '../legal/cookies.html' : 'legal/cookies.html';

  function buildBanner() {
    // Inject CSS
    var style = document.createElement('style');
    style.textContent = BANNER_CSS;
    document.head.appendChild(style);

    // Banner
    var banner = document.createElement('div');
    banner.id = 'fgcv-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.innerHTML = [
      '<div class="fgcv-c-text">',
      '  <strong>🍪 Nous utilisons des cookies</strong> pour mesurer l\'audience de notre site via Google Analytics.',
      '  Aucune donnée personnelle n\'est vendue. <a href="' + legalPath + '">Politique cookies</a>',
      '</div>',
      '<div class="fgcv-c-btns">',
      '  <button id="fgcv-btn-custom">Personnaliser</button>',
      '  <button id="fgcv-btn-refuse">Refuser</button>',
      '  <button id="fgcv-btn-accept">Tout accepter</button>',
      '</div>'
    ].join('');

    // Modal
    var modal = document.createElement('div');
    modal.id = 'fgcv-modal-bg';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Paramètres cookies');
    modal.innerHTML = [
      '<div id="fgcv-modal">',
      '  <h3>Paramètres de confidentialité</h3>',
      '  <p>Choisissez quels cookies vous acceptez. Les cookies essentiels assurent le bon fonctionnement du site et ne peuvent pas être désactivés.</p>',
      '  <div class="fgcv-toggle-row">',
      '    <div><div class="fgcv-toggle-label">Cookies essentiels</div>',
      '    <div class="fgcv-toggle-desc">Nécessaires au fonctionnement du site (localStorage CV). Toujours actifs.</div></div>',
      '    <label class="fgcv-switch"><input type="checkbox" checked disabled><span class="fgcv-slider"></span></label>',
      '  </div>',
      '  <div class="fgcv-toggle-row">',
      '    <div><div class="fgcv-toggle-label">Analytics (Google Analytics 4)</div>',
      '    <div class="fgcv-toggle-desc">Mesure d\'audience anonymisée. Aucune donnée vendue à des tiers.</div></div>',
      '    <label class="fgcv-switch"><input type="checkbox" id="fgcv-chk-analytics"><span class="fgcv-slider"></span></label>',
      '  </div>',
      '  <div class="fgcv-modal-actions">',
      '    <button id="fgcv-btn-close-modal">Annuler</button>',
      '    <button id="fgcv-btn-save">Enregistrer mes choix</button>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(banner);
    document.body.appendChild(modal);

    // ── Event handlers ────────────────────────────────────────────────────
    function closeBanner() {
      banner.style.animation = 'fgcv-slide-up .2s ease-in reverse';
      setTimeout(function () { banner.remove(); }, 180);
    }

    document.getElementById('fgcv-btn-accept').addEventListener('click', function () {
      setConsent(true, CONSENT_VERSION);
      closeBanner();
      fireConsentReady(true);
    });

    document.getElementById('fgcv-btn-refuse').addEventListener('click', function () {
      setConsent(false, CONSENT_VERSION);
      closeBanner();
      fireConsentReady(false);
    });

    document.getElementById('fgcv-btn-custom').addEventListener('click', function () {
      modal.classList.add('open');
    });

    document.getElementById('fgcv-btn-close-modal').addEventListener('click', function () {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('open');
    });

    document.getElementById('fgcv-btn-save').addEventListener('click', function () {
      var analyticsChecked = document.getElementById('fgcv-chk-analytics').checked;
      setConsent(analyticsChecked, CONSENT_VERSION);
      modal.classList.remove('open');
      closeBanner();
      fireConsentReady(analyticsChecked);
    });
  }

  // ── Show banner after DOM ready ───────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBanner);
  } else {
    buildBanner();
  }

})();
