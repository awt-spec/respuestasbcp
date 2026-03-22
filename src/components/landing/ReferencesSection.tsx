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
  workflow: Zap,
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
  "RAP",
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
  "RAP": { afiliados: "273,101", fondos: "1,540" },
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

  const stats = PENSION_STATS[r.name];
  const detailParagraphs = r.detail.split("\n\n").filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="bg-card rounded-3xl shadow-2xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col border-0 ring-1 ring-border/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative px-7 py-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  {r.inImplementation ? (
                    <Badge className="text-[10px] bg-white/20 text-primary-foreground border-white/30 font-bold backdrop-blur-sm">
                      🔄 En implementación
                    </Badge>
                  ) : (
                    <Badge className="text-[10px] bg-white/20 text-primary-foreground border-white/30 font-bold backdrop-blur-sm">
                      ✓ Caso de éxito
                    </Badge>
                  )}
                  <Badge className="text-[10px] bg-white/15 text-primary-foreground border-white/25 font-bold backdrop-blur-sm">
                    {r.core}
                  </Badge>
                </div>
                <h3 className="text-2xl font-extrabold text-primary-foreground leading-tight tracking-tight">{r.name}</h3>
                <div className="flex items-start gap-2 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-primary-foreground/70 shrink-0 mt-0.5" />
                  <span className="text-sm text-primary-foreground/80 font-medium leading-relaxed break-words">{r.region}</span>
                </div>
                {r.web && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Globe className="w-3 h-3 text-primary-foreground/60" />
                    <a href={r.web} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary-foreground/70 hover:text-primary-foreground underline-offset-2 hover:underline transition-colors">{r.web.replace(/^https?:\/\//, '')}</a>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0 ml-3 backdrop-blur-sm">
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-7 py-6 space-y-5">
          {/* Pension Stats Banner */}
          {stats && (
            <div className="grid grid-cols-2 gap-3">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                className="rounded-2xl bg-gradient-to-br from-primary/8 to-primary/3 border border-primary/15 p-4 text-center">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Afiliados</p>
                <p className="text-2xl font-extrabold text-foreground">{stats.afiliados}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl bg-gradient-to-br from-success/8 to-success/3 border border-success/15 p-4 text-center">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Cartera</p>
                <p className="text-2xl font-extrabold text-foreground">${stats.fondos} <span className="text-xs font-semibold text-muted-foreground">M USD</span></p>
              </motion.div>
            </div>
          )}

          {/* Focus Areas */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Soluciones implementadas</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.focus.map((f) => {
                const Icon = focusIcons[f];
                return (
                  <span key={f} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-semibold bg-primary/15 text-primary border border-primary/25 shadow-sm">
                    <Icon className="w-3.5 h-3.5" />
                    {focusLabels[f]}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Detail */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sobre el proyecto</p>
            </div>
            <div className="space-y-3">
              {detailParagraphs.map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                  className="text-sm text-muted-foreground leading-relaxed">
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Modules */}
          {r.modules && (
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Package className="w-3.5 h-3.5 text-primary" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Módulos desplegados</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {r.modules.split(", ").map((m) => (
                  <Badge key={m} variant="outline" className="text-[10px] font-semibold bg-muted/40 border-border/60 px-3 py-1 rounded-lg">{m}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="rounded-2xl bg-gradient-to-br from-success/8 via-success/4 to-transparent border border-success/20 p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <p className="text-[10px] font-bold text-success uppercase tracking-widest">Impacto & Resultado</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed font-medium">{r.result}</p>
          </motion.div>

          {/* Contact */}
          {r.contact && (
            <div className="flex items-center gap-3 pt-3 border-t border-border/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Contacto de referencia</p>
                <p className="text-sm font-semibold text-foreground">{r.contact}</p>
              </div>
            </div>
          )}
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

      {/* Card stats / detail */}
      {(() => {
        const stats = PENSION_STATS[r.name];
        if (r.name === "Grupo CMI") {
          return (
            <div className="flex gap-3 mt-1">
              <div className="flex-1 rounded-lg bg-card/80 border px-2.5 py-1.5">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Colaboradores</p>
                <p className="text-sm font-extrabold text-foreground">+54,000</p>
              </div>
              <div className="flex-1 rounded-lg bg-card/80 border px-2.5 py-1.5">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Países</p>
                <p className="text-sm font-extrabold text-foreground">+20</p>
              </div>
            </div>
          );
        }
        if (r.name === "Arrendadora CREMI (Grupo BAL / GNP Seguros)") {
          return (
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="rounded-lg bg-card/80 border px-2 py-1.5">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Ingresos</p>
                <p className="text-xs font-extrabold text-foreground">$11,129 <span className="text-[7px] font-semibold text-muted-foreground">M USD</span></p>
              </div>
              <div className="rounded-lg bg-card/80 border px-2 py-1.5">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Activos</p>
                <p className="text-xs font-extrabold text-foreground">$25,973 <span className="text-[7px] font-semibold text-muted-foreground">M USD</span></p>
              </div>
              <div className="rounded-lg bg-card/80 border px-2 py-1.5">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Empleados</p>
                <p className="text-xs font-extrabold text-foreground">42,850</p>
              </div>
            </div>
          );
        }
        if (r.name === "Unicomer Caribbean Holding") {
          return (
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="rounded-lg bg-card/80 border px-2 py-1.5">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Marcas</p>
                <p className="text-xs font-extrabold text-foreground">+30</p>
              </div>
              <div className="rounded-lg bg-card/80 border px-2 py-1.5">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Tiendas</p>
                <p className="text-xs font-extrabold text-foreground">+1,200</p>
              </div>
              <div className="rounded-lg bg-card/80 border px-2 py-1.5">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Colaboradores</p>
                <p className="text-xs font-extrabold text-foreground">+13,000</p>
              </div>
            </div>
          );
        }
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
const ReferencesSection = ({ filter, sortByVolume }: { filter?: "implementation"; sortByVolume?: boolean }) => {
  const [selectedRef, setSelectedRef] = useState<ReferenceItem | null>(null);
  const [activeTab, setActiveTab] = useState<ViewTab>("large");

  const implementationOnly = filter === "implementation";
  const filteredRefs = implementationOnly ? references.filter(r => r.inImplementation) : null;

  if (implementationOnly) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {filteredRefs!.map((r, i) => (
            <ReferenceCard key={`${r.name}-${i}`} item={r} index={i} onClick={() => setSelectedRef(r)} />
          ))}
        </motion.div>
        <AnimatePresence>
          {selectedRef && (
            <ReferenceModal item={selectedRef} onClose={() => setSelectedRef(null)} />
          )}
        </AnimatePresence>
      </div>
    );
  }

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
