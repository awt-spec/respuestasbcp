import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Users, DollarSign, Globe, Shield, Zap, TrendingUp, ChevronDown } from "lucide-react";

const marketData = [
  { country: "Uruguay", pct: 100 },
  { country: "República Dominicana", pct: 86, country_en: "Dominican Republic" },
  { country: "Costa Rica", pct: 83 },
  { country: "Bolivia", pct: 80 },
  { country: "El Salvador", pct: 80 },
  { country: "Colombia", pct: 80 },
  { country: "Perú", pct: 75 },
  { country: "Panamá", pct: 45, country_en: "Panama" },
  { country: "México", pct: 45, country_en: "Mexico" },
  { country: "Honduras", pct: 40 },
];

interface Props {
  section: "trajectory" | "pension";
}

const SysdeStats = ({ section }: Props) => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [showPresence, setShowPresence] = useState(false);

  if (section === "trajectory") {
    return (
      <div className="space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {[
            { value: "+39", label: pick("Países", "Countries") },
            { value: "+1,000", label: pick("Clientes", "Clients") },
            { value: "+350", label: pick("Integraciones", "Integrations") },
            { value: "+250M", label: "API Calls/Day" },
            { value: "+1,500", label: pick("Implementaciones", "Implementations") },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-3 rounded-xl border bg-card text-center"
            >
              <p className="text-lg font-extrabold text-primary">{s.value}</p>
              <p className="text-[9px] text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { Icon: Globe, text: pick("Aceleradores pre-construidos para servicios financieros", "Pre-built accelerators for financial services") },
            { Icon: Shield, text: pick("Framework de cumplimiento multi-país para LATAM/Caribe", "Multi-country compliance framework for LATAM/Caribbean") },
            { Icon: Zap, text: pick("Capacidades avanzadas de IA/ML en tiempo real", "Advanced real-time AI/ML capabilities") },
            { Icon: TrendingUp, text: pick("Modelo de crecimiento ilimitado: usuarios, préstamos, clientes", "Unlimited growth model: users, loans, clients") },
          ].map(({ Icon, text }, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border bg-card">
              <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[11px] text-foreground leading-snug">{text}</p>
            </div>
          ))}
        </div>

        {/* Cloud cert */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/[0.06] to-primary/[0.02] border border-primary/15 p-5 text-center">
          <p className="text-sm font-bold text-foreground">Cloud SaaS/PaaS — SOC 2 Certified</p>
          <p className="text-[10px] text-muted-foreground mt-1.5">
            99.95% – 99.99% SLA · Multi-zone · GDPR · {"<"}4hr RTO · {"<"}15min RPO
          </p>
        </div>

        {/* Trust banner */}
        <div className="rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary via-[hsl(340,70%,35%)] to-[hsl(352,87%,22%)] p-8">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-[10px] font-semibold text-primary-foreground/80 uppercase tracking-widest mb-3">
                <Users className="w-3 h-3" />
                {pick("Confianza comprobada", "Proven trust")}
              </span>
              <h4 className="text-xl md:text-2xl font-extrabold text-primary-foreground italic leading-tight">
                {pick("Confianza comprobada por líderes de la industria", "Proven trust by industry leaders")}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur-sm p-5 text-center border border-primary-foreground/10">
                <Users className="w-6 h-6 text-primary-foreground/60 mx-auto mb-2" />
                <p className="text-3xl md:text-4xl font-extrabold text-primary-foreground tracking-tight">+145M</p>
                <p className="text-[11px] text-primary-foreground/70 mt-1">{pick("usuarios", "users")}</p>
              </div>
              <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur-sm p-5 text-center border border-primary-foreground/10">
                <DollarSign className="w-6 h-6 text-primary-foreground/60 mx-auto mb-2" />
                <p className="text-3xl md:text-4xl font-extrabold text-primary-foreground tracking-tight">+800B</p>
                <p className="text-[11px] text-primary-foreground/70 mt-1">USD {pick("en activos gestionados", "in managed assets")}</p>
              </div>
            </div>
            <p className="text-[10px] text-primary-foreground/50 text-center mt-4">
              {pick("a través de SYSDE en toda Latinoamérica", "through SYSDE across Latin America")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // section === "pension"
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-gradient-to-r from-primary/[0.08] to-primary/[0.02] p-6 md:p-8"
    >
      <h3 className="text-lg md:text-2xl font-extrabold text-foreground leading-snug mb-2">
        {pick(
          "Actualmente el 82% de las AFPs en Latinoamérica utiliza SYSDE Pensión",
          "Currently 82% of pension funds (AFPs) in Latin America use SYSDE Pensión"
        )}
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        {pick(
          "Más de 30 años respaldando la gestión de fondos previsionales en la región.",
          "Over 30 years supporting pension fund management in the region."
        )}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { value: "+200", label: pick("funcionalidades interrelacionadas", "interrelated functionalities") },
          { value: "+15", label: pick("operadoras de fondos confían en SYSDE", "fund operators trust SYSDE") },
          { value: "+400", label: pick("módulos especializados", "specialized modules") },
          { value: "+45", label: pick("operadoras de fondos de pensión", "pension fund operators") },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="p-4 rounded-2xl border bg-card hover:shadow-sm transition-shadow"
          >
            <p className="text-2xl font-extrabold text-primary mb-1">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground leading-snug">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setShowPresence(!showPresence)}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
      >
        {pick("Ver desglose de presencia y números", "See presence breakdown and numbers")}
        <ChevronDown className={`w-4 h-4 transition-transform ${showPresence ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {showPresence && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-primary" />
                <h5 className="text-sm font-bold text-foreground">
                  {pick("Presencia que lidera", "Leading presence")}
                </h5>
              </div>
              <p className="text-[10px] text-muted-foreground mb-5">
                {pick(
                  "Territorios ganados: SYSDE domina con más del 50% del mercado",
                  "Won territories: SYSDE dominates with 50%+ market share"
                )}
              </p>
              <div className="space-y-2.5">
                {marketData.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-medium text-foreground">
                        {pick(item.country, item.country_en)}
                      </span>
                      <span className="text-[11px] font-bold text-primary">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.04, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-[hsl(340,70%,45%)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground mt-5 flex items-center gap-1.5 border-t pt-3">
                <Globe className="w-3 h-3 text-muted-foreground/60" />
                {pick(
                  "También presente en Brasil, Paraguay, Corea, Polonia y Venezuela.",
                  "Also present in Brazil, Paraguay, Korea, Poland, and Venezuela."
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SysdeStats;
