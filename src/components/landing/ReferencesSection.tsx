import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { references, ReferenceItem, FocusArea, focusLabels } from "@/data/references";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Briefcase, CreditCard, PiggyBank, Landmark, Package, X, ChevronRight, Crown, Users, Globe, Zap, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const focusIcons: Record<FocusArea, React.ElementType> = {
  leasing: Briefcase,
  factoring: Package,
  prestamos: Landmark,
  tarjetas: CreditCard,
  pension: PiggyBank,
  otros: Building2,
};

/** Companies with size and complexity comparable to BCP (includes all AFPs/pension) */
const LARGE_COMPANY_NAMES = new Set([
  // Banks & large financials
  "Unicomer Caribbean Holding",
  "Grupo CMI",
  "Banco Promerica",
  "Banco de Bogotá",
  "Davivienda",
  "Banpro (Grupo Promerica)",
  "Banco Nacional",
  "Scotiabank",
  "Desjardins",
  "GMAC Financial Services",
  "Bankaool",
  "Broxel",
  "BANDESAL",
  "Banco Santa Cruz",
  "Banco ADOPEM",
  "Bancard",
  "abcdin",
  "BN Valores",
  "Credicomer",
  "SYSRETAIL",
  "Arrendadora CREMI (Grupo BAL / GNP Seguros)",
  // All AFPs / Pension
  "AFP Confía",
  "AFP Reservas",
  "AFP Crecer",
  "AFP Habitat",
  "AFAP SURA",
  "República AFAP",
  "Integración AFAP",
  "CRAP",
  "Porvenir",
  "Afore XXI Banorte",
  "Banorte (Pensiones)",
  "MetLife",
  "AFP Siembra",
  "Colfondos",
  "Futuro de Bolivia AFP",
  "Prima AFP",
  "Afore Pensionissste Contigo",
  "BN Vital",
  "Principal",
  "Inbursa Afore",
  "Profuturo",
  "AFP Atlántida",
  "AFP Atlántico",
  "AFP Popular",
  "Popular Pensiones",
  "ProFuturo (México)",
  "Unión Capital AFAP",
  "Petros",
  "Alcatel-Lucent Enterprise",
  "Mercantil",
  "Tokio Marine Seguradora",
  "Seguros Universal",
  "AFPC Occidente",
  "Pensiones BAC Credomatic",
  "Compañía de Seguros (México)",
  "Hanwha Life (한화생명)",
]);

const largeRefs = references.filter((r) => LARGE_COMPANY_NAMES.has(r.name));
const otherRefs = references.filter((r) => !LARGE_COMPANY_NAMES.has(r.name));

