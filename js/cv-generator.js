// ── Tab isolation — prevents multi-tab state conflicts ──────────────────────
var _tabKey = (function() {
  try {
    var k = sessionStorage.getItem('fgcv_tab');
    if (!k) { k = Math.random().toString(36).slice(2,10); sessionStorage.setItem('fgcv_tab', k); }
    return k;
  } catch(e) { return 'default'; }
})();

/**
 * ForgCV by Vixfor — CV Generator
 * Multi-step form + live preview + PDF export
 */

/* ── State ── */
const cvState = {
  step: 1,
  template: 'classic',
  data: {
    firstname: '', lastname: '', title: '', email: '', phone: '',
    city: '', country: '', linkedin: '', website: '', summary: '',
    experiences: [], education: [], skills: '', languages: '',
  }
};

const TEMPLATES = {
  classic:   { name: 'Classic',   accent: '#5B57FF' },
  modern:    { name: 'Modern',    accent: '#0EA5E9' },
  minimal:   { name: 'Minimal',   accent: '#10B981' },
  executive: { name: 'Executive', accent: '#1A1A2E' },
  elegant:   { name: 'Elegant',   accent: '#D4A853' },
  bold:      { name: 'Bold',      accent: '#EF4444' },
};

/* ── Navigation ── */
function goToStep(n) {
  if (n < 1 || n > 3) return;
  cvState.step = n;
  collectFormData();
  renderStep();
  updatePreview();
}

