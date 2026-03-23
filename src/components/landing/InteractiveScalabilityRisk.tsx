import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import {
  Shield, TrendingUp, AlertTriangle, CheckCircle2, ChevronDown,
  Layers, Zap, Database, BarChart3, ArrowRight, Lock, RefreshCw,
  Server, Users, Gauge, Eye
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
    risk: "Crecimiento de cartera sin perder control",
    risk_en: "Portfolio growth without losing control",
    mitigation: "Arquitectura de microservicios sobre Azure con auto-scaling horizontal. Diseñada para gestionar +10,000 contratos simultáneos sin degradación de rendimiento. La plataforma soporta volúmenes como IVM (3M+ afiliados) y CMI (6 países) — muy superior a lo requerido para leasing.",
    mitigation_en: "Microservices architecture on Azure with horizontal auto-scaling. Designed to manage 10,000+ simultaneous contracts without performance degradation. Supports volumes like IVM (3M+ affiliates) and CMI (6 countries) — far exceeding leasing requirements.",
    icon: TrendingUp,
    severity: "critical",
  },
  {
    risk: "Equipos grandes y operación multi-área",
    risk_en: "Large teams & multi-area operation",
    mitigation: "Control de acceso granular por roles, segregación de funciones, workflows de aprobación escalonados y trazabilidad completa (usuario, fecha/hora, IP). Diseñado para que múltiples equipos operen simultáneamente sin conflictos.",
    mitigation_en: "Granular role-based access control, function segregation, escalated approval workflows, and complete traceability (user, timestamp, IP). Designed for multiple teams to operate simultaneously without conflicts.",
    icon: Users,
    severity: "critical",
  },
  {
    risk: "Cumplimiento regulatorio a escala",
    risk_en: "Regulatory compliance at scale",
    mitigation: "Contabilidad IFRS 16 automática, reportes parametrizables por superintendencia (SBS, SUGEF, SIB, CNBS, SSF), audit trail completo. El volumen de operaciones no compromete la precisión regulatoria.",
    mitigation_en: "Automatic IFRS 16 accounting, parameterizable reports per superintendency (SBS, SUGEF, SIB, CNBS, SSF), complete audit trail. Operation volume does not compromise regulatory precision.",
    icon: Shield,
    severity: "high",
  },
  {
    risk: "Visibilidad ejecutiva en tiempo real",
    risk_en: "Real-time executive visibility",
    mitigation: "Dashboards ejecutivos con KPIs en tiempo real (cartera activa, mora, originación, rentabilidad). A medida que la cartera crece, la visibilidad se mantiene total con reportería automatizada y alertas configurables.",
    mitigation_en: "Executive dashboards with real-time KPIs (active portfolio, arrears, origination, profitability). As the portfolio grows, visibility remains total with automated reporting and configurable alerts.",
    icon: Eye,
    severity: "high",
  },
  {
    risk: "Operación multi-producto y multi-moneda",
    risk_en: "Multi-product & multi-currency operation",
    mitigation: "Motor parametrizable que soporta leasing financiero, operativo, leaseback y créditos en múltiples monedas simultáneamente. La escala no limita la diversidad de productos.",
    mitigation_en: "Parameterizable engine supporting financial leasing, operating, leaseback, and credits in multiple simultaneous currencies. Scale does not limit product diversity.",
    icon: RefreshCw,
    severity: "high",
  },
];

const scalePhases: ScalePhase[] = [
  {
    label: "Cartera Actual",
    label_en: "Current Portfolio",
    desc: "Operación de leasing con volumen actual",
    desc_en: "Leasing operation at current volume",
    icon: Database,
    color: "blue-500",
    metrics: ["Contratos actuales de leasing", "Contabilidad IFRS 16 desde día 1", "Reportería regulatoria SBS", "Trazabilidad completa de operaciones"],
    metrics_en: ["Current leasing contracts", "IFRS 16 accounting from day 1", "SBS regulatory reporting", "Complete operations traceability"],
  },
  {
    label: "Crecimiento Controlado",
    label_en: "Controlled Growth",
    desc: "Expansión a +5,000 contratos con gobernanza",
    desc_en: "Expansion to 5,000+ contracts with governance",
    icon: TrendingUp,
    color: "emerald-500",
    metrics: ["Nuevos tipos de leasing (operativo, leaseback)", "Multi-moneda (PEN, USD)", "Workflows de aprobación para equipos grandes", "Dashboard ejecutivo en tiempo real"],
    metrics_en: ["New leasing types (operating, leaseback)", "Multi-currency (PEN, USD)", "Approval workflows for large teams", "Real-time executive dashboard"],
  },
  {
    label: "Escala Institucional",
    label_en: "Institutional Scale",
    desc: "+10,000 contratos simultáneos con control total",
    desc_en: "10,000+ simultaneous contracts with total control",
    icon: BarChart3,
    color: "violet-500",
    metrics: ["+10,000 contratos simultáneos", "Multi-sucursal con segregación de funciones", "Auto-scaling sin intervención manual", "Reportería automatizada a escala"],
    metrics_en: ["10,000+ simultaneous contracts", "Multi-branch with function segregation", "Auto-scaling without manual intervention", "Automated reporting at scale"],
  },
  {
    label: "Capacidad Comprobada",
    label_en: "Proven Capacity",
    desc: "Arquitectura probada en operaciones masivas",
    desc_en: "Architecture proven in massive operations",
    icon: Zap,
    color: "primary",
    metrics: ["IVM: 3M+ afiliados en producción", "CMI: 6 países simultáneos", "Dimensionamiento revisado anualmente", "Capacidad muy superior a lo requerido para leasing"],
    metrics_en: ["IVM: 3M+ affiliates in production", "CMI: 6 simultaneous countries", "Dimensioning reviewed annually", "Capacity far exceeding leasing requirements"],
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
      {/* Capacity badge */}
      <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-primary/10 border border-primary/20 mx-auto w-fit">
        <Server className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold text-primary">
          {pick("+10,000 contratos simultáneos", "10,000+ simultaneous contracts")}
        </span>
        <Gauge className="w-4 h-4 text-primary" />
      </div>

      {/* Toggle between views */}
      <div className="flex gap-2 p-1 rounded-xl bg-muted/50 border">
        <button
          onClick={() => setView("risk")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
            view === "risk" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Shield className="w-4 h-4" />
          {pick("Control a Escala", "Control at Scale")}
        </button>
        <button
          onClick={() => setView("scale")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
            view === "scale" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          {pick("Ruta de Crecimiento", "Growth Path")}
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
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/15">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {pick(
                  "Riesgos al escalar una operación de leasing a nivel institucional y cómo SYSDE PLUS los resuelve.",
                  "Risks when scaling a leasing operation to institutional level and how SYSDE PLUS addresses them."
                )}
              </p>
            </div>

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
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/15">
              <BarChart3 className="w-5 h-5 text-primary shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {pick(
                  "Ruta de crecimiento desde la cartera actual hasta capacidad institucional comprobada.",
                  "Growth path from current portfolio to proven institutional capacity."
                )}
              </p>
            </div>

            <div className="relative">
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
