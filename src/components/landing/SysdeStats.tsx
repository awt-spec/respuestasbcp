import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

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

const SysdeStats = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);

  return (
    <div className="space-y-6">
      {/* Trust banner */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-[hsl(340,70%,30%)] p-6 text-primary-foreground">
        <p className="text-[10px] font-semibold uppercase tracking-widest opacity-70 mb-2">
          {pick("Confianza comprobada", "Proven trust")}
        </p>
        <h4 className="text-lg font-extrabold mb-4">
          {pick("Confianza comprobada por líderes de la industria", "Proven trust by industry leaders")}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-primary-foreground/10 backdrop-blur-sm p-4 text-center">
            <p className="text-2xl md:text-3xl font-extrabold">+145M</p>
            <p className="text-xs opacity-80">{pick("usuarios", "users")}</p>
          </div>
          <div className="rounded-xl bg-primary-foreground/10 backdrop-blur-sm p-4 text-center">
            <p className="text-2xl md:text-3xl font-extrabold">USD +655.4B</p>
            <p className="text-xs opacity-80">{pick("en activos administrados", "in managed assets")}</p>
          </div>
        </div>
        <p className="text-[10px] opacity-60 mt-3 text-center">
          {pick(
            "gestionados a través de Sysde Pensión en toda Latinoamérica",
            "managed through Sysde Pensión across Latin America"
          )}
        </p>
      </div>

      {/* Key numbers */}
      <div>
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-3">
          {pick("SYSDE en Números", "SYSDE in Numbers")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "+200", label: pick("funcionalidades en módulos", "module functionalities") },
            { value: "+15", label: pick("operadoras de pensión confían en SYSDE", "pension operators trust SYSDE") },
            { value: "+400", label: pick("módulos especializados en Pensión", "specialized Pension modules") },
            { value: "+45", label: pick("operadoras de fondos de pensión", "pension fund operators") },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl border bg-card text-center"
            >
              <p className="text-xl font-extrabold text-primary">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Market presence bars */}
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">📍</span>
          <h5 className="text-sm font-bold text-foreground">
            {pick("Presencia que lidera", "Leading presence")}
          </h5>
        </div>
        <p className="text-[10px] text-muted-foreground mb-4">
          {pick(
            "Territorios ganados: Sysde domina con más del 50% del mercado",
            "Won territories: Sysde dominates with 50%+ market share"
          )}
        </p>
        <div className="space-y-3">
          {marketData.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-foreground">
                  {pick(item.country, item.country_en)}
                </span>
                <span className="text-xs font-bold text-primary">{item.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-[hsl(340,70%,40%)]"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-muted-foreground mt-4 flex items-center gap-1">
          🌐 {pick(
            "También presente en Brasil, Paraguay, Corea, Polonia y Venezuela.",
            "Also present in Brazil, Paraguay, Korea, Poland, and Venezuela."
          )}
        </p>
      </div>

      {/* Differentiators */}
      <div>
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-3">
          {pick("DIFERENCIADORES", "DIFFERENTIATORS")}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
          {[
            { value: "+39", label: pick("Países", "Countries") },
            { value: "+1,000", label: pick("Clientes", "Clients") },
            { value: "+350", label: pick("Integraciones", "Integrations") },
            { value: "+250M", label: "API Calls/Day" },
            { value: "+1,500", label: pick("Implementaciones", "Implementations") },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-xl border bg-card text-center">
              <p className="text-base font-extrabold text-primary">{s.value}</p>
              <p className="text-[9px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { icon: "🌐", text: pick("Aceleradores pre-construidos para servicios financieros", "Pre-built accelerators for financial services") },
            { icon: "✅", text: pick("Framework de cumplimiento multi-país para LATAM/Caribe", "Multi-country compliance framework for LATAM/Caribbean") },
            { icon: "⚡", text: pick("Capacidades avanzadas de IA/ML en tiempo real", "Advanced real-time AI/ML capabilities") },
            { icon: "📈", text: pick("Modelo de crecimiento ilimitado: usuarios, préstamos, clientes", "Unlimited growth model: users, loans, clients") },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-card">
              <span className="text-sm shrink-0">{f.icon}</span>
              <p className="text-[10px] text-foreground">{f.text}</p>
            </div>
          ))}
        </div>

        {/* SaaS certification banner */}
        <div className="mt-4 rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
          <p className="text-xs font-bold text-foreground">Cloud SaaS/PaaS — SOC 2 Certified</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            99.95% - 99.99% SLA · Multi-zone · GDPR · {"<"}4hr RTO · {"<"}15min RPO
          </p>
        </div>
      </div>
    </div>
  );
};

export default SysdeStats;
