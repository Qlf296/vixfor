/**
 * ForgCV by Vixfor — i18n System
 * 7 languages: FR, EN, NL, ES, AR, RU, DE
 */

const LANGUAGES = {
  fr: { name: 'Français',   flag: '🇫🇷', dir: 'ltr', code: 'fr' },
  en: { name: 'English',    flag: '🇬🇧', dir: 'ltr', code: 'en' },
  de: { name: 'Deutsch',    flag: '🇩🇪', dir: 'ltr', code: 'de' },
  nl: { name: 'Nederlands', flag: '🇳🇱', dir: 'ltr', code: 'nl' },
  es: { name: 'Español',    flag: '🇪🇸', dir: 'ltr', code: 'es' },
  ar: { name: 'العربية',   flag: '🇸🇦', dir: 'rtl', code: 'ar' },
  ru: { name: 'Русский',   flag: '🇷🇺', dir: 'ltr', code: 'ru' },
};

const TRANSLATIONS = {
  /* ─── NAV ─── */
  nav_home:      { fr:'Accueil',    en:'Home', de:'Startseite',    nl:'Home',    es:'Inicio',   ar:'الرئيسية', ru:'Главная' },
  nav_cv:        { fr:'Créer un CV',en:'Build CV', de:'Lebenslauf', nl:'CV Maken',es:'Crear CV', ar:'إنشاء CV', ru:'Создать CV' },
  nav_cover:     { fr:'Lettre',     en:'Cover Letter', de:'Anschreiben',nl:'Motivatiebrief',es:'Carta',ar:'خطاب',ru:'Письмо' },
  nav_templates: { fr:'Templates',  en:'Templates', de:'Vorlagen',nl:'Sjablonen', es:'Plantillas',ar:'قوالب',ru:'Шаблоны' },
  nav_about:     { fr:'À propos',   en:'About', de:'Über uns',   nl:'Over ons', es:'Nosotros', ar:'حول',    ru:'О нас' },
  nav_contact:   { fr:'Contact',    en:'Contact', de:'Kontakt',  nl:'Contact',  es:'Contacto', ar:'تواصل',  ru:'Контакт' },
  nav_start:     { fr:'Commencer', en:'Get Started', de:'Starten',nl:'Beginnen',es:'Empezar',ar:'ابدأ',ru:'Начать' },

  /* ─── HERO ─── */
  hero_eyebrow:  { fr:'✦ Gratuit pour toujours', en:'✦ Free forever', de:'✦ Für immer kostenlos', nl:'✦ Altijd gratis', es:'✦ Siempre gratis', ar:'✦ مجاني للأبد', ru:'✦ Бесплатно навсегда' },
  hero_title_1:  { fr:'Décrochez le job', en:'Land your dream', de:'Holen Sie sich den', nl:'Vind je droombaan', es:'Consigue el trabajo', ar:'احصل على وظيفتك', ru:'Получите работу' },
  hero_title_2:  { fr:'de vos rêves.', en:'job faster.', de:'Job Ihrer Träume.', nl:'sneller.', es:'de tus sueños.', ar:'أحلامك بسرعة', ru:'вашей мечты.' },
  hero_subtitle: { fr:'Créez un CV professionnel en 5 minutes. 6 templates, prévisualisation en direct, export PDF gratuit.', en:'Create a professional CV in 5 minutes. 6 templates, live preview, free PDF export.', de:'Erstellen Sie in 5 Minuten einen professionellen Lebenslauf. 6 Vorlagen, Live-Vorschau, kostenloser PDF-Export.', nl:'Maak een professioneel CV in 5 minuten. 6 sjablonen, live preview, gratis PDF export.', es:'Crea un CV profesional en 5 minutos. 6 plantillas, vista previa en vivo, export PDF gratuito.', ar:'أنشئ سيرة ذاتية احترافية في 5 دقائق. 6 قوالب، معاينة مباشرة، تصدير PDF مجاني.', ru:'Создайте профессиональное резюме за 5 минут. 6 шаблонов, просмотр в реальном времени, бесплатный экспорт PDF.' },
  hero_cta:      { fr:'Créer mon CV gratuitement', en:'Build my CV for free', de:'Lebenslauf kostenlos erstellen', nl:'Maak mijn CV gratis', es:'Crear mi CV gratis', ar:'إنشاء سيرتي الذاتية', ru:'Создать резюме бесплатно' },
  cta_letter:    { fr:'Créer ma lettre gratuitement', en:'Build my cover letter free', de:'Anschreiben kostenlos erstellen', nl:'Maak mijn brief gratis', es:'Crear mi carta gratis', ar:'إنشاء خطاب التغطية', ru:'Создать письмо бесплатно' },
  hero_cta2:     { fr:'Voir les templates', en:'Browse templates', de:'Vorlagen ansehen', nl:'Bekijk sjablonen', es:'Ver plantillas', ar:'عرض القوالب', ru:'Смотреть шаблоны' },
  hero_proof:    { fr:'CV créés cette semaine', en:'CVs created this week', de:'Lebensläufe diese Woche', nl:'CV\'s gemaakt deze week', es:'CV creados esta semana', ar:'سيرة ذاتية تم إنشاؤها هذا الأسبوع', ru:'резюме создано на этой неделе' },

  /* ─── STATS ─── */
  stat_cvs:      { fr:'CV créés', en:'CVs Created', de:'Lebensläufe erstellt', nl:'CV\'s gemaakt', es:'CVs Creados', ar:'سيرة ذاتية', ru:'Резюме создано' },
  stat_hired:    { fr:'Ont trouvé un emploi', en:'Got hired', de:'Haben Arbeit gefunden', nl:'Aangenomen', es:'Contratados', ar:'تم توظيفهم', ru:'Трудоустроено' },
  stat_countries:{ fr:'Pays', en:'Countries', de:'Länder', nl:'Landen', es:'Países', ar:'دولة', ru:'Стран' },
  stat_rating:   { fr:'Note utilisateurs', en:'User rating', de:'Nutzerbewertung', nl:'Gebruikersbeoordeling', es:'Valoración', ar:'تقييم المستخدمين', ru:'Рейтинг' },

  /* ─── HOW IT WORKS ─── */
  how_title:     { fr:'Comment ça marche', en:'How it works', de:'So funktioniert es', nl:'Hoe het werkt', es:'Cómo funciona', ar:'كيف يعمل', ru:'Как это работает' },
  how_sub:       { fr:'Trois étapes simples pour créer votre CV parfait', en:'Three simple steps to create your perfect CV', de:'Drei einfache Schritte zu Ihrem perfekten Lebenslauf', nl:'Drie eenvoudige stappen om uw perfecte CV te maken', es:'Tres simples pasos para crear tu CV perfecto', ar:'ثلاث خطوات بسيطة لإنشاء سيرتك الذاتية المثالية', ru:'Три простых шага для создания идеального резюме' },
  how_1_title:   { fr:'Saisissez vos infos', en:'Enter your info', de:'Daten eingeben', nl:'Voer je gegevens in', es:'Ingresa tu información', ar:'أدخل معلوماتك', ru:'Введите данные' },
  how_1_desc:    { fr:'Remplissez votre profil, expériences et compétences en quelques minutes.', en:'Fill in your profile, experience and skills in just minutes.', de:'Füllen Sie Ihr Profil, Erfahrungen und Fähigkeiten in wenigen Minuten aus.', nl:'Vul je profiel, ervaring en vaardigheden in binnen enkele minuten.', es:'Completa tu perfil, experiencia y habilidades en minutos.', ar:'أملأ ملفك الشخصي وخبراتك ومهاراتك في دقائق.', ru:'Заполните профиль, опыт и навыки за несколько минут.' },
  how_2_title:   { fr:'Choisissez votre template', en:'Pick your template', de:'Vorlage wählen', nl:'Kies je sjabloon', es:'Elige tu plantilla', ar:'اختر القالب', ru:'Выберите шаблон' },
  how_2_desc:    { fr:'6 designs professionnels. Choisissez celui qui correspond à votre secteur.', en:'6 professional designs. Choose the one matching your industry.', de:'6 professionelle Designs. Wählen Sie das passende für Ihre Branche.', nl:'6 professionele ontwerpen. Kies er een die past bij uw sector.', es:'6 diseños profesionales. Elige el que corresponde a tu sector.', ar:'6 تصميمات احترافية. اختر الأنسب لمجال عملك.', ru:'6 профессиональных дизайнов. Выберите подходящий для вашей отрасли.' },
  how_3_title:   { fr:'Exportez en PDF', en:'Export as PDF', de:'Als PDF exportieren', nl:'Exporteer als PDF', es:'Exporta como PDF', ar:'تصدير كـ PDF', ru:'Экспортируйте в PDF' },
  how_3_desc:    { fr:'Téléchargez votre CV en PDF HD en un clic. Prêt pour vos candidatures.', en:'Download your CV as HD PDF in one click. Ready for applications.', de:'Laden Sie Ihren Lebenslauf als HD-PDF mit einem Klick herunter.', nl:'Download je CV als HD PDF met één klik. Klaar voor sollicitaties.', es:'Descarga tu CV en PDF HD con un clic. Listo para aplicaciones.', ar:'حمّل سيرتك الذاتية بصيغة PDF عالية الجودة بنقرة واحدة.', ru:'Скачайте резюме в формате HD PDF одним кликом.' },

  /* ─── FEATURES ─── */
  feat_title:    { fr:'Tout ce dont vous avez besoin', en:'Everything you need', de:'Alles was Sie brauchen', nl:'Alles wat u nodig heeft', es:'Todo lo que necesitas', ar:'كل ما تحتاجه', ru:'Всё что вам нужно' },
  feat_sub:      { fr:'Des outils professionnels, gratuitement.', en:'Professional tools, for free.', de:'Professionelle Tools, kostenlos.', nl:'Professionele tools, gratis.', es:'Herramientas profesionales, gratis.', ar:'أدوات احترافية، مجاناً.', ru:'Профессиональные инструменты, бесплатно.' },
  feat_1:        { fr:'6 Templates Premium', en:'6 Premium Templates', de:'6 Premium-Vorlagen', nl:'6 Premium Sjablonen', es:'6 Plantillas Premium', ar:'6 قوالب متميزة', ru:'6 Премиум шаблонов' },
  feat_1d:       { fr:'Classic, Modern, Minimal, Executive, Elegant, Bold — pour tous les secteurs.', en:'Classic, Modern, Minimal, Executive, Elegant, Bold — for every industry.', de:'Classic, Modern, Minimal, Executive, Elegant, Bold — für jede Branche.', nl:'Classic, Modern, Minimaal, Executive, Elegant, Bold — voor elke sector.', es:'Classic, Modern, Minimal, Executive, Elegant, Bold — para todos los sectores.', ar:'كلاسيك، حديث، بسيط، تنفيذي، أنيق، جريء — لجميع القطاعات.', ru:'Classic, Modern, Minimal, Executive, Elegant, Bold — для любой отрасли.' },
  feat_2:        { fr:'Preview Temps Réel', en:'Real-Time Preview', de:'Echtzeit-Vorschau', nl:'Real-time Preview', es:'Vista Previa en Tiempo Real', ar:'معاينة في الوقت الفعلي', ru:'Предварительный просмотр' },
  feat_2d:       { fr:'Voir votre CV se mettre à jour instantanément pendant que vous tapez.', en:'See your CV update instantly as you type.', de:'Sehen Sie Ihren Lebenslauf sofort aktualisieren während Sie tippen.', nl:'Zie je CV direct updaten terwijl je typt.', es:'Ve tu CV actualizarse instantáneamente mientras escribes.', ar:'شاهد سيرتك الذاتية تتحدث فورياً أثناء الكتابة.', ru:'Наблюдайте за мгновенным обновлением резюме при наборе текста.' },
  feat_3:        { fr:'Export PDF HD', en:'HD PDF Export', de:'HD PDF-Export', nl:'HD PDF Export', es:'Exportación PDF HD', ar:'تصدير PDF عالي الجودة', ru:'Экспорт PDF HD' },
  feat_3d:       { fr:'PDF haute résolution optimisé pour les ATS et les recruteurs.', en:'High-resolution PDF optimized for ATS and recruiters.', de:'Hochauflösendes PDF, optimiert für ATS und Personalvermittler.', nl:'PDF in hoge resolutie, geoptimaliseerd voor ATS en recruiters.', es:'PDF alta resolución optimizado para ATS y reclutadores.', ar:'ملف PDF عالي الدقة محسّن لأنظمة ATS والمسؤولين عن التوظيف.', ru:'PDF высокого разрешения, оптимизированный для ATS и рекрутеров.' },
  feat_4:        { fr:'7 Langues', en:'7 Languages', de:'7 Sprachen', nl:'7 Talen', es:'7 Idiomas', ar:'7 لغات', ru:'7 Языков' },
  feat_4d:       { fr:'Interface disponible en FR, EN, NL, ES, AR et RU. Support RTL pour l\'arabe.', en:'Interface available in FR, EN, NL, ES, AR and RU. RTL support for Arabic.', de:'Verfügbar auf FR, EN, DE, NL, ES, AR und RU. RTL-Unterstützung für Arabisch.', nl:'Interface beschikbaar in FR, EN, NL, ES, AR en RU. RTL ondersteuning voor Arabisch.', es:'Interfaz disponible en FR, EN, NL, ES, AR y RU. Soporte RTL para árabe.', ar:'الواجهة متاحة بالفرنسية والإنجليزية والهولندية والإسبانية والعربية والروسية. دعم RTL.', ru:'Интерфейс доступен на FR, EN, NL, ES, AR и RU. Поддержка RTL для арабского.' },
  feat_5:        { fr:'Lettre de Motivation', en:'Cover Letter', de:'Anschreiben', nl:'Motivatiebrief', es:'Carta de Motivación', ar:'خطاب التغطية', ru:'Сопроводительное письмо' },
  feat_5d:       { fr:'Générez une lettre personnalisée en 3 tons : Pro, Dynamique ou Créatif.', en:'Generate a personalized letter in 3 tones: Pro, Dynamic or Creative.', de:'Generieren Sie ein Anschreiben in 3 Stilen: Professionell, Dynamisch oder Kreativ.', nl:'Genereer een gepersonaliseerde brief in 3 tonen: Pro, Dynamisch of Creatief.', es:'Genera una carta personalizada en 3 tonos: Pro, Dinámico o Creativo.', ar:'أنشئ رسالة شخصية بـ 3 أسلوب: مهني أو ديناميكي أو إبداعي.', ru:'Создайте персонализированное письмо в 3 тонах: Профессиональный, Динамичный, Творческий.' },
  feat_6:        { fr:'100% Gratuit', en:'100% Free', de:'100% Kostenlos', nl:'100% Gratis', es:'100% Gratuito', ar:'مجاني 100%', ru:'100% Бесплатно' },
  feat_6d:       { fr:'Aucune inscription, aucun paiement, aucune limite. Toujours gratuit.', en:'No sign-up, no payment, no limits. Always free.', de:'Keine Registrierung, keine Zahlung, keine Limits. Immer kostenlos.', nl:'Geen aanmelding, geen betaling, geen limieten. Altijd gratis.', es:'Sin registro, sin pago, sin límites. Siempre gratis.', ar:'لا تسجيل، لا دفع، لا حدود. مجاني دائماً.', ru:'Без регистрации, без оплаты, без ограничений. Всегда бесплатно.' },

  /* ─── TEMPLATES SECTION ─── */
  tpl_section_title: { fr:'6 Templates Professionnels', en:'6 Professional Templates', de:'6 professionelle Vorlagen', nl:'6 Professionele Sjablonen', es:'6 Plantillas Profesionales', ar:'6 قوالب احترافية', ru:'6 Профессиональных шаблонов' },
  tpl_section_sub:   { fr:'Du minimaliste au premium — un style pour chaque candidature.', en:'From minimal to premium — a style for every application.', de:'Von minimalistisch bis premium — ein Stil für jede Bewerbung.', nl:'Van minimaal tot premium — een stijl voor elke sollicitatie.', es:'Desde minimalista hasta premium — un estilo para cada candidatura.', ar:'من البسيط إلى الاحترافي — أسلوب لكل طلب توظيف.', ru:'От минимализма до премиума — стиль для каждой заявки.' },
  tpl_see_all:       { fr:'Voir tous les templates →', en:'Browse all templates →', de:'Alle Vorlagen ansehen →', nl:'Alle sjablonen bekijken →', es:'Ver todas las plantillas →', ar:'عرض كل القوالب →', ru:'Смотреть все шаблоны →' },

  /* ─── CV GENERATOR ─── */
  cv_step1:      { fr:'Informations', en:'Information', de:'Informationen', nl:'Informatie', es:'Información', ar:'المعلومات', ru:'Информация' },
  cv_step2:      { fr:'Template',     en:'Template', de:'Vorlage',    nl:'Sjabloon',   es:'Plantilla',  ar:'القالب',    ru:'Шаблон' },
  cv_step3:      { fr:'Télécharger',  en:'Download', de:'Herunterladen',    nl:'Downloaden', es:'Descargar',  ar:'تحميل',     ru:'Скачать' },

  cv_s1_title:   { fr:'Vos informations personnelles', en:'Your personal information', de:'Ihre persönlichen Daten', nl:'Uw persoonlijke gegevens', es:'Tu información personal', ar:'معلوماتك الشخصية', ru:'Ваши личные данные' },
  cv_s1_sub:     { fr:'Ces informations apparaîtront en en-tête de votre CV.', en:'This information will appear at the top of your CV.', de:'Diese Informationen erscheinen im Kopf Ihres Lebenslaufs.', nl:'Deze informatie verschijnt bovenaan uw CV.', es:'Esta información aparecerá en el encabezado de tu CV.', ar:'ستظهر هذه المعلومات في رأس سيرتك الذاتية.', ru:'Эта информация появится в шапке вашего резюме.' },

  cv_firstname:  { fr:'Prénom',       en:'First name', de:'Vorname',  nl:'Voornaam',   es:'Nombre',     ar:'الاسم الأول', ru:'Имя' },
  cv_lastname:   { fr:'Nom',          en:'Last name', de:'Nachname',   nl:'Achternaam', es:'Apellido',   ar:'اسم العائلة', ru:'Фамилия' },
  cv_job_title:  { fr:'Titre du poste', en:'Job title', de:'Berufsbezeichnung', nl:'Functietitel', es:'Título del puesto', ar:'المسمى الوظيفي', ru:'Должность' },
  cv_email:      { fr:'Email',        en:'Email', de:'E-Mail',       nl:'E-mail',     es:'Correo',     ar:'البريد',    ru:'Email' },
  cv_phone:      { fr:'Téléphone',    en:'Phone', de:'Telefon',       nl:'Telefoon',   es:'Teléfono',   ar:'الهاتف',    ru:'Телефон' },
  cv_city:       { fr:'Ville',        en:'City', de:'Stadt',        nl:'Stad',       es:'Ciudad',     ar:'المدينة',   ru:'Город' },
  cv_country:    { fr:'Pays',         en:'Country', de:'Land',     nl:'Land',       es:'País',       ar:'الدولة',    ru:'Страна' },
  cv_linkedin:   { fr:'LinkedIn',     en:'LinkedIn', de:'LinkedIn',    nl:'LinkedIn',   es:'LinkedIn',   ar:'لينكد إن',  ru:'LinkedIn' },
  cv_website:    { fr:'Site web',     en:'Website', de:'Webseite',     nl:'Website',    es:'Sitio web',  ar:'الموقع',    ru:'Сайт' },
  cv_summary:    { fr:'Résumé professionnel', en:'Professional summary', de:'Professionelle Zusammenfassung', nl:'Professioneel overzicht', es:'Resumen profesional', ar:'الملخص المهني', ru:'Профессиональное резюме' },
  cv_summary_ph: { fr:'Décrivez votre profil en 3-4 lignes...', en:'Describe your profile in 3-4 lines...', de:'Beschreiben Sie Ihr Profil in 3-4 Zeilen...', nl:'Beschrijf uw profiel in 3-4 regels...', es:'Describe tu perfil en 3-4 líneas...', ar:'صف ملفك الشخصي في 3-4 أسطر...', ru:'Опишите ваш профиль в 3-4 строках...' },

  cv_experience: { fr:'Expérience professionnelle', en:'Work experience', de:'Berufserfahrung', nl:'Werkervaring', es:'Experiencia laboral', ar:'الخبرة المهنية', ru:'Опыт работы' },
  cv_add_exp:    { fr:'+ Ajouter une expérience', en:'+ Add experience', de:'+ Erfahrung hinzufügen', nl:'+ Ervaring toevoegen', es:'+ Agregar experiencia', ar:'+ إضافة خبرة', ru:'+ Добавить опыт' },
  cv_education:  { fr:'Formation', en:'Education', de:'Ausbildung', nl:'Opleiding', es:'Educación', ar:'التعليم', ru:'Образование' },
  cv_add_edu:    { fr:'+ Ajouter une formation', en:'+ Add education', de:'+ Ausbildung hinzufügen', nl:'+ Opleiding toevoegen', es:'+ Agregar formación', ar:'+ إضافة تعليم', ru:'+ Добавить образование' },
  cv_skills:     { fr:'Compétences (séparées par des virgules)', en:'Skills (comma separated)', de:'Fähigkeiten (kommagetrennt)', nl:'Vaardigheden (komma\'s)', es:'Habilidades (comas)', ar:'المهارات (بفواصل)', ru:'Навыки (через запятую)' },
  cv_languages_label: { fr:'Langues (séparées par des virgules)', en:'Languages (comma separated)', de:'Sprachen (kommagetrennt)', nl:'Talen (komma\'s)', es:'Idiomas (comas)', ar:'اللغات (بفواصل)', ru:'Языки (через запятую)' },

  cv_s2_title:   { fr:'Choisissez votre template', en:'Choose your template', de:'Vorlage auswählen', nl:'Kies uw sjabloon', es:'Elige tu plantilla', ar:'اختر قالبك', ru:'Выберите шаблон' },
  cv_s2_sub:     { fr:'Sélectionnez le design qui correspond le mieux à votre secteur.', en:'Select the design that best matches your industry.', de:'Wählen Sie das Design, das am besten zu Ihrer Branche passt.', nl:'Selecteer het ontwerp dat het beste past bij uw sector.', es:'Selecciona el diseño que mejor se adapte a tu sector.', ar:'اختر التصميم الأنسب لقطاعك المهني.', ru:'Выберите дизайн, наиболее подходящий вашей отрасли.' },

  cv_s3_title:   { fr:'Votre CV est prêt ! 🎉', en:'Your CV is ready! 🎉', de:'Ihr Lebenslauf ist fertig! 🎉', nl:'Uw CV is klaar! 🎉', es:'¡Tu CV está listo! 🎉', ar:'سيرتك الذاتية جاهزة! 🎉', ru:'Ваше резюме готово! 🎉' },
  cv_s3_sub:     { fr:'Téléchargez votre CV en PDF de haute qualité.', en:'Download your CV as a high-quality PDF.', de:'Laden Sie Ihren Lebenslauf als hochwertiges PDF herunter.', nl:'Download uw CV als een PDF van hoge kwaliteit.', es:'Descarga tu CV como un PDF de alta calidad.', ar:'حمّل سيرتك الذاتية كملف PDF عالي الجودة.', ru:'Скачайте резюме в формате PDF высокого качества.' },

  cv_download:   { fr:'Télécharger le PDF', en:'Download PDF', de:'PDF herunterladen', nl:'PDF Downloaden', es:'Descargar PDF', ar:'تحميل PDF', ru:'Скачать PDF' },
  cv_copy:       { fr:'Copier le texte', en:'Copy text', de:'Text kopieren', nl:'Tekst kopiëren', es:'Copiar texto', ar:'نسخ النص', ru:'Копировать текст' },
  cv_new:        { fr:'Nouveau CV', en:'New CV', de:'Neuer Lebenslauf', nl:'Nieuw CV', es:'Nuevo CV', ar:'سيرة جديدة', ru:'Новое резюме' },
  cv_preview:    { fr:'Aperçu en direct', en:'Live preview', de:'Live-Vorschau', nl:'Live voorbeeld', es:'Vista previa', ar:'معاينة مباشرة', ru:'Предварительный просмотр' },
  cv_autosave:   { fr:'Sauvegardé', en:'Saved', de:'Gespeichert', nl:'Opgeslagen', es:'Guardado', ar:'محفوظ', ru:'Сохранено' },

  cv_prev:       { fr:'← Précédent', en:'← Previous', de:'← Zurück', nl:'← Vorige', es:'← Anterior', ar:'← السابق', ru:'← Назад' },
  cv_next:       { fr:'Suivant →', en:'Next →', de:'Weiter →', nl:'Volgende →', es:'Siguiente →', ar:'التالي →', ru:'Далее →' },

  /* ─── COVER LETTER ─── */
  cl_title:      { fr:'Générateur de Lettre de Motivation', en:'Cover Letter Generator', de:'Anschreiben-Generator', nl:'Motivatiebrief Generator', es:'Generador de Carta de Motivación', ar:'مولّد خطاب التغطية', ru:'Генератор сопроводительного письма' },
  cl_sub:        { fr:'Créez une lettre personnalisée et convaincante en quelques clics.', en:'Create a personalized, convincing letter in a few clicks.', de:'Erstellen Sie in wenigen Klicks ein überzeugendes Anschreiben.', nl:'Maak een gepersonaliseerde, overtuigende brief in een paar klikken.', es:'Crea una carta personalizada y convincente en pocos clics.', ar:'أنشئ خطاباً شخصياً ومقنعاً في بضع نقرات.', ru:'Создайте персонализированное убедительное письмо за несколько кликов.' },
  cl_your_info:  { fr:'Vos informations', en:'Your information', de:'Ihre Informationen', nl:'Uw informatie', es:'Tu información', ar:'معلوماتك', ru:'Ваши данные' },
  cl_company:    { fr:'Entreprise', en:'Company', de:'Unternehmen', nl:'Bedrijf', es:'Empresa', ar:'الشركة', ru:'Компания' },
  cl_position:   { fr:'Poste visé', en:'Target position', de:'Angestrebte Stelle', nl:'Gewenste functie', es:'Puesto objetivo', ar:'الوظيفة المستهدفة', ru:'Целевая должность' },
  cl_tone:       { fr:'Ton de la lettre', en:'Letter tone', de:'Stil des Anschreibens', nl:'Toon van de brief', es:'Tono de la carta', ar:'أسلوب الخطاب', ru:'Тон письма' },
  cl_tone_pro:   { fr:'Professionnel', en:'Professional', de:'Professionell', nl:'Professioneel', es:'Profesional', ar:'مهني', ru:'Профессиональный' },
  cl_tone_dyn:   { fr:'Dynamique', en:'Dynamic', de:'Dynamisch', nl:'Dynamisch', es:'Dinámico', ar:'ديناميكي', ru:'Динамичный' },
  cl_tone_crea:  { fr:'Créatif', en:'Creative', de:'Kreativ', nl:'Creatief', es:'Creativo', ar:'إبداعي', ru:'Творческий' },
  cl_experience: { fr:'Votre expérience (résumé)', en:'Your experience (summary)', de:'Ihre Erfahrung (Zusammenfassung)', nl:'Uw ervaring (samenvatting)', es:'Tu experiencia (resumen)', ar:'خبرتك (ملخص)', ru:'Ваш опыт (резюме)' },
  cl_motivation: { fr:'Votre motivation pour ce poste', en:'Your motivation for this role', de:'Ihre Motivation für diese Stelle', nl:'Uw motivatie voor deze functie', es:'Tu motivación para este puesto', ar:'دوافعك لهذا المنصب', ru:'Ваша мотивация для этой роли' },
  cl_generate:   { fr:'Générer ma lettre', en:'Generate my letter', de:'Anschreiben erstellen', nl:'Genereer mijn brief', es:'Generar mi carta', ar:'إنشاء خطابي', ru:'Создать письмо' },
  cl_generating: { fr:'Génération en cours...', en:'Generating...', de:'Wird erstellt...', nl:'Genereren...', es:'Generando...', ar:'جارٍ الإنشاء...', ru:'Создание...' },
  cl_copy:       { fr:'Copier', en:'Copy', de:'Kopieren', nl:'Kopiëren', es:'Copiar', ar:'نسخ', ru:'Копировать' },
  cl_download:   { fr:'Télécharger PDF', en:'Download PDF', de:'PDF herunterladen', nl:'PDF Downloaden', es:'Descargar PDF', ar:'تحميل PDF', ru:'Скачать PDF' },
  cl_regenerate: { fr:'Régénérer', en:'Regenerate', de:'Neu generieren', nl:'Opnieuw genereren', es:'Regenerar', ar:'إعادة الإنشاء', ru:'Перегенерировать' },
  cl_new:        { fr:'Nouvelle lettre', en:'New letter', de:'Neues Anschreiben', nl:'Nieuwe brief', es:'Nueva carta', ar:'خطاب جديد', ru:'Новое письмо' },
  cl_your_letter:{ fr:'Votre lettre de motivation', en:'Your cover letter', de:'Ihr Anschreiben', nl:'Uw motivatiebrief', es:'Tu carta de motivación', ar:'خطاب التغطية الخاص بك', ru:'Ваше сопроводительное письмо' },

  /* ─── TESTIMONIALS ─── */
  test_title:    { fr:'Ils ont trouvé un emploi', en:'They got hired', de:'Sie haben eine Stelle gefunden', nl:'Zij zijn aangenomen', es:'Ellos fueron contratados', ar:'وجدوا وظائفهم', ru:'Они получили работу' },
  test_sub:      { fr:'Des milliers de personnes ont utilisé ForgCV pour décrocher leur job idéal.', en:'Thousands of people used ForgCV to land their ideal job.', de:'Tausende Menschen nutzten ForgCV, um ihren Traumjob zu finden.', nl:'Duizenden mensen gebruikten ForgCV om hun ideale baan te vinden.', es:'Miles de personas usaron ForgCV para conseguir su trabajo ideal.', ar:'استخدم آلاف الأشخاص ForgCV للحصول على وظيفتهم المثالية.', ru:'Тысячи людей использовали ForgCV для получения идеальной работы.' },

  /* ─── FOOTER ─── */
  footer_tagline:  { fr:'Créez votre CV professionnel en 5 minutes. Gratuit pour toujours.', en:'Create your professional CV in 5 minutes. Free forever.', de:'Erstellen Sie Ihren professionellen Lebenslauf in 5 Minuten. Für immer kostenlos.', nl:'Maak uw professionele CV in 5 minuten. Altijd gratis.', es:'Crea tu CV profesional en 5 minutos. Gratis siempre.', ar:'أنشئ سيرتك الذاتية في 5 دقائق. مجاني للأبد.', ru:'Создайте профессиональное резюме за 5 минут. Бесплатно навсегда.' },
  footer_product:  { fr:'Produit', en:'Product', de:'Produkt', nl:'Product', es:'Producto', ar:'المنتج', ru:'Продукт' },
  footer_company:  { fr:'Entreprise', en:'Company', de:'Unternehmen', nl:'Bedrijf', es:'Empresa', ar:'الشركة', ru:'Компания' },
  footer_support:  { fr:'Support', en:'Support', de:'Support', nl:'Ondersteuning', es:'Soporte', ar:'الدعم', ru:'Поддержка' },
  footer_rights:   { fr:'Tous droits réservés.', en:'All rights reserved.', de:'Alle Rechte vorbehalten.', nl:'Alle rechten voorbehouden.', es:'Todos los derechos reservados.', ar:'جميع الحقوق محفوظة.', ru:'Все права защищены.' },
  footer_made:     { fr:'Fait avec ❤️ pour le monde', en:'Made with ❤️ for the world', de:'Mit ❤️ für die Welt gemacht', nl:'Gemaakt met ❤️ voor de wereld', es:'Hecho con ❤️ para el mundo', ar:'صُنع بـ❤️ للعالم', ru:'Сделано с ❤️ для мира' },
  footer_free:     { fr:'100% gratuit · Aucune inscription requise', en:'100% free · No sign-up required', de:'100% kostenlos · Keine Registrierung erforderlich', nl:'100% gratis · Geen registratie vereist', es:'100% gratis · Sin registro requerido', ar:'100% مجاني · لا يلزم التسجيل', ru:'100% бесплатно · Регистрация не нужна' },

  /* ─── CONTACT ─── */
  contact_title:   { fr:'Contactez-nous', en:'Contact us', de:'Kontaktieren Sie uns', nl:'Contacteer ons', es:'Contáctanos', ar:'تواصل معنا', ru:'Свяжитесь с нами' },
  contact_name:    { fr:'Votre nom', en:'Your name', de:'Ihr Name', nl:'Uw naam', es:'Tu nombre', ar:'اسمك', ru:'Ваше имя' },
  contact_email:   { fr:'Votre email', en:'Your email', de:'Ihre E-Mail', nl:'Uw e-mail', es:'Tu correo', ar:'بريدك الإلكتروني', ru:'Ваш email' },
  contact_message: { fr:'Votre message', en:'Your message', de:'Ihre Nachricht', nl:'Uw bericht', es:'Tu mensaje', ar:'رسالتك', ru:'Ваше сообщение' },
  contact_send:    { fr:'Envoyer', en:'Send', de:'Senden', nl:'Versturen', es:'Enviar', ar:'إرسال', ru:'Отправить' },
  contact_sent:    { fr:'Message envoyé !', en:'Message sent!', de:'Nachricht gesendet!', nl:'Bericht verzonden!', es:'¡Mensaje enviado!', ar:'تم إرسال الرسالة!', ru:'Сообщение отправлено!' },
};

