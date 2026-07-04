# CLAUDE.md — ForgCV by Vixfor · Project Memory
> Source of truth for all future sessions. Last updated: 2026-07-04.
> **Read this first. Nothing else in conversation history matters.**

---

## 🧭 Project Identity

- **Product**: ForgCV by Vixfor — free static CV + cover letter generator
- **URL**: https://forgcv.com
- **GitHub**: https://github.com/Qlf296/vixfor (branch: `main`)
- **Hosting**: Netlify (auto-deploy from main)
- **Stack**: Pure HTML + CSS + vanilla JS. No frameworks, no npm, no build tools.
- **Owner email**: vixfor.contact@gmail.com
- **Brand**: Vixfor (parent company). ForgCV is the product. "Pro" was removed — site is 100% free forever.

---

## 🏗 Site Architecture (Final)

### Root-level pages (14 files)
| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Homepage — hero, features, templates CTA |
| `create-cv-free.html` | `/create-cv-free` | **Main CV generator** |
| `cover-letter-generator.html` | `/cover-letter-generator` | **Cover letter generator** |
| `cv-generator.html` | `/cv-generator` | Alternate/lighter CV generator |
| `templates.html` | `/templates` | Template gallery |
| `about.html` | `/about` | About Vixfor |
| `contact.html` | `/contact` | Contact form (Formspree) |
| `forgcv-pro.html` | `/forgcv-pro` | Pro waitlist page |

### SEO pages (32 files in `/seo/`)
CV country pages: cv-france, cv-germany, cv-italy, cv-spain, cv-netherlands, cv-portugal, cv-uk, cv-usa, cv-canada, cv-australia, cv-arabic-countries, cv-europe-jobs

CV topic pages: cv-example, cv-examples, cv-first-job, cv-format-2026, cv-internship, cv-skills-list, cv-software-engineer, cv-student, cv-summary-examples, cv-template-free, cv-tips, cv-with-no-experience, how-to-write-a-cv

Cover letter pages: cover-letter-example, cover-letter-france, cover-letter-germany, cover-letter-internship, cover-letter-job-change, cover-letter-structure, cover-letter-student

### Legal pages (4 files in `/legal/`)
mentions-legales.html, politique-confidentialite.html, politique-cookies.html, conditions-utilisation.html

### Assets
- `assets/forgcv-logo-sm.svg` — nav logo (icon + wordmark)
- `og-image.png` — Open Graph image
- `sitemap.xml` — 46 URLs
- `robots.txt`
- `netlify.toml` — 81 redirects (pretty URLs), security headers

---

## 🌍 Language System (CRITICAL — Never Break)

### Rule: Two completely separate systems

**1. Site UI = English only (always)**
- Controlled by `js/i18n.js`
- `detectLanguage()` hardcoded to return `'en'`
- `applyTranslations()` handles nav, footer, hero, features
- **DO NOT load i18n.js on builder pages** — it breaks cv-lang.js

**2. CV/Letter content = dynamic multilingual (user-chosen)**
- Controlled by `js/cv-lang.js` (IIFE, sync load)
- 8 languages: EN, FR, NL, ES, AR, RU, DE, PT
- `window.updateCVLanguage(lang)` → scoped to `#cv-builder [data-i18n]`
- `window.updateLetterLanguage(lang)` → scoped to `#letter-builder [data-i18n]`
- Saved to localStorage: `fgcv_cv_lang`, `fgcv_letter_lang`
- Arabic = RTL on `#cv-builder` or `#letter-builder` only

### IDs that must never be renamed
- `#cv-builder` — the CV form container in `create-cv-free.html`
- `#letter-builder` — the letter form container in `cover-letter-generator.html`
- `#cvLanguage` — CV language select (has `onchange="window.updateCVLanguage(this.value)"`)
- `#letterLanguage` — letter language select

