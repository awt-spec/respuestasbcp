import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiagramBlock, QuestionItem } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, BarChart3, Lightbulb, Target } from "lucide-react";
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

const GridDiagram = ({ block }: { block: DiagramBlock }) => (
  <div>
    {block.title && <h4 className="text-xs font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {block.items?.map((item, i) => (
        <div key={i} className="p-3 rounded-xl bg-card border text-xs text-foreground font-medium shadow-sm">
          {item}
        </div>
      ))}
    </div>
  </div>
);

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
    case "ecosystem": return <SafEcosystem key={key} />;
    case "stats": return <SysdeStats key={key} />;
    default: return null;
  }
};

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
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
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
                <div className="space-y-8">
                  {displayDiagrams.map((d, i) => renderDiagram(d, i))}
                </div>
              </motion.div>
            )}

            {activeTab === "tech" && displayConsideraciones && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="rounded-xl bg-muted/30 border p-5">
                  <p className="text-[13px] text-foreground leading-relaxed">{displayConsideraciones}</p>
                </div>
              </motion.div>
            )}

            {activeTab === "value" && (
              <motion.div
                key="value"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="rounded-xl bg-success/5 border border-success/20 p-5">
                  <p className="text-[10px] font-bold text-success uppercase tracking-wider mb-2">🎯 {t("card.value")}</p>
                  <p className="text-[13px] text-foreground leading-relaxed">{displayValor}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default DiagramCard;
