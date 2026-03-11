import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface SubEcosystemModule {
  id: string;
  icon: string;
  label: string;
  label_en?: string;
  description: string;
  description_en?: string;
}

interface Module {
  id: string;
  icon: string;
  label: string;
  label_en?: string;
  description: string;
  description_en?: string;
  category: "core" | "operations" | "channels" | "compliance";
  extras?: { label: string; label_en?: string; icon: string }[];
  subEcosystem: SubEcosystemModule[];
}

const categories = [
  { key: "core" as const, label: "Core Financiero", label_en: "Financial Core", icon: "🏛️" },
  { key: "operations" as const, label: "Operaciones", label_en: "Operations", icon: "⚙️" },
  { key: "channels" as const, label: "Canales & Reportes", label_en: "Channels & Reports", icon: "📡" },
  { key: "compliance" as const, label: "Seguridad & Cumplimiento", label_en: "Security & Compliance", icon: "🛡️" },
];

const modules: Module[] = [
  {
    id: "colocacion", icon: "💳", label: "Colocación", label_en: "Lending",
    description: "Productos de crédito y financiamiento", description_en: "Credit and financing products",
    category: "core",
    extras: [
      { label: "Arrendamiento", label_en: "Leasing", icon: "🏗️" },
      { label: "Factoraje", label_en: "Factoring", icon: "📄" },
    ],
    subEcosystem: [
      { id: "consumo", icon: "🛒", label: "Préstamos de Consumo", label_en: "Consumer Loans", description: "Créditos personales y de consumo directo", description_en: "Personal and direct consumer credit" },
      { id: "micro", icon: "🌱", label: "Microcrédito", label_en: "Microcredit", description: "Financiamiento para micro y pequeñas empresas", description_en: "Financing for micro and small businesses" },
      { id: "prendario", icon: "🔑", label: "Prendario", label_en: "Pledge Loans", description: "Créditos con garantía prendaria", description_en: "Pledge-backed credit" },
      { id: "lineas", icon: "📊", label: "Líneas de Crédito", label_en: "Credit Lines", description: "Líneas revolventes y no revolventes", description_en: "Revolving and non-revolving lines" },
      { id: "capital", icon: "💼", label: "Capital de Trabajo", label_en: "Working Capital", description: "Financiamiento de operaciones empresariales", description_en: "Business operations financing" },
      { id: "leasing", icon: "🏗️", label: "Arrendamiento", label_en: "Leasing", description: "Leasing financiero y operativo", description_en: "Financial and operating leasing" },
      { id: "factoring", icon: "📄", label: "Factoraje", label_en: "Factoring", description: "Descuento de facturas y cuentas por cobrar", description_en: "Invoice and receivables discounting" },
    ],
  },
  {
    id: "captacion", icon: "🏦", label: "Captación", label_en: "Deposits",
    description: "Productos de ahorro y depósitos", description_en: "Savings and deposit products",
    category: "core",
    subEcosystem: [
      { id: "ahorro", icon: "💰", label: "Cuentas de Ahorro", label_en: "Savings Accounts", description: "Ahorro a la vista y programado", description_en: "Demand and scheduled savings" },
      { id: "plazo", icon: "📅", label: "Depósitos a Plazo", label_en: "Term Deposits", description: "Certificados de depósito a plazo fijo", description_en: "Fixed-term deposit certificates" },
      { id: "cert", icon: "📜", label: "Certificados", label_en: "Certificates", description: "Certificados de inversión y participación", description_en: "Investment and participation certificates" },
      { id: "cuentas", icon: "🏧", label: "Cuentas Corrientes", label_en: "Checking Accounts", description: "Manejo de cuentas corrientes y chequeras", description_en: "Checking accounts and checkbooks" },
      { id: "inversiones", icon: "📈", label: "Inversiones", label_en: "Investments", description: "Portafolios de inversión y fondos", description_en: "Investment portfolios and funds" },
    ],
  },
  {
    id: "tesoreria", icon: "📊", label: "Tesorería", label_en: "Treasury",
    description: "Gestión financiera y contable", description_en: "Financial and accounting management",
    category: "operations",
    subEcosystem: [
      { id: "contabilidad", icon: "📒", label: "Contabilidad", label_en: "Accounting", description: "Plan de cuentas, asientos y estados financieros", description_en: "Chart of accounts, entries and financial statements" },
      { id: "conciliacion", icon: "⚖️", label: "Conciliación", label_en: "Reconciliation", description: "Conciliación bancaria automática y manual", description_en: "Automatic and manual bank reconciliation" },
      { id: "flujo", icon: "💧", label: "Flujo de Caja", label_en: "Cash Flow", description: "Proyección y control de flujos de efectivo", description_en: "Cash flow projection and control" },
      { id: "presupuesto", icon: "📋", label: "Presupuestos", label_en: "Budgets", description: "Gestión presupuestaria y control de gastos", description_en: "Budget management and expense control" },
      { id: "cierre", icon: "🔒", label: "Cierre Contable", label_en: "Closing", description: "Procesos de cierre mensual y anual", description_en: "Monthly and annual closing processes" },
    ],
  },
  {
    id: "cobranza", icon: "💵", label: "Cobranza", label_en: "Collections",
    description: "Gestión de cobros y recuperación", description_en: "Collection and recovery management",
    category: "operations",
    subEcosystem: [
      { id: "gestion", icon: "📞", label: "Gestión de Cobro", label_en: "Collection Mgmt", description: "Seguimiento y gestión de cartera vencida", description_en: "Past-due portfolio tracking and management" },
      { id: "automatica", icon: "⚡", label: "Cobranza Automática", label_en: "Auto Collection", description: "Débitos automáticos y domiciliaciones", description_en: "Automatic debits and direct debits" },
      { id: "judicial", icon: "⚖️", label: "Cobro Judicial", label_en: "Legal Collection", description: "Gestión de recuperación judicial", description_en: "Legal recovery management" },
      { id: "estrategias", icon: "🎯", label: "Estrategias", label_en: "Strategies", description: "Segmentación y estrategias de cobranza", description_en: "Segmentation and collection strategies" },
    ],
  },
  {
    id: "canales", icon: "📱", label: "Canales Digitales", label_en: "Digital Channels",
    description: "Plataformas móviles y web", description_en: "Mobile and web platforms",
    category: "channels",
    subEcosystem: [
      { id: "movil", icon: "📲", label: "Banca Móvil", label_en: "Mobile Banking", description: "App nativa iOS y Android", description_en: "Native iOS and Android app" },
      { id: "web", icon: "🌐", label: "Banca Web", label_en: "Web Banking", description: "Portal web responsive para clientes", description_en: "Responsive web portal for clients" },
      { id: "api", icon: "🔌", label: "API Gateway", label_en: "API Gateway", description: "APIs RESTful para integraciones de terceros", description_en: "RESTful APIs for third-party integrations" },
      { id: "whatsapp", icon: "💬", label: "WhatsApp Banking", label_en: "WhatsApp Banking", description: "Atención y operaciones vía WhatsApp", description_en: "Service and operations via WhatsApp" },
      { id: "cajeros", icon: "🏧", label: "ATM/Kiosk", label_en: "ATM/Kiosk", description: "Integración con cajeros y puntos de autoservicio", description_en: "ATM and self-service kiosk integration" },
    ],
  },
  {
    id: "reporteria", icon: "📈", label: "Reportería y BI", label_en: "Reporting & BI",
    description: "Análisis y reportes regulatorios", description_en: "Analytics and regulatory reports",
    category: "channels",
    subEcosystem: [
      { id: "regulatorios", icon: "📑", label: "Reportes Regulatorios", label_en: "Regulatory Reports", description: "Generación automática de reportes para entes reguladores", description_en: "Automatic report generation for regulators" },
      { id: "dashboards", icon: "📊", label: "Dashboards", label_en: "Dashboards", description: "Tableros interactivos en tiempo real", description_en: "Real-time interactive dashboards" },
      { id: "analitica", icon: "🧠", label: "Analítica Avanzada", label_en: "Advanced Analytics", description: "Machine learning y modelos predictivos", description_en: "Machine learning and predictive models" },
      { id: "adhoc", icon: "🔍", label: "Reportes Ad-hoc", label_en: "Ad-hoc Reports", description: "Generador de reportes personalizados", description_en: "Custom report generator" },
    ],
  },
  {
    id: "facturacion", icon: "🧾", label: "Facturación", label_en: "Billing",
    description: "Documentos electrónicos y gestión fiscal", description_en: "Electronic documents and tax management",
    category: "operations",
    subEcosystem: [
      { id: "fe", icon: "📃", label: "Factura Electrónica", label_en: "E-Invoice", description: "Emisión y recepción de comprobantes fiscales electrónicos", description_en: "Issuance and reception of electronic tax receipts" },
      { id: "nc", icon: "📝", label: "Notas de Crédito", label_en: "Credit Notes", description: "Generación y gestión de notas de crédito", description_en: "Generation and management of credit notes" },
      { id: "nd", icon: "📋", label: "Notas de Débito", label_en: "Debit Notes", description: "Emisión de notas de débito electrónicas", description_en: "Electronic debit note issuance" },
      { id: "ret", icon: "🧮", label: "Retenciones", label_en: "Withholdings", description: "Cálculo y emisión de retenciones fiscales", description_en: "Calculation and issuance of tax withholdings" },
      { id: "xml", icon: "📦", label: "XML/CFDI", label_en: "XML/CFDI", description: "Gestión de documentos XML y timbrado fiscal", description_en: "XML document management and tax stamping" },
      { id: "rep", icon: "📊", label: "Reportes Fiscales", label_en: "Tax Reports", description: "Reportes regulatorios y declaraciones", description_en: "Regulatory reports and declarations" },
    ],
  },
  {
    id: "seguridad", icon: "🔒", label: "Seguridad", label_en: "Security",
    description: "Control de accesos y cumplimiento", description_en: "Access control and compliance",
    category: "compliance",
    subEcosystem: [
      { id: "acceso", icon: "🔐", label: "Control de Acceso", label_en: "Access Control", description: "Autenticación multifactor y perfiles de usuario", description_en: "Multi-factor authentication and user profiles" },
      { id: "auditoria", icon: "📋", label: "Auditoría", label_en: "Audit", description: "Trazabilidad completa de operaciones", description_en: "Complete operations traceability" },
      { id: "pld", icon: "🛡️", label: "PLD/AML", label_en: "AML", description: "Prevención de lavado de dinero", description_en: "Anti-money laundering prevention" },
      { id: "firmas", icon: "✍️", label: "Firmas Digitales", label_en: "Digital Signatures", description: "Firma electrónica avanzada", description_en: "Advanced electronic signature" },
    ],
  },
  {
    id: "notificaciones", icon: "🔔", label: "Notificaciones", label_en: "Notifications",
    description: "Alertas multi-canal", description_en: "Multi-channel alerts",
    category: "compliance",
    subEcosystem: [
      { id: "email", icon: "📧", label: "Email", label_en: "Email", description: "Notificaciones por correo electrónico", description_en: "Email notifications" },
      { id: "sms", icon: "📱", label: "SMS", label_en: "SMS", description: "Alertas por mensaje de texto", description_en: "Text message alerts" },
      { id: "push", icon: "🔔", label: "Push", label_en: "Push", description: "Notificaciones push en app móvil", description_en: "Mobile app push notifications" },
      { id: "webhook", icon: "🔗", label: "Webhooks", label_en: "Webhooks", description: "Eventos en tiempo real para integraciones", description_en: "Real-time events for integrations" },
    ],
  },
];