### Script load order on builder pages (MUST maintain)
```html
<script src="js/main.js" defer></script>
<script src="js/cv-lang.js"></script>          <!-- sync, BEFORE defer -->
<script src="js/cv-generator.js"></script>     <!-- sync -->
<script src="js/cookie-consent.js" defer></script>
<script src="js/analytics.js" defer></script>
<script src="js/email-capture.js" defer></script>
<script src="js/share-system.js" defer></script>
<script src="js/ai-improve.js" defer></script>
<!-- i18n.js is NOT loaded on builder pages -->
```

### localStorage keys
| Key | Purpose |
|---|---|
| `fgcv_cv_lang` | Saved CV language |
| `fgcv_letter_lang` | Saved letter language |
| `fgcv_email_shown` | Email capture modal shown flag |
| `fgcv_email_captured` | Email captured flag |
| `fgcv_total` | CV count (analytics display) |

---

## ⚙️ Technical State (as of 2026-07-04)

### ✅ Completed & working
- Hamburger menu: works on all 46 pages (double-toggle conflict fixed, `aria-expanded` correct)
- Language picker CV: works on all 3 builder pages
- Language picker Letter: works on cover-letter-generator.html
- CV PDF download: works (print dialog via new window)
- Cover letter generation: works (24 templates, 8 lang × 3 tones)
- Live CV preview: updates on every keystroke
- Cookie consent banner: GDPR-compliant
- Email capture modal: shows after 3rd CV interaction (Formspree URL = empty — needs setup)
- Share system: Web Share API with clipboard fallback
- AI improve button: UI present (placeholder — no real AI call)
- Contact form: Formspree endpoint connected
- 81 Netlify redirects: pretty URLs for all pages
- SEO meta, OG, LD+JSON: all pages
- Hreflang: implemented
- Sitemap: 46 URLs
- All text in English (French completely removed from UI)
- `.grad` CSS class defined in vixfor-design-system.css
- `.contextual-links` CSS class defined
- Duplicate nav links removed from all 32 SEO pages

### ⚠️ Partially done / pending
- **Email capture**: `FORMSPREE_URL = ''` in `js/email-capture.js` line 26 — user needs Formspree account
- **AI improve**: button shows but no real API call — future feature
- **Analytics**: GA4 measurement ID placeholder in `js/analytics.js` — replace with real ID
- **Nexora**: mentioned by user as future parent company/brand — not implemented yet

### ❌ Not yet done
- Unit tests (none — static site, manual testing only)
- Performance audit (no Lighthouse score on record)
- A/B testing
- Blog/content section

---

## 🚨 Critical Constraints (Never Violate)

1. **No npm, no build tools, no frameworks** — pure static files only
2. **i18n.js must NOT be loaded on** `create-cv-free.html`, `cover-letter-generator.html`, `cv-generator.html`
3. **cv-lang.js must load SYNC** (no defer) before any defer scripts that depend on it
4. **`#cv-builder` and `#letter-builder` IDs must not change** — cv-lang.js depends on them
5. **GitHub tokens must be revoked after use** — always remind user
6. **No "Pro" branding in public-facing pages** — ForgCV is free forever

---

## 📈 SEO Structure

### Cluster 1: CV Creation (money pages)
- `/create-cv-free` — main generator
- `/cv-generator` — alternate entry
- `/templates` — template gallery

### Cluster 2: Country CVs (traffic pages)
France, Germany, Italy, Spain, Netherlands, Portugal, UK, USA, Canada, Australia, Arabic countries, Europe jobs

### Cluster 3: CV Topics (traffic pages)
Format 2026, student, internship, first job, software engineer, skills list, summary examples, tips, with-no-experience, how-to-write

### Cluster 4: Cover Letter (money + traffic)
- `/cover-letter-generator` — main generator
- Country/topic variants: France, Germany, internship, job-change, structure, student

### Internal linking
- Every SEO page → links to `/create-cv-free` + `/cover-letter-generator`
- Related country pages cross-link each other
- `contextual-links` div at bottom of each page handles internal links

