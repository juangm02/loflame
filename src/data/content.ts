export type Lang = "es" | "en";

export interface Bilingual {
  es: string;
  en: string;
}

/** A processSection placeholder slot with a real clip attached (see
 * lib/caseStudyMedia.ts, resolved by `videoKey`) instead of the usual
 * "pendiente de anexar" dashed box. */
export interface PlaceholderVideo {
  videoKey: string;
  alt: Bilingual;
}

/** Same idea as PlaceholderVideo, but for a static image (see
 * lib/caseStudyMedia.ts's caseStudyImages, resolved by `imageKey`). */
export interface PlaceholderImage {
  imageKey: string;
  alt: Bilingual;
}

const t = (es: string, en: string): Bilingual => ({ es, en });

export const site = {
  name: "Juan García Márquez",
  email: "juangarmarquez@gmail.com",
  phone: "(+34) 610 90 27 71",
  location: t("Barcelona, España", "Barcelona, Catalunya"),
  behance: "GarciaMJ",
  linkedin: "Juan García Márquez",
};

export const nav = {
  portfolio: t("Portafolio", "Portfolio"),
  curriculum: t("Currículum", "Curriculum"),
  aboutMe: t("Sobre mí", "About me"),
  myProjects: t("Mis Proyectos", "My projects"),
  back: t("Volver", "Back"),
  backToTop: t("Volver arriba", "Back to top"),
};

export const cta = {
  talk: t("¿Algún proyecto en mente? ¡Hablemos!", "Have a project in mind? Let's talk!"),
  goToProject: t("Ver proyecto", "Go to project"),
  underConstruction: t("Caso de estudio en construcción", "Case study under construction"),
  goToFigma: t("Ir al archivo de Figma", "Go to Figma file"),
  exploreProcess: t("¡Explora el resto de mi proceso de pensamiento!", "Explore the rest of my thought process!"),
  exploreProcessSub: t(
    "Puedes ver el resto del proceso y los diseños detallados directamente en el archivo de Figma.",
    "You can view the full process and detailed designs directly in the Figma file."
  ),
};

export const curriculumPage = {
  kicker: t("Currículum Vitae", "Curriculum Vitae"),
  headline: t(
    "25 años siendo impulsado por la curiosidad,",
    "25 years driven by curiosity,"
  ),
  subline: t(
    "4 años aplicándola a la resolución de problemas",
    "4 years applying it to problem-solving"
  ),
  bigLabel: t("Diseño\nVisual", "Visual\nDesign"),
  softSkillsTitle: t("Aptitudes", "Soft Skills"),
  softSkills: [
    t("Resolución creativa de problemas", "Creative problem-solving"),
    t("Colaboración y comunicación interfuncional", "Collaboration & Cross-functional communication"),
    t("Pensamiento crítico y estratégico", "Critical & strategic thinking"),
    t("Adaptabilidad", "Adaptability"),
    t("Aprendizaje activo", "Active learning"),
    t("Autoconciencia y mejora continua", "Self-awareness & Self-improvement"),
    t("Enfoque centrado en el usuario", "User-centered mindset"),
    t("Resiliencia", "Resilience"),
    t("Responsabilidad", "Responsibility"),
    t("Enfoque en la calidad/Precisión en el diseño", "Quality focus/Design accuracy"),
  ],
  languagesTitle: t("Idiomas", "Languages"),
  languages: [
    t("Español (Nativo)", "Spanish (Native)"),
    t("Inglés (Avanzado)", "English (Advanced)"),
  ],
  educationTitle: t("Educación", "Education"),
  education: [
    {
      title: t("Pregrado en Diseño Visual", "Bachelor's Degree in Visual Design"),
      place: t("Universidad de Caldas, Colombia", "Caldas University, Colombia"),
      date: "(2018-2023)",
    },
    {
      title: t(
        "Máster en Investigación e Innovación en Diseño para Experiencias Digitales",
        "Master's Degree in Design Research and Innovation for Digital Experiences"
      ),
      place: t("LCI Barcelona, España", "LCI Barcelona, Spain"),
      date: "(Oct2025-Jun2026)",
    },
  ],
  experienceTitle: t("Experiencia", "Experience"),
  experience: [
    { title: t("Freelancer", "Freelancer"), date: "(2019-Activo)" },
    { title: t("Diseñador Gráfico para Ecologic Style", "Graphic designer for Ecologic Style"), date: "(2020-2022)" },
    {
      title: t("Pasantía de Diseño para Consultorio de Diseño, Manizales", "Design internship for Consultorio de Diseño, Manizales"),
      date: "(Feb2023-Ago2023)",
    },
    { title: t("Product Designer para DataScope.io", "Product Designer for DataScope.io"), date: "(Ene2024-Oct2024)" },
    {
      title: t("Product Designer para Grancolombiana de Dotaciones", "Product Designer for Grancolombiana de Dotaciones"),
      date: "(Sep2024-Sep2025)",
    },
    {
      title: t(
        "Product Designer para el Command Center del Hospital Sant Joan de Déu, Barcelona",
        "Product Designer for Hospital Sant Joan de Déu Command Center, Barcelona"
      ),
      date: "(Mar2026-Activo)",
    },
  ],
};

export const portfolioPage = {
  title: t("Diseñador\nde Producto\n(UX-UI)", "Product\nDesigner\n(UX-UI)"),
  subtitle: t(
    "con enfoque en el usuario y la experiencia end-to-end",
    "Focusing on user-centered design and end-to-end experience"
  ),
  intro: t(
    "Desde el primer insight en research hasta el último píxel del producto, mi trabajo se basa en encontrar oportunidades entre obstáculos. ¿Mi objetivo? Comunicar sin palabras, diseñar experiencias que agregan valor genuino como resultado.",
    "From the first research insight to the final pixel of the product, my work revolves around finding opportunities within obstacles. My goal? To communicate without words, designing experiences that deliver genuine value as a result."
  ),
  aboutTitle: t("Sobre Mí", "About me"),
  aboutBody: t(
    "Diseño de producto digital (UX/UI) con raíz en diseño visual, lo que me permite moverme sin fricción entre investigación, sistema y superficie. He trabajado en operaciones B2B de alta presión y sistemas clínicos donde un error de interfaz no es solo estético. Me interesa el diseño en contextos donde las decisiones importan.",
    "Digital product design (UX/UI) rooted in visual design, which lets me move frictionlessly between research, system, and surface. I've worked on high-pressure B2B operations and clinical systems where an interface error isn't just cosmetic. I'm drawn to design in contexts where decisions matter."
  ),
  tags: [
    "UX-UI",
    t("Design Thinking", "Design Thinking"),
    t("Interfaz de Usuario", "User interface"),
    t("Design Systems", "Design Systems"),
    t("Experiencia de Usuario", "User experience"),
    t("Producto Digital", "Digital product"),
    t("Usabilidad", "Usability"),
    t("Prototipado", "Prototyping"),
    t("User flows", "User flows"),
    t("Investigación con usuarios", "User research"),
    t("Motion Graphics", "Motion Graphics"),
    t("Diseño centrado en el usuario", "User-centered design"),
    t("Wireframing", "Wireframing"),
    t("Diseño Gráfico", "Graphic design"),
    t("Co-creación", "Co-creation"),
    t("Service Design", "Service Design"),
    t("Data-centered design", "Data-centered design"),
    t("Agile teams", "Agile teams"),
    t("Storytelling", "Storytelling"),
  ],
  tools: [
    { name: "Figma", mono: "Fi", color: "#7B61FF" },
    { name: "Claude Code", mono: "CC", color: "#D97757" },
    { name: "GitHub", mono: "Gh", color: "#333333", colorDark: "#6e7681" },
    { name: "NotebookLM", mono: "NL", color: "#4285F4" },
    { name: "Maze", mono: "Mz", color: "#FF5A36" },
    { name: "Illustrator", mono: "Ai", color: "#FF9A00" },
    { name: "After Effects", mono: "Ae", color: "#9999FF" },
  ],
  projectsTitle: t("Mis Proyectos", "My projects"),
};

export interface ProjectMeta {
  slug: string;
  logo: string;
  cover: string;
  name: string;
  tags: Bilingual[];
  year: string;
  location: Bilingual;
  description: Bilingual;
  disabled?: boolean;
  /** Hides the project from the Portfolio list and every case study's nav
   * tabs — unlike `disabled` (still shown, just marked "under
   * construction"), this removes it from navigation entirely. The case
   * study page/route and content stay intact, just unlinked. */
  hidden?: boolean;
  accent: string;
  /** Optional dark-mode override for `accent`, used when the light-mode hex
   * fails contrast against the dark-mode page background (#131316). See the
   * 2026-02 accessibility pass notes. */
  accentDark?: string;
}

export interface CaseStudyContent {
  slug: string;
  navLabel: Bilingual;
  tagline?: string;
  headline: Bilingual;
  briefTitle: Bilingual;
  briefParagraphs: Bilingual[];
  heroImages?: Bilingual[];
  meta: {
    company: Bilingual;
    period?: Bilingual;
    role: Bilingual;
    roleDetail: Bilingual;
    team: Bilingual[];
  };
  approachTitle: Bilingual;
  approach: Bilingual;
  /** Real photo for the Design approach section's decorative square block
   * (see lib/caseStudyMedia.ts's caseStudyImages), replacing the generic
   * accent-gradient block. Only set where a real photo exists. */
  approachImage?: { key: string; alt: Bilingual };
  objectivesTitle: Bilingual;
  objectives: Bilingual[];
  objectivesPlaceholder?: Bilingual;
  /** Real before/after screen comparison for the Objectives section
   * (see lib/caseStudyMedia.ts's caseStudyComparativaImages), rendered as
   * a pinned scroll sequence instead of the plain objectivesPlaceholder
   * box. Only set where the images actually exist. */
  objectivesComparativa?: { beforeAlt: Bilingual; afterAlt: Bilingual };
  solvingTitle?: Bilingual;
  solving?: Bilingual;
  scope?: { title: Bilingual; body: Bilingual };
  designChallenge?: { title: Bilingual; body: Bilingual };
  whoTitle?: Bilingual;
  who?: Bilingual;
  needsTitle?: Bilingual;
  needs?: Bilingual[];
  confidentiality?: Bilingual;
  designThinking?: { phase: Bilingual; items: Bilingual[] }[];
  processSections?: {
    title: Bilingual;
    body: Bilingual;
    bullets?: Bilingual[];
    placeholders?: (Bilingual | PlaceholderVideo | PlaceholderImage)[];
    highlight?: boolean;
  }[];

  research?: {
    title: Bilingual;
    subtitle: Bilingual;
    body: Bilingual;
    segmentationNote?: Bilingual;
    placeholder?: Bilingual;
    categories?: { title: Bilingual; questions: Bilingual[] }[];
    quotes?: Bilingual[];
  };
  problemStatement?: {
    title: Bilingual;
    intro: Bilingual;
    quote: Bilingual;
    detail: Bilingual;
    tags: Bilingual[];
  };
  architecture?: {
    title: Bilingual;
    body: Bilingual;
    placeholder?: Bilingual;
    tree?: {
      root: Bilingual;
      branches: { title: Bilingual; groups: { title: Bilingual; items: Bilingual[] }[] }[];
    };
  };
  prototype?: {
    title: Bilingual;
    body: Bilingual;
    placeholder?: Bilingual;
    embedUrl?: string;
    mockup?: {
      appName: string;
      tabs: string[];
      cards: { title: Bilingual; tags: string[]; date: string }[];
      detail: {
        title: Bilingual;
        body: Bilingual;
        avatarCount: number;
      };
      notes: { text: Bilingual; author: string; color: string }[];
    };
  };
  reflection?: {
    title: Bilingual;
    body: Bilingual;
    paragraphs?: Bilingual[];
    placeholder?: Bilingual;
    pullQuote?: Bilingual;
  };
  opportunities?: {
    title: Bilingual;
    subtitle: Bilingual;
    body: Bilingual;
    findings?: Bilingual[];
  };
  reideate?: {
    title: Bilingual;
    subtitle: Bilingual;
    body: Bilingual;
  };
  onboarding?: {
    title: Bilingual;
    body: Bilingual;
    placeholder?: Bilingual;
  };
  featureShowcase?: {
    title: Bilingual;
    subtitle: Bilingual;
    features: {
      title: Bilingual;
      subtitle?: Bilingual;
      body: Bilingual;
      bullets?: { title: Bilingual; body: Bilingual }[];
      status?: Bilingual;
      placeholder: Bilingual;
    }[];
  };
  testimonials?: {
    title: Bilingual;
    subtitle: Bilingual;
    quotes: Bilingual[];
  };
}

export const caseStudyNav: Bilingual[] = [
  t("Potenciando core features", "Enhancing core features"),
  t("Experiencia en sistemas de gestión", "Experience in management systems"),
  t("Plataformas para creativos", "Platform for creatives"),
  t("Estrategia y datos en entornos clínicos", "Strategy & data in clinical contexts"),
  t("Mediación inmersiva en archivos culturales", "Immersive mediation in cultural archives"),
];

