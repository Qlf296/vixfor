/**
 * ForgCV by Vixfor — Cover Letter Generator
 */

const CL_TEMPLATES = {
  fr: {
    professional: (d) => `${d.city ? d.city + ', le ' + new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Madame, Monsieur,

C'est avec un vif intérêt que je vous adresse ma candidature au poste de ${d.position} au sein de ${d.company}.

Fort(e) de ${d.experience || 'mon expérience professionnelle'}, j'ai développé des compétences solides et une expertise qui correspondent précisément au profil que vous recherchez. ${d.experience ? 'Tout au long de mon parcours, j\'ai démontré ma capacité à relever des défis complexes tout en maintenant un haut niveau de qualité et de rigueur.' : ''}

${d.motivation ? `Ce qui me motive particulièrement dans cette opportunité est la suivante : ${d.motivation}. Je suis convaincu(e) que cette vision s'aligne parfaitement avec les ambitions de ${d.company} et que je saurai y apporter une contribution significative.` : `Rejoindre ${d.company} représente pour moi une opportunité exceptionnelle d'apporter mes compétences et de contribuer activement au développement d'une structure que j'admire pour son dynamisme et ses valeurs.`}

Je serais ravi(e) de vous rencontrer afin de vous présenter en détail mon parcours et ma motivation. Disponible à votre convenance pour un entretien, je reste à votre entière disposition pour tout renseignement complémentaire.

Dans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', le ' + new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Madame, Monsieur,

${d.position} chez ${d.company} — cette opportunité a immédiatement retenu mon attention. Et pour cause : elle correspond exactement à l'étape suivante que je voulais franchir dans ma carrière.

Après ${d.experience || 'plusieurs années d\'expérience dans mon secteur'}, j'ai acquis une expertise concrète et développé une énergie communicative pour les projets ambitieux. Je ne me contente pas d'accomplir les tâches qu'on me confie — je cherche à transformer les processus, à optimiser les résultats et à créer une vraie valeur ajoutée.

${d.motivation ? `Ce qui m'attire particulièrement chez ${d.company} : ${d.motivation}. Cet environnement correspond exactement à celui dans lequel je m'épanouis et donne le meilleur de moi-même.` : `${d.company} est une entreprise dans laquelle je veux investir mon énergie, mes idées et mon expertise. Votre dynamisme et votre vision m'inspirent profondément.`}

Je suis disponible rapidement pour un échange. Je suis convaincu(e) qu'une heure de votre temps suffira à vous démontrer que je suis la personne qu'il vous faut.

Cordialement,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${d.city ? d.city + ', le ' + new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Madame, Monsieur,

Imaginez un(e) ${d.position || 'professionnel(le)'} qui combine expertise technique, créativité et sens aigu des résultats. C'est précisément ce que j'apporte à ${d.company}.

Mon parcours — ${d.experience || 'riche d\'expériences variées et stimulantes'} — m'a permis de développer une approche singulière : je pense différemment, je propose des solutions originales là où d'autres voient des obstacles, et je m'adapte avec agilité à chaque nouveau contexte.

${d.motivation ? `Ma motivation pour rejoindre votre équipe est sincère et précise : ${d.motivation}. Je crois profondément en ce que vous construisez et je veux en faire partie.` : `Ce qui me séduit chez ${d.company}, c'est votre culture de l'innovation et votre capacité à penser autrement. C'est l'environnement dans lequel je veux grandir.`}

Je serais enthousiaste à l'idée de vous présenter ma démarche lors d'un entretien. Mon énergie et mes réalisations parleront d'elles-mêmes.

Avec enthousiasme,
${d.firstname} ${d.lastname}`
  },

  en: {
    professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Dear Hiring Manager,

I am writing to express my strong interest in the ${d.position} position at ${d.company}.

With ${d.experience || 'extensive professional experience'}, I have developed a robust skill set and deep expertise that aligns precisely with the requirements of this role. Throughout my career, I have consistently demonstrated the ability to deliver measurable results while maintaining the highest standards of quality.

${d.motivation ? `What particularly excites me about this opportunity is: ${d.motivation}. I am confident that this vision aligns perfectly with ${d.company}'s strategic goals and that I can make a meaningful contribution to your team.` : `Joining ${d.company} represents an exceptional opportunity to apply my skills and contribute actively to an organisation I genuinely admire for its dynamism and values.`}

I would welcome the chance to discuss how my background and expertise would be an asset to your team. I am available at your earliest convenience for an interview.

Yours sincerely,
${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Dear Hiring Team,

${d.position} at ${d.company} — this is exactly the opportunity I have been working toward.

After ${d.experience || 'years of building hands-on expertise'}, I bring more than skills to the table — I bring drive, ambition, and an unwavering commitment to excellence. I don't just complete tasks; I challenge processes, optimise outcomes, and create genuine value.

${d.motivation ? `What draws me to ${d.company}: ${d.motivation}. This is precisely the environment where I do my best work and thrive.` : `${d.company}'s innovative approach and bold vision are exactly what excites me. I want to bring my energy and ideas to your team.`}

Give me an hour of your time. I'll demonstrate exactly why I'm your next great hire.

Best regards,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Dear Team at ${d.company},

What if your next ${d.position || 'hire'} was someone who doesn't just think outside the box — but creatively reshapes it entirely?

My journey — ${d.experience || 'a blend of creative thinking and practical execution'} — has shown me that the most impactful solutions arise from combining structured thinking with genuine creative courage.

${d.motivation ? `Here's what drives me toward ${d.company}: ${d.motivation}. I believe wholeheartedly in what you're building and I want to be part of it.` : `${d.company}'s culture of innovation and long-term vision resonate deeply with the way I approach every challenge and opportunity.`}

I'd love the chance to share ideas and show you my work. Let's create something exceptional together.

Enthusiastically,
${d.firstname} ${d.lastname}`
  }
};

  de: {
    professional: (d) => `${d.city ? d.city + ', den ' + new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Sehr geehrte Damen und Herren,

mit großem Interesse bewerbe ich mich um die Stelle als ${d.position} bei ${d.company}.

Durch ${d.experience || 'meine langjährige Berufserfahrung'} habe ich fundierte Kenntnisse und Kompetenzen entwickelt, die genau dem gesuchten Profil entsprechen. Im Laufe meiner Karriere habe ich stets bewiesen, dass ich komplexe Herausforderungen meistern und gleichzeitig höchste Qualitätsstandards einhalten kann.

${d.motivation ? `Was mich an dieser Stelle besonders reizt: ${d.motivation}. Ich bin überzeugt, dass diese Vision perfekt mit den Zielen von ${d.company} übereinstimmt und ich einen wertvollen Beitrag zu Ihrem Team leisten kann.` : `Bei ${d.company} zu arbeiten wäre für mich eine außergewöhnliche Möglichkeit, meine Fähigkeiten einzusetzen und aktiv zur Entwicklung eines Unternehmens beizutragen, das ich für seinen Dynamismus und seine Werte sehr schätze.`}

Über die Gelegenheit, Ihnen meinen Werdegang und meine Motivation in einem persönlichen Gespräch vorstellen zu dürfen, würde ich mich sehr freuen. Für Rückfragen stehe ich Ihnen jederzeit gerne zur Verfügung.

Mit freundlichen Grüßen,
${d.firstname} ${d.lastname}`,

    dynamic: (d) => `${d.city ? d.city + ', den ' + new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Sehr geehrte Damen und Herren,

${d.position} bei ${d.company} — diese Stelle hat sofort meine Aufmerksamkeit geweckt. Und das aus gutem Grund: Sie entspricht genau dem nächsten Schritt, den ich in meiner Karriere anstrebe.

Nach ${d.experience || 'Jahren praktischer Erfahrung in meinem Fachbereich'} bringe ich mehr als nur Fähigkeiten mit — ich bringe Antrieb, Ehrgeiz und ein unerschütterliches Engagement für Exzellenz. Ich erledige nicht nur Aufgaben; ich hinterfrage Prozesse, optimiere Ergebnisse und schaffe echten Mehrwert.

${d.motivation ? `Was mich zu ${d.company} zieht: ${d.motivation}. Dieses Umfeld ist genau das, in dem ich aufblühe und mein Bestes gebe.` : `${d.company} ist ein Unternehmen, dem ich meine Energie, meine Ideen und meine Expertise widmen möchte. Ihr Unternehmergeist und Ihre Vision inspirieren mich sehr.`}

Geben Sie mir eine Stunde Ihrer Zeit. Ich werde Ihnen zeigen, warum ich die richtige Wahl für Ihre offene Stelle bin.

Mit besten Grüßen,
${d.firstname} ${d.lastname}`,

    creative: (d) => `${d.city ? d.city + ', den ' + new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('de-DE', {day:'numeric',month:'long',year:'numeric'})}

${d.firstname} ${d.lastname}
${d.email}${d.phone ? ' · ' + d.phone : ''}


Liebes Team von ${d.company},

Was wäre, wenn Ihr nächste(r) ${d.position || 'Mitarbeiter/in'} jemand wäre, der nicht nur um die Ecke denkt — sondern das gesamte Bild neu gestaltet?

Mein Weg — ${d.experience || 'geprägt von kreativem Denken und praktischer Umsetzung'} — hat mir gezeigt, dass die wirkungsvollsten Lösungen entstehen, wenn man strukturiertes Denken mit echtem kreativen Mut verbindet. Ich sehe dort Möglichkeiten, wo andere Hindernisse sehen.

${d.motivation ? `Hier ist, was mich zu ${d.company} treibt: ${d.motivation}. Ich glaube von ganzem Herzen an das, was Sie aufbauen, und möchte ein Teil davon sein.` : `Die Innovationskultur und die langfristige Vision von ${d.company} sprechen mich tief an. Das ist das Umfeld, in dem ich wachsen und Großes erreichen möchte.`}

Ich würde mich sehr freuen, Ihnen meine Arbeit und meine Ideen in einem Gespräch vorzustellen. Lassen Sie uns gemeinsam etwas Besonderes schaffen.

Mit Begeisterung,
${d.firstname} ${d.lastname}`
  }
};

CL_TEMPLATES.pt = {
  professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'})}

${d.company}
A/c Departamento de Recursos Humanos
Candidatura ao cargo: ${d.position || 'em aberto'}

Exmo(a) Senhor(a),

Venho por este meio manifestar o meu interesse pela posição de ${d.position || 'colaborador(a)'} na ${d.company}. ${d.experience ? 'Com ' + d.experience + ', desenvolvi competências sólidas e uma experiência que corresponde precisamente ao perfil que procuram.' : 'Estou convicto(a) de que as minhas competências e motivação representam um contributo valioso para a vossa equipa.'}

${d.motivation ? 'O que mais me atrai nesta oportunidade é: ' + d.motivation + '. Acredito que esta visão está perfeitamente alinhada com os objetivos estratégicos da ' + d.company + '.' : 'A ' + d.company + ' representa para mim uma oportunidade excecional de aplicar as minhas capacidades e contribuir ativamente para o crescimento de uma organização que admiro.'}

Coloco-me ao dispor para uma entrevista, na qual poderei desenvolver em detalhe a minha candidatura e demonstrar o valor que posso trazer à ${d.company}.

Agradeço desde já a atenção dispensada e aguardo o vosso contacto.

Com os melhores cumprimentos,
${d.firstname || ''} ${d.lastname || ''}
${d.email ? 'E-mail: ' + d.email : ''}${d.phone ? ' | Tel: ' + d.phone : ''}`,

  dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'})}

${d.company} — Candidatura: ${d.position || 'Cargo em aberto'}

Caro(a) Recrutador(a),

${d.experience ? 'Após ' + d.experience + ', acumulei uma experiência concreta e desenvolvi energia para projetos ambiciosos.' : 'Sou uma pessoa dinâmica, orientada para resultados e com capacidade de adaptação a novos desafios.'} Não me limito a cumprir tarefas — procuro transformar processos, otimizar resultados e criar valor real para a organização.

${d.motivation ? 'O que me motiva nesta oportunidade: ' + d.motivation + '.' : 'A ' + d.company + ' representa o ambiente ideal para crescer e alcançar grandes resultados.'}

Tenho a certeza de que posso fazer a diferença na ${d.company}. Estou disponível para uma reunião quando for mais conveniente.

Com entusiasmo,
${d.firstname || ''} ${d.lastname || ''}`,

  creative: (d) => `${new Date().toLocaleDateString('pt-PT', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

Imagine um(a) ${d.position || 'profissional'} que combina expertise técnica, criatividade e sentido de resultados. É precisamente o que trago para a ${d.company}.

${d.experience ? 'O meu percurso — ' + d.experience + ' — permitiu-me desenvolver uma abordagem singular.' : 'Penso de forma diferente, proponho soluções originais e adapto-me com agilidade a cada novo contexto.'}

${d.motivation ? 'A razão pela qual escolhi a ' + d.company + ': ' + d.motivation : 'A cultura de inovação e a visão de longo prazo da ' + d.company + ' são o ambiente perfeito para eu crescer e contribuir de forma única.'}

Adorava a oportunidade de partilhar ideias. Vamos criar algo excecional juntos.

Com criatividade,
${d.firstname || ''} ${d.lastname || ''}`
};

/* ── Dutch (NL) ── */
CL_TEMPLATES.nl = {
  professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'})}

${d.company}
T.a.v. HR-afdeling
Sollicitatie: ${d.position || 'Vacature'}

Geachte heer/mevrouw,

Hierbij solliciteer ik met veel interesse naar de functie van ${d.position || 'medewerker'} bij ${d.company}. ${d.experience ? 'Met ' + d.experience + ' heb ik robuuste vaardigheden ontwikkeld die naadloos aansluiten bij uw vereisten.' : 'Ik ben ervan overtuigd dat mijn competenties en motivatie een waardevolle aanvulling zijn voor uw team.'}

${d.motivation ? 'Wat mij bijzonder aanspreekt in deze functie is: ' + d.motivation + '.' : d.company + ' spreekt mij aan vanwege de professionele cultuur en de groeimogelijkheden die het biedt.'}

Ik zie graag de mogelijkheid om mijn sollicitatie persoonlijk toe te lichten tijdens een gesprek.

Met vriendelijke groet,
${d.firstname || ''} ${d.lastname || ''}
${d.email ? 'E-mail: ' + d.email : ''}${d.phone ? ' | Tel: ' + d.phone : ''}`,

  dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'})}

${d.company} — Sollicitatie: ${d.position || 'Openstaande vacature'}

Beste recruiter,

${d.experience ? 'Na ' + d.experience + ' heb ik concrete expertise opgebouwd en energie ontwikkeld voor ambitieuze projecten.' : 'Ik ben gedreven, resultaatgericht en pas me snel aan nieuwe uitdagingen aan.'} Ik beperk mezelf niet tot het uitvoeren van taken — ik zoek naar manieren om processen te verbeteren en echte waarde te creëren.

${d.motivation ? 'Wat mij motiveert: ' + d.motivation + '.' : d.company + ' is de ideale omgeving om te groeien en geweldige resultaten te behalen.'}

Ik ben ervan overtuigd dat ik het verschil kan maken bij ${d.company}. Ik sta open voor een gesprek.

Met enthousiaste groet,
${d.firstname || ''} ${d.lastname || ''}`,

  creative: (d) => `${new Date().toLocaleDateString('nl-NL', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

Stel je een ${d.position || 'professional'} voor die technische expertise, creativiteit en resultaatgerichtheid combineert. Dat is precies wat ik bij ${d.company} kom brengen.

${d.experience ? 'Mijn traject — ' + d.experience + ' — heeft mij een unieke aanpak gegeven.' : 'Ik denk anders, bied originele oplossingen en pas me flexibel aan elke nieuwe context aan.'}

${d.motivation ? 'De reden waarom ik kies voor ' + d.company + ': ' + d.motivation : 'De innovatiecultuur van ' + d.company + ' is de perfecte omgeving voor mij om te excelleren.'}

Ik kijk uit naar de kans om ideeën te delen. Laten we samen iets uitzonderlijks creëren.

Met creatieve groet,
${d.firstname || ''} ${d.lastname || ''}`
};

/* ── Spanish (ES) ── */
CL_TEMPLATES.es = {
  professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'})}

${d.company}
A/A Departamento de Recursos Humanos
Candidatura al puesto: ${d.position || 'Vacante disponible'}

Estimado/a señor/a:

Me dirijo a ustedes para expresar mi interés por el puesto de ${d.position || 'colaborador/a'} en ${d.company}. ${d.experience ? 'Con ' + d.experience + ', he desarrollado competencias sólidas que se corresponden con el perfil que buscan.' : 'Estoy convencido/a de que mis habilidades y motivación representan un valor añadido para su equipo.'}

${d.motivation ? 'Lo que me atrae especialmente de esta oportunidad es: ' + d.motivation + '.' : d.company + ' representa para mí una oportunidad excepcional de aplicar mis capacidades y contribuir activamente al crecimiento de una organización que admiro.'}

Quedo a su disposición para una entrevista en la que podré desarrollar en detalle mi candidatura.

Atentamente,
${d.firstname || ''} ${d.lastname || ''}
${d.email ? 'Correo: ' + d.email : ''}${d.phone ? ' | Tel: ' + d.phone : ''}`,

  dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'})}

${d.company} — Candidatura: ${d.position || 'Puesto disponible'}

Estimado/a responsable de selección:

${d.experience ? 'Tras ' + d.experience + ', he acumulado experiencia concreta y desarrollado energía para proyectos ambiciosos.' : 'Soy una persona dinámica, orientada a resultados y con capacidad de adaptación.'} No me limito a cumplir tareas — busco transformar procesos, optimizar resultados y crear valor real.

${d.motivation ? 'Lo que me motiva de esta oportunidad: ' + d.motivation + '.' : d.company + ' representa el entorno ideal para crecer y alcanzar grandes resultados.'}

Estoy convencido/a de que puedo hacer la diferencia en ${d.company}. Estoy disponible para una reunión.

Un saludo cordial,
${d.firstname || ''} ${d.lastname || ''}`,

  creative: (d) => `${new Date().toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

Imagina un/a ${d.position || 'profesional'} que combina experiencia técnica, creatividad y sentido de los resultados. Eso es exactamente lo que traigo a ${d.company}.

${d.experience ? 'Mi trayectoria — ' + d.experience + ' — me ha permitido desarrollar un enfoque singular.' : 'Pienso diferente, propongo soluciones originales y me adapto con agilidad a cada nuevo contexto.'}

${d.motivation ? 'La razón por la que elijo ' + d.company + ': ' + d.motivation : 'La cultura de innovación de ' + d.company + ' es el entorno perfecto para que yo crezca y contribuya de forma única.'}

Me encantaría la oportunidad de compartir ideas. Creemos algo excepcional juntos.

Con entusiasmo creativo,
${d.firstname || ''} ${d.lastname || ''}`
};

/* ── Arabic (AR) ── */
CL_TEMPLATES.ar = {
  professional: (d) => `${d.city ? d.city + '، ' + new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'})}

${d.company}
إلى: قسم الموارد البشرية
طلب التوظيف: ${d.position || 'الوظيفة المطلوبة'}

السادة الكرام،

أتقدم إليكم بطلب الانضمام إلى فريق ${d.company} في منصب ${d.position || 'موظف/ة'}. ${d.experience ? 'بفضل ' + d.experience + '، طورت مهارات متينة وخبرات تتوافق تماماً مع المتطلبات التي تبحثون عنها.' : 'أنا مقتنع/ة بأن كفاءاتي ودوافعي ستُشكّل إضافة قيّمة لفريقكم.'}

${d.motivation ? 'ما يجذبني بشكل خاص في هذه الفرصة هو: ' + d.motivation + '.' : 'تُمثّل ' + d.company + ' بالنسبة لي فرصة استثنائية لتطبيق قدراتي والمساهمة في نمو منظمة أُكنّ لها كثيراً من الإعجاب.'}

أضع نفسي رهن إشارتكم لإجراء مقابلة أُفصّل فيها ترشيحي.

مع خالص الاحترام والتقدير،
${d.firstname || ''} ${d.lastname || ''}
${d.email ? 'البريد الإلكتروني: ' + d.email : ''}${d.phone ? ' | الهاتف: ' + d.phone : ''}`,

  dynamic: (d) => `${d.city ? d.city + '، ' + new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'})}

${d.company} — طلب التوظيف: ${d.position || 'وظيفة شاغرة'}

إلى المسؤول/ة عن التوظيف،

${d.experience ? 'بعد ' + d.experience + '، راكمت خبرة عملية وطوّرت طاقة متجددة للمشاريع الطموحة.' : 'أنا شخص ديناميكي موجَّه نحو النتائج وقادر على التكيّف مع كل تحدٍّ جديد.'} لا أكتفي بأداء المهام — أسعى إلى تحويل العمليات وتحسين النتائج وخلق قيمة حقيقية.

${d.motivation ? 'ما يحفزني في هذه الفرصة: ' + d.motivation + '.' : d.company + ' هي البيئة المثالية للنمو وتحقيق نتائج استثنائية.'}

أنا واثق/ة من أنني أستطيع إحداث فارق في ${d.company}. أنا متاح/ة لمقابلة في أقرب وقت.

مع تحياتي،
${d.firstname || ''} ${d.lastname || ''}`,

  creative: (d) => `${new Date().toLocaleDateString('ar-SA', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

تخيّل/ي ${d.position || 'محترفاً'} يجمع بين الخبرة التقنية والإبداع والحس بالنتائج. هذا بالضبط ما أُقدّمه لـ${d.company}.

${d.experience ? 'مسيرتي المهنية — ' + d.experience + ' — منحتني رؤية فريدة ومنهجية مميزة.' : 'أفكر بشكل مختلف، وأقترح حلولاً مبتكرة، وأتكيّف بمرونة مع كل سياق جديد.'}

${d.motivation ? 'السبب الذي يجعلني أختار ' + d.company + ': ' + d.motivation : 'ثقافة الابتكار في ' + d.company + ' هي البيئة المثالية لي لأنمو وأُسهم بشكل فريد.'}

أودّ أن تُتاح لي الفرصة لتبادل الأفكار. لنصنع شيئاً استثنائياً معاً.

مع إبداعي التحياتي،
${d.firstname || ''} ${d.lastname || ''}`
};

/* ── Russian (RU) ── */
CL_TEMPLATES.ru = {
  professional: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'})}

${d.company}
Отдел кадров / HR
Заявка на должность: ${d.position || 'открытая вакансия'}

Уважаемые коллеги,

Настоящим выражаю искреннюю заинтересованность в должности ${d.position || 'специалиста'} в компании ${d.company}. ${d.experience ? 'Имея ' + d.experience + ', я развил(а) устойчивые компетенции, в полной мере соответствующие вашим требованиям.' : 'Убеждён(а), что мои навыки и мотивация станут ценным вкладом в вашу команду.'}

${d.motivation ? 'Что особенно привлекает меня в этой возможности: ' + d.motivation + '.' : d.company + ' представляет для меня исключительную возможность применить свои способности и активно участвовать в развитии организации, которой я искренне восхищаюсь.'}

Готов(а) к собеседованию, на котором смогу подробнее рассказать о своей кандидатуре.

С уважением,
${d.firstname || ''} ${d.lastname || ''}
${d.email ? 'Email: ' + d.email : ''}${d.phone ? ' | Тел: ' + d.phone : ''}`,

  dynamic: (d) => `${d.city ? d.city + ', ' + new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'}) : new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'})}

${d.company} — Заявка: ${d.position || 'открытая вакансия'}

Уважаемый(ая) рекрутер,

${d.experience ? 'За ' + d.experience + ' я накопил(а) реальный опыт и развил(а) энергию для амбициозных проектов.' : 'Я динамичный, ориентированный на результат специалист, способный адаптироваться к любым вызовам.'} Я не ограничиваюсь выполнением задач — я стремлюсь трансформировать процессы, оптимизировать результаты и создавать реальную ценность.

${d.motivation ? 'Что мотивирует меня в этой возможности: ' + d.motivation + '.' : d.company + ' — идеальная среда для роста и достижения выдающихся результатов.'}

Уверен(а), что смогу изменить ситуацию к лучшему в ${d.company}. Готов(а) встретиться в удобное время.

С уважением и энтузиазмом,
${d.firstname || ''} ${d.lastname || ''}`,

  creative: (d) => `${new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'})}

${d.company}

Представьте ${d.position || 'специалиста'}, сочетающего техническую экспертизу, творческий подход и нацеленность на результат. Именно это я готов(а) предложить ${d.company}.

${d.experience ? 'Мой путь — ' + d.experience + ' — позволил мне выработать уникальный подход.' : 'Я мыслю нестандартно, предлагаю оригинальные решения и легко адаптируюсь к новым контекстам.'}

${d.motivation ? 'Причина, по которой я выбираю ' + d.company + ': ' + d.motivation : 'Культура инноваций ' + d.company + ' — идеальная среда, где я смогу расти и вносить уникальный вклад.'}

С удовольствием обсужу идеи на встрече. Давайте создадим что-то исключительное вместе.

С творческим приветом,
${d.firstname || ''} ${d.lastname || ''}`
};

/* ── Generate ── */
function generateLetter() {
  const get = id => document.getElementById(id)?.value?.trim() || '';
  const getTone = () => document.querySelector('input[name="cl-tone"]:checked')?.value || 'professional';

  const d = {
    firstname:  get('cl-firstname'),
    lastname:   get('cl-lastname'),
    email:      get('cl-email'),
    phone:      get('cl-phone'),
    city:       get('cl-city'),
    company:    get('cl-company'),
    position:   get('cl-position'),
    tone:       getTone(),
    experience: get('cl-experience'),
    motivation: get('cl-motivation'),
  };

  if (!d.company || !d.position) {
    showToast('Veuillez indiquer l\'entreprise et le poste.', 'error');
    return;
  }

  const btn = document.getElementById('btn-generate');
  btn.innerHTML = `<span class="spinner"></span> <span data-i18n="cl_generating">Génération...</span>`;
  btn.disabled = true;

  // Show generating animation
  document.getElementById('cl-placeholder')?.classList.add('hidden');
  document.getElementById('cl-result-text')?.classList.add('hidden');
  document.getElementById('cl-result-actions')?.classList.add('hidden');
  document.getElementById('cl-generating')?.classList.remove('hidden');

  setTimeout(() => {
    const langSel = document.getElementById('letterLanguage') || document.getElementById('cl-lang');
    const lang = langSel ? langSel.value : (window.letterLang || 'en');
    const templates = CL_TEMPLATES[lang] || CL_TEMPLATES.fr;
    const toneFunc  = templates[d.tone] || templates.professional;
    const letter    = toneFunc(d);

    // Show result
    const textarea = document.getElementById('cl-result-text');
    const actions  = document.getElementById('cl-result-actions');
    if (textarea) { textarea.value = letter; textarea.classList.remove('hidden'); }
    if (actions) actions.classList.remove('hidden');
    document.getElementById('cl-generating')?.classList.add('hidden');

    // Reset button
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> <span data-i18n="cl_generate">Générer ma lettre</span>`;
    btn.disabled = false;

    showToast('✅ Lettre générée avec succès ! Vous pouvez la télécharger ou la copier.', 'success');
  }, 1800);
}

function copyLetter() {
  const text = document.getElementById('cl-result-text')?.value || '';
  copyToClipboard(text);
}

function downloadLetterPDF() {
  const text = document.getElementById('cl-result-text')?.value || '';
  if (!text) return;

  const btn = document.getElementById('btn-cl-download');
  const orig = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;

  const div = document.createElement('div');
  div.style.cssText = `
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 12pt;
    line-height: 1.8;
    padding: 20mm 24mm;
    color: #1A1A2E;
    white-space: pre-wrap;
    max-width: 170mm;
    margin: 0 auto;
  `;
  div.textContent = text;
  document.body.appendChild(div);

  html2pdf().set({
    margin:      [15, 20, 15, 20],
    filename:    'Lettre_de_Motivation.pdf',
    image:       { type: 'jpeg', quality: 0.97 },
    html2canvas: { scale: 2 },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(div).save().then(() => {
    document.body.removeChild(div);
    btn.innerHTML = orig;
    btn.disabled = false;
    showToast('✅ PDF téléchargé avec succès !', 'success');
  });
}

function resetForm() {
  document.getElementById('cl-result-text')?.classList.add('hidden');
  document.getElementById('cl-result-actions')?.classList.add('hidden');
  document.getElementById('cl-generating')?.classList.add('hidden');
  document.getElementById('cl-placeholder')?.classList.remove('hidden');
  if (document.getElementById('cl-result-text')) document.getElementById('cl-result-text').value = '';
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  // Auto-detect language from i18n system or browser
  const langSel = document.getElementById('cl-lang');
  if (langSel) {
    const detected = (typeof currentLang !== 'undefined' && currentLang)
      ? currentLang
      : (navigator.language || navigator.userLanguage || 'fr').slice(0, 2).toLowerCase();
    const supported = ['fr','en','de','nl','es','ar','ru'];
    langSel.value = supported.includes(detected) ? detected : 'fr';
    // Mark as auto-detected
    const badge = document.getElementById('cl-lang-detected');
    if (badge) {
      const flags = {fr:'🇫🇷',en:'🇬🇧',de:'🇩🇪',nl:'🇳🇱',es:'🇪🇸',ar:'🇸🇦',ru:'🇷🇺'};
      badge.textContent = flags[langSel.value] + ' Auto-détectée';
    }
    // When user changes manually, remove "auto" badge
    langSel.addEventListener('change', () => {
      if (badge) badge.textContent = '✏️ Modifiée';
    });
  }

  document.getElementById('btn-generate')?.addEventListener('click', generateLetter);
  document.getElementById('btn-cl-copy')?.addEventListener('click', copyLetter);
  document.getElementById('btn-cl-download')?.addEventListener('click', downloadLetterPDF);
  document.getElementById('btn-cl-new')?.addEventListener('click', resetForm);
  document.getElementById('btn-cl-regenerate')?.addEventListener('click', () => {
    resetForm();
    setTimeout(generateLetter, 300);
  });
});
