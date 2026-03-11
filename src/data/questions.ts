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
    respuesta: "SYSDE cuenta con un portafolio activo de implementaciones en instituciones financieras de relevancia en América Latina, incluyendo organizaciones con niveles significativos de complejidad operativa y requerimientos multi-país.\n\nDesde el año 2022 a la fecha, SYSDE International ha realizado 23 implementaciones exitosas de sus soluciones en el sector financiero, lo que evidencia la solidez de su metodología de implementación, así como la madurez tecnológica de sus plataformas.\n\nEn el ámbito específico de leasing, la implementación más reciente corresponde a Corporación Multi Inversiones (CMI), uno de los conglomerados empresariales privados más grandes de Centroamérica, con más de 54,000 colaboradores y operaciones en 15 países, incluyendo Guatemala, Costa Rica, El Salvador, Honduras, Nicaragua, República Dominicana, México y Estados Unidos.\n\nA finales de 2025, SYSDE inició la implementación de SAF+ para las operaciones de Factoring y Leasing de Grupo CMI, proyecto que actualmente se encuentra en fase de implementación. Este proceso contempla la estandarización de procesos multi-país y multi-moneda bajo un modelo modular, permitiendo centralizar y optimizar la gestión de ambas líneas de negocio. La plataforma maneja y controla el ciclo end-to-end de Factoring y Leasing, cubriendo desde la originación y estructuración de operaciones hasta la administración operativa y contable.\n\nAdicionalmente, a través del core de APIs de SYSDE, se realizará la integración con cuatro instancias de SAP Business One, permitiendo la interoperabilidad con los sistemas corporativos del grupo y asegurando la continuidad operativa dentro de su ecosistema tecnológico.\n\nCabe destacar que el core de leasing de SYSDE cuenta con más de 30 años de presencia en el mercado, con evolución continua y adopción por parte de múltiples instituciones financieras en Latinoamérica, respaldando su capacidad para soportar operaciones complejas y de alto volumen dentro del sector.\n\nComo parte del proceso de evaluación y en caso de que BCP lo considere de valor, SYSDE puede coordinar una sesión de referencia con el equipo de CMI, en la cual puedan compartir directamente su experiencia en el proceso de implementación, el enfoque adoptado para la estandarización multi-país y los beneficios esperados de la plataforma.",
    respuesta_en: "We have an active portfolio of well-established clients in the region. Specifically in Leasing, we are currently in the implementation process with CMI (Grupo Multi Inversiones), one of the most important financial corporations in Central America, covering functional design and platform parameterization. Additionally, we have active implementations at Banco de Costa Rica and GNP Mexico within the Leasing module.\n\nOur SAF+ platform is a financial core ecosystem composed of three independent but natively integrated modules: Leasing, Factoring, and Credits. Each can be activated modularly according to the institution's needs, allowing progressive adoption without implementing the full suite from the start.\n\nOne of SAF+'s differentiating advantages is that, regardless of which modules are active, the platform offers a unified client view, enabling business and operations teams to centrally manage all client relationships, contracts, and exposures from a single access point.\n\nThanks to this architecture, we have a presence in institutions such as Unicomer, Banco Nacional, Credicomer, Bankaool, and ADOPEM, among others, each with distinct modular configurations according to their business model. Additionally, SYSDE Pensión supports over 80% of Latin America's pension market, reflecting the scale, stability, and trust that financial institutions in the region have placed in our solutions.",
    consideraciones: "SAF+ está desplegado sobre Azure con arquitectura de microservicios. La implementación modular permite activar Leasing, Factoraje o Créditos de forma independiente, reduciendo el tiempo de puesta en marcha.",
    consideraciones_en: "SAF+ is deployed on Azure with microservices architecture. The modular implementation allows activating Leasing, Factoring, or Credits independently, reducing time to market.",
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
    subtitle: "Transparencia sobre posicionamiento en la industria",
    subtitle_en: "Transparency on industry positioning",
    requerimiento: "Indicar si la solución o la compañía aparece referenciada en algún benchmark, estudio o evaluación de la industria (por ejemplo, Gartner, Celent, Forrester u otras consultoras especializadas).",
    requerimiento_en: "Indicate whether the solution or the company is referenced in any benchmark, study, or industry evaluation (e.g., Gartner, Celent, Forrester, or other specialized consultants).",
    respuesta: "El posicionamiento de SYSDE en la industria se ha consolidado a partir de relaciones de largo plazo con sus clientes, la experiencia directa del mercado, la solidez de sus implementaciones y la referencia continua de las instituciones que utilizan nuestras soluciones.\n\nA lo largo de más de 34 años de trayectoria, la compañía ha desarrollado un modelo de crecimiento sustentado en la penetración efectiva en distintos segmentos del sistema financiero y en la validación práctica de sus soluciones en entornos productivos. Actualmente, sus plataformas se encuentran implementadas en más de mil instituciones financieras en América Latina, incluyendo cooperativas, entidades especializadas, instituciones de microfinanzas y bancos de gran escala.\n\nEn particular, las soluciones de SYSDE mantienen una posición líder en los mercados de leasing y factoraje en la región, con implementaciones en múltiples instituciones que operan estos productos de forma intensiva. Adicionalmente, la compañía cuenta con una participación aproximada del 30% en el mercado de microfinanzas en América Latina, así como una presencia cercana al 82% del mercado de plataformas de pensiones en la región, lo que refleja la capacidad de sus soluciones para operar en entornos financieros de alta complejidad, volumen y exigencia regulatoria.\n\nEste posicionamiento se ha consolidado principalmente a partir de la experiencia operativa de los clientes, la continuidad de las implementaciones y las referencias dentro del propio sector financiero, lo cual ha permitido validar la robustez, estabilidad y evolución de las soluciones a lo largo del tiempo.\n\nAdicionalmente, los procesos y servicios de SYSDE se encuentran respaldados por certificaciones internacionales ISO, reflejando el compromiso de la compañía con estándares globales de calidad, seguridad y mejora continua en el desarrollo e implementación de sus plataformas.\n\nEn caso de que Banco de Crédito del Perú considere conveniente complementar este proceso con una evaluación formal por parte de firmas especializadas de la industria, SYSDE se encuentra en total disposición de participar activamente en dicho proceso, alineándose con los criterios y estándares que la institución estime necesarios para la validación de la solución.",
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
    subtitle: "Validación directa con instituciones del sector",
    subtitle_en: "Direct validation with industry institutions",
    requerimiento: "Compartir referencias de clientes activos en el sector financiero, idealmente vinculados a operaciones de leasing financiero u operativo, que respalden la experiencia y estabilidad de la solución.",
    requerimiento_en: "Share references of active clients in the financial sector, ideally linked to financial or operating leasing operations, that support the experience and stability of the solution.",
    respuesta: "Les compartimos referencias de algunas instituciones líderes que utilizan SYSDE PLUS, incluyendo organizaciones de Latinoamérica y África, con el fin de que su equipo pueda conocer de primera mano su experiencia con la solución y la estabilidad de la plataforma.\n\nPor acuerdos de confidencialidad, algunos clientes no pueden ser mencionados públicamente; sin embargo, podemos validar internamente la posibilidad de habilitar referencias y coordinar el contacto.\n\nAsimismo, entre las referencias compartidas se encuentra CMI, con quienes eventualmente podría coordinarse una sesión para que su equipo conozca directamente su experiencia en la implementación y operación de la solución.",
    respuesta_en: "We have clients actively operating leasing in Central America and Mexico. We are happy to facilitate direct references with these institutions during the evaluation process, so you can learn firsthand about their experience and the stability of the solution.\n\nAvailable references include organizations with production implementations of our Leasing module, as well as clients using other components of the SAF+ ecosystem, who can share their experience regarding service quality, support provided, and the continuous evolution of the platform.\n\nAdditionally, among the available references is CMI, an organization with which an exchange session can be coordinated so their team can directly share their experience with the implementation and operation of the solution, allowing firsthand validation of functional, operational, and platform adoption aspects.",
    consideraciones: "Los contactos de referencia se facilitarán previa coordinación con las instituciones, respetando los acuerdos de confidencialidad vigentes.",
    consideraciones_en: "Reference contacts will be provided upon coordination with the institutions, respecting current confidentiality agreements.",
    valor: "BCP podrá contactar directamente a instituciones que operan con SAF+ Leasing para validar la experiencia real de uso, estabilidad y soporte de la plataforma.",
    valor_en: "BCP will be able to directly contact institutions operating with SAF+ Leasing to validate real usage experience, stability, and platform support.",
    diagrams: [],
    diagrams_en: [],
  },
];

export const counts = {
  total: questions.length,
  answered: questions.filter((q) => q.status === "answered").length,
};
