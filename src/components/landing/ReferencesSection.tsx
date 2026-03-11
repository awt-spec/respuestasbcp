import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { references, ReferenceItem, FocusArea, focusLabels } from "@/data/references";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronDown, ChevronUp, ExternalLink, Building2, Briefcase, CreditCard, PiggyBank, Landmark, Package } from "lucide-react";

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

const ReferenceRow = ({ item: r, isOpen, onToggle }: { item: ReferenceItem; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className={`border-b last:border-b-0 transition-colors ${isOpen ? "bg-primary/5" : "hover:bg-muted/30"}`}>
      {/* Row header - clickable */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3.5 flex items-center gap-3 text-left"
      >
        {/* Status */}
        {r.inImplementation && (
          <Badge className="shrink-0 text-[9px] bg-amber-500/15 text-amber-600 border-amber-500/30 font-bold px-1.5 py-0.5">
            EN IMPL.
          </Badge>
        )}

        {/* Name */}
        <span className={`text-sm font-bold flex-1 min-w-0 truncate ${isOpen ? "text-primary" : "text-foreground"}`}>
          {r.name}
        </span>

        {/* Focus badges */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {r.focus.map((f) => {
            const Icon = focusIcons[f];
            return (
              <span
                key={f}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-muted text-muted-foreground border"
                title={focusLabels[f]}
              >
                <Icon className="w-2.5 h-2.5" />
                {focusLabels[f]}
              </span>
            );
          })}
        </div>

        {/* Region */}
        <span className="text-[11px] text-muted-foreground shrink-0 hidden sm:block max-w-[180px] truncate">
          {r.region}
        </span>

        {/* Core badge */}
        <Badge className="shrink-0 text-[9px] bg-primary/10 text-primary border-primary/20 font-bold">
          {r.core}
        </Badge>

        {/* Chevron */}
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Detail */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MapPin className="w-3 h-3" /> {r.region}
                </div>

                {/* Focus on mobile */}
                <div className="flex flex-wrap gap-1 md:hidden">
                  {r.focus.map((f) => {
                    const Icon = focusIcons[f];
                    return (
                      <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-muted text-muted-foreground border">
                        <Icon className="w-2.5 h-2.5" />
                        {focusLabels[f]}
                      </span>
                    );
                  })}
                </div>

                <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">{r.detail}</p>

                {r.modules && (
                  <div className="flex flex-wrap gap-1">
                    {r.modules.split(", ").map((m) => (
                      <Badge key={m} variant="outline" className="text-[9px] font-medium">
                        {m}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Result + contact */}
              <div className="space-y-3">
                <div className="rounded-lg bg-muted/60 border p-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Resultado</p>
                  <p className="text-xs text-foreground leading-relaxed">{r.result}</p>
                </div>
                {r.contact && (
                  <p className="text-[11px] text-muted-foreground">
                    <span className="font-semibold">Contacto:</span> {r.contact}
                  </p>
                )}
                {r.web && (
                  <a
                    href={r.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" /> {r.web}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReferencesSection = () => {
  const [activeFilter, setActiveFilter] = useState<FocusArea | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeFilter === "all"
    ? references
    : references.filter((r) => r.focus.includes(activeFilter));

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-foreground">
            Referencias SYSDE ({filtered.length} de {references.length})
          </h4>
          <p className="text-[11px] text-muted-foreground">
            Filtra por enfoque de negocio — haz clic en cada referencia para expandir
          </p>
        </div>
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
              onClick={() => { setActiveFilter(tab.key); setOpenId(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
              <span className={`text-[9px] rounded-full px-1.5 py-0.5 ${
                isActive ? "bg-primary-foreground/20" : "bg-muted"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* References list */}
      <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
        {filtered.map((r, i) => (
          <ReferenceRow
            key={`${r.name}-${i}`}
            item={r}
            isOpen={openId === `${r.name}-${i}`}
            onToggle={() => setOpenId(openId === `${r.name}-${i}` ? null : `${r.name}-${i}`)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No hay referencias para este filtro.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferencesSection;