/** Pension stats: afiliados + fondos in M USD */
const PENSION_STATS: Record<string, { afiliados: string; fondos: string }> = {
  "AFP Confía": { afiliados: "1.8M", fondos: "8,219" },
  "AFP Reservas": { afiliados: "724,504", fondos: "3,409" },
  "AFP Crecer": { afiliados: "1.5M", fondos: "4,505" },
  "AFP Habitat": { afiliados: "1M", fondos: "3,942" },
  "AFAP SURA": { afiliados: "7.8M", fondos: "11,512" },
  "República AFAP": { afiliados: "1.6M", fondos: "22,000" },
  "Integración AFAP": { afiliados: "1.65M", fondos: "22,103" },
  "CRAP": { afiliados: "273,101", fondos: "1,540" },
  "Porvenir": { afiliados: "14.8M", fondos: "47,000" },
  "Afore XXI Banorte": { afiliados: "7.2M", fondos: "49,597" },
  "Banorte (Pensiones)": { afiliados: "12M", fondos: "39,633" },
  "MetLife": { afiliados: "698,784", fondos: "12,000" },
  "AFP Siembra": { afiliados: "1.1M", fondos: "4,228" },
  "Colfondos": { afiliados: "5.2M", fondos: "12,500" },
  "Futuro de Bolivia AFP": { afiliados: "500,000", fondos: "20,998" },
  "Prima AFP": { afiliados: "2.3M", fondos: "13,078" },
  "Afore Pensionissste Contigo": { afiliados: "1M", fondos: "27,000" },
  "BN Vital": { afiliados: "540,946", fondos: "4,981" },
  "Principal": { afiliados: "3.09M", fondos: "12,500" },
  "Inbursa Afore": { afiliados: "1.1M", fondos: "9,291" },
  "Profuturo": { afiliados: "1.7M", fondos: "6,503" },
  "AFP Atlántida": { afiliados: "78,000", fondos: "1,157" },
  "AFP Atlántico": { afiliados: "104,047", fondos: "382.7" },
  "AFP Popular": { afiliados: "1.64M", fondos: "6,576" },
  "Popular Pensiones": { afiliados: "1.73M", fondos: "10,568" },
  "ProFuturo (México)": { afiliados: "1.7M", fondos: "26.3" },
  "Unión Capital AFAP": { afiliados: "375,255", fondos: "3,789" },
  "Petros": { afiliados: "220,000", fondos: "784" },
  "Alcatel-Lucent Enterprise": { afiliados: "78,400", fondos: "40,670" },
  "Mercantil": { afiliados: "100,007", fondos: "150.28" },
  "Tokio Marine Seguradora": { afiliados: "52,000", fondos: "37.1" },
  "Seguros Universal": { afiliados: "38,498", fondos: "95.1" },
  "AFPC Occidente": { afiliados: "82,539", fondos: "161.5" },
  "Pensiones BAC Credomatic": { afiliados: "472,148", fondos: "3,969" },
  "Compañía de Seguros (México)": { afiliados: "587,097", fondos: "821" },
  "Hanwha Life (한화생명)": { afiliados: "—", fondos: "—" },
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
        <div className="sticky top-0 z-10 rounded-t-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b px-6 py-5">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {r.inImplementation ? (
                    <Badge className="text-[9px] bg-amber-500/15 text-amber-600 border-amber-500/30 font-bold">
                      🔄 En implementación
                    </Badge>
                  ) : (
                    <Badge className="text-[9px] bg-emerald-500/15 text-emerald-600 border-emerald-500/30 font-bold">
                      ✓ Implementación exitosa
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

        <div className="px-6 py-5 space-y-5">
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

          <div>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Detalle</p>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{r.detail}</p>
          </div>

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

          <div className="rounded-xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/[0.02] border border-emerald-500/15 p-4">
            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">✓ Resultado</p>
            <p className="text-sm text-foreground leading-relaxed">{r.result}</p>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t">
            {r.contact && (
              <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Contacto:</span> {r.contact}</p>
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
      {r.inImplementation ? (
        <Badge className="mb-2 text-[9px] bg-amber-500/15 text-amber-600 border-amber-500/30 font-bold">
          🔄 En implementación
        </Badge>
      ) : (
        <Badge className="mb-2 text-[9px] bg-emerald-500/15 text-emerald-600 border-emerald-500/30 font-bold">
          ✓ Implementación exitosa
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

      {/* Pension stats visible on card */}
      {(() => {
        const stats = PENSION_STATS[r.name];
        if (!stats) return <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{r.detail}</p>;
        return (
          <div className="flex gap-3 mt-1">
            <div className="flex-1 rounded-lg bg-card/80 border px-2.5 py-1.5">
              <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Afiliados</p>
              <p className="text-sm font-extrabold text-foreground">{stats.afiliados}</p>
            </div>
            <div className="flex-1 rounded-lg bg-card/80 border px-2.5 py-1.5">
              <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Cartera</p>
              <p className="text-sm font-extrabold text-foreground">${stats.fondos} <span className="text-[8px] font-semibold text-muted-foreground">M USD</span></p>
            </div>
          </div>
        );
      })()}

      <span className="inline-flex items-center gap-1 mt-2 text-[10px] text-primary font-semibold group-hover:underline">
        Ver detalle <ChevronRight className="w-3 h-3" />
      </span>
    </div>
  </motion.div>
);

type ViewTab = "large" | "other";

/* ─── Main Section ─── */
const ReferencesSection = () => {
  const [selectedRef, setSelectedRef] = useState<ReferenceItem | null>(null);
  const [activeTab, setActiveTab] = useState<ViewTab>("large");

  const currentRefs = activeTab === "large" ? largeRefs : otherRefs;

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
        <div className="flex rounded-xl border bg-muted/50 p-1 gap-1">
          <button
            onClick={() => setActiveTab("large")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "large"
                ? "bg-card text-foreground shadow-sm border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            Clientes Similares a BCP ({largeRefs.length})
          </button>
          <button
            onClick={() => setActiveTab("other")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "other"
                ? "bg-card text-foreground shadow-sm border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Otras Referencias ({otherRefs.length})
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground">
          {activeTab === "large"
            ? "Instituciones de tamaño y complejidad similar a BCP"
            : "Financieras, cooperativas, microfinanzas y otras instituciones"}
        </p>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {currentRefs.map((r, i) => (
            <ReferenceCard key={`${r.name}-${i}`} item={r} index={i} onClick={() => setSelectedRef(r)} />
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedRef && (
          <ReferenceModal item={selectedRef} onClose={() => setSelectedRef(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferencesSection;
