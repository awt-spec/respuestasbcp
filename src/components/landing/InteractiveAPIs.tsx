import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Search, PenTool, Settings, ChevronDown, BookOpen, TestTube, Code2, Shield, Zap, Globe, Activity, Database, BarChart3, Webhook } from "lucide-react";

interface ApiCategory {
  id: string;
  icon: React.ElementType;
  label: string;
  label_en: string;
  color: string;
  gradient: string;
  endpoints: { name: string; name_en: string; desc: string; desc_en: string }[];
}

const categories: ApiCategory[] = [
  {
    id: "read", icon: Search, label: "APIs de Consulta (Read)", label_en: "Query APIs (Read)",
    color: "text-blue-600", gradient: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
    endpoints: [
      { name: "Estado de operaciones", name_en: "Operation status", desc: "Por cliente, contrato o producto", desc_en: "By client, contract, or product" },
      { name: "Plan de pagos y saldos", name_en: "Payment plans & balances", desc: "Cuotas pendientes, vencidas, proyección", desc_en: "Pending, overdue installments, projection" },
      { name: "Información del activo", name_en: "Asset information", desc: "Registro, valuación, depreciación", desc_en: "Registration, valuation, depreciation" },
      { name: "Documentos asociados", name_en: "Associated documents", desc: "Contratos, pagarés, facturas", desc_en: "Contracts, promissory notes, invoices" },
      { name: "Historial de movimientos", name_en: "Movement history", desc: "Pagos, ajustes, reestructuraciones", desc_en: "Payments, adjustments, restructurings" },
    ],
  },
  {
    id: "write", icon: PenTool, label: "APIs de Ingreso (Write)", label_en: "Input APIs (Write)",
    color: "text-emerald-600", gradient: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
    endpoints: [
      { name: "Creación de solicitudes", name_en: "Application creation", desc: "Desde canales digitales o CRM", desc_en: "From digital channels or CRM" },
      { name: "Carga de documentos", name_en: "Document upload", desc: "Del solicitante y del activo", desc_en: "From applicant and asset" },
      { name: "Pagos anticipados", name_en: "Advance payments", desc: "Abonos extraordinarios", desc_en: "Extraordinary payments" },
      { name: "Simulaciones", name_en: "Simulations", desc: "Cotización en tiempo real", desc_en: "Real-time quotation" },
    ],
  },
  {
    id: "workflow", icon: Settings, label: "APIs de Flujo (Workflow)", label_en: "Workflow APIs",
    color: "text-violet-600", gradient: "from-violet-500/20 to-violet-600/5 border-violet-500/30",
    endpoints: [
      { name: "Inicio de flujos", name_en: "Flow initiation", desc: "Aprobación, formalización, desembolso", desc_en: "Approval, formalization, disbursement" },
      { name: "Avance de etapas", name_en: "Stage advancement", desc: "Progreso del flujo de trabajo", desc_en: "Workflow progress" },
      { name: "Estado del flujo", name_en: "Flow status", desc: "Consulta en tiempo real", desc_en: "Real-time query" },
      { name: "Notificaciones", name_en: "Notifications", desc: "Callbacks y webhooks configurables", desc_en: "Configurable callbacks and webhooks" },
    ],
  },
  {
    id: "events", icon: Webhook, label: "Integración por Eventos", label_en: "Event-Driven Integration",
    color: "text-amber-600", gradient: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
    endpoints: [
      { name: "Event Bus", name_en: "Event Bus", desc: "Publicación y suscripción de eventos de negocio", desc_en: "Business event pub/sub" },
      { name: "Webhooks configurables", name_en: "Configurable Webhooks", desc: "Cambios de estado en operaciones", desc_en: "Operation state changes" },
      { name: "Message Brokers", name_en: "Message Brokers", desc: "Apache Kafka, RabbitMQ, Azure Service Bus", desc_en: "Apache Kafka, RabbitMQ, Azure Service Bus" },
      { name: "Eventos en tiempo real", name_en: "Real-time Events", desc: "Notificaciones push y callbacks", desc_en: "Push notifications and callbacks" },
    ],
  },
];