const SUB_ORBIT_RADIUS = 130;
const SUB_CORE_SIZE = 70;
const SUB_PLANET_SIZE = 48;

const SubEcosystem = ({ parentModule, onBack }: { parentModule: Module; onBack: () => void }) => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const subs = parentModule.subEcosystem;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-5 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        {pick("Volver al ecosistema", "Back to ecosystem")}
      </button>

      {/* Module header */}
      <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/[0.02] border mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[hsl(340,70%,30%)] flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <span className="text-2xl">{parentModule.icon}</span>
        </div>
        <div>
          <h5 className="text-base font-bold text-foreground">{pick(parentModule.label, parentModule.label_en)}</h5>
          <p className="text-xs text-muted-foreground">{pick(parentModule.description, parentModule.description_en)}</p>
        </div>
      </div>

      {/* Sub-ecosystem orbit */}
      <div className="relative mx-auto" style={{ width: (SUB_ORBIT_RADIUS + SUB_PLANET_SIZE) * 2, height: (SUB_ORBIT_RADIUS + SUB_PLANET_SIZE) * 2 }}>
        <div
          className="absolute border-2 border-dashed border-primary/15 rounded-full"
          style={{
            width: SUB_ORBIT_RADIUS * 2,
            height: SUB_ORBIT_RADIUS * 2,
            top: SUB_PLANET_SIZE,
            left: SUB_PLANET_SIZE,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: SUB_ORBIT_RADIUS * 2 - 30,
            height: SUB_ORBIT_RADIUS * 2 - 30,
            top: SUB_PLANET_SIZE + 15,
            left: SUB_PLANET_SIZE + 15,
            background: "radial-gradient(circle, hsl(352 87% 42% / 0.05) 0%, transparent 70%)",
          }}
        />

        {/* Core */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-10 rounded-full bg-gradient-to-br from-primary via-[hsl(340,70%,35%)] to-[hsl(352,87%,22%)] flex items-center justify-center"
          style={{
            width: SUB_CORE_SIZE,
            height: SUB_CORE_SIZE,
            top: SUB_ORBIT_RADIUS + SUB_PLANET_SIZE - SUB_CORE_SIZE / 2,
            left: SUB_ORBIT_RADIUS + SUB_PLANET_SIZE - SUB_CORE_SIZE / 2,
            boxShadow: "0 0 40px hsl(352 87% 42% / 0.3)",
          }}
        >
          <div className="text-center">
            <span className="text-xl">{parentModule.icon}</span>
            <p className="text-primary-foreground/70 text-[7px] font-bold mt-0.5">{pick(parentModule.label, parentModule.label_en)}</p>
          </div>
        </motion.div>

        {subs.map((sub, i) => {
          const angle = (i / subs.length) * 2 * Math.PI - Math.PI / 2;
          const x = SUB_ORBIT_RADIUS + SUB_PLANET_SIZE + Math.cos(angle) * SUB_ORBIT_RADIUS - SUB_PLANET_SIZE / 2;
          const y = SUB_ORBIT_RADIUS + SUB_PLANET_SIZE + Math.sin(angle) * SUB_ORBIT_RADIUS - SUB_PLANET_SIZE / 2;

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 200 }}
              className="absolute group z-[5]"
              style={{ width: SUB_PLANET_SIZE, height: SUB_PLANET_SIZE, top: y, left: x }}
            >
              <div className="w-full h-full rounded-full bg-card border-2 border-border group-hover:border-primary/40 shadow-md group-hover:shadow-lg flex flex-col items-center justify-center transition-all duration-200">
                <span className="text-base leading-none">{sub.icon}</span>
                <span className="text-[6px] font-bold text-foreground mt-0.5 leading-tight text-center px-1 truncate w-full">
                  {pick(sub.label, sub.label_en)}
                </span>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                <span className="text-[8px] bg-foreground text-background px-2 py-1 rounded-md font-medium shadow-lg">
                  {pick(sub.description, sub.description_en)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Extras (independent cores) */}
      {parentModule.extras && (
        <div className="mt-6">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
            {pick("Cores Independientes", "Independent Cores")}
          </p>
          <div className="flex flex-wrap gap-2">
            {parentModule.extras.map((ex, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 border-primary/25 bg-primary/5">
                <span className="text-lg">{ex.icon}</span>
                <div>
                  <p className="text-xs font-bold text-foreground">{pick(ex.label, ex.label_en)}</p>
                  <p className="text-[9px] text-muted-foreground">{pick("Core independiente", "Independent core")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const SafEcosystem = () => {
  const { lang } = useI18n();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const currentModule = modules.find((m) => m.id === selectedModule);

  const filteredModules = activeCategory === "all"
    ? modules
    : modules.filter((m) => m.category === activeCategory);

  return (
    <div className="w-full">
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 rounded-full bg-primary" />
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
          {pick("Ecosistema SAF+", "SAF+ Ecosystem")}
        </h4>
      </div>

      <AnimatePresence mode="wait">
        {selectedModule && currentModule ? (
          <SubEcosystem
            key={`sub-${selectedModule}`}
            parentModule={currentModule}
            onBack={() => setSelectedModule(null)}
          />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Category filter buttons */}
            <div className="flex flex-wrap gap-1.5 mb-6 p-1 rounded-xl bg-muted/40 border">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-2 rounded-lg text-[11px] font-semibold transition-all ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                🔗 {pick("Todos", "All")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 py-2 rounded-lg text-[11px] font-semibold transition-all ${
                    activeCategory === cat.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.icon} {pick(cat.label, cat.label_en)}
                </button>
              ))}
            </div>

            {/* Module grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredModules.map((mod, i) => {
                const catInfo = categories.find((c) => c.key === mod.category);
                return (
                  <motion.button
                    key={mod.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedModule(mod.id)}
                    className="group text-left p-4 rounded-2xl border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:from-primary/25 group-hover:to-primary/10 transition-all">
                        <span className="text-lg">{mod.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">{pick(mod.label, mod.label_en)}</p>
                        <p className="text-[9px] text-muted-foreground">{catInfo?.icon} {pick(catInfo?.label, catInfo?.label_en)}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2 mb-2">
                      {pick(mod.description, mod.description_en)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-primary font-semibold">
                        {mod.subEcosystem.length} {pick("componentes", "components")}
                      </span>
                      <span className="text-[9px] text-primary opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                        {pick("Explorar →", "Explore →")}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-5 flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-dashed border-primary/15 bg-primary/[0.02] max-w-md mx-auto">
              <span className="text-[10px]">🔗</span>
              <p className="text-[9px] font-medium text-muted-foreground">
                {pick(
                  `${modules.length} módulos nativamente integrados · Clic en cualquier módulo para ver su sub-ecosistema`,
                  `${modules.length} natively integrated modules · Click any module to see its sub-ecosystem`
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SafEcosystem;