function renderStep() {
  // Progress bar
  const fills = { 1: '33%', 2: '66%', 3: '100%' };
  const pf = document.getElementById('progress-fill');
  if (pf) pf.style.width = fills[cvState.step] || '33%';

  // Step panels
  document.querySelectorAll('.cv-step-panel').forEach(p => p.classList.add('hidden'));
  document.querySelector(`#step-panel-${cvState.step}`)?.classList.remove('hidden');

  // Step indicators
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < cvState.step) s.classList.add('done');
    if (i + 1 === cvState.step) s.classList.add('active');
  });
  document.querySelectorAll('.step-line').forEach((l, i) => {
    l.classList.toggle('done', i + 1 < cvState.step);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Form Data Collection ── */
function collectFormData() {
  const d = cvState.data;
  const g = id => document.getElementById(id)?.value?.trim() || '';
  d.firstname = g('cv-firstname');
  d.lastname  = g('cv-lastname');
  d.title     = g('cv-job-title');
  d.email     = g('cv-email');
  d.phone     = g('cv-phone');
  d.city      = g('cv-city');
  d.country   = g('cv-country');
  d.linkedin  = g('cv-linkedin');
  d.website   = g('cv-website');
  d.summary   = g('cv-summary');
  d.skills    = g('cv-skills');
  d.languages = g('cv-languages');

  d.experiences = [];
  document.querySelectorAll('.exp-entry').forEach(entry => {
    const vals = {
      company:  entry.querySelector('.exp-company')?.value?.trim()  || '',
      position: entry.querySelector('.exp-position')?.value?.trim() || '',
      start:    entry.querySelector('.exp-start')?.value?.trim()    || '',
      end:      entry.querySelector('.exp-end')?.value?.trim()      || '',
      current:  entry.querySelector('.exp-current')?.checked        || false,
      desc:     entry.querySelector('.exp-desc')?.value?.trim()     || '',
    };
    if (vals.company || vals.position) d.experiences.push(vals);
  });

  d.education = [];
  document.querySelectorAll('.edu-entry').forEach(entry => {
    const vals = {
      school: entry.querySelector('.edu-school')?.value?.trim() || '',
      degree: entry.querySelector('.edu-degree')?.value?.trim() || '',
      field:  entry.querySelector('.edu-field')?.value?.trim()  || '',
      end:    entry.querySelector('.edu-end')?.value?.trim()    || '',
    };
    if (vals.school || vals.degree) d.education.push(vals);
  });
}

/* ── Experience entries ── */
let expCount = 0;
function addExperience(data = {}) {
  expCount++;
  const container = document.getElementById('experiences-container');
  const div = document.createElement('div');
  div.className = 'exp-entry form-entry-card';
  const _lang = window.cvLang || 'en';
  const _ui = (window.CV_UI_DICT && window.CV_UI_DICT[_lang]) ? window.CV_UI_DICT[_lang] : (window.CV_UI_DICT ? window.CV_UI_DICT['en'] : {});
  div.innerHTML = `
    <div class="entry-header">
      <span class="entry-title"><span data-i18n="expLabel">${_ui.expLabel||'Experience'}</span> #${expCount}</span>
      <button type="button" class="btn-remove" onclick="this.closest('.exp-entry').remove();updatePreview();" aria-label="Remove">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label"><span data-i18n="entryCompany">${_ui.entryCompany||'Company'}</span></label>
        <input class="form-input exp-company" type="text" placeholder="Google, Apple..." value="${data.company||''}" oninput="updatePreview()">
      </div>
      <div class="form-group">
        <label class="form-label"><span data-i18n="entryPosition">${_ui.entryPosition||'Position'}</span></label>
        <input class="form-input exp-position" type="text" placeholder="Engineer, Designer..." value="${data.position||''}" oninput="updatePreview()">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label"><span data-i18n="entryStart">${_ui.entryStart||'Start'}</span></label>
        <input class="form-input exp-start" type="text" placeholder="Jan 2022" value="${data.start||''}" oninput="updatePreview()">
      </div>
      <div class="form-group">
        <label class="form-label"><span data-i18n="entryEnd">${_ui.entryEnd||'End'}</span></label>
        <input class="form-input exp-end" type="text" placeholder="Dec 2024" value="${data.end||''}" oninput="updatePreview()" ${data.current?'disabled':''}>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label check-label">
        <input type="checkbox" class="exp-current" ${data.current?'checked':''} onchange="
          const ei=this.closest('.exp-entry').querySelector('.exp-end');
          if(this.checked){ei.value=(window.CV_LANG_DICT&&window.CV_LANG_DICT[window.cvLang||'en']&&window.CV_LANG_DICT[window.cvLang||'en'].present)||'Present';ei.disabled=true;}else{ei.value='';ei.disabled=false;}
          updatePreview();">
        <span data-i18n="entryCurrent">${_ui.entryCurrent||'Current position'}</span>
      </label>
    </div>
    <div class="form-group">
      <label class="form-label"><span data-i18n="entryDescription">${_ui.entryDescription||'Description'}</span></label>
      <textarea class="form-textarea exp-desc" placeholder="Describe your achievements..." oninput="updatePreview()">${data.desc||''}</textarea>
    </div>`;
  container.appendChild(div);
  if (typeof window.updateCVLanguage === 'function') window.updateCVLanguage(window.cvLang || 'en');
}

/* ── Education entries ── */
let eduCount = 0;
function addEducation(data = {}) {
  eduCount++;
  const container = document.getElementById('education-container');
  const div = document.createElement('div');
  div.className = 'edu-entry form-entry-card';
  const _lang = window.cvLang || 'en';
  const _ui = (window.CV_UI_DICT && window.CV_UI_DICT[_lang]) ? window.CV_UI_DICT[_lang] : (window.CV_UI_DICT ? window.CV_UI_DICT['en'] : {});
  div.innerHTML = `
    <div class="entry-header">
      <span class="entry-title"><span data-i18n="eduLabel">${_ui.eduLabel||'Education'}</span> #${eduCount}</span>
      <button type="button" class="btn-remove" onclick="this.closest('.edu-entry').remove();updatePreview();" aria-label="Remove">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label"><span data-i18n="entrySchool">${_ui.entrySchool||'School / University'}</span></label>
        <input class="form-input edu-school" type="text" placeholder="University of Amsterdam" value="${data.school||''}" oninput="updatePreview()">
      </div>
      <div class="form-group">
        <label class="form-label"><span data-i18n="entryDegree">${_ui.entryDegree||'Degree'}</span></label>
        <input class="form-input edu-degree" type="text" placeholder="Master, Bachelor, BSc..." value="${data.degree||''}" oninput="updatePreview()">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label"><span data-i18n="entryField">${_ui.entryField||'Field'}</span></label>
        <input class="form-input edu-field" type="text" placeholder="Computer Science, Marketing..." value="${data.field||''}" oninput="updatePreview()">
      </div>
      <div class="form-group">
        <label class="form-label"><span data-i18n="entryYear">${_ui.entryYear||'Year'}</span></label>
        <input class="form-input edu-end" type="text" placeholder="2023" value="${data.end||''}" oninput="updatePreview()">
      </div>
    </div>`;
  container.appendChild(div);
  if (typeof window.updateCVLanguage === 'function') window.updateCVLanguage(window.cvLang || 'en');
}

/* ══════════════════════════════════════════════
   CV HTML BUILDER — used by both preview & PDF
══════════════════════════════════════════════ */
function buildCVHtml(d, tpl, forPDF = false) {
  const skills   = d.skills    ? d.skills.split(',').map(s => s.trim()).filter(Boolean)    : [];
  const langList = d.languages ? d.languages.split(',').map(s => s.trim()).filter(Boolean) : [];
  const accent   = TEMPLATES[tpl]?.accent || '#5B57FF';
  const fullName = `${d.firstname} ${d.lastname}`.trim() || 'Your Name';

  /* ── Helper: entry date display ── */
  const expDate = exp =>
    `${exp.start}${exp.start && (exp.end || exp.current) ? ' – ' : ''}${exp.current ? (window.CV_LANG_DICT && window.CV_LANG_DICT[window.cvLang||'en'] && window.CV_LANG_DICT[window.cvLang||'en'].present || 'Present') : exp.end}`;

  /* ── Shared section builders ── */
  const skillChips = (list, cls = 'cvr-skill') =>
    list.map(s => `<span class="${cls}">${s}</span>`).join('');

  /* ════════════ CLASSIC / ELEGANT / BOLD ════════════ */
  if (tpl === 'classic' || tpl === 'elegant' || tpl === 'bold') {
    return `
<div class="cv-render cv-render-${tpl}" style="--cv-accent:${accent}" dir="${(window.CV_LANG_DICT[window.cvLang||'en']).rtl?'rtl':'ltr'}">
  <header class="cvr-header">
    <div class="cvr-name">${fullName}</div>
    ${d.title ? `<div class="cvr-title">${d.title}</div>` : ''}
    <div class="cvr-contact">
      ${d.email   ? `<span>✉ ${d.email}</span>`   : ''}
      ${d.phone   ? `<span>📞 ${d.phone}</span>`  : ''}
      ${(d.city||d.country) ? `<span>📍 ${[d.city,d.country].filter(Boolean).join(', ')}</span>` : ''}
      ${d.linkedin ? `<span>🔗 ${d.linkedin}</span>` : ''}
      ${d.website  ? `<span>🌐 ${d.website}</span>`  : ''}
    </div>
  </header>
  ${d.summary ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).profile}</h3>
    <p class="cvr-text">${d.summary}</p>
  </section>` : ''}
  ${d.experiences.length ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).experience}</h3>
    ${d.experiences.map(exp => `
    <div class="cvr-entry">
      <div class="cvr-entry-header">
        <div>
          <div class="cvr-entry-title">${exp.position}</div>
          <div class="cvr-entry-sub">${exp.company}</div>
        </div>
        <div class="cvr-entry-date">${expDate(exp)}</div>
      </div>
      ${exp.desc ? `<p class="cvr-text">${exp.desc}</p>` : ''}
    </div>`).join('')}
  </section>` : ''}
  ${d.education.length ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).education}</h3>
    ${d.education.map(edu => `
    <div class="cvr-entry">
      <div class="cvr-entry-header">
        <div>
          <div class="cvr-entry-title">${edu.degree}${edu.field ? ` – ${edu.field}` : ''}</div>
          <div class="cvr-entry-sub">${edu.school}</div>
        </div>
        <div class="cvr-entry-date">${edu.end}</div>
      </div>
    </div>`).join('')}
  </section>` : ''}
  ${skills.length ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).skills}</h3>
    <div class="cvr-skills">${skillChips(skills)}</div>
  </section>` : ''}
  ${langList.length ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).languages}</h3>
    <div class="cvr-skills">${skillChips(langList, 'cvr-skill cvr-skill-lang')}</div>
  </section>` : ''}
