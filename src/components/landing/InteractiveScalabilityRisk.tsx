import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import {
  Shield, TrendingUp, AlertTriangle, CheckCircle2, ChevronDown,
  Layers, Zap, Database, BarChart3, ArrowRight, Lock, RefreshCw
} from "lucide-react";

interface RiskItem {
  risk: string;
  risk_en: string;
  mitigation: string;
  mitigation_en: string;
  icon: React.ElementType;
  severity: "high" | "medium" | "critical";
}

interface ScalePhase {
  label: string;
  label_en: string;
  desc: string;
  desc_en: string;
  icon: React.ElementType;
  color: string;
  metrics: string[];
  metrics_en: string[];
}

const risks: RiskItem[] = [
  {
    risk: "Fragmentación operativa",
    risk_en: "Operational fragmentation",
    mitigation: "Plataforma unificada E2E que elimina re-digitación y errores entre sistemas. Vista 360° del cliente en tiempo real.",
    mitigation_en: "Unified E2E platform eliminating re-entry and cross-system errors. Real-time 360° client view.",
    icon: Layers,
    severity: "critical",
  },
  {
    risk: "Incumplimiento regulatorio",
    risk_en: "Regulatory non-compliance",
    mitigation: "Contabilidad IFRS 16 automática, reportes parametrizables por jurisdicción (SBS, SUGEF, SIB, CNBS), trazabilidad completa.",
    mitigation_en: "Automatic IFRS 16 accounting, parameterizable reports by jurisdiction (SBS, SUGEF, SIB, CNBS), complete traceability.",
    icon: Shield,
    severity: "critical",
  },
  {
    risk: "Crecimiento sin infraestructura",
    risk_en: "Growth without infrastructure",
    mitigation: "Microservicios sobre Azure con auto-scaling horizontal. Dimensionamiento revisado anualmente por cliente.",
    mitigation_en: "Microservices on Azure with horizontal auto-scaling. Dimensioning reviewed annually per client.",
    icon: TrendingUp,
    severity: "high",
  },
  {
    risk: "Integración con sistemas existentes",
    risk_en: "Integration with existing systems",
    mitigation: "+450 APIs REST documentadas. Integración comprobada con SAP, cores bancarios, SINPE, y sistemas AML.",
    mitigation_en: "+450 documented REST APIs. Proven integration with SAP, banking cores, SINPE, and AML systems.",
    icon: RefreshCw,
    severity: "high",
  },
  {
    risk: "Seguridad y acceso",
    risk_en: "Security & access",
    mitigation: "Segregación de funciones por roles, audit trail completo (usuario, fecha/hora, IP), cifrado en tránsito y reposo.",
    mitigation_en: "Role-based function segregation, complete audit trail (user, timestamp, IP), encryption in transit and at rest.",
    icon: Lock,
    severity: "medium",
  },
];

const scalePhases: ScalePhase[] = [
  {
    label: "Fase 1: Piloto",
    label_en: "Phase 1: Pilot",
    desc: "Implementación inicial con volumen controlado",
    desc_en: "Initial implementation with controlled volume",
    icon: Database,
    color: "blue-500",
    metrics: ["~500 contratos", "1 país", "1 moneda", "Validación de procesos"],
    metrics_en: ["~500 contracts", "1 country", "1 currency", "Process validation"],
  },
  {
    label: "Fase 2: Expansión",
    label_en: "Phase 2: Expansion",
    desc: "Crecimiento en volumen y complejidad",
    desc_en: "Growth in volume and complexity",
    icon: TrendingUp,
    color: "emerald-500",
    metrics: ["5,000+ contratos", "Multi-sucursal", "Multi-moneda", "Integraciones SAP/Core"],
    metrics_en: ["5,000+ contracts", "Multi-branch", "Multi-currency", "SAP/Core integrations"],
  },
  {
    label: "Fase 3: Multi-país",
    label_en: "Phase 3: Multi-country",
    desc: "Operación regional centralizada",
    desc_en: "Centralized regional operation",
    icon: BarChart3,
    color: "violet-500",
    metrics: ["50,000+ contratos", "6+ países", "Múltiples regulaciones", "CMI: caso real"],
    metrics_en: ["50,000+ contracts", "6+ countries", "Multiple regulations", "CMI: real case"],
  },
  {
    label: "Fase 4: Escala Total",
    label_en: "Phase 4: Full Scale",
    desc: "Volúmenes masivos comprobados en producción",
    desc_en: "Massive volumes proven in production",
    icon: Zap,
    color: "primary",
    metrics: ["Millones de registros", "Auto-scaling", "IVM: 3M+ afiliados", "Revisión anual"],
    metrics_en: ["Millions of records", "Auto-scaling", "IVM: 3M+ affiliates", "Annual review"],
  },
];

