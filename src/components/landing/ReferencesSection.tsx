import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { references, ReferenceItem, FocusArea, focusLabels } from "@/data/references";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Building2, Briefcase, CreditCard, PiggyBank, Landmark, Package, X, Layers, ChevronRight } from "lucide-react";

const focusIcons: Record<FocusArea, React.ElementType> = {
  leasing: Briefcase,
  factoring: Package,
  prestamos: Landmark,
  tarjetas: CreditCard,
  pension: PiggyBank,
  core_bancario: Building2,
  otros: Building2,
};

type FilterKey = "all";

const focusTabs: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Todos" },
];

const coleccionAreas: FocusArea[] = ["leasing", "factoring", "prestamos"];

const filterReferences = (key: FilterKey): ReferenceItem[] => {
  if (key === "all") return references;
  if (key === "coleccion") return references.filter((r) => r.focus.some((f) => coleccionAreas.includes(f)));
  return references.filter((r) => r.focus.includes(key as FocusArea));
};

const getCardAccent = (i: number) => {
  const accents = [
    "from-primary/8 to-primary/3 border-primary/20",
    "from-emerald-500/8 to-emerald-500/3 border-emerald-500/20",
    "from-blue-500/8 to-blue-500/3 border-blue-500/20",
    "from-amber-500/8 to-amber-500/3 border-amber-500/20",
    "from-violet-500/8 to-violet-500/3 border-violet-500/20",
    "from-rose-500/8 to-rose-500/3 border-rose-500/20",
  ];
  return accents[i % accents.length];
};

/* ─── Detail Modal ─── */
const ReferenceModal = ({ item: r, onClose }: { item: ReferenceItem; onClose: () => void }) => {
  // Lock body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-card border rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with gradient */}
      <div className="sticky top-0 z-10 rounded-t-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {r.inImplementation && (
                  <Badge className="text-[9px] bg-amber-500/15 text-amber-600 border-amber-500/30 font-bold">
                    🔄 En implementación
                  </Badge>
                )}
                <Badge className="text-[9px] bg-primary/10 text-primary border-primary/20 font-bold">
                  {r.core}
                </Badge>
              </div>
              <h3 className="text-xl font-extrabold text-foreground leading-tight">{r.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                <MapPin className="w-3 h-3" /> {r.region}
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors shrink-0 ml-3">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5">
        {/* Focus areas as chips */}
        <div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Enfoque</p>
          <div className="flex flex-wrap gap-1.5">
            {r.focus.map((f) => {
              const Icon = focusIcons[f];
              return (
                <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold bg-primary/5 text-primary border border-primary/15">
                  <Icon className="w-3 h-3" />
                  {focusLabels[f]}
                </span>
              );
            })}
          </div>
        </div>

        {/* Detail */}
        <div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Detalle</p>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{r.detail}</p>
        </div>

        {/* Modules */}
        {r.modules && (
          <div>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Módulos</p>
            <div className="flex flex-wrap gap-1.5">
              {r.modules.split(", ").map((m) => (
                <Badge key={m} variant="outline" className="text-[10px] font-medium bg-muted/50">{m}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        <div className="rounded-xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/[0.02] border border-emerald-500/15 p-4">
          <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">✓ Resultado</p>
          <p className="text-sm text-foreground leading-relaxed">{r.result}</p>
        </div>

        {/* Contact & Web */}
        <div className="flex flex-col gap-2 pt-2 border-t">
          {r.contact && (
            <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Contacto:</span> {r.contact}</p>
          )}
          {r.web && (
            <a href={r.web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
              <ExternalLink className="w-3 h-3" /> Visitar sitio web
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
  );
};

/* ─── Card ─── */
const ReferenceCard = ({ item: r, index, onClick }: { item: ReferenceItem; index: number; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.03, duration: 0.3 }}
    whileHover={{ scale: 1.02, y: -3 }}
    onClick={onClick}
    className={`group cursor-pointer rounded-2xl border bg-gradient-to-br ${getCardAccent(index)} shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
  >
    <div className="p-4">
      {r.inImplementation && (
        <Badge className="mb-2 text-[9px] bg-amber-500/15 text-amber-600 border-amber-500/30 font-bold">
          🔄 En implementación
        </Badge>
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h5 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
          {r.name}
        </h5>
        <Badge className="shrink-0 text-[9px] bg-primary/10 text-primary border-primary/20 font-bold">
          {r.core}
        </Badge>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
        <MapPin className="w-3 h-3 shrink-0" />
        <span className="truncate">{r.region}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {r.focus.slice(0, 3).map((f) => {
          const Icon = focusIcons[f];
          return (
            <span key={f} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-semibold bg-card/80 text-muted-foreground border">
              <Icon className="w-2.5 h-2.5" />
              {focusLabels[f]}
            </span>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{r.detail}</p>

      <span className="inline-flex items-center gap-1 mt-2 text-[10px] text-primary font-semibold group-hover:underline">
        Ver detalle <ChevronRight className="w-3 h-3" />
      </span>
    </div>
  </motion.div>
);

/* ─── Main Section ─── */
const ReferencesSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedRef, setSelectedRef] = useState<ReferenceItem | null>(null);

  const filtered = filterReferences(activeFilter);

  return (
    <div>
      <div className="mb-4">
        <h4 className="text-sm font-bold text-foreground">
          Referencias SYSDE ({references.length})
        </h4>
        <p className="text-[11px] text-muted-foreground">
          Haz clic en cada tarjeta para ver el detalle completo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {references.map((r, i) => (
          <ReferenceCard key={`${r.name}-${i}`} item={r} index={i} onClick={() => setSelectedRef(r)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">No hay referencias para este filtro.</div>
      )}

      <AnimatePresence>
        {selectedRef && (
          <ReferenceModal item={selectedRef} onClose={() => setSelectedRef(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferencesSection;