</div>`;
  }

  /* ════════════ MODERN ════════════ */
  if (tpl === 'modern') {
    return `
<div class="cv-render cv-render-modern" style="--cv-accent:${accent}" dir="${(window.CV_LANG_DICT[window.cvLang||'en']).rtl?'rtl':'ltr'}">
  <aside class="cvr-sidebar">
    <div class="cvr-avatar-lg">${(d.firstname[0]||'?')}${(d.lastname[0]||'')}</div>
    <div class="cvr-name-side">${fullName}</div>
    ${d.title ? `<div class="cvr-title-side">${d.title}</div>` : ''}
    <div class="cvr-sidebar-section">
      <h4>Contact</h4>
      ${d.email    ? `<p>✉ ${d.email}</p>`    : ''}
      ${d.phone    ? `<p>📞 ${d.phone}</p>`   : ''}
      ${(d.city||d.country) ? `<p>📍 ${[d.city,d.country].filter(Boolean).join(', ')}</p>` : ''}
      ${d.linkedin ? `<p>🔗 ${d.linkedin}</p>` : ''}
      ${d.website  ? `<p>🌐 ${d.website}</p>`  : ''}
    </div>
    ${skills.length ? `
    <div class="cvr-sidebar-section">
      <h4>${(window.CV_LANG_DICT[window.cvLang||'en']).skills}</h4>
      ${skills.map(s=>`<div class="cvr-skill-side">${s}</div>`).join('')}
    </div>` : ''}
    ${langList.length ? `
    <div class="cvr-sidebar-section">
      <h4>${(window.CV_LANG_DICT[window.cvLang||'en']).languages}</h4>
      ${langList.map(l=>`<div class="cvr-skill-side">${l}</div>`).join('')}
    </div>` : ''}
  </aside>
  <main class="cvr-main-content">
    ${d.summary ? `
    <section class="cvr-section">
      <h3 class="cvr-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).profile}</h3>
      <p class="cvr-text">${d.summary}</p>
    </section>` : ''}
    ${d.experiences.length ? `
    <section class="cvr-section">
      <h3 class="cvr-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).experience}</h3>
      ${d.experiences.map(exp => `
      <div class="cvr-entry">
        <div class="cvr-entry-header">
          <div>
            <div class="cvr-entry-title">${exp.position}</div>
            <div class="cvr-entry-sub">${exp.company}</div>
          </div>
          <div class="cvr-entry-date">${expDate(exp)}</div>
        </div>
        ${exp.desc ? `<p class="cvr-text">${exp.desc}</p>` : ''}
      </div>`).join('')}
    </section>` : ''}
    ${d.education.length ? `
    <section class="cvr-section">
      <h3 class="cvr-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).education}</h3>
      ${d.education.map(edu => `
      <div class="cvr-entry">
        <div class="cvr-entry-header">
          <div>
            <div class="cvr-entry-title">${edu.degree}${edu.field?` – ${edu.field}`:''}</div>
            <div class="cvr-entry-sub">${edu.school}</div>
          </div>
          <div class="cvr-entry-date">${edu.end}</div>
        </div>
      </div>`).join('')}
    </section>` : ''}
  </main>
</div>`;
  }

  /* ════════════ MINIMAL ════════════ */
  if (tpl === 'minimal') {
    return `
