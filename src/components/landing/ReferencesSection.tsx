import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { references, ReferenceItem, FocusArea, focusLabels } from "@/data/references";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Building2, Briefcase, CreditCard, PiggyBank, Landmark, Package, X, Layers } from "lucide-react";

const focusIcons: Record<FocusArea, React.ElementType> = {
  leasing: Briefcase,
  factoring: Package,
  prestamos: Landmark,
  tarjetas: CreditCard,
  pension: PiggyBank,
  core_bancario: Building2,
  otros: Building2,
};

const focusTabs: { key: FocusArea | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "leasing", label: "Leasing" },
  { key: "factoring", label: "Factoring" },
  { key: "prestamos", label: "Préstamos" },
  { key: "tarjetas", label: "Tarjetas" },
  { key: "pension", label: "Fondos de Pensión" },
  { key: "core_bancario", label: "Core Bancario" },
];

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
const ReferenceModal = ({ item: r, onClose }: { item: ReferenceItem; onClose: () => void }) => (
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
      {/* Header */}
      <div className="sticky top-0 bg-card border-b px-5 py-4 flex items-start justify-between rounded-t-2xl z-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {r.inImplementation && (
              <Badge className="text-[9px] bg-amber-500/15 text-amber-600 border-amber-500/30 font-bold">
                En implementación
              </Badge>
            )}
            <Badge className="text-[9px] bg-primary/10 text-primary border-primary/20 font-bold">
              {r.core}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-foreground">{r.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            <MapPin className="w-3 h-3" /> {r.region}
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        {/* Focus areas */}
        <div className="flex flex-wrap gap-1.5">
          {r.focus.map((f) => {
            const Icon = focusIcons[f];
            return (
              <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground border">
                <Icon className="w-3 h-3" />
                {focusLabels[f]}
              </span>
            );
          })}
        </div>

        {/* Detail */}
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{r.detail}</p>

        {/* Modules */}
        {r.modules && (
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Módulos</p>
            <div className="flex flex-wrap gap-1">
              {r.modules.split(", ").map((m) => (
                <Badge key={m} variant="outline" className="text-[10px] font-medium">{m}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        <div className="rounded-xl bg-muted/60 border p-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Resultado</p>
          <p className="text-sm text-foreground leading-relaxed">{r.result}</p>
        </div>

        {/* Contact & Web */}
        {r.contact && (
          <p className="text-xs text-muted-foreground"><span className="font-semibold">Contacto:</span> {r.contact}</p>
        )}
        {r.web && (
          <a href={r.web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <ExternalLink className="w-3 h-3" /> {r.web}
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
);

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
      {/* Implementation badge */}
      {r.inImplementation && (
        <Badge className="mb-2 text-[9px] bg-amber-500/15 text-amber-600 border-amber-500/30 font-bold">
          🔄 En implementación
        </Badge>
      )}

      {/* Name + core */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h5 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
          {r.name}
        </h5>
        <Badge className="shrink-0 text-[9px] bg-primary/10 text-primary border-primary/20 font-bold">
          {r.core}
        </Badge>
      </div>

      {/* Region */}
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
        <MapPin className="w-3 h-3 shrink-0" />
        <span className="truncate">{r.region}</span>
      </div>

      {/* Focus badges */}
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

      {/* Preview text */}
      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{r.detail}</p>

      <span className="inline-block mt-2 text-[10px] text-primary font-semibold group-hover:underline">
        Ver detalle →
      </span>
    </div>
  </motion.div>
);

/* ─── Main Section ─── */
const ReferencesSection = () => {
  const [activeFilter, setActiveFilter] = useState<FocusArea | "all">("all");
  const [selectedRef, setSelectedRef] = useState<ReferenceItem | null>(null);

  const filtered = activeFilter === "all"
    ? references
    : references.filter((r) => r.focus.includes(activeFilter));

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-foreground">
          Referencias SYSDE ({filtered.length} de {references.length})
        </h4>
        <p className="text-[11px] text-muted-foreground">
          Filtra por enfoque de negocio — haz clic en cada tarjeta para ver el detalle completo
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4 p-1 rounded-xl bg-muted/40 border">
        {focusTabs.map((tab) => {
          const isActive = activeFilter === tab.key;
          const count = tab.key === "all"
            ? references.length
            : references.filter((r) => r.focus.includes(tab.key as FocusArea)).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
              <span className={`text-[9px] rounded-full px-1.5 py-0.5 ${isActive ? "bg-primary-foreground/20" : "bg-muted"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((r, i) => (
          <ReferenceCard key={`${r.name}-${i}`} item={r} index={i} onClick={() => setSelectedRef(r)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">No hay referencias para este filtro.</div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedRef && (
          <ReferenceModal item={selectedRef} onClose={() => setSelectedRef(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferencesSection;