export const projects: ProjectMeta[] = [
  {
    slug: "datascope",
    logo: "datascope",
    cover: "datascope",
    name: "DataScope.io",
    tags: [t("End-to-end product designer", "End-to-end product designer"), t("100K+ descargas", "100K+ downloads")],
    year: "2024",
    location: t("Chile", "Chile"),
    description: t(
      "Esta plataforma B2B permite a sus usuarios digitalizar y gestionar operaciones diarias como chequeos de calidad, monitoreo de seguridad, inventarios, órdenes de trabajo, entre otros. Dentro de este ecosistema complejo, los usuarios operan en contextos de alta presión, donde el tiempo, la claridad en la interfaz y la usabilidad de sus herramientas son factores críticos.",
      "This B2B platform enables organizations to digitize and manage operational workflows, including quality inspections, safety monitoring, inventory management, and work orders. Within this complex ecosystem, users perform time-sensitive tasks in high-pressure environments, making interface clarity, efficiency, and usability essential to their daily work."
    ),
    accent: "#2C6EF2",
  },
  {
    slug: "corigin",
    logo: "corigin",
    cover: "corigin",
    name: "Corigin",
    tags: [t("Prueba técnica · Flare BBDO", "Technical test · Flare BBDO"), t("Design systems", "Design systems")],
    year: "2025",
    location: t("Colombia", "Colombia"),
    description: t(
      "Corigin nace como respuesta a un reto común en diseñadores, creativos, estrategas y estudiantes: las ideas aparecen rápido, en momentos inesperados y en formatos diversos, pero los sistemas actuales no permiten capturarlas, reorganizarlas y visualizarlas de la forma caótica, flexible y visual en la que realmente piensa una mente creativa.",
      "Corigin was born as a response to a common challenge experienced by designers, creatives, strategists, and students: ideas emerge rapidly, at unexpected moments, and in multiple formats, yet existing tools are not designed to capture, organize, and visualize them in the non-linear, flexible, and visual way that reflects how creative thinking actually works."
    ),
    accent: "#6C63FF",
  },
  {
    slug: "juicio",
    logo: "juicio",
    cover: "juicio",
    name: "We Are Juicio",
    tags: [t("Freelance UX-UI", "Freelance UX-UI"), t("Eficiencia operativa", "Operational efficiency")],
    year: "2024",
    location: t("Colombia", "Colombia"),
    description: t(
      "Este proyecto fue desarrollado como un ejercicio de diseño basado en un escenario de negocio realista, enfocado en resolver problemas de operación y gestión en un restaurante de comida rápida. La dueña abrió Juicio durante la pandemia en 2020 y, desde entonces, ha ganado gran popularidad en la zona, aumentando considerablemente su carga de trabajo.",
      "This project was developed as a design exercise based on a realistic business scenario, focused on solving operational and management challenges in a fast-food restaurant. The owner launched Juicio during the COVID-19 pandemic in 2020, and since then the business has become increasingly popular, leading to a significant increase in workload."
    ),
    accent: "#1B2A6B",
    accentDark: "#5468C6",
    hidden: true,
  },
  {
    slug: "hospital-sjd",
    logo: "hospital",
    cover: "hospital",
    name: "Hospital Sant Joan de Déu | Estrategia digital y datos",
    tags: [t("Product Designer", "Product Designer"), t("18 pantallas · Command Center", "18 screens · Command Center")],
    year: "2026",
    location: t("España", "Spain"),
    description: t(
      "Sistema de monitorización clínica en tiempo real, diseñado para gran formato y lectura a distancia, dentro del Clinical Command Center del hospital.",
      "Real-time clinical monitoring system, designed for large-format displays and long-distance reading, inside the hospital's Clinical Command Center."
    ),
    disabled: false,
    accent: "#D62E5C",
  },
  {
    slug: "arrelat",
    logo: "arrelat",
    cover: "arrelat",
    name: "Arrelat",
    tags: [
      t("Experiencia inmersiva (VR)", "Immersive experience (VR)"),
      t("Tesis de máster · Foto Colectania", "Master's thesis · Foto Colectania"),
    ],
    year: "2025-2026",
    location: t("España", "Spain"),
    description: t(
      "Una experiencia inmersiva de archivo para fotografías que no pueden mostrarse físicamente, que construye significado a través del contexto y la interpretación.",
      "An immersive archival experience for photographs that cannot be shown physically, building meaning through context and interpretation."
    ),
    disabled: false,
    accent: "#C9A66B",
  },
];

