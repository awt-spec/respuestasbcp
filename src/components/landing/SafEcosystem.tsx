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
  color: string;
  subModules?: SubModule[];
  extras?: { label: string; label_en?: string; icon: string }[];
}

const modules: Module[] = [
  {
    id: "colocacion", icon: "💳", label: "Colocación", label_en: "Lending",
    description: "Productos de crédito y financiamiento", description_en: "Credit and financing products",
    color: "from-red-500/10 to-red-600/5",
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
    id: "captacion", icon: "🏦", label: "Captación", label_en: "Deposits",
    description: "Productos de ahorro y depósitos", description_en: "Savings and deposit products",
    color: "from-blue-500/10 to-blue-600/5",
    subModules: [
      { name: "Cuentas de Ahorro", name_en: "Savings Accounts" },
      { name: "Depósitos a Plazo", name_en: "Term Deposits" },
      { name: "Certificados", name_en: "Certificates" },
    ],
  },
  {
    id: "canales", icon: "📱", label: "Canales Digitales", label_en: "Digital Channels",
    description: "Plataformas móviles y web", description_en: "Mobile and web platforms",
    color: "from-violet-500/10 to-violet-600/5",
    subModules: [
      { name: "Banca Móvil", name_en: "Mobile Banking" },
      { name: "Banca Web", name_en: "Web Banking" },
      { name: "API Gateway", name_en: "API Gateway" },
    ],
  },
  {
    id: "tesoreria", icon: "📊", label: "Tesorería", label_en: "Treasury",
    description: "Gestión financiera y contable", description_en: "Financial and accounting management",
    color: "from-amber-500/10 to-amber-600/5",
    subModules: [
      { name: "Contabilidad", name_en: "Accounting" },
      { name: "Conciliación", name_en: "Reconciliation" },
      { name: "Flujo de Caja", name_en: "Cash Flow" },
    ],
  },
  {
    id: "seguridad", icon: "🔒", label: "Seguridad", label_en: "Security",
    description: "Control de accesos y cumplimiento", description_en: "Access control and compliance",
    color: "from-emerald-500/10 to-emerald-600/5",
    subModules: [
      { name: "Control de Acceso", name_en: "Access Control" },
      { name: "Auditoría", name_en: "Audit" },
      { name: "Cumplimiento", name_en: "Compliance" },
    ],
  },
  {
    id: "reporteria", icon: "📈", label: "Reportería y BI", label_en: "Reporting & BI",
    description: "Análisis y reportes regulatorios", description_en: "Analytics and regulatory reports",
    color: "from-cyan-500/10 to-cyan-600/5",
    subModules: [
      { name: "Reportes Regulatorios", name_en: "Regulatory Reports" },
      { name: "Dashboards", name_en: "Dashboards" },
      { name: "Analítica Avanzada", name_en: "Advanced Analytics" },
    ],
  },
  {
    id: "facturacion", icon: "🧾", label: "Facturación", label_en: "Billing",
    description: "Documentos electrónicos", description_en: "Electronic documents",
    color: "from-orange-500/10 to-orange-600/5",
    subModules: [
      { name: "Factura Electrónica", name_en: "E-Invoice" },
      { name: "Notas de Crédito", name_en: "Credit Notes" },
    ],
  },
  {
    id: "notificaciones", icon: "🔔", label: "Notificaciones", label_en: "Notifications",
    description: "Alertas multi-canal", description_en: "Multi-channel alerts",
    color: "from-pink-500/10 to-pink-600/5",
    subModules: [
      { name: "Email" },
      { name: "SMS" },
      { name: "Push" },
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
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Central core */}
            <div className="relative flex flex-col items-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-primary via-[hsl(340,70%,35%)] to-[hsl(352,87%,25%)] flex items-center justify-center shadow-[0_0_40px_hsl(352,87%,42%,0.35)] ring-4 ring-primary/10"
              >
                <div className="text-center">
                  <p className="text-primary-foreground font-extrabold text-base tracking-tight">SAF+</p>
                  <p className="text-primary-foreground/70 text-[9px] font-semibold">Core</p>
                </div>
              </motion.div>
              {/* Connecting lines */}
              <div className="absolute top-full w-px h-6 bg-gradient-to-b from-primary/30 to-transparent" />
            </div>

            {/* Modules ring */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {modules.map((mod, i) => (
                <motion.button
                  key={mod.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(mod.id)}
                  className={`group relative p-4 rounded-2xl border bg-gradient-to-br ${mod.color} hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 text-left cursor-pointer`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xl">{mod.icon}</span>
                    <p className="text-[11px] font-bold text-foreground leading-tight">{pick(mod.label, mod.label_en)}</p>
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-snug">{pick(mod.description, mod.description_en)}</p>
                  <div className="absolute bottom-2 right-3 text-[8px] text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {pick("Explorar →", "Explore →")}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Integration badge */}
            <div className="mt-5 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-dashed border-primary/20 bg-primary/[0.03]">
              <span className="text-xs">🔗</span>
              <p className="text-[10px] font-medium text-muted-foreground">
                {pick(
                  "Todos los módulos nativamente integrados · Vista unificada del cliente",
                  "All modules natively integrated · Unified client view"
                )}
              </p>
            </div>
          </motion.div>
        ) : selectedModule && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {pick("Volver al ecosistema", "Back to ecosystem")}
            </button>

            {/* Module header */}
            <div className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${selectedModule.color} border mb-5`}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-[hsl(340,70%,30%)] flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-2xl">{selectedModule.icon}</span>
              </div>
              <div>
                <h5 className="text-base font-bold text-foreground">
                  {pick(selectedModule.label, selectedModule.label_en)}
                </h5>
                <p className="text-xs text-muted-foreground">
                  {pick(selectedModule.description, selectedModule.description_en)}
                </p>
              </div>
            </div>

            {/* Sub-modules */}
            {selectedModule.subModules && (
              <div className="mb-5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  {pick("Sub-módulos", "Sub-modules")}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedModule.subModules.map((sub, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-2 p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <p className="text-[11px] font-medium text-foreground">
                        {pick(sub.name, sub.name_en)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            {selectedModule.extras && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  {pick("Cores Independientes", "Independent Cores")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.extras.map((ex, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 border-primary/20 bg-primary/5"
                    >
                      <span className="text-lg">{ex.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-foreground">{pick(ex.label, ex.label_en)}</p>
                        <p className="text-[9px] text-muted-foreground">{pick("Core independiente", "Independent core")}</p>
                      </div>
                    </motion.div>
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