const severityConfig = {
  critical: { bg: "bg-red-500/10", border: "border-red-500/25", text: "text-red-500", label: "Crítico", label_en: "Critical" },
  high: { bg: "bg-amber-500/10", border: "border-amber-500/25", text: "text-amber-500", label: "Alto", label_en: "High" },
  medium: { bg: "bg-blue-500/10", border: "border-blue-500/25", text: "text-blue-500", label: "Medio", label_en: "Medium" },
};

const phaseColorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  "blue-500": { bg: "bg-blue-500/10", border: "border-blue-500/25", text: "text-blue-500", dot: "bg-blue-500" },
  "emerald-500": { bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-500", dot: "bg-emerald-500" },
  "violet-500": { bg: "bg-violet-500/10", border: "border-violet-500/25", text: "text-violet-500", dot: "bg-violet-500" },
  "primary": { bg: "bg-primary/10", border: "border-primary/25", text: "text-primary", dot: "bg-primary" },
};

const InteractiveScalabilityRisk = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [view, setView] = useState<"risk" | "scale">("risk");

  return (
    <div className="space-y-5 mt-4">
      {/* Toggle between views */}
      <div className="flex gap-2 p-1 rounded-xl bg-muted/50 border">
        <button
          onClick={() => setView("risk")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
            view === "risk" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Shield className="w-4 h-4" />
          {pick("Mitigación de Riesgos", "Risk Mitigation")}
        </button>
        <button
          onClick={() => setView("scale")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
            view === "scale" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          {pick("Ruta de Escalabilidad", "Scalability Path")}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {view === "risk" ? (
          <motion.div
            key="risk"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-3"
          >
            {/* Risk header */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/15">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {pick(
                  "Riesgos identificados en implementaciones de leasing bancario y cómo SYSDE PLUS los mitiga.",
                  "Risks identified in bank leasing implementations and how SYSDE PLUS mitigates them."
                )}
              </p>
            </div>

            {/* Risk cards */}
            {risks.map((r, i) => {
              const isOpen = expandedRisk === i;
              const sev = severityConfig[r.severity];
              const Icon = r.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => setExpandedRisk(isOpen ? null : i)}
                    className={`w-full rounded-xl border p-3.5 flex items-center gap-3 transition-all hover:shadow-md cursor-pointer ${
                      isOpen ? `${sev.bg} ${sev.border}` : "bg-card border-border"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${sev.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${sev.text}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[13px] font-bold text-foreground leading-snug">
                        {pick(r.risk, r.risk_en)}
                      </p>
                      <span className={`text-[10px] font-bold ${sev.text}`}>
                        {pick(sev.label, sev.label_en)}
                      </span>
                    </div>
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
                        <div className="px-4 py-3 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-foreground leading-relaxed">
                            {pick(r.mitigation, r.mitigation_en)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="scale"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            {/* Scale header */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/15">
              <BarChart3 className="w-5 h-5 text-primary shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {pick(
                  "Ruta comprobada de escalabilidad desde piloto hasta operación multi-país.",
                  "Proven scalability path from pilot to multi-country operation."
                )}
              </p>
            </div>

            {/* Phase timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-border" />

              <div className="space-y-3">
                {scalePhases.map((phase, i) => {
                  const isOpen = activePhase === i;
                  const Icon = phase.icon;
                  const c = phaseColorMap[phase.color];

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative pl-10"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-2.5 top-3.5 w-3 h-3 rounded-full ${c.dot} ring-2 ring-background z-10`} />

                      <button
                        onClick={() => setActivePhase(isOpen ? null : i)}
                        className={`w-full rounded-xl border p-3.5 flex items-center gap-3 transition-all hover:shadow-md cursor-pointer ${
                          isOpen ? `${c.bg} ${c.border}` : "bg-card border-border"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${c.text}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-[13px] font-bold text-foreground">{pick(phase.label, phase.label_en)}</p>
                          <p className="text-[10px] text-muted-foreground">{pick(phase.desc, phase.desc_en)}</p>
                        </div>
                        {i < scalePhases.length - 1 && (
                          <ArrowRight className={`w-4 h-4 ${c.text} shrink-0`} />
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
                            <div className="px-4 py-3 space-y-1.5">
                              {pick(phase.metrics, phase.metrics_en).map((m, j) => (
                                <motion.div
                                  key={j}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.04 }}
                                  className="flex items-center gap-2 text-xs text-foreground"
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                  <span>{m}</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveScalabilityRisk;
