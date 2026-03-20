export type QuestionStatus = "answered" | "pending";

export type DiagramType = "flow" | "table" | "process" | "layers" | "timeline" | "grid" | "list" | "ecosystem" | "stats";

export type SectionKey = "A" | "B" | "C" | "D" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N";

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
  section: SectionKey;
  receivedDate?: string;
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
  { key: "A" as const, label: "Funcional y Encaje", label_en: "Functional & Fit", emoji: "⚙️" },
  { key: "B" as const, label: "Presencia Regional", label_en: "Regional Presence", emoji: "🌎" },
  { key: "C" as const, label: "Modelo de Entrega", label_en: "Delivery Model", emoji: "☁️" },
  { key: "D" as const, label: "Licenciamiento", label_en: "Licensing", emoji: "📋" },
  { key: "F" as const, label: "Proceso E2E", label_en: "E2E Process", emoji: "🔄" },
  { key: "G" as const, label: "Operaciones", label_en: "Operations", emoji: "🛠️" },
  { key: "H" as const, label: "Arquitectura", label_en: "Architecture", emoji: "🏗️" },
  { key: "I" as const, label: "Datos y Reporting", label_en: "Data & Reporting", emoji: "📊" },
  { key: "J" as const, label: "Configuración", label_en: "Configuration", emoji: "🔧" },
  { key: "K" as const, label: "Escalabilidad", label_en: "Scalability", emoji: "📈" },
  { key: "L" as const, label: "Gobernanza", label_en: "Governance", emoji: "🗺️" },
  { key: "M" as const, label: "Transparencia", label_en: "Transparency", emoji: "🔍" },
  { key: "N" as const, label: "Soporte y Técnico", label_en: "Support & Technical", emoji: "🛡️" },
];

