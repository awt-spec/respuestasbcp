import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiagramBlock, QuestionItem } from "@/data/questions";
import { references, ReferenceItem } from "@/data/references";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, BarChart3, Users, MapPin, Layers, ChevronRight, X } from "lucide-react";
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
  { id: "ecosystem", label: "Ecosistema SAF+", label_en: "SAF+ Ecosystem", icon: Layers },
  { id: "trajectory", label: "Trayectoria SYSDE", label_en: "SYSDE Track Record", icon: BarChart3 },
  { id: "pension", label: "SYSDE Pensión", label_en: "SYSDE Pensión", icon: Users },
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

/* ─── Reference Card (grid style with expandable detail) ─── */

const ReferenceCard = ({ item: r, index }: { item: ReferenceItem; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={`rounded-2xl border bg-card shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-primary/30 ${
        expanded ? "border-primary/40 shadow-md" : ""
      } ${r.inImplementation ? "ring-2 ring-primary/20" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        {/* Implementation badge */}
        {r.inImplementation && (
          <div className="mb-2">
            <Badge className="text-[9px] bg-amber-500/15 text-amber-600 border-amber-500/30 font-bold">
              🔄 En implementación
            </Badge>
          </div>
        )}
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h5 className={`text-sm font-bold ${expanded ? "text-primary" : "text-foreground"} transition-colors`}>
            {r.name}
          </h5>
          <Badge className="shrink-0 text-[10px] bg-primary/10 text-primary border-primary/20 font-bold">
            {r.product}
          </Badge>
        </div>

        {/* Meta */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {r.region}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Layers className="w-3 h-3" />
            {r.deployment}
          </div>
        </div>

        {/* Detail preview */}
        <p className={`text-[11px] text-muted-foreground leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
          {r.detail}
        </p>

        {/* Expand trigger */}
        {!expanded && (
          <button className="flex items-center gap-1 mt-3 text-[11px] text-primary font-semibold hover:underline">
            Ver detalle <ChevronRight className="w-3 h-3" />
          </button>
        )}

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t space-y-2">
                <p className="text-[11px] text-foreground font-medium leading-relaxed">✅ {r.result}</p>
                {r.modules && (
                  <p className="text-[10px] text-muted-foreground">📦 <span className="font-semibold">Módulos:</span> {r.modules}</p>
                )}
                {r.contact && (
                  <p className="text-[10px] text-muted-foreground">👤 <span className="font-semibold">Contacto:</span> {r.contact}</p>
                )}
                {r.web && (
                  <p className="text-[10px]">🌐 <a href={r.web} target="_blank" rel="noopener noreferrer" className="text-primary underline" onClick={(e) => e.stopPropagation()}>{r.web}</a></p>
                )}
                <button className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground hover:text-foreground">
                  <X className="w-3 h-3" /> Cerrar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── References Grid ─── */

const ReferencesGrid = () => (
  <div>
    <div className="mb-5">
      <h4 className="text-sm font-bold text-foreground mb-1">Todas las empresas ({references.length} casos)</h4>
      <p className="text-[11px] text-muted-foreground">Portafolio completo de clientes SYSDE a nivel global — click en cada tarjeta para ver más detalle</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {references.map((r, i) => (
        <ReferenceCard key={i} item={r} index={i} />
      ))}
    </div>
  </div>
);

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

                {item.id === 2 && (
                  <div className="mt-5 rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">💡</span>
                      <div>
                        <h4 className="text-xs font-bold text-foreground mb-2">
                          {pick(
                            "Disponibilidad para Evaluación Formal",
                            "Availability for Formal Evaluation"
                          )}
                        </h4>
                        <p className="text-[12px] text-muted-foreground leading-relaxed">
                          {pick(
                            "Si para BCP constituye un requisito contar con un proceso formal de evaluación o referenciación por parte de firmas especializadas de la industria, SYSDE se encuentra en total disposición de iniciar y participar activamente en dicho proceso. Estamos comprometidos con cumplir los estándares y criterios que BCP considere necesarios para la validación de nuestra solución.",
                            "If BCP requires a formal evaluation or referencing process by specialized industry firms, SYSDE is fully willing to initiate and actively participate in such a process. We are committed to meeting the standards and criteria that BCP considers necessary for validating our solution."
                          )}
                        </p>
                      </div>
                    </div>
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
                <ReferencesGrid />
              </motion.div>
            )}

          </AnimatePresence>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default DiagramCard;
