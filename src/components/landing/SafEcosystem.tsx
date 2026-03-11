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
  extras?: { label: string; label_en?: string; icon: string }[];
}

const modules: Module[] = [
  {
    id: "colocacion", icon: "💳", label: "Colocación", label_en: "Lending",
    description: "Productos de crédito y financiamiento", description_en: "Credit and financing products",
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
    subModules: [
      { name: "Cuentas de Ahorro", name_en: "Savings Accounts" },
      { name: "Depósitos a Plazo", name_en: "Term Deposits" },
      { name: "Certificados", name_en: "Certificates" },
    ],
  },
  {
    id: "canales", icon: "📱", label: "Canales Digitales", label_en: "Digital Channels",
    description: "Plataformas móviles y web", description_en: "Mobile and web platforms",
    subModules: [
      { name: "Banca Móvil", name_en: "Mobile Banking" },
      { name: "Banca Web", name_en: "Web Banking" },
      { name: "API Gateway", name_en: "API Gateway" },
    ],
  },
  {
    id: "tesoreria", icon: "📊", label: "Tesorería", label_en: "Treasury",
    description: "Gestión financiera y contable", description_en: "Financial and accounting management",
    subModules: [
      { name: "Contabilidad", name_en: "Accounting" },
      { name: "Conciliación", name_en: "Reconciliation" },
      { name: "Flujo de Caja", name_en: "Cash Flow" },
    ],
  },
  {
    id: "seguridad", icon: "🔒", label: "Seguridad", label_en: "Security",
    description: "Control de accesos y cumplimiento", description_en: "Access control and compliance",
    subModules: [
      { name: "Control de Acceso", name_en: "Access Control" },
      { name: "Auditoría", name_en: "Audit" },
      { name: "Cumplimiento", name_en: "Compliance" },
    ],
  },
  {
    id: "reporteria", icon: "📈", label: "Reportería y BI", label_en: "Reporting & BI",
    description: "Análisis y reportes regulatorios", description_en: "Analytics and regulatory reports",
    subModules: [
      { name: "Reportes Regulatorios", name_en: "Regulatory Reports" },
      { name: "Dashboards", name_en: "Dashboards" },
      { name: "Analítica Avanzada", name_en: "Advanced Analytics" },
    ],
  },
  {
    id: "facturacion", icon: "🧾", label: "Facturación", label_en: "Billing",
    description: "Documentos electrónicos", description_en: "Electronic documents",
    subModules: [
      { name: "Factura Electrónica", name_en: "E-Invoice" },
      { name: "Notas de Crédito", name_en: "Credit Notes" },
    ],
  },
  {
    id: "notificaciones", icon: "🔔", label: "Notificaciones", label_en: "Notifications",
    description: "Alertas multi-canal", description_en: "Multi-channel alerts",
    subModules: [
      { name: "Email" }, { name: "SMS" }, { name: "Push" },
    ],
  },
];