---

## 🎨 Design System

- **Brand colors**: `#5B57FF` (indigo primary), `#8B5CF6` (purple)
- **Gradient**: `linear-gradient(135deg, #5B57FF 0%, #8B5CF6 100%)` → `var(--clr-grad)`
- **Fonts**: Inter (Google Fonts)
- **CSS files**:
  - `css/style.css` — global base
  - `css/vixfor-design-system.css` — dark mode, tokens, SEO utilities
  - `css/cv-generator.css` — CV builder specific
  - `css/home.css` — homepage specific

### Nav structure (all pages)
```html
<nav class="nav" id="main-nav">
  <div class="container">
    <a href="[root]/index.html" class="nav-logo">...</a>
    <div class="nav-links">
      <a href="[root]/create-cv-free.html">Create a CV</a>
      <a href="[root]/cover-letter-generator.html">✉️ Cover letter</a>
      <a href="[root]/templates.html">Templates</a>
      <a href="[root]/about.html">About</a>
    </div>
    <div class="nav-right">
      <a href="[root]/create-cv-free.html" class="btn btn-primary btn-sm">Get started</a>
    </div>
    <button class="nav-hamburger" aria-label="Menu" aria-expanded="false">...</button>
  </div>
</nav>
<div class="nav-mobile">
  <a href="[root]/index.html">Home</a>
  <a href="[root]/create-cv-free.html">Create a free CV</a>
  <a href="[root]/cover-letter-generator.html">✉️ Cover letter</a>
  <a href="[root]/templates.html">Templates</a>
  <a href="[root]/about.html">About</a>
  <a href="[root]/contact.html">Contact</a>
</div>
```
**[root] = `..` for SEO/legal pages, empty/omitted for root pages**

---

## 🔒 Legal & RGPD

- Cookie consent: implemented (`js/cookie-consent.js`)
- Privacy policy: `legal/politique-confidentialite.html`
- Legal notice: `legal/mentions-legales.html`
- Cookie policy: `legal/politique-cookies.html`
- Terms: `legal/conditions-utilisation.html`
- No user accounts, no server-side data storage
- CV data stays in browser memory only (never sent anywhere)
- Email capture: optional, Formspree (when configured)

---

## ⚡ Netlify Config (`netlify.toml`)

- 81 `[[redirects]]` entries — pretty URLs (no `.html` extension)
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP
- Cache: `Cache-Control: public, max-age=31536000, immutable` on assets
- All HTML: `Cache-Control: public, max-age=0, must-revalidate`

---

## 🧠 Next Actions

### Phase 1 — Urgent
- [ ] Set up Formspree account → add URL to `js/email-capture.js` line 26
- [ ] Add real GA4 measurement ID to `js/analytics.js`
- [ ] Test language picker on live Netlify after today's push
- [ ] Test hamburger on mobile (live site)

### Phase 2 — Important
- [ ] Add About link to ALL SEO page nav-links (currently missing from some)
- [ ] Add `cv-with-no-experience.html`, `cv-first-job.html`, `cv-student.html` to nav dropdown or footer
- [ ] Lighthouse audit on create-cv-free.html (target: 90+ performance)
- [ ] Add Open Graph images per country (currently all use same og-image.png)

### Phase 3 — Growth
- [ ] Nexora brand integration (future)
- [ ] Blog section for long-tail SEO
- [ ] AI improve feature (real API call — OpenAI or Anthropic)
- [ ] PWA manifest for offline use
- [ ] i18n for full site (if user base proves multilingual)

---

## 🔑 Credentials & Services

- **GitHub**: https://github.com/Qlf296/vixfor — push via HTTPS token (revoke after use!)
- **Netlify**: auto-deploys from main branch
- **Formspree**: not yet configured — user needs to create account at formspree.io
- **Google Analytics**: placeholder — user needs GA4 property

---

*This file is the single source of truth. Update it when making major architectural decisions.*
