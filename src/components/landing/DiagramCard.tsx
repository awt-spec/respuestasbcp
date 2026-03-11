import { useState } from "react";
import { motion } from "framer-motion";
import { DiagramBlock, QuestionItem } from "@/data/questions";
import RevolvingSimulator from "./RevolvingSimulator";
import FormulaDisplay from "./FormulaDisplay";
import MultiCountrySimulator from "./MultiCountrySimulator";
import AprVsFlatSimulator from "./AprVsFlatSimulator";
import FeeConfigSimulator from "./FeeConfigSimulator";
import FixedInstallmentSimulator from "./FixedInstallmentSimulator";
import ScoringSimulator from "./ScoringSimulator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowDown, ChevronDown, ChevronRight, Info, Lightbulb, BookOpen, ExternalLink } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/contexts/I18nContext";

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

/* ─── Sub-renderers ─── */

const FlowDiagram = ({ block }: { block: DiagramBlock }) => (
  <div className="space-y-3">
    {block.title && <h4 className="text-sm font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="relative">
      {block.steps?.map((step, i) => (
        <div key={i} className="flex items-start gap-3 mb-1 last:mb-0">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0 border border-primary/20">
              {step.icon || "•"}
            </div>
            {i < (block.steps?.length ?? 0) - 1 && (
              <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-3 bg-primary/20" />
                <ArrowDown className="w-3 h-3 text-primary/30" />
              </div>
            )}
          </div>
          <div className="pt-2 pb-2">
            <p className="text-sm font-semibold text-foreground">{step.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProcessDiagram = ({ block }: { block: DiagramBlock }) => (
  <div className="space-y-3">
    {block.title && <h4 className="text-sm font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {block.steps?.map((step, i) => (
        <div key={i} className="relative">
          <div className="rounded-xl border bg-card p-4 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{step.icon || "▶️"}</span>
              <span className="text-[10px] font-bold text-primary/60 uppercase">
                {block.steps && block.steps.length > 1 ? `Paso ${i + 1}` : ""}
              </span>
            </div>
            <p className="text-xs font-bold text-foreground mb-1">{step.label}</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GridDiagram = ({ block }: { block: DiagramBlock }) => (
  <div className="space-y-3">
    {block.title && <h4 className="text-sm font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {block.steps?.map((step, i) => (
        <div key={i} className="rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xl mb-2">{step.icon || "📌"}</div>
          <p className="text-sm font-bold text-foreground mb-1">{step.label}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const TableDiagram = ({ block }: { block: DiagramBlock }) => (
  <div className="space-y-3">
    {block.title && <h4 className="text-sm font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary/5 border-b">
            {block.headers?.map((h, i) => (
              <th key={i} className="text-left px-4 py-2.5 text-xs font-bold text-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows?.map((row, i) => (
            <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-xs text-muted-foreground">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const LayersDiagram = ({ block }: { block: DiagramBlock }) => (
  <div className="space-y-3">
    {block.title && <h4 className="text-sm font-bold text-foreground mb-3">{block.title}</h4>}
    <div className="space-y-2">
      {block.layers?.map((layer, i) => (
        <div key={i} className="rounded-xl border-l-4 bg-card p-4 shadow-sm" style={{ borderLeftColor: `hsl(${352 - i * 25}, 70%, ${45 + i * 5}%)` }}>
          <p className="text-sm font-bold text-foreground mb-1">{layer.name}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{layer.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const ListDiagram = ({ block }: { block: DiagramBlock }) => (
  <div className="space-y-2">
    {block.title && <h4 className="text-sm font-bold text-foreground mb-2">{block.title}</h4>}
    <div className="rounded-xl border bg-card p-4">
      <ul className="space-y-1.5">
        {block.items?.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="text-primary mt-0.5">▸</span>
            {item}
          </li>
        ))}
      </ul>
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
    case "simulator": return <RevolvingSimulator key={key} />;
    case "formula": return <FormulaDisplay key={key} title={block.title} formulas={block.formulas || []} />;
    case "multicountry": return <MultiCountrySimulator key={key} />;
    case "aprvsflat": return <AprVsFlatSimulator key={key} />;
    case "feeconfig": return <FeeConfigSimulator key={key} />;
    case "fixedinstallment": return <FixedInstallmentSimulator key={key} />;
    case "scoring": return <ScoringSimulator key={key} />;
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

  const pick = <T,>(es: T, en?: T, fr?: T): T => {
    if (lang === "en") return en ?? es;
    if (lang === "fr") return fr ?? en ?? es;
    return es;
  };

  const displayTitle = pick(item.title, item.title_en, item.title_fr);
  const displaySubtitle = pick(item.subtitle, item.subtitle_en, item.subtitle_fr);
  const displayRequerimiento = pick(item.requerimiento, item.requerimiento_en, item.requerimiento_fr);
  const displayRespuesta = pick(item.respuesta, item.respuesta_en, item.respuesta_fr);
  const displayValor = pick(item.valor, item.valor_en, item.valor_fr);
  const displayConsideraciones = pick(item.consideraciones, item.consideraciones_en, item.consideraciones_fr);
  const displayEjemplo = pick(item.ejemplo, item.ejemplo_en, item.ejemplo_fr);
  const displayNota = pick(item.nota, item.nota_en, item.nota_fr);
  const displayDiagrams = pick(item.diagrams, item.diagrams_en, item.diagrams_fr);

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
          {/* Requerimiento — Translated */}
          <div className="mb-5 rounded-lg bg-muted/50 border p-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">📌 {t("card.requirement")}</p>
            <p className="text-xs text-foreground italic leading-relaxed">"{displayRequerimiento}"</p>
          </div>

          {/* Respuesta SYSDE — Translated */}
          <div className="mb-5 rounded-lg bg-primary/5 border border-primary/20 p-4">
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">💬 {t("card.response")}</p>
            <div className="space-y-2">
              {displayRespuesta.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-xs text-foreground leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Nota Especial Pop-up */}
          {displayNota && (
            <div className="mb-5 rounded-lg bg-amber-500/10 border border-amber-500/30 p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 leading-relaxed flex items-start gap-2">
                <span className="text-base shrink-0">💡</span>
                {displayNota}
              </p>
            </div>
          )}

          {/* Diagrams — In collapsible toggle */}
          {displayDiagrams.length > 0 && (
            <div className="mb-4">
              <CollapsibleSection icon={BookOpen} label={t("card.diagrams")} defaultOpen={true}>
                <div className="space-y-6">
                  {displayDiagrams.map((d, i) => renderDiagram(d, i))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Ejemplo Concreto — Collapsible */}
          {displayEjemplo && (
            <div className="mb-4">
              <CollapsibleSection icon={Lightbulb} label={t("card.example")}>
                <p className="text-xs text-muted-foreground leading-relaxed">{displayEjemplo}</p>
              </CollapsibleSection>
            </div>
          )}

          {/* Consideraciones Técnicas — Collapsible */}
          {displayConsideraciones && (
            <div className="mb-4">
              <CollapsibleSection icon={Info} label={t("card.considerations")}>
                <p className="text-xs text-muted-foreground leading-relaxed">{displayConsideraciones}</p>
              </CollapsibleSection>
            </div>
          )}

          {/* Demo Link */}
          {item.demoUrl && (
            <div className="mb-4">
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                {t("card.demo")}
              </a>
            </div>
          )}

          {/* Valor para Unicomer */}
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
