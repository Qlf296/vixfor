# FORGCV × VIXFOR — MASTER DOCUMENT
**Dernière mise à jour : 4 juillet 2026 · Source de vérité unique**

---

## 1. 🧭 Vision du Projet

ForgCV est un générateur de CV et lettre de motivation 100% gratuit, sans inscription, sans paiement, sans filigrane. Construit par Vixfor comme produit phare, il cible les 8 marchés principaux (FR, EN, DE, NL, ES, AR, RU, PT) via un système de langue dual : l'UI reste en anglais (neutre pour le SEO international), tandis que le contenu CV/lettre est dynamiquement multilingue selon le choix de l'utilisateur.

La stratégie de croissance repose sur le SEO programmatique (32 pages pays/thématiques indexées), un funnel de conversion CV → lettre de motivation, et une monétisation future via ForgCV Pro (liste d'attente active). Le site est statique (HTML/CSS/JS pur), hébergé sur Netlify, sans aucun framework ni outil de build — ce qui le rend ultra-rapide et simple à maintenir.

L'ambition Nexora (marque parente future de Vixfor) n'est pas encore implémentée publiquement.

---

## 2. 🏗 Architecture Finale Validée

### Structure complète du site

```
forgcv.com/
├── index.html                    → Homepage
├── create-cv-free.html           → Générateur CV principal (★ page money #1)
├── cover-letter-generator.html   → Générateur lettre de motivation (★ page money #2)
├── cv-generator.html             → Générateur CV alternatif
├── templates.html                → Galerie de templates
├── about.html                    → À propos de Vixfor
├── contact.html                  → Formulaire contact
├── forgcv-pro.html               → Waitlist ForgCV Pro
│
├── seo/                          → 32 pages SEO
│   ├── cv-france.html            cv-germany.html   cv-italy.html
│   ├── cv-spain.html             cv-netherlands.html  cv-portugal.html
│   ├── cv-uk.html                cv-usa.html       cv-canada.html
│   ├── cv-australia.html         cv-arabic-countries.html
│   ├── cv-europe-jobs.html
│   ├── cv-example.html           cv-examples.html  cv-first-job.html
│   ├── cv-format-2026.html       cv-internship.html  cv-skills-list.html
│   ├── cv-software-engineer.html cv-student.html   cv-summary-examples.html
│   ├── cv-template-free.html     cv-tips.html      cv-with-no-experience.html
│   ├── how-to-write-a-cv.html
│   ├── cover-letter-example.html cover-letter-france.html
│   ├── cover-letter-germany.html cover-letter-internship.html
│   ├── cover-letter-job-change.html cover-letter-structure.html
│   └── cover-letter-student.html
│
├── legal/                        → 4 pages légales
│   ├── mentions-legales.html
│   ├── politique-confidentialite.html
│   ├── politique-cookies.html
│   └── conditions-utilisation.html
│
├── css/                          → 4 fichiers CSS
│   ├── style.css                 → Base globale
│   ├── vixfor-design-system.css  → Design tokens + dark mode + utilitaires SEO
│   ├── cv-generator.css          → Styles spécifiques générateur CV
│   └── home.css                  → Styles homepage
│
├── js/                           → 10 modules JS
│   ├── cv-lang.js                → ★ Système langue CV/Lettre (SYNC obligatoire)
│   ├── cv-generator.js           → Moteur PDF + templates CV
│   ├── cover-letter.js           → Génération lettre (24 templates)
│   ├── i18n.js                   → UI anglais (NE PAS charger sur pages builder)
│   ├── main.js                   → Navigation + hamburger menu
│   ├── email-capture.js          → Modal capture email
│   ├── share-system.js           → Partage Web Share API
│   ├── ai-improve.js             → Bouton amélioration IA (UI seulement)
│   ├── analytics.js              → GA4
│   └── cookie-consent.js         → Bannière RGPD
│
├── assets/
│   └── forgcv-logo-sm.svg        → Logo nav
│
├── netlify.toml                  → 81 redirects + headers sécurité
├── sitemap.xml                   → 46 URLs
└── robots.txt
```

---

## 3. 🌍 Système Langue

### Règle absolue : deux systèmes complètement séparés

**UI Site = anglais uniquement (toujours)**
- Fichier : `js/i18n.js`
- `detectLanguage()` hardcodée → retourne toujours `'en'`
- Gère : nav, footer, hero, features, sections publiques
- ⛔ **NE JAMAIS charger i18n.js sur les pages builder** (bug confirmé : écrase les labels CV avec des clés brutes comme "firstName")

**Contenu CV/Lettre = multilingue dynamique (choix utilisateur)**
- Fichier : `js/cv-lang.js` (IIFE, chargement SYNC obligatoire)
- 8 langues : EN, FR, NL, ES, AR, RU, DE, PT
- `window.updateCVLanguage(lang)` → scope : `#cv-builder [data-i18n]` uniquement
- `window.updateLetterLanguage(lang)` → scope : `#letter-builder [data-i18n]` uniquement
- Persisté en localStorage : `fgcv_cv_lang` / `fgcv_letter_lang`
- Arabe = RTL activé sur le conteneur builder uniquement

### Ordre de chargement scripts (pages builder — obligatoire)
```html
<script src="js/main.js" defer></script>
<script src="js/cv-lang.js"></script>       ← SYNC avant tous les defer
<script src="js/cv-generator.js"></script>  ← SYNC
<script src="js/cookie-consent.js" defer></script>
<script src="js/analytics.js" defer></script>
<script src="js/email-capture.js" defer></script>
<script src="js/share-system.js" defer></script>
<script src="js/ai-improve.js" defer></script>
<!-- i18n.js ABSENT des pages builder -->
```

### Règles à ne jamais casser
| Règle | Raison |
|---|---|
| `#cv-builder` ID intact | cv-lang.js cible cet ID |
| `#letter-builder` ID intact | cv-lang.js cible cet ID |
| `#cvLanguage` select intact | onchange câblé sur updateCVLanguage |
| `#letterLanguage` select intact | onchange câblé sur updateLetterLanguage |
| cv-lang.js = SYNC | Doit être défini avant les defer |
| i18n.js absent des builders | Sinon écrase les labels |
| `window.CV_LANG_DICT` | Utilisé par cv-generator.js pour titres PDF |

---

## 4. ⚙️ État Technique Actuel

### ✅ Terminé et fonctionnel
- Hamburger menu (toutes les 46 pages) — conflit double-toggle corrigé
- Sélecteur langue CV (create-cv-free, cv-generator)
- Sélecteur langue Lettre (cover-letter-generator)
- Générateur PDF CV — 6 templates (Classic, Modern, Minimal, Executive, Elegant, Bold)
- Générateur lettre — 24 templates (8 langues × 3 tons : Pro, Dynamic, Creative)
- Preview CV en direct (mise à jour à chaque frappe)
- Cookie consent RGPD
- Modal email capture (UI + logique, formspree URL à configurer)
- Système de partage (Web Share API + fallback clipboard)
- Formulaire contact (Formspree connecté)
- 81 redirects Netlify (URLs propres sans `.html`)
- Meta SEO + OG + LD+JSON sur toutes les pages
- Hreflang implémenté
- Sitemap 46 URLs
- Tout le texte UI en anglais (le français a été intégralement supprimé)
- Classes CSS `.grad` et `.contextual-links` définies
- Liens nav dupliqués supprimés (32 pages SEO)
- `i18n.js` retiré des 3 pages builder

### ⚠️ Partiellement fait
- Email capture : URL Formspree vide (ligne 26 de `js/email-capture.js`)
- AI improve : bouton présent, aucun appel API réel
- Analytics : ID GA4 placeholder dans `js/analytics.js`

---

## 5. 🚨 Problèmes Critiques Restants

| Priorité | Problème | Impact | Solution |
|---|---|---|---|
| 🔴 P0 | Formspree URL vide | Aucun email collecté | Créer compte formspree.io, coller URL dans email-capture.js L26 |
| 🔴 P0 | GA4 ID placeholder | Aucune analytics réelle | Créer propriété GA4, remplacer placeholder dans analytics.js |
| 🟠 P1 | Lien "About" absent nav SEO | UX incohérent | Ajouter `<a href="../about.html">About</a>` dans nav-links de toutes les pages SEO |
| 🟠 P1 | AI improve = UI seulement | Feature non fonctionnelle | Intégrer appel API (Claude Haiku ou OpenAI) |
| 🟡 P2 | Pas de Lighthouse audit | Score perf inconnu | Lancer audit, cibler 90+ |
| 🟡 P2 | OG image identique partout | SEO social faible | Créer OG images par pays/thématique |
| 🟢 P3 | PWA manifest absent | Pas d'installation mobile | Ajouter manifest.json + service worker minimal |

---

## 6. 📈 SEO Strategy Finale

### Clusters de contenu

**Cluster 1 — Pages Money (conversion directe)**
- `/create-cv-free` — générateur CV principal
- `/cover-letter-generator` — générateur lettre
- `/templates` — galerie
- `/cv-generator` — entrée alternative

**Cluster 2 — Pages Pays (trafic informationnel)**
12 pages pays → maillage interne vers les pages money + entre elles

**Cluster 3 — Pages Thématiques CV (trafic long tail)**
11 pages (format, étudiant, stage, logiciel, compétences, etc.)

**Cluster 4 — Pages Lettre (trafic + conversion)**
7 pages lettre de motivation

### Maillage interne
- Chaque page SEO → CTA → `/create-cv-free` + `/cover-letter-generator`
- Bloc `contextual-links` en pied de chaque page SEO (liens croisés pays/thèmes)
- Footer uniforme avec liens vers toutes les sections

### Risques duplication
- ⚠️ `/cv-example` vs `/cv-examples` — surveiller le crawl (canonical déjà posé)
- ⚠️ `create-cv-free` vs `cv-generator` — pages similaires, différencier le contenu

---

## 7. 🎨 UX & Conversion

### Structure homepage idéale (actuelle)
1. Hero + CTA principal (Créer CV gratuitement)
2. Stats sociales (CVs créés, pays, note)
3. Comment ça marche (3 étapes)
4. Features (6 cartes)
5. Templates preview (6 templates)
6. CTA secondaire (Lettre de motivation)
7. Témoignages
8. CTA final

### Points d'amélioration conversion prioritaires
1. **Email capture** : activer Formspree → liste de leads précieuse
2. **Exit intent** : popup au moment de quitter sans télécharger
3. **Progress bar** : montrer % de complétion du CV en cours
4. **Template hover** : preview du CV rempli au survol des templates
5. **Social proof** : compteur live "X CVs créés aujourd'hui"

---

## 8. ⚡ Performance & Scaling

### Netlify config actuelle
- Assets (CSS/JS/images) : `Cache-Control: public, max-age=31536000, immutable`
- HTML : `Cache-Control: public, max-age=0, must-revalidate`
- Security headers : X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin

### Optimisations déjà en place
- Google Fonts : `media="print" onload="this.media='all'"` (non-bloquant)
- Images : `loading="lazy"` sur toutes les images non-critiques
- Scripts JS : `defer` sur tous sauf cv-lang.js et cv-generator.js (sync requis)

### À faire pour scaling
- Ajouter `<link rel="preload">` sur le CSS critique
- Minifier CSS/JS (un script bash simple suffit — pas de webpack)
- Vérifier que Netlify CDN est actif sur les assets (Edge network)

---

## 9. 🔒 Legal & Compliance

### Obligatoire (déjà en place)
- ✅ Bannière cookie consent (RGPD)
- ✅ Politique de confidentialité
- ✅ Mentions légales
- ✅ Politique cookies
- ✅ Conditions d'utilisation
- ✅ Aucune donnée CV envoyée à un serveur (tout en mémoire navigateur)

### Optionnel / À surveiller
- Formulaire contact → données transmises à Formspree (couvert par politique confidentialité)
- Email capture → si activé, ajouter mention "En soumettant, vous acceptez..." + lien politique
- Si GA4 activé → mettre à jour la politique cookies avec mention Google Analytics

---

## 10. 🧠 NEXT ACTIONS

### Phase 1 — Urgent (cette semaine)
1. **Formspree** : créer compte → https://formspree.io → coller l'URL endpoint dans `js/email-capture.js` ligne 26 (`FORMSPREE_URL = 'https://formspree.io/f/XXXX'`)
2. **GA4** : créer propriété Google Analytics → remplacer placeholder `G-XXXXXXXXXX` dans `js/analytics.js`
3. **Tester** sur le live Netlify : sélecteur langue CV (FR, AR, RU), hamburger mobile, PDF download
4. **Révoquer** tout token GitHub partagé en chat immédiatement après usage

### Phase 2 — Important (2 semaines)
5. Ajouter lien `About` dans nav-links de toutes les pages SEO
6. Lighthouse audit → corriger scores < 90
7. Créer OG images différenciées par pays (France, Germany, Italy au minimum)
8. Tester le flow complet sur mobile (iOS Safari + Android Chrome)

### Phase 3 — Optimisation (1 mois)
9. AI improve : intégrer Claude Haiku API (amélioration du résumé professionnel)
10. Blog/content section pour long-tail SEO
11. PWA manifest + service worker (offline CV editing)
12. Nexora brand integration (quand prêt)
13. A/B test : variante homepage avec formulaire simplifié en hero

---

## Références Techniques Rapides

| Élément | Valeur |
|---|---|
| GitHub | https://github.com/Qlf296/vixfor |
| Live URL | https://forgcv.com |
| Contact | vixfor.contact@gmail.com |
| Couleur primaire | `#5B57FF` |
| Couleur secondaire | `#8B5CF6` |
| Gradient | `linear-gradient(135deg,#5B57FF,#8B5CF6)` |
| Police | Inter (Google Fonts) |
| Hébergement | Netlify (auto-deploy depuis main) |
| Redirects | 81 règles dans netlify.toml |
| Langues | 8 : EN, FR, NL, ES, AR, RU, DE, PT |
| Templates CV | 6 : Classic, Modern, Minimal, Executive, Elegant, Bold |
| Templates Lettre | 24 (8 langues × 3 tons) |
| Pages totales | 46 HTML |
| Pages SEO | 32 |
| Pages légales | 4 |

---

*Document produit le 4 juillet 2026. À mettre à jour à chaque décision architecturale majeure.*
