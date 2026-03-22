export type QuestionStatus = "answered" | "pending";

export type DiagramType = "flow" | "table" | "process" | "layers" | "timeline" | "grid" | "list" | "ecosystem" | "stats" | "embed" | "integration-orbit" | "interactive-ops" | "interactive-apis" | "licensing" | "lifecycle" | "interactive-security" | "interactive-roadmap";

export type SectionKey = "A" | "B" | "C" | "D" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N";

export interface DiagramBlock {
  type: DiagramType;
  title?: string;
  url?: string;
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
  // ── Funcional y Encaje (A) ──
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
    respuesta: "𝗧𝗿𝗮𝘆𝗲𝗰𝘁𝗼𝗿𝗶𝗮 𝗥𝗲𝗰𝗶𝗲𝗻𝘁𝗲: SYSDE cuenta con un portafolio activo de implementaciones en instituciones financieras de relevancia en América Latina. Desde 2022 a la fecha, SYSDE International ha realizado 23 implementaciones exitosas en el sector financiero.\n\n𝗜𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁𝗮𝗰𝗶ó𝗻 𝗗𝗲𝘀𝘁𝗮𝗰𝗮𝗱𝗮 — 𝗖𝗠𝗜: La implementación más reciente en leasing corresponde a Corporación Multi Inversiones (CMI), uno de los conglomerados privados más grandes de Centroamérica con +54,000 colaboradores en 15 países. A finales de 2025, SYSDE inició la implementación de SYSDE PLUS para Factoring y Leasing de CMI, actualmente en fase de implementación.\n\n𝗔𝗹𝗰𝗮𝗻𝗰𝗲 𝗱𝗲𝗹 𝗣𝗿𝗼𝘆𝗲𝗰𝘁𝗼 𝗖𝗠𝗜:\n• Estandarización de procesos multi-país y multi-moneda bajo modelo modular\n• Ciclo end-to-end de Factoring y Leasing (originación → administración operativa y contable)\n• Integración con cuatro instancias de SAP vía core de APIs de SYSDE\n• Interoperabilidad con ecosistema tecnológico corporativo\n\n𝗣𝗹𝗮𝘁𝗮𝗳𝗼𝗿𝗺𝗮 𝗦𝗬𝗦𝗗𝗘 𝗣𝗟𝗨𝗦: Ecosistema financiero compuesto por tres módulos independientes pero nativamente integrados — Leasing, Factoring y Créditos — que pueden activarse modularmente según las necesidades de la institución.\n\n𝗩𝗮𝗹𝗶𝗱𝗮𝗰𝗶ó𝗻 𝗗𝗶𝗿𝗲𝗰𝘁𝗮: SYSDE puede coordinar una sesión de referencia con CMI para que BCP conozca directamente la experiencia de implementación.",
    respuesta_en: "𝗥𝗲𝗰𝗲𝗻𝘁 𝗧𝗿𝗮𝗰𝗸 𝗥𝗲𝗰𝗼𝗿𝗱: SYSDE has an active portfolio of implementations in relevant Latin American financial institutions. Since 2022, SYSDE International has completed 23 successful implementations in the financial sector.\n\n𝗙𝗹𝗮𝗴𝘀𝗵𝗶𝗽 𝗜𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁𝗮𝘁𝗶𝗼𝗻 — 𝗖𝗠𝗜: The most recent leasing implementation is with Corporación Multi Inversiones (CMI), one of Central America's largest private conglomerates with +54,000 employees across 15 countries. In late 2025, SYSDE began implementing SYSDE PLUS for CMI's Factoring and Leasing operations.\n\n𝗖𝗠𝗜 𝗣𝗿𝗼𝗷𝗲𝗰𝘁 𝗦𝗰𝗼𝗽𝗲:\n• Multi-country, multi-currency process standardization under modular model\n• End-to-end Factoring and Leasing cycle (origination → operational and accounting administration)\n• Integration with four SAP instances via SYSDE API core\n• Interoperability with corporate technology ecosystem\n\n𝗦𝗬𝗦𝗗𝗘 𝗣𝗟𝗨𝗦 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: Financial ecosystem composed of three independent but natively integrated modules — Leasing, Factoring, and Credits — activatable modularly per institution needs.\n\n𝗗𝗶𝗿𝗲𝗰𝘁 𝗩𝗮𝗹𝗶𝗱𝗮𝘁𝗶𝗼𝗻: SYSDE can coordinate a reference session with CMI for BCP to learn directly about the implementation experience.",
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
    respuesta: "𝗠𝗼𝗱𝗲𝗹𝗼 𝗱𝗲 𝗣𝗼𝘀𝗶𝗰𝗶𝗼𝗻𝗮𝗺𝗶𝗲𝗻𝘁𝗼: El posicionamiento de SYSDE se ha consolidado a partir de un modelo de negocio diferenciado, sustentado en productos financieros altamente especializados que le han permitido alcanzar un market share relevante en cada segmento.\n\n𝗧𝗿𝗮𝘆𝗲𝗰𝘁𝗼𝗿𝗶𝗮 𝘆 𝗔𝗹𝗰𝗮𝗻𝗰𝗲: Más de 34 años de experiencia con plataformas implementadas en +1,000 instituciones financieras en América Latina y África, abarcando Cooperativas, Microfinanzas, Bancos, Fondos de Pensión, Factoraje y Leasing.\n\n𝗣𝗮𝗿𝘁𝗶𝗰𝗶𝗽𝗮𝗰𝗶ó𝗻 𝗱𝗲 𝗠𝗲𝗿𝗰𝗮𝗱𝗼:\n• Posición líder en Leasing y Factoraje en la región\n• ~30% del mercado de microfinanzas en América Latina\n• ~82% del mercado de plataformas de pensiones regional\n\n𝗙𝗶𝗱𝗲𝗹𝗶𝗱𝗮𝗱 𝗱𝗲 𝗖𝗹𝗶𝗲𝗻𝘁𝗲𝘀: Al menos el 25% de los clientes llevan más de 20 años con la tecnología de SYSDE, evidenciando solidez y evolución continua de las plataformas.\n\n𝗖𝗲𝗿𝘁𝗶𝗳𝗶𝗰𝗮𝗰𝗶𝗼𝗻𝗲𝘀: Procesos respaldados por certificaciones internacionales ISO 9001:2015 e ISO 27001:2013.",
    respuesta_en: "𝗣𝗼𝘀𝗶𝘁𝗶𝗼𝗻𝗶𝗻𝗴 𝗠𝗼𝗱𝗲𝗹: SYSDE's positioning is consolidated through a differentiated business model, supported by highly specialized financial products achieving relevant market share in each segment.\n\n𝗧𝗿𝗮𝗰𝗸 𝗥𝗲𝗰𝗼𝗿𝗱 & 𝗥𝗲𝗮𝗰𝗵: Over 34 years of experience with platforms implemented in +1,000 financial institutions across Latin America and Africa.\n\n𝗠𝗮𝗿𝗸𝗲𝘁 𝗦𝗵𝗮𝗿𝗲:\n• Leading position in Leasing and Factoring in the region\n• ~30% of the Latin American microfinance market\n• ~82% of the regional pension platform market\n\n𝗖𝗹𝗶𝗲𝗻𝘁 𝗟𝗼𝘆𝗮𝗹𝘁𝘆: At least 25% of clients have used SYSDE technology for over 20 years.\n\n𝗖𝗲𝗿𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻𝘀: Processes backed by international ISO 9001:2015 and ISO 27001:2013 certifications.",
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
    respuesta: "𝗥𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗶𝗮𝘀 𝗗𝗶𝘀𝗽𝗼𝗻𝗶𝗯𝗹𝗲𝘀: Compartimos referencias de instituciones líderes que utilizan SYSDE PLUS en América Latina y África, para que BCP pueda conocer de primera mano su experiencia con la solución.\n\n𝗖𝗼𝗻𝗳𝗶𝗱𝗲𝗻𝗰𝗶𝗮𝗹𝗶𝗱𝗮𝗱: Algunos clientes no pueden ser mencionados públicamente por acuerdos de confidencialidad; sin embargo, podemos validar internamente la posibilidad de habilitar referencias y coordinar el contacto.\n\n𝗥𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗶𝗮 𝗗𝗲𝘀𝘁𝗮𝗰𝗮𝗱𝗮 — 𝗖𝗠𝗜: Entre las referencias disponibles se encuentra CMI, con quienes se puede coordinar una sesión para que BCP conozca directamente su experiencia en la implementación y operación de la solución.",
    respuesta_en: "𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗥𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗲𝘀: We share references from leading institutions using SYSDE PLUS across Latin America and Africa, so BCP can learn firsthand about their experience.\n\n𝗖𝗼𝗻𝗳𝗶𝗱𝗲𝗻𝘁𝗶𝗮𝗹𝗶𝘁𝘆: Some clients cannot be publicly mentioned due to confidentiality agreements; however, we can internally validate reference availability and coordinate contact.\n\n𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝗱 𝗥𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗲 — 𝗖𝗠𝗜: CMI is available for a direct reference session so BCP can learn about their implementation and operation experience.",
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
    respuesta: "El problema fundamental que SYSDE PLUS resuelve es la fragmentación operativa y tecnológica del ciclo de vida completo del leasing bancario.\n\n𝗘𝗹 𝗗𝗲𝘀𝗮𝗳í𝗼: Las instituciones financieras operaban con múltiples sistemas desconectados — originación en hojas de cálculo o CRM, administración de contratos en cores legacy, facturación en módulos contables separados y gestión de activos en inventarios manuales.\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺𝗮𝘀 𝗰𝗿í𝘁𝗶𝗰𝗼𝘀 𝗱𝗲𝘁𝗲𝗰𝘁𝗮𝗱𝗼𝘀:\n• Re-digitación de datos entre sistemas con alto riesgo de error\n• Sin vista unificada 360° del cliente y sus operaciones\n• Tiempos de aprobación y desembolso lentos\n• Incumplimiento regulatorio por procesos manuales\n• Altos costos de mantenimiento de múltiples plataformas\n\n𝗟𝗮 𝗦𝗼𝗹𝘂𝗰𝗶ó𝗻 𝗦𝗬𝗦𝗗𝗘 𝗣𝗟𝗨𝗦: Plataforma unificada end-to-end que cubre desde originación hasta finalización del contrato, integrando gestión de activos, contabilidad automática IFRS 16 y cumplimiento regulatorio en un solo ecosistema.\n\n𝗖𝗮𝘀𝗼 𝗖𝗠𝗜: Operación multi-país (6 países), múltiples monedas e instancias de SAP, resuelto mediante arquitectura multi-entidad y capa de integración vía APIs REST.",
    respuesta_en: "The fundamental problem SYSDE PLUS solves is the operational and technological fragmentation of the complete bank leasing lifecycle.\n\n𝗧𝗵𝗲 𝗖𝗵𝗮𝗹𝗹𝗲𝗻𝗴𝗲: Financial institutions operated with multiple disconnected systems — origination in spreadsheets or CRM, contract administration in legacy cores, billing in separate accounting modules, and asset management in manual inventories.\n\n𝗖𝗿𝗶𝘁𝗶𝗰𝗮𝗹 𝗣𝗿𝗼𝗯𝗹𝗲𝗺𝘀 𝗜𝗱𝗲𝗻𝘁𝗶𝗳𝗶𝗲𝗱:\n• Data re-entry between systems with high error risk\n• No unified 360° client view\n• Slow approval and disbursement times\n• Regulatory non-compliance due to manual processes\n• High maintenance costs for multiple platforms\n\n𝗧𝗵𝗲 𝗦𝗬𝗦𝗗𝗘 𝗣𝗟𝗨𝗦 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻: Unified end-to-end platform covering origination through contract completion, integrating asset management, IFRS 16 automatic accounting, and regulatory compliance in a single ecosystem.\n\n𝗖𝗠𝗜 𝗖𝗮𝘀𝗲: Multi-country operation (6 countries), multiple currencies and SAP instances, solved via multi-entity architecture and REST API integration layer.",
    valor: "SYSDE PLUS elimina la fragmentación operativa que afecta a la mayoría de las operaciones de leasing bancario, reduciendo errores, acelerando tiempos de respuesta y disminuyendo costos de mantenimiento tecnológico.",
    valor_en: "SYSDE PLUS eliminates operational fragmentation affecting most bank leasing operations, reducing errors, accelerating response times, and decreasing technology maintenance costs.",
    diagrams: [
      {
        type: "flow" as const,
        title: "Antes vs. Después — Transformación Operativa",
        steps: [
          { icon: "❌", label: "ANTES: Fragmentado", description: "5+ sistemas desconectados" },
          { icon: "🔄", label: "Implementación", description: "SYSDE PLUS unifica todo" },
          { icon: "✅", label: "DESPUÉS: Integrado", description: "Plataforma única E2E" },
          { icon: "📈", label: "Resultado", description: "+40% eficiencia operativa" },
        ],
      },
      {
        type: "table" as const,
        title: "Integraciones Implementadas en Clientes de Leasing",
        headers: ["Cliente", "Integración", "Sistemas Conectados", "Resultado"],
        rows: [
          ["CMI (6 países)", "APIs REST bidireccionales", "SAP FI/CO, SAP MM, CRM", "Operación multi-país centralizada"],
          ["Davivienda", "Servicios web + Eventos", "Core bancario, Workflow, AML", "Ciclo E2E automatizado"],
          ["BCR Costa Rica", "APIs + Bus de datos", "SINPE, Core legacy, Contabilidad", "Cumplimiento regulatorio 100%"],
          ["Apex / Aurum", "REST APIs + Webhooks", "ERP, Contabilidad, Reportería", "Reducción 60% tiempo operativo"],
        ],
      },
      {
        type: "grid" as const,
        title: "Problemas Críticos Resueltos",
        items: [
          "Eliminación de re-digitación entre sistemas",
          "Vista unificada 360° del cliente",
          "Aprobación y desembolso acelerados",
          "Contabilidad IFRS 16 automática",
          "Cumplimiento regulatorio en tiempo real",
          "Operación multi-país centralizada (CMI: 6 países)",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "flow" as const,
        title: "Before vs. After — Operational Transformation",
        steps: [
          { icon: "❌", label: "BEFORE: Fragmented", description: "5+ disconnected systems" },
          { icon: "🔄", label: "Implementation", description: "SYSDE PLUS unifies all" },
          { icon: "✅", label: "AFTER: Integrated", description: "Single E2E platform" },
          { icon: "📈", label: "Result", description: "+40% operational efficiency" },
        ],
      },
      {
        type: "table" as const,
        title: "Integrations Implemented at Leasing Clients",
        headers: ["Client", "Integration", "Connected Systems", "Result"],
        rows: [
          ["CMI (6 countries)", "Bidirectional REST APIs", "SAP FI/CO, SAP MM, CRM", "Centralized multi-country operation"],
          ["Davivienda", "Web services + Events", "Banking core, Workflow, AML", "Automated E2E cycle"],
          ["BCR Costa Rica", "APIs + Data bus", "SINPE, Legacy core, Accounting", "100% regulatory compliance"],
          ["Apex / Aurum", "REST APIs + Webhooks", "ERP, Accounting, Reporting", "60% operational time reduction"],
        ],
      },
      {
        type: "grid" as const,
        title: "Critical Problems Solved",
        items: [
          "Elimination of data re-entry between systems",
          "Unified 360° client view",
          "Accelerated approval and disbursement",
          "Automatic IFRS 16 accounting",
          "Real-time regulatory compliance",
          "Centralized multi-country operation (CMI: 6 countries)",
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
    respuesta: "𝗥𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮: Sí, SYSDE PLUS soporta nativamente leasing financiero bancario en entidades reguladas. La plataforma opera bajo los marcos regulatorios de instituciones financieras supervisadas en América Latina.\n\n𝗖𝘂𝗺𝗽𝗹𝗶𝗺𝗶𝗲𝗻𝘁𝗼 𝗥𝗲𝗴𝘂𝗹𝗮𝘁𝗼𝗿𝗶𝗼:\n• Contabilidad bajo NIIF/IFRS 16 con asientos automáticos\n• Reportes para superintendencias parametrizables por jurisdicción (SBS, SUGEF, SIB, CNBS, SSF, CNBV)\n• Segregación de funciones con control de acceso por roles\n• Trazabilidad completa (audit trail) con registro de usuario, fecha/hora e IP\n• Cálculo automático de provisiones según normativas locales",
    respuesta_en: "𝗔𝗻𝘀𝘄𝗲𝗿: Yes, SYSDE PLUS natively supports bank financial leasing in regulated entities, operating under regulatory frameworks of supervised financial institutions in Latin America.\n\n𝗥𝗲𝗴𝘂𝗹𝗮𝘁𝗼𝗿𝘆 𝗖𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲:\n• IFRS 16 accounting with automatic entries\n• Parameterizable superintendency reports by jurisdiction (SBS, SUGEF, SIB, CNBS, SSF, CNBV)\n• Role-based access control with function segregation\n• Complete audit trail with user, timestamp, and IP logging\n• Automatic provision calculation per local regulations",
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
      {
        type: "grid" as const,
        title: "Capacidades Regulatorias Clave",
        items: [
          "Contabilidad NIIF/IFRS 16 automática",
          "Reportes regulatorios por jurisdicción",
          "Control de acceso por roles y segregación",
          "Audit trail inmutable completo",
          "Provisiones automáticas según normativa local",
          "Documentación fiscal electrónica",
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
      {
        type: "grid" as const,
        title: "Key Regulatory Capabilities",
        items: [
          "Automatic IFRS 16 accounting",
          "Regulatory reports by jurisdiction",
          "Role-based access control and segregation",
          "Complete immutable audit trail",
          "Automatic provisions per local regulations",
          "Electronic fiscal documentation",
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
    respuesta: "𝗖𝗹𝗶𝗲𝗻𝘁𝗲𝘀 𝗣𝗿𝗶𝗻𝗰𝗶𝗽𝗮𝗹𝗲𝘀 𝗲𝗻 𝗟𝗲𝗮𝘀𝗶𝗻𝗴: SYSDE PLUS opera leasing financiero en instituciones detalladas en la consulta #1:\n\n• 𝗖𝗠𝗜 (Guatemala/Centroamérica) — Implementación en proceso desde finales de 2025 para Factoring y Leasing, con integración a 4 instancias SAP. +54,000 colaboradores, 15 países.\n• 𝗕𝗮𝗻𝗰𝗼 𝗱𝗲 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮 (BCR) — Banco estatal con leasing financiero activo (equipos, vehículos e inmuebles).\n• 𝗚𝗡𝗣 𝗠é𝘅𝗶𝗰𝗼 — Módulo de Leasing activo para arrendamiento financiero.\n\n𝗢𝘁𝗿𝗮𝘀 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝗰𝗶𝗼𝗻𝗲𝘀: Unicomer, Banco Nacional de Costa Rica, Credicomer, Bankaool y ADOPEM con configuraciones modulares.\n\n𝗥𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗶𝗮𝘀: SYSDE puede coordinar sesiones de referencia con estas instituciones para validación directa por parte de BCP.",
    respuesta_en: "𝗞𝗲𝘆 𝗟𝗲𝗮𝘀𝗶𝗻𝗴 𝗖𝗹𝗶𝗲𝗻𝘁𝘀: SYSDE PLUS operates financial leasing in institutions detailed in query #1:\n\n• 𝗖𝗠𝗜 (Guatemala/Central America) — Implementation in progress since late 2025, 4 SAP instances, +54,000 employees, 15 countries.\n• 𝗕𝗮𝗻𝗰𝗼 𝗱𝗲 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮 (BCR) — State bank with active financial leasing.\n• 𝗚𝗡𝗣 𝗠𝗲𝘅𝗶𝗰𝗼 — Active Leasing module.\n\n𝗢𝘁𝗵𝗲𝗿 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀: Unicomer, Banco Nacional, Credicomer, Bankaool, ADOPEM with modular configurations.\n\n𝗥𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗲𝘀: SYSDE can coordinate reference sessions for direct BCP validation.",
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
      {
        type: "flow" as const,
        title: "Alcance por Cliente",
        steps: [
          { icon: "🏢", label: "CMI", description: "6 países, SAP x4, Leasing+Factoring" },
          { icon: "🏦", label: "BCR", description: "Equipos, vehículos, inmuebles" },
          { icon: "🇲🇽", label: "GNP", description: "Arrendamiento financiero" },
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
      {
        type: "flow" as const,
        title: "Scope per Client",
        steps: [
          { icon: "🏢", label: "CMI", description: "6 countries, SAP x4, Leasing+Factoring" },
          { icon: "🏦", label: "BCR", description: "Equipment, vehicles, real estate" },
          { icon: "🇲🇽", label: "GNP", description: "Financial leasing" },
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
    respuesta: "SYSDE PLUS gestiona nativamente los tres elementos clave del leasing financiero con alto nivel de parametrización:\n\n𝗢𝗽𝗰𝗶ó𝗻 𝗱𝗲 𝗖𝗼𝗺𝗽𝗿𝗮:\n• Configuración flexible: porcentaje o monto fijo al momento de estructuración\n• Ejercicio automático al vencimiento o por solicitud del cliente\n• Flujo completo: notificación → aceptación → factura de venta → transferencia de propiedad\n• Registro contable automático conforme a NIIF/IFRS 16\n\n𝗩𝗮𝗹𝗼𝗿 𝗥𝗲𝘀𝗶𝗱𝘂𝗮𝗹:\n• Definición de valor garantizado y no garantizado al crear el contrato\n• Impacto automático en el cálculo de cuotas de arrendamiento\n• Revaluación durante la vida del contrato según normativa local\n• Tratamiento contable diferenciado según tipo de garantía\n\n𝗣𝗿𝗲𝗰𝘂𝗼𝘁𝗮𝘀 (𝗖𝘂𝗼𝘁𝗮𝘀 𝗔𝗻𝘁𝗶𝗰𝗶𝗽𝗮𝗱𝗮𝘀):\n• Cobro antes del inicio formal del contrato\n• Registro como anticipo con tratamiento contable y fiscal correcto\n• Aplicación automática al plan de pagos una vez formalizado\n• Flexibilidad en número, montos y periodicidad\n\n𝗥𝗼𝗮𝗱𝗺𝗮𝗽 𝗘𝘃𝗼𝗹𝘂𝘁𝗶𝘃𝗼 𝗕𝗖𝗣: El modelo de SYSDE incluye un roadmap evolutivo exclusivo para BCP, lo que significa que cualquier mejora, ajuste o nueva funcionalidad desarrollada dentro del alcance del proyecto se entrega 𝘀𝗶𝗻 𝗰𝗼𝘀𝘁𝗼 𝗮𝗱𝗶𝗰𝗶𝗼𝗻𝗮𝗹 como parte de la evolución continua de la plataforma.",
    respuesta_en: "SYSDE PLUS natively manages all three key financial leasing elements with high parameterization:\n\n𝗣𝘂𝗿𝗰𝗵𝗮𝘀𝗲 𝗢𝗽𝘁𝗶𝗼𝗻:\n• Flexible configuration: percentage or fixed amount at structuring\n• Automatic exercise at maturity or by client request\n• Complete flow: notification → acceptance → sale invoice → property transfer\n• Automatic IFRS 16 accounting\n\n𝗥𝗲𝘀𝗶𝗱𝘂𝗮𝗹 𝗩𝗮𝗹𝘂𝗲:\n• Guaranteed and non-guaranteed definition at contract creation\n• Automatic impact on lease installment calculation\n• Revaluation during contract life per local regulations\n• Differentiated accounting by guarantee type\n\n𝗣𝗿𝗲-𝗶𝗻𝘀𝘁𝗮𝗹𝗹𝗺𝗲𝗻𝘁𝘀 (𝗔𝗱𝘃𝗮𝗻𝗰𝗲 𝗣𝗮𝘆𝗺𝗲𝗻𝘁𝘀):\n• Collection before formal contract start\n• Recorded as advance with correct accounting and tax treatment\n• Automatic application to payment plan once formalized\n• Flexible number, amounts, and frequency\n\n𝗕𝗖𝗣 𝗘𝘃𝗼𝗹𝘂𝘁𝗶𝗼𝗻𝗮𝗿𝘆 𝗥𝗼𝗮𝗱𝗺𝗮𝗽: SYSDE's model includes an exclusive evolutionary roadmap for BCP, meaning any improvement, adjustment, or new functionality developed within the project scope is delivered 𝗮𝘁 𝗻𝗼 𝗮𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗰𝗼𝘀𝘁 as part of the platform's continuous evolution.",
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
    respuesta: "𝗚𝗲𝘀𝘁𝗶ó𝗻 𝗜𝗻𝘁𝗲𝗴𝗿𝗮𝗱𝗮: SYSDE PLUS gestiona la relación entre leasing y líneas de crédito nativamente a través de su Módulo de Cliente, el cual actúa como el núcleo central del ecosistema.\n\n𝗘𝗹 𝗠ó𝗱𝘂𝗹𝗼 𝗱𝗲 𝗖𝗹𝗶𝗲𝗻𝘁𝗲 𝗰𝗼𝗺𝗼 𝗻ú𝗰𝗹𝗲𝗼: Todo parte del cliente. El Módulo de Cliente es el sol del ecosistema SYSDE PLUS, y alrededor de él orbitan todos los productos financieros: Leasing, Factoraje, Préstamos, Pensiones, Workflow y más. Esto garantiza una vista 360° del cliente y su exposición crediticia consolidada.\n\n𝗖𝗮𝗽𝗮𝗰𝗶𝗱𝗮𝗱𝗲𝘀 𝗣𝗿𝗶𝗻𝗰𝗶𝗽𝗮𝗹𝗲𝘀:\n• 𝗔𝘀𝗶𝗴𝗻𝗮𝗰𝗶ó𝗻 𝗮𝘂𝘁𝗼𝗺á𝘁𝗶𝗰𝗮: Cada operación de leasing consume cupo al desembolso y lo libera al amortizar\n• 𝗟í𝗻𝗲𝗮𝘀 𝗰𝗼𝗺𝗽𝗮𝗿𝘁𝗶𝗱𝗮𝘀: Una línea puede cubrir leasing, factoring y créditos con visión consolidada\n• 𝗖𝗼𝗻𝘁𝗿𝗼𝗹 𝗲𝗻 𝘁𝗶𝗲𝗺𝗽𝗼 𝗿𝗲𝗮𝗹: Validación automática de cupo disponible antes de autorizar desembolso\n• 𝗦𝘂𝗯𝗹í𝗺𝗶𝘁𝗲𝘀: Soporte para sublíneas dentro de una línea maestra\n• 𝗩𝗶𝘀𝘁𝗮 𝗰𝗼𝗻𝘀𝗼𝗹𝗶𝗱𝗮𝗱𝗮: Panel unificado con líneas aprobadas, cupo por producto, disponible y vencimiento\n• 𝗥𝗲𝗻𝗼𝘃𝗮𝗰𝗶ó𝗻: Flujos parametrizables con impacto automático en operaciones vigentes",
    respuesta_en: "𝗜𝗻𝘁𝗲𝗴𝗿𝗮𝘁𝗲𝗱 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁: SYSDE PLUS natively manages the leasing-credit line relationship through its Client Module, which acts as the central hub of the ecosystem.\n\n𝗖𝗹𝗶𝗲𝗻𝘁 𝗠𝗼𝗱𝘂𝗹𝗲 𝗮𝘀 𝘁𝗵𝗲 𝗖𝗼𝗿𝗲: Everything starts with the client. The Client Module is the sun of the SYSDE PLUS ecosystem, with all financial products orbiting around it: Leasing, Factoring, Loans, Pensions, Workflow, and more. This guarantees a 360° client view with consolidated credit exposure.\n\n𝗞𝗲𝘆 𝗖𝗮𝗽𝗮𝗯𝗶𝗹𝗶𝘁𝗶𝗲𝘀:\n• 𝗔𝘂𝘁𝗼𝗺𝗮𝘁𝗶𝗰 𝗮𝘀𝘀𝗶𝗴𝗻𝗺𝗲𝗻𝘁: Each leasing operation consumes limit on disbursement and releases on amortization\n• 𝗦𝗵𝗮𝗿𝗲𝗱 𝗹𝗶𝗻𝗲𝘀: One line can cover leasing, factoring, and credits with consolidated view\n• 𝗥𝗲𝗮𝗹-𝘁𝗶𝗺𝗲 𝗰𝗼𝗻𝘁𝗿𝗼𝗹: Automatic available limit validation before authorizing disbursement\n• 𝗦𝘂𝗯-𝗹𝗶𝗺𝗶𝘁𝘀: Support for sub-lines within a master line\n• 𝗖𝗼𝗻𝘀𝗼𝗹𝗶𝗱𝗮𝘁𝗲𝗱 𝘃𝗶𝗲𝘄: Unified panel with approved lines, limit by product, available, and expiration\n• 𝗥𝗲𝗻𝗲𝘄𝗮𝗹: Parameterizable flows with automatic impact on active operations",
    valor: "La gestión integrada de líneas de crédito permite a BCP tener control en tiempo real de la exposición crediticia de cada cliente a través de todos los productos financieros.",
    valor_en: "Integrated credit line management allows BCP to have real-time control of each client's credit exposure across all financial products.",
    diagrams: [
      { type: "ecosystem" as DiagramType },
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
      {
        type: "table" as const,
        title: "Tipos de Líneas Soportadas",
        headers: ["Tipo de Línea", "Descripción", "Productos Cubiertos"],
        rows: [
          ["Línea Maestra", "Cupo global del cliente", "Leasing + Factoring + Créditos"],
          ["Sublínea por Producto", "Límite específico dentro de la maestra", "Leasing exclusivo"],
          ["Línea Compartida", "Cupo compartido entre productos", "Multi-producto consolidado"],
          ["Línea Rotativa", "Cupo que se renueva al amortizar", "Operaciones recurrentes"],
        ],
      },
    ],
    diagrams_en: [
      { type: "ecosystem" as DiagramType },
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
      {
        type: "table" as const,
        title: "Supported Line Types",
        headers: ["Line Type", "Description", "Covered Products"],
        rows: [
          ["Master Line", "Client's global limit", "Leasing + Factoring + Credits"],
          ["Product Sub-line", "Specific limit within master", "Exclusive Leasing"],
          ["Shared Line", "Shared limit across products", "Consolidated multi-product"],
          ["Revolving Line", "Limit renews on amortization", "Recurring operations"],
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
    respuesta: "𝗥𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮: Sí, SYSDE PLUS se encuentra desplegada activamente en múltiples bancos e instituciones financieras de la región LATAM.\n\n𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝗰𝗶𝗼𝗻𝗲𝘀 𝗗𝗲𝘀𝘁𝗮𝗰𝗮𝗱𝗮𝘀:\n• 𝗕𝗖𝗥 (Costa Rica) — Banco estatal con leasing financiero activo\n• 𝗖𝗠𝗜 (Guatemala / 15 países) — Implementación en proceso desde 2025\n• 𝗚𝗡𝗣 (México) — Módulo de Leasing activo\n• 𝗕𝗮𝗻𝗸𝗮𝗼𝗼𝗹 (México) — Plataforma SYSDE PLUS\n• 𝗔𝗗𝗢𝗣𝗘𝗠 (Rep. Dominicana) — Microfinanzas y crédito\n\n𝗔𝗹𝗰𝗮𝗻𝗰𝗲 𝗚𝗹𝗼𝗯𝗮𝗹: +1,000 instituciones en LATAM y África, con operaciones en Perú, Costa Rica, Guatemala, Honduras, El Salvador, Nicaragua, Panamá, Rep. Dominicana, México, Colombia, Ecuador y África.\n\n𝗔𝗿𝗾𝘂𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗮 𝗠𝘂𝗹𝘁𝗶 𝘆 𝗠𝗼𝗱𝘂𝗹𝗮𝗿: SYSDE PLUS utiliza una arquitectura multi y modular que soporta despliegues multi-país, multi-moneda, multi-idioma y multi-regulación desde una misma plataforma base. Cada módulo (Leasing, Factoring, Créditos, Pensiones) se activa independientemente según las necesidades de la institución, permitiendo una adopción progresiva sin comprometer la integración nativa entre componentes.",
    respuesta_en: "𝗔𝗻𝘀𝘄𝗲𝗿: Yes, SYSDE PLUS is actively deployed in multiple LATAM banks and financial institutions.\n\n𝗞𝗲𝘆 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀:\n• 𝗕𝗖𝗥 (Costa Rica) — State bank with active financial leasing\n• 𝗖𝗠𝗜 (Guatemala / 15 countries) — Implementation in progress since 2025\n• 𝗚𝗡𝗣 (Mexico) — Active Leasing module\n• 𝗕𝗮𝗻𝗸𝗮𝗼𝗼𝗹 (Mexico) — SYSDE PLUS platform\n• 𝗔𝗗𝗢𝗣𝗘𝗠 (Dominican Republic) — Microfinance and credit\n\n𝗚𝗹𝗼𝗯𝗮𝗹 𝗥𝗲𝗮𝗰𝗵: +1,000 institutions in LATAM and Africa, with operations in Peru, Costa Rica, Guatemala, Honduras, El Salvador, Nicaragua, Panama, Dominican Republic, Mexico, Colombia, Ecuador and Africa.\n\n𝗠𝘂𝗹𝘁𝗶 & 𝗠𝗼𝗱𝘂𝗹𝗮𝗿 𝗔𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲: SYSDE PLUS uses a multi and modular architecture supporting multi-country, multi-currency, multi-language, and multi-regulation deployments from a single base platform. Each module (Leasing, Factoring, Credits, Pensions) activates independently per institution needs, enabling progressive adoption without compromising native integration between components.",
    valor: "SYSDE PLUS tiene presencia comprobada en bancos regulados de la región LATAM, lo que reduce el riesgo de implementación para BCP y valida la capacidad de la solución en entornos similares.",
    valor_en: "SYSDE PLUS has proven presence in regulated LATAM banks, reducing implementation risk for BCP and validating the solution's capability in similar environments.",
    diagrams: [
      {
        type: "table" as const,
        title: "Presencia en Bancos de LATAM",
        headers: ["Institución", "País", "Productos Activos", "Estado"],
        rows: [
          ["Banco de Costa Rica", "Costa Rica", "Leasing Financiero", "✅ Producción"],
          ["CMI", "Guatemala / 15 países", "Leasing + Factoring", "🔄 Implementación"],
          ["GNP", "México", "Leasing", "✅ Producción"],
          ["Bankaool", "México", "SYSDE PLUS", "✅ Producción"],
          ["ADOPEM", "Rep. Dominicana", "Microfinanzas + Crédito", "✅ Producción"],
        ],
      },
      {
        type: "grid" as const,
        title: "Capacidades Multi-País",
        items: [
          "Multi-moneda con tipos de cambio configurables",
          "Multi-regulación por jurisdicción",
          "Multi-idioma (español, inglés, portugués)",
          "Despliegue centralizado o distribuido",
          "Consolidación financiera multi-entidad",
          "+1,000 instituciones en producción",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Presence in LATAM Banks",
        headers: ["Institution", "Country", "Active Products", "Status"],
        rows: [
          ["Banco de Costa Rica", "Costa Rica", "Financial Leasing", "✅ Production"],
          ["CMI", "Guatemala / 15 countries", "Leasing + Factoring", "🔄 Implementation"],
          ["GNP", "Mexico", "Leasing", "✅ Production"],
          ["Bankaool", "Mexico", "SYSDE PLUS", "✅ Production"],
          ["ADOPEM", "Dominican Republic", "Microfinance + Credit", "✅ Production"],
        ],
      },
      {
        type: "grid" as const,
        title: "Multi-Country Capabilities",
        items: [
          "Multi-currency with configurable exchange rates",
          "Multi-regulation by jurisdiction",
          "Multi-language (Spanish, English, Portuguese)",
          "Centralized or distributed deployment",
          "Multi-entity financial consolidation",
          "+1,000 institutions in production",
        ],
      },
    ],
  },

  // ── Modelo de Entrega (C) ──
  {
    id: 5,
    title: "Modelo de Entrega: SaaS, PaaS y On-Premise",
    title_en: "Delivery Model: SaaS, PaaS & On-Premise",
    status: "answered",
    section: "C",
    receivedDate: "20 marzo 2026",
    subtitle: "Flexibilidad en modelos de entrega",
    subtitle_en: "Delivery model flexibility",
    requerimiento: "¿El software se ofrece bajo un modelo SaaS (Software as a Service)?",
    requerimiento_en: "Is the software offered under a SaaS (Software as a Service) model?",
    respuesta: "𝗥𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮: Sí, SYSDE PLUS se ofrece bajo tres modelos de entrega para adaptarse a las necesidades de cada institución:\n\n𝗠𝗼𝗱𝗲𝗹𝗼 𝗦𝗮𝗮𝗦 (𝗦𝗼𝗳𝘁𝘄𝗮𝗿𝗲 𝗮𝘀 𝗮 𝗦𝗲𝗿𝘃𝗶𝗰𝗲):\n• Despliegue en Microsoft Azure con alta disponibilidad y escalabilidad elástica\n• SYSDE gestiona infraestructura, monitoreo, respaldos y DR\n• Actualizaciones continuas sin impacto operativo\n• SLA 99.9% con soporte 24/7\n• Tenencia multi-tenant (aislamiento lógico) o single-tenant dedicado\n\n𝗠𝗼𝗱𝗲𝗹𝗼 𝗣𝗮𝗮𝗦 (𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 𝗮𝘀 𝗮 𝗦𝗲𝗿𝘃𝗶𝗰𝗲):\n• SYSDE provee la plataforma y herramientas de desarrollo\n• El banco puede personalizar y extender funcionalidades sobre la plataforma\n• Acceso a APIs, SDKs y herramientas de configuración avanzada\n• Ideal para bancos con equipos técnicos internos que desean mayor control\n\n𝗠𝗼𝗱𝗲𝗹𝗼 𝗢𝗻-𝗣𝗿𝗲𝗺𝗶𝘀𝗲:\n• Instalación en infraestructura propia del banco\n• Control total del entorno, datos y seguridad\n• Mismas funcionalidades que el modelo SaaS\n• Ideal para instituciones con requerimientos regulatorios específicos de residencia de datos\n\n𝗙𝗹𝗲𝘅𝗶𝗯𝗶𝗹𝗶𝗱𝗮𝗱: También soporta modelos híbridos combinando cloud y on-premise según las necesidades del banco.",
    respuesta_en: "𝗔𝗻𝘀𝘄𝗲𝗿: Yes, SYSDE PLUS is offered under three delivery models to adapt to each institution's needs:\n\n𝗦𝗮𝗮𝗦 𝗠𝗼𝗱𝗲𝗹 (𝗦𝗼𝗳𝘁𝘄𝗮𝗿𝗲 𝗮𝘀 𝗮 𝗦𝗲𝗿𝘃𝗶𝗰𝗲):\n• Deployment on Microsoft Azure with high availability and elastic scalability\n• SYSDE manages infrastructure, monitoring, backups, and DR\n• Continuous updates without operational impact\n• 99.9% SLA with 24/7 support\n• Multi-tenant (logical isolation) or dedicated single-tenant\n\n𝗣𝗮𝗮𝗦 𝗠𝗼𝗱𝗲𝗹 (𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 𝗮𝘀 𝗮 𝗦𝗲𝗿𝘃𝗶𝗰𝗲):\n• SYSDE provides the platform and development tools\n• The bank can customize and extend functionalities on the platform\n• Access to APIs, SDKs, and advanced configuration tools\n• Ideal for banks with internal technical teams seeking greater control\n\n𝗢𝗻-𝗣𝗿𝗲𝗺𝗶𝘀𝗲 𝗠𝗼𝗱𝗲𝗹:\n• Installation on the bank's own infrastructure\n• Full control of environment, data, and security\n• Same functionalities as the SaaS model\n• Ideal for institutions with specific data residency regulatory requirements\n\n𝗙𝗹𝗲𝘅𝗶𝗯𝗶𝗹𝗶𝘁𝘆: Also supports hybrid models combining cloud and on-premise per bank needs.",
    valor: "El modelo SaaS reduce los costos de infraestructura y operación para BCP, garantizando acceso a la versión más actualizada de la plataforma sin esfuerzo adicional.",
    valor_en: "The SaaS model reduces infrastructure and operation costs for BCP, ensuring access to the most up-to-date platform version without additional effort.",
    diagrams: [
      {
        type: "table" as const,
        title: "Modelos de Entrega Disponibles",
        headers: ["Modelo", "Infraestructura", "Gestión", "Ideal para"],
        rows: [
          ["☁️ SaaS", "Azure, datos aislados", "100% SYSDE", "Bancos que priorizan agilidad"],
          ["🔧 PaaS", "Azure + herramientas SYSDE", "Compartida", "Bancos con equipos técnicos internos"],
          ["🏢 On-Premise", "Infraestructura del banco", "Cliente + SYSDE", "Requerimientos de residencia de datos"],
          ["🔄 Híbrido", "Azure + infraestructura local", "Compartida", "Combinación cloud + on-premise"],
        ],
      },
      {
        type: "grid" as const,
        title: "Beneficios Comunes a Todos los Modelos",
        items: [
          "Arquitectura de microservicios",
          "Actualizaciones sin impacto operativo",
          "SLA 99.9% con soporte 24/7",
          "Backups y DR gestionados",
          "Escalabilidad elástica",
          "Mismas funcionalidades en cualquier modelo",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Available Delivery Models",
        headers: ["Model", "Infrastructure", "Management", "Ideal for"],
        rows: [
          ["☁️ SaaS", "Azure, isolated data", "100% SYSDE", "Banks prioritizing agility"],
          ["🔧 PaaS", "Azure + SYSDE tools", "Shared", "Banks with internal technical teams"],
          ["🏢 On-Premise", "Bank infrastructure", "Client + SYSDE", "Data residency requirements"],
          ["🔄 Hybrid", "Azure + local infra", "Shared", "Cloud + on-premise combination"],
        ],
      },
      {
        type: "grid" as const,
        title: "Benefits Common to All Models",
        items: [
          "Microservices architecture",
          "Updates without operational impact",
          "99.9% SLA with 24/7 support",
          "Managed backups and DR",
          "Elastic scalability",
          "Same functionalities in any model",
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
    respuesta: "SYSDE PLUS opera bajo un modelo de suscripción ilimitado que incluye:\n\n𝗦𝗼𝗽𝗼𝗿𝘁𝗲 𝗜𝗹𝗶𝗺𝗶𝘁𝗮𝗱𝗼: Soporte técnico y funcional incluido sin costo adicional, sin cobro por ticket, sin cobro por incidente. Siempre premium, sin restricciones.\n\n𝗗𝗲𝘀𝗮𝗿𝗿𝗼𝗹𝗹𝗼 𝗘𝘃𝗼𝗹𝘂𝘁𝗶𝘃𝗼: Las mejoras funcionales, ajustes regulatorios y nuevas funcionalidades se entregan sin costo adicional como parte de la evolución continua de la plataforma.\n\n𝗦𝗶𝗻 𝗖𝗼𝗯𝗿𝗼𝘀 𝗢𝗰𝘂𝗹𝘁𝗼𝘀: Sin cargo por usuario, por transacción, por empresa ni por módulo activo. Una suscripción, todo ilimitado.",
    respuesta_en: "SYSDE PLUS operates under an unlimited subscription model that includes:\n\n𝗨𝗻𝗹𝗶𝗺𝗶𝘁𝗲𝗱 𝗦𝘂𝗽𝗽𝗼𝗿𝘁: Technical and functional support included at no additional cost, no per-ticket charges, no per-incident charges. Always premium, no restrictions.\n\n𝗘𝘃𝗼𝗹𝘂𝘁𝗶𝗼𝗻𝗮𝗿𝘆 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁: Functional improvements, regulatory adjustments and new functionalities are delivered at no additional cost as part of continuous platform evolution.\n\n𝗡𝗼 𝗛𝗶𝗱𝗱𝗲𝗻 𝗖𝗵𝗮𝗿𝗴𝗲𝘀: No per-user, per-transaction, per-company or per-module charges. One subscription, everything unlimited.",
    valor: "El modelo de suscripción ilimitado con soporte y capacitación incluidos ofrece total predictibilidad de costos para BCP, eliminando sorpresas y facilitando la planificación presupuestaria.",
    valor_en: "The unlimited subscription model with included support and training offers total cost predictability for BCP, eliminating surprises and facilitating budget planning.",
    diagrams: [
      { type: "licensing" as DiagramType },
    ],
    diagrams_en: [
      { type: "licensing" as DiagramType },
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
    respuesta: "SYSDE PLUS cubre nativamente el ciclo de vida completo (end-to-end) del leasing financiero, desde originación hasta finalización del contrato. Haga click en cada fase para ver el detalle.",
    respuesta_en: "SYSDE PLUS natively covers the complete leasing lifecycle (end-to-end), from origination to contract finalization. Click on each phase for details.",
    valor: "La cobertura end-to-end nativa elimina la necesidad de sistemas auxiliares para las operaciones core de leasing, reduciendo complejidad y riesgo operativo.",
    valor_en: "Native end-to-end coverage eliminates the need for auxiliary systems for core leasing operations, reducing complexity and operational risk.",
    diagrams: [],
    diagrams_en: [],
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
    respuesta: "Sí. SYSDE PLUS cubre la totalidad del ciclo de vida (ver consulta #12). Las integraciones externas son complementarias, no estructurales. Todas se realizan mediante el Core de APIs de SYSDE PLUS.",
    respuesta_en: "Yes. SYSDE PLUS covers the entire lifecycle (see query #12). External integrations are complementary, not structural. All are done through the SYSDE PLUS API Core.",
    valor: "Las dependencias externas son complementarias, no estructurales. SYSDE PLUS mantiene la lógica de negocio completa internamente y se conecta con los sistemas del banco mediante APIs estándar.",
    valor_en: "External dependencies are complementary, not structural. SYSDE PLUS maintains complete business logic internally and connects with bank systems via standard APIs.",
    diagrams: [],
    diagrams_en: [],
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
    respuesta: "SYSDE PLUS gestiona nativamente estos cuatro componentes operativos del leasing:\n\n𝗦𝗲𝗴𝘂𝗿𝗼𝘀:\n• Registro de pólizas asociadas al activo arrendado\n• Control de vigencia con alertas automáticas de vencimiento y renovación\n• Cobro de primas al arrendatario (incluidas en cuota o cobro separado)\n• Integración con aseguradoras para consulta de estado\n\n𝗜𝗺𝗽𝘂𝗲𝘀𝘁𝗼𝘀:\n• Cálculo automático de IVA, ISR e impuestos locales según jurisdicción y tipo de activo\n• Facturación electrónica conforme a normativa fiscal local\n• Retención de impuestos en la fuente cuando aplica\n• Reportes fiscales periódicos\n\n𝗠𝘂𝗹𝘁𝗮𝘀:\n• Registro y seguimiento de multas asociadas al activo (tránsito, municipales, ambientales)\n• Flujo: notificación al arrendatario → cobro → seguimiento de pago\n• Traslado al arrendatario o absorción según configuración contractual\n\n𝗦𝗶𝗻𝗶𝗲𝘀𝘁𝗿𝗼𝘀:\n• Registro del siniestro (pérdida total, parcial, daño)\n• Flujo de reclamación ante aseguradora\n• Cálculo de impacto financiero (saldo pendiente vs. indemnización)\n• Cierre anticipado en caso de pérdida total\n• Registro contable automático del evento",
    respuesta_en: "SYSDE PLUS natively manages four operational leasing components:\n\n𝗜𝗻𝘀𝘂𝗿𝗮𝗻𝗰𝗲:\n• Policy registration linked to leased asset\n• Automatic expiration alerts and renewal control\n• Premium collection from lessee (in installment or separate)\n• Insurer integration for status queries\n\n𝗧𝗮𝘅𝗲𝘀:\n• Automatic VAT, income tax, and local tax calculation by jurisdiction and asset type\n• Electronic invoicing per local fiscal regulations\n• Withholding at source when applicable\n• Periodic fiscal reports\n\n𝗙𝗶𝗻𝗲𝘀:\n• Registration and tracking of asset-related fines (traffic, municipal, environmental)\n• Flow: lessee notification → collection → payment tracking\n• Transfer to lessee or absorption per contractual configuration\n\n𝗖𝗹𝗮𝗶𝗺𝘀:\n• Claim registration (total loss, partial, damage)\n• Insurance claim flow\n• Financial impact calculation (outstanding balance vs. indemnity)\n• Early closure for total loss\n• Automatic event accounting",
    valor: "La gestión integrada de seguros, impuestos, multas y siniestros reduce el riesgo operativo y automatiza procesos que típicamente se manejan manualmente en hojas de cálculo.",
    valor_en: "Integrated management of insurance, taxes, fines, and claims reduces operational risk and automates processes typically handled manually in spreadsheets.",
    diagrams: [
      { type: "interactive-ops" as DiagramType },
    ],
    diagrams_en: [
      { type: "interactive-ops" as DiagramType },
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
    respuesta: "Sí, SYSDE PLUS cuenta con una arquitectura de integración robusta con +250 endpoints RESTful preconstruidos, integración por eventos (Kafka, RabbitMQ, Azure Service Bus) y herramientas completas para desarrolladores.",
    respuesta_en: "Yes, SYSDE PLUS features robust integration architecture with +250 pre-built RESTful endpoints, event-driven integration (Kafka, RabbitMQ, Azure Service Bus), and complete developer tools.",
    valor: "La capa de APIs y eventos permite integrar SYSDE PLUS con cualquier sistema del ecosistema tecnológico de BCP de forma estandarizada y segura.",
    valor_en: "The API and event layer enables integrating SYSDE PLUS with any system in BCP's technology ecosystem in a standardized and secure manner.",
    diagrams: [
      { type: "integration-orbit" as DiagramType },
    ],
    diagrams_en: [
      { type: "integration-orbit" as DiagramType },
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
    respuesta: "𝗥𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮: Sí, SYSDE PLUS cuenta con un core de APIs preconstruidas que permite interacción directa con la plataforma de leasing.\n\n𝗔𝗣𝗜𝘀 𝗱𝗲 𝗖𝗼𝗻𝘀𝘂𝗹𝘁𝗮 (𝗥𝗲𝗮𝗱):\n• Estado de operaciones por cliente\n• Plan de pagos, cuotas pendientes, saldos\n• Información del activo arrendado\n• Documentos asociados (contrato, pagaré, facturas)\n• Historial de pagos y movimientos\n\n𝗔𝗣𝗜𝘀 𝗱𝗲 𝗜𝗻𝗴𝗿𝗲𝘀𝗼 (𝗪𝗿𝗶𝘁𝗲):\n• Creación de solicitudes desde canales digitales\n• Carga de documentos del solicitante\n• Registro de pagos anticipados o abonos extraordinarios\n• Solicitud de simulaciones de leasing\n\n𝗔𝗣𝗜𝘀 𝗱𝗲 𝗙𝗹𝘂𝗷𝗼 (𝗪𝗼𝗿𝗸𝗳𝗹𝗼𝘄):\n• Inicio y avance de flujos de aprobación\n• Consulta de estado del flujo\n• Notificaciones y callbacks\n\n𝗛𝗲𝗿𝗿𝗮𝗺𝗶𝗲𝗻𝘁𝗮𝘀: Documentación OpenAPI/Swagger, sandbox de pruebas, SDKs de referencia y guías de integración.",
    respuesta_en: "𝗔𝗻𝘀𝘄𝗲𝗿: Yes, SYSDE PLUS has a pre-built API core enabling direct interaction with the leasing platform.\n\n𝗤𝘂𝗲𝗿𝘆 𝗔𝗣𝗜𝘀 (𝗥𝗲𝗮𝗱):\n• Operation status by client\n• Payment plans, pending installments, balances\n• Leased asset information\n• Associated documents (contract, promissory note, invoices)\n• Payment and movement history\n\n𝗜𝗻𝗽𝘂𝘁 𝗔𝗣𝗜𝘀 (𝗪𝗿𝗶𝘁𝗲):\n• Application creation from digital channels\n• Applicant document upload\n• Advance payment or extraordinary payment registration\n• Leasing simulation requests\n\n𝗪𝗼𝗿𝗸𝗳𝗹𝗼𝘄 𝗔𝗣𝗜𝘀:\n• Approval flow initiation and advancement\n• Flow status queries\n• Notifications and callbacks\n\n𝗧𝗼𝗼𝗹𝘀: OpenAPI/Swagger documentation, test sandbox, reference SDKs, and integration guides.",
    valor: "El core de APIs preconstruidas permite a BCP integrar el leasing en sus canales digitales (banca en línea, app móvil) de forma rápida y estandarizada, sin desarrollo desde cero.",
    valor_en: "The pre-built API core allows BCP to integrate leasing into its digital channels (online banking, mobile app) quickly and standardizedly, without building from scratch.",
    diagrams: [
      { type: "interactive-apis" as DiagramType },
    ],
    diagrams_en: [
      { type: "interactive-apis" as DiagramType },
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
    respuesta: "𝗠𝗼𝘁𝗼𝗿 𝗱𝗲 𝗥𝗲𝗽𝗼𝗿𝘁𝗲𝘀: SYSDE PLUS cuenta con un motor integrado que genera reportes regulatorios, contables y gerenciales de forma automática.\n\n𝗥𝗲𝗽𝗼𝗿𝘁𝗲𝘀 𝗥𝗲𝗴𝘂𝗹𝗮𝘁𝗼𝗿𝗶𝗼𝘀:\n• Generación automática para superintendencias (SBS, SUGEF, SIB, CNBS, SSF, CNBV)\n• Formatos parametrizables por regulador (XML, CSV, Excel, PDF)\n• Clasificación de cartera y provisiones conforme a normativa local\n• Concentración de riesgo y exposición crediticia\n\n𝗥𝗲𝗽𝗼𝗿𝘁𝗲𝘀 𝗖𝗼𝗻𝘁𝗮𝗯𝗹𝗲𝘀:\n• Asientos automáticos conforme a NIIF/IFRS 16\n• Balance de comprobación, P&L y flujo de caja por producto/segmento\n• Conciliación automática entre datos operativos y contables\n• Depreciación, amortización y reconocimiento de ingresos\n\n𝗥𝗲𝗽𝗼𝗿𝘁𝗲𝘀 𝗚𝗲𝗿𝗲𝗻𝗰𝗶𝗮𝗹𝗲𝘀:\n• Dashboards operativos con KPIs (cartera activa, mora, originación)\n• Generador de reportes ad-hoc parametrizable\n• Exportación en Excel, PDF, CSV con distribución automática por correo",
    respuesta_en: "𝗥𝗲𝗽𝗼𝗿𝘁 𝗘𝗻𝗴𝗶𝗻𝗲: SYSDE PLUS has an integrated engine automatically generating regulatory, accounting, and management reports.\n\n𝗥𝗲𝗴𝘂𝗹𝗮𝘁𝗼𝗿𝘆 𝗥𝗲𝗽𝗼𝗿𝘁𝘀:\n• Automatic generation for superintendencies (SBS, SUGEF, SIB, CNBS, SSF, CNBV)\n• Parameterizable formats per regulator (XML, CSV, Excel, PDF)\n• Portfolio classification and provisions per local regulations\n• Risk concentration and credit exposure\n\n𝗔𝗰𝗰𝗼𝘂𝗻𝘁𝗶𝗻𝗴 𝗥𝗲𝗽𝗼𝗿𝘁𝘀:\n• Automatic IFRS 16 entries\n• Trial balance, P&L, and cash flow by product/segment\n• Automatic reconciliation between operational and accounting data\n• Depreciation, amortization, and revenue recognition\n\n𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝗥𝗲𝗽𝗼𝗿𝘁𝘀:\n• Operational dashboards with KPIs (active portfolio, arrears, origination)\n• Parameterizable ad-hoc report builder\n• Export in Excel, PDF, CSV with automatic email distribution",
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
      {
        type: "table" as const,
        title: "Tipos de Reportes y Formatos",
        headers: ["Tipo", "Contenido", "Formatos", "Frecuencia"],
        rows: [
          ["Regulatorios", "Cartera, provisiones, riesgo", "XML, CSV, Excel, PDF", "Según regulador"],
          ["Contables", "Asientos IFRS 16, balance, P&L", "Excel, PDF", "Diario / Mensual"],
          ["Gerenciales", "KPIs, dashboards operativos", "Web, Excel, PDF", "Tiempo real / Ad-hoc"],
          ["Fiscales", "Facturación electrónica, retenciones", "XML, PDF", "Por transacción"],
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
      {
        type: "table" as const,
        title: "Report Types and Formats",
        headers: ["Type", "Content", "Formats", "Frequency"],
        rows: [
          ["Regulatory", "Portfolio, provisions, risk", "XML, CSV, Excel, PDF", "Per regulator"],
          ["Accounting", "IFRS 16 entries, balance, P&L", "Excel, PDF", "Daily / Monthly"],
          ["Management", "KPIs, operational dashboards", "Web, Excel, PDF", "Real-time / Ad-hoc"],
          ["Fiscal", "Electronic invoicing, withholdings", "XML, PDF", "Per transaction"],
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
    respuesta: "𝗔𝗿𝗾𝘂𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗮 𝗱𝗲 𝟯 𝗖𝗮𝗽𝗮𝘀: Sí, SYSDE PLUS implementa separación clara en tres capas independientes pero interconectadas.\n\n𝗖𝗮𝗽𝗮 𝗢𝗽𝗲𝗿𝗮𝘁𝗶𝘃𝗮:\n• Datos transaccionales del día a día (solicitudes, contratos, cuotas, pagos, activos)\n• Fuente primaria de verdad para operaciones de negocio\n• Optimizada para consultas de alta frecuencia y baja latencia\n\n𝗖𝗮𝗽𝗮 𝗖𝗼𝗻𝘁𝗮𝗯𝗹𝗲:\n• Asientos generados automáticamente desde eventos operativos\n• Libro mayor auxiliar conforme a NIIF/IFRS 16\n• Independiente de la capa operativa — datos no modificables directamente\n• Múltiples planes de cuentas y catálogos por jurisdicción\n\n𝗖𝗮𝗽𝗮 𝗥𝗲𝗴𝘂𝗹𝗮𝘁𝗼𝗿𝗶𝗮:\n• Datos transformados según formatos de cada ente regulador\n• Snapshots en fechas de corte para reportes regulatorios\n• Reconstrucción de reportes históricos sin depender de datos operativos actuales\n• Reglas de transformación distintas por jurisdicción\n\n𝗜𝗻𝘁𝗲𝗴𝗿𝗶𝗱𝗮𝗱: Un cambio operativo genera automáticamente el impacto contable y regulatorio, pero cada capa mantiene su integridad y es auditable independientemente.",
    respuesta_en: "𝟯-𝗟𝗮𝘆𝗲𝗿 𝗔𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲: Yes, SYSDE PLUS implements clear separation in three independent but interconnected layers.\n\n𝗢𝗽𝗲𝗿𝗮𝘁𝗶𝗼𝗻𝗮𝗹 𝗟𝗮𝘆𝗲𝗿:\n• Day-to-day transactional data (applications, contracts, installments, payments, assets)\n• Primary source of truth for business operations\n• Optimized for high-frequency, low-latency queries\n\n𝗔𝗰𝗰𝗼𝘂𝗻𝘁𝗶𝗻𝗴 𝗟𝗮𝘆𝗲𝗿:\n• Entries automatically generated from operational events\n• Subsidiary ledger per IFRS 16\n• Independent from operational layer — data not directly modifiable\n• Multiple charts of accounts and catalogs per jurisdiction\n\n𝗥𝗲𝗴𝘂𝗹𝗮𝘁𝗼𝗿𝘆 𝗟𝗮𝘆𝗲𝗿:\n• Data transformed per each regulator's formats\n• Snapshots at cut-off dates for regulatory reports\n• Historical report reconstruction without depending on current operational data\n• Distinct transformation rules per jurisdiction\n\n𝗜𝗻𝘁𝗲𝗴𝗿𝗶𝘁𝘆: An operational change automatically generates accounting and regulatory impact, but each layer maintains integrity and is independently auditable.",
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
      {
        type: "table" as const,
        title: "Comparativa de Capas de Datos",
        headers: ["Capa", "Contenido", "Acceso", "Auditoría"],
        rows: [
          ["Operativa", "Solicitudes, contratos, cuotas, pagos", "Lectura/Escritura", "Audit trail completo"],
          ["Contable", "Asientos NIIF/IFRS 16, libro mayor", "Solo lectura (generación automática)", "Inmutable"],
          ["Regulatoria", "Snapshots, reportes por regulador", "Solo lectura (generación en corte)", "Reconstruible históricamente"],
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
      {
        type: "table" as const,
        title: "Data Layer Comparison",
        headers: ["Layer", "Content", "Access", "Audit"],
        rows: [
          ["Operational", "Applications, contracts, installments, payments", "Read/Write", "Complete audit trail"],
          ["Accounting", "IFRS 16 entries, general ledger", "Read-only (auto-generated)", "Immutable"],
          ["Regulatory", "Snapshots, reports per regulator", "Read-only (cut-off generated)", "Historically reconstructible"],
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
    respuesta: "𝗥𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮: Sí, SYSDE PLUS ofrece alto nivel de parametrización sin necesidad de desarrollo.\n\n𝗣𝗮𝗿á𝗺𝗲𝘁𝗿𝗼𝘀 𝗖𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝗯𝗹𝗲𝘀:\n• 𝗧𝗶𝗽𝗼𝘀 𝗱𝗲 𝗹𝗲𝗮𝘀𝗶𝗻𝗴: Financiero, operativo, leaseback, lease-to-own con reglas diferenciadas\n• 𝗔𝗰𝘁𝗶𝘃𝗼𝘀: Categorías (vehículos, equipos, inmuebles, maquinaria) con campos específicos\n• 𝗣𝗹𝗮𝘇𝗼𝘀 𝘆 𝘁𝗮𝘀𝗮𝘀: Rangos mín/máx, fija/variable/mixta, topes configurables\n• 𝗣𝗲𝗿𝗶𝗼𝗱𝗶𝗰𝗶𝗱𝗮𝗱: Mensual, trimestral, semestral, anual, irregular\n• 𝗠𝗼𝗻𝗲𝗱𝗮𝘀: Multi-moneda con tipos de cambio configurables\n• 𝗙𝗹𝘂𝗷𝗼𝘀 𝗱𝗲 𝗮𝗽𝗿𝗼𝗯𝗮𝗰𝗶ó𝗻: Niveles, montos, roles, comités, matrices de escalamiento\n• 𝗗𝗼𝗰𝘂𝗺𝗲𝗻𝘁𝗼𝘀: Lista requerida por tipo de cliente y monto\n• 𝗥𝗲𝗴𝗹𝗮𝘀 𝗱𝗲 𝗻𝗲𝗴𝗼𝗰𝗶𝗼: Validaciones y restricciones por producto, segmento y jurisdicción\n\n𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗰𝗶ó𝗻: Toda la parametrización se realiza desde un módulo de administración con interfaz gráfica, sin intervención del equipo de desarrollo.",
    respuesta_en: "𝗔𝗻𝘀𝘄𝗲𝗿: Yes, SYSDE PLUS offers extensive parameterization without development.\n\n𝗖𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝗯𝗹𝗲 𝗣𝗮𝗿𝗮𝗺𝗲𝘁𝗲𝗿𝘀:\n• 𝗟𝗲𝗮𝘀𝗶𝗻𝗴 𝘁𝘆𝗽𝗲𝘀: Financial, operating, leaseback, lease-to-own with differentiated rules\n• 𝗔𝘀𝘀𝗲𝘁𝘀: Categories (vehicles, equipment, real estate, machinery) with specific fields\n• 𝗧𝗲𝗿𝗺𝘀 & 𝗿𝗮𝘁𝗲𝘀: Min/max ranges, fixed/variable/mixed, configurable caps\n• 𝗙𝗿𝗲𝗾𝘂𝗲𝗻𝗰𝘆: Monthly, quarterly, semi-annual, annual, irregular\n• 𝗖𝘂𝗿𝗿𝗲𝗻𝗰𝗶𝗲𝘀: Multi-currency with configurable exchange rates\n• 𝗔𝗽𝗽𝗿𝗼𝘃𝗮𝗹 𝗳𝗹𝗼𝘄𝘀: Levels, amounts, roles, committees, escalation matrices\n• 𝗗𝗼𝗰𝘂𝗺𝗲𝗻𝘁𝘀: Required list per client type and amount\n• 𝗕𝘂𝘀𝗶𝗻𝗲𝘀𝘀 𝗿𝘂𝗹𝗲𝘀: Validations and restrictions per product, segment, and jurisdiction\n\n𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝘁𝗶𝗼𝗻: All parameterization done through an admin module with graphical interface, no development team intervention.",
    valor: "La parametrización sin código permite a BCP adaptar los flujos de leasing a sus políticas internas y regulatorias sin depender de desarrollos externos, acelerando el time-to-market.",
    valor_en: "No-code parameterization allows BCP to adapt leasing flows to its internal and regulatory policies without external development, accelerating time-to-market.",
    diagrams: [
      {
        type: "table" as const,
        title: "Parámetros Configurables",
        headers: ["Categoría", "Parámetros", "Método de Configuración"],
        rows: [
          ["Productos", "Tipos de leasing, reglas diferenciadas", "Interfaz de administración"],
          ["Activos", "Categorías, campos específicos, valuación", "Catálogos configurables"],
          ["Financiero", "Tasas, plazos, periodicidad, monedas", "Parametrización sin código"],
          ["Flujos", "Aprobación, escalamiento, comités, roles", "Diseñador visual de flujos"],
          ["Documentos", "Requisitos por tipo de cliente y monto", "Listas parametrizables"],
          ["Reglas", "Validaciones, restricciones, fórmulas", "Motor de reglas configurable"],
        ],
      },
      {
        type: "grid" as const,
        title: "Ventajas de Parametrización Sin Código",
        items: [
          "Tipos de leasing y activos configurables",
          "Plazos, tasas y periodicidad ajustables",
          "Multi-moneda con tipos de cambio",
          "Flujos de aprobación y escalamiento",
          "Documentos requeridos por segmento",
          "Reglas de negocio personalizables",
        ],
      },
    ],
    diagrams_en: [
      {
        type: "table" as const,
        title: "Configurable Parameters",
        headers: ["Category", "Parameters", "Configuration Method"],
        rows: [
          ["Products", "Leasing types, differentiated rules", "Admin interface"],
          ["Assets", "Categories, specific fields, valuation", "Configurable catalogs"],
          ["Financial", "Rates, terms, frequency, currencies", "No-code parameterization"],
          ["Workflows", "Approval, escalation, committees, roles", "Visual flow designer"],
          ["Documents", "Requirements per client type and amount", "Parameterizable lists"],
          ["Rules", "Validations, restrictions, formulas", "Configurable rule engine"],
        ],
      },
      {
        type: "grid" as const,
        title: "No-Code Parameterization Benefits",
        items: [
          "Configurable leasing and asset types",
          "Adjustable terms, rates, and frequency",
          "Multi-currency with exchange rates",
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
    respuesta: "𝗣𝗿𝗼𝗽𝗼𝗿𝗰𝗶ó𝗻: ~85% sin código / ~15% con desarrollo. SYSDE PLUS maximiza la configuración sin código.\n\n𝗦𝗶𝗻 𝗗𝗲𝘀𝗮𝗿𝗿𝗼𝗹𝗹𝗼 (𝗽𝗮𝗿𝗮𝗺𝗲𝘁𝗿𝗶𝘇𝗮𝗰𝗶ó𝗻 𝗽𝗼𝗿 𝗲𝗹 𝗯𝗮𝗻𝗰𝗼):\n• Productos de leasing (tipos, condiciones, tasas, plazos, comisiones)\n• Flujos de aprobación (niveles, montos, roles, comités)\n• Catálogos (activos, proveedores, aseguradoras, monedas)\n• Reglas de negocio (validaciones, restricciones, fórmulas)\n• Plantillas documentales (contratos, pagarés, cartas)\n• Reportes operativos ad-hoc\n• Usuarios y perfiles (roles, permisos, segregación)\n• Parámetros contables (planes de cuentas, reglas de reconocimiento)\n\n𝗖𝗼𝗻 𝗗𝗲𝘀𝗮𝗿𝗿𝗼𝗹𝗹𝗼 (𝗲𝗾𝘂𝗶𝗽𝗼 𝗦𝗬𝗦𝗗𝗘):\n• Integraciones con sistemas no contemplados en conectores estándar\n• Reportes regulatorios para nuevas jurisdicciones\n• Modificaciones al motor de cálculo financiero (fórmulas no estándar)\n• Componentes de UI completamente nuevos\n• Lógica de negocio altamente especializada",
    respuesta_en: "𝗣𝗿𝗼𝗽𝗼𝗿𝘁𝗶𝗼𝗻: ~85% no-code / ~15% development. SYSDE PLUS maximizes no-code configuration.\n\n𝗡𝗼-𝗖𝗼𝗱𝗲 (𝗯𝗮𝗻𝗸 𝗽𝗮𝗿𝗮𝗺𝗲𝘁𝗲𝗿𝗶𝘇𝗮𝘁𝗶𝗼𝗻):\n• Leasing products (types, conditions, rates, terms, fees)\n• Approval flows (levels, amounts, roles, committees)\n• Catalogs (assets, vendors, insurers, currencies)\n• Business rules (validations, restrictions, formulas)\n• Document templates (contracts, promissory notes, letters)\n• Ad-hoc operational reports\n• User profiles (roles, permissions, segregation)\n• Accounting parameters (charts of accounts, recognition rules)\n\n𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁 (𝗦𝗬𝗦𝗗𝗘 𝘁𝗲𝗮𝗺):\n• Integrations with non-standard connector systems\n• Regulatory reports for new jurisdictions\n• Financial calculation engine modifications (non-standard formulas)\n• Completely new UI components\n• Highly specialized business logic",
    valor: "El 85% de configuración sin código permite a BCP ser autónomo en la adaptación de la plataforma, con soporte de SYSDE únicamente para personalizaciones complejas.",
    valor_en: "85% no-code configuration allows BCP to be autonomous in platform adaptation, with SYSDE support only for complex customizations.",
    diagrams: [
      {
        type: "table" as const,
        title: "Sin Desarrollo vs. Con Desarrollo",
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
        title: "No-Code vs. Development",
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
    subtitle: "Capacidad de procesamiento comprobada",
    subtitle_en: "Proven processing capacity",
    requerimiento: "¿Volumen máximo de operaciones soportadas actualmente?",
    requerimiento_en: "What is the maximum volume of operations currently supported?",
    respuesta: "La arquitectura de SYSDE PLUS está diseñada para escalar horizontalmente mediante microservicios sobre Azure. El dimensionamiento de infraestructura se revisa anualmente para cada cliente, garantizando que la capacidad esté siempre por delante de la demanda.\n\nReferencias comprobables de volumen en producción:\n• CCSS Costa Rica — Fondo de pensiones más grande de Centroamérica, +65,000 usuarios internos, millones de registros de afiliados procesados mensualmente\n• IVM / RIVM — Régimen de pensiones con más de 3 millones de afiliados activos\n• CMI (15 países) — +54,000 colaboradores, operaciones multi-país y multi-moneda simultáneas\n\nEstos volúmenes superan ampliamente lo requerido para una operación de leasing bancario. La misma arquitectura que soporta estos clientes es la base de SYSDE PLUS Leasing.",
    respuesta_en: "SYSDE PLUS architecture is designed for horizontal scaling through microservices on Azure. Infrastructure dimensioning is reviewed annually for each client, ensuring capacity stays ahead of demand.\n\nVerifiable production volume references:\n• CCSS Costa Rica — Largest pension fund in Central America, +65,000 internal users, millions of affiliate records processed monthly\n• IVM / RIVM — Pension regime with over 3 million active affiliates\n• CMI (15 countries) — +54,000 employees, simultaneous multi-country multi-currency operations\n\nThese volumes far exceed what is required for a bank leasing operation. The same architecture supporting these clients is the foundation of SYSDE PLUS Leasing.",
    valor: "La capacidad de escala está respaldada por clientes en producción con volúmenes verificables que superan los requerimientos de leasing bancario.",
    valor_en: "Scale capacity is backed by production clients with verifiable volumes exceeding bank leasing requirements.",
    diagrams: [],
    diagrams_en: [],
  },

  // ── Gobernanza (L) ──
  {
    id: 22,
    title: "Roadmap de Leasing a 3 Años",
    title_en: "3-Year Leasing Roadmap",
    status: "answered",
    section: "L",
    receivedDate: "20 marzo 2026",
    subtitle: "Modelo evolutivo acordado con BCP",
    subtitle_en: "Evolution model agreed with BCP",
    requerimiento: "¿Cuál es el roadmap de leasing a 3 años?",
    requerimiento_en: "What is the 3-year leasing roadmap?",
    respuesta: "SYSDE PLUS opera bajo un modelo evolutivo acordado de mutuo acuerdo con cada cliente. Para BCP, esto implica un roadmap exclusivo donde las mejoras, ajustes regulatorios y nuevas funcionalidades se definen en conjunto y se incorporan a la plataforma sin costo adicional — está incluido en la suscripción.\n\nCada mejora se implementa sin afectar la operación en producción, siguiendo prácticas de despliegue controlado.",
    respuesta_en: "SYSDE PLUS operates under an evolution model agreed upon mutually with each client. For BCP, this means an exclusive roadmap where improvements, regulatory adjustments and new functionalities are jointly defined and incorporated into the platform at no additional cost — it is included in the subscription.\n\nEach improvement is implemented without affecting production operations, following controlled deployment practices.",
    diagrams: [],
    diagrams_en: [],
    valor: "BCP contará con un roadmap evolutivo exclusivo, definido de mutuo acuerdo, incluido en la suscripción sin costos adicionales. Esto garantiza que la plataforma evolucione de forma continua según las necesidades específicas de la operación.",
    valor_en: "BCP will have an exclusive evolution roadmap, mutually agreed, included in the subscription at no additional cost. This ensures the platform evolves continuously based on specific operational needs.",
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
    respuesta: "SYSDE PLUS cubre la totalidad de los procesos requeridos para operar leasing bancario al nivel de BCP. La plataforma gestiona el ciclo end-to-end completo con la robustez que exige una entidad regulada.\n\nSYSDE mantiene un modelo evolutivo continuo — cada cliente cuenta con un roadmap exclusivo, acordado de mutuo acuerdo, donde mejoras y nuevas funcionalidades se incorporan de forma planificada y sin costo adicional. Esto incluye evolución en áreas como apoyo de IA, automatización de procesos, cumplimiento regulatorio y reportería avanzada.\n\nTodas las mejoras se implementan sin afectar la operación normal del sistema.",
    respuesta_en: "SYSDE PLUS covers all processes required to operate bank leasing at BCP's level. The platform manages the complete end-to-end cycle with the robustness demanded by a regulated entity.\n\nSYSDE maintains a continuous evolution model — each client has an exclusive roadmap, mutually agreed, where improvements and new functionalities are incorporated in a planned manner at no additional cost. This includes evolution in areas such as AI support, process automation, regulatory compliance and advanced reporting.\n\nAll improvements are implemented without affecting normal system operations.",
    valor: "La transparencia sobre el modelo evolutivo, combinada con un roadmap exclusivo sin costos adicionales, refleja el compromiso de SYSDE con la evolución continua de la plataforma.",
    valor_en: "Transparency about the evolution model, combined with an exclusive roadmap at no additional cost, reflects SYSDE's commitment to continuous platform evolution.",
    diagrams: [
      { type: "interactive-roadmap" as DiagramType },
    ],
    diagrams_en: [
      { type: "interactive-roadmap" as DiagramType },
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
    respuesta: "𝗣𝗿𝗲𝘀𝗲𝗻𝗰𝗶𝗮 𝗚𝗹𝗼𝗯𝗮𝗹: Sí. SYSDE International tiene presencia en todo Latinoamérica, África, Europa y Asia, con más de 1,000 instituciones financieras operando con nuestra tecnología.\n\n𝗢𝗳𝗶𝗰𝗶𝗻𝗮𝘀 𝘆 𝗘𝗾𝘂𝗶𝗽𝗼𝘀:\n• 🇨🇷 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮 (sede central): Desarrollo, arquitectura, producto, soporte 1er y 2do nivel\n• 🇬🇹 𝗚𝘂𝗮𝘁𝗲𝗺𝗮𝗹𝗮: Presencia operativa para Centroamérica norte (incluye CMI)\n• 🇲🇽 𝗠é𝘅𝗶𝗰𝗼: Equipo local para clientes como GNP y Bankaool\n• 🇵🇪 𝗣𝗲𝗿ú: Fábrica de software y equipo de soporte dedicado — capacidad de asignar equipo completo para BCP\n\n𝗠𝗼𝗱𝗲𝗹𝗼 𝗱𝗲 𝗦𝗼𝗽𝗼𝗿𝘁𝗲:\n• Soporte 24/7 para incidentes críticos (Severidad 1) con SLA\n• Mesa de ayuda en español con conocimiento regulatorio por jurisdicción\n• Equipo de implementación dedicado: PM, consultores funcionales, arquitecto, integradores\n• Acompañamiento post-implementación (on-site o remoto)\n\n𝗣𝗮𝗿𝗮 𝗕𝗖𝗣: Equipo dedicado con presencia en Perú (fábrica de software + soporte local) durante toda la implementación, con transición a soporte remoto + visitas periódicas una vez estabilizada la operación.",
    respuesta_en: "𝗚𝗹𝗼𝗯𝗮𝗹 𝗣𝗿𝗲𝘀𝗲𝗻𝗰𝗲: Yes. SYSDE International has presence across all of Latin America, Africa, Europe and Asia, with over 1,000 financial institutions operating with our technology.\n\n𝗢𝗳𝗳𝗶𝗰𝗲𝘀 & 𝗧𝗲𝗮𝗺𝘀:\n• 🇨🇷 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮 (HQ): Development, architecture, product, L1/L2 support\n• 🇬🇹 𝗚𝘂𝗮𝘁𝗲𝗺𝗮𝗹𝗮: Operational presence for northern Central America (includes CMI)\n• 🇲🇽 𝗠𝗲𝘅𝗶𝗰𝗼: Local team for clients like GNP and Bankaool\n• 🇵🇪 𝗣𝗲𝗿𝘂: Software factory and dedicated support team — capacity to assign full team for BCP\n\n𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗠𝗼𝗱𝗲𝗹:\n• 24/7 support for critical incidents (Severity 1) with SLA\n• Spanish-language help desk with regulatory knowledge per jurisdiction\n• Dedicated implementation team: PM, functional consultants, architect, integrators\n• Post-implementation accompaniment (on-site or remote)\n\n𝗙𝗼𝗿 𝗕𝗖𝗣: Dedicated team with presence in Peru (software factory + local support) throughout implementation, transitioning to remote support + periodic visits once operations stabilize.",
    diagrams: [
      {
        type: "grid" as const,
        title: "Presencia Global de SYSDE",
        items: [
          "🌎 Latinoamérica — Presencia en toda la región",
          "🌍 África — Instituciones financieras activas",
          "🌍 Europa — Operaciones y clientes",
          "🌏 Asia — Presencia y expansión",
          "🇵🇪 Perú — Fábrica de software + soporte dedicado",
          "🇨🇷 Costa Rica — Sede central, desarrollo y arquitectura",
        ],
      },
      {
        type: "table" as const,
        title: "Equipo de Implementación para BCP",
        headers: ["Rol", "Responsabilidad", "Ubicación"],
        rows: [
          ["Gerente de Proyecto", "Coordinación y planificación", "Perú (on-site)"],
          ["Consultores Funcionales", "Análisis y configuración", "Perú (on-site)"],
          ["Fábrica de Software", "Desarrollo y personalización", "Perú"],
          ["Arquitecto de Solución", "Diseño técnico e integraciones", "Perú / Remoto"],
          ["Equipo de Soporte", "Soporte dedicado 24/7", "Perú"],
          ["Desarrolladores de Integración", "APIs, conectores, customización", "Costa Rica / Remoto"],
        ],
      },
    ],
    diagrams_en: [
      {
        type: "grid" as const,
        title: "SYSDE Global Presence",
        items: [
          "🌎 Latin America — Presence across the entire region",
          "🌍 Africa — Active financial institutions",
          "🌍 Europe — Operations and clients",
          "🌏 Asia — Presence and expansion",
          "🇵🇪 Peru — Software factory + dedicated support",
          "🇨🇷 Costa Rica — Headquarters, development and architecture",
        ],
      },
      {
        type: "table" as const,
        title: "Implementation Team for BCP",
        headers: ["Role", "Responsibility", "Location"],
        rows: [
          ["Project Manager", "Coordination and planning", "Peru (on-site)"],
          ["Functional Consultants", "Analysis and configuration", "Peru (on-site)"],
          ["Software Factory", "Development and customization", "Peru"],
          ["Solution Architect", "Technical design and integrations", "Peru / Remote"],
          ["Support Team", "Dedicated 24/7 support", "Peru"],
          ["Integration Developers", "APIs, connectors, customization", "Costa Rica / Remote"],
        ],
      },
    ],
    valor: "SYSDE ofrece presencia global con fábrica de software y equipo de soporte dedicado en Perú, eliminando riesgos de soporte remoto sin contexto local.",
    valor_en: "SYSDE offers global presence with a software factory and dedicated support team in Peru, eliminating risks of remote support without local context.",
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
    respuesta: "𝗥𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮: Sí, SYSDE PLUS soporta la emisión de trazas hacia colectores externos compatibles con OpenTelemetry (OTLP).\n\n𝗖𝗮𝗽𝗮𝗰𝗶𝗱𝗮𝗱𝗲𝘀 𝗱𝗲 𝗢𝗯𝘀𝗲𝗿𝘃𝗮𝗯𝗶𝗹𝗶𝗱𝗮𝗱:\n• 𝗘𝘅𝗽𝗼𝗿𝘁𝗮𝗰𝗶ó𝗻 𝗻𝗮𝘁𝗶𝘃𝗮: Trazas, métricas y logs hacia cualquier colector OTLP (Jaeger, Zipkin, Grafana Tempo, Datadog, New Relic, Dynatrace)\n• 𝗜𝗻𝘀𝘁𝗿𝘂𝗺𝗲𝗻𝘁𝗮𝗰𝗶ó𝗻 𝗮𝘂𝘁𝗼𝗺á𝘁𝗶𝗰𝗮: Flujos transaccionales clave (originación, desembolso, facturación, cobro) con visibilidad E2E\n• 𝗣𝗿𝗼𝗽𝗮𝗴𝗮𝗰𝗶ó𝗻 𝗱𝗲 𝗰𝗼𝗻𝘁𝗲𝘅𝘁𝗼: W3C Trace Context para correlacionar trazas entre SYSDE PLUS y sistemas del banco\n• 𝗦𝗮𝗺𝗽𝗹𝗶𝗻𝗴 𝗰𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝗯𝗹𝗲: Balance entre visibilidad y rendimiento según necesidades\n\n𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝗱𝗮𝗱: También compatible con Prometheus (métricas), ELK/Grafana Loki (logs), permitiendo integración al stack de observabilidad existente del banco sin herramientas propietarias.",
    respuesta_en: "𝗔𝗻𝘀𝘄𝗲𝗿: Yes, SYSDE PLUS supports trace emission to external OpenTelemetry (OTLP) compatible collectors.\n\n𝗢𝗯𝘀𝗲𝗿𝘃𝗮𝗯𝗶𝗹𝗶𝘁𝘆 𝗖𝗮𝗽𝗮𝗯𝗶𝗹𝗶𝘁𝗶𝗲𝘀:\n• 𝗡𝗮𝘁𝗶𝘃𝗲 𝗲𝘅𝗽𝗼𝗿𝘁: Traces, metrics, and logs to any OTLP collector (Jaeger, Zipkin, Grafana Tempo, Datadog, New Relic, Dynatrace)\n• 𝗔𝘂𝘁𝗼𝗺𝗮𝘁𝗶𝗰 𝗶𝗻𝘀𝘁𝗿𝘂𝗺𝗲𝗻𝘁𝗮𝘁𝗶𝗼𝗻: Key transactional flows (origination, disbursement, billing, collection) with E2E visibility\n• 𝗖𝗼𝗻𝘁𝗲𝘅𝘁 𝗽𝗿𝗼𝗽𝗮𝗴𝗮𝘁𝗶𝗼𝗻: W3C Trace Context for cross-system trace correlation\n• 𝗖𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝗯𝗹𝗲 𝘀𝗮𝗺𝗽𝗹𝗶𝗻𝗴: Balance between visibility and performance\n\n𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝘁𝘆: Also compatible with Prometheus (metrics), ELK/Grafana Loki (logs), enabling integration into the bank's existing observability stack without proprietary tools.",
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
    respuesta: "𝗚𝗲𝘀𝘁𝗶ó𝗻 𝗱𝗲 𝗗𝗮𝘁𝗼𝘀 𝗦𝗲𝗻𝘀𝗶𝗯𝗹𝗲𝘀:\n• 𝗖𝗶𝗳𝗿𝗮𝗱𝗼: AES-256 en reposo + TLS 1.2/1.3 en tránsito\n• 𝗘𝗻𝗺𝗮𝘀𝗰𝗮𝗿𝗮𝗺𝗶𝗲𝗻𝘁𝗼: Datos PII/PCI ocultos en UI y logs, acceso por roles\n• 𝗧𝗼𝗸𝗲𝗻𝗶𝘇𝗮𝗰𝗶ó𝗻: Datos financieros críticos (números de cuenta)\n• 𝗦𝗲𝗴𝗿𝗲𝗴𝗮𝗰𝗶ó𝗻: Aislamiento lógico o físico por cliente/tenant\n• 𝗖𝗶𝗰𝗹𝗼 𝗱𝗲 𝘃𝗶𝗱𝗮: Políticas de retención, purga y archivado conforme a regulaciones\n\n𝗔𝘂𝗱𝗶𝘁𝗼𝗿í𝗮:\n• Audit trail inmutable de todas las acciones (creación, modificación, eliminación, consulta)\n• Cada registro: usuario, fecha/hora, IP, acción, datos antes/después\n• Reportes parametrizables por período, usuario, tipo de operación\n• Integración con SIEM del banco\n\n𝗖𝗲𝗿𝘁𝗶𝗳𝗶𝗰𝗮𝗰𝗶𝗼𝗻𝗲𝘀 𝗜𝗦𝗢:\n• 𝗜𝗦𝗢 𝟵𝟬𝟬𝟭:𝟮𝟬𝟭𝟱 — Gestión de Calidad (procesos de desarrollo, implementación y soporte)\n• 𝗜𝗦𝗢 𝟮𝟳𝟬𝟬𝟭:𝟮𝟬𝟭𝟯 — Seguridad de la Información (controles de seguridad)\n• Auditadas periódicamente por organismos certificadores independientes",
    respuesta_en: "𝗦𝗲𝗻𝘀𝗶𝘁𝗶𝘃𝗲 𝗗𝗮𝘁𝗮 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁:\n• 𝗘𝗻𝗰𝗿𝘆𝗽𝘁𝗶𝗼𝗻: AES-256 at rest + TLS 1.2/1.3 in transit\n• 𝗠𝗮𝘀𝗸𝗶𝗻𝗴: PII/PCI data hidden in UI and logs, role-based access\n• 𝗧𝗼𝗸𝗲𝗻𝗶𝘇𝗮𝘁𝗶𝗼𝗻: Critical financial data (account numbers)\n• 𝗦𝗲𝗴𝗿𝗲𝗴𝗮𝘁𝗶𝗼𝗻: Logical or physical isolation per client/tenant\n• 𝗟𝗶𝗳𝗲𝗰𝘆𝗰𝗹𝗲: Retention, purge, and archival policies per regulations\n\n𝗔𝘂𝗱𝗶𝘁:\n• Immutable audit trail of all actions (creation, modification, deletion, query)\n• Each record: user, timestamp, IP, action, before/after data\n• Parameterizable reports by period, user, operation type\n• Bank SIEM integration\n\n𝗜𝗦𝗢 𝗖𝗲𝗿𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻𝘀:\n• 𝗜𝗦𝗢 𝟵𝟬𝟬𝟭:𝟮𝟬𝟭𝟱 — Quality Management (development, implementation, support processes)\n• 𝗜𝗦𝗢 𝟮𝟳𝟬𝟬𝟭:𝟮𝟬𝟭𝟯 — Information Security (security controls)\n• Periodically audited by independent certification bodies",
    valor: "Las certificaciones ISO 9001 y 27001, junto con los controles de seguridad implementados, garantizan a BCP que SYSDE cumple con estándares internacionales de calidad y seguridad de la información.",
    valor_en: "ISO 9001 and 27001 certifications, along with implemented security controls, assure BCP that SYSDE meets international quality and information security standards.",
    diagrams: [
      { type: "interactive-security" as DiagramType },
    ],
    diagrams_en: [
      { type: "interactive-security" as DiagramType },
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
    respuesta: "𝗥𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮: Sí, SYSDE cuenta con experiencia real en integraciones con entidades gubernamentales y tributarias.\n\n𝗜𝗻𝘁𝗲𝗴𝗿𝗮𝗰𝗶𝗼𝗻𝗲𝘀 𝗔𝗰𝘁𝗶𝘃𝗮𝘀:\n• 𝗦𝗔𝗧 𝗚𝘂𝗮𝘁𝗲𝗺𝗮𝗹𝗮: Facturación electrónica (FEL) vía API/Web Service, en tiempo real por cada factura emitida\n• 𝗠𝘂𝗻𝗶𝗰𝗶𝗽𝗮𝗹𝗶𝗱𝗮𝗱𝗲𝘀 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮: Consulta de bienes inmuebles y vehículos vía batch, periodicidad configurable\n• 𝗥𝗲𝗴𝗶𝘀𝘁𝗿𝗼 𝗡𝗮𝗰𝗶𝗼𝗻𝗮𝗹 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮: Estado registral de bienes vía API/Web Service, bajo demanda\n• 𝗗𝗶𝗿𝗲𝗰𝗰𝗶ó𝗻 𝗱𝗲 𝗧𝗿𝗶𝗯𝘂𝘁𝗮𝗰𝗶ó𝗻 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮: Facturación electrónica vía API, en tiempo real\n\n𝗣𝗮𝗿𝗮 𝗕𝗖𝗣 𝗲𝗻 𝗣𝗲𝗿ú: Las integraciones con SUNAT (facturación electrónica), SUNARP (registro de bienes), municipalidades (papeletas vehiculares) y otras entidades gubernamentales se implementarían durante la fase de proyecto utilizando la capa de integración estándar de SYSDE PLUS. La experiencia previa reduce significativamente el riesgo y tiempo de implementación.",
    respuesta_en: "𝗔𝗻𝘀𝘄𝗲𝗿: Yes, SYSDE has real experience with government/tax entity integrations.\n\n𝗔𝗰𝘁𝗶𝘃𝗲 𝗜𝗻𝘁𝗲𝗴𝗿𝗮𝘁𝗶𝗼𝗻𝘀:\n• 𝗦𝗔𝗧 𝗚𝘂𝗮𝘁𝗲𝗺𝗮𝗹𝗮: Electronic invoicing (FEL) via API/Web Service, real-time per issued invoice\n• 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮 𝗠𝘂𝗻𝗶𝗰𝗶𝗽𝗮𝗹𝗶𝘁𝗶𝗲𝘀: Property and vehicle queries via batch, configurable frequency\n• 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮 𝗡𝗮𝘁𝗶𝗼𝗻𝗮𝗹 𝗥𝗲𝗴𝗶𝘀𝘁𝗿𝘆: Property status via API/Web Service, on-demand\n• 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮 𝗧𝗮𝘅 𝗔𝘂𝘁𝗵𝗼𝗿𝗶𝘁𝘆: Electronic invoicing via API, real-time\n\n𝗙𝗼𝗿 𝗕𝗖𝗣 𝗶𝗻 𝗣𝗲𝗿𝘂: Integrations with SUNAT (e-invoicing), SUNARP (property registry), municipalities (vehicle tickets), and other government entities would be implemented during the project phase using SYSDE PLUS's standard integration layer. Prior experience significantly reduces implementation risk and time.",
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
          ["Registro Nacional — Propiedad", "Costa Rica", "API / Web Service", "Bajo demanda"],
          ["Tributación — Facturación", "Costa Rica", "API", "Tiempo real"],
          ["Poder Judicial", "Costa Rica", "API / Web Service", "Bajo demanda"],
        ],
      },
      {
        type: "table" as const,
        title: "Integraciones Proyectadas para BCP (Perú)",
        headers: ["Entidad", "Funcionalidad", "Modalidad Propuesta", "Riesgo"],
        rows: [
          ["SUNAT", "Facturación electrónica", "API", "Bajo (experiencia con SAT Guatemala)"],
          ["SUNARP", "Registro de bienes y gravámenes", "API / Web Service", "Bajo (experiencia con Registro Nacional CR)"],
          ["Municipalidades", "Consulta de papeletas vehiculares", "API / Batch", "Bajo (experiencia con municipalidades CR)"],
          ["Poder Judicial", "Consulta de procesos y embargos", "API / Web Service", "Bajo (experiencia con Poder Judicial CR)"],
          ["SBS", "Reportes regulatorios", "Batch / API", "Medio (configuración nueva jurisdicción)"],
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
          ["National Registry — Property", "Costa Rica", "API / Web Service", "On-demand"],
          ["Tax Authority — Invoicing", "Costa Rica", "API", "Real-time"],
          ["Judicial Branch", "Costa Rica", "API / Web Service", "On-demand"],
        ],
      },
      {
        type: "table" as const,
        title: "Projected Integrations for BCP (Peru)",
        headers: ["Entity", "Functionality", "Proposed Modality", "Risk"],
        rows: [
          ["SUNAT", "Electronic invoicing", "API", "Low (experience with SAT Guatemala)"],
          ["SUNARP", "Property and lien registry", "API / Web Service", "Low (experience with CR National Registry)"],
          ["Municipalities", "Vehicle ticket queries", "API / Batch", "Low (experience with CR municipalities)"],
          ["Judicial Branch", "Process and lien queries", "API / Web Service", "Low (experience with CR Judicial Branch)"],
          ["SBS", "Regulatory reports", "Batch / API", "Medium (new jurisdiction config)"],
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