export const caseStudies: Record<string, CaseStudyContent> = {
  datascope: {
    slug: "datascope",
    navLabel: caseStudyNav[0],
    headline: t(
      "Intervenciones UX que afinan las capacidades del producto y potencian el impacto y la experiencia de las funciones clave en el día a día del usuario",
      "UX interventions that sharpen product capabilities and boost the impact and experience of key features in the user's daily work"
    ),
    briefTitle: t("Brief de diseño", "Design Brief"),
    briefParagraphs: [
      t(
        "Esta plataforma B2B permite a sus usuarios digitalizar y gestionar operaciones diarias como chequeos de calidad, monitoreo de seguridad, inventarios, órdenes de trabajo, entre otros. Dentro de este ecosistema complejo, los usuarios operan en contextos de alta presión, donde el tiempo, la claridad en la interfaz y la usabilidad de sus herramientas son factores críticos.",
        "This B2B platform enables organizations to digitize and manage daily operations such as quality checks, safety monitoring, inventories, and work orders. Within this complex ecosystem, users operate in high-pressure contexts, where time, interface clarity, and usability of their tools are critical factors."
      ),
      t(
        "Los flujos actuales fueron en gran parte diseñados por perfiles técnicos con conocimientos limitados en UX, por lo que había features que generaban fricciones en la experiencia de usuario, bajo nivel de adopción en ciertas funcionalidades y una percepción de complejidad innecesaria. Como diseñador UX/UI, mi rol ha sido intervenir estratégicamente en estas áreas críticas, rediseñando componentes clave de la experiencia con foco en claridad, eficiencia, y alineación con los objetivos operativos del negocio.",
        "The existing flows were largely designed by technical profiles with limited UX knowledge, so some features created friction, low adoption, and a perception of unnecessary complexity. As UX/UI designer, my role has been to strategically intervene in these critical areas, redesigning key components of the experience with a focus on clarity, efficiency, and alignment with the business's operational goals."
      ),
    ],
    meta: {
      company: t("Anónimo", "Anonymous"),
      role: t("Product Designer", "Product Designer"),
      roleDetail: t(
        "Responsable de research, conceptualización, diseño, prototipado, tests de usabilidad y colaboración con Desarrollo",
        "Responsible for research, conceptualization, design, prototyping, usability testing and collaboration with Development"
      ),
      team: [
        t("Product Manager", "Product Manager"),
        t("Lead Product Designer", "Lead Product Designer"),
        t("Product Designer", "Product Designer"),
        t("QA tester", "QA tester"),
      ],
    },
    approachTitle: t("Design approach", "Design approach"),
    approach: t(
      "Mi enfoque de diseño en esta empresa parte de entender los flujos operativos que atraviesan los usuarios y sus equipos en terreno y en oficina, para luego traducirlos en experiencias digitales claras y alineadas con los objetivos del negocio. Así, encuentro los puntos de fricción en la interacción con herramientas como formularios digitales, asignación de tareas, órdenes de trabajo y reportes automatizados, para luego rediseñar esas experiencias centrándome en usabilidad y escalabilidad para implementación en web y mobile.",
      "My design approach here starts by understanding the operational flows users and teams go through, in the field and in the office, then translating them into clear digital experiences aligned with business goals. I locate friction points in tools such as digital forms, task assignment, work orders and automated reports, then redesign those experiences focusing on usability and scalability across web and mobile."
    ),
    objectivesTitle: t("Objetivos", "Objectives"),
    objectives: [
      t(
        "Aumentar la claridad y usabilidad en flujos clave como la gestión de tareas asignadas, la configuración de notificaciones por email, y la integración con hojas de cálculo externas.",
        "Increase clarity and usability in key flows such as assigned task management, email notification settings, and integration with external spreadsheets."
      ),
      t(
        "Reducir fricciones para los operarios y usuarios no técnicos, facilitando el uso de la plataforma incluso en contextos donde los equipos están dispersos en varias ubicaciones.",
        "Reduce friction for operators and non-technical users, making the platform usable even when teams are spread across multiple locations."
      ),
      t(
        "Garantizar consistencia visual e interacción intuitiva en un ecosistema con múltiples roles, jerarquías y permisos.",
        "Ensure visual consistency and intuitive interaction across an ecosystem with multiple roles, hierarchies and permissions."
      ),
    ],
    solvingTitle: t("¿Qué estamos resolviendo?", "What are we solving?"),
    solving: t(
      "Estamos resolviendo la ineficiencia en la ejecución, seguimiento y visibilidad de tareas y formularios operativos. Antes de usar la plataforma, muchos de nuestros usuarios realizaban sus procesos de forma manual con papel y bolígrafo, desorganizada o en canales poco centralizados, lo que llevaba a errores, demoras y pérdida de trazabilidad.",
      "We're solving inefficiency in the execution, tracking and visibility of operational tasks and forms. Before the platform, many users ran their processes manually with paper and pen, in a disorganized way or through scattered channels, leading to errors, delays and loss of traceability."
    ),
    whoTitle: t("¿Para quién diseñamos?", "Who are we designing for?"),
    who: t(
      "Diseñamos para usuarios operativos y administrativos de empresas medianas y grandes, especialmente en sectores que requieren control de procesos, cumplimiento normativo y trazabilidad, como manufactura, seguridad, logística y servicios. Esto incluye roles como supervisores de terreno, técnicos que ejecutan tareas, coordinadores de calidad, y responsables de operaciones.",
      "We're designing for operational and administrative users at medium and large companies, especially in sectors that require process control, regulatory compliance and traceability, such as manufacturing, safety, logistics and services. This includes field supervisors, technicians executing tasks, quality coordinators and operations managers."
    ),
    needsTitle: t("¿Necesidades de los usuarios?", "User needs?"),
    needs: [
      t(
        "Asignar y recibir tareas de manera clara y ordenada, con instrucciones específicas, fechas límite y prioridades visibles.",
        "Assign and receive tasks clearly, with specific instructions, visible deadlines and priorities."
      ),
      t(
        "Completar formularios digitales de manera intuitiva desde dispositivos móviles, incluso en condiciones de conectividad limitada.",
        "Complete digital forms intuitively from mobile devices, even with limited connectivity."
      ),
      t(
        "Visualizar resultados en tiempo real, generando reportes automáticos y organizados para tomar decisiones ágiles.",
        "View results in real time, generating automatic, organized reports for agile decision-making."
      ),
      t(
        "Tener una plataforma confiable, sencilla y accesible, que se adapte a distintos roles y niveles de habilidad digital.",
        "Have a reliable, simple and accessible platform that adapts to different roles and digital skill levels."
      ),
      t(
        "Automatizar procesos operativos repetitivos mediante integraciones, reglas y notificaciones personalizadas.",
        "Automate repetitive operational processes through integrations, rules and custom notifications."
      ),
    ],
    confidentiality: t(
      "Debido a un acuerdo de confidencialidad con la empresa, solo puedo compartir información limitada sobre los proyectos en los que he trabajado. El material presentado ha sido cuidadosamente seleccionado para respetar ese acuerdo, sin comprometer detalles sensibles de negocio o implementación.",
      "Due to a confidentiality agreement with the company, I can only share limited information about the projects I've worked on. The material shown has been carefully selected to respect that agreement, without compromising sensitive business or implementation details."
    ),
    designThinking: [
      { phase: t("1 | Empatizar", "1 | Empathize"), items: [t("Entrevistas con usuarios", "User interviews")] },
      {
        phase: t("2 | Definir", "2 | Define"),
        items: [
          t("Análisis de insights y cuellos de botella", "Insight analysis and bottlenecks"),
          t("Definición de PRD", "PRD definition"),
          t("User stories", "User stories"),
        ],
      },
      {
        phase: t("3 | Idear", "3 | Ideate"),
        items: [
          t("Benchmark", "Benchmark"),
          t("Bocetado lo-fi y validación", "Lo-fi sketching and validation"),
          t("Diseño de flujos y edge cases", "Flow and edge-case design"),
        ],
      },
      { phase: t("4 | Prototipar", "4 | Prototype"), items: [t("Prototipado y storytelling", "Prototyping and storytelling")] },
      {
        phase: t("5 | Testear", "5 | Test"),
        items: [
          t("Diseño de tests de usabilidad", "Usability test design"),
          t("Aplicación con stakeholders y usuarios", "Sessions with stakeholders and users"),
          t("Iteración y colaboración con Desarrollo", "Iteration and collaboration with Development"),
        ],
      },
    ],
    research: {
      title: t("Escuchando antes de construir", "Listening before building"),
      subtitle: t(
        "Empatizar con los usuarios detrás de la operación",
        "Empathizing with the users behind the operation"
      ),
      body: t(
        "Comenzamos saliendo del escritorio para acercarnos a quienes usan la plataforma: operarios, supervisores, coordinadores. A través de entrevistas, mapeamos frustraciones, hábitos y atajos reales. Para ello, diseñamos unas encuestas que nos ayudarían a recoger insights significativos y también a cuantificar la percepción general de nuestros usuarios con respecto a la plataforma y sus features.",
        "We started by stepping away from the desk to get closer to the people who actually use the platform: operators, supervisors, coordinators. Through interviews, we mapped real frustrations, habits and workarounds. To support this, we designed surveys that would help us gather meaningful insights and quantify our users' general perception of the platform and its features."
      ),
      segmentationNote: t(
        "Las preguntas fueron segmentadas según tres aspectos principales que nos ayudaron a orientar nuestra etapa de empatización.",
        "The questions were segmented into three main areas that helped guide our empathize stage."
      ),
      placeholder: t(
        "Plantilla de encuesta y desglose por categorías (general/actitudinal, basado en uso, basado en features), pendiente de anexar captura.",
        "Survey template and category breakdown (general/attitudinal, usage-based, feature-based), screenshot pending."
      ),
    },
    opportunities: {
      title: t("Definiendo nuestras oportunidades", "Defining our opportunities"),
      subtitle: t("Detectar los nudos del sistema", "Spotting the system's pain points"),
      body: t(
        "Durante la etapa de definición, descubrimos que la experiencia estaba siendo obstaculizada por factores estructurales. Como resultado, algunas funcionalidades principales de la plataforma no estaban siendo utilizadas y, por ende, no registraban datos valiosos.",
        "During the define stage, we discovered the experience was being held back by structural factors. As a result, some of the platform's core features weren't being used, and therefore weren't capturing valuable data."
      ),
      findings: [
        t(
          "Dificultades en la interacción y baja accesibilidad a la información clave.",
          "Interaction difficulties and low accessibility to key information."
        ),
        t(
          "Falta de automatización que forzaba a los usuarios a buscar soluciones externas.",
          "Lack of automation that forced users to look for external workarounds."
        ),
      ],
    },
    reideate: {
      title: t("Re-ideando lo esencial", "Re-ideating the essentials"),
      subtitle: t(
        "Formular la experiencia desde las necesidades reales de nuestros usuarios",
        "Shaping the experience around our users' real needs"
      ),
      body: t(
        "A partir de benchmarks, bocetos y validaciones tempranas, exploramos formas de reducir fricciones sin perder la robustez que exige una plataforma empresarial. Diseñamos flujos centrados en casos reales de uso y edge cases, asegurándonos de que cada funcionalidad respondiera con precisión a las dinámicas diarias de operarios, supervisores y equipos distribuidos.",
        "Based on benchmarks, sketches and early validations, we explored ways to reduce friction without losing the robustness an enterprise platform demands. We designed flows centered on real use cases and edge cases, making sure every feature precisely matched the daily dynamics of operators, supervisors and distributed teams."
      ),
    },
    onboarding: {
      title: t("Guía de onboarding", "Onboarding guide"),
      body: t(
        "Diseñamos una experiencia de introducción a la plataforma que guía a los usuarios paso a paso según su rol y nivel técnico. El onboarding se activa de forma contextual al momento de usar funcionalidades críticas como la creación de formularios de inspección, asignación de tareas, el registro de hallazgos y la conexión a integraciones, garantizando que incluso los operarios menos familiarizados con herramientas digitales puedan completar sus procesos sin bloqueos.",
        "We designed an introductory experience that guides users step by step based on their role and technical level. Onboarding triggers contextually when critical features are used (creating inspection forms, assigning tasks, logging findings, connecting integrations), so that even operators less familiar with digital tools can complete their processes without getting stuck."
      ),
      placeholder: t(
        "Capturas de la guía de onboarding contextual, pendiente de anexar.",
        "Contextual onboarding guide screenshots, pending."
      ),
    },
    featureShowcase: {
      title: t("Diseño lo-fi", "Lo-fi design"),
      subtitle: t("Rediseño web y mobile", "Web and mobile redesign"),
      features: [
        {
          title: t("Tareas Asignadas", "Assigned Tasks"),
          body: t(
            "La feature de Tareas Asignadas permite distribuir responsabilidades de manera clara y trazable dentro de la operación. Los supervisores pueden asignar formularios de inspección a distintos usuarios, asegurando que cada reporte registrado en terreno tenga seguimiento, resolución y evidencia documentada. Esto no solo mejora la eficiencia, sino que también activa el uso de la plataforma como centro de coordinación.",
            "The Assigned Tasks feature distributes responsibilities clearly and traceably across the operation. Supervisors can assign inspection forms to different users, making sure every report logged in the field has follow-up, resolution and documented evidence. This not only improves efficiency but also drives adoption of the platform as a coordination hub."
          ),
          status: t("Arrastra para ver más", "Drag to see more"),
          placeholder: t(
            "Carrusel de pantallas de Tareas Asignadas (web y mobile), pendiente de anexar.",
            "Assigned Tasks screen carousel (web and mobile), pending."
          ),
        },
        {
          title: t("Cronograma de Tareas Asignadas", "Assigned Tasks Timeline"),
          body: t(
            "Actualmente, la programación y visualización de tareas dentro de la plataforma se realiza exclusivamente a través de una tabla que, si bien se ve ordenada, dificulta la comprensión rápida del estado y distribución de las actividades. La implementación de una vista tipo calendario elevará significativamente la accesibilidad y usabilidad de esta funcionalidad, promoviendo su adopción y uso activo entre los equipos operativos y administrativos.",
            "Right now, scheduling and visualizing tasks on the platform happens exclusively through a table: orderly, but not great for quickly grasping the status and distribution of activities. Adding a calendar-style view will significantly raise the accessibility and usability of this feature, driving adoption among operational and administrative teams."
          ),
          status: t("Otro proyecto destacado (aún no liberado)", "Other project highlight (not yet released)"),
          placeholder: t("Mockup de vista tipo calendario, pendiente de anexar.", "Calendar-view mockup, pending."),
        },
        {
          title: t("Firmas", "Signatures"),
          subtitle: t("Asegurando la legitimidad de los reportes", "Ensuring reports are legitimate"),
          body: t(
            "La feature de Firmas permite que los documentos digitales de la plataforma puedan ser firmados por los supervisores y jefes correspondientes, garantizando trazabilidad y control en cada etapa del flujo operativo. Aunque la funcionalidad ya existía, su bajo nivel de flexibilidad provocaba que muchos usuarios optaran por trasladar sus documentos a plataformas externas o acudieran a malas prácticas para gestionarlos y firmarlos. Para impulsar el uso de esta core feature, trabajamos en las siguientes soluciones:",
            "The Signatures feature lets digital documents on the platform be signed by the relevant supervisors and managers, ensuring traceability and control at every stage of the operational flow. The feature already existed, but its low flexibility pushed many users to move their documents to external platforms or resort to bad practices to manage and sign them. To drive adoption of this core feature, we worked on the following solutions:"
          ),
          bullets: [
            {
              title: t("Preconfiguración de firmantes", "Signer pre-configuration"),
              body: t(
                "Permite automatizar flujos recurrentes al definir previamente quién debe firmar.",
                "Automates recurring flows by defining in advance who needs to sign."
              ),
            },
            {
              title: t("Firma a usuarios externos", "Signatures for external users"),
              body: t(
                "Abre la posibilidad de colaboración segura con personas fuera de la organización, sin necesidad de registro.",
                "Opens up secure collaboration with people outside the organization, no account required."
              ),
            },
            {
              title: t("Secuencia de firmas", "Signature sequencing"),
              body: t(
                "Permite establecer un orden jerárquico en la validación, ideal para procesos con múltiples responsables.",
                "Sets a hierarchical validation order, ideal for processes with multiple stakeholders."
              ),
            },
          ],
          status: t("Otro proyecto destacado (aún no liberado)", "Other project highlight (not yet released)"),
          placeholder: t("Flujo de firmas rediseñado, pendiente de anexar.", "Redesigned signature flow, pending."),
        },
        {
          title: t("Integraciones", "Integrations"),
          subtitle: t("Automatizando la recolección de datos", "Automating data collection"),
          body: t(
            "La funcionalidad de Integraciones permite a los usuarios automatizar el flujo de información entre la plataforma y otros sistemas, garantizando que los datos capturados en terreno estén disponibles donde realmente se necesitan, sin pasos intermedios manuales. Conectores principales:",
            "The Integrations feature lets users automate the flow of information between the platform and other systems, making sure data captured in the field is available wherever it's actually needed, with no manual middle steps. Main connectors:"
          ),
          bullets: [
            {
              title: t("Integración con Google Spreadsheets", "Google Spreadsheets integration"),
              body: t(
                "Cada vez que se responde un formulario digital, los datos se registran automáticamente en una hoja de cálculo en tiempo real. El usuario puede vincular un spreadsheet y configurar columnas dinámicas basadas en las preguntas del formulario, facilitando el análisis inmediato y el trabajo colaborativo.",
                "Every time a digital form is submitted, the data is automatically logged into a spreadsheet in real time. Users can link a spreadsheet and configure dynamic columns based on the form's questions, making immediate analysis and collaborative work easier."
              ),
            },
            {
              title: t("Integración vía Webhooks personalizados", "Custom Webhooks integration"),
              body: t(
                "Para flujos más avanzados o sistemas propios, la plataforma permite configurar Webhooks que envían datos automáticamente a endpoints externos cada vez que se genera una nueva respuesta. Esto habilita integraciones con ERPs, CRMs, dashboards u otros sistemas internos de la empresa.",
                "For more advanced flows or in-house systems, the platform allows configuring Webhooks that automatically send data to external endpoints whenever a new response is generated. This enables integrations with ERPs, CRMs, dashboards or other internal company systems."
              ),
            },
          ],
          status: t("Otro proyecto destacado (aún no liberado)", "Other project highlight (not yet released)"),
          placeholder: t("Diagrama de integraciones, pendiente de anexar.", "Integrations diagram, pending."),
        },
      ],
    },
    testimonials: {
      title: t("Peer-to-peer feedback", "Peer-to-peer feedback"),
      subtitle: t("(Líderes y programadores)", "(Leads and engineers)"),
      quotes: [
        t(
          "Juan es colaborativo y siempre está disponible para resolver dudas. Tiene buena disposición y entrega diseños alineados al branding de la empresa.",
          "Juan is collaborative and always available to solve doubts. He has a great attitude and delivers designs aligned with the company's branding."
        ),
        t(
          "Su actitud positiva y energía han dinamizado el equipo de Producto.",
          "His positive attitude and energy have energized the Product team."
        ),
        t(
          "Demostró ser una persona proactiva y comprometida, con habilidades destacadas en UI/UX y un buen ojo para el detalle.",
          "He proved to be proactive and committed, with strong UI/UX skills and a great eye for detail."
        ),
        t(
          "Será un valioso recurso para cualquier organización que decida contar con su talento.",
          "He'll be a valuable asset to any organization that gets to work with his talent."
        ),
        t(
          "Aportó significativamente en el diseño de una nueva feature para nuestra SaaS que es usada hoy en día por +1000 usuarios mensuales.",
          "He contributed significantly to the design of a new feature for our SaaS, now used by 1000+ monthly users."
        ),
        t(
          "Refleja una gran capacidad para prototipar y diseñar UI's que sean amigables y entendibles por cualquier tipo de usuario.",
          "He shows a great ability to prototype and design UIs that are friendly and understandable for any type of user."
        ),
      ],
    },
  },
  corigin: {
    slug: "corigin",
    navLabel: caseStudyNav[2],
    headline: t(
      "Una plataforma creativa, por creativos y para creativos, para capturar, organizar y conectar ideas",
      "A creative platform, by creatives and for creatives, to capture, organize and connect ideas"
    ),
    briefTitle: t("Brief de diseño", "Design Brief"),
    briefParagraphs: [
      t(
        "Corigin nace como respuesta a un reto común en diseñadores, creativos, estrategas y estudiantes: las ideas aparecen rápido, de forma inesperada y en formatos diversos, pero las herramientas actuales no permiten capturarlas, reorganizarlas y visualizarlas de la forma caótica, flexible y visual en la que realmente piensa una mente creativa.",
        "Corigin was created in response to a common challenge among designers, creatives, strategists, and students: ideas appear quickly, unexpectedly, and in different formats, but current tools don't allow capturing, reorganizing, and visualizing them in the chaotic, flexible, and visual way in which creative minds actually think."
      ),
      t(
        "El objetivo fue diseñar una plataforma ligera e intuitiva, centrada en la forma en la que los usuarios generan conceptos de manera natural: no lineal, no rígida, profundamente visual y fácil de reestructurar.",
        "The goal was to design a light, intuitive platform centered around how users naturally generate concepts: non-linear, non-rigid, deeply visual, and easy to restructure."
      ),
    ],
    meta: {
      company: t("Flare BBDO (Prueba técnica)", "Flare BBDO (Technical test)"),
      role: t("Product Designer", "Product Designer"),
      roleDetail: t(
        "Responsable de research, conceptualización, design system, diseño lo-fi y hi-fi de pantallas, prototipado",
        "Responsible for research, conceptualization, design system, low-fi and hi-fi screens, prototyping"
      ),
      team: [t("Product Designer", "Product Designer")],
    },
    approachTitle: t("Design approach", "Design approach"),
    approach: t(
      "Este proyecto adoptó un enfoque híbrido entre design thinking y exploración creativa. En vez de imponer una estructura predefinida desde el inicio, el proceso partió de entender a profundidad los hábitos reales de trabajo de los creativos. La naturaleza caótica del pensamiento creativo guió las decisiones de producto, resultando en ciclos rápidos de boceto → prototipo → validación → iteración. A lo largo del proceso, alterné entre una visión macro del ecosistema al que pertenece Corigin y un foco micro en interacciones clave: cómo capturar una idea en 3 segundos, cómo se mueve una tarjeta en el canvas, cómo se etiquetan conceptos sin fricción.",
      "This project adopted a hybrid design approach, blending design thinking and creative exploration. Instead of imposing a predefined structure from the start, the process began by understanding the real working habits of creatives in depth. The chaotic nature of creative thinking guided the product decisions, resulting in rapid cycles of sketch → prototype → validation → iteration. Throughout the process, I alternated between a macro vision of the ecosystem Corigin belongs to, and a micro-focus on key interactions: how to capture an idea in 3 seconds, how a card moves on the canvas, how concepts can be tagged without friction."
    ),
    objectivesTitle: t("Objetivos", "Objectives"),
    objectives: [
      t(
        "Crear un espacio de captura rápida donde los usuarios puedan guardar ideas, imágenes o referencias con eficiencia, antes de olvidarlas.",
        "Create a rapid-capture space where users can save ideas, images, or references efficiently, before they disappear."
      ),
      t(
        "Permitir una organización flexible, adaptable a proyectos, clientes, temas o categorías, sin obligar a estructuras rígidas.",
        "Allow flexible organization, adaptable to projects, clients, themes, or categories, without forcing a rigid structure."
      ),
      t(
        "Facilitar la recuperación de ideas mediante búsqueda, etiquetas, filtros y vistas personalizadas que reduzcan la pérdida de conceptos.",
        "Facilitate idea retrieval through search, labels, filters, and personalized views that reduce concept loss."
      ),
    ],
    solvingTitle: t("¿Qué estamos resolviendo?", "What are we solving?"),
    solving: t(
      "Muchos creativos trabajan con flujos dispersos: ideas guardadas en WhatsApp, imágenes en la galería, notas en Notion, enlaces guardados en el navegador, conceptos en hojas sueltas o notas de voz. Este caos genera pérdida de ideas, falta de claridad y dificultad para convertir conceptos dispersos en proyectos coherentes. Corigin busca unificar todo ese proceso en un solo espacio visual y flexible.",
      "Many creatives work with scattered workflows: ideas saved in WhatsApp, images in the gallery, notes in Notion, links stored in the browser, concepts on loose pages or voice notes. This chaos leads to lost ideas, lack of clarity, and difficulty turning scattered concepts into coherent projects. Corigin aims to unify this entire process in a single visual, flexible space."
    ),
    whoTitle: t("¿Para quién diseñamos?", "Who are we designing for?"),
    who: t(
      "Diseñamos para creativos, redactores y diseñadores que generan ideas constantemente en distintos formatos: copywriters, estrategas, diseñadores y estudiantes que trabajan en equipos grandes, medianos o de forma independiente, y que necesitan un espacio propio para pensar sin estructuras rígidas.",
      "We're designing for creatives, writers and designers who constantly generate ideas in different formats: copywriters, strategists, designers and students working in large teams, small teams or independently, who need their own space to think without rigid structures."
    ),
    needsTitle: t("¿Necesidades de los usuarios?", "What are the user's needs?"),
    needs: [
      t(
        "Capturar rápidamente ideas sueltas, imágenes, frases o referencias antes de que desaparezcan.",
        "Capture ideas quickly (loose notes, images, phrases, or references) before they disappear."
      ),
      t("Organizar por proyecto o cliente, pero sin verse forzado a un sistema rígido.", "Organize by project or client, but without being forced into a rigid system."),
      t(
        "Alternar entre vista de “tarjetas” y “canvas libre” para dar soporte a distintas formas de pensar.",
        "Switch between a “cards” view and a “free canvas” to support different thinking styles."
      ),
      t(
        "Conectar conceptos visualmente e identificar relaciones y patrones emergentes.",
        "Connect concepts visually and identify relationships and emerging patterns."
      ),
      t(
        "Recuperar ideas intuitivamente mediante etiquetas, palabras clave o navegación por temas.",
        "Retrieve ideas intuitively through labels, keywords, or topic-based navigation."
      ),
    ],
    designThinking: [
      {
        phase: t("1 | Empatizar", "1 | Empathize"),
        items: [
          t("Entrevistas a creativos de distintas áreas", "Interviews with creatives from different areas"),
          t("Identificación de frustraciones comunes", "Identification of common frustrations"),
          t("Mapeo de herramientas y “hacks” usados en flujos creativos reales", "Mapping tools and hacks used in real creative workflows"),
        ],
      },
      {
        phase: t("2 | Definir", "2 | Define"),
        items: [
          t("Problem statement", "Problem statement"),
          t("How Might We", "How Might We"),
          t("User stories", "User stories"),
          t("Priorización en el PRD", "Prioritization in the PRD"),
        ],
      },
      {
        phase: t("3 | Idear", "3 | Ideate"),
        items: [
          t("Benchmark", "Benchmark"),
          t("Bocetos tempranos y validación lo-fi", "Early sketches and low-fi validation"),
          t("Exploración de interacción en canvas", "Exploration of canvas interaction"),
          t("Diseño de input para ideas rápidas y lentas", "Input design for rapid and slow ideas"),
          t("Sistema de tarjetas y estructura de etiquetado", "Card system and labeling structure"),
        ],
      },
      { phase: t("4 | Prototipar", "4 | Prototype"), items: [t("Prototipo de storytelling", "Storytelling prototype")] },
      {
        phase: t("5 | Testear", "5 | Test"),
        items: [
          t("Flujos de captura rápida", "Rapid-capture flows"),
          t("Navegación del dashboard", "Dashboard navigation"),
          t("Organización por proyecto o tema", "Organization by project or theme"),
        ],
      },
    ],
    research: {
      title: t("Observando el caos creativo", "Observing the creative chaos"),
      subtitle: t("Empatizar con los usuarios detrás de la creación", "Empathizing with the users behind the creation"),
      body: t(
        "Se realizaron entrevistas semiestructuradas a perfiles creativos clave. El objetivo fue entender sus flujos de trabajo, las herramientas que usan actualmente y los principales puntos de dolor que enfrentan. Las entrevistas incluyeron copywriters, redactores creativos y diseñadores con experiencia en entornos de ritmo acelerado, en equipos grandes, medianos e independientes.",
        "Semi-structured interviews were conducted with key creative profiles. The goal was to understand their workflows, the tools they currently use, and the main pain points they face. Interviews included copywriters, creative writers, and designers with experience in fast-paced environments across large, medium, and independent teams."
      ),
      segmentationNote: t(
        "La plantilla de entrevista se construyó para explorar los siguientes cuatro frentes.",
        "The template for applying the interviews was built aiming to discover the following."
      ),
      categories: [
        {
          title: t("Perfil general", "General profile"),
          questions: [
            t("¿A qué te dedicas actualmente?", "¿A qué te dedicas actualmente?"),
            t("¿Trabajas de forma freelance, en agencia o en empresa?", "¿Trabajas de forma freelance, en agencia o en empresa?"),
            t("¿Qué tipo de proyectos creativos sueles desarrollar?", "¿Qué tipo de proyectos creativos sueles desarrollar?"),
            t(
              "¿Qué tan frecuentemente generas nuevas ideas o conceptos?",
              "¿Qué tan frecuentemente generas nuevas ideas o conceptos?"
            ),
          ],
        },
        {
          title: t("Proceso creativo actual", "Current creative process"),
          questions: [
            t(
              "¿Qué haces cuando te llega un brief o necesitas generar una idea desde cero?",
              "¿Qué haces cuando te llega un brief o necesitas generar una idea desde cero?"
            ),
            t(
              "¿Dónde sueles anotar o guardar tus ideas cuando te llegan por primera vez?",
              "¿Dónde sueles anotar o guardar tus ideas cuando te llegan por primera vez?"
            ),
            t("¿Cómo organizas tus ideas por cliente o proyecto?", "¿Cómo organizas tus ideas por cliente o proyecto?"),
            t(
              "¿Guardas referencias visuales, links o archivos para inspirarte? ¿Dónde?",
              "¿Guardas referencias visuales, links o archivos para inspirarte? ¿Dónde?"
            ),
          ],
        },
        {
          title: t("Herramientas y dolores", "Tools and pain points"),
          questions: [
            t(
              "¿Qué herramientas usas para organizar tus ideas y materiales creativos?",
              "¿Qué herramientas usas para organizar tus ideas y materiales creativos?"
            ),
            t(
              "¿Qué problemas o incomodidades tienes con esas herramientas?",
              "¿Qué problemas o incomodidades tienes con esas herramientas?"
            ),
            t(
              "¿Qué te ha funcionado bien? ¿Qué herramientas o flujos disfrutas usar y por qué?",
              "¿Qué te ha funcionado bien? ¿Qué herramientas o flujos disfrutas usar y por qué?"
            ),
          ],
        },
        {
          title: t("Necesidades y oportunidades", "Needs and opportunities"),
          questions: [
            t(
              "Imagina que existe una plataforma pensada solo para creativos como tú. ¿Qué funcionalidades sí o sí debería tener?",
              "Imagina que existe una plataforma pensada solo para creativos como tú. ¿Qué funcionalidades sí o sí debería tener?"
            ),
            t(
              "¿Cómo te gustaría que se viera o sintiera una herramienta de ese tipo?",
              "¿Cómo te gustaría que se viera o sintiera una herramienta de ese tipo?"
            ),
            t(
              "¿Qué te ayudaría a mantenerte inspirado mientras trabajas en una idea?",
              "¿Qué te ayudaría a mantenerte inspirado mientras trabajas en una idea?"
            ),
            t(
              "¿Preferirías algo estructurado y formal o algo más libre y visual?",
              "¿Preferirías algo estructurado y formal o algo más libre y visual?"
            ),
          ],
        },
      ],
      quotes: [
        t(
          "Tengo carpetas por cliente. Pero las ideas como tal... están regadas en diferentes partes.",
          "I have folders by client. But the ideas themselves... they're scattered everywhere."
        ),
        t(
          "Necesito algo fluido. Que tenga estructura si quiero, pero que no me obligue.",
          "I need something fluid. Something that has structure if I want it, but doesn't force me into it."
        ),
        t(
          "Dinámico. Como un espacio donde fluyen las ideas, no como una carpeta de oficina.",
          "Dynamic. Like a space where ideas flow, not like an office folder."
        ),
        t(
          "Limpio, suave, inspirador. Como una mezcla entre cuaderno y galería.",
          "Clean, soft, inspiring. Like a mix between a notebook and a gallery."
        ),
      ],
    },
    problemStatement: {
      title: t("Cuando los patrones hablan", "When patterns speak"),
      intro: t(
        "Tras analizar el contexto y el comportamiento de los usuarios, el problema central se hizo evidente, enmarcado en un problem statement:",
        "After analyzing context and user behavior, the core problem became evident, framed in a problem statement:"
      ),
      quote: t(
        "Los creativos, como redactores y diseñadores, generan ideas constantemente, pero no cuentan con una herramienta diseñada específicamente para capturarlas, organizarlas y expandirlas de manera visual, fluida e inspiradora.",
        "Creatives such as writers and designers generate ideas constantly, but lack a tool specifically designed to capture, organize, and expand them visually, fluidly, and inspirationally."
      ),
      detail: t(
        "Actualmente, sus ideas viven dispersas entre múltiples plataformas (notas del celular, Drive, chats, Pinterest, etc.), lo que provoca dificultad para retomarlas con contexto y bloqueo creativo por el uso de herramientas rígidas o poco visuales.",
        "Their ideas currently live scattered across multiple platforms (phone notes, Drive, chats, Pinterest, etc.), causing difficulty retrieving them with context and creative block due to rigid or non-visual tools."
      ),
      tags: [
        t("Benchmark", "Benchmark"),
        t("How might we?", "How might we?"),
        t("User stories", "User stories"),
        t("Product Requirements Doc", "Product Requirements Doc"),
      ],
    },
    architecture: {
      title: t("Arquitectura en acción", "Architecture in action"),
      body: t(
        "La arquitectura y los primeros wireframes se desarrollaron para equilibrar claridad y libertad. Un menú lateral estable organiza proyectos y herramientas, mientras que un canvas central flexible permite capturar y reorganizar ideas. Los wireframes lo-fi validaron ese flujo, mostrando cómo los usuarios crean tarjetas rápidamente, mezclan texto e imágenes, y alternan entre una vista estructurada y un canvas libre. Esta fase se centró en asegurar que la experiencia se sintiera ligera, intuitiva y adaptable desde la primera interacción.",
        "The architecture and early wireframes were developed to balance clarity and freedom. A stable left-side menu organizes projects and tools, while a flexible central canvas allows users to capture and reorganize ideas. The low-fi wireframes validated this flow, showing how users create cards quickly, mix text and images, and switch between a structured view and a free canvas. This phase focused on ensuring the experience felt light, intuitive, and adaptable from the very first interaction."
      ),
      tree: {
        root: t("Inicio / Dashboard", "Home / Dashboard"),
        branches: [
          {
            title: t("Menú lateral", "Side menu"),
            groups: [
              {
                title: t("Buscador", "Search"),
                items: [
                  t("Input", "Input"),
                  t("Ícono (botón de búsqueda)", "Icon (search button)"),
                  t("Placeholder (“Introduce palabras clave, labels...”)", "Placeholder (“Enter keywords, labels...”)"),
                ],
              },
              {
                title: t("Lista vertical de proyectos (navegación rápida)", "Vertical project list (quick navigation)"),
                items: [t("Proyecto 1 (con su label)", "Project 1 (with its label)"), t("Proyecto 2, 3… n", "Project 2, 3… n")],
              },
              {
                title: t("Configuración", "Settings"),
                items: [t("Cerrar sesión", "Log out"), t("Espacios de equipo", "Team spaces"), t("Equipos", "Teams")],
              },
            ],
          },
          {
            title: t("Mis Proyectos", "My Projects"),
            groups: [
              {
                title: t("Proyecto A", "Project A"),
                items: [
                  t("Vista general del proyecto", "Project overview"),
                  t("Label de categoría (cliente, proyecto, tema, estado)", "Category label (client, project, topic, status)"),
                  t("Vista previa del canvas visual (doble clic para ampliar)", "Visual canvas preview (double-click to expand)"),
                  t("Vista previa de cajón de texto rápido (texto, imágenes, links...)", "Quick text drawer preview (text, images, links...)"),
                  t("Inspiración guardada por label", "Inspiration saved by label"),
                  t("Herramientas de bocetado, formas, dibujo, adjuntos, brainstorming", "Sketching tools, shapes, drawing, attachments, brainstorming"),
                  t("Compartir", "Share"),
                ],
              },
              { title: t("Proyecto B / Proyecto n", "Project B / Project n"), items: [t("…", "…")] },
              { title: t("Herramientas", "Tools"), items: [t("Conexiones, formas, dibujo…", "Connections, shapes, drawing…")] },
            ],
          },
          {
            title: t("Header", "Header"),
            groups: [
              {
                title: t("CTA Nueva idea", "New idea CTA"),
                items: [
                  t("Tab de escritura rápida →", "Quick-writing tab →"),
                  t("Input para: título, label, texto, imagen, link", "Input for: title, label, text, image, link"),
                  t("Tab de canvas libre con herramientas completas", "Free canvas tab with full toolset"),
                ],
              },
              { title: t("Logo", "Logo"), items: [] },
              {
                title: t("Tab “Mis Proyectos”", "“My Projects” tab"),
                items: [t("Espacio tipo canvas libre donde se ven todos los proyectos activos", "Free canvas-style space showing all active projects")],
              },
              {
                title: t("Tab “Inspiración”", "“Inspiration” tab"),
                items: [t("Feature tipo red social con publicaciones e inspiración por/para creativos", "Social feed-style feature with posts and inspiration by/for creatives")],
              },
              {
                title: t("Tab “Mi Perfil”", "“My Profile” tab"),
                items: [t("Inspiración guardada y mis publicaciones", "Saved inspiration and my posts")],
              },
            ],
          },
        ],
      },
    },
    prototype: {
      title: t("Del concepto a la prueba", "From concept to test"),
      body: t(
        "Tras explorar múltiples direcciones, el proceso convergió en una propuesta clara: una plataforma que equilibra velocidad, flexibilidad y estructura opcional. Con la arquitectura y las interacciones clave ya validadas, el siguiente paso fue materializar estas decisiones en un prototipo que permitiera visualizar la experiencia real del usuario y poner a prueba la esencia del producto.",
        "After exploring multiple directions, the process converged on a clear proposal: a platform that balances speed, flexibility, and optional structure. With the architecture and key interactions validated, the next step was to materialize these decisions into a prototype that would allow visualization of the real user experience and test the essence of the product."
      ),
      embedUrl:
        "https://www.figma.com/proto/LiOkALKdwhBI53DmtqJczD/UX-UI_PruebaTecnica_Flare?node-id=37-20763&viewport=-2432%2C-2880%2C0.11&t=wg0wKuhLkW327HQW-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=37%3A20763&page-id=0%3A1",
      mockup: {
        appName: "Corigin",
        tabs: ["Core", "Origin", "Profile"],
        cards: [
          {
            title: t("Guión para Deathstranding 2", "Script for Deathstranding 2"),
            tags: ["Kojima Productions", "Redacción", "Planeación"],
            date: "24/06/25",
          },
          {
            title: t("Storyboard para reel", "Storyboard for reel"),
            tags: ["Netflix Latam"],
            date: "24/06/25",
          },
          {
            title: t("Guión para podcast de Start-Up", "Script for Podcast in Start-Up"),
            tags: ["Grupo Éxito", "Redacción", "Briefing"],
            date: "24/06/25",
          },
          {
            title: t("Activación campaña BTL", "BTL campaign activation"),
            tags: ["Sony Music", "BTL", "Evento"],
            date: "24/06/25",
          },
        ],
        detail: {
          title: t("Guión para Deathstranding 2", "Script for Deathstranding 2"),
          body: t(
            "Desarrollo de un nuevo arco narrativo para Death Stranding 2. Se exploran nuevos personajes y se amplían las motivaciones de Sam y Lou en un mundo aún más fragmentado.",
            "Development of a new narrative arc for Death Stranding 2. New characters are explored, and Sam and Lou's motivations are expanded within an even more fragmented world."
          ),
          avatarCount: 7,
        },
        notes: [
          { text: t("¡Excelente trabajo equipo!!!", "Great job team!!!"), author: "Laura Venegas", color: "#EC4899" },
          { text: t("Nos ganamos el proyecto :’))))", "We got the project :’))))"), author: "Nicole Vargas", color: "#F97316" },
        ],
      },
    },
    reflection: {
      title: t("Lo que queda y lo que sigue", "What there is and what comes next"),
      body: t(
        "Corigin se consolidó como una propuesta que respeta la naturaleza no lineal del pensamiento creativo, ofreciendo un espacio donde las ideas pueden capturarse, moverse y evolucionar sin fricción. El proceso de investigación permitió entender cómo trabajan realmente los creativos y diseñar una experiencia que acompaña su flujo en lugar de restringirlo. Funcionalidades como Origin (concebida como un espacio dedicado al origen de las ideas) y la sección de perfil formaban parte de la visión inicial, pero ambas se movieron a etapas futuras para priorizar un producto más enfocado, ligero y testeable. Este proyecto sienta las bases de una herramienta que puede crecer en múltiples direcciones manteniendo su esencia: habilitar que las ideas nazcan, se conecten y encuentren su forma.",
        "Corigin was solidified as a proposal that respects the non-linear nature of creative thinking, offering a space where ideas can be captured, moved, and evolved without friction. The research process made it possible to understand how creatives actually work and design an experience that supports their flow rather than restricting it. While features like Origin (conceived as a dedicated space for the origin of ideas) and the profile section were part of the initial vision, both were moved to later stages to prioritize a more focused, lightweight, and testable product. This project lays the foundation for a tool that can grow in multiple directions while maintaining its core essence: enabling ideas to emerge, connect, and find their form."
      ),
    },
  },
  juicio: {
    slug: "juicio",
    navLabel: caseStudyNav[1],
    headline: t(
      "Una empresa en pleno boom que necesita seguir escalando sin ampliar su equipo → Una plataforma que potencia la eficiencia operativa para lograrlo.",
      "A small business booming faster than it can scale its team → A platform that boosts operational efficiency to make it work."
    ),
    briefTitle: t("Brief de diseño", "Design Brief"),
    briefParagraphs: [
      t(
        "Este proyecto fue desarrollado como un ejercicio de diseño basado en un escenario de negocio realista, enfocado en resolver problemas de operación y gestión en un restaurante de comida rápida.",
        "This project was developed as a design exercise based on a realistic business scenario, focused on solving operational and management challenges in a fast-food restaurant."
      ),
      t(
        "El proyecto describe un negocio de comida rápida creciendo más rápido de lo que podía organizarse. La dueña abrió Juicio durante la pandemia en 2020. Desde entonces, ha ganado gran popularidad en la zona y su carga de trabajo ha aumentado considerablemente. Como resultado del éxito de su negocio, la dueña se ve abrumada por la cantidad de tareas.",
        "The case describes a fast-food business growing faster than it could organize itself. The owner opened Juicio during the 2020 pandemic. Since then, it has gained major popularity in the area and her workload has increased considerably. As a result of the business's success, the owner feels overwhelmed by the sheer number of tasks."
      ),
      t(
        "El local no tiene mesas ni asientos. La gente pide domicilios, compra para llevar o come en el carro. La dueña gestiona ella misma la nómina y el inventario, maneja la caja y ayuda a los cocineros cuando se retrasan. Para esto, se diseñó una plataforma que centraliza el control de órdenes, turnos e insumos en tiempo real.",
        "The location has no tables or seating. Customers order delivery, takeout, or eat in their car. The owner manages payroll and inventory herself, handles the register, and helps cooks when they fall behind. To address this, a platform was designed to centralize order control, staff shifts and inventory in real time."
      ),
    ],
    meta: {
      company: t("We Are Juicio", "We Are Juicio"),
      role: t("Product Designer", "Product Designer"),
      roleDetail: t(
        "Responsable de research, conceptualización y diseño lo-fi y hi-fi de pantallas",
        "Responsible for research, conceptualization, and lo-fi/hi-fi screen design"
      ),
      team: [t("Jr. Product Designer", "Jr. Product Designer")],
    },
    approachTitle: t("Design approach", "Design approach"),
    approach: t(
      "Mi enfoque trató de resolver el caos operativo que enfrentaba el negocio. Antes de pensar en pantallas, analicé el flujo real de trabajo de la dueña: cocinar, despachar, revisar inventario, pagar nómina, todo a la vez. Con esa comprensión, propuse una solución centrada en tres frentes clave: pedidos, trabajadores e inventario. Cada módulo fue pensado para ser útil desde el primer clic, con una interfaz que prioriza lo inmediato.",
      "My approach aimed to resolve the operational chaos the business faced. Before designing any screens, I analyzed the owner's actual workflow: cooking, dispatching, checking inventory, running payroll, all at once. With that understanding, I proposed a solution focused on three key areas: orders, workers, and inventory. Each module was designed to be useful from the very first click, with an interface that prioritizes what's immediate."
    ),
    objectivesTitle: t("Objetivos", "Objectives"),
    objectives: [
      t(
        "Aumentar los ingresos del negocio sin contratar más personal, optimizando los procesos internos existentes.",
        "Increase business revenue without hiring additional staff, by optimizing existing internal processes."
      ),
      t(
        "Brindar visibilidad en tiempo real sobre el estado de las órdenes, el inventario y la operación del equipo.",
        "Provide real-time visibility into the status of orders, inventory, and team operations."
      ),
      t(
        "Facilitar la toma de decisiones rápidas y precisas, mediante una interfaz simple y accesible para usuarios no técnicos.",
        "Enable quick and accurate decision-making through a simple interface accessible to non-technical users."
      ),
    ],
    solvingTitle: t("¿Qué estamos resolviendo?", "What are we solving?"),
    solving: t(
      "Estamos resolviendo la sobrecarga operativa de una dueña que maneja sola todas las áreas del restaurante, desde la cocina hasta la caja. La falta de herramientas digitales la obliga a gestionar pedidos, turnos, pagos e inventario de forma manual, lo que dificulta la eficiencia y limita el crecimiento del negocio.",
      "We're solving the operational overload of an owner who single-handedly runs every area of the restaurant, from the kitchen to the register. The lack of digital tools forces her to manage orders, shifts, payments and inventory manually, limiting efficiency and business growth."
    ),
    whoTitle: t("¿Para quién diseñamos?", "Who are we designing for?"),
    who: t(
      "Diseñamos para una persona que lo hace todo: administra, cocina, despacha y resuelve problemas sobre la marcha. No es experta en herramientas digitales, así que la solución debía ser clara, intuitiva y útil desde el primer uso.",
      "We're designing for a person who does it all: manages, cooks, dispatches, and solves problems on the go. She's not an expert in digital tools, so the solution had to be clear, intuitive, and useful from the first use."
    ),
    needsTitle: t("¿Necesidades de los usuarios?", "User needs?"),
    needs: [
      t(
        "Visibilidad total de las órdenes activas: saber qué se pidió, quién lo atiende y cuánto tiempo lleva.",
        "Full visibility of active orders: knowing what was ordered, who's handling it, and how long it's been."
      ),
      t(
        "Gestión clara del personal en turno: ver quién está trabajando, qué rol cumple y quién falta.",
        "Clear management of staff on shift: seeing who's working, their role, and who's absent."
      ),
      t(
        "Control actualizado del inventario: evitar faltantes y pérdidas por mala administración de insumos.",
        "Up-to-date inventory control: preventing shortages and losses due to poor supply management."
      ),
      t(
        "Privacidad y seguridad de los datos: asegurar que solo usuarios autorizados gestionen información sensible.",
        "Data privacy and security: ensuring only authorized users manage sensitive information such as payments, shifts, or employee records."
      ),
    ],
  },
  "hospital-sjd": {
    slug: "hospital-sjd",
    navLabel: caseStudyNav[3],
    headline: t(
      "Sistema de monitorización clínica en tiempo real, diseñado para gran formato y lectura a distancia, dentro del Clinical Command Center del hospital.",
      "Real-time clinical monitoring system, designed for large-format displays and long-distance reading, inside the hospital's Clinical Command Center."
    ),
    briefTitle: t("Brief de diseño", "Design Brief"),
    briefParagraphs: [
      t(
        "El DataWall es el sistema de pantallas del Clinical Command Center (CCC) del Hospital Sant Joan de Déu: un conjunto de 18 pantallas de gran formato (tamaño televisor) que muestran indicadores clínicos y operativos en tiempo real, pensadas para visualizarse a varios metros de distancia, no como un dashboard de escritorio convencional. Esto impone restricciones de diseño poco comunes: jerarquía tipográfica legible a distancia, codificación de color de alto contraste, y densidad de información cuidadosamente calibrada para lectura rápida, no exploración detallada.",
        "DataWall is the display system for the Clinical Command Center (CCC) at Hospital Sant Joan de Déu: a set of 18 large-format screens (TV-sized) showing real-time clinical and operational indicators, designed to be viewed from several meters away rather than as a conventional desktop dashboard. This imposes uncommon design constraints: a typographic hierarchy legible at a distance, high-contrast color coding, and information density carefully calibrated for quick reading rather than detailed exploration."
      ),
    ],
    meta: {
      company: t(
        "Hospital Sant Joan de Déu Barcelona, Direcció d'Estratègia Digital i Dades (D3)",
        "Hospital Sant Joan de Déu Barcelona, Digital Strategy & Data Division (D3)"
      ),
      period: t("2026", "2026"),
      role: t("Product Designer (UX/UI)", "Product Designer (UX/UI)"),
      roleDetail: t(
        "A cargo de investigación, diseño del sistema visual, documentación de lógica de pantallas, prototipado y colaboración con equipos técnicos y clínicos para el diseño e implementación del sistema.",
        "Responsible for research, visual system design, screen-logic documentation, prototyping, and collaboration with technical and clinical teams on the system's design and implementation."
      ),
      team: [
        t("Dirección / manager de proyecto", "Project direction / manager"),
        t("Service designer", "Service designer"),
        t("Product designer (yo)", "Product designer (me)"),
        t("Técnico superior de datos", "Senior data technician"),
        t("Implementación técnica (BI / desarrollo de dashboards)", "Technical implementation (BI / dashboard development)"),
        t("Puente clínico-operativo", "Clinical-operational liaison"),
        t("Project manager", "Project manager"),
        t(
          "Profesionales asistenciales de múltiples servicios (colaboración puntual según pantalla)",
          "Healthcare professionals from multiple services (ad hoc collaboration per screen)"
        ),
      ],
    },
    approachTitle: t("Design approach", "Design approach"),
    approach: t(
      "Diseñar para un formato de “lectura a distancia”: no hay cursor, no hay scroll, no hay interacción directa del usuario con la pantalla. Toda la jerarquía tiene que resolverse solo con tipografía, color y composición, legible en segundos desde varios metros.",
      "Designing for a “long-distance reading” format: there's no cursor, no scroll, no direct user interaction with the screen. All hierarchy has to be resolved through typography, color, and composition alone, legible in seconds from several meters away."
    ),
    approachImage: {
      key: "hospital-sjd-approach",
      alt: t(
        "Sala del Clinical Command Center del Hospital Sant Joan de Déu, con el DataWall de pantallas y los puestos de trabajo del equipo.",
        "The Hospital Sant Joan de Déu Clinical Command Center room, showing the DataWall screens and the team's workstations."
      ),
    },
    objectivesTitle: t("Objetivos", "Objectives"),
    objectives: [
      t(
        "Elevar la claridad y la accesibilidad de lectura en un contexto de alta exigencia operativa.",
        "Elevate reading clarity and accessibility in a high-demand operational context."
      ),
      t(
        "Establecer un design system consistente aplicable y escalable a los 18 dashboards.",
        "Establish a consistent design system, applicable and scalable across all 18 dashboards."
      ),
      t(
        "Diseñar una arquitectura de información clara para el ecosistema Hospital Líquid, construida desde cero junto a los equipos clínicos.",
        "Design a clear information architecture for the Hospital Líquid ecosystem, built from scratch together with clinical teams."
      ),
    ],
    objectivesPlaceholder: t(
      "Comparativa de evolución de una pantalla representativa, con datos ficticios, pendiente de anexar.",
      "Before/after comparison of a representative screen, with illustrative data, pending."
    ),
    objectivesComparativa: {
      beforeAlt: t(
        "Versión original del DataWall: jerarquía tipográfica plana, codificación de color mínima, sin indicadores de tendencia.",
        "Original DataWall version: flat type hierarchy, minimal color coding, no trend indicators."
      ),
      afterAlt: t(
        "Versión rediseñada del DataWall: jerarquía reforzada, codificación de color semántica (sense risc / risc moderat / risc elevat) y deltas de tendencia por indicador.",
        "Redesigned DataWall version: reinforced hierarchy, semantic color coding (no risk / moderate risk / elevated risk), and per-indicator trend deltas."
      ),
    },
    solvingTitle: t("Punto de partida", "Starting point"),
    solving: t(
      "El sistema de pantallas contaba ya con una primera generación de dashboards, construida en una etapa inicial del proyecto para cubrir necesidades operativas urgentes del CCC. Esta primera versión priorizó la disponibilidad rápida de datos sobre la experiencia de lectura, lo que abrió una oportunidad clara de maduración: optimizar la jerarquía visual, la accesibilidad y la usabilidad del sistema a medida que el proyecto pasaba de una fase funcional a una fase de consolidación como producto.",
      "The screen system already had a first generation of dashboards, built in an early stage of the project to cover urgent operational needs of the CCC. That first version prioritized fast data availability over reading experience, which opened up a clear opportunity for maturation: optimizing the system's visual hierarchy, accessibility, and usability as the project moved from a functional phase into a product-consolidation phase."
    ),
    scope: {
      title: t("Alcance del proyecto", "Project scope"),
      body: t(
        "De un total de 18 pantallas, 11 se rediseñaron evolucionando el contenido ya existente, optimizando visualización y jerarquización de datos. Las 7 restantes, pertenecientes al ecosistema Hospital Líquid, se diseñaron desde cero en colaboración directa con profesionales asistenciales, al tratarse de un ecosistema nuevo sin una versión previa.",
        "Out of 18 screens total, 11 were redesigned by evolving existing content, optimizing data visualization and hierarchy. The remaining 7, belonging to the Hospital Líquid ecosystem, were designed from scratch in direct collaboration with healthcare professionals, since it was a new ecosystem with no prior version."
      ),
    },
    confidentiality: t(
      "Debido a acuerdos de confidencialidad con la institución, solo se comparte información limitada sobre este proyecto. Las capturas mostradas contienen datos ficticios/ilustrativos, no corresponden a pacientes ni información real, y se presenta únicamente una muestra parcial del ecosistema completo de pantallas del CCC, sin revelar su infraestructura completa.",
      "Due to confidentiality agreements with the institution, only limited information about this project is shared. The screenshots shown contain fictitious/illustrative data, do not correspond to real patients or information, and represent only a partial sample of the CCC's complete screen ecosystem, without revealing its full infrastructure."
    ),
    processSections: [
      {
        title: t("Sistema de diseño", "Design system"),
        body: t(
          "Se construyó un design system completo en Figma para sostener las 18 pantallas de forma consistente.",
          "A complete design system was built in Figma to support all 18 screens consistently."
        ),
        bullets: [
          t(
            "Tokens de color semánticos (estados clínicos: crítico, alerta, normal; codificación estricta de rojo/ámbar/verde)",
            "Semantic color tokens (clinical states: critical, alert, normal; strict red/amber/green coding)"
          ),
          t(
            "Tipografía escalada específicamente para lectura a distancia (no para pantalla de escritorio)",
            "Typography scaled specifically for long-distance reading (not for desktop screens)"
          ),
          t("Librería de componentes reutilizable entre pantallas", "Reusable component library shared across screens"),
        ],
        placeholders: [
          {
            videoKey: "hospital-kpi-cards",
            alt: t(
              "Estados activos de las tarjetas KPI del design system: valores distintos de 0 activan el estado, cediendo peso visual a los estados de alerta y crítico (ámbar/rojo), que son los primeros que percibe el ojo.",
              "Active states for the design system's KPI cards: nonzero values trigger the active state, ceding visual weight to the alert/critical states (amber/red), which are the first the eye perceives."
            ),
          },
        ],
      },
      {
        title: t("Qué es Hospital Líquid", "What is Hospital Líquid"),
        body: t(
          "Hospital Líquid es el conjunto de programas de atención remota del hospital: la extensión de la atención clínica más allá de las paredes del centro, mediante seguimiento y monitorización de pacientes a distancia. Dentro de este ecosistema, la información que necesitaba visualizarse en el CCC se organizaba en tres capas de naturaleza distinta, cada una con su propia lógica y audiencia. Diferenciar estas tres capas fue clave para el diseño: cada una tiene una audiencia y un nivel de urgencia distintos (un fallo de conectividad no se lee ni se prioriza igual que un score de riesgo clínico), por lo que no podían tratarse con el mismo lenguaje visual dentro del sistema.",
          "Hospital Líquid is the hospital's set of remote-care programs: extending clinical care beyond the walls of the center through remote patient tracking and monitoring. Within this ecosystem, the information that needed to be visualized in the CCC was organized into three layers of a different nature, each with its own logic and audience. Differentiating these three layers was key to the design: each has a distinct audience and urgency level (a connectivity failure isn't read or prioritized the same way as a clinical risk score), so they couldn't be treated with the same visual language within the system."
        ),
        bullets: [
          t(
            "Fluxos de pacientes: disponibilidad de camas, altas y prealtas programadas, aislamientos de pacientes, y otros indicadores de movimiento y capacidad operativa del hospital",
            "Patient flows: bed availability, scheduled discharges and pre-discharges, patient isolations, and other hospital movement and operational-capacity indicators"
          ),
          t(
            "Dades clíniques: niveles de criticidad de pacientes, scores de dolor, riesgos de deterioro clínico, y sistemas de prevención temprana (por ejemplo, de sepsis o bronquiolitis)",
            "Clinical data: patient criticality levels, pain scores, clinical deterioration risks, and early-warning systems (e.g. sepsis or bronchiolitis)"
          ),
          t(
            "Infraestructures: estado de redes, cloud, hardware del hospital, y conectividad de los dispositivos que sostienen la atención remota",
            "Infrastructure: status of networks, cloud, hospital hardware, and connectivity of the devices that support remote care"
          ),
        ],
        placeholders: [
          {
            imageKey: "hospital-sjd-hliquid",
            alt: t(
              "Panel del DataWall de Hospital Líquid: mapa de atención remota, pacientes en seguimiento y alertas activas.",
              "Hospital Líquid's DataWall panel: remote-care map, patients being tracked, and active alerts."
            ),
          },
        ],
      },
      {
        title: t("Workshop de definición de contenido", "Content definition workshop"),
        body: t(
          "Para las 7 pantallas del ecosistema Hospital Líquid, al no partir de una versión previa, se organizó un workshop de definición de contenido junto a los equipos clínico y técnico responsables. El objetivo fue decidir colaborativamente qué mostrar (contenido e indicadores) antes de pasar a cómo mostrarlo (diseño). Definición de entidades/secciones: se acordaron colaborativamente las secciones clave a representar (Pacients, Alertes, Dispositius i connectivitat, Mapa) y qué datos era pertinente mostrar de cada una. Matriz de priorización: se usó un cuadrante de dos ejes para decidir qué indicadores entraban en el MVP inmediato y cuáles quedaban para una fase posterior: relevancia clínico-operativa en el eje vertical, y factibilidad de tenerlo disponible en el plazo del MVP en el eje horizontal. Este ejercicio permitió acotar el alcance del MVP de forma objetiva, asegurando que cada indicador incluido aportara valor real a la toma de decisiones del equipo asistencial.",
          "For the 7 screens in the Hospital Líquid ecosystem, since there was no prior version to build on, a content definition workshop was organized together with the responsible clinical and technical teams. The goal was to collaboratively decide what to show (content and indicators) before moving on to how to show it (design). Entity/section definition: the key sections to represent were agreed on collaboratively (Patients, Alerts, Devices & connectivity, Map) along with what data was relevant to show for each. Prioritization matrix: a two-axis quadrant was used to decide which indicators would enter the immediate MVP and which would be left for a later phase: clinical-operational relevance on the vertical axis, and feasibility of having it ready within the MVP timeline on the horizontal axis. This exercise made it possible to scope the MVP objectively, ensuring every indicator included brought real value to the care team's decision-making."
        ),
        placeholders: [
          t(
            "Matriz de priorización relevancia/factibilidad, adaptada y traducida, pendiente de anexar.",
            "Relevance/feasibility prioritization matrix, adapted and translated, pending."
          ),
          t("Diagrama de entidades definidas colaborativamente, pendiente de anexar.", "Diagram of collaboratively defined entities, pending."),
        ],
      },
      {
        title: t("Sistema de marcadores: Mapa d'Atenció Remota", "Marker system: Mapa d'Atenció Remota"),
        body: t(
          "Para el mapa de pacientes en seguimiento remoto, se co-diseñó un sistema de marcadores basado en las variables visuales de Jacques Bertin (teórico de semiología gráfica): el tipo de icono y el color del anillo que lo rodea funcionan como canales visuales independientes. El icono comunica el tipo de caso/dispositivo, y el color del anillo comunica el estado o nivel de alerta, sin que ambas dimensiones se contaminen entre sí. Esto permite leer dos variables distintas de información en un único marcador, de forma rápida y sin ambigüedad, algo clave en un contexto de lectura a distancia.",
          "For the map of patients under remote monitoring, a marker system was co-designed based on Jacques Bertin's visual variables (graphic semiology theorist): the icon type and the color of the ring surrounding it function as independent visual channels. The icon communicates the case/device type, and the ring color communicates status or alert level, without the two dimensions interfering with each other. This makes it possible to read two distinct variables of information in a single marker, quickly and unambiguously, key in a long-distance reading context."
        ),
        highlight: true,
        placeholders: [
          t("Sistema de marcadores del mapa, con datos ficticios, pendiente de anexar.", "Map marker system, with illustrative data, pending."),
        ],
      },
      {
        title: t("Documentación de lógica de pantallas", "Screen logic documentation"),
        body: t(
          "Se documentó el comportamiento y la lógica de cada pantalla del sistema (incluye pantallas como EVAT, Urgències, Hospitalització Infantil, Minerva, Mapa del Dolor, entre otras), estableciendo reglas claras de qué datos se muestran, cómo se actualizan, y bajo qué condiciones cambian de estado visual.",
          "The behavior and logic of every screen in the system was documented (including screens such as EVAT, Urgències, Hospitalització Infantil, Minerva, Mapa del Dolor, among others), establishing clear rules for what data is shown, how it updates, and under what conditions it changes visual state."
        ),
        placeholders: [
          t("Extracto de documentación de lógica de una pantalla, pendiente de anexar.", "Excerpt of a screen's logic documentation, pending."),
        ],
      },
    ],
    reflection: {
      title: t("Resultado y estado actual", "Result and current status"),
      body: t(
        "El proyecto completó recientemente el hand-off a desarrollo y se encuentra actualmente en fase de implementación.",
        "The project recently completed hand-off to development and is currently in the implementation phase."
      ),
      placeholder: t(
        "Cuando haya pantallas ya implementadas y en producción, actualizar con capturas reales (con datos ficticios) del sistema funcionando.",
        "Once screens are implemented and in production, update with real screenshots (with illustrative data) of the system running."
      ),
    },
  },
  arrelat: {
    slug: "arrelat",
    navLabel: caseStudyNav[4],
    tagline: "Bringing absence to light",
    headline: t(
      "Una experiencia inmersiva de archivo para fotografías que no pueden mostrarse físicamente, que construye significado a través del contexto y la interpretación.",
      "An immersive archival experience for photographs that cannot be shown physically, building meaning through context and interpretation."
    ),
    briefTitle: t("Brief de diseño", "Design Brief"),
    heroImages: [
      t(
        "Frame de título, \"Arrelat, Bringing absence to light\" (pendiente de anexar).",
        "Title frame, \"Arrelat, Bringing absence to light\" (pending)."
      ),
      t(
        "Render del bosque: raíces e hilos-árbol con la semilla al centro (pendiente de anexar).",
        "Forest render: roots and thread-trees with the seed at the center (pending)."
      ),
    ],
    briefParagraphs: [
      t(
        "Arrelat es un proyecto de tesis de máster desarrollado en colaboración con la Fundación Foto Colectania, una fundación de fotografía privada y sin ánimo de lucro con sede en Barcelona, fundada en 2002, dedicada a preservar y difundir la fotografía española, catalana y portuguesa. La fundación planteó el reto de activar su archivo fotográfico mediante una experiencia híbrida física y digital, sin perder el valor interpretativo de la colección a la vez que se amplía el acceso a ella.",
        "Arrelat is a master's thesis project developed in collaboration with Fundación Foto Colectania, a private, non-profit photography foundation based in Barcelona, founded in 2002, dedicated to preserving and promoting Spanish, Catalan and Portuguese photography. The foundation set the challenge of activating its photographic archive through a hybrid physical and digital experience, without losing the collection's interpretive value while expanding access to it."
      ),
      t(
        "El proyecto replantea el archivo como un bosque vivo. Cada fotografía se convierte en un nodo conectado por hilos a una estructura de raíces compartida. El visitante se mueve por el espacio a su propio ritmo, encuentra la fotografía antes que el contexto, y deja una huella que persiste para futuros visitantes. El concepto traduce la lógica relacional de un archivo en algo navegable en el espacio en lugar de leído en una pantalla.",
        "The project reframes the archive as a living forest. Each photograph becomes a node connected by threads to a shared root structure. The visitor moves through the space at their own pace, finds the photograph before the context, and leaves a trace that persists for future visitors. The concept translates the relational logic of an archive into something navigable in space rather than read on a screen."
      ),
    ],
    meta: {
      company: t(
        "Fundación Foto Colectania · Máster en Diseño de Interacción y Experiencias Inmersivas, LCI Barcelona",
        "Fundación Foto Colectania · Master's in Interaction Design and Immersive Experiences, LCI Barcelona"
      ),
      period: t("Octubre 2025 a julio 2026", "October 2025 to July 2026"),
      role: t("Diseño UX/UI, Narrativa y Prototipado", "UX/UI Design, Narrative & Prototyping"),
      roleDetail: t(
        "Trabajé en pareja con Mariya Zinkevich, con aporte conjunto en todas las fases del proyecto: diseño UX/UI, narrativa de la experiencia y prototipado.",
        "I worked in partnership with Mariya Zinkevich, with joint contribution across all phases of the project: UX/UI design, experience narrative, and prototyping."
      ),
      team: [
        t("Mariya Zinkevich (co-diseñadora)", "Mariya Zinkevich (co-designer)"),
        t("Juan García Márquez (co-diseñador)", "Juan García Márquez (co-designer)"),
        t("Luca Carrubba (tutor del proyecto)", "Luca Carrubba (project tutor)"),
      ],
    },
    approachTitle: t("Design approach", "Design approach"),
    approach: t(
      "La pregunta que guió todo el proyecto: ¿cómo pueden los entornos inmersivos reconstruir las condiciones interpretativas a través de las cuales emerge el significado del archivo, en lugar de reducir las fotografías a espectáculo?",
      "The question that guided the whole project: how can immersive environments reconstruct the interpretive conditions through which the archive's meaning emerges, rather than reducing photographs to spectacle?"
    ),
    objectivesTitle: t("Objetivos", "Objectives"),
    objectives: [
      t(
        "Identificar las condiciones interpretativas que hoy sostienen la construcción de significado y la alfabetización visual en el archivo.",
        "Identify the interpretive conditions that currently sustain meaning-making and visual literacy in the archive."
      ),
      t(
        "Establecer las condiciones de diseño bajo las cuales un entorno inmersivo puede preservar la lógica de archivo sin convertirla en espectáculo sensorial.",
        "Establish the design conditions under which an immersive environment can preserve archival logic without turning it into sensory spectacle."
      ),
      t(
        "Prototipar y testear una experiencia inmersiva usando la interfaz web existente de la fundación como punto de comparación.",
        "Prototype and test an immersive experience using the foundation's existing web interface as a point of comparison."
      ),
    ],
    solvingTitle: t("La situación", "The situation"),
    solving: t(
      "El archivo de la Fundación Foto Colectania guarda fotografías cuyo significado no depende solo de cada imagen, sino de los marcos relacionales, institucionales y narrativos que la rodean. Las dos vías por las que un visitante puede llegar hoy a ese archivo debilitan esos marcos. El archivo físico impone restricciones de espacio y de ritmo que dejan poco margen para una interacción lenta y autodirigida. La interfaz web existente prioriza el acceso por encima del contexto, y en el proceso fragmenta la lógica del archivo. Fotografías cuidadosamente preservadas pueden acabar, de hecho, preservadas hasta la invisibilidad.",
      "Fundación Foto Colectania's archive holds photographs whose meaning depends not only on each image, but on the relational, institutional and narrative frameworks that surround it. The two paths through which a visitor can reach that archive today weaken those frameworks. The physical archive imposes space and pacing constraints that leave little room for slow, self-directed interaction. The existing web interface prioritizes access over context, fragmenting the archive's logic in the process. Carefully preserved photographs can end up, in effect, preserved into invisibility."
    ),
    designChallenge: {
      title: t("La pregunta de framing", "The framing question"),
      body: t(
        "Si una fotografía se preserva pero nunca se encuentra, ¿se preserva de verdad su patrimonio? Esto se apoya en la metáfora que guía el proyecto: si un árbol cae en un bosque y no hay nadie para oírlo, ¿hizo algún sonido? El archivo sostiene el árbol. La experiencia es el bosque. El visitante es quien lo oye.",
        "If a photograph is preserved but never found, is its heritage truly preserved? This rests on the metaphor that guides the project: if a tree falls in a forest and no one is there to hear it, did it make a sound? The archive holds up the tree. The experience is the forest. The visitor is the one who hears it."
      ),
    },
    needsTitle: t("Pain points del research", "Research pain points"),
    needs: [
      t(
        "Sobrecarga de información: demasiada información contextual presentada a la vez.",
        "Information overload: too much contextual information presented at once."
      ),
      t(
        "Pérdida de significado sin contexto: imágenes que se leen como estéticamente interesantes pero difíciles de interpretar más allá de la impresión superficial.",
        "Loss of meaning without context: images that read as aesthetically interesting but are hard to interpret beyond a surface impression."
      ),
      t(
        "Compromiso emocional limitado en formatos digitales: el encuentro en pantalla se percibe como distante y fugaz.",
        "Limited emotional engagement in digital formats: the on-screen encounter feels distant and fleeting."
      ),
      t(
        "Ausencia de ritmo contemplativo: los visitantes querían una visualización más lenta y reflexiva.",
        "Absence of contemplative pace: visitors wanted a slower, more reflective way of viewing."
      ),
      t(
        "Falta de guía interpretativa: incertidumbre sobre cómo aproximarse a una imagen de archivo.",
        "Lack of interpretive guidance: uncertainty about how to approach an archival image."
      ),
      t(
        "Interrupción de la exploración personal: un ritmo impuesto desde fuera impedía una interacción autodirigida.",
        "Disruption of personal exploration: an externally imposed pace prevented self-directed interaction."
      ),
    ],
    processSections: [
      {
        title: t("Research y framing", "Research & framing"),
        body: t(
          "El research combinó una base teórica en lógica de archivo, valor cultural y alfabetización visual con trabajo de campo: entrevistas semiestructuradas a dos grupos de visitantes, público general de exposiciones culturales y profesionales del sector, más un benchmark de la interfaz web actual de la fundación. La síntesis hizo emerger los seis pain points de arriba y un mapa de necesidades y objetivos del visitante: construir una conexión con la fotografía más allá del scroll digital, tener modos de visualización lentos y reflexivos, recibir apoyo interpretativo accesible, y entender la historia detrás de cada imagen. El gap que nombró el research: ningún formato existente preservaba la lógica de archivo a la vez que ofrecía un compromiso inmersivo genuino. La novedad tecnológica y el engagement no equivalen a reflexión analítica. (No se especifica el número de participantes de la fase de research, en anonimato.)",
          "The research combined a theoretical base in archival logic, cultural value and visual literacy with fieldwork: semi-structured interviews with two visitor groups, general cultural-exhibition audiences and sector professionals, plus a benchmark of the foundation's current web interface. The synthesis surfaced the six pain points above and a map of visitor needs and goals: building a connection with the photograph beyond the digital scroll, having slow and reflective viewing modes, receiving accessible interpretive support, and understanding the story behind each image. The gap the research named: no existing format preserved archival logic while offering genuine immersive engagement. Technological novelty and engagement are not the same as analytical reflection. (Number of research participants not specified, kept anonymous.)"
        ),
        placeholders: [
          t(
            "Diagrama del proceso de research: Research / Define / Ideate / Prototype / Final documentation (pendiente de anexar).",
            "Research process diagram: Research / Define / Ideate / Prototype / Final documentation (pending)."
          ),
          t("Mapa de necesidades y objetivos del visitante (pendiente de anexar).", "Visitor needs and goals map (pending)."),
        ],
      },
      {
        title: t("Concepto: el archivo como bosque vivo", "Concept: the archive as a living forest"),
        body: t(
          "El problema de diseño se replanteó de cómo mostramos una colección a cómo reconstruimos las condiciones bajo las cuales emerge el significado. El concepto que lo resolvió fue el archivo transformado en un ecosistema vivo. El nombre Arrelat viene de la palabra catalana que significa enraizado. La metáfora mapea directamente sobre el archivo: el bosque es el archivo, los hilos son su sistema vascular que conecta las imágenes, y la semilla al centro es el corazón de la memoria. Bajo el visitante están las raíces, a su alrededor los hilos-árbol, y en el núcleo la semilla. Fue un pivote deliberado desde un concepto anterior más duro llamado Null, cuyo lenguaje visual industrial y brutalista se reemplazó por uno orgánico y espacial, más acorde con la idea de un archivo que crece a través de la presencia humana.",
          "The design problem was reframed from how do we show a collection to how do we reconstruct the conditions under which meaning emerges. The concept that resolved it was the archive transformed into a living ecosystem. The name Arrelat comes from the Catalan word for rooted. The metaphor maps directly onto the archive: the forest is the archive, the threads are its vascular system connecting the images, and the seed at the center is the heart of memory. Beneath the visitor are the roots, around them the thread-trees, and at the core the seed. It was a deliberate pivot from an earlier, harder concept called Null, whose industrial, brutalist visual language was replaced with an organic, spatial one, more aligned with the idea of an archive that grows through human presence."
        ),
        placeholders: [
          t(
            "\"El archivo transformado en un ecosistema vivo\" (pendiente de anexar).",
            "\"The archive transformed into a living ecosystem\" (pending)."
          ),
          t(
            "Renders de la metáfora del bosque: raíces, hilos-árbol y semilla (pendiente de anexar).",
            "Forest metaphor renders: roots, thread-trees and seed (pending)."
          ),
        ],
      },
      {
        title: t("Sistema de interacción y arco narrativo", "Interaction system & narrative arc"),
        body: t(
          "La experiencia se estructuró como un arco narrativo de siete etapas que mueve al visitante a través de tres roles: Observer, Navigator, Participant. El arco va Awakening, The Forest, Discovery, Connection, The Seed, y luego Breath and Exit. Lleva una única progresión interpretativa: veo fotografías, soy testigo, construyo significado. Un sistema de hilos codificado por color comunicaba el estado del archivo de forma espacial en lugar de mediante texto. La interacción pasó a formar parte del entorno mismo en lugar de ser una capa de interfaz aparte.",
          "The experience was structured as a seven-stage narrative arc that moves the visitor through three roles: Observer, Navigator, Participant. The arc runs Awakening, The Forest, Discovery, Connection, The Seed, and then Breath and Exit. It carries a single interpretive progression: I see photographs, I am a witness, I construct meaning. A color-coded thread system communicated the archive's state spatially rather than through text. Interaction became part of the environment itself rather than a separate interface layer."
        ),
        bullets: [
          t("Hilo dorado: marca un nodo intacto en su estado original.", "Gold thread: marks a node intact in its original state."),
          t("Hilo blanco: marca un lugar donde un visitante dejó un mensaje.", "White thread: marks a place where a visitor left a message."),
          t("Hilo lavanda: marca un camino ya recorrido.", "Lavender thread: marks a path already walked."),
        ],
        placeholders: [
          t("Los tres roles y el arco de siete etapas (pendiente de anexar).", "The three roles and seven-stage arc (pending)."),
          t("Sistema de color de los hilos: dorado, blanco, lavanda (pendiente de anexar).", "Thread color system: gold, white, lavender (pending)."),
          t(
            "\"I see photographs / I am a witness / I construct meaning\" (pendiente de anexar).",
            "\"I see photographs / I am a witness / I construct meaning\" (pending)."
          ),
        ],
      },
      {
        title: t("Prototipo", "Prototype"),
        body: t(
          "Se construyeron dos artefactos. Un prototipo de creative coding en Processing y Java exploró el comportamiento de partículas e hilos activado por proximidad que sostiene el bosque. La experiencia narrativa en sí se prototipó a fidelidad de storyframes para el testing. Un concepto de aplicación móvil complementaria extendía la experiencia más allá de la sesión: una fotografía diaria, la posibilidad de organizar carpetas, y una forma de consultar las exposiciones vigentes, cerrando el bucle entre el encuentro inmersivo y la vida del visitante fuera de él. La app complementaria se muestra como extensión propuesta, no como feature validada, ya que no se testeó con usuarios.",
          "Two artifacts were built. A creative-coding prototype in Processing and Java explored the proximity-activated particle and thread behavior that sustains the forest. The narrative experience itself was prototyped at storyframe fidelity for testing. A companion mobile app concept extended the experience beyond the session: a daily photograph, the ability to organize folders, and a way to check current exhibitions, closing the loop between the immersive encounter and the visitor's life outside it. The companion app is shown as a proposed extension, not a validated feature, since it was not tested with users."
        ),
        placeholders: [
          t("Prototipo Processing / Java, animado (pendiente de anexar).", "Processing / Java prototype, animated (pending)."),
          t("Pantallas del concepto de app complementaria (pendiente de anexar).", "Companion app concept screens (pending)."),
        ],
      },
      {
        title: t("Sistema de diseño y lenguaje visual", "Design system & visual language"),
        body: t(
          "El lenguaje visual se reconstruyó en torno a la metáfora orgánica. Se mantuvieron el negro y el blanco como colores primarios para conservar la armonía con el medio fotográfico y con la identidad de Foto Colectania, con tonos secundarios que se desplazaron a dorado, marfil cálido y lila. El color no era decoración: funcionaba también como sistema de navegación y de estado de interacción dentro del espacio. La tipografía se simplificó a Archivo únicamente, para un lenguaje unificado entre la interfaz VR, la app móvil y el texto dentro del entorno. La iconografía se movió hacia formas biomórficas que referencian hilos, semillas y raíces. Los elementos de interfaz se diseñaron como parte de la narrativa espacial en lugar de una capa gráfica por encima de ella.",
          "The visual language was rebuilt around the organic metaphor. Black and white were kept as primary colors to preserve harmony with the photographic medium and with Foto Colectania's identity, with secondary tones shifting to gold, warm ivory and lilac. Color was not decoration: it also functioned as a navigation and interaction-state system within the space. Typography was simplified to Archivo only, for a unified language across the VR interface, the mobile app and in-environment text. Iconography moved toward biomorphic shapes referencing threads, seeds and roots. Interface elements were designed as part of the spatial narrative rather than a graphic layer on top of it."
        ),
        bullets: [
          t(
            "Color: negro y blanco como primarios, con dorado, marfil cálido y lila como secundarios. El color también funciona como sistema de navegación y estado.",
            "Color: black and white as primaries, with gold, warm ivory and lilac as secondaries. Color also functions as a navigation and state system."
          ),
          t(
            "Tipografía: Archivo, unificada entre la interfaz VR, la app móvil y el texto del entorno.",
            "Typography: Archivo, unified across the VR interface, the mobile app and in-environment text."
          ),
          t("Iconografía: formas biomórficas que referencian hilos, semillas y raíces.", "Iconography: biomorphic shapes referencing threads, seeds and roots."),
        ],
        placeholders: [
          t("Paleta de color de Arrelat (pendiente de anexar).", "Arrelat color palette (pending)."),
          t("Tipografía e iconografía (pendiente de anexar).", "Typography and iconography (pending)."),
          t("Activación de nodo de hilo y estados de cambio de color (pendiente de anexar).", "Thread node activation and color-change states (pending)."),
        ],
      },
    ],
    featureShowcase: {
      title: t("Highlights", "Highlights"),
      subtitle: t("Tres decisiones de diseño desarrolladas a fondo", "Three design decisions developed in depth"),
      features: [
        {
          title: t("El color como navegación, no como decoración", "Color as navigation, not decoration"),
          body: t(
            "La decisión de sistema más fuerte que tomamos fue hacer que el color cargara significado. Diseñamos la paleta de hilos como una máquina de estados viva que el visitante lee espacialmente: dorado para intacto, blanco para un mensaje dejado atrás, lavanda para un camino ya recorrido. Esto nos permitió que la experiencia comunicara la estructura y la historia del archivo sin paneles de texto, respondiendo directamente a los pain points de sobrecarga de información y falta de guía interpretativa. Mantener el negro y el blanco como primarios mantuvo el sistema honesto con el medio fotográfico en lugar de decorar por encima de él.",
            "The strongest system-level decision we made was making color carry meaning. We designed the thread palette as a living state machine that the visitor reads spatially: gold for intact, white for a message left behind, lavender for a path already walked. This let the experience communicate the archive's structure and history without text panels, directly answering the pain points of information overload and lack of interpretive guidance. Keeping black and white as primaries kept the system honest to the photographic medium instead of decorating over it."
          ),
          placeholder: t("Sistema de color de hilos en contexto (pendiente de anexar).", "Thread color system in context (pending)."),
        },
        {
          title: t("La fotografía antes que el contexto", "The photograph before the context"),
          body: t(
            "En el testing encontramos un hallazgo que apareció de forma idéntica en todos los participantes, tanto en la sesión de web como en la del prototipo: la fotografía debe preceder al contexto. Ningún participante interactuó con la información contextual antes de ser atraído por una imagen. Esto validó nuestra decisión central de secuenciación, donde la capa de metadatos aparece solo tras la proximidad y el gesto, haciendo de la fotografía el encuentro y del contexto su desarrollo. En la web existente de la fundación, el contexto suele ir primero y la fotografía se convierte en ilustración de un pie de foto.",
            "In testing we found a result that appeared identically across every participant, in both the web session and the prototype session: the photograph must precede the context. No participant engaged with contextual information before being drawn in by an image. This validated our central sequencing decision, where the metadata layer only appears after proximity and gesture, making the photograph the encounter and the context its unfolding. On the foundation's existing website, context usually comes first, and the photograph becomes an illustration of a caption."
          ),
          placeholder: t(
            "Interacción con el nodo: primero la fotografía, luego el reveal de metadatos (pendiente de anexar).",
            "Node interaction: photograph first, then the metadata reveal (pending)."
          ),
        },
        {
          title: t("El hilo blanco: la participación como acumulación de archivo", "The white thread: participation as archival accumulation"),
          body: t(
            "Diseñamos el mecanismo del hilo blanco para que el mensaje de un visitante pasara a formar parte del archivo vivo para futuros visitantes. En el testing esto produjo una sensación de responsabilidad de archivo que no tiene equivalente en la web, e instancia el argumento central del proyecto: que la preservación cultural no ocurre al salvaguardar una obra sino en el momento en que un visitante construye significado a partir de ella. Un año después de la visita, la app complementaria puede notificar a la persona que dejó un mensaje en la semilla, cerrando un bucle temporal.",
            "We designed the white thread mechanism so a visitor's message becomes part of the living archive for future visitors. In testing this produced a sense of archival responsibility with no equivalent on the website, and it instances the project's central argument: that cultural preservation does not happen by safeguarding a work, but in the moment a visitor constructs meaning from it. A year after the visit, the companion app can notify the person who left a message in the seed, closing a temporal loop."
          ),
          placeholder: t("Concepto de hilo blanco / mensaje en la semilla (pendiente de anexar).", "White thread concept / message in the seed (pending)."),
        },
      ],
    },
    reflection: {
      title: t("Resultado y estado actual", "Result & current status"),
      body: t(
        "Arrelat se validó mediante un estudio comparativo cualitativo: dos sesiones de testing, una sobre la web existente y otra sobre los storyframes de Arrelat, con seis participantes en total, medidas sobre siete ejes comparativos (framing contextual, transformación interpretativa, secuenciación relacional, ritmo contemplativo, significado frente a navegación, huella significativa, y motivación para seguir interactuando). En cinco de los siete ejes, el prototipo creó mejores condiciones para el compromiso interpretativo que la web. Ralentizaba al visitante donde la web lo aceleraba, dejaba una huella más específica y conceptual en lugar de puramente estética, y comunicaba la lógica relacional del archivo de forma espacial antes de que tuviera que leerse. Un participante, al que se preguntó si quitar el lenguaje visual dejaría algo de sustancia, confirmó el argumento central: el sistema visual no es decoración sobre el archivo, es el archivo hecho visible.",
        "Arrelat was validated through a qualitative comparative study: two testing sessions, one on the existing website and one on the Arrelat storyframes, with six participants total, measured across seven comparative axes (contextual framing, interpretive transformation, relational sequencing, contemplative pace, meaning versus navigation, meaningful trace, and motivation to keep engaging). On five of the seven axes, the prototype created better conditions for interpretive engagement than the website. It slowed the visitor down where the website sped them up, left a more specific and conceptual trace rather than a purely aesthetic one, and communicated the archive's relational logic spatially before it had to be read. One participant, asked whether removing the visual language would leave any substance, confirmed the project's central argument: the visual system is not decoration on top of the archive, it is the archive made visible."
      ),
      paragraphs: [
        t(
          "Los hallazgos son honestos con sus límites. Las ventajas del prototipo dependen de la calidad de ejecución. Donde la entrega de contexto se apoyó en un panel de metadatos de texto, reapareció el mismo gap interpretativo visto en la web, lo que señala con claridad la próxima iteración. La web también hace cosas que el prototipo aún no ha igualado, en concreto generar intención de visitar el espacio físico y entregar una imagen institucional completa, ambas registradas como trabajo futuro. El formato inmersivo es una condición necesaria pero no suficiente para la profundidad interpretativa, y el estudio encuadra qué tiene que ser cierto para que la entregue.",
          "The findings are honest about their limits. The prototype's advantages depend on execution quality. Where context delivery relied on a text metadata panel, the same interpretive gap seen on the website reappeared, clearly pointing to the next iteration. The website also does things the prototype has not yet matched, specifically generating intent to visit the physical space and delivering a complete institutional image, both logged as future work. The immersive format is a necessary but not sufficient condition for interpretive depth, and the study frames what has to be true for it to deliver on that."
        ),
        t(
          "Estado: proyecto de research through design con un prototipo validado. La validación se hizo a fidelidad de storyframes y de prototipo de creative coding, con un camino definido hacia un build de mayor fidelidad. No es un “coming soon”: es un proyecto de investigación completado cuyo prototipo fue puesto a prueba y arrojó hallazgos.",
          "Status: a research-through-design project with a validated prototype. Validation was done at storyframe and creative-coding-prototype fidelity, with a defined path toward a higher-fidelity build. This is not a “coming soon”: it's a completed research project whose prototype was tested and produced findings."
        ),
      ],
      pullQuote: t(
        "El archivo sostiene el árbol. La experiencia es el bosque. El visitante es quien lo oye.",
        "The archive holds up the tree. The experience is the forest. The visitor is the one who hears it."
      ),
    },
  },
};