<div class="cv-render cv-render-minimal" style="--cv-accent:${accent}" dir="${(window.CV_LANG_DICT[window.cvLang||'en']).rtl?'rtl':'ltr'}">
  <header class="cvr-header-minimal">
    <div class="cvr-accent-bar"></div>
    <div class="cvr-name-minimal">${fullName}</div>
    ${d.title ? `<div class="cvr-title-minimal">${d.title}</div>` : ''}
    <div class="cvr-contact-minimal">
      ${[d.email, d.phone, [d.city,d.country].filter(Boolean).join(', ')].filter(Boolean).join('  ·  ')}
    </div>
  </header>
  ${d.summary ? `<p class="cvr-summary-minimal">${d.summary}</p>` : ''}
  ${d.experiences.length ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title-minimal">${(window.CV_LANG_DICT[window.cvLang||'en']).experience.toUpperCase()}</h3>
    ${d.experiences.map(exp => `
    <div class="cvr-entry-minimal">
      <div class="cvr-entry-meta">${expDate(exp)}</div>
      <div>
        <div class="cvr-entry-title">${exp.position} · ${exp.company}</div>
        ${exp.desc ? `<p class="cvr-text">${exp.desc}</p>` : ''}
      </div>
    </div>`).join('')}
  </section>` : ''}
  ${d.education.length ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title-minimal">${(window.CV_LANG_DICT[window.cvLang||'en']).education.toUpperCase()}</h3>
    ${d.education.map(edu => `
    <div class="cvr-entry-minimal">
      <div class="cvr-entry-meta">${edu.end}</div>
      <div><div class="cvr-entry-title">${edu.degree}${edu.field?` – ${edu.field}`:''} · ${edu.school}</div></div>
    </div>`).join('')}
  </section>` : ''}
  ${skills.length ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title-minimal">${(window.CV_LANG_DICT[window.cvLang||'en']).skills.toUpperCase()}</h3>
    <div class="cvr-skills">${skillChips(skills)}</div>
  </section>` : ''}
  ${langList.length ? `
  <section class="cvr-section">
    <h3 class="cvr-section-title-minimal">${(window.CV_LANG_DICT[window.cvLang||'en']).languages.toUpperCase()}</h3>
    <div class="cvr-skills">${skillChips(langList, 'cvr-skill cvr-skill-lang')}</div>
  </section>` : ''}
</div>`;
  }

  /* ════════════ EXECUTIVE ════════════ */
  if (tpl === 'executive') {
    return `
<div class="cv-render cv-render-executive" style="--cv-accent:${accent}" dir="${(window.CV_LANG_DICT[window.cvLang||'en']).rtl?'rtl':'ltr'}">
  <header class="cvr-exec-header">
    <div class="cvr-exec-name">${fullName}</div>
    ${d.title ? `<div class="cvr-exec-title">${d.title}</div>` : ''}
    <div class="cvr-exec-contact">
      ${[d.email, d.phone, [d.city,d.country].filter(Boolean).join(', '), d.linkedin].filter(Boolean).join(' · ')}
    </div>
  </header>
  ${d.summary ? `
  <section class="cvr-section cvr-exec-section">
    <h3 class="cvr-exec-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).summary.toUpperCase()}</h3>
    <p class="cvr-text">${d.summary}</p>
  </section>` : ''}
  ${d.experiences.length ? `
  <section class="cvr-section cvr-exec-section">
    <h3 class="cvr-exec-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).experience.toUpperCase()}</h3>
    ${d.experiences.map(exp => `
    <div class="cvr-entry">
      <div class="cvr-entry-header">
        <div>
          <div class="cvr-entry-title">${exp.position}</div>
          <div class="cvr-entry-sub">${exp.company}</div>
        </div>
        <div class="cvr-entry-date">${expDate(exp)}</div>
      </div>
      ${exp.desc ? `<p class="cvr-text">${exp.desc}</p>` : ''}
    </div>`).join('')}
  </section>` : ''}
  ${d.education.length ? `
  <section class="cvr-section cvr-exec-section">
    <h3 class="cvr-exec-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).education.toUpperCase()}</h3>
    ${d.education.map(edu => `
    <div class="cvr-entry">
      <div class="cvr-entry-header">
        <div>
          <div class="cvr-entry-title">${edu.degree}${edu.field?` in ${edu.field}`:''}</div>
          <div class="cvr-entry-sub">${edu.school}</div>
        </div>
        <div class="cvr-entry-date">${edu.end}</div>
      </div>
    </div>`).join('')}
  </section>` : ''}
  ${skills.length ? `
  <section class="cvr-section cvr-exec-section">
    <h3 class="cvr-exec-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).skills.toUpperCase()}</h3>
    <div class="cvr-skills">${skillChips(skills)}</div>
  </section>` : ''}
  ${langList.length ? `
  <section class="cvr-section cvr-exec-section">
    <h3 class="cvr-exec-section-title">${(window.CV_LANG_DICT[window.cvLang||'en']).languages.toUpperCase()}</h3>
    <div class="cvr-skills">${skillChips(langList, 'cvr-skill cvr-skill-lang')}</div>
  </section>` : ''}
</div>`;
  }

  return `<p style="color:#999;padding:1rem">Unknown template.</p>`;
}

/* ── Update live preview ── */
function updatePreview() {
  collectFormData();
  const preview = document.getElementById('cv-preview-content');
  if (!preview) return;
  preview.innerHTML = buildCVHtml(cvState.data, cvState.template, false);
}