const ORBIT_RADIUS = 180;
const CORE_SIZE = 90;
const PLANET_SIZE = 56;

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
            key="solar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Solar system container */}
            <div className="relative mx-auto" style={{ width: (ORBIT_RADIUS + PLANET_SIZE) * 2, height: (ORBIT_RADIUS + PLANET_SIZE) * 2 }}>
              
              {/* Orbit ring */}
              <div
                className="absolute border-2 border-dashed border-primary/15 rounded-full"
                style={{
                  width: ORBIT_RADIUS * 2,
                  height: ORBIT_RADIUS * 2,
                  top: PLANET_SIZE,
                  left: PLANET_SIZE,
                }}
              />

              {/* Glow ring */}
              <div
                className="absolute rounded-full"
                style={{
                  width: ORBIT_RADIUS * 2 - 40,
                  height: ORBIT_RADIUS * 2 - 40,
                  top: PLANET_SIZE + 20,
                  left: PLANET_SIZE + 20,
                  background: "radial-gradient(circle, hsl(352 87% 42% / 0.06) 0%, transparent 70%)",
                }}
              />

              {/* Core */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-10 rounded-full bg-gradient-to-br from-primary via-[hsl(340,70%,35%)] to-[hsl(352,87%,22%)] flex items-center justify-center cursor-default"
                style={{
                  width: CORE_SIZE,
                  height: CORE_SIZE,
                  top: ORBIT_RADIUS + PLANET_SIZE - CORE_SIZE / 2,
                  left: ORBIT_RADIUS + PLANET_SIZE - CORE_SIZE / 2,
                  boxShadow: "0 0 50px hsl(352 87% 42% / 0.4), 0 0 100px hsl(352 87% 42% / 0.15)",
                }}
              >
                <div className="text-center">
                  <p className="text-primary-foreground font-extrabold text-sm leading-none">SAF+</p>
                  <p className="text-primary-foreground/60 text-[8px] font-semibold mt-0.5">Core</p>
                </div>
              </motion.div>

              {/* Orbiting planets */}
              {modules.map((mod, i) => {
                const angle = (i / modules.length) * 2 * Math.PI - Math.PI / 2;
                const x = ORBIT_RADIUS + PLANET_SIZE + Math.cos(angle) * ORBIT_RADIUS - PLANET_SIZE / 2;
                const y = ORBIT_RADIUS + PLANET_SIZE + Math.sin(angle) * ORBIT_RADIUS - PLANET_SIZE / 2;

                return (
                  <motion.button
                    key={mod.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.2, zIndex: 20 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelected(mod.id)}
                    className="absolute group z-[5]"
                    style={{
                      width: PLANET_SIZE,
                      height: PLANET_SIZE,
                      top: y,
                      left: x,
                    }}
                    title={pick(mod.description, mod.description_en)}
                  >
                    {/* Connector line */}
                    <div
                      className="absolute bg-primary/10 group-hover:bg-primary/25 transition-colors"
                      style={{
                        width: 1,
                        height: ORBIT_RADIUS - CORE_SIZE / 2 - PLANET_SIZE / 2,
                        transformOrigin: "top center",
                        top: PLANET_SIZE / 2,
                        left: PLANET_SIZE / 2,
                        transform: `rotate(${angle + Math.PI / 2}rad)`,
                        display: "none",
                      }}
                    />
                    <div className="w-full h-full rounded-full bg-card border-2 border-border group-hover:border-primary/40 shadow-md group-hover:shadow-lg group-hover:shadow-primary/10 flex flex-col items-center justify-center transition-all duration-200">
                      <span className="text-lg leading-none">{mod.icon}</span>
                      <span className="text-[7px] font-bold text-foreground mt-0.5 leading-tight text-center px-1 truncate w-full">
                        {pick(mod.label, mod.label_en)}
                      </span>
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      <span className="text-[9px] bg-foreground text-background px-2 py-1 rounded-md font-medium shadow-lg">
                        {pick("Clic para explorar", "Click to explore")}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-dashed border-primary/15 bg-primary/[0.02] max-w-md mx-auto">
              <span className="text-[10px]">🔗</span>
              <p className="text-[9px] font-medium text-muted-foreground">
                {pick("Módulos nativamente integrados · Clic en cualquier módulo para explorar", "Natively integrated modules · Click any module to explore")}
              </p>
            </div>
          </motion.div>
        ) : selectedModule && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              {pick("Volver al sistema solar", "Back to solar system")}
            </button>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/[0.02] border mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[hsl(340,70%,30%)] flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                <span className="text-2xl">{selectedModule.icon}</span>
              </div>
              <div>
                <h5 className="text-base font-bold text-foreground">{pick(selectedModule.label, selectedModule.label_en)}</h5>
                <p className="text-xs text-muted-foreground">{pick(selectedModule.description, selectedModule.description_en)}</p>
              </div>
            </div>

            {selectedModule.subModules && (
              <div className="mb-5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  {pick("Sub-módulos incluidos", "Included sub-modules")}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedModule.subModules.map((sub, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border bg-card"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <p className="text-[11px] font-medium text-foreground">{pick(sub.name, sub.name_en)}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {selectedModule.extras && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  {pick("Cores Independientes", "Independent Cores")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.extras.map((ex, i) => (
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default SafEcosystem;
