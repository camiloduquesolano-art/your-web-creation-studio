export type Lang = "es" | "en";

export type Dict = {
  nav: { assistant: string; vault: string; science: string; join: string };
  hero: {
    badge: string;
    titleTop: string;
    titleBottom: string;
    subtitleLead: string;
    subtitle: string;
    waitlistHeader: string;
    emailPlaceholder: string;
    goalPlaceholder: string;
    goals: { value: string; label: string }[];
    submit: string;
    social: string;
    socialSuffix: string;
  };
  pillars: {
    tag: string;
    title: string;
    description: string;
    items: { title: string; subtitle: string; body: string; tag: string }[];
  };
  vault: {
    tag: string;
    title: string;
    body: string;
    features: { title: string; body: string }[];
    barTitle: string;
    agent: string;
    msg1: string;
    userMsg: string;
    recBadge: string;
    recTitle: string;
    recBody: string;
    recTags: [string, string];
    logStatus: string;
  };
  science: {
    tag: string;
    title: string;
    cards: { icon: string; title: string; body: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    placeholder: string;
    submit: string;
    disclaimer: string;
  };
  footer: {
    tagline: string;
    brandbook: string;
    copyright: string;
  };
  toast: { hero: string; final: string };
  langSwitch: { toEn: string; toEs: string };
};

export const dictionaries: Record<Lang, Dict> = {
  es: {
    nav: {
      assistant: "El Asistente",
      vault: "Bóveda de Conocimiento",
      science: "Ciencia & Seguridad",
      join: "Unirse a la lista ⚡",
    },
    hero: {
      badge: "PRÓXIMAMENTE • BETA PRIVADA 2026",
      titleTop: "TU GUÍA PERSONAL PARA",
      titleBottom: "EXPLORAR CON CONCIENCIA",
      subtitleLead: "Shroomed",
      subtitle:
        " es un agente que te conoce a ti primero, para después ayudarte a entender qué es lo que estás buscando con información clara, cercana y hecha a tu medida. Nada de moda, nada de adivinar.",
      waitlistHeader: "Asegura tu acceso anticipado hoy",
      emailPlaceholder: "Tu correo electrónico...",
      goalPlaceholder: "¿Cuál es tu objetivo principal?",
      goals: [
        { value: "bienestar_mental", label: "Bienestar mental y enfoque" },
        { value: "exploracion_consciente", label: "Exploración consciente & microdosis" },
        { value: "gestion_salud", label: "Bóveda de salud & registro de uso" },
        { value: "curiosidad_educativa", label: "Aprender y educarme con ciencia" },
      ],
      submit: "UNIRME AHORA",
      social: "personas ya están en la lista de espera",
      socialSuffix: "",
    },
    pillars: {
      tag: "— CÓMO FUNCIONA",
      title: "UN VIAJE PASO A PASO CON TU AGENTE",
      description:
        "Desde conocer quién eres hasta acompañarte en tu bitácora personal. Shroomed combina datos científicos, tu información médica e Inteligencia Artificial adaptativa.",
      items: [
        {
          title: "1. Get to Know You",
          subtitle: "Conocimiento profundo o básico",
          body:
            "El agente analiza tu perfil a través de tests de personalidad, preguntas clave o mediante el escaneo de un párrafo descriptivo de tu estado actual e historia personal.",
          tag: "Perfilamiento Dinámico",
        },
        {
          title: "2. Sustancias & Guías",
          subtitle: "Catálogo de opciones adecuadas",
          body:
            "A raíz de tu perfilamiento, la plataforma cataloga las sustancias (dentro de las permitidas y básicas) recomendadas para ti, junto con recursos educativos transparentes para cada una.",
          tag: "Catálogo Inteligente",
        },
        {
          title: "3. Intenciones & Sensaciones",
          subtitle: "Profundización de objetivos",
          body:
            "Indaga en tus intereses reales: qué buscas experimentar, cómo te imaginas sintiéndote y qué objetivos específicos tienes a corto y largo plazo.",
          tag: "Propósito & Mindset",
        },
        {
          title: "4. Bitácora & Evolución",
          subtitle: "Tu diario interactivo",
          body:
            "Un espacio donde documentas dosis, sustancias, contexto, espacio y tus sensaciones. El agente se auto-educa con cada registro para ofrecerte mejores sugerencias.",
          tag: "Feedback Loop Continuo",
        },
      ],
    },
    vault: {
      tag: "— BÓVEDA DE CONOCIMIENTO",
      title: "TU HISTORIAL Y TUS DATOS, EN UN SOLO LUGAR",
      body:
        "Sube tu información médica, registra tus hábitos e interacciones pasadas. Shroomed organiza tu conocimiento en una bóveda privada y genera un asistente fármaco tipo chat que siempre sabe qué sugerirte y cómo guiarte en tus escenarios.",
      features: [
        {
          title: "Conexión de registros médicos:",
          body: "Crea tu base de datos clínica y personal sin compartirla con terceros.",
        },
        {
          title: "Recomendaciones de pre-escenarios:",
          body: "Cuándo, cuánto y en qué ambiente consumir de forma segura.",
        },
        {
          title: "Composición y feedback loop:",
          body: "Accede a lugares donde se explica cómo se compone cada sustancia.",
        },
      ],
      barTitle: "Asistente Shroomed — Bóveda Activa",
      agent: "Agente Shroomed:",
      msg1:
        "¡Hola Camilo! Analicé tu bóveda médica y tus intenciones de enfoque para esta semana. ¿Qué te gustaría explorar hoy?",
      userMsg:
        "Quiero revisar la dosis recomendada para mejorar creatividad sin alterar mi sueño.",
      recBadge: "Recomendación Personalizada",
      recTitle: "Protocolo Creativo • Dosis Recomendada",
      recBody:
        "0.15g en ayunas (mañana). Basado en tu registro del pasado 12 de Junio en tu bitácora.",
      recTags: ["✓ Cero insomnio", "✓ Alta concentración"],
      logStatus: "Bitácora actualizándose con tus sensaciones diarias...",
    },
    science: {
      tag: "— RESPALDO & CONTROL TOTAL",
      title: "DECISIONES SEGURAS, RESULTADOS REALES",
      cards: [
        {
          icon: "🔒",
          title: "Tu Bóveda, Tus Reglas",
          body:
            "Cifrado privado. Tu historial clínico, sustancias y bitácora jamás se comparten ni se venden a terceros. Privacidad 100% garantizada.",
        },
        {
          icon: "⚡",
          title: "Cero Adivinanzas",
          body:
            "Evita interacciones peligrosas. Conoce la composición exacta, contraindicaciones y la dosis ideal para tu cuerpo antes de tomar cualquier decisión.",
        },
        {
          icon: "📈",
          title: "Optimización Continua",
          body:
            "Mide tus sensaciones, ajusta tu protocolo en tiempo real y maximiza tus resultados de bienestar sin rodeos ni experimentación a ciegas.",
        },
      ],
    },
    cta: {
      title: "SÉ DE LOS PRIMEROS EN PROBARLO",
      subtitle:
        "Únete a los primeros usuarios que tendrán acceso exclusivo al asistente de IA Shroomed y a su bóveda de conocimiento personalizada.",
      placeholder: "Ingresa tu correo electrónico...",
      submit: "¡RESERVAR MI LUGAR! 🚀",
      disclaimer: "🔒 Nunca compartiremos tu correo. Respetamos tu privacidad al 100%.",
    },
    footer: {
      tagline: "Plataforma personalizada y asistente fármaco inteligente.",
      brandbook: "— BRANDBOOK 2026",
      copyright: "© 2026 Shroomed. Todos los derechos reservados.",
    },
    toast: {
      hero: "¡Te has registrado con éxito en la beta privada! 🍄",
      final: "¡Lugar reservado! Te contactaremos pronto. 🚀",
    },
    langSwitch: { toEn: "🇺🇸 EN", toEs: "🇪🇸 ES" },
  },
  en: {
    nav: {
      assistant: "The Assistant",
      vault: "Knowledge Vault",
      science: "Science & Safety",
      join: "Join the list ⚡",
    },
    hero: {
      badge: "COMING SOON • PRIVATE BETA 2026",
      titleTop: "YOUR PERSONAL GUIDE TO",
      titleBottom: "EXPLORE WITH AWARENESS",
      subtitleLead: "Shroomed",
      subtitle:
        " is an AI agent that gets to know you first, to then help you understand what you are looking for with clear, relatable, and tailored information. No hype, no guessing.",
      waitlistHeader: "Claim your early access spot today",
      emailPlaceholder: "Enter your email address...",
      goalPlaceholder: "What is your primary goal?",
      goals: [
        { value: "bienestar_mental", label: "Mental well-being & focus" },
        { value: "exploracion_consciente", label: "Conscious exploration & microdosing" },
        { value: "gestion_salud", label: "Health vault & usage tracking" },
        { value: "curiosidad_educativa", label: "Learn & educate with science" },
      ],
      submit: "JOIN NOW",
      social: "explorers are already on the waitlist",
      socialSuffix: "",
    },
    pillars: {
      tag: "— HOW IT WORKS",
      title: "A STEP-BY-STEP JOURNEY WITH YOUR AGENT",
      description:
        "From understanding who you are to guiding your personal logbook. Shroomed combines scientific data, medical records, and adaptive AI.",
      items: [
        {
          title: "1. Get to Know You",
          subtitle: "Deep or basic understanding",
          body:
            "The agent analyzes your profile through personality tests, key questions, or by scanning a descriptive paragraph of your current mindset and personal history.",
          tag: "Dynamic Profiling",
        },
        {
          title: "2. Substances & Guides",
          subtitle: "Curated suitable options",
          body:
            "Based on your profiling, the platform catalogs recommended substances (within permitted and basic categories) for you, along with transparent educational resources.",
          tag: "Smart Catalog",
        },
        {
          title: "3. Intentions & Feelings",
          subtitle: "Deep dive into goals",
          body:
            "Explores your true interests: what you wish to experience, how you imagine feeling, and the specific short and long-term goals you hold.",
          tag: "Purpose & Mindset",
        },
        {
          title: "4. Logbook & Evolution",
          subtitle: "Your interactive journal",
          body:
            "A personal space where you log dosage, substance, context, setting, and feelings. The agent self-educates with each entry to refine future recommendations.",
          tag: "Continuous Feedback Loop",
        },
      ],
    },
    vault: {
      tag: "— KNOWLEDGE VAULT",
      title: "YOUR HISTORY AND DATA, IN ONE PLACE",
      body:
        "Upload your medical history, record your habits and past experiences. Shroomed organizes your knowledge in a private vault and generates a conversational pharmaco-assistant that always knows what to suggest and how to guide your scenarios.",
      features: [
        {
          title: "Medical record integration:",
          body:
            "Build your clinical & personal knowledge base without sharing it with third parties.",
        },
        {
          title: "Pre-scenario recommendations:",
          body: "When, how much, and in what environment to consume safely.",
        },
        {
          title: "Composition & feedback loop:",
          body: "Access resources breaking down how each substance is composed.",
        },
      ],
      barTitle: "Shroomed Assistant — Vault Active",
      agent: "Shroomed Agent:",
      msg1:
        "Hi Alex! I analyzed your medical vault and your focus goals for this week. What would you like to explore today?",
      userMsg:
        "I'd like to check the recommended dosage to boost creativity without affecting my sleep schedule.",
      recBadge: "Personalized Recommendation",
      recTitle: "Creative Protocol • Recommended Dosage",
      recBody: "0.15g fasted (morning). Based on your logbook entry from June 12th.",
      recTags: ["✓ Zero insomnia", "✓ High focus"],
      logStatus: "Logbook updating with your daily sensations...",
    },
    science: {
      tag: "— TOTAL CONTROL & PROVEN SAFETY",
      title: "SAFE DECISIONS, REAL OUTCOMES",
      cards: [
        {
          icon: "🔒",
          title: "Your Vault, Your Rules",
          body:
            "Private encryption. Your clinical history, substance logs, and journal are never shared or sold. 100% privacy guaranteed.",
        },
        {
          icon: "⚡",
          title: "Zero Blind Guesswork",
          body:
            "Avoid dangerous drug interactions. Get exact composition, contraindications, and ideal dosage for your body before deciding.",
        },
        {
          icon: "📈",
          title: "Continuous Optimization",
          body:
            "Track your feelings, adjust your protocol in real-time, and maximize your well-being results without trial and error.",
        },
      ],
    },
    cta: {
      title: "BE AMONG THE FIRST TO TRY IT",
      subtitle:
        "Join the early explorers gaining exclusive access to the Shroomed AI assistant and your personalized knowledge vault.",
      placeholder: "Enter your email address...",
      submit: "RESERVE MY SPOT! 🚀",
      disclaimer: "🔒 We will never share your email. 100% privacy respected.",
    },
    footer: {
      tagline: "Personalized platform & intelligent pharmaco-assistant.",
      brandbook: "— BRANDBOOK 2026",
      copyright: "© 2026 Shroomed. All rights reserved.",
    },
    toast: {
      hero: "You have joined the private beta! 🍄",
      final: "Spot reserved! We'll reach out soon. 🚀",
    },
    langSwitch: { toEn: "🇺🇸 EN", toEs: "🇪🇸 ES" },
  },
};
