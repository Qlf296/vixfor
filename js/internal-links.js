/**
 * ForgCV — Global Internal Linking System
 * Scalable, page-type-aware SEO internal link injector
 * Add <script src="/js/internal-links.js" defer></script> to any page.
 * Skips pages that already have a .contextual-links or .internal-links block.
 */
(function () {
  'use strict';

  // ─── PAGE TYPE DEFINITIONS ────────────────────────────────────────────────

  var TOOL_SLUGS = ['create-cv-free', 'cv-generator', 'cover-letter-generator', 'templates'];

  var COUNTRY_SLUGS = [
    'cv-france', 'cv-germany', 'cv-netherlands', 'cv-uk', 'cv-spain',
    'cv-italy', 'cv-portugal', 'cv-australia', 'cv-canada', 'cv-usa',
    'cv-arabic-countries', 'cv-europe-jobs'
  ];

  var COVER_LETTER_SLUGS = [
    'cover-letter-example', 'cover-letter-france', 'cover-letter-germany',
    'cover-letter-internship', 'cover-letter-job-change', 'cover-letter-structure',
    'cover-letter-student'
  ];

  var SKIP_SLUGS = ['404', 'forgcv-pro', 'brand-guide'];

  // ─── LINK SETS PER PAGE TYPE ──────────────────────────────────────────────

  var LINKS = {
    home: [
      { href: '/create-cv-free',      label: 'Free CV Builder',        desc: 'Create your CV in 2 minutes — no signup' },
      { href: '/cv-france',           label: 'French CV Guide',         desc: 'CV format & tips for France 2026' },
      { href: '/cv-germany',          label: 'German CV Guide',         desc: 'The perfect Lebenslauf guide' },
      { href: '/cv-netherlands',      label: 'Dutch CV Guide',          desc: 'CV for the Netherlands job market' },
      { href: '/how-to-write-a-cv',   label: 'How to Write a CV',       desc: 'Complete guide 2026' },
      { href: '/cv-template-free',    label: 'Free CV Templates',       desc: '6 professional designs, instant PDF' }
    ],
    tool: [
      { href: '/cv-example',          label: 'CV Examples',             desc: 'Real CV samples by industry' },
      { href: '/cv-template-free',    label: 'Free CV Templates',       desc: '6 professional designs' },
      { href: '/cv-skills-list',      label: 'CV Skills List',          desc: 'Best skills to put on your CV' },
      { href: '/cv-with-no-experience', label: 'CV With No Experience', desc: 'Guide for students & career starters' },
      { href: '/cv-format-2026',      label: 'CV Format 2026',          desc: 'Current standards & best practices' },
      { href: '/cv-france',           label: 'CV for France',           desc: 'French CV format guide' },
      { href: '/cv-germany',          label: 'CV for Germany',          desc: 'Lebenslauf format guide' },
      { href: '/cv-netherlands',      label: 'CV for Netherlands',      desc: 'Dutch CV format guide' }
    ],
    country: [
      { href: '/create-cv-free',      label: 'Free CV Builder',         desc: 'Create your CV in 2 minutes', primary: true },
      { href: '/cv-template-free',    label: 'Free CV Templates',       desc: '6 professional designs' },
      { href: '/how-to-write-a-cv',   label: 'How to Write a CV',       desc: 'Complete guide 2026' },
      { href: '/cv-example',          label: 'CV Examples',             desc: 'Real samples by industry' }
    ],
    coverLetter: [
      { href: '/create-cv-free',          label: 'Free CV Builder',          desc: 'Create your CV first', primary: true },
      { href: '/cover-letter-generator',  label: 'Cover Letter Generator',   desc: 'Free, 3 minutes, 8 languages' },
      { href: '/cv-example',             label: 'CV Examples',              desc: 'See real CV samples' },
      { href: '/how-to-write-a-cv',      label: 'How to Write a CV',        desc: 'Complete writing guide' }
    ],
    guide: [
      { href: '/create-cv-free',      label: 'Free CV Builder',         desc: 'Create your CV in 2 minutes', primary: true },
      { href: '/cv-france',           label: 'French CV Guide',         desc: 'CV format for France' },
      { href: '/cv-template-free',    label: 'Free CV Templates',       desc: '6 professional designs' },
      { href: '/cv-example',          label: 'CV Examples',             desc: 'Real samples by industry' }
    ],
    about: [
      { href: '/create-cv-free',      label: 'Free CV Builder',         desc: 'Create your CV in 2 minutes', primary: true },
      { href: '/cover-letter-generator', label: 'Cover Letter Generator', desc: 'Free, 3 minutes' },
      { href: '/cv-template-free',    label: 'Free CV Templates',       desc: '6 professional designs' }
    ]
  };

  // ─── PAGE TYPE DETECTION ──────────────────────────────────────────────────

  function getPageType() {
    var path = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
    var slug = path.split('/').pop() || '';

    if (!slug || slug === 'index') return 'home';
    if (SKIP_SLUGS.indexOf(slug) !== -1) return null;
    if (slug === 'about' || slug === 'contact') return 'about';
    if (TOOL_SLUGS.indexOf(slug) !== -1) return 'tool';
    if (COUNTRY_SLUGS.indexOf(slug) !== -1) return 'country';
    if (COVER_LETTER_SLUGS.indexOf(slug) !== -1) return 'coverLetter';
    return 'guide';
  }

  // ─── INJECT BLOCK ─────────────────────────────────────────────────────────

  function buildBlock(links) {
    var items = links.map(function (l) {
      var primaryStyle = l.primary
        ? 'background:var(--clr-accent);color:#fff;border-color:var(--clr-accent);'
        : '';
      var primaryTextStyle = l.primary ? 'color:#fff;' : '';
      return '<a href="' + l.href + '" style="display:flex;flex-direction:column;gap:2px;padding:10px 14px;border:1px solid var(--clr-border);border-radius:10px;text-decoration:none;transition:all .15s;' + primaryStyle + '"'
        + ' onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(91,87,255,.15)\'"'
        + ' onmouseout="this.style.transform=\'none\';this.style.boxShadow=\'none\'">'
        + '<span style="font-size:.8125rem;font-weight:700;color:' + (l.primary ? '#fff' : 'var(--clr-text)') + '">' + l.label + '</span>'
        + '<span style="font-size:.72rem;' + (l.primary ? 'color:rgba(255,255,255,.85)' : 'color:var(--clr-text-2)') + '">' + l.desc + '</span>'
        + '</a>';
    }).join('');

    return '<section data-il-injected="1" style="border-top:1px solid var(--clr-border);background:var(--clr-bg-2);padding:2rem 0">'
      + '<div class="container">'
      + '<p style="font-size:.6875rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--clr-text-3);margin:0 0 .875rem">Related resources</p>'
      + '<div style="display:flex;flex-wrap:wrap;gap:.5rem">' + items + '</div>'
      + '</div>'
      + '</section>';
  }

  function inject() {
    // Skip if block already present
    if (document.querySelector('[data-il-injected]')
      || document.querySelector('.contextual-links')
      || document.querySelector('.internal-links')) return;

    var type = getPageType();
    if (!type || !LINKS[type]) return;

    var footer = document.querySelector('footer');
    if (!footer) return;

    var block = document.createElement('div');
    block.innerHTML = buildBlock(LINKS[type]);
    footer.parentNode.insertBefore(block.firstChild, footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
