import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiagramBlock, QuestionItem } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, BarChart3, Users, MapPin, Layers, Briefcase, PiggyBank, TrendingUp } from "lucide-react";
import ReferencesSection from "./ReferencesSection";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/contexts/I18nContext";
import SafEcosystem from "./SafEcosystem";
import SysdeStats from "./SysdeStats";

/* ─── Diagram Renderers ─── */

const FlowDiagram = ({ block }: { block: DiagramBlock }) => (
  <div>
    {block.title && <h4 className="text-xs font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="flex flex-wrap gap-3">
      {block.steps?.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-card border shadow-sm">
            <span className="text-lg shrink-0">{step.icon || "▸"}</span>
            <div>
              <p className="text-[11px] font-bold text-foreground">{step.label}</p>
              <p className="text-[10px] text-muted-foreground">{step.description}</p>
            </div>
          </div>
          {i < (block.steps?.length ?? 0) - 1 && (
            <span className="text-primary font-bold text-sm">→</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const TableDiagram = ({ block }: { block: DiagramBlock }) => (
  <div>
    {block.title && <h4 className="text-xs font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-primary/5">
            {block.headers?.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-bold text-foreground text-[11px]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows?.map((row, i) => (
            <tr key={i} className="border-t hover:bg-muted/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-muted-foreground text-[11px]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GridDiagram = ({ block }: { block: DiagramBlock }) => {
  const iconMap: Record<string, React.ElementType> = {
    "34+": BarChart3,
    "ISO": CheckCircle2,
    "Relaciones": Users,
    "Presencia": MapPin,
    "878": Users,
    "Crecimiento": BarChart3,
  };

  const getIcon = (text: string) => {
    for (const key of Object.keys(iconMap)) {
      if (text.includes(key)) return iconMap[key];
    }
    return Layers;
  };

  const cardStyles = [
    { bg: "bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent", border: "border-primary/20", icon: "text-primary bg-primary/10", glow: "shadow-primary/5" },
    { bg: "bg-gradient-to-br from-emerald-500/[0.08] via-emerald-500/[0.04] to-transparent", border: "border-emerald-500/20", icon: "text-emerald-500 bg-emerald-500/10", glow: "shadow-emerald-500/5" },
    { bg: "bg-gradient-to-br from-blue-500/[0.08] via-blue-500/[0.04] to-transparent", border: "border-blue-500/20", icon: "text-blue-500 bg-blue-500/10", glow: "shadow-blue-500/5" },
    { bg: "bg-gradient-to-br from-amber-500/[0.08] via-amber-500/[0.04] to-transparent", border: "border-amber-500/20", icon: "text-amber-500 bg-amber-500/10", glow: "shadow-amber-500/5" },
    { bg: "bg-gradient-to-br from-violet-500/[0.08] via-violet-500/[0.04] to-transparent", border: "border-violet-500/20", icon: "text-violet-500 bg-violet-500/10", glow: "shadow-violet-500/5" },
    { bg: "bg-gradient-to-br from-rose-500/[0.08] via-rose-500/[0.04] to-transparent", border: "border-rose-500/20", icon: "text-rose-500 bg-rose-500/10", glow: "shadow-rose-500/5" },
  ];

  return (
    <div>
      {block.title && (
        <h4 className="text-sm font-bold text-foreground mb-5 flex items-center gap-2">
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary to-primary/50" />
          {block.title}
        </h4>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {block.items?.map((item, i) => {
          const Icon = getIcon(item);
          const style = cardStyles[i % cardStyles.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className={`group relative p-5 rounded-2xl ${style.bg} border ${style.border} shadow-lg ${style.glow} cursor-default transition-all hover:shadow-xl overflow-hidden`}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-bl from-foreground/[0.03] to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-10 h-10 rounded-xl ${style.icon} flex items-center justify-center mb-3 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-[13px] text-foreground font-bold leading-snug relative z-10">
                {item}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const ListDiagram = ({ block }: { block: DiagramBlock }) => (
  <div>
    {block.title && <h4 className="text-xs font-bold text-foreground mb-3">{block.title}</h4>}
    <ul className="space-y-1.5">
      {block.items?.map((item, i) => (
        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
          <span className="text-primary mt-0.5 font-bold">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const renderDiagram = (block: DiagramBlock, idx: number) => {
  const key = `${block.type}-${idx}`;
  switch (block.type) {
    case "flow": return <FlowDiagram key={key} block={block} />;
    case "grid": return <GridDiagram key={key} block={block} />;
    case "table": return <TableDiagram key={key} block={block} />;
    case "list": return <ListDiagram key={key} block={block} />;
    default: return null;
  }
};

/* ─── Visual Sub-tabs for rich diagram sections ─── */
interface VisualSubTab {
  id: string;
  label: string;
  label_en?: string;
  icon: React.ElementType;
}

const visualSubTabs: VisualSubTab[] = [
  { id: "ecosystem", label: "Ecosistema SYSDE PLUS", label_en: "SYSDE PLUS Ecosystem", icon: Layers },
  { id: "trajectory", label: "Trayectoria SYSDE", label_en: "SYSDE Track Record", icon: BarChart3 },
  { id: "pension", label: "SYSDE PLUS Pensión", label_en: "SYSDE PLUS Pension", icon: Users },
];

const VisualDetailPanel = ({ diagrams }: { diagrams: DiagramBlock[] }) => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [activeVisualTab, setActiveVisualTab] = useState("ecosystem");

  const hasRichSections = diagrams.some((d) => d.type === "ecosystem" || d.type === "stats");
  const plainDiagrams = diagrams.filter((d) => d.type !== "ecosystem" && d.type !== "stats");

  if (!hasRichSections) {
    return (
      <div className="space-y-8">
        {diagrams.map((d, i) => renderDiagram(d, i))}
      </div>
    );
  }

  return (
    <div>
      {/* Sub-tab buttons */}
      <div className="flex flex-wrap gap-1.5 mb-6 p-1 rounded-xl bg-muted/40 border">
        {visualSubTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeVisualTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveVisualTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {pick(tab.label, tab.label_en)}
            </button>
          );
        })}
      </div>

      {/* Sub-tab content */}
      <AnimatePresence mode="wait">
        {activeVisualTab === "ecosystem" && (
          <motion.div key="eco" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <SafEcosystem />
          </motion.div>
        )}
        {activeVisualTab === "trajectory" && (
          <motion.div key="traj" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <SysdeStats section="trajectory" />
          </motion.div>
        )}
        {activeVisualTab === "pension" && (
          <motion.div key="pen" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <SysdeStats section="pension" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plain diagrams below */}
      {plainDiagrams.length > 0 && (
        <div className="space-y-8 mt-8">
          {plainDiagrams.map((d, i) => renderDiagram(d, i))}
        </div>
      )}
    </div>
  );
};

/* ─── References (imported component) ─── */

/* ─── Tab Button ─── */
interface TabDef {
  id: string;
  label: string;
  icon: React.ElementType;
}

/* ─── Main Card ─── */

interface Props {
  item: QuestionItem;
  index: number;
}

const DiagramCard = ({ item, index }: Props) => {
  const { lang, t } = useI18n();
  const [activeTab, setActiveTab] = useState<string>("response");

  const pick = <T,>(es: T, en?: T): T => {
    if (lang === "en") return en ?? es;
    return es;
  };

  const displayTitle = pick(item.title, item.title_en);
  const displaySubtitle = pick(item.subtitle, item.subtitle_en);
  const displayRequerimiento = pick(item.requerimiento, item.requerimiento_en);
  const displayRespuesta = pick(item.respuesta, item.respuesta_en);
  const displayValor = pick(item.valor, item.valor_en);
  const displayConsideraciones = pick(item.consideraciones, item.consideraciones_en);
  const displayDiagrams = pick(item.diagrams, item.diagrams_en);

  // Build tabs dynamically
  const tabs: TabDef[] = [
    { id: "response", label: t("card.response"), icon: MessageSquare },
  ];
  if (displayDiagrams.length > 0) {
    tabs.push({ id: "visual", label: t("card.diagrams"), icon: BarChart3 });
  }
  if (item.id === 3) {
    tabs.push({ id: "references", label: t("card.references"), icon: Users });
  }

  return (
    <motion.div
      data-question-id={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <AccordionItem
        value={`q-${item.id}`}
        className="rounded-2xl border bg-card shadow-sm overflow-hidden"
      >
        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 transition-colors">
          <div className="flex items-center gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-success" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-sm md:text-base">
                #{item.id} — {displayTitle}
              </span>
              {displaySubtitle && (
                <p className="text-xs text-muted-foreground mt-0.5 font-normal">{displaySubtitle}</p>
              )}
            </div>
            <Badge variant="outline" className="ml-auto shrink-0 text-xs bg-success/15 text-success border-success/30 hidden sm:inline-flex">
              {t("card.answered")}
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          {/* Consulta BCP */}
          <div className="mb-5 rounded-xl bg-muted/40 border p-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">📌 {t("card.requirement")}</p>
            <p className="text-xs text-foreground italic leading-relaxed">"{displayRequerimiento}"</p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-1.5 mb-5 p-1 rounded-xl bg-muted/40 border">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
              <motion.button
                  key={tab.id}
                  data-tab-id={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  animate={!isActive ? { scale: [1, 1.06, 1], y: [0, -3, 0] } : {}}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80 ring-1 ring-primary/20"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "response" && (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  {displayRespuesta.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-[13px] text-foreground leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                {item.id === 3 && (
                  <motion.button
                    onClick={() => setActiveTab("references")}
                    className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-bold hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Users className="w-4 h-4" />
                    {pick("Ver Referencias de Clientes", "View Client References")}
                  </motion.button>
                )}

                {item.id === 2 && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        Icon: Briefcase,
                        stat: pick("Líder", "Leader"),
                        label: pick("Leasing & Factoraje", "Leasing & Factoring"),
                        desc: pick("Posición líder en la región", "Leading position in the region"),
                        gradient: "from-blue-500/15 to-blue-500/5 border-blue-500/25",
                        iconColor: "text-blue-500",
                        statColor: "text-blue-600",
                      },
                      {
                        Icon: TrendingUp,
                        stat: "~30%",
                        label: pick("Microfinanzas", "Microfinance"),
                        desc: pick("del mercado en Latinoamérica", "of the market in Latin America"),
                        gradient: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25",
                        iconColor: "text-emerald-500",
                        statColor: "text-emerald-600",
                      },
                      {
                        Icon: PiggyBank,
                        stat: "~82%",
                        label: pick("Pensiones", "Pensions"),
                        desc: pick("de plataformas de pensiones en la región", "of pension platforms in the region"),
                        gradient: "from-violet-500/15 to-violet-500/5 border-violet-500/25",
                        iconColor: "text-violet-500",
                        statColor: "text-violet-600",
                      },
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.35 }}
                        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${card.gradient} p-5`}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />
                        <card.Icon className={`w-5 h-5 ${card.iconColor} mb-3`} />
                        <p className={`text-2xl font-extrabold ${card.statColor} tracking-tight`}>{card.stat}</p>
                        <p className="text-xs font-bold text-foreground mt-1">{card.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{card.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

              </motion.div>
            )}

            {activeTab === "visual" && (
              <motion.div
                key="visual"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <VisualDetailPanel diagrams={displayDiagrams} />
              </motion.div>
            )}

            {activeTab === "references" && (
              <motion.div
                key="references"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ReferencesSection />
              </motion.div>
            )}

          </AnimatePresence>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default DiagramCard;
