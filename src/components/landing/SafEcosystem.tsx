import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface SubModule {
  name: string;
  name_en?: string;
}

interface Module {
  id: string;
  icon: string;
  label: string;
  label_en?: string;
  description: string;
  description_en?: string;
  subModules?: SubModule[];
  extras?: { label: string; label_en?: string; icon: string; subs?: SubModule[] }[];
}

const modules: Module[] = [
  {
    id: "colocacion",
    icon: "💳",
    label: "Colocación",
    label_en: "Lending",
    description: "Productos de crédito y financiamiento",
    description_en: "Credit and financing products",
    subModules: [
      { name: "Préstamos de Consumo", name_en: "Consumer Loans" },
      { name: "Microcrédito", name_en: "Microcredit" },
      { name: "Prendario", name_en: "Pledge Loans" },
      { name: "Líneas de Crédito", name_en: "Credit Lines" },
      { name: "Capital de Trabajo", name_en: "Working Capital" },
    ],
    extras: [
      { label: "Arrendamiento", label_en: "Leasing", icon: "🏗️" },
      { label: "Factoraje", label_en: "Factoring", icon: "📄" },
    ],
  },
  {
    id: "captacion",
    icon: "🏦",
    label: "Captación",
    label_en: "Deposits",
    description: "Productos de ahorro y depósitos",
    description_en: "Savings and deposit products",
    subModules: [
      { name: "Cuentas de Ahorro", name_en: "Savings Accounts" },
      { name: "Depósitos a Plazo", name_en: "Term Deposits" },
      { name: "Certificados", name_en: "Certificates" },
    ],
  },
  {
    id: "canales",
    icon: "📱",
    label: "Canales Digitales",
    label_en: "Digital Channels",
    description: "Plataformas móviles y web",
    description_en: "Mobile and web platforms",
    subModules: [
      { name: "Banca Móvil", name_en: "Mobile Banking" },
      { name: "Banca Web", name_en: "Web Banking" },
      { name: "API Gateway", name_en: "API Gateway" },
    ],
  },
  {
    id: "tesoreria",
    icon: "📊",
    label: "Tesorería",
    label_en: "Treasury",
    description: "Gestión financiera y contable",
    description_en: "Financial and accounting management",
    subModules: [
      { name: "Contabilidad", name_en: "Accounting" },
      { name: "Conciliación", name_en: "Reconciliation" },
      { name: "Flujo de Caja", name_en: "Cash Flow" },
    ],
  },
  {
    id: "seguridad",
    icon: "🔒",
    label: "Seguridad",
    label_en: "Security",
    description: "Control de accesos y cumplimiento",
    description_en: "Access control and compliance",
    subModules: [
      { name: "Control de Acceso", name_en: "Access Control" },
      { name: "Auditoría", name_en: "Audit" },
      { name: "Cumplimiento", name_en: "Compliance" },
    ],
  },
  {
    id: "reporteria",
    icon: "📈",
    label: "Reportería y BI",
    label_en: "Reporting & BI",
    description: "Análisis y reportes regulatorios",
    description_en: "Analytics and regulatory reports",
    subModules: [
      { name: "Reportes Regulatorios", name_en: "Regulatory Reports" },
      { name: "Dashboards", name_en: "Dashboards" },
      { name: "Analítica Avanzada", name_en: "Advanced Analytics" },
    ],
  },
  {
    id: "facturacion",
    icon: "🧾",
    label: "Facturación",
    label_en: "Billing",
    description: "Documentos electrónicos",
    description_en: "Electronic documents",
    subModules: [
      { name: "Factura Electrónica", name_en: "E-Invoice" },
      { name: "Notas de Crédito", name_en: "Credit Notes" },
    ],
  },
  {
    id: "notificaciones",
    icon: "🔔",
    label: "Notificaciones",
    label_en: "Notifications",
    description: "Alertas multi-canal",
    description_en: "Multi-channel alerts",
    subModules: [
      { name: "Email", name_en: "Email" },
      { name: "SMS", name_en: "SMS" },
      { name: "Push", name_en: "Push" },
    ],
  },
];

const SafEcosystem = () => {
  const { lang } = useI18n();
  const [selected, setSelected] = useState<string | null>(null);
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);

  const selectedModule = modules.find((m) => m.id === selected);

  return (
    <div className="w-full">
      <h4 className="text-xs font-bold text-foreground mb-4">
        {pick("Ecosistema SAF+ — Módulos del Core Financiero", "SAF+ Ecosystem — Financial Core Modules")}
      </h4>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Core */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-[hsl(340,70%,30%)] flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-primary-foreground font-extrabold text-sm">SAF+ Core</span>
              </div>
            </div>

            {/* Modules grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {modules.map((mod, i) => (
                <motion.button
                  key={mod.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelected(mod.id)}
                  className="group relative p-4 rounded-xl border bg-card hover:bg-primary/5 hover:border-primary/30 transition-all text-center"
                >
                  <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">
                    {mod.icon}
                  </span>
                  <p className="text-xs font-bold text-foreground">{pick(mod.label, mod.label_en)}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{pick(mod.description, mod.description_en)}</p>
                  <span className="text-[9px] text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-1 block">
                    {pick("Clic para explorar →", "Click to explore →")}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {pick("Volver al ecosistema", "Back to ecosystem")}
            </button>

            {/* Selected module header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-[hsl(340,70%,30%)] flex items-center justify-center shadow-md shadow-primary/20">
                <span className="text-2xl">{selectedModule?.icon}</span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-foreground">
                  {pick(selectedModule?.label || "", selectedModule?.label_en)}
                </h5>
                <p className="text-xs text-muted-foreground">
                  {pick(selectedModule?.description || "", selectedModule?.description_en)}
                </p>
              </div>
            </div>

            {/* Sub-modules */}
            {selectedModule?.subModules && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {selectedModule.subModules.map((sub, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-3 rounded-lg border bg-primary/5 border-primary/15 text-center"
                  >
                    <p className="text-xs font-medium text-foreground">
                      {pick(sub.name, sub.name_en)}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Extras (Colocación special case) */}
            {selectedModule?.extras && (
              <div className="mt-4">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  {pick("Cores Adicionales Independientes", "Additional Independent Cores")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedModule.extras.map((ex, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-primary/20 bg-primary/5"
                    >
                      <span className="text-xl">{ex.icon}</span>
                      <span className="text-xs font-bold text-foreground">
                        {pick(ex.label, ex.label_en)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SafEcosystem;
