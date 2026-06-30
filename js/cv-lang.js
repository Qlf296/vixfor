/**
 * cv-lang.js — ForgCV scoped language module
 *
 * SCOPE: ONLY controls content inside:
 *   #cv-builder  → CV form labels + CV section headings in PDF
 *   #letter-builder → Cover letter form labels + generated letter
 *
 * The site UI (nav, footer, hero, SEO sections) stays 100% English at all times.
 *
 * Exposes:
 *   window.CV_LANG_DICT          — 8-lang dict for CV section headings (used by cv-generator.js)
 *   window.cvLang                — currently selected CV language
 *   window.letterLang            — currently selected letter language
 *   window.updateCVLanguage(lang)
 *   window.updateLetterLanguage(lang)
 */

(function () {
  'use strict';

  /* ── 1. CV section heading dictionary (used by cv-generator.js for PDF titles) ── */
  var CV_LANG_DICT = {
    en: { profile:'Profile', experience:'Experience', education:'Education', skills:'Skills', languages:'Languages', contact:'Contact', summary:'Professional Summary', present:'Present', rtl:false },
    fr: { profile:'Profil', experience:'Expériences professionnelles', education:'Formation', skills:'Compétences', languages:'Langues', contact:'Contact', summary:'Profil professionnel', present:'Présent', rtl:false },
    nl: { profile:'Profiel', experience:'Werkervaring', education:'Opleiding', skills:'Vaardigheden', languages:'Talen', contact:'Contact', summary:'Professioneel profiel', present:'Heden', rtl:false },
    es: { profile:'Perfil', experience:'Experiencia profesional', education:'Formación', skills:'Habilidades', languages:'Idiomas', contact:'Contacto', summary:'Resumen profesional', present:'Actualidad', rtl:false },
    ar: { profile:'الملف الشخصي', experience:'الخبرة المهنية', education:'التعليم', skills:'المهارات', languages:'اللغات', contact:'معلومات الاتصال', summary:'الملخص المهني', present:'الحاضر', rtl:true },
    ru: { profile:'Профиль', experience:'Опыт работы', education:'Образование', skills:'Навыки', languages:'Языки', contact:'Контакты', summary:'Профессиональное резюме', present:'Настоящее время', rtl:false },
    de: { profile:'Profil', experience:'Berufserfahrung', education:'Ausbildung', skills:'Kenntnisse', languages:'Sprachen', contact:'Kontakt', summary:'Berufliches Profil', present:'Heute', rtl:false },
    pt: { profile:'Perfil', experience:'Experiência profissional', education:'Formação académica', skills:'Competências', languages:'Idiomas', contact:'Contacto', summary:'Perfil profissional', present:'Presente', rtl:false }
  };

  /* ── 2. CV BUILDER UI dictionary (form labels inside #cv-builder) ───────────── */
  var CV_UI_DICT = {
    en: {
      personalInfo:'Your personal information', thisInfo:'This information will appear at the top of your CV.',
      identity:'Identity', firstName:'First name', lastName:'Last name', jobTitle:'Job title',
      contact:'Contact', email:'Email', phone:'Phone', city:'City', country:'Country',
      linkedin:'LinkedIn', website:'Website',
      profile:'Profile', professionalSummary:'Professional summary',
      workExperience:'Work experience', addExperience:'+ Add experience',
      education:'Education', addEducation:'+ Add education',
      skillsLanguages:'Skills & Languages', skills:'Skills (comma-separated)', languages:'Languages (comma-separated)',
      chooseTemplate:'Choose your template',
      stepInfo:'Informations', stepTemplate:'Template', stepDownload:'Download',
      autosaved:'Saved', next:'Next →', previous:'← Previous',
      expLabel:'Experience', eduLabel:'Education', entryCompany:'Company', entryPosition:'Position', entryStart:'Start', entryEnd:'End', entryCurrent:'Current position', entryDescription:'Description', entrySchool:'School / University', entryDegree:'Degree', entryField:'Field', entryYear:'Year'
    },
    fr: {
      personalInfo:'Vos informations personnelles', thisInfo:'Ces informations apparaîtront en haut de votre CV.',
      identity:'Identité', firstName:'Prénom', lastName:'Nom', jobTitle:'Poste',
      contact:'Contact', email:'Email', phone:'Téléphone', city:'Ville', country:'Pays',
      linkedin:'LinkedIn', website:'Site web',
      profile:'Profil', professionalSummary:'Profil professionnel',
      workExperience:'Expérience professionnelle', addExperience:'+ Ajouter une expérience',
      education:'Formation', addEducation:'+ Ajouter une formation',
      skillsLanguages:'Compétences & Langues', skills:'Compétences (séparées par virgules)', languages:'Langues (séparées par virgules)',
      chooseTemplate:'Choisissez votre modèle',
      stepInfo:'Informations', stepTemplate:'Modèle', stepDownload:'Télécharger',
      autosaved:'Sauvegardé', next:'Suivant →', previous:'← Précédent',
      expLabel:'Expérience', eduLabel:'Formation', entryCompany:'Entreprise', entryPosition:'Poste', entryStart:'Début', entryEnd:'Fin', entryCurrent:'Poste actuel', entryDescription:'Description', entrySchool:'École / Université', entryDegree:'Diplôme', entryField:'Domaine', entryYear:'Année'
    },
    nl: {
      personalInfo:'Uw persoonlijke informatie', thisInfo:'Deze informatie verschijnt bovenaan uw CV.',
      identity:'Identiteit', firstName:'Voornaam', lastName:'Achternaam', jobTitle:'Functietitel',
      contact:'Contact', email:'E-mail', phone:'Telefoon', city:'Stad', country:'Land',
      linkedin:'LinkedIn', website:'Website',
      profile:'Profiel', professionalSummary:'Professioneel profiel',
      workExperience:'Werkervaring', addExperience:'+ Ervaring toevoegen',
      education:'Opleiding', addEducation:'+ Opleiding toevoegen',
      skillsLanguages:'Vaardigheden & Talen', skills:'Vaardigheden (komma-gescheiden)', languages:'Talen (komma-gescheiden)',
      chooseTemplate:'Kies uw sjabloon',
      stepInfo:'Informatie', stepTemplate:'Sjabloon', stepDownload:'Downloaden',
      autosaved:'Opgeslagen', next:'Volgende →', previous:'← Vorige',
      expLabel:'Ervaring', eduLabel:'Opleiding', entryCompany:'Bedrijf', entryPosition:'Functie', entryStart:'Begin', entryEnd:'Einde', entryCurrent:'Huidige functie', entryDescription:'Beschrijving', entrySchool:'School / Universiteit', entryDegree:'Diploma', entryField:'Vakgebied', entryYear:'Jaar'
    },
    es: {
      personalInfo:'Su información personal', thisInfo:'Esta información aparecerá en la parte superior de su CV.',
      identity:'Identidad', firstName:'Nombre', lastName:'Apellido', jobTitle:'Cargo',
      contact:'Contacto', email:'Email', phone:'Teléfono', city:'Ciudad', country:'País',
      linkedin:'LinkedIn', website:'Sitio web',
      profile:'Perfil', professionalSummary:'Resumen profesional',
      workExperience:'Experiencia profesional', addExperience:'+ Añadir experiencia',
      education:'Formación', addEducation:'+ Añadir formación',
      skillsLanguages:'Habilidades e Idiomas', skills:'Habilidades (separadas por comas)', languages:'Idiomas (separados por comas)',
      chooseTemplate:'Elige tu plantilla',
      stepInfo:'Información', stepTemplate:'Plantilla', stepDownload:'Descargar',
      autosaved:'Guardado', next:'Siguiente →', previous:'← Anterior',
      expLabel:'Experiencia', eduLabel:'Formación', entryCompany:'Empresa', entryPosition:'Cargo', entryStart:'Inicio', entryEnd:'Fin', entryCurrent:'Puesto actual', entryDescription:'Descripción', entrySchool:'Escuela / Universidad', entryDegree:'Título', entryField:'Campo', entryYear:'Año'
    },
    ar: {
      personalInfo:'معلوماتك الشخصية', thisInfo:'ستظهر هذه المعلومات في أعلى سيرتك الذاتية.',
      identity:'الهوية', firstName:'الاسم الأول', lastName:'اسم العائلة', jobTitle:'المسمى الوظيفي',
      contact:'التواصل', email:'البريد الإلكتروني', phone:'الهاتف', city:'المدينة', country:'الدولة',
      linkedin:'لينكد إن', website:'الموقع الإلكتروني',
      profile:'الملف الشخصي', professionalSummary:'الملخص المهني',
      workExperience:'الخبرة المهنية', addExperience:'+ إضافة خبرة',
      education:'التعليم', addEducation:'+ إضافة تعليم',
      skillsLanguages:'المهارات واللغات', skills:'المهارات (مفصولة بفواصل)', languages:'اللغات (مفصولة بفواصل)',
      chooseTemplate:'اختر النموذج',
      stepInfo:'المعلومات', stepTemplate:'النموذج', stepDownload:'تنزيل',
      autosaved:'محفوظ', next:'التالي ←', previous:'→ السابق',
      expLabel:'خبرة', eduLabel:'تعليم', entryCompany:'الشركة', entryPosition:'المنصب', entryStart:'البداية', entryEnd:'النهاية', entryCurrent:'المنصب الحالي', entryDescription:'الوصف', entrySchool:'المدرسة / الجامعة', entryDegree:'الشهادة', entryField:'التخصص', entryYear:'السنة'
    },
    ru: {
      personalInfo:'Ваша личная информация', thisInfo:'Эта информация появится в верхней части вашего резюме.',
      identity:'Личные данные', firstName:'Имя', lastName:'Фамилия', jobTitle:'Должность',
      contact:'Контакты', email:'Email', phone:'Телефон', city:'Город', country:'Страна',
      linkedin:'LinkedIn', website:'Сайт',
      profile:'Профиль', professionalSummary:'Профессиональное резюме',
      workExperience:'Опыт работы', addExperience:'+ Добавить опыт',
      education:'Образование', addEducation:'+ Добавить образование',
      skillsLanguages:'Навыки и Языки', skills:'Навыки (через запятую)', languages:'Языки (через запятую)',
      chooseTemplate:'Выберите шаблон',
      stepInfo:'Информация', stepTemplate:'Шаблон', stepDownload:'Скачать',
      autosaved:'Сохранено', next:'Далее →', previous:'← Назад',
      expLabel:'Опыт', eduLabel:'Образование', entryCompany:'Компания', entryPosition:'Должность', entryStart:'Начало', entryEnd:'Конец', entryCurrent:'Текущее место работы', entryDescription:'Описание', entrySchool:'Школа / Университет', entryDegree:'Степень', entryField:'Область', entryYear:'Год'
    },
    de: {
      personalInfo:'Ihre persönlichen Informationen', thisInfo:'Diese Informationen erscheinen oben in Ihrem Lebenslauf.',
      identity:'Identität', firstName:'Vorname', lastName:'Nachname', jobTitle:'Berufsbezeichnung',
      contact:'Kontakt', email:'E-Mail', phone:'Telefon', city:'Stadt', country:'Land',
      linkedin:'LinkedIn', website:'Website',
      profile:'Profil', professionalSummary:'Berufliches Profil',
      workExperience:'Berufserfahrung', addExperience:'+ Erfahrung hinzufügen',
      education:'Ausbildung', addEducation:'+ Ausbildung hinzufügen',
      skillsLanguages:'Kenntnisse & Sprachen', skills:'Kenntnisse (kommagetrennt)', languages:'Sprachen (kommagetrennt)',
      chooseTemplate:'Vorlage wählen',
      stepInfo:'Informationen', stepTemplate:'Vorlage', stepDownload:'Herunterladen',
      autosaved:'Gespeichert', next:'Weiter →', previous:'← Zurück',
      expLabel:'Erfahrung', eduLabel:'Ausbildung', entryCompany:'Unternehmen', entryPosition:'Stelle', entryStart:'Beginn', entryEnd:'Ende', entryCurrent:'Aktuelle Stelle', entryDescription:'Beschreibung', entrySchool:'Schule / Universität', entryDegree:'Abschluss', entryField:'Fachbereich', entryYear:'Jahr'
    },
    pt: {
      personalInfo:'As suas informações pessoais', thisInfo:'Esta informação aparecerá no topo do seu CV.',
      identity:'Identidade', firstName:'Nome próprio', lastName:'Apelido', jobTitle:'Cargo',
      contact:'Contacto', email:'Email', phone:'Telefone', city:'Cidade', country:'País',
      linkedin:'LinkedIn', website:'Website',
      profile:'Perfil', professionalSummary:'Perfil profissional',
      workExperience:'Experiência profissional', addExperience:'+ Adicionar experiência',
      education:'Formação académica', addEducation:'+ Adicionar formação',
      skillsLanguages:'Competências & Idiomas', skills:'Competências (separadas por vírgulas)', languages:'Idiomas (separados por vírgulas)',
      chooseTemplate:'Escolha o seu modelo',
      stepInfo:'Informações', stepTemplate:'Modelo', stepDownload:'Transferir',
      autosaved:'Guardado', next:'Seguinte →', previous:'← Anterior',
      expLabel:'Experiência', eduLabel:'Formação', entryCompany:'Empresa', entryPosition:'Cargo', entryStart:'Início', entryEnd:'Fim', entryCurrent:'Cargo atual', entryDescription:'Descrição', entrySchool:'Escola / Universidade', entryDegree:'Grau', entryField:'Área', entryYear:'Ano'
    }
  };

  /* ── 3. COVER LETTER UI dictionary (form labels inside #letter-builder) ──────── */
  var LETTER_UI_DICT = {
    en: {
      yourInfo:'Your information', fillForm:'Fill in the form and click "Generate my letter" to see your letter appear here.',
      applicant:'Applicant', firstName:'First name', lastName:'Last name', email:'Email', phone:'Phone', city:'City',
      targetPosition:'Target position', company:'Company', position:'Target position',
      tone:'Letter tone', tonePro:'Professional', toneDyn:'Dynamic', toneCrea:'Creative',
      experience:'Your experience (summary)', motivation:'Your motivation for this position',
      generate:'Generate my letter', yourLetter:'Your cover letter', generating:'Generating...',
      download:'Download PDF', copy:'Copy', regenerate:'Regenerate', newLetter:'New letter'
    },
    fr: {
      yourInfo:'Vos informations', fillForm:'Remplissez le formulaire et cliquez sur "Générer ma lettre" pour voir votre lettre apparaître ici.',
      applicant:'Candidat', firstName:'Prénom', lastName:'Nom', email:'Email', phone:'Téléphone', city:'Ville',
      targetPosition:'Poste ciblé', company:'Entreprise', position:'Poste ciblé',
      tone:'Ton de la lettre', tonePro:'Professionnel', toneDyn:'Dynamique', toneCrea:'Créatif',
      experience:'Votre expérience (résumé)', motivation:'Votre motivation pour ce poste',
      generate:'Générer ma lettre', yourLetter:'Votre lettre de motivation', generating:'Génération en cours...',
      download:'Télécharger PDF', copy:'Copier', regenerate:'Régénérer', newLetter:'Nouvelle lettre'
    },
    nl: {
      yourInfo:'Uw informatie', fillForm:'Vul het formulier in en klik op "Mijn brief genereren" om uw brief te zien.',
      applicant:'Sollicitant', firstName:'Voornaam', lastName:'Achternaam', email:'E-mail', phone:'Telefoon', city:'Stad',
      targetPosition:'Doelpositie', company:'Bedrijf', position:'Doelpositie',
      tone:'Toon van de brief', tonePro:'Professioneel', toneDyn:'Dynamisch', toneCrea:'Creatief',
      experience:'Uw ervaring (samenvatting)', motivation:'Uw motivatie voor deze functie',
      generate:'Mijn brief genereren', yourLetter:'Uw sollicitatiebrief', generating:'Genereren...',
      download:'PDF downloaden', copy:'Kopiëren', regenerate:'Opnieuw genereren', newLetter:'Nieuwe brief'
    },
    es: {
      yourInfo:'Su información', fillForm:'Rellene el formulario y haga clic en "Generar mi carta" para ver su carta.',
      applicant:'Solicitante', firstName:'Nombre', lastName:'Apellido', email:'Email', phone:'Teléfono', city:'Ciudad',
      targetPosition:'Puesto objetivo', company:'Empresa', position:'Puesto objetivo',
      tone:'Tono de la carta', tonePro:'Profesional', toneDyn:'Dinámico', toneCrea:'Creativo',
      experience:'Su experiencia (resumen)', motivation:'Su motivación para este puesto',
      generate:'Generar mi carta', yourLetter:'Su carta de presentación', generating:'Generando...',
      download:'Descargar PDF', copy:'Copiar', regenerate:'Regenerar', newLetter:'Nueva carta'
    },
    ar: {
      yourInfo:'معلوماتك', fillForm:'املأ النموذج وانقر على "توليد رسالتي" لرؤية رسالتك هنا.',
      applicant:'المتقدم', firstName:'الاسم الأول', lastName:'اسم العائلة', email:'البريد الإلكتروني', phone:'الهاتف', city:'المدينة',
      targetPosition:'الوظيفة المستهدفة', company:'الشركة', position:'الوظيفة المستهدفة',
      tone:'نبرة الرسالة', tonePro:'احترافي', toneDyn:'ديناميكي', toneCrea:'إبداعي',
      experience:'خبرتك (ملخص)', motivation:'دوافعك لهذا المنصب',
      generate:'توليد رسالتي', yourLetter:'رسالة التغطية الخاصة بك', generating:'جارٍ التوليد...',
      download:'تنزيل PDF', copy:'نسخ', regenerate:'إعادة التوليد', newLetter:'رسالة جديدة'
    },
    ru: {
      yourInfo:'Ваша информация', fillForm:'Заполните форму и нажмите "Создать моё письмо", чтобы увидеть письмо здесь.',
      applicant:'Соискатель', firstName:'Имя', lastName:'Фамилия', email:'Email', phone:'Телефон', city:'Город',
      targetPosition:'Желаемая должность', company:'Компания', position:'Желаемая должность',
      tone:'Тон письма', tonePro:'Профессиональный', toneDyn:'Динамичный', toneCrea:'Творческий',
      experience:'Ваш опыт (кратко)', motivation:'Ваша мотивация для этой должности',
      generate:'Создать моё письмо', yourLetter:'Ваше сопроводительное письмо', generating:'Генерация...',
      download:'Скачать PDF', copy:'Копировать', regenerate:'Перегенерировать', newLetter:'Новое письмо'
    },
    de: {
      yourInfo:'Ihre Informationen', fillForm:'Füllen Sie das Formular aus und klicken Sie auf "Mein Schreiben generieren".',
      applicant:'Bewerber', firstName:'Vorname', lastName:'Nachname', email:'E-Mail', phone:'Telefon', city:'Stadt',
      targetPosition:'Zielposition', company:'Unternehmen', position:'Zielposition',
      tone:'Ton des Schreibens', tonePro:'Professionell', toneDyn:'Dynamisch', toneCrea:'Kreativ',
      experience:'Ihre Erfahrung (Zusammenfassung)', motivation:'Ihre Motivation für diese Stelle',
      generate:'Mein Schreiben generieren', yourLetter:'Ihr Anschreiben', generating:'Generierung...',
      download:'PDF herunterladen', copy:'Kopieren', regenerate:'Neu generieren', newLetter:'Neues Schreiben'
    },
    pt: {
      yourInfo:'As suas informações', fillForm:'Preencha o formulário e clique em "Gerar a minha carta" para ver a sua carta aqui.',
      applicant:'Candidato', firstName:'Nome próprio', lastName:'Apelido', email:'Email', phone:'Telefone', city:'Cidade',
      targetPosition:'Cargo pretendido', company:'Empresa', position:'Cargo pretendido',
      tone:'Tom da carta', tonePro:'Profissional', toneDyn:'Dinâmico', toneCrea:'Criativo',
      experience:'A sua experiência (resumo)', motivation:'A sua motivação para este cargo',
      generate:'Gerar a minha carta', yourLetter:'A sua carta de apresentação', generating:'A gerar...',
      download:'Transferir PDF', copy:'Copiar', regenerate:'Regenerar', newLetter:'Nova carta'
    }
  };

  /* ── 4. Persisted state ─────────────────────────────────────────────────────── */
  var cvLang     = localStorage.getItem('fgcv_cv_lang')     || 'en';
  var letterLang = localStorage.getItem('fgcv_letter_lang') || 'en';
  if (!CV_LANG_DICT[cvLang])     cvLang     = 'en';
  if (!CV_LANG_DICT[letterLang]) letterLang = 'en';

  /* ── 5. Public API ──────────────────────────────────────────────────────────── */
  window.CV_LANG_DICT  = CV_LANG_DICT;
  window.CV_UI_DICT    = CV_UI_DICT;
  window.LETTER_UI_DICT = LETTER_UI_DICT;
  window.cvLang        = cvLang;
  window.letterLang    = letterLang;

  /**
   * updateCVLanguage(lang)
   * Translates ALL labels inside #cv-builder + updates CV section heading language.
   * Does NOT touch anything outside #cv-builder.
   */
  window.updateCVLanguage = function (lang) {
    if (!CV_LANG_DICT[lang]) return;
    window.cvLang = lang;
    localStorage.setItem('fgcv_cv_lang', lang);

    var isRTL = CV_LANG_DICT[lang].rtl;
    var dir   = isRTL ? 'rtl' : 'ltr';

    // RTL on CV builder container
    var builder = document.getElementById('cv-builder');
    if (builder) builder.dir = dir;

    // RTL on CV preview/render containers
    document.querySelectorAll('#cv-preview, .cv-preview-inner, #cv-render, .cv-render, .cv-container, #cv-preview-content')
      .forEach(function (el) { el.dir = dir; });

    // Apply UI translations to all [data-i18n] inside #cv-builder
    var ui = CV_UI_DICT[lang] || CV_UI_DICT.en;
    document.querySelectorAll('#cv-builder [data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (ui[key] !== undefined) el.textContent = ui[key];
    });

    // Sync the select element value
    var sel = document.getElementById('cvLanguage');
    if (sel && sel.value !== lang) sel.value = lang;

    // Update "Present" text in any already-checked current-position fields
    var presentWord = CV_LANG_DICT[lang].present || 'Present';
    document.querySelectorAll('#cv-builder .exp-current:checked').forEach(function(cb) {
      var ei = cb.closest('.exp-entry') && cb.closest('.exp-entry').querySelector('.exp-end');
      if (ei) ei.value = presentWord;
    });

    // Refresh live CV preview (section headings)
    if (typeof updatePreview === 'function') updatePreview();

    document.dispatchEvent(new CustomEvent('cvLangChange', { detail: { lang: lang } }));
  };

  /**
   * updateLetterLanguage(lang)
   * Translates ALL labels inside #letter-builder.
   * Does NOT touch anything outside #letter-builder.
   */
  window.updateLetterLanguage = function (lang) {
    if (!CV_LANG_DICT[lang]) return;
    window.letterLang = lang;
    localStorage.setItem('fgcv_letter_lang', lang);

    var isRTL = CV_LANG_DICT[lang].rtl;
    var dir   = isRTL ? 'rtl' : 'ltr';

    // RTL on letter builder container
    var builder = document.getElementById('letter-builder');
    if (builder) builder.dir = dir;

    // RTL on letter textarea / result container
    ['cl-result-text', 'cl-result-preview'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.dir = dir;
    });

    // Apply UI translations to all [data-i18n] inside #letter-builder
    var ui = LETTER_UI_DICT[lang] || LETTER_UI_DICT.en;
    document.querySelectorAll('#letter-builder [data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (ui[key] !== undefined) el.textContent = ui[key];
    });

    // Sync the select element
    var sel = document.getElementById('letterLanguage');
    if (sel && sel.value !== lang) sel.value = lang;

    document.dispatchEvent(new CustomEvent('letterLangChange', { detail: { lang: lang } }));
  };

  /* ── 6. Init on DOMContentLoaded ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    // Wire up selects
    var cvSel = document.getElementById('cvLanguage');
    if (cvSel) {
      cvSel.value = window.cvLang;
      cvSel.addEventListener('change', function () { window.updateCVLanguage(this.value); });
    }
    var ltSel = document.getElementById('letterLanguage');
    if (ltSel) {
      ltSel.value = window.letterLang;
      ltSel.addEventListener('change', function () { window.updateLetterLanguage(this.value); });
    }

    // Apply stored language on page load (so labels match on first render)
    if (window.cvLang !== 'en' && document.getElementById('cv-builder')) {
      window.updateCVLanguage(window.cvLang);
    }
    if (window.letterLang !== 'en' && document.getElementById('letter-builder')) {
      window.updateLetterLanguage(window.letterLang);
    }
  });

})();
