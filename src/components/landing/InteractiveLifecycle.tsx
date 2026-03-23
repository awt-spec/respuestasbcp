import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import {
  FileText, Search, CheckCircle, Stamp, Banknote, Settings,
  Package, CreditCard, BookOpen, Flag, X, ChevronDown, Layers, Calculator, Shield, Users, BarChart3, Bell, Globe
} from "lucide-react";

interface Phase {
  icon: React.ElementType;
  label: string;
  label_en: string;
  color: string;
  border: string;
  bg: string;
  details: string[];
  details_en: string[];
}

interface FunctionalModule {
  icon: React.ElementType;
  name: string;
  name_en: string;
  capabilities: string[];
  capabilities_en: string[];
  color: string;
}

const phases: Phase[] = [
  {
    icon: FileText, label: "Originación", label_en: "Origination",
    color: "text-blue-500", border: "border-blue-500/30", bg: "from-blue-500/15 to-blue-500/5",
    details: ["Captura de solicitud", "Datos de cliente y activo", "Simulación de condiciones", "Propuesta comercial"],
    details_en: ["Application capture", "Client & asset data", "Condition simulation", "Commercial proposal"],
  },
  {
    icon: Search, label: "Evaluación Crediticia", label_en: "Credit Evaluation",
    color: "text-cyan-500", border: "border-cyan-500/30", bg: "from-cyan-500/15 to-cyan-500/5",
    details: ["Integración con burós", "Scoring interno", "Análisis de capacidad de pago", "Validación de garantías"],
    details_en: ["Bureau integration", "Internal scoring", "Payment capacity analysis", "Collateral validation"],
  },
  {
    icon: CheckCircle, label: "Aprobación", label_en: "Approval",
    color: "text-emerald-500", border: "border-emerald-500/30", bg: "from-emerald-500/15 to-emerald-500/5",
    details: ["Flujos parametrizables por monto", "Tipo de activo y nivel jerárquico", "Comité de crédito digital", "Condiciones de aprobación"],
    details_en: ["Amount-based parametric flows", "Asset type & hierarchy level", "Digital credit committee", "Approval conditions"],
  },
  {
    icon: Stamp, label: "Formalización", label_en: "Formalization",
    color: "text-violet-500", border: "border-violet-500/30", bg: "from-violet-500/15 to-violet-500/5",
    details: ["Generación de contratos", "Pagarés y documentos legales", "Firma electrónica", "Gestión documental"],
    details_en: ["Contract generation", "Promissory notes & legal docs", "Electronic signature", "Document management"],
  },
  {
    icon: Banknote, label: "Desembolso", label_en: "Disbursement",
    color: "text-green-500", border: "border-green-500/30", bg: "from-green-500/15 to-green-500/5",
    details: ["Autorización y ejecución", "Integración con sistemas de pago", "Registro contable automático", "Notificación al cliente"],
    details_en: ["Authorization & execution", "Payment system integration", "Automatic accounting entry", "Client notification"],
  },
  {
    icon: Settings, label: "Administración", label_en: "Administration",
    color: "text-amber-500", border: "border-amber-500/30", bg: "from-amber-500/15 to-amber-500/5",
    details: ["Cuotas y facturación", "Ajustes de tasa", "Restructuraciones", "Cesiones y novaciones"],
    details_en: ["Installments & billing", "Rate adjustments", "Restructuring", "Assignments & novations"],
  },
  {
    icon: Package, label: "Gestión de Activos", label_en: "Asset Management",
    color: "text-orange-500", border: "border-orange-500/30", bg: "from-orange-500/15 to-orange-500/5",
    details: ["Registro y valuaciones", "Depreciación automática", "Seguros y garantías", "Inspecciones periódicas"],
    details_en: ["Registration & valuations", "Automatic depreciation", "Insurance & warranties", "Periodic inspections"],
  },
  {
    icon: CreditCard, label: "Cobro", label_en: "Collection",
    color: "text-rose-500", border: "border-rose-500/30", bg: "from-rose-500/15 to-rose-500/5",
    details: ["Aplicación de pagos", "Gestión de mora", "Intereses moratorios", "Alertas automáticas"],
    details_en: ["Payment application", "Delinquency management", "Late interest", "Automatic alerts"],
  },
  {
    icon: BookOpen, label: "Contabilidad", label_en: "Accounting",
    color: "text-indigo-500", border: "border-indigo-500/30", bg: "from-indigo-500/15 to-indigo-500/5",
    details: ["Asientos automáticos NIIF/IFRS 16", "Conciliación", "Cierre contable", "Reportes regulatorios"],
    details_en: ["Automatic IFRS 16 entries", "Reconciliation", "Accounting close", "Regulatory reports"],
  },
  {
    icon: Flag, label: "Finalización", label_en: "Finalization",
    color: "text-teal-500", border: "border-teal-500/30", bg: "from-teal-500/15 to-teal-500/5",
    details: ["Opción de compra", "Devolución del activo", "Renovación de contrato", "Terminación anticipada", "Trazabilidad de transferencia vehicular"],
    details_en: ["Purchase option", "Asset return", "Contract renewal", "Early termination", "Vehicle transfer traceability"],
  },
];

