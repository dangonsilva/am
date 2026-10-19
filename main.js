/* Artificial Music: interações: idioma, menu mobile e newsletter */
(function () {
  "use strict";

  var DICT = {
    pt: {
      "skip": "Ir para o conteúdo",
      "nav.home": "Início",
      "aria.main": "Principal", "aria.footer": "Rodapé", "aria.lucas.li": "LinkedIn de Lucas Abrão",
      "meta.title.home": "Artificial Music", "meta.title.about": "Sobre | Artificial Music",
      "meta.desc.home": "A Artificial Music cria IA para áudio e música: composição, análise de áudio, instrumentos virtuais e aplicativos inteligentes.",
      "meta.desc.about": "A Artificial Music constrói IA para áudio, especialmente música: apps, instrumentos virtuais e sistemas inteligentes para composição e análise de áudio.",
      "feat.tag": "Projeto em destaque",
      "sonifya.text": "Criado sobre o nosso motor de música generativa, o Sonifya transforma um único toque em um emoji numa música calma e personalizada, ajustada especificamente para pessoas autistas e pessoas com TDAH. Disponível para Android e no navegador.",
      "sonifya.open": "Abrir Sonifya", "sonifya.more": "Mais projetos",
      "sonifya.why": "Por que as pessoas usam o Sonifya",
      "sonifya.b1": "Um toque para acessar música baseada no seu humor",
      "sonifya.b2": "Áudio sensorialmente seguro, projetado com limite de volume",
      "sonifya.b3": "Reveja as sessões e apoie o acompanhamento profissional do progresso",
      "nav.about": "Sobre", "nav.projects": "Projetos", "nav.contact": "Contato",
      "lang.label": "Idioma", "menu": "Menu",
      "hero.title": "Engenharia de Inteligência para Sistemas Sonoros.",
      "hero.label": "Sobre",
      "hero.sub": "IA para música e áudio: composição, análise, instrumentos virtuais e aplicativos inteligentes.",
      "cta.explore": "Explore projetos", "cta.sonifya": "Ver Sonifya",
      "areas.label": "Áreas", "areas.title": "Áreas Principais",
      "area.1": "Música Generativa e Composição",
      "area.2": "Análise de Áudio e Compreensão Musical",
      "area.3": "Processamento de Sinais de Áudio",
      "area.4": "Instrumentos Virtuais e Plugins",
      "area.5": "Apps de Áudio para Mobile e Web",
      "area.6": "Som Adaptativo e Acessível",
      "feat.label": "Projeto",
      "res.label": "Pesquisa", "res.title": "IA Orientada por Pesquisa",
      "res.text": "Combinando aprendizado de máquina, criatividade computacional e engenharia aplicada para criar tecnologias sonoras significativas.",
      "stack.title": "Stack tecnológico",
      "stack.1": "Python: Aprendizado de Máquina", "stack.2": "Kotlin: Android e Backend",
      "stack.3": "Web: Aplicativos Web Progressivos (PWA)", "stack.4": "Aprendizado Profundo e Modelos Generativos",
      "news.title": "Newsletter sobre IA para Música e Áudio",
      "news.text": "Receba as últimas novidades sobre análise de áudio, composição musical e outras aplicações de IA no mundo da música. Gratuito e diretamente no seu email.",
      "news.ph": "Seu email", "news.btn": "Inscrever-se",
      "news.invalid": "Digite um email válido, como nome@exemplo.com.",
      "news.open": "Abrindo seu app de email para confirmar a inscrição.",
      "foot.follow": "Siga",
      "foot.legal": "© 2026 Artificial Music. Inteligência para o Som.",
      "proj.label": "Portfólio", "proj.title": "Projetos",
      "proj.intro": "Um portfólio em evolução de apps de IA, instrumentos virtuais, ferramentas de áudio e pesquisa, de produtos em desenvolvimento a experimentos em estágio inicial.",
      "proj.s.dev": "Em desenvolvimento", "proj.s.res": "Fase de pesquisa", "proj.s.con": "Conceito", "proj.s.soon": "Em breve",
      "proj.cta.details": "Ver detalhes →", "proj.cta.contact": "Fale conosco →",
      "proj.1.d": "Um toque em um emoji para música calma e personalizada, feita para pessoas autistas e pessoas com TDAH.",
      "proj.2.d": "Um ecossistema sonoro generativo para regulação emocional e rituais de áudio adaptativos.",
      "proj.3.t": "Instrumentos Virtuais com IA",
      "proj.3.d": "Instrumentos virtuais e plugins que escutam e respondem: sintetizadores e samplers expressivos, guiados por IA, que você pode tocar, moldar e performar.",
      "proj.4.d": "Um parceiro de composição com IA que sugere harmonia, melodia e arranjo em tempo real, construído sobre modelos transformer treinados em música simbólica.",
      "proj.5.t": "Kit de Análise de Áudio",
      "proj.5.d": "IA que entende áudio: transcrição, detecção de acordes, tonalidade e andamento, separação de stems e análise de estrutura para músicos e produtores.",
      "proj.6.d": "Protótipos de experiências de escuta terapêutica e sistemas de áudio inteligentes.",
      "meta.title.projects": "Projetos | Artificial Music",
      "meta.desc.projects": "Portfólio da Artificial Music: apps de IA, instrumentos virtuais, ferramentas de áudio e pesquisa.",
      "meta.title.sonifya": "Sonifya | Artificial Music",
      "meta.desc.sonifya": "O Sonifya transforma um toque em um emoji em música calma e personalizada, feita para pessoas autistas e com TDAH.",
      "sx.label": "Música para o bem-estar emocional",
      "sx.lead": "O Sonifya transforma um toque em um emoji em música calma e personalizada, feita para pessoas autistas e com TDAH.",
      "sx.cta.app": "Baixar o app", "sx.cta.pro": "Para profissionais →",
      "sx.web": "Também disponível no navegador: iPhone, tablet ou computador.",
      "sx.u.label": "Para usuários", "sx.u.title": "Feito para como seu cérebro funciona",
      "sx.u.sub": "Escolha como você está se sentindo. A música acompanha.",
      "sx.u.moods": "Emojis de humor",
      "sx.u.1": "Áudio sensorialmente seguro, sem sons repentinos e com limite de volume",
      "sx.u.2": "Reouça sessões anteriores quando quiser, offline no Android",
      "sx.u.3": "Compartilhe como você se sentiu depois, para seu profissional acompanhar seu progresso",
      "sx.u.4": "Brincar: cantarole uma melodia e ela vira música no seu próprio álbum, sem sequências, pontos ou cronômetro (Android)",
      "sx.u.5": "Com um smartwatch, a música se acalma sozinha quando seu batimento cardíaco sobe. Esse dado nunca sai do seu celular (Android)",
      "sx.how.title": "Como funciona",
      "sx.how.1": "Escolha um emoji que combine com seu humor",
      "sx.how.2": "O Sonifya gera uma música única para esse sentimento",
      "sx.how.3": "Ouça, reouça ou experimente outro humor",
      "sx.how.4": "Seu profissional vê o histórico das suas sessões no dashboard dele",
      "sx.p.label": "Para profissionais", "sx.p.title": "Um dashboard construído em torno de dados, não de diagnóstico",
      "sx.p.text": "O Sonifya dá a terapeutas ocupacionais, psicólogos e educadores uma visão estruturada do histórico de sessões de seus pacientes, para que tragam observações bem informadas a cada atendimento.",
      "sx.p.1": "Histórico de sessões e tempo de audição",
      "sx.p.2": "Acompanhamento de humor pós-sessão e taxa de resposta",
      "sx.p.3": "Alertas de padrão de uso no dashboard",
      "sx.p.4": "Definição de metas semanais",
      "sx.p.quote": "O Sonifya mostra os dados. Você tira as conclusões.",
      "sx.p.disc": "O Sonifya não é um dispositivo médico e não realiza avaliações clínicas, diagnósticos ou recomendações terapêuticas. Todos os dados são apenas informativos. A interpretação clínica é de responsabilidade exclusiva do profissional qualificado que utiliza esta ferramenta.",
      "sx.end.title": "Pronto para começar?", "sx.end.android": "Baixar para Android", "sx.end.pro": "Acesso profissional →",
      "meta.title.contact": "Contato | Artificial Music",
      "meta.desc.contact": "Fale com a Artificial Music. Estamos aqui para ajudar.",
      "ct.label": "Contato", "ct.title": "Contato",
      "ct.lead": "Estamos aqui para ajudar.", "ct.note": "Artificial Music opera remotamente.",
      "ct.l.email": "Email", "ct.l.subject": "Assunto", "ct.l.msg": "Mensagem",
      "ct.email.ph": "Seu email", "ct.msg.ph": "Escreva sua mensagem aqui",
      "ct.subject.ph": "Selecione um assunto",
      "ct.s.general": "Dúvida geral", "ct.s.sonifya": "Sonifya", "ct.s.pro": "Acesso profissional",
      "ct.s.partner": "Parcerias e colaborações", "ct.s.press": "Imprensa", "ct.s.other": "Outro",
      "ct.btn": "Enviar mensagem",
      "ct.err.subject": "Selecione um assunto.", "ct.err.msg": "Escreva uma mensagem.",
      "ct.open": "Abrindo seu app de email para enviar a mensagem.",
      "ct.side": "Ou escreva direto para",
      "about.label": "Sobre", "about.title": "Sobre",
      "about.text": "A Artificial Music constrói IA para áudio, especialmente música: apps, instrumentos virtuais e sistemas inteligentes para composição, análise de áudio e tudo o que é possível extrair do som. Criamos para músicos, produtores e ouvintes em geral, o que inclui ferramentas acessíveis e sensorialmente conscientes para pessoas neurodivergentes.",
      "team.label": "Equipe", "team.title": "Equipe",
      "lucas.role": "Fundador e Pesquisador em IA",
      "lucas.bio": "Lucas Abrão, conhecido como lucaspiano, é pesquisador em inteligência artificial e engenheiro de software especializado em modelos generativos para música, com Mestrado em Engenharia de Software pelo CESAR School. Toca piano, teclado e um pouco de violino desde os 9 anos, e essa bagagem musical molda cada sistema que ele constrói.",
      "lucas.l1": "Dissertação de Mestrado ↗", "lucas.l2": "TCC de Pós-Graduação ↗",
      "daniel.role": "Designer de Interface (UI/UX)",
      "daniel.bio": "Daniel Gonçalves é designer de interface (UI/UX) com mais de 15 anos de experiência no desenvolvimento de produtos digitais como sites, ATMs, apps e sistemas web. É formado em Design Gráfico pela UNA e pós-graduado em Processos Criativos em Palavras e Imagens pela PUC Minas. Também é músico instrumentista autodidata desde os 11 anos. Seu foco é design centrado no usuário, refinado por meio de pesquisa, prototipação e testes com usuários."
    },
    en: {
      "skip": "Skip to content",
      "nav.home": "Home",
      "aria.main": "Main", "aria.footer": "Footer", "aria.lucas.li": "Lucas Abrão on LinkedIn",
      "meta.title.home": "Artificial Music", "meta.title.about": "About | Artificial Music",
      "meta.desc.home": "Artificial Music builds AI for audio and music: composition, audio analysis, virtual instruments, and intelligent apps.",
      "meta.desc.about": "Artificial Music builds AI for audio, especially music: apps, virtual instruments and intelligent systems for composition and audio analysis.",
      "feat.tag": "Featured project",
      "sonifya.text": "Built on our generative music engine, Sonifya turns a single emoji tap into calm, personalised music, tuned specifically for autistic individuals and people with ADHD. Available on Android and in the browser.",
      "sonifya.open": "Open Sonifya", "sonifya.more": "More projects",
      "sonifya.why": "Why people use Sonifya",
      "sonifya.b1": "One tap to access mood-based music",
      "sonifya.b2": "Sensory-safe audio designed with a volume ceiling",
      "sonifya.b3": "Replay sessions and support professional progress tracking",
      "nav.about": "About", "nav.projects": "Projects", "nav.contact": "Contact",
      "lang.label": "Language", "menu": "Menu",
      "hero.title": "Engineering Intelligence for Sound Systems.",
      "hero.label": "About",
      "hero.sub": "AI for music and audio: composition, analysis, virtual instruments and intelligent apps.",
      "cta.explore": "Explore projects", "cta.sonifya": "See Sonifya",
      "areas.label": "Areas", "areas.title": "Core Areas",
      "area.1": "Generative Music and Composition",
      "area.2": "Audio Analysis and Music Understanding",
      "area.3": "Audio Signal Processing",
      "area.4": "Virtual Instruments and Plugins",
      "area.5": "Audio Apps for Mobile and Web",
      "area.6": "Adaptive and Accessible Sound",
      "feat.label": "Project",
      "res.label": "Research", "res.title": "Research-Driven AI",
      "res.text": "Combining machine learning, computational creativity and applied engineering to build meaningful sound technologies.",
      "stack.title": "Technology stack",
      "stack.1": "Python: Machine Learning", "stack.2": "Kotlin: Android and Backend",
      "stack.3": "Web: Progressive Web Apps (PWA)", "stack.4": "Deep Learning and Generative Models",
      "news.title": "Newsletter on AI for Music and Audio",
      "news.text": "Get the latest on audio analysis, music composition and other AI applications in the music world. Free, straight to your inbox.",
      "news.ph": "Your email", "news.btn": "Subscribe",
      "news.invalid": "Enter a valid email, like name@example.com.",
      "news.open": "Opening your email app to confirm the subscription.",
      "foot.follow": "Follow",
      "foot.legal": "© 2026 Artificial Music. Intelligence for Sound.",
      "proj.label": "Portfolio", "proj.title": "Projects",
      "proj.intro": "An evolving portfolio of AI apps, virtual instruments, audio tools and research, from products in development to early-stage experiments.",
      "proj.s.dev": "In development", "proj.s.res": "Research phase", "proj.s.con": "Concept", "proj.s.soon": "Coming soon",
      "proj.cta.details": "View details →", "proj.cta.contact": "Get in touch →",
      "proj.1.d": "One emoji tap into calm, personalised music for autistic individuals and people with ADHD.",
      "proj.2.d": "A generative sound ecosystem for emotional regulation and adaptive audio rituals.",
      "proj.3.t": "AI Virtual Instruments",
      "proj.3.d": "Virtual instruments and plugins that listen and respond: expressive, AI-driven synths and samplers you can play, shape and perform with.",
      "proj.4.d": "An AI composition partner that suggests harmony, melody and arrangement in real time, built on transformer models trained on symbolic music.",
      "proj.5.t": "Audio Analysis Toolkit",
      "proj.5.d": "AI that understands audio: transcription, chord, key and tempo detection, stem separation and structure analysis for musicians and producers.",
      "proj.6.d": "Prototypes for therapeutic listening experiences and intelligent audio systems.",
      "meta.title.projects": "Projects | Artificial Music",
      "meta.desc.projects": "Artificial Music portfolio: AI apps, virtual instruments, audio tools and research.",
      "meta.title.sonifya": "Sonifya | Artificial Music",
      "meta.desc.sonifya": "Sonifya turns one emoji tap into calm, personalised music, made for autistic people and people with ADHD.",
      "sx.label": "Music for emotional well-being",
      "sx.lead": "Sonifya turns one emoji tap into calm, personalised music, made for autistic people and people with ADHD.",
      "sx.cta.app": "Get the app", "sx.cta.pro": "For professionals →",
      "sx.web": "Also available in the browser: iPhone, tablet or computer.",
      "sx.u.label": "For users", "sx.u.title": "Built for how your brain works",
      "sx.u.sub": "Choose how you're feeling. The music follows.",
      "sx.u.moods": "Mood emojis",
      "sx.u.1": "Sensory-safe audio, with no sudden sounds and a volume ceiling",
      "sx.u.2": "Replay past sessions whenever you want, offline on Android",
      "sx.u.3": "Share how you felt afterwards, so your professional can follow your progress",
      "sx.u.4": "Play: hum a melody and it becomes music in your own album, no sequences, points or timers (Android)",
      "sx.u.5": "With a smartwatch, the music calms itself when your heart rate rises. That data never leaves your phone (Android)",
      "sx.how.title": "How it works",
      "sx.how.1": "Pick an emoji that matches your mood",
      "sx.how.2": "Sonifya generates a unique piece of music for that feeling",
      "sx.how.3": "Listen, replay or try another mood",
      "sx.how.4": "Your professional sees your session history on their dashboard",
      "sx.p.label": "For professionals", "sx.p.title": "A dashboard built around data, not diagnosis",
      "sx.p.text": "Sonifya gives occupational therapists, psychologists and educators a structured view of their patients' session history, so they bring well-informed observations to every appointment.",
      "sx.p.1": "Session history and listening time",
      "sx.p.2": "Post-session mood tracking and response rate",
      "sx.p.3": "Usage-pattern alerts on the dashboard",
      "sx.p.4": "Weekly goal setting",
      "sx.p.quote": "Sonifya shows the data. You draw the conclusions.",
      "sx.p.disc": "Sonifya is not a medical device and does not perform clinical assessments, diagnoses or therapeutic recommendations. All data is for information only. Clinical interpretation is the sole responsibility of the qualified professional using this tool.",
      "sx.end.title": "Ready to get started?", "sx.end.android": "Download for Android", "sx.end.pro": "Professional access →",
      "meta.title.contact": "Contact | Artificial Music",
      "meta.desc.contact": "Get in touch with Artificial Music. We are here to help.",
      "ct.label": "Contact", "ct.title": "Contact",
      "ct.lead": "We are here to help.", "ct.note": "Artificial Music operates remotely.",
      "ct.l.email": "Email", "ct.l.subject": "Subject", "ct.l.msg": "Message",
      "ct.email.ph": "Your email", "ct.msg.ph": "Write your message here",
      "ct.subject.ph": "Select a subject",
      "ct.s.general": "General question", "ct.s.sonifya": "Sonifya", "ct.s.pro": "Professional access",
      "ct.s.partner": "Partnerships and collaborations", "ct.s.press": "Press", "ct.s.other": "Other",
      "ct.btn": "Send message",
      "ct.err.subject": "Select a subject.", "ct.err.msg": "Write a message.",
      "ct.open": "Opening your email app to send the message.",
      "ct.side": "Or write directly to",
      "about.label": "About", "about.title": "About",
      "about.text": "Artificial Music builds AI for audio, especially music: apps, virtual instruments and intelligent systems for composition, audio analysis and everything that can be drawn from sound. We build for musicians, producers and listeners in general, including accessible, sensory-aware tools for neurodivergent people.",
      "team.label": "Team", "team.title": "Team",
      "lucas.role": "Founder and AI Researcher",
      "lucas.bio": "Lucas Abrão, known as lucaspiano, is an artificial intelligence researcher and software engineer specialised in generative models for music, with a Master's degree in Software Engineering from CESAR School. He has played piano, keyboard and a little violin since the age of 9, and that musical background shapes every system he builds.",
      "lucas.l1": "Master's Dissertation ↗", "lucas.l2": "Postgraduate Thesis ↗",
      "daniel.role": "Interface Designer (UI/UX)",
      "daniel.bio": "Daniel Gonçalves is a UI/UX designer with more than 15 years of experience building digital products such as websites, ATMs, apps and web systems. He holds a degree in Graphic Design from UNA and a postgraduate degree in Creative Processes in Words and Images from PUC Minas. He is also a self-taught instrumentalist, playing music since the age of 11. His focus is user-centered design, refined through research, prototyping and testing with users."
    }
  };

  var current = "pt";
  var select = document.getElementById("lang");
  var msgKey = "";   /* mensagem do formulário atualmente exibida */

  function t(key) { return (DICT[current] && DICT[current][key]) || ""; }

  function applyLang(lang) {
    if (!DICT[lang]) lang = "pt";
    current = lang;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-ph"));
      if (v) el.setAttribute("placeholder", v);
    });
    /* atributos acessíveis, alt e meta descrição */
    [["data-i18n-aria", "aria-label"], ["data-i18n-alt", "alt"], ["data-i18n-content", "content"]].forEach(function (pair) {
      document.querySelectorAll("[" + pair[0] + "]").forEach(function (el) {
        var v = t(el.getAttribute(pair[0]));
        if (v) el.setAttribute(pair[1], v);
      });
    });
    if (select) select.value = lang;
    var fm = document.getElementById("formMsg");
    if (fm) fm.textContent = msgKey ? t(msgKey) : "";
  }

  function stored() {
    try { return localStorage.getItem("am-lang"); } catch (e) { return null; }
  }
  function store(lang) {
    try { localStorage.setItem("am-lang", lang); } catch (e) { /* ignora */ }
  }

  if (select) {
    select.addEventListener("change", function () {
      applyLang(select.value);
      store(select.value);
    });
  }

  /* Menu mobile */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* Newsletter: valida e abre o app de email (sem endpoint de backend conhecido) */
  var form = document.getElementById("newsForm");
  var msg = document.getElementById("formMsg");
  var email = document.getElementById("email");
  function setMsg(key) { msgKey = key; msg.textContent = key ? t(key) : ""; }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (email.value || "").trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      email.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok) {
        setMsg("news.invalid");
        email.focus();
        return;
      }
      setMsg("news.open");
      var subject = encodeURIComponent("Newsletter | Artificial Music");
      var body = encodeURIComponent("Email: " + value);
      window.location.href = "mailto:contact@artificialmusic.ai?subject=" + subject + "&body=" + body;
    });
    email.addEventListener("input", function () {
      email.setAttribute("aria-invalid", "false");
      setMsg("");
    });
  }

  /* Contato: valida e abre o app de email (sem endpoint de backend conhecido) */
  var cform = document.getElementById("contactForm");
  if (cform) {
    var cEmail = document.getElementById("cEmail");
    var cSubject = document.getElementById("cSubject");
    var cMsg = document.getElementById("cMsg");
    var fields = [cEmail, cSubject, cMsg];
    function mark(el, bad) { el.setAttribute("aria-invalid", bad ? "true" : "false"); }
    cform.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (cEmail.value || "").trim();
      var text = (cMsg.value || "").trim();
      fields.forEach(function (f) { mark(f, false); });
      var bad = null, key = "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) { bad = cEmail; key = "news.invalid"; }
      else if (!cSubject.value) { bad = cSubject; key = "ct.err.subject"; }
      else if (!text) { bad = cMsg; key = "ct.err.msg"; }
      if (bad) { mark(bad, true); setMsg(key); bad.focus(); return; }
      setMsg("ct.open");
      var subject = encodeURIComponent(cSubject.options[cSubject.selectedIndex].text + " | Artificial Music");
      var body = encodeURIComponent(text + "\n\nEmail: " + value);
      window.location.href = "mailto:contact@artificialmusic.ai?subject=" + subject + "&body=" + body;
    });
    fields.forEach(function (f) {
      f.addEventListener("input", function () { mark(f, false); setMsg(""); });
      f.addEventListener("change", function () { mark(f, false); setMsg(""); });
    });
  }

  /* Inicialização */
  var saved = stored();
  var initial = saved === "en" ? "en" : "pt"; /* padrão PT-BR, como no site original */
  applyLang(initial);
})();
