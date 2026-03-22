import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Rocket, Brain, Globe, ChevronDown, MapPin, Cpu, Shield, Zap, BarChart3, Leaf, Link2, Handshake } from "lucide-react";

interface RoadmapItem {
  icon: React.ElementType;
  title: string;
  title_en: string;
  desc: string;
  desc_en: string;
  quarter?: string;
}

interface RoadmapYear {
  year: string;
  theme: string;
  theme_en: string;
  icon: React.ElementType;
  color: string;
  items: RoadmapItem[];
}

const roadmap: RoadmapYear[] = [
  {
    year: "2026",
    theme: "Consolidación, Automatización e IA",
    theme_en: "Consolidation, Automation & AI",
    icon: Rocket,
    color: "primary",
    items: [
      { icon: Cpu, title: "Motor de Decisión con IA", title_en: "AI Decision Engine", desc: "Pre-aprobación automática de operaciones de leasing con scoring inteligente, análisis de riesgo en tiempo real y modelos predictivos de comportamiento crediticio", desc_en: "Automatic pre-approval of leasing operations with intelligent scoring, real-time risk analysis and predictive credit behavior models", quarter: "Q1-Q4" },
      { icon: Zap, title: "Automatización RPA", title_en: "RPA Automation", desc: "Automatización de procesos operativos repetitivos (conciliaciones, notificaciones, generación de reportes)", desc_en: "Automation of repetitive operational processes (reconciliations, notifications, report generation)", quarter: "Q2-Q3" },
      { icon: MapPin, title: "Expansión Regulatoria", title_en: "Regulatory Expansion", desc: "Chile, Argentina y Nicaragua — configuración de marcos regulatorios, reportes para superintendencias locales y adaptación normativa", desc_en: "Chile, Argentina and Nicaragua — regulatory framework configuration, local superintendency reports and regulatory adaptation", quarter: "Q3-Q4" },
      { icon: Shield, title: "Ciberseguridad Avanzada", title_en: "Advanced Cybersecurity", desc: "Implementación de Zero Trust Architecture, detección de amenazas con IA y hardening de infraestructura", desc_en: "Zero Trust Architecture implementation, AI threat detection and infrastructure hardening", quarter: "Q3-Q4" },
      { icon: BarChart3, title: "Dashboards Ejecutivos con IA", title_en: "AI Executive Dashboards", desc: "Paneles de control inteligentes con insights automáticos, alertas predictivas y KPIs en tiempo real", desc_en: "Intelligent control panels with automatic insights, predictive alerts and real-time KPIs", quarter: "Q4" },
    ],
  },
  {
    year: "2027",
    theme: "Inteligencia Predictiva y Optimización",
    theme_en: "Predictive Intelligence & Optimization",
    icon: Brain,
    color: "emerald-500",
    items: [
      { icon: BarChart3, title: "Analytics Predictivo", title_en: "Predictive Analytics", desc: "Scoring comportamental para anticipar mora, modelos ML de riesgo crediticio avanzado", desc_en: "Behavioral scoring for arrears anticipation, advanced ML credit risk models", quarter: "Q1-Q2" },
      { icon: Shield, title: "Optimización de Portafolio", title_en: "Portfolio Optimization", desc: "Maximizar rentabilidad y minimizar riesgo con recomendaciones basadas en datos", desc_en: "Maximize profitability and minimize risk with data-driven recommendations", quarter: "Q2-Q3" },
      { icon: Leaf, title: "Leasing Verde / ESG", title_en: "Green Leasing / ESG", desc: "Tracking completo de impacto ambiental, etiquetado ESG de operaciones, reportes de sostenibilidad", desc_en: "Complete environmental impact tracking, ESG operation labeling, sustainability reports", quarter: "Q3-Q4" },
    ],
  },
  {
    year: "2028",
    theme: "Ecosistema Abierto y Nuevos Modelos",
    theme_en: "Open Ecosystem & New Models",
    icon: Globe,
    color: "violet-500",
    items: [
      { icon: Link2, title: "Tokenización de Activos", title_en: "Asset Tokenization", desc: "Exploración de blockchain para tokenización de activos de leasing", desc_en: "Blockchain exploration for leasing asset tokenization", quarter: "Q1-Q2" },
      { icon: Shield, title: "Smart Contracts", title_en: "Smart Contracts", desc: "Contratos inteligentes para ciertos tipos de operaciones de leasing", desc_en: "Smart contracts for certain types of leasing operations", quarter: "Q2-Q3" },
      { icon: Globe, title: "Expansión de Mercados", title_en: "Market Expansion", desc: "Nuevos mercados regulatorios en la región — adaptación normativa y reportes locales", desc_en: "New regulatory markets in the region — regulatory adaptation and local reports", quarter: "Q3-Q4" },
    ],
  },
];