/* ══════════════════════════════════════════════
   PDF GENERATION
   KEY INSIGHT: html2canvas cannot capture elements
   placed off-screen (left:-9999px) because they are
   outside its viewport. The reliable fix:
   - place element at top:0; left:0 in the viewport
   - cover it with a full-screen overlay so the user
     doesn't see it during the ~1s generation
   - html2canvas targets the element directly, ignoring
     whatever overlay is visually on top of it
══════════════════════════════════════════════ */

// ── Post-download: suggest cover letter ─────────────────────────────────────
function showLettreCTA() {
  if (document.getElementById('fgcv-lettre-cta')) return;
  var banner = document.createElement('div');
  banner.id = 'fgcv-lettre-cta';
  banner.style.cssText = [
    'position:fixed;bottom:1.25rem;left:50%;transform:translateX(-50%);',
    'background:linear-gradient(135deg,#5B57FF,#7C3AED);color:#fff;',
    'border-radius:16px;padding:1.25rem 1.5rem;',
    'display:flex;align-items:center;gap:1rem;flex-wrap:wrap;',
    'box-shadow:0 8px 40px rgba(91,87,255,0.4);z-index:9999;',
    'max-width:520px;width:calc(100% - 2rem);',
    'animation:fgcv-pop-in .35s cubic-bezier(.34,1.56,.64,1)'
  ].join('');
  banner.innerHTML = [
    '<style>@keyframes fgcv-pop-in{from{opacity:0;transform:translateX(-50%) translateY(20px)}',
    'to{opacity:1;transform:translateX(-50%) translateY(0)}}</style>',
    '<div style="flex:1;min-width:160px">',
    '  <div style="font-size:.72rem;font-weight:700;opacity:.8;margin-bottom:.2rem;text-transform:uppercase;letter-spacing:.08em">✅ CV downloaded!</div>',
    '  <div style="font-size:.95rem;font-weight:800;line-height:1.3">Add a cover letter<br>and triple your interview chances</div>',
    '</div>',
    '<div style="display:flex;flex-direction:column;gap:.5rem;flex-shrink:0">',
    '  <a href="cover-letter-generator.html" style="display:inline-flex;align-items:center;gap:6px;',
    '     background:#fff;color:#5B57FF;padding:.55rem 1.1rem;border-radius:9999px;',
    '     font-weight:800;font-size:.85rem;text-decoration:none;white-space:nowrap">',
    '    ✉️ Create my cover letter →',
    '  </a>',
    '  <button onclick="document.getElementById(\'fgcv-lettre-cta\').remove()" ',
    '    style="background:transparent;border:none;color:rgba(255,255,255,.7);',
    '    font-size:.75rem;cursor:pointer;text-align:center">Later</button>',
    '</div>'
  ].join('');
  document.body.appendChild(banner);
  // Auto-dismiss after 15s
  setTimeout(function() {
    var el = document.getElementById('fgcv-lettre-cta');
    if (el) { el.style.opacity='0'; el.style.transition='opacity .4s'; setTimeout(function(){el.remove();},400); }
  }, 15000);
}

