export type QuestionStatus = "answered";

export type DiagramType = "flow" | "table" | "process" | "layers" | "timeline" | "grid" | "list" | "ecosystem" | "stats";

export interface DiagramBlock {
  type: DiagramType;
  title?: string;
  steps?: { label: string; description: string; icon?: string }[];
  headers?: string[];
  rows?: string[][];
  layers?: { name: string; description: string }[];
  items?: string[];
}

export interface QuestionItem {
  id: number;
  title: string;
  title_en?: string;
  status: QuestionStatus;
  subtitle?: string;
  subtitle_en?: string;
  section: "A";
  requerimiento: string;
  requerimiento_en: string;
  respuesta: string;
  respuesta_en: string;
  consideraciones?: string;
  consideraciones_en?: string;
  valor: string;
  valor_en: string;
  diagrams: DiagramBlock[];
  diagrams_en?: DiagramBlock[];
}

export const sections = [
  { key: "A" as const, label: "Consultas BCP — Leasing", emoji: "🏦" },
];

export const questions: QuestionItem[] = [
  {
    id: 1,
    title: "Implementaciones Recientes en Instituciones Financieras de Escala Comparable",
    title_en: "Recent Implementations in Comparable Financial Institutions",
    status: "answered",
    section: "A",
    subtitle: "Portafolio activo en la región",
    subtitle_en: "Active portfolio in the region",
    requerimiento: "Confirmar si han realizado implementaciones recientes de la solución en instituciones financieras de tamaño y complejidad comparable a BCP, indicando de ser posible el alcance general de la implementación.",
    requerimiento_en: "Confirm whether recent implementations of the solution have been carried out in financial institutions of size and complexity comparable to BCP, indicating the general scope of the implementation if possible.",
    respuesta: "Contamos con un portafolio activo de clientes de gran trayectoria en la región. En el ámbito específico de Leasing, actualmente nos encontramos en proceso de implementación con CMI (Grupo Multi Inversiones), una de las corporaciones financieras más importantes de Centroamérica, abarcando diseño funcional y parametrización de la plataforma. Adicionalmente, contamos con implementaciones activas en Banco de Costa Rica y GNP México dentro del módulo de Leasing.\n\nNuestra plataforma SAF+ es un ecosistema de cores financieros compuesto por tres módulos independientes pero integrados de forma nativa: Leasing, Factoraje y Créditos. Cada uno de ellos puede activarse de manera modular según las necesidades de la institución, lo que permite una adopción progresiva sin necesidad de implementar la suite completa desde el inicio.\n\nUna de las ventajas diferenciadas de SAF+ es que, independientemente de qué módulos estén activos, la plataforma ofrece una vista unificada del cliente, permitiendo a los equipos de negocio y operaciones administrar de forma centralizada todas las relaciones, contratos y exposiciones del cliente desde un solo punto de acceso.\n\nGracias a esta arquitectura, tenemos presencia en instituciones como Unicomer, Banco Nacional, Credicomer, Bankaool y ADOPEM, entre otras, cada una con configuraciones modulares distintas según su modelo de negocio. Adicionalmente, SYSDE Pensión respalda más del 80% del mercado de pensiones de Latinoamérica, lo que refleja la escala, estabilidad y confianza que las instituciones financieras de la región han depositado en nuestras soluciones.",
    respuesta_en: "We have an active portfolio of well-established clients in the region. Specifically in Leasing, we are currently in the implementation process with CMI (Grupo Multi Inversiones), one of the most important financial corporations in Central America, covering functional design and platform parameterization. Additionally, we have active implementations at Banco de Costa Rica and GNP Mexico within the Leasing module.\n\nOur SAF+ platform is a financial core ecosystem composed of three independent but natively integrated modules: Leasing, Factoring, and Credits. Each can be activated modularly according to the institution's needs, allowing progressive adoption without implementing the full suite from the start.\n\nOne of SAF+'s differentiating advantages is that, regardless of which modules are active, the platform offers a unified client view, enabling business and operations teams to centrally manage all client relationships, contracts, and exposures from a single access point.\n\nThanks to this architecture, we have a presence in institutions such as Unicomer, Banco Nacional, Credicomer, Bankaool, and ADOPEM, among others, each with distinct modular configurations according to their business model. Additionally, SYSDE Pensión supports over 80% of Latin America's pension market, reflecting the scale, stability, and trust that financial institutions in the region have placed in our solutions.",
    consideraciones: "SAF+ está desplegado sobre Azure con arquitectura de microservicios. La implementación modular permite activar Leasing, Factoraje o Créditos de forma independiente, reduciendo el tiempo de puesta en marcha.",
    consideraciones_en: "SAF+ is deployed on Azure with microservices architecture. The modular implementation allows activating Leasing, Factoring, or Credits independently, reducing time to market.",
    valor: "BCP podrá validar la experiencia comprobada de SYSDE en instituciones financieras de escala regional, con implementaciones activas en Leasing que demuestran la madurez y estabilidad de la plataforma.",
    valor_en: "BCP will be able to validate SYSDE's proven experience in regional-scale financial institutions, with active Leasing implementations that demonstrate the platform's maturity and stability.",
    diagrams: [
      {
        type: "table",
        title: "Clientes Activos en Leasing",
        headers: ["Institución", "País", "Módulo", "Estado"],
        rows: [
          ["CMI (Grupo Multi Inversiones)", "Centroamérica", "Leasing", "En implementación"],
          ["Banco de Costa Rica", "Costa Rica", "Leasing", "Activo"],
          ["GNP México", "México", "Leasing", "Activo"],
        ],
      },
      {
        type: "grid",
        title: "Ecosistema SAF+ — Módulos",
        items: [
          "🏗️ Leasing — Financiero y Operativo",
          "📄 Factoraje — Descuento de facturas",
          "💳 Créditos — Core de créditos",
          "👤 Vista Unificada del Cliente",
          "🔗 Integración Nativa entre Módulos",
          "⚙️ Adopción Modular Progresiva",
        ],
      },
      {
        type: "list",
        title: "Otras Instituciones con SAF+",
        items: [
          "Unicomer — Créditos retail multi-país",
          "Banco Nacional — Core crediticio",
          "Credicomer — Financiera regional",
          "Bankaool — Banca digital México",
          "ADOPEM — Microfinanzas República Dominicana",
          "SYSDE Pensión — 80%+ del mercado de pensiones LATAM",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table",
        title: "Active Leasing Clients",
        headers: ["Institution", "Country", "Module", "Status"],
        rows: [
          ["CMI (Grupo Multi Inversiones)", "Central America", "Leasing", "In implementation"],
          ["Banco de Costa Rica", "Costa Rica", "Leasing", "Active"],
          ["GNP México", "Mexico", "Leasing", "Active"],
        ],
      },
      {
        type: "grid",
        title: "SAF+ Ecosystem — Modules",
        items: [
          "🏗️ Leasing — Financial and Operating",
          "📄 Factoring — Invoice discounting",
          "💳 Credits — Credit core",
          "👤 Unified Client View",
          "🔗 Native Inter-Module Integration",
          "⚙️ Progressive Modular Adoption",
        ],
      },
      {
        type: "list",
        title: "Other Institutions with SAF+",
        items: [
          "Unicomer — Multi-country retail credits",
          "Banco Nacional — Credit core",
          "Credicomer — Regional financial institution",
          "Bankaool — Digital banking Mexico",
          "ADOPEM — Microfinance Dominican Republic",
          "SYSDE Pensión — 80%+ of LATAM pension market",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Presencia en Benchmarks o Estudios de la Industria",
    title_en: "Presence in Industry Benchmarks or Studies",
    status: "answered",
    section: "A",
    subtitle: "Transparencia sobre posicionamiento en la industria",
    subtitle_en: "Transparency on industry positioning",
    requerimiento: "Indicar si la solución o la compañía aparece referenciada en algún benchmark, estudio o evaluación de la industria (por ejemplo, Gartner, Celent, Forrester u otras consultoras especializadas).",
    requerimiento_en: "Indicate whether the solution or the company is referenced in any benchmark, study, or industry evaluation (e.g., Gartner, Celent, Forrester, or other specialized consultants).",
    respuesta: "Siendo completamente transparentes: a lo largo de nuestros más de 34 años de trayectoria, SYSDE no ha participado en procesos de evaluación o referenciación con firmas como Gartner, Celent o Forrester. Nuestro crecimiento ha sido sostenido a través de relaciones directas con clientes, referencias del sector y la solidez de nuestras implementaciones.\n\nSí contamos con certificaciones ISO que respaldan nuestros procesos internos de desarrollo y calidad, lo cual demuestra nuestro compromiso con estándares internacionales de operación.",
    respuesta_en: "Being completely transparent: throughout our 34+ years of experience, SYSDE has not participated in evaluation or referencing processes with firms such as Gartner, Celent, or Forrester. Our growth has been sustained through direct client relationships, industry references, and the strength of our implementations.\n\nWe do hold ISO certifications that support our internal development and quality processes, which demonstrates our commitment to international operational standards.",
    consideraciones: "Aunque no contamos con referenciación en firmas de análisis, nuestra trayectoria de 34+ años y la cartera de clientes financieros activos respaldan la solidez de la solución.",
    consideraciones_en: "Although we do not have referencing from analyst firms, our 34+ year track record and active financial client portfolio support the solution's strength.",
    valor: "La transparencia de SYSDE al comunicar este punto genera confianza. La validación se sustenta en la experiencia real con instituciones financieras de la región y certificaciones ISO de calidad.",
    valor_en: "SYSDE's transparency in communicating this point builds trust. Validation is supported by real experience with financial institutions in the region and ISO quality certifications.",
    diagrams: [
      {
        type: "grid",
        title: "Respaldo de SYSDE",
        items: [
          "📅 34+ años de trayectoria",
          "🏅 Certificaciones ISO",
          "🤝 Relaciones directas con clientes",
          "🌎 Presencia regional consolidada",
          "🏦 Clientes financieros activos",
          "📈 Crecimiento orgánico sostenido",
        ],
      },
      {
        type: "flow",
        title: "Modelo de Crecimiento SYSDE",
        steps: [
          { label: "Implementación Exitosa", description: "Entrega de valor comprobado al cliente", icon: "🚀" },
          { label: "Referencia del Sector", description: "Clientes satisfechos recomiendan la solución", icon: "🤝" },
          { label: "Nuevos Contratos", description: "Expansión orgánica basada en resultados", icon: "📈" },
          { label: "Mejora Continua", description: "Retroalimentación impulsa evolución del producto", icon: "🔄" },
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid",
        title: "SYSDE Backing",
        items: [
          "📅 34+ years of experience",
          "🏅 ISO Certifications",
          "🤝 Direct client relationships",
          "🌎 Consolidated regional presence",
          "🏦 Active financial clients",
          "📈 Sustained organic growth",
        ],
      },
      {
        type: "flow",
        title: "SYSDE Growth Model",
        steps: [
          { label: "Successful Implementation", description: "Proven value delivery to client", icon: "🚀" },
          { label: "Industry Reference", description: "Satisfied clients recommend the solution", icon: "🤝" },
          { label: "New Contracts", description: "Organic expansion based on results", icon: "📈" },
          { label: "Continuous Improvement", description: "Feedback drives product evolution", icon: "🔄" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Referencias de Clientes Activos en Leasing",
    title_en: "Active Client References in Leasing",
    status: "answered",
    section: "A",
    subtitle: "Validación directa con instituciones del sector",
    subtitle_en: "Direct validation with industry institutions",
    requerimiento: "Compartir referencias de clientes activos en el sector financiero, idealmente vinculados a operaciones de leasing financiero u operativo, que respalden la experiencia y estabilidad de la solución.",
    requerimiento_en: "Share references of active clients in the financial sector, ideally linked to financial or operating leasing operations, that support the experience and stability of the solution.",
    respuesta: "Contamos con clientes activos en operaciones de leasing en Centroamérica y México. Estaremos encantados de facilitar contactos de referencia directa con estas instituciones en el marco de la evaluación, a fin de que puedan validar de primera mano la experiencia y estabilidad de la solución.\n\nLas referencias disponibles incluyen instituciones con implementaciones activas de nuestro módulo de Leasing, así como clientes que utilizan otros módulos del ecosistema SAF+ y pueden dar testimonio de la calidad de servicio, soporte y evolución de la plataforma.",
    respuesta_en: "We have active clients in leasing operations in Central America and Mexico. We will be happy to provide direct reference contacts with these institutions as part of the evaluation, so that you can validate firsthand the experience and stability of the solution.\n\nAvailable references include institutions with active implementations of our Leasing module, as well as clients using other SAF+ ecosystem modules who can attest to the quality of service, support, and platform evolution.",
    consideraciones: "Los contactos de referencia se facilitarán previa coordinación con las instituciones, respetando los acuerdos de confidencialidad vigentes.",
    consideraciones_en: "Reference contacts will be provided upon coordination with the institutions, respecting current confidentiality agreements.",
    valor: "BCP podrá contactar directamente a instituciones que operan con SAF+ Leasing para validar la experiencia real de uso, estabilidad y soporte de la plataforma.",
    valor_en: "BCP will be able to directly contact institutions operating with SAF+ Leasing to validate real usage experience, stability, and platform support.",
    diagrams: [
      {
        type: "table",
        title: "Referencias Disponibles",
        headers: ["Institución", "País", "Módulo Principal", "Disponibilidad"],
        rows: [
          ["CMI (Grupo Multi Inversiones)", "Centroamérica", "Leasing", "Referencia disponible"],
          ["Banco de Costa Rica", "Costa Rica", "Leasing", "Referencia disponible"],
          ["GNP México", "México", "Leasing", "Referencia disponible"],
          ["Unicomer", "Multi-país", "Créditos", "Referencia disponible"],
          ["Banco Nacional", "Costa Rica", "Créditos", "Referencia disponible"],
        ],
      },
      {
        type: "flow",
        title: "Proceso de Validación de Referencias",
        steps: [
          { label: "Solicitud BCP", description: "BCP indica instituciones de interés", icon: "📋" },
          { label: "Coordinación SYSDE", description: "Gestión de agenda con el cliente referencia", icon: "🤝" },
          { label: "Reunión de Referencia", description: "Llamada o reunión directa con el cliente", icon: "📞" },
          { label: "Validación", description: "BCP confirma experiencia y estabilidad", icon: "✅" },
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table",
        title: "Available References",
        headers: ["Institution", "Country", "Main Module", "Availability"],
        rows: [
          ["CMI (Grupo Multi Inversiones)", "Central America", "Leasing", "Reference available"],
          ["Banco de Costa Rica", "Costa Rica", "Leasing", "Reference available"],
          ["GNP México", "Mexico", "Leasing", "Reference available"],
          ["Unicomer", "Multi-country", "Credits", "Reference available"],
          ["Banco Nacional", "Costa Rica", "Credits", "Reference available"],
        ],
      },
      {
        type: "flow",
        title: "Reference Validation Process",
        steps: [
          { label: "BCP Request", description: "BCP indicates institutions of interest", icon: "📋" },
          { label: "SYSDE Coordination", description: "Schedule management with reference client", icon: "🤝" },
          { label: "Reference Meeting", description: "Direct call or meeting with client", icon: "📞" },
          { label: "Validation", description: "BCP confirms experience and stability", icon: "✅" },
        ],
      },
    ],
  },
];

export const counts = {
  total: questions.length,
  answered: questions.filter((q) => q.status === "answered").length,
};