const stats = [
  { value: "+250", label: "Endpoints", label_en: "Endpoints", icon: Zap, color: "text-blue-600 bg-blue-500/10 border-blue-500/20" },
  { value: "REST", label: "Arquitectura", label_en: "Architecture", icon: Globe, color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  { value: "24/7", label: "Disponibilidad", label_en: "Availability", icon: Activity, color: "text-violet-600 bg-violet-500/10 border-violet-500/20" },
  { value: "OAuth", label: "Seguridad", label_en: "Security", icon: Shield, color: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
];

const integrations = [
  { name: "CRM", desc: "Solicitudes y sincronización", desc_en: "Applications & sync", icon: Database },
  { name: "ERP / SAP", desc: "Asientos contables y catálogos", desc_en: "Accounting entries & catalogs", icon: BarChart3 },
  { name: "Pricing", desc: "Consulta de tasas externas", desc_en: "External rate queries", icon: Activity },
  { name: "Data Warehouse", desc: "Extracción vía APIs o vistas", desc_en: "Extraction via APIs or views", icon: Globe },
  { name: "Canales Digitales", desc: "Portal web y app móvil", desc_en: "Web portal & mobile app", icon: Zap },
  { name: "Core Bancario", desc: "Interoperabilidad nativa", desc_en: "Native interoperability", icon: Shield },
];

const tools = [
  { icon: BookOpen, label: "OpenAPI / Swagger", label_en: "OpenAPI / Swagger", desc: "Documentación completa", desc_en: "Full documentation" },
  { icon: TestTube, label: "Sandbox de Pruebas", label_en: "Test Sandbox", desc: "Ambiente de testing", desc_en: "Testing environment" },
  { icon: Code2, label: "SDKs de Referencia", label_en: "Reference SDKs", desc: "Java, .NET, Node.js", desc_en: "Java, .NET, Node.js" },
  { icon: Shield, label: "OAuth 2.0 / JWT", label_en: "OAuth 2.0 / JWT", desc: "Autenticación segura", desc_en: "Secure authentication" },
];

const InteractiveAPIs = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl border p-4 text-center ${stat.color}`}
            >
              <Icon className="w-5 h-5 mx-auto mb-2" />
              <p className="text-xl font-black">{stat.value}</p>
              <p className="text-[10px] font-semibold opacity-80">{pick(stat.label, stat.label_en)}</p>
            </motion.div>
          );
        })}
      </div>

      {/* API Categories — expandable */}
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] text-center mb-4">
          {pick("Core de APIs RESTful", "RESTful API Core")}
        </p>
        <div className="space-y-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isOpen = expanded === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : cat.id)}
                  className={`w-full rounded-xl border bg-gradient-to-br ${cat.gradient} ${cat.color} p-4 flex items-center gap-3 transition-all hover:shadow-md cursor-pointer`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-bold text-foreground">{pick(cat.label, cat.label_en)}</span>
                    <p className="text-[10px] text-muted-foreground">{cat.endpoints.length} endpoints</p>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-1 px-2 space-y-1.5">
                        {cat.endpoints.map((ep, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.04 }}
                            className="flex items-center gap-3 rounded-lg bg-card border p-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-foreground">{pick(ep.name, ep.name_en)}</p>
                              <p className="text-[10px] text-muted-foreground">{pick(ep.desc, ep.desc_en)}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Integrations grid */}
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] text-center mb-4">
          {pick("Integraciones Típicas", "Typical Integrations")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {integrations.map((int, i) => {
            const Icon = int.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="rounded-xl border bg-gradient-to-br from-muted/40 to-muted/10 p-3 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{int.name}</p>
                  <p className="text-[10px] text-muted-foreground">{pick(int.desc, int.desc_en)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Developer tools */}
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] text-center mb-4">
          {pick("Herramientas para Desarrolladores", "Developer Tools")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="rounded-xl border bg-card p-3 flex flex-col items-center gap-1.5 text-center shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[11px] font-bold text-foreground">{pick(tool.label, tool.label_en)}</span>
                <span className="text-[9px] text-muted-foreground">{pick(tool.desc, tool.desc_en)}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InteractiveAPIs;
