import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import {
  Database, Settings2, ShieldCheck, FileOutput, Archive,
  ChevronDown, CheckCircle2, ArrowRight, BarChart3,
  Clock, Zap, RefreshCw, FileSearch
} from "lucide-react";

interface FlowStep {
  icon: React.ElementType;
  label: string;
  label_en: string;
  desc: string;
  desc_en: string;
  color: string;
}

interface CaseGroup {
  title: string;
  title_en: string;
  items: string[];
  items_en: string[];
}

const flowSteps: FlowStep[] = [
  {
    icon: Database,
    label: "Entradas",
    label_en: "Inputs",
    desc: "Conectamos core, contabilidad y tesorería",
    desc_en: "We connect core, accounting and treasury",
    color: "blue-500",
  },
  {
    icon: Settings2,
    label: "Mapeo",
    label_en: "Mapping",
    desc: "Alineamos campos a la plantilla elegida (Sysde/Cliente)",
    desc_en: "We align fields to the chosen template (Sysde/Client)",
    color: "violet-500",
  },
  {
    icon: ShieldCheck,
    label: "Validaciones",
    label_en: "Validations",
    desc: "Reglas y umbrales configurables",
    desc_en: "Configurable rules and thresholds",
    color: "amber-500",
  },
  {
    icon: FileOutput,
    label: "Generación",
    label_en: "Generation",
    desc: "Archivo en el layout requerido",
    desc_en: "File in the required layout",
    color: "emerald-500",
  },
  {
    icon: Archive,
    label: "Evidencias",
    label_en: "Evidence",
    desc: "Repositorio histórico auditable y trazable",
    desc_en: "Auditable and traceable historical repository",
    color: "primary",
  },
];

const caseGroups: CaseGroup[] = [
  {
    title: "Reportes cambiarios",
    title_en: "Foreign exchange reports",
    items: ["Posición en moneda extranjera", "ACME/ACLME Banxico"],
    items_en: ["Foreign currency position", "ACME/ACLME Banxico"],
  },
  {
    title: "Familia regulatoria",
    title_en: "Regulatory family",
    items: ["Familia CNBV", "Mercado de valores y cambiario", "Cumplimiento y fiscalización"],
    items_en: ["CNBV family", "Securities and exchange market", "Compliance and audit"],
  },
  {
    title: "Comités y corporativo",
    title_en: "Committees & corporate",
    items: ["Comités internos (ALCO, Riesgo, Dirección)", "Ad-hoc corporativo", "Entre otros"],
    items_en: ["Internal committees (ALCO, Risk, Board)", "Ad-hoc corporate", "Among others"],
  },
];

const benefits = [
  { icon: CheckCircle2, text: "Cumplimiento sin fricción y auditorías sin sorpresas", text_en: "Frictionless compliance and no-surprise audits" },
  { icon: Clock, text: "Menos horas operativas, menos reprocesos", text_en: "Fewer operational hours, fewer reprocesses" },
  { icon: FileSearch, text: "Trazabilidad total: bitácoras, métricas y evidencias de envío", text_en: "Full traceability: logs, metrics and delivery evidence" },
  { icon: RefreshCw, text: "Evoluciona contigo: actualizaciones ante cambios normativos", text_en: "Evolves with you: updates for regulatory changes" },
];

const stepColorMap: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  "blue-500": { bg: "bg-blue-500/10", text: "text-blue-500", dot: "bg-blue-500", border: "border-blue-500/25" },
  "violet-500": { bg: "bg-violet-500/10", text: "text-violet-500", dot: "bg-violet-500", border: "border-violet-500/25" },
  "amber-500": { bg: "bg-amber-500/10", text: "text-amber-500", dot: "bg-amber-500", border: "border-amber-500/25" },
  "emerald-500": { bg: "bg-emerald-500/10", text: "text-emerald-500", dot: "bg-emerald-500", border: "border-emerald-500/25" },
  "primary": { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary", border: "border-primary/25" },
};

const InteractiveExtractor = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [view, setView] = useState<"flow" | "cases" | "benefits">("flow");

  return (
    <div className="space-y-5 mt-4">
      {/* Header badge */}
      <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-primary/10 border border-primary/20 mx-auto w-fit">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold text-primary">
          {pick("Un extractor. Todos tus reportes.", "One extractor. All your reports.")}
        </span>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border">
        {[
          { key: "flow" as const, icon: ArrowRight, label: pick("¿Cómo funciona?", "How it works?") },
          { key: "cases" as const, icon: BarChart3, label: pick("Casos", "Cases") },
          { key: "benefits" as const, icon: CheckCircle2, label: pick("Beneficios", "Benefits") },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all ${
              view === tab.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === "flow" && (
          <motion.div
            key="flow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-3"
          >
            {/* Flow pipeline */}
            <div className="relative">
              <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-border" />
              <div className="space-y-2.5">
                {flowSteps.map((step, i) => {
                  const isOpen = activeStep === i;
                  const Icon = step.icon;
                  const c = stepColorMap[step.color];

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative pl-10"
                    >
                      <div className={`absolute left-2.5 top-3 w-3 h-3 rounded-full ${c.dot} ring-2 ring-background z-10`} />

                      <button
                        onClick={() => setActiveStep(isOpen ? null : i)}
                        className={`w-full rounded-xl border p-3 flex items-center gap-3 transition-all hover:shadow-md cursor-pointer ${
                          isOpen ? `${c.bg} ${c.border}` : "bg-card border-border"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-[13px] font-bold text-foreground">{pick(step.label, step.label_en)}</p>
                        </div>
                        {i < flowSteps.length - 1 && (
                          <ArrowRight className={`w-3.5 h-3.5 ${c.text} shrink-0`} />
                        )}
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
                            <div className="px-4 py-2.5 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <p className="text-xs text-foreground leading-relaxed">
                                {pick(step.desc, step.desc_en)}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {view === "cases" && (
          <motion.div
            key="cases"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            {caseGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border bg-card p-3.5"
              >
                <p className="text-[13px] font-bold text-foreground mb-2">{pick(group.title, group.title_en)}</p>
                <div className="space-y-1.5">
                  {pick(group.items, group.items_en).map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {view === "benefits" && (
          <motion.div
            key="benefits"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-2.5"
          >
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border bg-card p-3.5 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-xs text-foreground leading-relaxed pt-1.5">
                    {pick(b.text, b.text_en)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveExtractor;
