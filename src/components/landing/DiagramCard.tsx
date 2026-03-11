import { useState } from "react";
import { motion } from "framer-motion";
import { DiagramBlock, QuestionItem } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronDown, ChevronRight, Info, Lightbulb, BookOpen } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/contexts/I18nContext";
import SafEcosystem from "./SafEcosystem";
import SysdeStats from "./SysdeStats";

/* ─── Collapsible Sub-section ─── */
const CollapsibleSection = ({
  icon: Icon,
  label,
  children,
  defaultOpen = false,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-muted/50 transition-colors"
      >
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
        <Icon className="w-4 h-4 text-primary shrink-0" />
        <span className="text-xs font-bold text-foreground uppercase tracking-wider">{label}</span>
      </button>
      {open && <div className="px-4 pb-4 pt-1">{children}</div>}
    </div>
  );
};

/* ─── Diagram Renderers ─── */

const FlowDiagram = ({ block }: { block: DiagramBlock }) => (
  <div>
    {block.title && <h4 className="text-xs font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="space-y-2">
      {block.steps?.map((step, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border">
          <span className="text-lg shrink-0">{step.icon || "▸"}</span>
          <div>
            <p className="text-xs font-bold text-foreground">{step.label}</p>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TableDiagram = ({ block }: { block: DiagramBlock }) => (
  <div>
    {block.title && <h4 className="text-xs font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/50">
            {block.headers?.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-bold text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows?.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-muted-foreground">{cell}</td>
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
        <div key={i} className="p-3 rounded-lg bg-muted/50 border text-xs text-foreground font-medium">
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
          <span className="text-primary mt-0.5">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const LayersDiagram = ({ block }: { block: DiagramBlock }) => (
  <div>
    {block.title && <h4 className="text-xs font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="space-y-2">
      {block.layers?.map((layer, i) => (
        <div key={i} className="p-3 rounded-lg bg-muted/50 border">
          <p className="text-xs font-bold text-foreground">{layer.name}</p>
          <p className="text-xs text-muted-foreground">{layer.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const ProcessDiagram = ({ block }: { block: DiagramBlock }) => (
  <div>
    {block.title && <h4 className="text-xs font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="flex flex-wrap gap-2">
      {block.steps?.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-center">
            <span className="text-lg block">{step.icon || "▸"}</span>
            <p className="text-[10px] font-bold text-foreground mt-1">{step.label}</p>
          </div>
          {i < (block.steps?.length ?? 0) - 1 && (
            <span className="text-muted-foreground">→</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const renderDiagram = (block: DiagramBlock, idx: number) => {
  const key = `${block.type}-${idx}`;
  switch (block.type) {
    case "flow": return <FlowDiagram key={key} block={block} />;
    case "process": return <ProcessDiagram key={key} block={block} />;
    case "grid": return <GridDiagram key={key} block={block} />;
    case "table": return <TableDiagram key={key} block={block} />;
    case "layers": return <LayersDiagram key={key} block={block} />;
    case "list": return <ListDiagram key={key} block={block} />;
    case "ecosystem": return <SafEcosystem key={key} />;
    case "stats": return <SysdeStats key={key} />;
    default: return null;
  }
};

/* ─── Main Card ─── */

interface Props {
  item: QuestionItem;
  index: number;
}

const DiagramCard = ({ item, index }: Props) => {
  const { lang, t } = useI18n();

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
        className="rounded-xl border bg-card shadow-sm overflow-hidden"
      >
        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
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
          <div className="mb-5 rounded-lg bg-muted/50 border p-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">📌 {t("card.requirement")}</p>
            <p className="text-xs text-foreground italic leading-relaxed">"{displayRequerimiento}"</p>
          </div>

          {/* Respuesta SYSDE */}
          <div className="mb-5 rounded-lg bg-primary/5 border border-primary/20 p-4">
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">💬 {t("card.response")}</p>
            <div className="space-y-2">
              {displayRespuesta.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-xs text-foreground leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Diagrams */}
          {displayDiagrams.length > 0 && (
            <div className="mb-4">
              <CollapsibleSection icon={BookOpen} label={t("card.diagrams")} defaultOpen={true}>
                <div className="space-y-6">
                  {displayDiagrams.map((d, i) => renderDiagram(d, i))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Consideraciones Técnicas */}
          {displayConsideraciones && (
            <div className="mb-4">
              <CollapsibleSection icon={Info} label={t("card.considerations")}>
                <p className="text-xs text-muted-foreground leading-relaxed">{displayConsideraciones}</p>
              </CollapsibleSection>
            </div>
          )}

          {/* Valor para BCP */}
          <div className="rounded-lg bg-success/5 border border-success/20 p-4">
            <p className="text-[10px] font-bold text-success uppercase tracking-wider mb-1">🎯 {t("card.value")}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{displayValor}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default DiagramCard;
