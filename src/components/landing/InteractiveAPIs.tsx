import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Search, PenTool, Settings, ChevronDown, BookOpen, TestTube, Code2, Shield } from "lucide-react";

interface ApiCategory {
  id: string;
  icon: React.ElementType;
  label: string;
  label_en: string;
  color: string;
  endpoints: { name: string; name_en: string; desc: string; desc_en: string }[];
}

const categories: ApiCategory[] = [
  {
    id: "read", icon: Search, label: "APIs de Consulta (Read)", label_en: "Query APIs (Read)",
    color: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-blue-600",
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
    color: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-emerald-600",
    endpoints: [
      { name: "Creación de solicitudes", name_en: "Application creation", desc: "Desde canales digitales o CRM", desc_en: "From digital channels or CRM" },
      { name: "Carga de documentos", name_en: "Document upload", desc: "Del solicitante y del activo", desc_en: "From applicant and asset" },
      { name: "Pagos anticipados", name_en: "Advance payments", desc: "Abonos extraordinarios", desc_en: "Extraordinary payments" },
      { name: "Simulaciones", name_en: "Simulations", desc: "Cotización en tiempo real", desc_en: "Real-time quotation" },
    ],
  },
  {
    id: "workflow", icon: Settings, label: "APIs de Flujo (Workflow)", label_en: "Workflow APIs",
    color: "from-violet-500/15 to-violet-500/5 border-violet-500/25 text-violet-600",
    endpoints: [
      { name: "Inicio de flujos", name_en: "Flow initiation", desc: "Aprobación, formalización, desembolso", desc_en: "Approval, formalization, disbursement" },
      { name: "Avance de etapas", name_en: "Stage advancement", desc: "Progreso del flujo de trabajo", desc_en: "Workflow progress" },
      { name: "Estado del flujo", name_en: "Flow status", desc: "Consulta en tiempo real", desc_en: "Real-time query" },
      { name: "Notificaciones", name_en: "Notifications", desc: "Callbacks y webhooks configurables", desc_en: "Configurable callbacks and webhooks" },
    ],
  },
];

const tools = [
  { icon: BookOpen, label: "OpenAPI / Swagger", label_en: "OpenAPI / Swagger" },
  { icon: TestTube, label: "Sandbox de Pruebas", label_en: "Test Sandbox" },
  { icon: Code2, label: "SDKs de Referencia", label_en: "Reference SDKs" },
  { icon: Shield, label: "OAuth 2.0 / JWT", label_en: "OAuth 2.0 / JWT" },
];

const InteractiveAPIs = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] text-center mb-4">
        {pick("Core de APIs Preconstruidas", "Pre-built API Core")}
      </p>

      <div className="space-y-3 mb-6">
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
                className={`w-full rounded-xl border bg-gradient-to-br ${cat.color} p-4 flex items-center gap-3 transition-all hover:shadow-md cursor-pointer`}
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

      {/* Developer tools */}
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
              className="rounded-lg border bg-muted/30 p-3 flex flex-col items-center gap-1.5 text-center"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-semibold text-foreground">{pick(tool.label, tool.label_en)}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveAPIs;