/* ════════ ENGINE ════════ */
let currentLang = 'fr';

function t(key) {
  return TRANSLATIONS[key]?.[currentLang]
      || TRANSLATIONS[key]?.['en']
      || key;
}

function detectLanguage() {
  const saved = localStorage.getItem('cvcraft_lang');
  if (saved && LANGUAGES[saved]) return saved;
  const browser = navigator.language?.slice(0,2).toLowerCase();
  if (browser && LANGUAGES[browser]) return browser;
  return 'fr';
}

function setLanguage(lang) {
  if (!LANGUAGES[lang]) return;
  currentLang = lang;
  localStorage.setItem('cvcraft_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir  = LANGUAGES[lang].dir;
  applyTranslations();
  renderLanguageSelector();
  document.dispatchEvent(new CustomEvent('langChange', { detail: { lang } }));
}

function applyTranslations() {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val) el.textContent = val;
  });
  // Placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const val = t(key);
    if (val) el.placeholder = val;
  });
  // Attribute
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    try {
      const map = JSON.parse(el.dataset.i18nAttr);
      Object.entries(map).forEach(([attr, key]) => {
        const val = t(key);
        if (val) el.setAttribute(attr, val);
      });
    } catch(e) {}
  });
  // HTML
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const val = t(key);
    if (val) el.innerHTML = val;
  });
  // Title
  const titleKey = document.querySelector('[data-i18n-title]')?.dataset.i18nTitle;
  if (titleKey) {
    const val = t(titleKey);
    if (val) document.title = val + ' | ForgCV by Vixfor';
  }
}

