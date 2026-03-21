import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import {
  FileText, Search, CheckCircle, Stamp, Banknote, Settings,
  Package, CreditCard, BookOpen, Flag, X
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
    details: ["Opción de compra", "Devolución del activo", "Renovación de contrato", "Terminación anticipada"],
    details_en: ["Purchase option", "Asset return", "Contract renewal", "Early termination"],
  },
];

const InteractiveLifecycle = () => {
  const { lang } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);
  const pick = <T,>(es: T, en: T): T => (lang === "en" ? en : es);

  return (
    <div>
      <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
        <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary to-primary/50" />
        {pick("Ciclo de Vida — Click para ver detalle", "Lifecycle — Click for details")}
      </h4>
      <p className="text-[11px] text-muted-foreground mb-5">
        {pick("Seleccione una fase para ver las funcionalidades incluidas", "Select a phase to view included functionalities")}
      </p>

      {/* Phase grid */}
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
              {/* Step number */}
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

      {/* Detail panel */}
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
  );
};

export default InteractiveLifecycle;