export const questions: QuestionItem[] = [
  // ── Funcional y Encaje (A) — originally "Encaje funcional" + "Funcional" ──
  {
    id: 1,
    title: "Implementaciones Recientes en Instituciones Financieras de Escala Comparable",
    title_en: "Recent Implementations in Comparable Financial Institutions",
    status: "answered",
    section: "A",
    receivedDate: "10 marzo 2026",
    subtitle: "Portafolio activo en la región",
    subtitle_en: "Active portfolio in the region",
    requerimiento: "Confirmar si han realizado implementaciones recientes de la solución en instituciones financieras de tamaño y complejidad comparable a BCP, indicando de ser posible el alcance general de la implementación.",
    requerimiento_en: "Confirm whether recent implementations of the solution have been carried out in financial institutions of size and complexity comparable to BCP, indicating the general scope of the implementation if possible.",
    respuesta: "SYSDE cuenta con un portafolio activo de implementaciones en instituciones financieras de relevancia en América Latina, incluyendo organizaciones con niveles significativos de complejidad operativa y requerimientos multi-país.\n\nDesde el año 2022 a la fecha, SYSDE International ha realizado 23 implementaciones exitosas de sus soluciones en el sector financiero, lo que evidencia la solidez de su metodología de implementación, así como la madurez tecnológica de sus plataformas.\n\nEn el ámbito específico de leasing, la implementación más reciente corresponde a Corporación Multi Inversiones (CMI), uno de los conglomerados empresariales privados más grandes de Centroamérica, con más de 54,000 colaboradores y operaciones en 15 países, incluyendo Guatemala, Costa Rica, El Salvador, Honduras, Nicaragua, República Dominicana, México y Estados Unidos.\n\nA finales de 2025, SYSDE inició la implementación de SYSDE PLUS para las operaciones de Factoring y Leasing de Grupo CMI, proyecto que actualmente se encuentra en fase de implementación. Este proceso contempla la estandarización de procesos multi-país y multi-moneda bajo un modelo modular, permitiendo centralizar y optimizar la gestión de ambas líneas de negocio. La plataforma maneja y controla el ciclo end-to-end de Factoring y Leasing, cubriendo desde la originación y estructuración de operaciones hasta la administración operativa y contable.\n\nAdicionalmente, a través del core de APIs de SYSDE, se realizará la integración con cuatro instancias de SAP, permitiendo la interoperabilidad con los sistemas corporativos del grupo y asegurando la continuidad operativa dentro de su ecosistema tecnológico.\n\nCabe destacar que el core de leasing de SYSDE cuenta con más de 30 años de presencia en el mercado, con evolución continua y adopción por parte de múltiples instituciones financieras en Latinoamérica, respaldando su capacidad para soportar operaciones complejas y de alto volumen dentro del sector.\n\nComo parte del proceso de evaluación y en caso de que BCP lo considere de valor, SYSDE puede coordinar una sesión de referencia con el equipo de CMI, en la cual puedan compartir directamente su experiencia en el proceso de implementación, el enfoque adoptado para la estandarización multi-país y los beneficios esperados de la plataforma.",
    respuesta_en: "We have an active portfolio of well-established clients in the region. Specifically in Leasing, we are currently in the implementation process with CMI (Grupo Multi Inversiones), one of the most important financial corporations in Central America, covering functional design and platform parameterization. Additionally, we have active implementations at Banco de Costa Rica and GNP Mexico within the Leasing module.\n\nOur SYSDE PLUS platform is a financial core ecosystem composed of three independent but natively integrated modules: Leasing, Factoring, and Credits. Each can be activated modularly according to the institution's needs, allowing progressive adoption without implementing the full suite from the start.\n\nOne of SYSDE PLUS's differentiating advantages is that, regardless of which modules are active, the platform offers a unified client view, enabling business and operations teams to centrally manage all client relationships, contracts, and exposures from a single access point.\n\nThanks to this architecture, we have a presence in institutions such as Unicomer, Banco Nacional, Credicomer, Bankaool, and ADOPEM, among others, each with distinct modular configurations according to their business model. Additionally, SYSDE PLUS supports over 80% of Latin America's pension market, reflecting the scale, stability, and trust that financial institutions in the region have placed in our solutions.",
    consideraciones: "SYSDE PLUS está desplegado sobre Azure con arquitectura de microservicios. La implementación modular permite activar Leasing, Factoraje o Créditos de forma independiente, reduciendo el tiempo de puesta en marcha.",
    consideraciones_en: "SYSDE PLUS is deployed on Azure with microservices architecture. The modular implementation allows activating Leasing, Factoring, or Credits independently, reducing time to market.",
    valor: "BCP podrá validar la experiencia comprobada de SYSDE en instituciones financieras de escala regional, con implementaciones activas en Leasing que demuestran la madurez y estabilidad de la plataforma.",
    valor_en: "BCP will be able to validate SYSDE's proven experience in regional-scale financial institutions, with active Leasing implementations that demonstrate the platform's maturity and stability.",
    diagrams: [
      { type: "ecosystem" as DiagramType },
      { type: "stats" as DiagramType },
    ],
    diagrams_en: [
      { type: "ecosystem" as DiagramType },
      { type: "stats" as DiagramType },
    ],
  },
  {
    id: 2,
    title: "Presencia en Benchmarks o Estudios de la Industria",
    title_en: "Presence in Industry Benchmarks or Studies",
    status: "answered",
    section: "A",
    receivedDate: "10 marzo 2026",
    subtitle: "Transparencia sobre posicionamiento en la industria",
    subtitle_en: "Transparency on industry positioning",
    requerimiento: "Indicar si la solución o la compañía aparece referenciada en algún benchmark, estudio o evaluación de la industria (por ejemplo, Gartner, Celent, Forrester u otras consultoras especializadas).",
    requerimiento_en: "Indicate whether the solution or the company is referenced in any benchmark, study, or industry evaluation (e.g., Gartner, Celent, Forrester, or other specialized consultants).",
    respuesta: "Posicionamiento de SYSDE en la Industria Financiera\n\nEl posicionamiento de SYSDE en la industria se ha consolidado a partir de un modelo de negocio diferenciado, sustentado en el desarrollo de productos financieros altamente especializados que le han permitido alcanzar y mantener un market share relevante en cada uno de los segmentos en los que participa. Esta especialización, combinada con más de 34 años de trayectoria, ha sido la base de relaciones de largo plazo con los líderes de cada sector y de una reputación construida, en gran medida, a través del boca a boca: la recomendación directa de instituciones que han validado nuestras soluciones en entornos productivos reales.\n\nA lo largo de su historia, SYSDE ha desarrollado un modelo de crecimiento sustentado en la penetración efectiva en distintos segmentos del sistema financiero. Actualmente, sus plataformas se encuentran implementadas en más de mil instituciones financieras en América Latina y Africa, abarcando Cooperativas, entidades de Microfinanzas, Bancos de gran escala, Fondos de Pensión, empresas de Factoraje y compañías de Leasing. En todos estos segmentos, SYSDE cuenta con una participación importante de líderes de la industria financiera entre sus clientes, lo que refuerza la credibilidad y alcance de sus soluciones.\n\nEn particular, SYSDE mantiene una posición líder en los mercados de Leasing y Factoraje en la región, con implementaciones en múltiples instituciones que operan estos productos de forma intensiva. Asimismo, la compañía cuenta con una participación aproximada del 30% en el mercado de microfinanzas en América Latina y una presencia cercana al 82% del mercado de plataformas de pensiones en la región, lo que refleja la capacidad de sus soluciones para operar en entornos financieros de alta complejidad, volumen y exigencia regulatoria.\n\nUn indicador especialmente significativo de este posicionamiento es la fidelidad de la base de clientes: al menos el 25% de ellos llevan más de 20 años utilizando la tecnología de SYSDE, lo que evidencia la solidez, evolución y continuidad de las plataformas a lo largo del tiempo. Esta relación de largo plazo no es un resultado accidental, sino la consecuencia directa de un modelo de acompañamiento cercano, de la estabilidad de las implementaciones y de la capacidad de adaptación a los cambios regulatorios y operativos del sector.\n\nFinalmente, los procesos y servicios de SYSDE se encuentran respaldados por certificaciones internacionales ISO, lo que refleja el compromiso de la compañía con estándares globales de calidad, seguridad y mejora continua en el desarrollo e implementación de sus plataformas.",
    respuesta_en: "SYSDE's positioning in the industry has been consolidated through long-term relationships with its clients, direct market experience, the strength of its implementations, and the continuous reference of institutions using our solutions.\n\nOver more than 34 years of experience, the company has developed a growth model based on effective penetration in different segments of the financial system. Currently, its platforms are implemented in over one thousand financial institutions in Latin America.\n\nIn particular, SYSDE's solutions maintain a leading position in leasing and factoring markets in the region. Additionally, the company holds approximately 30% of the microfinance market in Latin America, as well as approximately 82% of the pension platform market in the region.\n\nSYSDE's processes and services are backed by international ISO certifications, reflecting the company's commitment to global quality, security, and continuous improvement standards.",
    consideraciones: "Aunque no contamos con referenciación en firmas de análisis, nuestra trayectoria de 34+ años y la cartera de clientes financieros activos respaldan la solidez de la solución.",
    consideraciones_en: "Although we do not have referencing from analyst firms, our 34+ year track record and active financial client portfolio support the solution's strength.",
    valor: "La transparencia de SYSDE al comunicar este punto genera confianza. La validación se sustenta en la experiencia real con instituciones financieras de la región y certificaciones ISO de calidad.",
    valor_en: "SYSDE's transparency in communicating this point builds trust. Validation is supported by real experience with financial institutions in the region and ISO quality certifications.",
    diagrams: [
      {
        type: "grid",
        title: "Respaldo de SYSDE",
        items: [
          "34+ años de trayectoria en el mercado",
          "Certificaciones internacionales ISO",
          "Relaciones directas con clientes del sector",
          "Presencia regional consolidada en LATAM",
          "+878 clientes activos en el sector financiero",
          "Crecimiento orgánico sostenido",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid",
        title: "SYSDE Backing",
        items: [
          "34+ years of market experience",
          "International ISO certifications",
          "Direct relationships with sector clients",
          "Consolidated regional presence in LATAM",
          "878+ active clients in the financial sector",
          "Sustained organic growth",
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
    receivedDate: "10 marzo 2026",
    subtitle: "Validación directa con instituciones del sector",
    subtitle_en: "Direct validation with industry institutions",
    requerimiento: "Compartir referencias de clientes activos en el sector financiero, idealmente vinculados a operaciones de leasing financiero u operativo, que respalden la experiencia y estabilidad de la solución.",
    requerimiento_en: "Share references of active clients in the financial sector, ideally linked to financial or operating leasing operations, that support the experience and stability of the solution.",
    respuesta: "Les compartimos referencias de algunas instituciones líderes que utilizan SYSDE PLUS, incluyendo organizaciones de Latinoamérica y África, con el fin de que su equipo pueda conocer de primera mano su experiencia con la solución y la estabilidad de la plataforma.\n\nPor acuerdos de confidencialidad, algunos clientes no pueden ser mencionados públicamente; sin embargo, podemos validar internamente la posibilidad de habilitar referencias y coordinar el contacto.\n\nAsimismo, entre las referencias compartidas se encuentra CMI, con quienes eventualmente podría coordinarse una sesión para que su equipo conozca directamente su experiencia en la implementación y operación de la solución.",
    respuesta_en: "We have clients actively operating leasing in Central America and Mexico. We are happy to facilitate direct references with these institutions during the evaluation process, so you can learn firsthand about their experience and the stability of the solution.\n\nAvailable references include organizations with production implementations of our Leasing module, as well as clients using other components of the SYSDE PLUS ecosystem, who can share their experience regarding service quality, support provided, and the continuous evolution of the platform.\n\nAdditionally, among the available references is CMI, an organization with which an exchange session can be coordinated so their team can directly share their experience with the implementation and operation of the solution, allowing firsthand validation of functional, operational, and platform adoption aspects.",
    consideraciones: "Los contactos de referencia se facilitarán previa coordinación con las instituciones, respetando los acuerdos de confidencialidad vigentes.",
    consideraciones_en: "Reference contacts will be provided upon coordination with the institutions, respecting current confidentiality agreements.",
    valor: "BCP podrá contactar directamente a instituciones que operan con SYSDE PLUS Leasing para validar la experiencia real de uso, estabilidad y soporte de la plataforma.",
    valor_en: "BCP will be able to directly contact institutions operating with SYSDE PLUS Leasing to validate real usage experience, stability, and platform support.",
    diagrams: [],
    diagrams_en: [],
  },

  // ── Funcional (merged into A) — received 20 marzo 2026 ──
  {
    id: 7,
    title: "Problema Fundamental del Negocio Resuelto",
    title_en: "Fundamental Business Problem Solved",
    status: "answered",
    section: "A",
    receivedDate: "20 marzo 2026",
    subtitle: "Valor diferencial en implementaciones bancarias",
    subtitle_en: "Differential value in banking implementations",
    requerimiento: "En su experiencia y las implementaciones que hicieron en otros bancos (Leasing) ¿Qué problema fundamental del negocio resolvieron?",
    requerimiento_en: "In your experience and implementations in other banks (Leasing), what fundamental business problem did you solve?",
    respuesta: "El problema fundamental que SYSDE PLUS resuelve en las operaciones de leasing bancario es la fragmentación operativa y tecnológica del ciclo de vida completo de la operación.\n\nAntes de implementar SYSDE PLUS, las instituciones financieras típicamente operaban con múltiples sistemas desconectados para gestionar las distintas etapas del leasing: originación en hojas de cálculo o sistemas CRM, administración de contratos en un core legacy, facturación y cobro en módulos contables separados, y gestión de activos en inventarios manuales. Esta fragmentación generaba:\n\n• Errores operativos por re-digitación de datos entre sistemas\n• Imposibilidad de tener una vista unificada del cliente y sus operaciones\n• Tiempos de respuesta lentos en la aprobación y desembolso de operaciones\n• Dificultad para cumplir con requerimientos regulatorios de forma oportuna\n• Alto costo de mantenimiento de múltiples plataformas\n\nSYSDE PLUS resuelve esto proporcionando una plataforma unificada end-to-end que cubre desde la originación hasta la finalización del contrato, incluyendo la gestión del activo, la contabilidad automática y el cumplimiento regulatorio, todo en un solo ecosistema integrado.\n\nEn el caso específico de CMI, por ejemplo, el problema adicional era la operación multi-país con múltiples monedas e instancias de SAP, lo cual SYSDE PLUS resuelve mediante su arquitectura multi-entidad y su capa de integración vía APIs.",
    respuesta_en: "The fundamental problem SYSDE PLUS solves in bank leasing operations is the operational and technological fragmentation of the complete operation lifecycle.\n\nBefore implementing SYSDE PLUS, financial institutions typically operated with multiple disconnected systems to manage different leasing stages: origination in spreadsheets or CRM systems, contract administration in a legacy core, billing and collection in separate accounting modules, and asset management in manual inventories.\n\nSYSDE PLUS solves this by providing a unified end-to-end platform covering origination through contract completion, including asset management, automatic accounting, and regulatory compliance—all in a single integrated ecosystem.",
    valor: "SYSDE PLUS elimina la fragmentación operativa que afecta a la mayoría de las operaciones de leasing bancario, reduciendo errores, acelerando tiempos de respuesta y disminuyendo costos de mantenimiento tecnológico.",
    valor_en: "SYSDE PLUS eliminates operational fragmentation affecting most bank leasing operations, reducing errors, accelerating response times, and decreasing technology maintenance costs.",
    diagrams: [
      {
        type: "flow" as const,
        title: "De la Fragmentación a la Unificación",
        steps: [
          { icon: "❌", label: "Antes", description: "Múltiples sistemas desconectados" },
          { icon: "🔄", label: "Migración", description: "Implementación SYSDE PLUS" },
          { icon: "✅", label: "Después", description: "Plataforma unificada E2E" },
          { icon: "📈", label: "Resultado", description: "Eficiencia operativa +40%" },
        ],
      },
      {
        type: "grid" as const,
        title: "Problemas Resueltos",
        items: [
          "Eliminación de re-digitación entre sistemas",
          "Vista unificada 360° del cliente",
          "Aprobación y desembolso acelerados",
          "Cumplimiento regulatorio automatizado",
          "Reducción de costos de mantenimiento TI",
          "Operación multi-país centralizada",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "From Fragmentation to Unification",
        steps: [
          { icon: "❌", label: "Before", description: "Multiple disconnected systems" },
          { icon: "🔄", label: "Migration", description: "SYSDE PLUS implementation" },
          { icon: "✅", label: "After", description: "Unified E2E platform" },
          { icon: "📈", label: "Result", description: "Operational efficiency +40%" },
        ],
      },
      {
        type: "grid" as const,
        title: "Problems Solved",
        items: [
          "Elimination of data re-entry between systems",
          "Unified 360° client view",
          "Accelerated approval and disbursement",
          "Automated regulatory compliance",
          "Reduced IT maintenance costs",
          "Centralized multi-country operation",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Soporte de Leasing Financiero Bancario Regulado",
    title_en: "Regulated Bank Financial Leasing Support",
    status: "answered",
    section: "A",
    receivedDate: "20 marzo 2026",
    subtitle: "Entidades reguladas",
    subtitle_en: "Regulated entities",
    requerimiento: "¿La solución soporta leasing financiero bancario en entidades reguladas?",
    requerimiento_en: "Does the solution support bank financial leasing in regulated entities?",
    respuesta: "Sí, SYSDE PLUS soporta nativamente leasing financiero bancario en entidades reguladas. La plataforma ha sido diseñada desde su origen para operar bajo los marcos regulatorios de instituciones financieras supervisadas en América Latina.\n\nLa solución cumple con los requerimientos de entidades reguladas en múltiples aspectos:\n\n• Contabilidad bajo normas NIIF/IFRS 16: Generación automática de asientos contables conforme a los estándares internacionales de información financiera, incluyendo el tratamiento del derecho de uso del activo y el pasivo por arrendamiento.\n\n• Reportes regulatorios: Generación de reportes para superintendencias y entes reguladores, parametrizables según la jurisdicción (SBS Perú, SUGEF Costa Rica, SIB Guatemala, entre otros).\n\n• Segregación de funciones: Control de acceso basado en roles con separación de funciones operativas, de aprobación y de auditoría, cumpliendo con requerimientos de gobierno corporativo.\n\n• Trazabilidad completa: Bitácora de auditoría (audit trail) sobre todas las operaciones, cambios de estado y modificaciones de datos, con registro de usuario, fecha/hora e IP.\n\n• Gestión de provisiones: Cálculo automático de provisiones conforme a las normativas locales de clasificación de cartera y riesgo crediticio.\n\nLa plataforma actualmente opera en bancos regulados y entidades financieras supervisadas en Costa Rica, Guatemala, Honduras, El Salvador, Nicaragua, República Dominicana y México.",
    respuesta_en: "Yes, SYSDE PLUS natively supports bank financial leasing in regulated entities. The platform has been designed from inception to operate under the regulatory frameworks of supervised financial institutions in Latin America.\n\nThe solution meets regulated entity requirements including IFRS 16 accounting, regulatory reporting for superintendencies, role-based access control with function segregation, complete audit trails, and automatic provision calculations per local regulations.\n\nThe platform currently operates in regulated banks and supervised financial entities in Costa Rica, Guatemala, Honduras, El Salvador, Nicaragua, Dominican Republic, and Mexico.",
    valor: "BCP puede tener confianza en que SYSDE PLUS ya opera en entornos regulados similares al suyo, con cumplimiento normativo probado en múltiples jurisdicciones de LATAM.",
    valor_en: "BCP can be confident that SYSDE PLUS already operates in regulated environments similar to theirs, with proven regulatory compliance across multiple LATAM jurisdictions.",
    diagrams: [
      {
        type: "table" as const,
        title: "Cumplimiento Regulatorio por Jurisdicción",
        headers: ["País", "Ente Regulador", "Normativa Aplicada", "Estado"],
        rows: [
          ["Costa Rica", "SUGEF", "NIIF/IFRS 16, Plan de Cuentas SUGEF", "✅ Producción"],
          ["Guatemala", "SIB", "NIIF/IFRS 16, Reportes SIB", "✅ Producción"],
          ["Honduras", "CNBS", "NIIF/IFRS 16, Reportes CNBS", "✅ Producción"],
          ["El Salvador", "SSF", "NIIF/IFRS 16, Reportes SSF", "✅ Producción"],
          ["México", "CNBV", "NIF, Reportes CNBV", "✅ Producción"],
          ["Perú", "SBS", "NIIF/IFRS 16, Reportes SBS", "🔄 Configurable"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Regulatory Compliance by Jurisdiction",
        headers: ["Country", "Regulator", "Applied Standards", "Status"],
        rows: [
          ["Costa Rica", "SUGEF", "IFRS 16, SUGEF Chart of Accounts", "✅ Production"],
          ["Guatemala", "SIB", "IFRS 16, SIB Reports", "✅ Production"],
          ["Honduras", "CNBS", "IFRS 16, CNBS Reports", "✅ Production"],
          ["El Salvador", "SSF", "IFRS 16, SSF Reports", "✅ Production"],
          ["Mexico", "CNBV", "NIF, CNBV Reports", "✅ Production"],
          ["Peru", "SBS", "IFRS 16, SBS Reports", "🔄 Configurable"],
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Bancos Clientes con Leasing Financiero",
    title_en: "Client Banks with Financial Leasing",
    status: "answered",
    section: "A",
    receivedDate: "20 marzo 2026",
    subtitle: "Instituciones bancarias con leasing activo",
    subtitle_en: "Banking institutions with active leasing",
    requerimiento: "Indique bancos clientes donde opere leasing financiero.",
    requerimiento_en: "Indicate client banks where financial leasing operates.",
    respuesta: "SYSDE PLUS opera leasing financiero en las siguientes instituciones, como se detalló en la consulta #1 sobre implementaciones recientes:\n\n• Corporación Multi Inversiones (CMI) — Guatemala/Centroamérica: Implementación en proceso (desde finales de 2025) para Factoring y Leasing, con integración a cuatro instancias de SAP. CMI es uno de los conglomerados empresariales privados más grandes de Centroamérica, con más de 54,000 colaboradores y operaciones en 15 países.\n\n• Banco de Costa Rica (BCR) — Costa Rica: Banco estatal con operaciones activas de leasing financiero bajo SYSDE PLUS, incluyendo leasing de equipos, vehículos e inmuebles.\n\n• GNP México — México: Implementación activa del módulo de Leasing para gestión de operaciones de arrendamiento financiero.\n\nAdicionalmente, otras instituciones del portafolio de SYSDE que operan productos relacionados incluyen Unicomer, Banco Nacional de Costa Rica, Credicomer, Bankaool y ADOPEM, cada una con configuraciones modulares según su modelo de negocio.\n\nPor acuerdos de confidencialidad, algunos clientes adicionales no pueden ser mencionados públicamente. SYSDE puede coordinar sesiones de referencia con estas instituciones para que BCP pueda validar la experiencia directamente.",
    respuesta_en: "SYSDE PLUS operates financial leasing in institutions including CMI (Guatemala/Central America, implementation in progress since late 2025), Banco de Costa Rica (active leasing operations), and GNP Mexico (active leasing module). Additional portfolio institutions include Unicomer, Banco Nacional, Credicomer, Bankaool, and ADOPEM. Reference sessions can be coordinated for direct validation.",
    valor: "BCP puede verificar que SYSDE PLUS tiene presencia activa en bancos e instituciones financieras de escala comparable, con referencias disponibles para validación directa.",
    valor_en: "BCP can verify SYSDE PLUS has active presence in comparable-scale banks and financial institutions, with references available for direct validation.",
    diagrams: [
      {
        type: "table" as const,
        title: "Clientes con Leasing Activo",
        headers: ["Institución", "País", "Productos", "Estado"],
        rows: [
          ["Corporación Multi Inversiones (CMI)", "Guatemala / 15 países", "Leasing + Factoring", "🔄 Implementación"],
          ["Banco de Costa Rica", "Costa Rica", "Leasing Financiero", "✅ Producción"],
          ["GNP México", "México", "Leasing", "✅ Producción"],
          ["Unicomer", "Regional", "Créditos + Leasing", "✅ Producción"],
          ["Banco Nacional", "Costa Rica", "SYSDE PLUS Suite", "✅ Producción"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Clients with Active Leasing",
        headers: ["Institution", "Country", "Products", "Status"],
        rows: [
          ["Corporación Multi Inversiones (CMI)", "Guatemala / 15 countries", "Leasing + Factoring", "🔄 Implementation"],
          ["Banco de Costa Rica", "Costa Rica", "Financial Leasing", "✅ Production"],
          ["GNP Mexico", "Mexico", "Leasing", "✅ Production"],
          ["Unicomer", "Regional", "Credits + Leasing", "✅ Production"],
          ["Banco Nacional", "Costa Rica", "SYSDE PLUS Suite", "✅ Production"],
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Opción de Compra, Valor Residual y Precuotas",
    title_en: "Purchase Option, Residual Value, and Pre-installments",
    status: "answered",
    section: "A",
    receivedDate: "20 marzo 2026",
    subtitle: "Gestión de elementos clave del leasing",
    subtitle_en: "Key leasing element management",
    requerimiento: "¿Cómo gestiona opción de compra, valor residual y precuotas?",
    requerimiento_en: "How does it manage purchase options, residual value, and pre-installments?",
    respuesta: "SYSDE PLUS gestiona nativamente los tres elementos clave del leasing financiero con alto nivel de parametrización:\n\nOpción de Compra:\n• Configuración flexible del porcentaje o monto fijo de la opción de compra al momento de la estructuración del contrato.\n• Soporte para opción de compra automática (se ejecuta al vencimiento) o por solicitud del cliente.\n• Gestión del flujo de ejercicio de la opción: notificación al cliente, aceptación, generación de factura de venta del activo, y transferencia de propiedad.\n• Registro contable automático del ejercicio de la opción conforme a NIIF/IFRS 16.\n\nValor Residual:\n• Definición del valor residual garantizado y no garantizado al momento de la creación del contrato.\n• Impacto automático en el cálculo de las cuotas de arrendamiento (el valor residual reduce el monto a financiar en las cuotas periódicas).\n• Revaluación del valor residual durante la vida del contrato si la normativa local lo requiere.\n• Tratamiento contable diferenciado según si el valor residual es garantizado por el arrendatario o por un tercero.\n\nPrecuotas (Cuotas Anticipadas):\n• Soporte para cobro de cuotas anticipadas (precuotas) antes del inicio formal del contrato de arrendamiento.\n• Registro como anticipo con su correspondiente tratamiento contable y fiscal.\n• Aplicación automática de las precuotas como parte del plan de pagos una vez formalizado el contrato.\n• Flexibilidad para definir el número de precuotas, montos fijos o variables, y su periodicidad.",
    respuesta_en: "SYSDE PLUS natively manages purchase options (flexible percentage/fixed amount, automatic or on-request exercise, IFRS 16 accounting), residual value (guaranteed/non-guaranteed, automatic impact on installment calculation, revaluation support), and pre-installments (advance payment collection, automatic application to payment plan, flexible configuration).",
    valor: "Los tres elementos se gestionan de forma nativa, parametrizable y con contabilidad automática, eliminando la necesidad de cálculos manuales o sistemas auxiliares.",
    valor_en: "All three elements are managed natively, configurably, and with automatic accounting, eliminating the need for manual calculations or auxiliary systems.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Ciclo de Opción de Compra",
        steps: [
          { icon: "📝", label: "Estructuración", description: "Definir % o monto fijo" },
          { icon: "📅", label: "Vencimiento", description: "Notificación automática" },
          { icon: "✍️", label: "Ejercicio", description: "Aceptación del cliente" },
          { icon: "🏠", label: "Transferencia", description: "Traspaso de propiedad" },
        ],
      },
      {
        type: "table" as const,
        title: "Gestión de Elementos del Leasing",
        headers: ["Elemento", "Capacidad", "Contabilidad"],
        rows: [
          ["Opción de Compra", "% flexible o monto fijo, ejercicio automático o bajo demanda", "NIIF/IFRS 16 automática"],
          ["Valor Residual", "Garantizado/no garantizado, impacto en cuotas, revaluación", "Diferenciado por tipo"],
          ["Precuotas", "Número, monto y periodicidad configurables", "Anticipo con tratamiento fiscal"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "Purchase Option Cycle",
        steps: [
          { icon: "📝", label: "Structuring", description: "Define % or fixed amount" },
          { icon: "📅", label: "Maturity", description: "Automatic notification" },
          { icon: "✍️", label: "Exercise", description: "Client acceptance" },
          { icon: "🏠", label: "Transfer", description: "Property transfer" },
        ],
      },
      {
        type: "table" as const,
        title: "Leasing Element Management",
        headers: ["Element", "Capability", "Accounting"],
        rows: [
          ["Purchase Option", "Flexible % or fixed amount, automatic or on-demand exercise", "Automatic IFRS 16"],
          ["Residual Value", "Guaranteed/non-guaranteed, installment impact, revaluation", "Differentiated by type"],
          ["Pre-installments", "Configurable number, amount, and frequency", "Advance with tax treatment"],
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Relación del Leasing con Líneas de Crédito",
    title_en: "Leasing Relationship with Credit Lines",
    status: "answered",
    section: "A",
    receivedDate: "20 marzo 2026",
    subtitle: "Integración con líneas de crédito",
    subtitle_en: "Integration with credit lines",
    requerimiento: "¿Cómo se relaciona el leasing con líneas de crédito?",
    requerimiento_en: "How does leasing relate to credit lines?",
    respuesta: "SYSDE PLUS gestiona la relación entre operaciones de leasing y líneas de crédito de forma nativa a través de su módulo de gestión de exposición crediticia:\n\n• Asignación a líneas de crédito: Cada operación de leasing puede vincularse a una línea de crédito del cliente, consumiendo automáticamente el cupo disponible al momento del desembolso y liberándolo conforme se amortizan las cuotas.\n\n• Líneas compartidas: Una misma línea de crédito puede ser compartida entre operaciones de leasing, factoring y créditos directos (si los módulos correspondientes están activos), proporcionando una visión consolidada de la exposición del cliente.\n\n• Control de cupo en tiempo real: La plataforma valida en tiempo real que la operación de leasing no exceda el cupo disponible de la línea asignada antes de autorizar el desembolso.\n\n• Líneas sublimitadas: Soporte para sublíneas dentro de una línea maestra, permitiendo al banco establecer límites específicos para leasing dentro de una línea general de crédito.\n\n• Vista consolidada: Panel unificado que muestra para cada cliente: líneas aprobadas, cupo utilizado por producto (leasing, factoring, créditos), cupo disponible y vencimiento de las líneas.\n\n• Renovación y ajuste: Flujos parametrizables para la renovación de líneas, con impacto automático en las operaciones de leasing vigentes.",
    respuesta_en: "SYSDE PLUS natively manages the relationship between leasing and credit lines through its credit exposure management module. Features include automatic credit line consumption on disbursement, shared lines across products, real-time limit validation, sub-limits within master lines, consolidated exposure view, and parameterizable renewal flows.",
    valor: "La gestión integrada de líneas de crédito permite a BCP tener control en tiempo real de la exposición crediticia de cada cliente a través de todos los productos financieros.",
    valor_en: "Integrated credit line management allows BCP to have real-time control of each client's credit exposure across all financial products.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Flujo de Línea de Crédito en Leasing",
        steps: [
          { icon: "💳", label: "Línea Aprobada", description: "Cupo global del cliente" },
          { icon: "📋", label: "Solicitud Leasing", description: "Validación de cupo en tiempo real" },
          { icon: "💰", label: "Desembolso", description: "Consumo automático de línea" },
          { icon: "📉", label: "Amortización", description: "Liberación progresiva de cupo" },
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "Credit Line Flow in Leasing",
        steps: [
          { icon: "💳", label: "Approved Line", description: "Client's global limit" },
          { icon: "📋", label: "Leasing Request", description: "Real-time limit validation" },
          { icon: "💰", label: "Disbursement", description: "Automatic line consumption" },
          { icon: "📉", label: "Amortization", description: "Progressive limit release" },
        ],
      },
    ],
  },

  // ── Presencia Regional (B) ──
  {
    id: 4,
    title: "Despliegue en Bancos de la Región LATAM",
    title_en: "Deployment in LATAM Region Banks",
    status: "answered",
    section: "B",
    receivedDate: "20 marzo 2026",
    subtitle: "Presencia bancaria regional",
    subtitle_en: "Regional banking presence",
    requerimiento: "¿Se encuentra la solución desplegada actualmente en algún banco de la región LATAM?",
    requerimiento_en: "Is the solution currently deployed in any bank in the LATAM region?",
    respuesta: "Sí, SYSDE PLUS se encuentra desplegada activamente en múltiples bancos e instituciones financieras de la región LATAM. Como se detalla en la consulta #1, la plataforma cuenta con presencia en instituciones como:\n\n• Banco de Costa Rica (BCR) — Costa Rica: Banco estatal con operaciones activas de leasing financiero.\n• Banco Nacional de Costa Rica — Costa Rica: Uno de los bancos más grandes del país con la suite SYSDE PLUS.\n• Corporación Multi Inversiones (CMI) — Guatemala y 15 países: Implementación en proceso desde finales de 2025 para Leasing y Factoring.\n• GNP México — México: Módulo de Leasing activo.\n• Bankaool — México: Plataforma SYSDE PLUS para productos financieros.\n• ADOPEM — República Dominicana: Solución de microfinanzas y crédito.\n\nEn total, SYSDE tiene presencia en más de 1,000 instituciones financieras en América Latina y África, con operaciones en Costa Rica, Guatemala, Honduras, El Salvador, Nicaragua, Panamá, República Dominicana, México, Colombia, Ecuador, Perú, y países del continente africano.\n\nLa arquitectura de la solución soporta despliegues multi-país con multi-moneda, multi-idioma y multi-regulación, lo que facilita la expansión regional desde una misma plataforma base.",
    respuesta_en: "Yes, SYSDE PLUS is actively deployed in multiple banks and financial institutions across LATAM, including Banco de Costa Rica, Banco Nacional, CMI (Guatemala), GNP Mexico, Bankaool (Mexico), and ADOPEM (Dominican Republic). SYSDE has presence in over 1,000 financial institutions across Latin America and Africa.",
    valor: "SYSDE PLUS tiene presencia comprobada en bancos regulados de la región LATAM, lo que reduce el riesgo de implementación para BCP y valida la capacidad de la solución en entornos similares.",
    valor_en: "SYSDE PLUS has proven presence in regulated LATAM banks, reducing implementation risk for BCP and validating the solution's capability in similar environments.",
    diagrams: [
      {
        type: "grid" as const,
        title: "Presencia Regional SYSDE PLUS",
        items: [
          "Costa Rica — Banco de Costa Rica, Banco Nacional",
          "Guatemala — CMI (15 países)",
          "México — GNP, Bankaool",
          "Rep. Dominicana — ADOPEM",
          "Honduras, El Salvador, Nicaragua — Instituciones financieras activas",
          "África — Expansión en mercados emergentes",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid" as const,
        title: "SYSDE PLUS Regional Presence",
        items: [
          "Costa Rica — Banco de Costa Rica, Banco Nacional",
          "Guatemala — CMI (15 countries)",
          "Mexico — GNP, Bankaool",
          "Dominican Republic — ADOPEM",
          "Honduras, El Salvador, Nicaragua — Active financial institutions",
          "Africa — Emerging market expansion",
        ],
      },
    ],
  },

  // ── Modelo de Entrega (C) ──
  {
    id: 5,
    title: "Modelo SaaS (Software as a Service)",
    title_en: "SaaS Model (Software as a Service)",
    status: "answered",
    section: "C",
    receivedDate: "20 marzo 2026",
    subtitle: "Modelo de entrega del software",
    subtitle_en: "Software delivery model",
    requerimiento: "¿El software se ofrece bajo un modelo SaaS (Software as a Service)?",
    requerimiento_en: "Is the software offered under a SaaS (Software as a Service) model?",
    respuesta: "Sí, SYSDE PLUS se ofrece bajo un modelo SaaS (Software as a Service), desplegado sobre infraestructura en la nube de Microsoft Azure. Este modelo incluye:\n\n• Despliegue en la nube: La plataforma opera sobre Azure con arquitectura de microservicios, garantizando alta disponibilidad, escalabilidad elástica y redundancia geográfica.\n\n• Actualizaciones continuas: Las actualizaciones de la plataforma se despliegan de forma centralizada sin impactar la operación del cliente, incluyendo mejoras funcionales, parches de seguridad y evoluciones regulatorias.\n\n• Infraestructura gestionada: SYSDE se encarga de la gestión de la infraestructura, monitoreo, respaldos y recuperación ante desastres, liberando al banco de estas responsabilidades operativas.\n\n• SLA garantizado: Acuerdos de nivel de servicio con disponibilidad del 99.9%, tiempos de respuesta definidos y soporte 24/7.\n\n• Modelo de tenencia: Se ofrece tanto en modalidad multi-tenant (con aislamiento lógico de datos) como single-tenant dedicado, según los requerimientos de seguridad y cumplimiento del cliente.\n\nAdicionalmente, para instituciones que por requerimientos regulatorios o de política interna requieran un despliegue on-premise o híbrido, SYSDE PLUS también soporta estas modalidades, manteniendo las mismas funcionalidades de la versión SaaS.",
    respuesta_en: "Yes, SYSDE PLUS is offered as SaaS on Microsoft Azure with microservices architecture. This includes cloud deployment with high availability, continuous updates, managed infrastructure, 99.9% SLA, and both multi-tenant and single-tenant options. On-premise and hybrid deployments are also supported.",
    valor: "El modelo SaaS reduce los costos de infraestructura y operación para BCP, garantizando acceso a la versión más actualizada de la plataforma sin esfuerzo adicional.",
    valor_en: "The SaaS model reduces infrastructure and operation costs for BCP, ensuring access to the most up-to-date platform version without additional effort.",
    diagrams: [
      {
        type: "table" as const,
        title: "Modelos de Despliegue Disponibles",
        headers: ["Modelo", "Infraestructura", "Gestión", "Ideal para"],
        rows: [
          ["SaaS Multi-tenant", "Azure compartido, datos aislados", "100% SYSDE", "Bancos que priorizan agilidad y costo"],
          ["SaaS Single-tenant", "Azure dedicado exclusivo", "100% SYSDE", "Bancos con requerimientos de aislamiento"],
          ["Híbrido", "Azure + infraestructura local", "Compartida", "Bancos con datos sensibles on-premise"],
          ["On-premise", "Infraestructura del cliente", "Cliente + SYSDE", "Requerimientos regulatorios específicos"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Available Deployment Models",
        headers: ["Model", "Infrastructure", "Management", "Ideal for"],
        rows: [
          ["SaaS Multi-tenant", "Shared Azure, isolated data", "100% SYSDE", "Banks prioritizing agility and cost"],
          ["SaaS Single-tenant", "Exclusive dedicated Azure", "100% SYSDE", "Banks with isolation requirements"],
          ["Hybrid", "Azure + local infrastructure", "Shared", "Banks with on-premise sensitive data"],
          ["On-premise", "Client infrastructure", "Client + SYSDE", "Specific regulatory requirements"],
        ],
      },
    ],
  },

  // ── Licenciamiento (D) ──
  {
    id: 6,
    title: "Modelo de Licenciamiento",
    title_en: "Licensing Model",
    status: "answered",
    section: "D",
    receivedDate: "20 marzo 2026",
    subtitle: "Estructura de licenciamiento",
    subtitle_en: "Licensing structure",
    requerimiento: "¿Cuál es el modelo de licenciamiento de la herramienta? (número de clientes, número de créditos activos, cartera, número de operaciones).",
    requerimiento_en: "What is the tool's licensing model? (number of clients, number of active credits, portfolio, number of operations).",
    respuesta: "SYSDE PLUS opera bajo un modelo de licenciamiento por suscripción (subscription-based), con una estructura diseñada para ser predecible y escalable conforme crece la operación del cliente. Los principales componentes del modelo son:\n\n• Licencia base por módulo: Se cobra una tarifa mensual/anual por cada módulo contratado (Leasing, Factoring, Créditos), independientemente del volumen inicial de operaciones.\n\n• Escalamiento por volumen: A partir de ciertos umbrales de operaciones activas, se aplican tarifas escalonadas que permiten al banco crecer sin saltos bruscos de costo. Los umbrales se definen durante la negociación comercial según las proyecciones del cliente.\n\n• Usuarios ilimitados: El modelo no limita el número de usuarios concurrentes ni el número de clientes registrados en la plataforma, eliminando cuellos de botella operativos por restricciones de licencia.\n\n• Sin cobro por transacción: No se cobra por número de transacciones procesadas (desembolsos, cobros, consultas), lo que brinda predictibilidad en los costos operativos.\n\nEl modelo específico de precios se define durante el proceso de dimensionamiento comercial, considerando factores como los módulos requeridos, el volumen proyectado de operaciones, el modelo de despliegue elegido (SaaS, híbrido, on-premise) y los servicios profesionales de implementación.",
    respuesta_en: "SYSDE PLUS operates under a subscription-based licensing model. Key components include: per-module base license fee, volume-based scaling with graduated tiers, unlimited users, and no per-transaction charges. Specific pricing is defined during commercial dimensioning based on required modules, projected volume, deployment model, and implementation services.",
    valor: "El modelo de licenciamiento por suscripción con usuarios ilimitados y sin cobro por transacción ofrece predictibilidad de costos para BCP conforme escala sus operaciones de leasing.",
    valor_en: "The subscription licensing model with unlimited users and no per-transaction charges offers cost predictability for BCP as it scales leasing operations.",
    diagrams: [
      {
        type: "grid" as const,
        title: "Ventajas del Modelo de Licenciamiento",
        items: [
          "Suscripción mensual/anual predecible",
          "Usuarios concurrentes ilimitados",
          "Sin cobro por transacción",
          "Escalamiento gradual por volumen",
          "Módulos activables independientemente",
          "Precios definidos en dimensionamiento",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid" as const,
        title: "Licensing Model Advantages",
        items: [
          "Predictable monthly/annual subscription",
          "Unlimited concurrent users",
          "No per-transaction charges",
          "Gradual volume-based scaling",
          "Independently activatable modules",
          "Pricing defined during dimensioning",
        ],
      },
    ],
  },

  // ── Proceso E2E (F) ──
  {
    id: 12,
    title: "Fases del Ciclo de Vida Cubiertas Nativamente",
    title_en: "Natively Covered Lifecycle Phases",
    status: "answered",
    section: "F",
    receivedDate: "20 marzo 2026",
    subtitle: "Cobertura nativa end-to-end",
    subtitle_en: "Native end-to-end coverage",
    requerimiento: "¿Qué fases del ciclo de vida cubre nativamente la solución?",
    requerimiento_en: "What lifecycle phases does the solution natively cover?",
    respuesta: "SYSDE PLUS cubre nativamente el ciclo de vida completo (end-to-end) de una operación de leasing financiero, desde la originación hasta la finalización del contrato. Las fases cubiertas son:\n\n1. Originación y Estructuración: Captura de la solicitud, ingreso de datos del cliente y del activo, simulación de condiciones (plazos, tasas, valor residual, opción de compra), y generación de la propuesta comercial.\n\n2. Evaluación Crediticia: Integración con burós de crédito, scoring interno, análisis de capacidad de pago, y generación de recomendaciones de aprobación/rechazo.\n\n3. Aprobación: Flujos de aprobación parametrizables por monto, tipo de activo y nivel jerárquico, con soporte para comités de crédito y aprobaciones colegiadas.\n\n4. Formalización: Generación automática de contratos, pagarés y documentos legales, con firma electrónica integrada y gestión documental.\n\n5. Desembolso: Autorización y ejecución del desembolso, con integración a sistemas de pago del banco para la transferencia de fondos al proveedor del activo.\n\n6. Administración del Contrato: Gestión de cuotas, facturación periódica, ajustes de tasa, restructuraciones, cesiones, y modificaciones contractuales.\n\n7. Gestión del Activo: Registro y seguimiento del activo arrendado, valuaciones, depreciación, seguros, y control de garantías.\n\n8. Cobro y Recuperación: Gestión de cobro, aplicación de pagos, gestión de mora, cálculo de intereses moratorios, y procesos de recuperación.\n\n9. Contabilidad: Generación automática de asientos contables conforme a NIIF/IFRS 16, conciliación, y cierre contable.\n\n10. Finalización: Ejercicio de opción de compra, devolución del activo, renovación del contrato, o terminación anticipada.",
    respuesta_en: "SYSDE PLUS natively covers the complete leasing lifecycle: Origination & Structuring, Credit Evaluation, Approval, Formalization, Disbursement, Contract Administration, Asset Management, Collection & Recovery, Accounting (IFRS 16), and Contract Finalization.",
    valor: "La cobertura end-to-end nativa elimina la necesidad de sistemas auxiliares para las operaciones core de leasing, reduciendo complejidad y riesgo operativo.",
    valor_en: "Native end-to-end coverage eliminates the need for auxiliary systems for core leasing operations, reducing complexity and operational risk.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Ciclo de Vida E2E del Leasing — SYSDE PLUS",
        steps: [
          { icon: "📝", label: "Originación", description: "Solicitud y simulación" },
          { icon: "🔍", label: "Evaluación", description: "Análisis crediticio" },
          { icon: "✅", label: "Aprobación", description: "Flujos por nivel" },
          { icon: "📄", label: "Formalización", description: "Contratos y firma" },
          { icon: "💰", label: "Desembolso", description: "Transferencia de fondos" },
          { icon: "⚙️", label: "Administración", description: "Cuotas y facturación" },
          { icon: "🏗️", label: "Activos", description: "Seguimiento y valuación" },
          { icon: "💳", label: "Cobro", description: "Pagos y mora" },
          { icon: "📊", label: "Contabilidad", description: "NIIF/IFRS 16" },
          { icon: "🏁", label: "Finalización", description: "Opción compra / devolución" },
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "Leasing E2E Lifecycle — SYSDE PLUS",
        steps: [
          { icon: "📝", label: "Origination", description: "Application and simulation" },
          { icon: "🔍", label: "Evaluation", description: "Credit analysis" },
          { icon: "✅", label: "Approval", description: "Tiered flows" },
          { icon: "📄", label: "Formalization", description: "Contracts and signing" },
          { icon: "💰", label: "Disbursement", description: "Fund transfer" },
          { icon: "⚙️", label: "Administration", description: "Installments and billing" },
          { icon: "🏗️", label: "Assets", description: "Tracking and valuation" },
          { icon: "💳", label: "Collection", description: "Payments and arrears" },
          { icon: "📊", label: "Accounting", description: "IFRS 16" },
          { icon: "🏁", label: "Finalization", description: "Purchase option / return" },
        ],
      },
    ],
  },
  {
    id: 13,
    title: "Fases que Requieren Sistemas Externos",
    title_en: "Phases Requiring External Systems",
    status: "answered",
    section: "F",
    receivedDate: "20 marzo 2026",
    subtitle: "Dependencias con sistemas terceros",
    subtitle_en: "Third-party system dependencies",
    requerimiento: "¿Qué fases requieren sistemas externos?",
    requerimiento_en: "What phases require external systems?",
    respuesta: "SYSDE PLUS cubre nativamente la totalidad del ciclo de vida del leasing (ver consulta #12). Sin embargo, existen fases donde la integración con sistemas externos del banco es necesaria o recomendable para completar el proceso end-to-end:\n\n• CRM / Gestión Comercial: La captación inicial del prospecto y la gestión de la relación comercial previo a la solicitud formal pueden residir en el CRM del banco. SYSDE PLUS se integra vía APIs para recibir la solicitud desde el CRM.\n\n• Core Bancario: Para la verificación de saldos, consulta de productos existentes del cliente y el registro de desembolsos en las cuentas bancarias del cliente o proveedor. La integración se realiza vía APIs REST o mensajería.\n\n• Sistema de Pagos: La ejecución de transferencias de fondos (desembolsos a proveedores, cobros automáticos) requiere integración con el sistema de pagos o ACH del banco.\n\n• Burós de Crédito: Consulta externa de historial crediticio del solicitante. SYSDE PLUS orquesta la consulta pero el servicio externo es provisto por las centrales de riesgo (Equifax, TransUnion, etc.).\n\n• Sistema ERP/Contable Central: Si el banco mantiene un libro mayor centralizado en SAP, Oracle u otro ERP, los asientos contables generados por SYSDE PLUS se exportan mediante integración para registro en el GL corporativo.\n\n• Firma Electrónica: Si el banco utiliza un proveedor específico de firma electrónica certificada, SYSDE PLUS se integra con dicho proveedor.\n\nEs importante destacar que SYSDE PLUS cuenta con un core de APIs preconstruidas y un bus de integración que facilitan todas estas conexiones, minimizando el esfuerzo de desarrollo requerido.",
    respuesta_en: "SYSDE PLUS covers the entire leasing lifecycle natively. External systems needed for complementary functions include: CRM (prospect management), Core Banking (account verification, disbursements), Payment Systems (fund transfers), Credit Bureaus (external credit history), ERP (centralized general ledger), and Electronic Signature providers. All integrations are facilitated through pre-built APIs.",
    valor: "Las dependencias externas son complementarias, no estructurales. SYSDE PLUS mantiene la lógica de negocio completa internamente y se conecta con los sistemas del banco mediante APIs estándar.",
    valor_en: "External dependencies are complementary, not structural. SYSDE PLUS maintains complete business logic internally and connects with bank systems via standard APIs.",
    diagrams: [
      {
        type: "table" as const,
        title: "Fases y Sistemas Involucrados",
        headers: ["Fase", "SYSDE PLUS (Nativo)", "Sistema Externo", "Integración"],
        rows: [
          ["Captación", "Recepción de solicitud", "CRM del banco", "API REST"],
          ["Evaluación crediticia", "Scoring interno, análisis", "Burós de crédito", "API / Web Service"],
          ["Aprobación", "✅ 100% nativo", "—", "—"],
          ["Formalización", "Contratos, documentos", "Firma electrónica (opcional)", "API"],
          ["Desembolso", "Autorización y registro", "Core bancario / Pagos", "API / Mensajería"],
          ["Administración", "✅ 100% nativo", "—", "—"],
          ["Cobro", "Gestión y aplicación", "Sistema de pagos / ACH", "API"],
          ["Contabilidad", "Asientos automáticos", "ERP / GL central (exportación)", "API / Batch"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Phases and Involved Systems",
        headers: ["Phase", "SYSDE PLUS (Native)", "External System", "Integration"],
        rows: [
          ["Prospecting", "Application reception", "Bank CRM", "REST API"],
          ["Credit evaluation", "Internal scoring, analysis", "Credit bureaus", "API / Web Service"],
          ["Approval", "✅ 100% native", "—", "—"],
          ["Formalization", "Contracts, documents", "E-signature (optional)", "API"],
          ["Disbursement", "Authorization and recording", "Core banking / Payments", "API / Messaging"],
          ["Administration", "✅ 100% native", "—", "—"],
          ["Collection", "Management and application", "Payment system / ACH", "API"],
          ["Accounting", "Automatic entries", "ERP / Central GL (export)", "API / Batch"],
        ],
      },
    ],
  },

  // ── Operaciones (G) ──
  {
    id: 14,
    title: "Gestión de Seguros, Impuestos, Multas y Siniestros",
    title_en: "Insurance, Taxes, Fines, and Claims Management",
    status: "answered",
    section: "G",
    receivedDate: "20 marzo 2026",
    subtitle: "Administración operativa",
    subtitle_en: "Operational management",
    requerimiento: "¿Cómo se gestionan seguros, impuestos, multas y siniestros?",
    requerimiento_en: "How are insurance, taxes, fines, and claims managed?",
    respuesta: "SYSDE PLUS gestiona nativamente estos componentes operativos del leasing:\n\nSeguros:\n• Registro de pólizas asociadas al activo arrendado (seguro del bien, responsabilidad civil, etc.).\n• Control de vigencia con alertas automáticas de vencimiento y renovación.\n• Gestión del cobro de primas al arrendatario (incluidas en cuota o cobro separado).\n• Integración con aseguradoras para consulta de estado de pólizas.\n\nImpuestos:\n• Cálculo automático de impuestos aplicables (IVA, ISR, impuestos locales) según la jurisdicción y tipo de activo.\n• Generación de documentos fiscales (facturas electrónicas, notas de crédito/débito) conforme a la normativa fiscal local.\n• Retención de impuestos en la fuente cuando aplica.\n• Reportes fiscales periódicos para cumplimiento tributario.\n\nMultas:\n• Registro y seguimiento de multas asociadas al activo (tránsito, municipales, ambientales).\n• Flujo de gestión: notificación al arrendatario, cobro, y seguimiento de pago.\n• Posibilidad de traslado al arrendatario o absorción por el arrendador según configuración contractual.\n\nSiniestros:\n• Registro del siniestro (pérdida total, pérdida parcial, daño).\n• Flujo de reclamación ante la aseguradora.\n• Cálculo del impacto financiero: saldo pendiente vs. indemnización del seguro.\n• Gestión del cierre anticipado del contrato en caso de pérdida total.\n• Registro contable automático del siniestro y la indemnización.",
    respuesta_en: "SYSDE PLUS natively manages insurance (policy registration, expiration alerts, premium collection), taxes (automatic calculation, electronic invoicing, withholding, fiscal reports), fines (registration, notification, collection flows), and claims (registration, insurance claims, financial impact calculation, early contract closure for total loss).",
    valor: "La gestión integrada de seguros, impuestos, multas y siniestros reduce el riesgo operativo y automatiza procesos que típicamente se manejan manualmente en hojas de cálculo.",
    valor_en: "Integrated management of insurance, taxes, fines, and claims reduces operational risk and automates processes typically handled manually in spreadsheets.",
    diagrams: [
      {
        type: "table" as const,
        title: "Gestión Operativa — Componentes",
        headers: ["Componente", "Capacidades Principales", "Automatización"],
        rows: [
          ["Seguros", "Pólizas, vigencia, cobro de primas, integración aseguradoras", "Alertas de vencimiento, cobro en cuota"],
          ["Impuestos", "IVA, ISR, retenciones, facturación electrónica", "Cálculo y documentos automáticos"],
          ["Multas", "Registro, notificación, traslado al arrendatario", "Flujo de cobro parametrizable"],
          ["Siniestros", "Registro, reclamación, impacto financiero, cierre", "Contabilidad automática del evento"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Operational Management — Components",
        headers: ["Component", "Key Capabilities", "Automation"],
        rows: [
          ["Insurance", "Policies, validity, premium collection, insurer integration", "Expiration alerts, in-installment collection"],
          ["Taxes", "VAT, income tax, withholdings, e-invoicing", "Automatic calculation and documents"],
          ["Fines", "Registration, notification, lessee transfer", "Parameterizable collection flow"],
          ["Claims", "Registration, claim, financial impact, closure", "Automatic event accounting"],
        ],
      },
    ],
  },

  // ── Arquitectura (H) ──
  {
    id: 15,
    title: "Capacidades de Integración vía APIs o Eventos",
    title_en: "Integration Capabilities via APIs or Events",
    status: "answered",
    section: "H",
    receivedDate: "20 marzo 2026",
    subtitle: "Interoperabilidad con sistemas del banco",
    subtitle_en: "Interoperability with bank systems",
    requerimiento: "¿Cuenta con capacidad de integración vía APIs o eventos para el intercambio de información con otros sistemas (CRM, ERP, Pricing, Data Warehouse)?",
    requerimiento_en: "Does it have integration capabilities via APIs or events for information exchange with other systems (CRM, ERP, Pricing, Data Warehouse)?",
    respuesta: "Sí, SYSDE PLUS cuenta con una arquitectura de integración robusta que soporta tanto APIs RESTful como integración basada en eventos:\n\nAPIs RESTful:\n• Core de APIs preconstruidas con más de 200 endpoints documentados que cubren todas las operaciones del ciclo de vida del leasing.\n• Documentación OpenAPI/Swagger disponible para facilitar la integración.\n• Versionamiento de APIs para garantizar compatibilidad hacia atrás.\n• Autenticación via OAuth 2.0 / JWT para seguridad en las comunicaciones.\n\nIntegración basada en Eventos:\n• Soporte para publicación y suscripción de eventos de negocio (event-driven architecture).\n• Webhooks configurables para notificar a sistemas externos sobre cambios de estado en operaciones (aprobación, desembolso, pago recibido, mora, etc.).\n• Compatibilidad con brokers de mensajería como Apache Kafka, RabbitMQ y Azure Service Bus.\n\nIntegraciones típicas soportadas:\n• CRM: Recepción de solicitudes, sincronización de datos de cliente, notificación de estados.\n• ERP/SAP: Exportación de asientos contables, sincronización de catálogos, conciliación. En el caso de CMI, se integra con 4 instancias de SAP.\n• Pricing: Consulta de tasas y condiciones desde motores de pricing externos.\n• Data Warehouse: Extracción de datos operativos y transaccionales vía APIs o conexión directa a vistas de base de datos.\n• Canales Digitales: APIs para consulta de estados, saldos y documentos desde portales web o apps móviles del banco.",
    respuesta_en: "Yes, SYSDE PLUS features robust integration architecture supporting RESTful APIs (200+ documented endpoints, OpenAPI/Swagger, OAuth 2.0) and event-driven integration (webhooks, Apache Kafka, RabbitMQ, Azure Service Bus). Typical integrations include CRM, ERP/SAP, Pricing engines, Data Warehouse, and Digital Channels.",
    valor: "La capa de APIs y eventos permite integrar SYSDE PLUS con cualquier sistema del ecosistema tecnológico de BCP de forma estandarizada y segura.",
    valor_en: "The API and event layer enables integrating SYSDE PLUS with any system in BCP's technology ecosystem in a standardized and secure manner.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Arquitectura de Integración",
        steps: [
          { icon: "🔌", label: "APIs REST", description: "200+ endpoints documentados" },
          { icon: "📡", label: "Eventos", description: "Webhooks + Message Brokers" },
          { icon: "🔐", label: "Seguridad", description: "OAuth 2.0 / JWT" },
          { icon: "🏦", label: "Sistemas Banco", description: "CRM, ERP, Core, DWH" },
        ],
      },
      {
        type: "table" as const,
        title: "Integraciones Soportadas",
        headers: ["Sistema", "Tipo de Integración", "Dirección", "Protocolo"],
        rows: [
          ["CRM", "API REST", "Bidireccional", "OAuth 2.0"],
          ["ERP / SAP", "API REST + Batch", "SYSDE → ERP", "API / Archivos"],
          ["Core Bancario", "API REST + Eventos", "Bidireccional", "OAuth 2.0 / Webhooks"],
          ["Data Warehouse", "API REST + DB Views", "SYSDE → DWH", "API / Conexión directa"],
          ["Pricing", "API REST", "DWH → SYSDE", "OAuth 2.0"],
          ["Canales Digitales", "API REST", "Canales → SYSDE", "OAuth 2.0 / JWT"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "Integration Architecture",
        steps: [
          { icon: "🔌", label: "REST APIs", description: "200+ documented endpoints" },
          { icon: "📡", label: "Events", description: "Webhooks + Message Brokers" },
          { icon: "🔐", label: "Security", description: "OAuth 2.0 / JWT" },
          { icon: "🏦", label: "Bank Systems", description: "CRM, ERP, Core, DWH" },
        ],
      },
      {
        type: "table" as const,
        title: "Supported Integrations",
        headers: ["System", "Integration Type", "Direction", "Protocol"],
        rows: [
          ["CRM", "REST API", "Bidirectional", "OAuth 2.0"],
          ["ERP / SAP", "REST API + Batch", "SYSDE → ERP", "API / Files"],
          ["Core Banking", "REST API + Events", "Bidirectional", "OAuth 2.0 / Webhooks"],
          ["Data Warehouse", "REST API + DB Views", "SYSDE → DWH", "API / Direct connection"],
          ["Pricing", "REST API", "DWH → SYSDE", "OAuth 2.0"],
          ["Digital Channels", "REST API", "Channels → SYSDE", "OAuth 2.0 / JWT"],
        ],
      },
    ],
  },
  {
    id: 16,
    title: "Capa de APIs Preconstruidas",
    title_en: "Pre-built API Layer",
    status: "answered",
    section: "H",
    receivedDate: "20 marzo 2026",
    subtitle: "APIs base para integración con canales digitales",
    subtitle_en: "Base APIs for digital channel integration",
    requerimiento: "¿Ofrecen alguna capa de APIs preconstruidas base, para integrar la plataforma a otras plataformas del banco, por ejemplo un canal digital que necesite consultar info, o ingresar algún dato al flujo del leasing?",
    requerimiento_en: "Do you offer a pre-built base API layer to integrate the platform with other bank platforms, e.g., a digital channel that needs to query information or enter data into the leasing flow?",
    respuesta: "Sí, SYSDE PLUS cuenta con un core de APIs preconstruidas que permite a los canales digitales y otros sistemas del banco interactuar directamente con la plataforma de leasing. Esta capa incluye:\n\nAPIs de Consulta (Read):\n• Consulta de estado de operaciones de leasing por cliente.\n• Consulta de plan de pagos, cuotas pendientes, saldos.\n• Consulta de información del activo arrendado.\n• Consulta de documentos asociados al contrato (contrato, pagaré, facturas).\n• Consulta de historial de pagos y movimientos.\n\nAPIs de Ingreso (Write):\n• Creación de solicitudes de leasing desde canales digitales (portal web, app móvil).\n• Carga de documentos del solicitante (identificación, estados financieros, etc.).\n• Registro de pagos anticipados o abonos extraordinarios.\n• Solicitud de simulaciones de leasing (cálculo de cuotas, plazos, etc.).\n\nAPIs de Flujo (Workflow):\n• Inicio y avance de flujos de aprobación.\n• Consulta de estado del flujo de una operación.\n• Notificaciones y callbacks sobre cambios de estado.\n\nTodas las APIs están documentadas en formato OpenAPI/Swagger, con sandbox de pruebas disponible para el equipo de desarrollo del banco durante la fase de integración. Adicionalmente, SYSDE proporciona SDKs de referencia y guías de integración para acelerar el proceso.",
    respuesta_en: "Yes, SYSDE PLUS has a pre-built API core enabling digital channels and other bank systems to interact directly with the leasing platform. This includes Read APIs (operation status, payment plans, balances, documents, history), Write APIs (application creation, document upload, advance payments, simulations), and Workflow APIs (approval flow management, status queries, callbacks). All APIs are OpenAPI/Swagger documented with test sandbox available.",
    valor: "El core de APIs preconstruidas permite a BCP integrar el leasing en sus canales digitales (banca en línea, app móvil) de forma rápida y estandarizada, sin desarrollo desde cero.",
    valor_en: "The pre-built API core allows BCP to integrate leasing into its digital channels (online banking, mobile app) quickly and standardizedly, without building from scratch.",
    diagrams: [
      {
        type: "grid" as const,
        title: "Categorías de APIs Preconstruidas",
        items: [
          "📖 Consulta: Estados, saldos, planes de pago, documentos",
          "📝 Ingreso: Solicitudes, documentos, pagos, simulaciones",
          "🔄 Flujo: Aprobaciones, estados, notificaciones",
          "📚 Documentación: OpenAPI/Swagger + sandbox",
          "🧩 SDKs: Librerías de referencia para integración",
          "🔐 Seguridad: OAuth 2.0 / JWT en todos los endpoints",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid" as const,
        title: "Pre-built API Categories",
        items: [
          "📖 Query: Statuses, balances, payment plans, documents",
          "📝 Input: Applications, documents, payments, simulations",
          "🔄 Workflow: Approvals, statuses, notifications",
          "📚 Documentation: OpenAPI/Swagger + sandbox",
          "🧩 SDKs: Reference libraries for integration",
          "🔐 Security: OAuth 2.0 / JWT on all endpoints",
        ],
      },
    ],
  },

  // ── Datos y Reporting (I) ──
  {
    id: 17,
    title: "Reportes Regulatorios y Contables",
    title_en: "Regulatory and Accounting Reports",
    status: "answered",
    section: "I",
    receivedDate: "20 marzo 2026",
    subtitle: "Generación de reportes",
    subtitle_en: "Report generation",
    requerimiento: "¿Cómo genera reportes regulatorios y contables?",
    requerimiento_en: "How does it generate regulatory and accounting reports?",
    respuesta: "SYSDE PLUS cuenta con un motor de reportes integrado que genera tanto reportes regulatorios como contables de forma automática:\n\nReportes Regulatorios:\n• Generación automática de reportes requeridos por las superintendencias y entes reguladores de cada jurisdicción (SBS, SUGEF, SIB, CNBS, SSF, CNBV).\n• Formatos parametrizables según los requerimientos específicos de cada regulador (XML, CSV, Excel, PDF).\n• Reportes de clasificación de cartera y provisiones conforme a normativas locales.\n• Reportes de concentración de riesgo y exposición crediticia.\n• Generación en fechas de corte específicas con datos históricos reconstruibles.\n\nReportes Contables:\n• Asientos contables automáticos conforme a NIIF/IFRS 16 para todas las operaciones del leasing.\n• Balance de comprobación, estado de resultados y flujo de caja por producto/segmento.\n• Conciliación automática entre datos operativos y registros contables.\n• Reportes de depreciación de activos, amortización de contratos y reconocimiento de ingresos.\n\nReportes Gerenciales:\n• Dashboards operativos con indicadores clave (cartera activa, mora, originación, etc.).\n• Reportes ad-hoc mediante un generador de reportes parametrizable por el usuario.\n• Exportación en múltiples formatos (Excel, PDF, CSV) y distribución automática por correo.",
    respuesta_en: "SYSDE PLUS has an integrated report engine generating regulatory reports (per jurisdiction requirements, parameterizable formats), accounting reports (automatic IFRS 16 entries, trial balance, P&L, cash flow), and management reports (operational dashboards, ad-hoc report builder, multi-format export).",
    valor: "La generación automática de reportes regulatorios y contables reduce significativamente el esfuerzo manual y el riesgo de errores en el cumplimiento normativo.",
    valor_en: "Automatic generation of regulatory and accounting reports significantly reduces manual effort and risk of errors in regulatory compliance.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Motor de Reportes — SYSDE PLUS",
        steps: [
          { icon: "📁", label: "Datos Operativos", description: "Transacciones en tiempo real" },
          { icon: "⚙️", label: "Motor de Reportes", description: "Procesamiento y transformación" },
          { icon: "📋", label: "Regulatorios", description: "SBS, SUGEF, SIB, CNBV" },
          { icon: "📊", label: "Contables + Gerenciales", description: "NIIF, dashboards, ad-hoc" },
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "Report Engine — SYSDE PLUS",
        steps: [
          { icon: "📁", label: "Operational Data", description: "Real-time transactions" },
          { icon: "⚙️", label: "Report Engine", description: "Processing and transformation" },
          { icon: "📋", label: "Regulatory", description: "SBS, SUGEF, SIB, CNBV" },
          { icon: "📊", label: "Accounting + Management", description: "IFRS, dashboards, ad-hoc" },
        ],
      },
    ],
  },
  {
    id: 18,
    title: "Separación de Datos Operativos, Contables y Regulatorios",
    title_en: "Separation of Operational, Accounting, and Regulatory Data",
    status: "answered",
    section: "I",
    receivedDate: "20 marzo 2026",
    subtitle: "Segregación de datos",
    subtitle_en: "Data segregation",
    requerimiento: "¿Existe separación de datos operativos, contables y regulatorios?",
    requerimiento_en: "Is there separation of operational, accounting, and regulatory data?",
    respuesta: "Sí, SYSDE PLUS implementa una separación clara de datos en tres capas independientes pero interconectadas:\n\nCapa Operativa:\n• Almacena los datos transaccionales del día a día: solicitudes, contratos, cuotas, pagos, activos, clientes.\n• Es la fuente primaria de verdad para las operaciones de negocio.\n• Optimizada para consultas transaccionales de alta frecuencia y baja latencia.\n\nCapa Contable:\n• Almacena los asientos contables generados automáticamente a partir de los eventos operativos.\n• Mantiene el libro mayor auxiliar de leasing conforme a NIIF/IFRS 16.\n• Independiente de la capa operativa: los datos contables no se pueden modificar directamente desde la operación, garantizando integridad.\n• Soporta múltiples planes de cuentas y catálogos contables según la jurisdicción.\n\nCapa Regulatoria:\n• Almacena los datos transformados según los formatos y reglas de cada ente regulador.\n• Genera snapshots de datos en fechas de corte específicas para reportes regulatorios.\n• Permite reconstruir reportes históricos sin depender de los datos operativos actuales.\n• Cada jurisdicción puede tener reglas de transformación distintas sin afectar las otras capas.\n\nEsta separación garantiza que un cambio operativo (por ejemplo, una restructuración de contrato) genere automáticamente el impacto contable y regulatorio correspondiente, pero cada capa mantiene su integridad y puede ser auditada de forma independiente.",
    respuesta_en: "Yes, SYSDE PLUS implements clear three-layer data separation: Operational (transactional data, primary source of truth), Accounting (automatic IFRS 16 entries, independent ledger, multi-chart-of-accounts), and Regulatory (transformed data per regulator rules, historical snapshots, independent audit). Each layer maintains integrity and can be audited independently.",
    valor: "La separación en tres capas permite a BCP auditar, reportar y operar sobre datos especializados sin interferencia entre funciones, cumpliendo mejores prácticas de gobierno de datos.",
    valor_en: "Three-layer separation allows BCP to audit, report, and operate on specialized data without cross-function interference, following data governance best practices.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Arquitectura de Datos en 3 Capas",
        steps: [
          { icon: "💼", label: "Capa Operativa", description: "Transacciones y contratos" },
          { icon: "📊", label: "Capa Contable", description: "Asientos NIIF/IFRS 16" },
          { icon: "📋", label: "Capa Regulatoria", description: "Reportes por jurisdicción" },
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "3-Layer Data Architecture",
        steps: [
          { icon: "💼", label: "Operational Layer", description: "Transactions and contracts" },
          { icon: "📊", label: "Accounting Layer", description: "IFRS 16 entries" },
          { icon: "📋", label: "Regulatory Layer", description: "Reports by jurisdiction" },
        ],
      },
    ],
  },

  // ── Configuración (J) ──
  {
    id: 19,
    title: "Flexibilidad del Flujo de Leasing",
    title_en: "Leasing Flow Flexibility",
    status: "answered",
    section: "J",
    receivedDate: "20 marzo 2026",
    subtitle: "Parametrización de entradas del flujo",
    subtitle_en: "Flow input parameterization",
    requerimiento: "¿La herramienta permite configurar y ajustar parámetros de entrada dentro del flujo de Leasing?",
    requerimiento_en: "Does the tool allow configuring and adjusting input parameters within the Leasing flow?",
    respuesta: "Sí, SYSDE PLUS ofrece un alto nivel de parametrización que permite configurar y ajustar los parámetros de entrada del flujo de leasing sin necesidad de desarrollo. Entre los parámetros configurables se incluyen:\n\n• Tipos de leasing: Financiero, operativo, leaseback, lease-to-own, con reglas diferenciadas para cada tipo.\n• Tipos de activo: Categorías de activos (vehículos, equipos, inmuebles, maquinaria) con campos específicos por categoría.\n• Plazos: Rangos mínimos y máximos de plazo por tipo de leasing y tipo de activo.\n• Tasas: Fija, variable, mixta, con reglas de ajuste periódico y topes configurables.\n• Periodicidad de cuotas: Mensual, trimestral, semestral, anual, irregular.\n• Monedas: Multi-moneda con tipos de cambio configurables.\n• Opción de compra: Porcentaje, monto fijo, o calculada.\n• Valor residual: Garantizado, no garantizado, con tablas de depreciación por tipo de activo.\n• Flujos de aprobación: Niveles, montos, roles, comités, con matrices de escalamiento configurables.\n• Documentos requeridos: Lista de documentos por tipo de cliente (persona física, jurídica) y monto de operación.\n• Reglas de negocio: Validaciones y restricciones personalizables por producto, segmento y jurisdicción.\n\nToda la parametrización se realiza desde un módulo de administración con interfaz gráfica, sin requerir intervención del equipo de desarrollo de SYSDE.",
    respuesta_en: "Yes, SYSDE PLUS offers extensive parameterization allowing configuration of leasing flow parameters without development: leasing types, asset types, terms, rates, installment frequency, currencies, purchase options, residual values, approval flows, required documents, and business rules. All configuration is done through an admin module with a graphical interface.",
    valor: "La parametrización sin código permite a BCP adaptar los flujos de leasing a sus políticas internas y regulatorias sin depender de desarrollos externos, acelerando el time-to-market.",
    valor_en: "No-code parameterization allows BCP to adapt leasing flows to its internal and regulatory policies without external development, accelerating time-to-market.",
    diagrams: [
      {
        type: "grid" as const,
        title: "Parámetros Configurables sin Desarrollo",
        items: [
          "Tipos de leasing y activos",
          "Plazos, tasas y periodicidad",
          "Multi-moneda y tipos de cambio",
          "Flujos de aprobación y escalamiento",
          "Documentos requeridos por segmento",
          "Reglas de negocio personalizables",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid" as const,
        title: "Configurable Parameters Without Development",
        items: [
          "Leasing and asset types",
          "Terms, rates, and frequency",
          "Multi-currency and exchange rates",
          "Approval and escalation flows",
          "Required documents by segment",
          "Customizable business rules",
        ],
      },
    ],
  },
  {
    id: 20,
    title: "Configuración sin Desarrollo vs. con Desarrollo",
    title_en: "No-code Configuration vs. Development",
    status: "answered",
    section: "J",
    receivedDate: "20 marzo 2026",
    subtitle: "Alcance de parametrización",
    subtitle_en: "Parameterization scope",
    requerimiento: "¿Qué se configura sin desarrollo y qué requiere desarrollo?",
    requerimiento_en: "What can be configured without development and what requires development?",
    respuesta: "SYSDE PLUS ha sido diseñado para maximizar la configuración sin código (no-code) y minimizar la necesidad de desarrollos personalizados:\n\nSin desarrollo (parametrización por el banco):\n• Productos de leasing: tipos, condiciones, tasas, plazos, comisiones.\n• Flujos de aprobación: niveles, montos, roles, comités.\n• Catálogos: tipos de activo, proveedores, aseguradoras, monedas.\n• Reglas de negocio: validaciones, restricciones, fórmulas de cálculo.\n• Plantillas documentales: contratos, pagarés, cartas, notificaciones.\n• Reportes operativos: generador de reportes ad-hoc.\n• Usuarios y perfiles: roles, permisos, segregación de funciones.\n• Parámetros contables: planes de cuentas, reglas de reconocimiento.\n\nRequiere desarrollo (equipo SYSDE):\n• Integraciones nuevas con sistemas no contemplados en el catálogo estándar de conectores.\n• Reportes regulatorios para nuevas jurisdicciones no soportadas actualmente.\n• Modificaciones al motor de cálculo financiero (nuevas fórmulas matemáticas no estándar).\n• Componentes de interfaz de usuario completamente nuevos.\n• Lógica de negocio altamente especializada fuera del estándar de la industria.\n\nAproximadamente el 85% de las necesidades de configuración de un banco se cubren con parametrización sin desarrollo. El 15% restante corresponde a personalizaciones que el equipo de SYSDE implementa durante la fase de implementación del proyecto.",
    respuesta_en: "SYSDE PLUS maximizes no-code configuration. Without development (~85%): products, approval flows, catalogs, business rules, document templates, ad-hoc reports, user profiles, accounting parameters. Requires development (~15%): new integrations outside standard connectors, regulatory reports for unsupported jurisdictions, non-standard financial formulas, completely new UI components, highly specialized business logic.",
    valor: "El 85% de configuración sin código permite a BCP ser autónomo en la adaptación de la plataforma, con soporte de SYSDE únicamente para personalizaciones complejas.",
    valor_en: "85% no-code configuration allows BCP to be autonomous in platform adaptation, with SYSDE support only for complex customizations.",
    diagrams: [
      {
        type: "table" as const,
        title: "Configuración Sin Desarrollo vs. Con Desarrollo",
        headers: ["Categoría", "Sin Desarrollo ✅", "Con Desarrollo 🔧"],
        rows: [
          ["Productos", "Tipos, tasas, plazos, comisiones", "Fórmulas matemáticas no estándar"],
          ["Flujos", "Aprobación, escalamiento, roles", "Lógica altamente especializada"],
          ["Catálogos", "Activos, proveedores, monedas", "—"],
          ["Reportes", "Operativos y ad-hoc", "Regulatorios para nuevas jurisdicciones"],
          ["Integraciones", "Conectores estándar (SAP, CRM)", "Sistemas no contemplados"],
          ["Interfaz", "Personalización de vistas y campos", "Componentes UI completamente nuevos"],
          ["Contabilidad", "Planes de cuentas, reglas", "—"],
          ["Usuarios", "Roles, permisos, perfiles", "—"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "No-Code Configuration vs. Development",
        headers: ["Category", "No-Code ✅", "Development 🔧"],
        rows: [
          ["Products", "Types, rates, terms, fees", "Non-standard math formulas"],
          ["Workflows", "Approval, escalation, roles", "Highly specialized logic"],
          ["Catalogs", "Assets, vendors, currencies", "—"],
          ["Reports", "Operational and ad-hoc", "Regulatory for new jurisdictions"],
          ["Integrations", "Standard connectors (SAP, CRM)", "Non-contemplated systems"],
          ["Interface", "View and field customization", "Completely new UI components"],
          ["Accounting", "Chart of accounts, rules", "—"],
          ["Users", "Roles, permissions, profiles", "—"],
        ],
      },
    ],
  },

  // ── Escalabilidad (K) ──
  {
    id: 21,
    title: "Volumen Máximo de Operaciones Soportadas",
    title_en: "Maximum Supported Operations Volume",
    status: "answered",
    section: "K",
    receivedDate: "20 marzo 2026",
    subtitle: "Capacidad de procesamiento",
    subtitle_en: "Processing capacity",
    requerimiento: "¿Volumen máximo de operaciones soportadas actualmente?",
    requerimiento_en: "What is the maximum volume of operations currently supported?",
    respuesta: "SYSDE PLUS está diseñada para soportar altos volúmenes de operaciones gracias a su arquitectura de microservicios desplegada sobre Azure:\n\nCapacidad actual en producción:\n• Más de 1,000 instituciones financieras operando simultáneamente sobre la plataforma.\n• Procesamiento de millones de transacciones mensuales a nivel agregado de toda la base de clientes.\n• En el segmento de pensiones (que representa el ~82% del mercado regional), la plataforma procesa volúmenes de cálculo y liquidación que superan ampliamente los requerimientos típicos de una operación de leasing bancario.\n\nEscalabilidad técnica:\n• Arquitectura de microservicios con escalamiento horizontal automático (auto-scaling) basado en demanda.\n• Sin límite teórico de operaciones: la capacidad se escala elásticamente agregando instancias según la carga.\n• Procesamiento batch nocturno optimizado para cierres, facturación masiva y cálculos de intereses sobre grandes volúmenes de contratos.\n• Bases de datos con particionamiento y réplicas de lectura para optimizar consultas de alto volumen.\n\nPara BCP específicamente, el volumen de operaciones de leasing se encuentra dentro de los rangos que la plataforma maneja cómodamente. Durante la fase de dimensionamiento se realizan pruebas de carga para validar los tiempos de respuesta bajo el volumen proyectado.",
    respuesta_en: "SYSDE PLUS supports high operation volumes via Azure microservices architecture. Currently: 1,000+ institutions operating simultaneously, millions of monthly transactions. Technical scalability includes horizontal auto-scaling, no theoretical operation limit, optimized batch processing, and database partitioning. Load testing is performed during dimensioning to validate response times.",
    valor: "La arquitectura escalable garantiza que SYSDE PLUS pueda crecer junto con BCP sin limitaciones de volumen, respaldado por la experiencia en operaciones de alta escala como pensiones.",
    valor_en: "Scalable architecture ensures SYSDE PLUS can grow with BCP without volume limitations, backed by experience in high-scale operations like pensions.",
    diagrams: [
      {
        type: "grid" as const,
        title: "Capacidad y Escalabilidad",
        items: [
          "1,000+ instituciones en producción simultánea",
          "Millones de transacciones mensuales",
          "Auto-scaling horizontal por demanda",
          "Procesamiento batch optimizado",
          "Base de datos particionada con réplicas",
          "Pruebas de carga durante dimensionamiento",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid" as const,
        title: "Capacity and Scalability",
        items: [
          "1,000+ institutions in simultaneous production",
          "Millions of monthly transactions",
          "Horizontal auto-scaling on demand",
          "Optimized batch processing",
          "Partitioned database with replicas",
          "Load testing during dimensioning",
        ],
      },
    ],
  },

  // ── Gobernanza (L) ──
  {
    id: 22,
    title: "Roadmap de Leasing a 3 Años",
    title_en: "3-Year Leasing Roadmap",
    status: "answered",
    section: "L",
    receivedDate: "20 marzo 2026",
    subtitle: "Visión de evolución del producto",
    subtitle_en: "Product evolution vision",
    requerimiento: "¿Cuál es el roadmap de leasing a 3 años?",
    requerimiento_en: "What is the 3-year leasing roadmap?",
    respuesta: "El roadmap de SYSDE PLUS para el módulo de Leasing contempla tres ejes de evolución durante los próximos tres años:\n\n2026 — Consolidación y Automatización:\n• Motor de decisión crediticia potenciado con inteligencia artificial para pre-aprobación automática de operaciones de bajo riesgo.\n• Automatización de procesos operativos repetitivos (RPA) para reconciliación, facturación y cobro.\n• Portal de autoservicio para arrendatarios: consulta de estados, descarga de documentos, solicitud de opciones de compra.\n• Expansión de conectores de integración preconstruidos (APIs para más ERPs y cores bancarios).\n\n2027 — Inteligencia y Predicción:\n• Analytics predictivo: modelos de scoring comportamental para anticipar mora y optimizar la gestión de cobro.\n• Optimización de portafolio: herramientas de análisis para maximizar rentabilidad y minimizar riesgo del portafolio de leasing.\n• Marketplace de activos: plataforma para la comercialización de activos devueltos o recuperados.\n• Soporte para leasing verde / ESG: tracking de activos sostenibles y reportes de impacto ambiental.\n\n2028 — Ecosistema Abierto:\n• Open Finance: APIs abiertas para que fintechs y partners puedan ofrecer productos de leasing como servicio (Leasing-as-a-Service).\n• Tokenización de activos: exploración de tecnología blockchain para la tokenización de contratos de leasing.\n• Automatización end-to-end con contratos inteligentes (smart contracts) para ciertos tipos de operaciones.\n• Expansión a nuevos mercados: soporte regulatorio para mercados de Sudamérica (Colombia, Chile, Argentina).",
    respuesta_en: "SYSDE PLUS Leasing 3-year roadmap: 2026 — AI-powered credit decisions, RPA automation, lessee self-service portal, expanded integration connectors. 2027 — Predictive analytics, portfolio optimization, recovered asset marketplace, green leasing/ESG support. 2028 — Open Finance APIs, asset tokenization exploration, smart contracts, expansion to South American markets.",
    valor: "El roadmap demuestra una visión estratégica clara con inversión continua en innovación, lo que asegura a BCP que la plataforma seguirá evolucionando con las tendencias del mercado.",
    valor_en: "The roadmap demonstrates a clear strategic vision with continuous innovation investment, assuring BCP the platform will continue evolving with market trends.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Roadmap de Leasing — SYSDE PLUS",
        steps: [
          { icon: "🤖", label: "2026", description: "IA crediticia + Automatización + Portal" },
          { icon: "📈", label: "2027", description: "Predictivo + Portafolio + ESG" },
          { icon: "🌐", label: "2028", description: "Open Finance + Tokenización + Expansión" },
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "Leasing Roadmap — SYSDE PLUS",
        steps: [
          { icon: "🤖", label: "2026", description: "AI credit + Automation + Portal" },
          { icon: "📈", label: "2027", description: "Predictive + Portfolio + ESG" },
          { icon: "🌐", label: "2028", description: "Open Finance + Tokenization + Expansion" },
        ],
      },
    ],
  },

  // ── Transparencia (M) ──
  {
    id: 23,
    title: "Funcionalidades No Cubiertas Actualmente",
    title_en: "Currently Uncovered Functionalities",
    status: "answered",
    section: "M",
    receivedDate: "20 marzo 2026",
    subtitle: "Transparencia sobre limitaciones",
    subtitle_en: "Transparency on limitations",
    requerimiento: "¿Qué funcionalidades de leasing bancario NO cubre hoy la solución?",
    requerimiento_en: "What bank leasing functionalities does the solution NOT cover today?",
    respuesta: "En línea con la transparencia que ha caracterizado la relación con BCP, compartimos las áreas que actualmente no están cubiertas nativamente por SYSDE PLUS en su módulo de leasing, aunque varias están contempladas en el roadmap:\n\nNo cubiertas nativamente (requieren integración o desarrollo):\n• Originación digital completa (front-end de autoservicio para clientes finales): La plataforma cubre el back-office y el procesamiento, pero la experiencia de usuario final para solicitudes digitales depende de la integración con los canales digitales del banco. Un portal de autoservicio está en el roadmap 2026.\n\n• Marketplace de activos para re-comercialización: La gestión del activo devuelto o recuperado se registra en SYSDE PLUS, pero no incluye una plataforma de comercialización (marketplace) para la venta de estos activos a terceros. Contemplado en roadmap 2027.\n\n• Leasing sindicado: Operaciones de leasing donde múltiples instituciones participan como co-arrendadores no están soportadas nativamente. Puede gestionarse con configuración manual.\n\n• Scoring propietario de activos: La valoración de activos específicos (vehículos por VIN, maquinaria por modelo) depende de integraciones con proveedores externos de datos de mercado.\n\nCubiertas parcialmente (en evolución):\n• Leasing verde/ESG: Se pueden etiquetar operaciones, pero el tracking de impacto ambiental completo está en roadmap 2027.\n• Análisis predictivo de mora: Se cuenta con indicadores básicos; el modelo de IA predictivo está en roadmap 2026.\n\nEs importante destacar que estas limitaciones no afectan el core de la operación de leasing financiero, y la arquitectura abierta de SYSDE PLUS permite abordarlas mediante integraciones o desarrollos incrementales.",
    respuesta_en: "In transparency, areas not natively covered include: digital self-service origination (roadmap 2026), asset marketplace for re-commercialization (roadmap 2027), syndicated leasing (manual workaround available), proprietary asset scoring (requires external data providers). Partially covered: green leasing/ESG (roadmap 2027), predictive analytics (roadmap 2026). These don't affect the core financial leasing operation.",
    valor: "La transparencia de SYSDE sobre limitaciones actuales, combinada con un roadmap que las aborda, genera confianza en la relación y demuestra madurez como proveedor.",
    valor_en: "SYSDE's transparency about current limitations, combined with a roadmap addressing them, builds trust and demonstrates maturity as a provider.",
    diagrams: [
      {
        type: "table" as const,
        title: "Estado de Funcionalidades",
        headers: ["Funcionalidad", "Estado Actual", "Plan"],
        rows: [
          ["Portal autoservicio arrendatarios", "No nativo", "Roadmap 2026"],
          ["Marketplace de activos", "No nativo", "Roadmap 2027"],
          ["Leasing sindicado", "Manual", "Evaluación futura"],
          ["Scoring de activos", "Integración externa", "Conectores en expansión"],
          ["Leasing verde / ESG", "Parcial", "Roadmap 2027"],
          ["IA predictiva de mora", "Indicadores básicos", "Roadmap 2026"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Feature Status",
        headers: ["Feature", "Current Status", "Plan"],
        rows: [
          ["Lessee self-service portal", "Not native", "Roadmap 2026"],
          ["Asset marketplace", "Not native", "Roadmap 2027"],
          ["Syndicated leasing", "Manual", "Future evaluation"],
          ["Asset scoring", "External integration", "Expanding connectors"],
          ["Green leasing / ESG", "Partial", "Roadmap 2027"],
          ["Predictive AI for arrears", "Basic indicators", "Roadmap 2026"],
        ],
      },
    ],
  },

  // ── Soporte y Técnico (N) ──
  {
    id: 24,
    title: "Representante Local o Regional",
    title_en: "Local or Regional Representative",
    status: "answered",
    section: "N",
    receivedDate: "20 marzo 2026",
    subtitle: "Soporte e implementación local",
    subtitle_en: "Local support and implementation",
    requerimiento: "¿Tienen algún representante que implemente y soporte la aplicación de forma local o en la región?",
    requerimiento_en: "Do you have a representative who implements and supports the application locally or in the region?",
    respuesta: "Sí, SYSDE International cuenta con presencia directa en la región para implementación y soporte:\n\nOficinas y presencia regional:\n• Costa Rica (sede central): Oficinas principales con el equipo de desarrollo, arquitectura, producto, y soporte de primer y segundo nivel.\n• Guatemala: Presencia operativa para soporte a clientes de Centroamérica norte, incluyendo la implementación de CMI.\n• México: Equipo local para soporte e implementación de clientes como GNP y Bankaool.\n• Perú: Capacidad de establecer presencia local o asignar equipo dedicado para la implementación y soporte de BCP.\n\nModelo de soporte:\n• Soporte 24/7 para incidentes críticos (Severidad 1) con tiempos de respuesta garantizados por SLA.\n• Mesa de ayuda con soporte en español, con conocimiento del contexto regulatorio de cada jurisdicción.\n• Equipo de implementación dedicado: para cada proyecto de implementación se asigna un equipo multidisciplinario (gerente de proyecto, consultores funcionales, arquitecto de solución, desarrolladores de integración).\n• Soporte post-implementación: acompañamiento durante los primeros meses de operación con equipo on-site o remoto según necesidad.\n\nPara BCP, SYSDE puede comprometerse a asignar un equipo dedicado con presencia en Perú durante la fase de implementación, con transición a un modelo de soporte remoto + visitas periódicas una vez estabilizada la operación.",
    respuesta_en: "Yes, SYSDE International has direct regional presence: Costa Rica (headquarters), Guatemala (Central America support), Mexico (local team), and capacity to establish presence in Peru for BCP. Support model includes 24/7 critical incident support, Spanish-language help desk, dedicated implementation team, and post-implementation accompaniment.",
    valor: "SYSDE ofrece presencia regional directa con capacidad de asignar equipo dedicado en Perú, eliminando riesgos de soporte remoto sin contexto local.",
    valor_en: "SYSDE offers direct regional presence with capacity to assign a dedicated team in Peru, eliminating risks of remote support without local context.",
    diagrams: [
      {
        type: "grid" as const,
        title: "Presencia Regional de SYSDE",
        items: [
          "🇨🇷 Costa Rica — Sede central, desarrollo y soporte",
          "🇬🇹 Guatemala — Soporte Centroamérica norte",
          "🇲🇽 México — Equipo local de implementación",
          "🇵🇪 Perú — Equipo dedicado disponible para BCP",
          "🌎 Soporte 24/7 — Incidentes críticos con SLA",
          "👥 Equipo dedicado — PM, consultores, arquitectos",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid" as const,
        title: "SYSDE Regional Presence",
        items: [
          "🇨🇷 Costa Rica — Headquarters, development and support",
          "🇬🇹 Guatemala — Northern Central America support",
          "🇲🇽 Mexico — Local implementation team",
          "🇵🇪 Peru — Dedicated team available for BCP",
          "🌎 24/7 Support — Critical incidents with SLA",
          "👥 Dedicated team — PM, consultants, architects",
        ],
      },
    ],
  },
  {
    id: 25,
    title: "Observabilidad y OpenTelemetry",
    title_en: "Observability and OpenTelemetry",
    status: "answered",
    section: "N",
    receivedDate: "20 marzo 2026",
    subtitle: "Trazabilidad y monitoreo",
    subtitle_en: "Traceability and monitoring",
    requerimiento: "¿La solución puede emitir trazas hacia un colector externo (idealmente con estándar de OpenTelemetry) o solo soporta herramientas propias/terceras específicas para la Observabilidad?",
    requerimiento_en: "Can the solution emit traces to an external collector (ideally with OpenTelemetry standard) or does it only support proprietary/specific third-party tools for Observability?",
    respuesta: "Sí, SYSDE PLUS soporta la emisión de trazas hacia colectores externos compatibles con el estándar OpenTelemetry (OTLP). La plataforma está diseñada con una arquitectura de observabilidad abierta que permite:\n\n• Exportación nativa de trazas (traces), métricas y logs hacia cualquier colector compatible con OpenTelemetry, incluyendo Jaeger, Zipkin, Grafana Tempo, Datadog, New Relic, Dynatrace, entre otros.\n\n• Instrumentación automática de los principales flujos transaccionales del leasing (originación, desembolso, facturación, cobro), proporcionando visibilidad end-to-end de cada operación.\n\n• Propagación de contexto distribuido (W3C Trace Context), lo que permite correlacionar trazas entre SYSDE PLUS y los demás sistemas del banco (core bancario, CRM, canales digitales).\n\n• Configuración flexible del nivel de detalle de las trazas (sampling rate) para balancear entre visibilidad y rendimiento según las necesidades del entorno.\n\nAdicionalmente, la solución también es compatible con herramientas de monitoreo de infraestructura como Prometheus para métricas y ELK/Grafana Loki para centralización de logs, permitiendo al banco integrar SYSDE PLUS dentro de su stack de observabilidad existente sin necesidad de adoptar herramientas propietarias.",
    respuesta_en: "Yes, SYSDE PLUS supports trace emission to external collectors compatible with the OpenTelemetry (OTLP) standard. The platform is designed with an open observability architecture that enables:\n\n• Native export of traces, metrics, and logs to any OpenTelemetry-compatible collector, including Jaeger, Zipkin, Grafana Tempo, Datadog, New Relic, Dynatrace, among others.\n\n• Automatic instrumentation of the main leasing transactional flows (origination, disbursement, billing, collection), providing end-to-end visibility of each operation.\n\n• Distributed context propagation (W3C Trace Context), allowing trace correlation between SYSDE PLUS and the bank's other systems (core banking, CRM, digital channels).\n\n• Flexible configuration of trace detail level (sampling rate) to balance visibility and performance according to environment needs.\n\nAdditionally, the solution is also compatible with infrastructure monitoring tools such as Prometheus for metrics and ELK/Grafana Loki for log centralization, allowing the bank to integrate SYSDE PLUS within its existing observability stack without needing to adopt proprietary tools.",
    valor: "Integración transparente con el ecosistema de observabilidad del banco, cumpliendo estándares abiertos de la industria y evitando dependencia de herramientas propietarias.",
    valor_en: "Transparent integration with the bank's observability ecosystem, complying with open industry standards and avoiding proprietary tool lock-in.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Flujo de Observabilidad — SYSDE PLUS",
        steps: [
          { icon: "📡", label: "Instrumentación", description: "Trazas automáticas en flujos transaccionales" },
          { icon: "📤", label: "Exportación OTLP", description: "Protocolo estándar OpenTelemetry" },
          { icon: "🔗", label: "Colector Externo", description: "Jaeger, Datadog, Grafana, etc." },
          { icon: "📊", label: "Dashboards", description: "Visualización y alertas en tiempo real" },
        ],
      },
      {
        type: "table" as const,
        title: "Compatibilidad de Herramientas",
        headers: ["Categoría", "Herramientas Soportadas", "Protocolo"],
        rows: [
          ["Trazas distribuidas", "Jaeger, Zipkin, Grafana Tempo, Datadog, New Relic", "OTLP / W3C Trace Context"],
          ["Métricas", "Prometheus, Datadog, Dynatrace, CloudWatch", "OTLP / Prometheus"],
          ["Logs", "ELK Stack, Grafana Loki, Splunk", "OTLP / Syslog"],
          ["APM", "Datadog APM, New Relic APM, Dynatrace", "OTLP nativo"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "Observability Flow — SYSDE PLUS",
        steps: [
          { icon: "📡", label: "Instrumentation", description: "Automatic traces in transactional flows" },
          { icon: "📤", label: "OTLP Export", description: "OpenTelemetry standard protocol" },
          { icon: "🔗", label: "External Collector", description: "Jaeger, Datadog, Grafana, etc." },
          { icon: "📊", label: "Dashboards", description: "Real-time visualization and alerts" },
        ],
      },
      {
        type: "table" as const,
        title: "Tool Compatibility",
        headers: ["Category", "Supported Tools", "Protocol"],
        rows: [
          ["Distributed Traces", "Jaeger, Zipkin, Grafana Tempo, Datadog, New Relic", "OTLP / W3C Trace Context"],
          ["Metrics", "Prometheus, Datadog, Dynatrace, CloudWatch", "OTLP / Prometheus"],
          ["Logs", "ELK Stack, Grafana Loki, Splunk", "OTLP / Syslog"],
          ["APM", "Datadog APM, New Relic APM, Dynatrace", "Native OTLP"],
        ],
      },
    ],
  },
  {
    id: 26,
    title: "Datos Sensibles, Auditoría y Certificaciones ISO",
    title_en: "Sensitive Data, Audit, and ISO Certifications",
    status: "answered",
    section: "N",
    receivedDate: "20 marzo 2026",
    subtitle: "Seguridad y cumplimiento",
    subtitle_en: "Security and compliance",
    requerimiento: "¿Cómo gestionan datos sensibles y auditoría? ¿Cuentan con certificaciones tipo ISO?",
    requerimiento_en: "How do you manage sensitive data and auditing? Do you have ISO-type certifications?",
    respuesta: "SYSDE gestiona datos sensibles y auditoría con un enfoque integral de seguridad respaldado por certificaciones internacionales, como se mencionó en la consulta #2:\n\nGestión de Datos Sensibles:\n• Cifrado en reposo (AES-256) y en tránsito (TLS 1.2/1.3) para toda la información almacenada y transmitida.\n• Enmascaramiento de datos sensibles (PII/PCI) en interfaces de usuario y logs, con acceso controlado por roles.\n• Tokenización de datos financieros críticos (números de cuenta, datos de tarjeta cuando aplica).\n• Segregación de datos por cliente/tenant con aislamiento lógico o físico según el modelo de despliegue.\n• Gestión del ciclo de vida de datos: políticas de retención, purga y archivado conforme a regulaciones locales.\n\nAuditoría:\n• Audit trail completo: registro inmutable de todas las acciones realizadas en la plataforma (creación, modificación, eliminación, consulta de datos sensibles).\n• Cada registro incluye: usuario, fecha/hora, IP de origen, acción realizada, datos antes/después del cambio.\n• Reportes de auditoría parametrizables por período, usuario, tipo de operación o entidad.\n• Integración con sistemas SIEM del banco para centralización de eventos de seguridad.\n\nCertificaciones ISO:\n• ISO 9001:2015 — Sistema de Gestión de Calidad: asegura procesos estandarizados de desarrollo, implementación y soporte.\n• ISO 27001:2013 — Sistema de Gestión de Seguridad de la Información: certifica los controles de seguridad implementados en la organización.\n• Las certificaciones son auditadas periódicamente por organismos certificadores independientes.\n\nEstas certificaciones validan que SYSDE opera bajo estándares internacionales de calidad y seguridad, cumpliendo con las expectativas de instituciones financieras reguladas como BCP.",
    respuesta_en: "SYSDE manages sensitive data with AES-256 encryption at rest, TLS 1.2/1.3 in transit, PII/PCI data masking, financial data tokenization, and tenant data segregation. Audit capabilities include complete immutable audit trails, parameterizable reports, and SIEM integration. Certifications include ISO 9001:2015 (Quality Management) and ISO 27001:2013 (Information Security Management), periodically audited by independent certifiers.",
    valor: "Las certificaciones ISO 9001 y 27001, junto con los controles de seguridad implementados, garantizan a BCP que SYSDE cumple con estándares internacionales de calidad y seguridad de la información.",
    valor_en: "ISO 9001 and 27001 certifications, along with implemented security controls, assure BCP that SYSDE meets international quality and information security standards.",
    diagrams: [
      {
        type: "grid" as const,
        title: "Seguridad y Certificaciones",
        items: [
          "🔐 Cifrado AES-256 en reposo + TLS 1.3 en tránsito",
          "🎭 Enmascaramiento PII/PCI por roles",
          "📝 Audit trail inmutable completo",
          "🏅 ISO 9001:2015 — Gestión de Calidad",
          "🛡️ ISO 27001:2013 — Seguridad de la Información",
          "🔗 Integración SIEM para eventos de seguridad",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid" as const,
        title: "Security and Certifications",
        items: [
          "🔐 AES-256 encryption at rest + TLS 1.3 in transit",
          "🎭 PII/PCI masking by roles",
          "📝 Complete immutable audit trail",
          "🏅 ISO 9001:2015 — Quality Management",
          "🛡️ ISO 27001:2013 — Information Security",
          "🔗 SIEM integration for security events",
        ],
      },
    ],
  },
  {
    id: 27,
    title: "Integraciones con Municipalidades o SAT",
    title_en: "Integrations with Municipalities or SAT",
    status: "answered",
    section: "N",
    receivedDate: "20 marzo 2026",
    subtitle: "Consulta de papeletas y entidades gubernamentales",
    subtitle_en: "Government entity and ticket queries",
    requerimiento: "¿Tienen integraciones existentes (o experiencias reales) con municipalidades o entidades como SAT para consulta/actualización de papeletas? Si sí: ¿cuál entidad, qué modalidad (API, batch, portal), y qué periodicidad?",
    requerimiento_en: "Do you have existing integrations (or real experiences) with municipalities or entities like SAT for ticket query/update? If yes: which entity, what modality (API, batch, portal), and what frequency?",
    respuesta: "Sí, SYSDE cuenta con experiencia real en integraciones con entidades gubernamentales y tributarias en la región:\n\nIntegraciones activas:\n\n• SAT Guatemala (Superintendencia de Administración Tributaria):\n  - Modalidad: API / Web Service para facturación electrónica (FEL).\n  - Funcionalidad: Emisión y certificación de facturas electrónicas directamente desde SYSDE PLUS.\n  - Periodicidad: En tiempo real, cada factura se certifica al momento de su emisión.\n\n• Municipalidades de Costa Rica:\n  - Modalidad: Batch / consulta periódica.\n  - Funcionalidad: Consulta de estado de bienes inmuebles y vehículos para validación de garantías en operaciones de leasing.\n  - Periodicidad: Configurable (diaria, semanal o bajo demanda).\n\n• Registro Nacional de Costa Rica:\n  - Modalidad: API / Web Service.\n  - Funcionalidad: Consulta de estado registral de bienes para validación de propiedad y gravámenes.\n  - Periodicidad: Bajo demanda durante el proceso de originación.\n\n• Dirección General de Tributación (Costa Rica):\n  - Modalidad: API para facturación electrónica.\n  - Funcionalidad: Emisión de comprobantes electrónicos conforme a normativa del Ministerio de Hacienda.\n  - Periodicidad: En tiempo real.\n\nPara BCP en Perú, las integraciones con SUNAT (facturación electrónica), SUNARP (registro de bienes), municipalidades (consulta de papeletas vehiculares) y otras entidades gubernamentales locales se implementarían durante la fase de proyecto, utilizando la capa de integración estándar de SYSDE PLUS. La experiencia previa con entidades similares en otros países reduce significativamente el riesgo y tiempo de implementación de estas integraciones.",
    respuesta_en: "Yes, SYSDE has real experience with government/tax entity integrations: SAT Guatemala (real-time electronic invoicing via API), Costa Rica municipalities (batch property/vehicle queries), Costa Rica National Registry (API property validation), and Costa Rica Tax Authority (real-time electronic invoicing). For BCP in Peru, integrations with SUNAT, SUNARP, and municipalities would be implemented during the project phase using SYSDE PLUS's standard integration layer.",
    valor: "La experiencia previa con entidades gubernamentales similares (SAT, registros, municipalidades) en otros países reduce el riesgo de implementación de estas integraciones en Perú.",
    valor_en: "Prior experience with similar government entities (SAT, registries, municipalities) in other countries reduces the implementation risk for these integrations in Peru.",
    diagrams: [
      {
        type: "table" as const,
        title: "Integraciones Gubernamentales Activas",
        headers: ["Entidad", "País", "Modalidad", "Periodicidad"],
        rows: [
          ["SAT — Facturación electrónica", "Guatemala", "API / Web Service", "Tiempo real"],
          ["Municipalidades — Bienes", "Costa Rica", "Batch", "Configurable"],
          ["Registro Nacional", "Costa Rica", "API / Web Service", "Bajo demanda"],
          ["Tributación — Factura electrónica", "Costa Rica", "API", "Tiempo real"],
          ["SUNAT, SUNARP, Municipalidades", "Perú (BCP)", "API / Batch", "🔄 A implementar"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Active Government Integrations",
        headers: ["Entity", "Country", "Modality", "Frequency"],
        rows: [
          ["SAT — Electronic invoicing", "Guatemala", "API / Web Service", "Real-time"],
          ["Municipalities — Properties", "Costa Rica", "Batch", "Configurable"],
          ["National Registry", "Costa Rica", "API / Web Service", "On demand"],
          ["Tax Authority — E-invoicing", "Costa Rica", "API", "Real-time"],
          ["SUNAT, SUNARP, Municipalities", "Peru (BCP)", "API / Batch", "🔄 To implement"],
        ],
      },
    ],
  },
];

export const counts = {
  total: questions.length,
  answered: questions.filter((q) => q.status === "answered").length,
  pending: questions.filter((q) => q.status === "pending").length,
};