/* ─── Language Selector UI ─── */
function initLanguageSelector() {
  const selector = document.querySelector('.lang-selector');
  const btn      = selector?.querySelector('.lang-btn');
  const dropdown = selector?.querySelector('.lang-dropdown');
  if (!selector || !btn || !dropdown) return;

  // Build options
  dropdown.innerHTML = Object.entries(LANGUAGES).map(([code, lang]) => `
    <div class="lang-option ${code === currentLang ? 'active' : ''}" data-lang="${code}">
      <span class="flag">${lang.flag}</span>
      <span>${lang.name}</span>
    </div>
  `).join('');

  // Toggle
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    selector.classList.toggle('open');
  });

  // Option click
  dropdown.addEventListener('click', (e) => {
    const opt = e.target.closest('.lang-option');
    if (!opt) return;
    setLanguage(opt.dataset.lang);
    selector.classList.remove('open');
  });

  // Close on outside click
  document.addEventListener('click', () => selector.classList.remove('open'));
}

function renderLanguageSelector() {
  const lang = LANGUAGES[currentLang];
  const btn  = document.querySelector('.lang-btn');
  if (!btn || !lang) return;
  btn.innerHTML = `
    <span class="flag">${lang.flag}</span>
    <span class="lang-name">${lang.code.toUpperCase()}</span>
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  // Update active state
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === currentLang);
  });
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  currentLang = detectLanguage();
  document.documentElement.lang = currentLang;
  document.documentElement.dir  = LANGUAGES[currentLang].dir;
  initLanguageSelector();
  applyTranslations();
});
