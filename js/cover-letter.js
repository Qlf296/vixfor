/**
 * ForgCV by Vixfor — Cover Letter Generator
 */

const CL_TEMPLATES = {

  /* ── French ── */
  fr: {
    professional: (d) => `${d.city ? d.city + ', le ' + new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Madame, Monsieur,

C'est avec un vif intérêt que je vous adresse ma candidature au poste de ${d.position} au sein de ${d.company}.

Fort(e) de ${d.experience || 'mon expérience professionnelle'}, j'ai développé des compétences solides et une expertise qui correspondent précisément au profil que vous recherchez.${d.experience ? ' Tout au long de mon parcours, j\'ai démontré ma capacité à relever des défis complexes tout en maintenant un haut niveau de qualité et de rigueur.' : ''}

${d.motivation ? 'Ce qui me motive particulièrement dans cette opportunité : ' + d.motivation + '. Je suis convaincu(e) que cette vision s\'aligne parfaitement avec les ambitions de ' + d.company + ' et que je saurai y apporter une contribution significative.' : 'Rejoindre ' + d.company + ' représente pour moi une opportunité exceptionnelle d\'apporter mes compétences et de contribuer activement au développement d\'une structure que j\'admire.'}

Je serais ravi(e) de vous rencontrer afin de vous présenter en détail mon parcours et ma motivation.

Dans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', le ' + new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Madame, Monsieur,

${d.position} chez ${d.company} — cette opportunité a immédiatement retenu mon attention.

Après ${d.experience || 'plusieurs années d\'expérience dans mon secteur'}, j'ai acquis une expertise concrète et développé une énergie pour les projets ambitieux. Je ne me contente pas d'accomplir les tâches — je cherche à transformer les processus et à créer une vraie valeur ajoutée.

${d.motivation ? 'Ce qui m\'attire particulièrement chez ' + d.company + ' : ' + d.motivation + '.' : d.company + ' est une entreprise dans laquelle je veux investir mon énergie et mon expertise.'}

Je suis disponible rapidement pour un échange.

Cordialement,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${d.city ? d.city + ', le ' + new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Madame, Monsieur,

Imaginez un(e) ${d.position || 'professionnel(le)'} qui combine expertise, créativité et sens des résultats. C'est précisément ce que j'apporte à ${d.company}.

Mon parcours — ${d.experience || 'riche d\'expériences variées'} — m'a permis de développer une approche singulière : je pense différemment et propose des solutions là où d'autres voient des obstacles.

${d.motivation ? 'Ma motivation pour rejoindre votre équipe : ' + d.motivation + '.' : 'Ce qui me séduit chez ' + d.company + ', c\'est votre culture de l\'innovation.'}

Avec enthousiasme,
${d.firstname} ${d.lastname}`
  },

  /* ── English ── */
  en: {
    professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Dear Hiring Manager,

I am writing to express my strong interest in the ${d.position} position at ${d.company}.

With ${d.experience || 'extensive professional experience'}, I have developed a robust skill set and deep expertise that aligns precisely with the requirements of this role. Throughout my career, I have consistently demonstrated the ability to deliver measurable results while maintaining the highest standards of quality.

${d.motivation ? 'What particularly excites me about this opportunity is: ' + d.motivation + '. I am confident that this vision aligns perfectly with ' + d.company + '\'s strategic goals.' : 'Joining ' + d.company + ' represents an exceptional opportunity to apply my skills and contribute to an organisation I genuinely admire.'}

I would welcome the chance to discuss how my background would be an asset to your team.

Yours sincerely,
${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Dear Hiring Team,

${d.position} at ${d.company} — this is exactly the opportunity I have been working toward.

After ${d.experience || 'years of building hands-on expertise'}, I bring more than skills — I bring drive, ambition, and an unwavering commitment to excellence. I don't just complete tasks; I challenge processes, optimise outcomes, and create genuine value.

${d.motivation ? 'What draws me to ' + d.company + ': ' + d.motivation + '. This is precisely the environment where I thrive.' : d.company + '\'s innovative approach and bold vision are exactly what excites me.'}

Give me an hour of your time. I'll demonstrate exactly why I'm your next great hire.

Best regards,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Dear Team at ${d.company},

What if your next ${d.position || 'hire'} was someone who doesn't just think outside the box — but creatively reshapes it entirely?

My journey — ${d.experience || 'a blend of creative thinking and practical execution'} — has shown me that the most impactful solutions arise from combining structured thinking with genuine creative courage.

${d.motivation ? 'Here\'s what drives me toward ' + d.company + ': ' + d.motivation + '.' : d.company + '\'s culture of innovation resonates deeply with the way I approach every challenge.'}

Enthusiastically,
${d.firstname} ${d.lastname}`
  },

  /* ── German ── */
  de: {
    professional: (d) => `${d.city ? d.city + ', den ' + new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Sehr geehrte Damen und Herren,

mit großem Interesse bewerbe ich mich um die Stelle als ${d.position} bei ${d.company}.

Durch ${d.experience || 'meine langjährige Berufserfahrung'} habe ich fundierte Kenntnisse entwickelt, die genau dem gesuchten Profil entsprechen.

${d.motivation ? 'Was mich an dieser Stelle besonders reizt: ' + d.motivation + '.' : 'Bei ' + d.company + ' zu arbeiten wäre für mich eine außergewöhnliche Möglichkeit, meine Fähigkeiten einzusetzen.'}

Über die Gelegenheit, mich persönlich vorzustellen, würde ich mich sehr freuen.

Mit freundlichen Grüßen,
${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', den ' + new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Sehr geehrte Damen und Herren,

${d.position} bei ${d.company} — diese Stelle hat sofort meine Aufmerksamkeit geweckt.

Nach ${d.experience || 'Jahren praktischer Erfahrung'} bringe ich mehr als Fähigkeiten — ich bringe Antrieb und Engagement. Ich erledige nicht nur Aufgaben; ich hinterfrage Prozesse und schaffe echten Mehrwert.

${d.motivation ? 'Was mich zu ' + d.company + ' zieht: ' + d.motivation + '.' : d.company + ' ist ein Unternehmen, dem ich meine Energie und Expertise widmen möchte.'}

Geben Sie mir eine Stunde — ich zeige Ihnen, warum ich die richtige Wahl bin.

Mit besten Grüßen,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${d.city ? d.city + ', den ' + new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Liebes Team von ${d.company},

Was wäre, wenn Ihr(e) nächste(r) ${d.position || 'Mitarbeiter/in'} jemand wäre, der das gesamte Bild neu gestaltet?

Mein Weg — ${d.experience || 'geprägt von kreativem Denken und praktischer Umsetzung'} — hat mir gezeigt, dass die wirkungsvollsten Lösungen entstehen, wenn man strukturiertes Denken mit echtem Mut verbindet.

${d.motivation ? 'Hier ist, was mich zu ' + d.company + ' treibt: ' + d.motivation + '.' : 'Die Innovationskultur von ' + d.company + ' spricht mich tief an.'}

Mit Begeisterung,
${d.firstname} ${d.lastname}`
  },

  /* ── Portuguese ── */
  pt: {
    professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Exmo(a) Senhor(a),

Venho manifestar o meu interesse pela posição de ${d.position || 'colaborador(a)'} na ${d.company}. ${d.experience ? 'Com ' + d.experience + ', desenvolvi competências sólidas que correspondem precisamente ao perfil que procuram.' : 'Estou convicto(a) de que as minhas competências representam um contributo valioso para a vossa equipa.'}

${d.motivation ? 'O que mais me atrai nesta oportunidade: ' + d.motivation + '.' : 'A ' + d.company + ' representa uma oportunidade excepcional de aplicar as minhas capacidades.'}

Coloco-me ao dispor para uma entrevista.

Com os melhores cumprimentos,
${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Caro(a) Recrutador(a),

${d.experience ? 'Após ' + d.experience + ', acumulei experiência concreta e energia para projetos ambiciosos.' : 'Sou dinâmico(a), orientado(a) para resultados.'} Não me limito a cumprir tarefas — procuro transformar processos e criar valor real.

${d.motivation ? 'O que me motiva: ' + d.motivation + '.' : 'A ' + d.company + ' representa o ambiente ideal para crescer.'}

Com entusiasmo,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

Imagine um(a) ${d.position || 'profissional'} que combina expertise, criatividade e resultados. É o que trago para a ${d.company}.

${d.experience ? 'O meu percurso — ' + d.experience + ' — deu-me uma abordagem singular.' : 'Penso diferente e adapto-me com agilidade.'}

${d.motivation ? 'A razão pela qual escolho a ' + d.company + ': ' + d.motivation + '.' : 'A cultura de inovação da ' + d.company + ' é o ambiente perfeito.'}

Com criatividade,
${d.firstname} ${d.lastname}`
  },

  /* ── Dutch ── */
  nl: {
    professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Geachte heer/mevrouw,

Hierbij solliciteer ik met veel interesse naar de functie van ${d.position || 'medewerker'} bij ${d.company}. ${d.experience ? 'Met ' + d.experience + ' heb ik robuuste vaardigheden ontwikkeld die aansluiten bij uw vereisten.' : 'Ik ben ervan overtuigd dat mijn competenties een waardevolle aanvulling zijn voor uw team.'}

${d.motivation ? 'Wat mij aanspreekt in deze functie: ' + d.motivation + '.' : d.company + ' spreekt mij aan vanwege de professionele cultuur en groeimogelijkheden.'}

Ik zie graag de mogelijkheid om mijn sollicitatie persoonlijk toe te lichten.

Met vriendelijke groet,
${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Beste recruiter,

${d.experience ? 'Na ' + d.experience + ' heb ik concrete expertise en energie voor ambitieuze projecten.' : 'Ik ben gedreven en resultaatgericht.'} Ik zoek naar manieren om processen te verbeteren en echte waarde te creëren.

${d.motivation ? 'Wat mij motiveert: ' + d.motivation + '.' : d.company + ' is de ideale omgeving om te groeien.'}

Met enthousiaste groet,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

Stel je een ${d.position || 'professional'} voor die expertise, creativiteit en resultaatgerichtheid combineert. Dat breng ik bij ${d.company}.

${d.experience ? 'Mijn traject — ' + d.experience + ' — heeft mij een unieke aanpak gegeven.' : 'Ik denk anders en bied originele oplossingen.'}

${d.motivation ? 'De reden voor ' + d.company + ': ' + d.motivation + '.' : 'De innovatiecultuur van ' + d.company + ' is de perfecte omgeving.'}

Met creatieve groet,
${d.firstname} ${d.lastname}`
  },

  /* ── Spanish ── */
  es: {
    professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Estimado/a señor/a:

Me dirijo a ustedes para expresar mi interés por el puesto de ${d.position || 'colaborador/a'} en ${d.company}. ${d.experience ? 'Con ' + d.experience + ', he desarrollado competencias sólidas que corresponden con el perfil que buscan.' : 'Estoy convencido/a de que mis habilidades representan un valor añadido para su equipo.'}

${d.motivation ? 'Lo que me atrae de esta oportunidad: ' + d.motivation + '.' : d.company + ' representa una oportunidad excepcional de aplicar mis capacidades.'}

Quedo a su disposición para una entrevista.

Atentamente,
${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Estimado/a responsable de selección:

${d.experience ? 'Tras ' + d.experience + ', he acumulado experiencia concreta y energía para proyectos ambiciosos.' : 'Soy dinámico/a y orientado/a a resultados.'} Busco transformar procesos y crear valor real.

${d.motivation ? 'Lo que me motiva: ' + d.motivation + '.' : d.company + ' representa el entorno ideal para crecer.'}

Estoy disponible para una reunión.

Un saludo cordial,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

Imagina un/a ${d.position || 'profesional'} que combina experiencia, creatividad y resultados. Eso es lo que traigo a ${d.company}.

${d.experience ? 'Mi trayectoria — ' + d.experience + ' — me ha dado un enfoque singular.' : 'Pienso diferente y propongo soluciones originales.'}

${d.motivation ? 'La razón por la que elijo ' + d.company + ': ' + d.motivation + '.' : 'La cultura de innovación de ' + d.company + ' es el entorno perfecto.'}

Con entusiasmo,
${d.firstname} ${d.lastname}`
  },

  /* ── Arabic ── */
  ar: {
    professional: (d) => `${d.city ? d.city + '، ' + new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


السادة الكرام،

أتقدم إليكم بطلب الانضمام إلى فريق ${d.company} في منصب ${d.position || 'موظف/ة'}. ${d.experience ? 'بفضل ' + d.experience + '، طورت مهارات متينة تتوافق تماماً مع متطلباتكم.' : 'أنا مقتنع/ة بأن كفاءاتي ستشكل إضافة قيّمة لفريقكم.'}

${d.motivation ? 'ما يجذبني في هذه الفرصة: ' + d.motivation + '.' : 'تمثل ' + d.company + ' فرصة استثنائية لتطبيق قدراتي والمساهمة في نموكم.'}

أضع نفسي رهن إشارتكم لإجراء مقابلة.

مع خالص الاحترام والتقدير،
${d.firstname} ${d.lastname}
${d.email ? 'البريد الإلكتروني: ' + d.email : ''}${d.phone ? ' | الهاتف: ' + d.phone : ''}`,

    dynamic: (d) => `${d.city ? d.city + '، ' + new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


إلى المسؤول/ة عن التوظيف،

${d.experience ? 'بعد ' + d.experience + '، راكمت خبرة عملية وطاقة متجددة للمشاريع الطموحة.' : 'أنا شخص ديناميكي موجّه نحو النتائج.'} لا أكتفي بأداء المهام — أسعى إلى تحويل العمليات وخلق قيمة حقيقية.

${d.motivation ? 'ما يحفزني في هذه الفرصة: ' + d.motivation + '.' : d.company + ' هي البيئة المثالية للنمو وتحقيق نتائج استثنائية.'}

أنا متاح/ة للقاء في أقرب وقت.

مع تحياتي،
${d.firstname} ${d.lastname}`,

    creative: (d) => `${new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

تخيّل/ي ${d.position || 'محترفاً'} يجمع الخبرة والإبداع والحس بالنتائج. هذا ما أقدمه لـ${d.company}.

${d.experience ? 'مسيرتي — ' + d.experience + ' — منحتني رؤية فريدة.' : 'أفكر بشكل مختلف وأقترح حلولاً مبتكرة.'}

${d.motivation ? 'السبب الذي يجعلني أختار ' + d.company + ': ' + d.motivation + '.' : 'ثقافة الابتكار في ' + d.company + ' هي البيئة المثالية لي.'}

مع إبداعي وتقديري،
${d.firstname} ${d.lastname}`
  },

  /* ── Russian ── */
  ru: {
    professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Уважаемые коллеги,

Настоящим выражаю искреннюю заинтересованность в должности ${d.position || 'специалиста'} в компании ${d.company}. ${d.experience ? 'Имея ' + d.experience + ', я развил(а) компетенции, соответствующие вашим требованиям.' : 'Убеждён(а), что мои навыки станут ценным вкладом в вашу команду.'}

${d.motivation ? 'Что привлекает меня в этой возможности: ' + d.motivation + '.' : d.company + ' представляет исключительную возможность применить свои способности.'}

Готов(а) к собеседованию в удобное для вас время.

С уважением,
${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Уважаемый(ая) рекрутер,

${d.experience ? 'За ' + d.experience + ' я накопил(а) реальный опыт и энергию для амбициозных проектов.' : 'Я динамичный специалист, ориентированный на результат.'} Я стремлюсь трансформировать процессы и создавать реальную ценность.

${d.motivation ? 'Что мотивирует меня: ' + d.motivation + '.' : d.company + ' — идеальная среда для роста.'}

Готов(а) встретиться в удобное время.

С уважением,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

Представьте ${d.position || 'специалиста'}, сочетающего экспертизу, творческий подход и нацеленность на результат. Именно это я предлагаю ${d.company}.

${d.experience ? 'Мой путь — ' + d.experience + ' — позволил мне выработать уникальный подход.' : 'Я мыслю нестандартно и предлагаю оригинальные решения.'}

${d.motivation ? 'Причина, по которой я выбираю ' + d.company + ': ' + d.motivation + '.' : 'Культура инноваций ' + d.company + ' — идеальная среда для меня.'}

С творческим приветом,
${d.firstname} ${d.lastname}`
  }

};

/* ── Generate ── */
function generateLetter() {
  var get = function(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
  var tone = (document.querySelector('input[name="cl-tone"]:checked') || {}).value || 'professional';

  var d = {
    firstname:  get('cl-firstname'),
    lastname:   get('cl-lastname'),
    email:      get('cl-email'),
    phone:      get('cl-phone'),
    city:       get('cl-city'),
    company:    get('cl-company'),
    position:   get('cl-position'),
    experience: get('cl-experience'),
    motivation: get('cl-motivation'),
  };

  if (!d.company || !d.position) {
    if (typeof showToast === 'function') showToast('Please fill in the company and position fields.', 'error');
    return;
  }

  var btn = document.getElementById('btn-generate');
  if (btn) {
    btn.innerHTML = '<span class="spinner"></span> Generating...';
    btn.disabled = true;
  }

  var ph = document.getElementById('cl-placeholder');
  var rt = document.getElementById('cl-result-text');
  var ra = document.getElementById('cl-result-actions');
  var rg = document.getElementById('cl-generating');
  if (ph) ph.classList.add('hidden');
  if (rt) rt.classList.add('hidden');
  if (ra) ra.classList.add('hidden');
  if (rg) rg.classList.remove('hidden');

  setTimeout(function() {
    var langSel = document.getElementById('letterLanguage');
    var lang = langSel ? langSel.value : (window.letterLang || 'en');
    var templates = CL_TEMPLATES[lang] || CL_TEMPLATES['en'];
    var toneFunc  = templates[tone] || templates['professional'];
    var letter    = toneFunc(d);

    if (rt) { rt.value = letter; rt.classList.remove('hidden'); }
    if (ra) ra.classList.remove('hidden');
    if (rg) rg.classList.add('hidden');

    var ui = window.LETTER_UI_DICT && window.LETTER_UI_DICT[lang];
    var genLabel = ui ? ui.generate : 'Generate my letter';
    if (btn) {
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> <span data-i18n="generate">' + genLabel + '</span>';
      btn.disabled = false;
    }

    if (typeof showToast === 'function') showToast('✅ Letter generated! You can download or copy it.', 'success');
  }, 1200);
}

/* ── Download as PDF (print dialog) ── */
function downloadLetterPDF() {
  var text = (document.getElementById('cl-result-text') || {}).value || '';
  if (!text) return;

  var btn = document.getElementById('btn-cl-download');
  var orig = btn ? btn.innerHTML : '';
  if (btn) { btn.innerHTML = '<span class="spinner"></span>'; btn.disabled = true; }

  var printWin = window.open('', '_blank', 'width=800,height=1000');
  if (!printWin) {
    if (btn) { btn.innerHTML = orig; btn.disabled = false; }
    if (typeof showToast === 'function') showToast('⚠️ Please allow pop-ups to generate the PDF.', 'error');
    return;
  }

  var isRTL = window.CV_LANG_DICT && window.CV_LANG_DICT[window.letterLang||'en'] && window.CV_LANG_DICT[window.letterLang||'en'].rtl;
  printWin.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Cover Letter</title><style>*{box-sizing:border-box;margin:0;padding:0}@page{size:A4;margin:0}body{font-family:Georgia,"Times New Roman",serif;font-size:12pt;line-height:1.8;padding:22mm 28mm;color:#1A1A2E;direction:' + (isRTL?'rtl':'ltr') + ';white-space:pre-wrap}</style></head><body>' + text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '<script>window.addEventListener("load",function(){setTimeout(function(){window.print();},400)});<\/script></body></html>');
  printWin.document.close();

  if (btn) { btn.innerHTML = orig; btn.disabled = false; }
  if (typeof showToast === 'function') showToast('✅ PDF ready! Click "Save as PDF" in the print dialog.', 'success');
}

/* ── Copy ── */
function copyLetter() {
  var text = (document.getElementById('cl-result-text') || {}).value || '';
  if (typeof copyToClipboard === 'function') copyToClipboard(text);
  else navigator.clipboard.writeText(text).then(function(){ if(typeof showToast==='function') showToast('Copied!','success'); });
}

/* ── Reset ── */
function resetForm() {
  var ids = ['cl-result-text','cl-result-actions','cl-generating'];
  ids.forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.add('hidden'); });
  var ph = document.getElementById('cl-placeholder');
  if (ph) ph.classList.remove('hidden');
  var rt = document.getElementById('cl-result-text');
  if (rt) rt.value = '';
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('btn-generate');
  if (btn) btn.addEventListener('click', generateLetter);

  var copyBtn = document.getElementById('btn-cl-copy');
  if (copyBtn) copyBtn.addEventListener('click', copyLetter);

  var dlBtn = document.getElementById('btn-cl-download');
  if (dlBtn) dlBtn.addEventListener('click', downloadLetterPDF);

  var newBtn = document.getElementById('btn-cl-new');
  if (newBtn) newBtn.addEventListener('click', resetForm);

  var regenBtn = document.getElementById('btn-cl-regenerate');
  if (regenBtn) regenBtn.addEventListener('click', function() {
    resetForm();
    setTimeout(generateLetter, 300);
  });
});