function downloadPDF() {
  collectFormData();
  const d   = cvState.data;
  const tpl = cvState.template;
  const btn = document.getElementById('btn-download-pdf');

  /* Guard: preview must have content */
  const previewEl = document.getElementById('cv-preview-content');
  if (!previewEl || previewEl.innerHTML.trim() === '') {
    showToast('Please fill in your CV before downloading.', 'error');
    return;
  }

  const orig = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span> Generating…';
  btn.disabled = true;

  const accent  = TEMPLATES[tpl]?.accent || '#5B57FF';
  const name    = `${d.firstname || 'CV'} ${d.lastname || ''}`.trim();
  const cvHtml  = buildCVHtml(d, tpl, true);

  /*
   * ── STRATÉGIE PDF : Fenêtre d'impression autonome ──────────────────
   *
   * Toutes les approches html2canvas producent une page blanche à cause
   * de bugs connus avec les éléments positionnés et le scroll.
   *
   * Solution : ouvrir une nouvelle fenêtre avec HTML + CSS entièrement
   * autonomes, déclencher window.print() automatiquement.
   * Le navigateur génère un PDF parfait (rendu natif, zéro plugin).
   * ─────────────────────────────────────────────────────────────────────
   */
  const printWin = window.open('', '_blank', 'width=900,height=1100');

  if (!printWin) {
    btn.innerHTML = orig;
    btn.disabled = false;
    showToast('⚠️ Please allow pop-ups to generate the PDF.', 'error');
    return;
  }

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CV — ${name}</title>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
@page { size: A4; margin: 0; }
body { padding: 12mm 14mm; }
html, body {
  font-family: Arial, Helvetica, 'Liberation Sans', sans-serif;
  font-size: 13px;
  color: #1A1A2E;
  background: white;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.cv-render { --cv-accent: ${accent}; background: white; font-size: 12px; color: #1A1A2E; line-height: 1.5; }
.cvr-section { margin-bottom: 14px; }
.cvr-text    { font-size: 11px; color: #555; line-height: 1.65; margin-top: 4px; }
.cvr-entry        { margin-bottom: 10px; }
.cvr-entry-header { display: flex; justify-content: space-between; align-items: flex-start; }
.cvr-entry-title  { font-size: 12px; font-weight: 700; }
.cvr-entry-sub    { font-size: 11px; color: #777; margin-top: 1px; }
.cvr-entry-date   { font-size: 10px; color: #999; white-space: nowrap; margin-left: 8px; flex-shrink: 0; }
.cvr-skills { display: flex; flex-wrap: wrap; gap: 4px; }
.cvr-skill { background: rgba(91,87,255,0.08); color: ${accent}; border: 1px solid rgba(91,87,255,0.15); padding: 2px 7px; border-radius: 4px; font-size: 10px; font-weight: 600; }
.cvr-skill-lang { background: rgba(16,185,129,0.08); color: #059669; border-color: rgba(16,185,129,0.2); }

/* CLASSIC */
.cv-render-classic { padding: 28px; }
.cv-render-classic .cvr-header { padding-bottom: 14px; margin-bottom: 16px; border-bottom: 3px solid ${accent}; }
.cv-render-classic .cvr-name  { font-size: 24px; font-weight: 900; letter-spacing: -0.03em; color: ${accent}; }
.cv-render-classic .cvr-title { font-size: 12px; color: #888; font-weight: 500; margin: 3px 0 8px; }
.cv-render-classic .cvr-contact { display: flex; flex-wrap: wrap; gap: 5px 12px; font-size: 10px; color: #888; }
.cv-render-classic .cvr-section-title { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${accent}; border-bottom: 1.5px solid ${accent}; padding-bottom: 3px; margin-bottom: 8px; }

/* BOLD */
.cv-render-bold { padding-bottom: 20px; }
.cv-render-bold .cvr-header { background: ${accent}; padding: 24px 28px; margin-bottom: 0; text-align: center; }
.cv-render-bold .cvr-name   { font-size: 24px; font-weight: 900; color: white; letter-spacing: -0.03em; }
.cv-render-bold .cvr-title  { font-size: 12px; color: rgba(255,255,255,0.8); margin: 4px 0 8px; }
.cv-render-bold .cvr-contact { display: flex; flex-wrap: wrap; gap: 4px 10px; font-size: 10px; color: rgba(255,255,255,0.7); justify-content: center; }
.cv-render-bold .cvr-section { padding: 0 28px; margin-bottom: 14px; }
.cv-render-bold .cvr-section:first-of-type { margin-top: 18px; }
.cv-render-bold .cvr-section-title { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: ${accent}; border-bottom: 2px solid ${accent}; padding-bottom: 3px; margin-bottom: 8px; }
.cv-render-bold .cvr-skill { background: rgba(239,68,68,0.08); color: ${accent}; border-color: rgba(239,68,68,0.2); }

/* ELEGANT */
.cv-render-elegant { padding: 28px; }
.cv-render-elegant .cvr-header { text-align: center; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid ${accent}; }
.cv-render-elegant .cvr-name  { font-size: 22px; font-weight: 800; letter-spacing: 0.02em; color: #1A1A2E; }
.cv-render-elegant .cvr-title { font-size: 11px; color: ${accent}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin: 4px 0 8px; }
.cv-render-elegant .cvr-contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 4px 12px; font-size: 10px; color: #888; }
.cv-render-elegant .cvr-section-title { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: ${accent}; border-bottom: 1px solid ${accent}; padding-bottom: 3px; margin-bottom: 8px; }
.cv-render-elegant .cvr-skill { background: rgba(212,168,83,0.1); color: ${accent}; border-color: rgba(212,168,83,0.2); }

/* MODERN */
.cv-render-modern { display: flex; min-height: 900px; }
.cvr-sidebar { width: 170px; background: ${accent}; padding: 24px 14px; flex-shrink: 0; }
.cvr-avatar-lg { width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: white; margin: 0 auto 10px; }
.cvr-name-side  { font-size: 13px; font-weight: 800; color: white; text-align: center; margin-bottom: 2px; }
.cvr-title-side { font-size: 9px; color: rgba(255,255,255,0.75); text-align: center; margin-bottom: 14px; }
.cvr-sidebar-section { margin-bottom: 12px; }
.cvr-sidebar-section h4 { font-size: 8px; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.6); margin-bottom: 5px; font-weight: 700; }
.cvr-sidebar-section p  { font-size: 9px; color: rgba(255,255,255,0.88); margin-bottom: 3px; word-break: break-all; }
.cvr-skill-side { background: rgba(255,255,255,0.18); border-radius: 3px; padding: 2px 6px; font-size: 9px; color: white; margin-bottom: 3px; }
.cvr-main-content { flex: 1; padding: 20px; }
.cv-render-modern .cvr-section-title { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${accent}; border-bottom: 1.5px solid ${accent}; padding-bottom: 3px; margin-bottom: 8px; }

/* MINIMAL */
.cv-render-minimal { padding: 28px; }
.cvr-header-minimal { margin-bottom: 16px; }
.cvr-accent-bar    { height: 3px; background: ${accent}; border-radius: 2px; margin-bottom: 10px; }
.cvr-name-minimal  { font-size: 22px; font-weight: 900; letter-spacing: -0.04em; color: #1A1A2E; }
.cvr-title-minimal { font-size: 11px; color: ${accent}; margin: 3px 0 6px; font-weight: 600; }
.cvr-contact-minimal { font-size: 10px; color: #999; }
.cvr-summary-minimal { font-size: 11px; color: #666; margin-bottom: 14px; line-height: 1.65; }
.cvr-section-title-minimal { font-size: 9px; font-weight: 800; letter-spacing: 0.12em; color: #bbb; border-bottom: 1px solid #eee; padding-bottom: 3px; margin-bottom: 8px; }
.cvr-entry-minimal { display: flex; gap: 12px; margin-bottom: 10px; }
.cvr-entry-meta    { font-size: 10px; color: #bbb; white-space: nowrap; min-width: 64px; padding-top: 1px; }

/* EXECUTIVE */
.cvr-exec-header   { background: #1A1A2E; padding: 20px 24px; }
.cvr-exec-name     { font-size: 20px; font-weight: 900; letter-spacing: -0.02em; color: white; }
.cvr-exec-title    { font-size: 11px; color: rgba(255,255,255,0.65); margin: 3px 0 6px; }
.cvr-exec-contact  { font-size: 9px; color: rgba(255,255,255,0.5); }
.cvr-exec-section  { padding: 0 24px; margin-top: 4px; }
.cvr-exec-section-title { font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #1A1A2E; border-bottom: 2px solid #1A1A2E; padding-bottom: 3px; margin-bottom: 8px; }

/* Print layout */
@media print {
  html, body { margin: 0; padding: 0; }
  .cv-render { page-break-inside: avoid; }
}
</style>
</head>
<body>
${cvHtml}
<script>
  window.addEventListener('load', function() {
    setTimeout(function() { window.print(); }, 400);
  });
<\/script>
</body>
</html>`;

  printWin.document.open();
  printWin.document.write(fullHtml);
  printWin.document.close();

  btn.innerHTML = orig;
  btn.disabled  = false;
  showToast('✅ CV ready! Click "Save as PDF" in the print dialog.', 'success');
  setTimeout(function() {
    showToast('💡 Tip: uncheck "Headers and footers" for a clean result.', 'info');
  }, 3500);
  // Show cover letter suggestion after download
  setTimeout(showLettreCTA, 800);

  // Increment live CV counter
  if (typeof incrementCVCount === 'function') incrementCVCount();
}


/* ── Full CSS for the PDF render ── */
function getPDFStyles() {
  return `
#cv-pdf-render .cv-render { font-family: 'Inter', Arial, sans-serif; padding: 8px; }

/* CLASSIC / ELEGANT / BOLD */
#cv-pdf-render .cvr-header { padding-bottom: 14px; margin-bottom: 16px; border-bottom: 3px solid var(--cv-accent, #5B57FF); }
#cv-pdf-render .cv-render-bold .cvr-header { background: var(--cv-accent, #EF4444); color: white; padding: 24px 28px; margin-bottom: 0; border-bottom: none; text-align: center; }
#cv-pdf-render .cv-render-bold .cvr-name  { color: white !important; text-align: center; }
#cv-pdf-render .cv-render-bold .cvr-title { color: rgba(255,255,255,0.85) !important; text-align: center; }
#cv-pdf-render .cv-render-bold .cvr-contact { color: rgba(255,255,255,0.75) !important; justify-content: center; }
#cv-pdf-render .cv-render-bold .cvr-section { padding: 0 28px; }
#cv-pdf-render .cv-render-bold .cvr-section:first-of-type { margin-top: 18px; }
#cv-pdf-render .cv-render-bold .cvr-section-title { color: var(--cv-accent,#EF4444); border-color: var(--cv-accent,#EF4444); }

#cv-pdf-render .cvr-name { font-size: 26px; font-weight: 800; letter-spacing: -0.03em; color: var(--cv-accent, #5B57FF); margin-bottom: 4px; }
#cv-pdf-render .cvr-title { font-size: 13px; color: #666; font-weight: 500; margin-bottom: 8px; }
#cv-pdf-render .cvr-contact { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 11px; color: #666; }
#cv-pdf-render .cvr-section { margin-bottom: 16px; }
#cv-pdf-render .cvr-section-title { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--cv-accent, #5B57FF); border-bottom: 1.5px solid var(--cv-accent, #5B57FF); padding-bottom: 4px; margin-bottom: 10px; }
#cv-pdf-render .cvr-entry { margin-bottom: 10px; }
#cv-pdf-render .cvr-entry-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
#cv-pdf-render .cvr-entry-title { font-size: 12px; font-weight: 700; }
#cv-pdf-render .cvr-entry-sub   { font-size: 11px; color: #666; }
#cv-pdf-render .cvr-entry-date  { font-size: 10px; color: #999; white-space: nowrap; margin-left: 8px; flex-shrink: 0; }
#cv-pdf-render .cvr-text  { font-size: 11px; color: #555; line-height: 1.6; margin-top: 4px; }
#cv-pdf-render .cvr-skills { display: flex; flex-wrap: wrap; gap: 5px; }
#cv-pdf-render .cvr-skill { background: rgba(91,87,255,0.1); color: var(--cv-accent,#5B57FF); padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; border: 1px solid rgba(91,87,255,0.2); }
#cv-pdf-render .cvr-skill-lang { background: rgba(52,199,89,0.1); color: #34C759; border-color: rgba(52,199,89,0.2); }
#cv-pdf-render .cv-render-elegant .cvr-name  { color: #1A1A2E; }
#cv-pdf-render .cv-render-elegant .cvr-section-title { color: var(--cv-accent,#D4A853); border-color: var(--cv-accent,#D4A853); }
#cv-pdf-render .cv-render-elegant .cvr-skill { background: rgba(212,168,83,0.1); color: var(--cv-accent,#D4A853); border-color: rgba(212,168,83,0.2); }

/* MODERN */
#cv-pdf-render .cv-render-modern { display: flex; min-height: 900px; }
#cv-pdf-render .cvr-sidebar { width: 200px; background: var(--cv-accent,#0EA5E9); padding: 24px 14px; flex-shrink: 0; }
#cv-pdf-render .cvr-avatar-lg { width: 60px; height: 60px; border-radius: 12px; background: rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: white; margin: 0 auto 12px; }
#cv-pdf-render .cvr-name-side  { font-size: 15px; font-weight: 800; color: white; text-align: center; margin-bottom: 3px; }
#cv-pdf-render .cvr-title-side { font-size: 10px; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 14px; }
#cv-pdf-render .cvr-sidebar-section { margin-bottom: 14px; }
#cv-pdf-render .cvr-sidebar-section h4 { font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.65); margin-bottom: 6px; font-weight: 700; }
#cv-pdf-render .cvr-sidebar-section p  { font-size: 10px; color: rgba(255,255,255,0.9); margin-bottom: 4px; word-break: break-all; }
#cv-pdf-render .cvr-skill-side { background: rgba(255,255,255,0.2); border-radius: 3px; padding: 3px 7px; font-size: 10px; color: white; margin-bottom: 3px; }
#cv-pdf-render .cvr-main-content { flex: 1; padding: 20px 22px; }

/* MINIMAL */
#cv-pdf-render .cvr-header-minimal { margin-bottom: 16px; }
#cv-pdf-render .cvr-accent-bar     { height: 3px; background: var(--cv-accent,#10B981); border-radius: 2px; margin-bottom: 12px; }
#cv-pdf-render .cvr-name-minimal   { font-size: 24px; font-weight: 900; letter-spacing: -0.04em; margin-bottom: 3px; }
#cv-pdf-render .cvr-title-minimal  { font-size: 12px; color: var(--cv-accent,#10B981); margin-bottom: 6px; font-weight: 600; }
#cv-pdf-render .cvr-contact-minimal { font-size: 10px; color: #999; }
#cv-pdf-render .cvr-summary-minimal { font-size: 11px; color: #555; margin-bottom: 16px; line-height: 1.65; }
#cv-pdf-render .cvr-section-title-minimal { font-size: 9px; font-weight: 800; letter-spacing: 0.12em; color: #aaa; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 10px; }
#cv-pdf-render .cvr-entry-minimal  { display: flex; gap: 12px; margin-bottom: 10px; }
#cv-pdf-render .cvr-entry-meta     { font-size: 10px; color: #bbb; white-space: nowrap; min-width: 72px; padding-top: 1px; }

/* EXECUTIVE */
#cv-pdf-render .cvr-exec-header   { background: #1A1A2E; color: white; padding: 20px 22px; margin-bottom: 16px; }
#cv-pdf-render .cvr-exec-name     { font-size: 22px; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 4px; }
#cv-pdf-render .cvr-exec-title    { font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 8px; }
#cv-pdf-render .cvr-exec-contact  { font-size: 10px; color: rgba(255,255,255,0.55); }
#cv-pdf-render .cvr-exec-section  { padding: 0 22px; }
#cv-pdf-render .cvr-exec-section-title { font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #1A1A2E; border-bottom: 2px solid #1A1A2E; padding-bottom: 4px; margin-bottom: 10px; }
  `;
}

/* ── Template Selection ── */
function selectTemplate(tplId) {
  cvState.template = tplId;
  document.querySelectorAll('.tpl-select-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.tpl === tplId);
  });
  updatePreview();
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  addExperience();
  addEducation();

  document.querySelectorAll('#step-panel-1 input, #step-panel-1 textarea')
    .forEach(el => el.addEventListener('input', updatePreview));

  updatePreview();

  document.querySelectorAll('.tpl-select-card').forEach(card => {
    card.addEventListener('click', () => selectTemplate(card.dataset.tpl));
  });

  document.getElementById('btn-next-1')?.addEventListener('click', () => goToStep(2));
  document.getElementById('btn-next-2')?.addEventListener('click', () => goToStep(3));
  document.getElementById('btn-back-2')?.addEventListener('click', () => goToStep(1));
  document.getElementById('btn-back-3')?.addEventListener('click', () => goToStep(2));
  document.getElementById('btn-download-pdf')?.addEventListener('click', downloadPDF);
  document.getElementById('btn-copy-cv')?.addEventListener('click', () => {
    const text = document.getElementById('cv-preview-content')?.innerText || '';
    navigator.clipboard.writeText(text).then(() => showToast('Copied!', 'success'));
  });
  document.getElementById('btn-new-cv')?.addEventListener('click', () => {
    if (confirm('Create a new CV? Your data will be cleared.')) location.reload();
  });
  document.getElementById('btn-add-exp')?.addEventListener('click', () => addExperience());
  document.getElementById('btn-add-edu')?.addEventListener('click', () => addEducation());
});