const functionalModules: FunctionalModule[] = [
  {
    icon: Calculator, name: "Motor de Cálculo", name_en: "Calculation Engine", color: "text-blue-500",
    capabilities: ["Tablas de amortización (francesa, alemana, americana, flat)", "Cálculo de valor residual", "Simulación de escenarios (TIR, VAN)", "Cálculos multi-moneda con tipo de cambio"],
    capabilities_en: ["Amortization tables (French, German, American, flat)", "Residual value calculation", "Scenario simulation (IRR, NPV)", "Multi-currency calculations with exchange rates"],
  },
  {
    icon: Shield, name: "Seguros y Siniestros", name_en: "Insurance & Claims", color: "text-emerald-500",
    capabilities: ["Registro de pólizas por activo", "Alertas de vencimiento y renovación", "Flujo de reclamo ante aseguradora", "Cierre anticipado por pérdida total"],
    capabilities_en: ["Policy registration per asset", "Expiration & renewal alerts", "Insurance claim flow", "Early closure for total loss"],
  },
  {
    icon: Globe, name: "Regulatorio y Fiscal", name_en: "Regulatory & Fiscal", color: "text-violet-500",
    capabilities: ["Adaptación normativa por jurisdicción", "IVA, ISR e impuestos locales", "Facturación electrónica", "Reportes para superintendencias"],
    capabilities_en: ["Regulatory adaptation per jurisdiction", "VAT, income tax & local taxes", "Electronic invoicing", "Reports for superintendencies"],
  },
  {
    icon: Users, name: "Gestión de Clientes", name_en: "Client Management", color: "text-amber-500",
    capabilities: ["Ficha integral del cliente", "Documentos KYC/AML", "Historial de operaciones", "Vinculación de garantes y codeudores"],
    capabilities_en: ["Comprehensive client file", "KYC/AML documents", "Operations history", "Guarantor & co-debtor linking"],
  },
  {
    icon: BarChart3, name: "Reportería y BI", name_en: "Reporting & BI", color: "text-rose-500",
    capabilities: ["Reportes operativos y gerenciales", "Reportes regulatorios por país", "Exportación a formatos estándar", "Dashboards de cartera en tiempo real"],
    capabilities_en: ["Operational & managerial reports", "Regulatory reports per country", "Standard format export", "Real-time portfolio dashboards"],
  },
  {
    icon: Bell, name: "Notificaciones y Alertas", name_en: "Notifications & Alerts", color: "text-cyan-500",
    capabilities: ["Alertas de vencimiento de cuotas", "Notificaciones de mora", "Avisos de renovación de seguros", "Alertas regulatorias configurables"],
    capabilities_en: ["Installment due alerts", "Delinquency notifications", "Insurance renewal notices", "Configurable regulatory alerts"],
  },
];