const yearColors: Record<string, { bg: string; border: string; text: string; dot: string; badge: string }> = {
  "primary": { bg: "bg-primary/10", border: "border-primary/30", text: "text-primary", dot: "bg-primary", badge: "bg-primary text-primary-foreground" },
  "emerald-500": { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-500", dot: "bg-emerald-500", badge: "bg-emerald-500 text-white" },
  "violet-500": { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-500", dot: "bg-violet-500", badge: "bg-violet-500 text-white" },
};

const InteractiveRoadmap = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [expandedYear, setExpandedYear] = useState<string>("2026");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <div className="space-y-4 mt-4">
      {/* Modelo evolutivo header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-5 px-4 rounded-2xl bg-gradient-to-br from-primary/8 via-primary/4 to-transparent border border-primary/15 mb-2"
      >
        <Handshake className="w-8 h-8 text-primary mx-auto mb-3" />
        <h4 className="text-base font-bold text-foreground mb-1.5">
          {pick("Modelo Evolutivo Acordado", "Agreed Evolution Model")}
        </h4>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          {pick(
            "Las mejoras, ajustes regulatorios y nuevas funcionalidades se definen de mutuo acuerdo con cada cliente y se incorporan sin costo adicional ni impacto en la operación.",
            "Improvements, regulatory adjustments and new functionalities are mutually agreed with each client and incorporated at no additional cost without impacting operations."
          )}
        </p>
      </motion.div>

      <div className="text-center mb-4">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">
          {pick("Roadmap General de Referencia", "General Reference Roadmap")}
        </p>
        <h4 className="text-sm font-bold text-foreground">
          SYSDE PLUS <span className="text-primary">2026 — 2028</span>
        </h4>
      </div>

      {roadmap.map((yr) => {
        const colors = yearColors[yr.color];
        const isOpen = expandedYear === yr.year;
        const Icon = yr.icon;

        return (
          <motion.div
            key={yr.year}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => { setExpandedYear(isOpen ? "" : yr.year); setExpandedItem(null); }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                isOpen ? `${colors.bg} ${colors.border} shadow-md` : "bg-card border-border hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl ${colors.badge} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className={`text-xl font-extrabold ${isOpen ? colors.text : "text-foreground"}`}>{yr.year}</p>
                <p className="text-xs text-muted-foreground font-medium">{pick(yr.theme, yr.theme_en)}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${colors.badge}`}>
                {yr.items.length} {pick("iniciativas", "initiatives")}
              </span>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="relative pl-8 pt-3 pb-1 space-y-2">
                    <div className={`absolute left-[23px] top-3 bottom-1 w-0.5 ${colors.dot} opacity-20 rounded-full`} />

                    {yr.items.map((item, i) => {
                      const ItemIcon = item.icon;
                      const isItemOpen = expandedItem === i;

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <div className={`absolute left-[19px] w-2.5 h-2.5 rounded-full ${colors.dot} border-2 border-background`} style={{ marginTop: 14 }} />

                          <button
                            onClick={() => setExpandedItem(isItemOpen ? null : i)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                              isItemOpen ? `${colors.bg} ${colors.border}` : "bg-card border-transparent hover:bg-muted/30"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                              <ItemIcon className={`w-4 h-4 ${colors.text}`} />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-[13px] font-bold text-foreground">{pick(item.title, item.title_en)}</p>
                            </div>
                            {item.quarter && (
                              <span className="text-[10px] font-semibold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                                {item.quarter}
                              </span>
                            )}
                            <motion.div animate={{ rotate: isItemOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
                              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {isItemOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 py-2.5 ml-11">
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    {pick(item.desc, item.desc_en)}
                                  </p>
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
        );
      })}

      {/* Note */}
      <div className="rounded-xl bg-muted/30 border p-4 mt-4">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">📋 {pick("Modelo de Trabajo", "Working Model")}:</span>{" "}
          {pick(
            "Este roadmap es la base general de evolución de SYSDE PLUS. Para BCP se construye un plan específico, acordado de mutuo acuerdo, donde las prioridades se alinean a la operación y necesidades regulatorias de la institución. Las mejoras se implementan sin afectar la operación en producción.",
            "This roadmap is the general evolution base for SYSDE PLUS. For BCP, a specific plan is built, mutually agreed, where priorities align with the institution's operations and regulatory needs. Improvements are implemented without affecting production operations."
          )}
        </p>
      </div>
    </div>
  );
};

export default InteractiveRoadmap;