const InteractiveLifecycle = () => {
  const { lang } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);
  const [showModules, setShowModules] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const pick = <T,>(es: T, en: T): T => (lang === "en" ? en : es);

  return (
    <div className="space-y-5">
      {/* Lifecycle phases */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary to-primary/50" />
          {pick("Ciclo de Vida — Click para ver detalle", "Lifecycle — Click for details")}
        </h4>
        <p className="text-[11px] text-muted-foreground mb-5">
          {pick("Seleccione una fase para ver las funcionalidades incluidas", "Select a phase to view included functionalities")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            const isSelected = selected === i;
            return (
              <motion.button
                key={i}
                onClick={() => setSelected(isSelected ? null : i)}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border cursor-pointer transition-all text-center
                  ${isSelected
                    ? `bg-gradient-to-br ${phase.bg} ${phase.border} shadow-lg ring-2 ring-offset-2 ring-offset-background ${phase.border}`
                    : "bg-card border-border hover:border-primary/30 hover:shadow-md"
                  }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={`absolute -top-2 -left-2 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center
                  ${isSelected ? `bg-gradient-to-br ${phase.bg} ${phase.color} border ${phase.border}` : "bg-muted text-muted-foreground border border-border"}`}>
                  {i + 1}
                </span>
                <Icon className={`w-6 h-6 ${isSelected ? phase.color : "text-muted-foreground"} transition-colors`} />
                <span className={`text-[11px] font-bold leading-tight ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                  {pick(phase.label, phase.label_en)}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selected !== null && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 25 }}
              className={`rounded-2xl border ${phases[selected].border} bg-gradient-to-br ${phases[selected].bg} p-5 overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {(() => { const Icon = phases[selected].icon; return <Icon className={`w-5 h-5 ${phases[selected].color}`} />; })()}
                  <h5 className="text-sm font-bold text-foreground">
                    {pick(phases[selected].label, phases[selected].label_en)}
                  </h5>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${phases[selected].border} ${phases[selected].color}`}>
                    {pick("Fase", "Phase")} {selected + 1}/10
                  </span>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pick(phases[selected].details, phases[selected].details_en).map((detail, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.05 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/60 border border-border/50"
                  >
                    <CheckCircle className={`w-3.5 h-3.5 ${phases[selected].color} shrink-0`} />
                    <span className="text-[12px] text-foreground">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Functional modules map */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => { setShowModules(!showModules); setExpandedModule(null); }}
          className="w-full flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">
              {pick("Mapa de Módulos Funcionales", "Functional Module Map")}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {pick("Módulos transversales que complementan el ciclo de vida", "Cross-cutting modules complementing the lifecycle")}
            </p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
            {functionalModules.length} {pick("módulos", "modules")}
          </span>
          <motion.div animate={{ rotate: showModules ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showModules && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {functionalModules.map((mod, i) => {
                  const ModIcon = mod.icon;
                  const isOpen = expandedModule === i;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <button
                        onClick={() => setExpandedModule(isOpen ? null : i)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                          isOpen ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-card border-border hover:bg-muted/30"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <ModIcon className={`w-4 h-4 ${mod.color}`} />
                        </div>
                        <p className="text-[13px] font-bold text-foreground flex-1 text-left">{pick(mod.name, mod.name_en)}</p>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
                          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 py-2 space-y-1">
                              {pick(mod.capabilities, mod.capabilities_en).map((cap, j) => (
                                <div key={j} className="flex items-center gap-2">
                                  <CheckCircle className={`w-3 h-3 ${mod.color} shrink-0`} />
                                  <span className="text-[11px] text-muted-foreground">{cap}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractiveLifecycle;
