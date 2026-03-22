import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Building2, Factory, Headphones, Users, Globe, ChevronDown } from "lucide-react";

const InteractivePresence = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [openCategory, setOpenCategory] = useState<number | null>(0);

  const categories = [
    {
      icon: Building2,
      label: pick("Oficinas Comerciales", "Commercial Offices"),
      accent: "from-primary to-primary/80",
      bg: "bg-primary/10",
      border: "border-primary/25",
      dot: "bg-primary",
      countries: [
        { flag: "🇵🇪", name: pick("Perú", "Peru"), detail: pick("Fábrica de software + soporte dedicado", "Software factory + dedicated support") },
        { flag: "🇨🇷", name: "Costa Rica", detail: pick("Sede central — Desarrollo, arquitectura, producto", "HQ — Development, architecture, product") },
        { flag: "🇨🇴", name: "Colombia", detail: pick("Región andina", "Andean region") },
        { flag: "🇲🇽", name: pick("México", "Mexico"), detail: pick("Equipo local (GNP, Bankaool)", "Local team (GNP, Bankaool)") },
        { flag: "🇵🇦", name: pick("Panamá (Holding)", "Panama (Holding)"), detail: "" },
        { flag: "🇸🇻", name: "El Salvador", detail: pick("Centroamérica", "Central America") },
        { flag: "🇸🇳", name: "Senegal", detail: pick("África occidental", "West Africa") },
      ],
    },
    {
      icon: Factory,
      label: pick("Fábricas de Software", "Software Factories"),
      accent: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/25",
      dot: "bg-emerald-500",
      countries: [
        { flag: "🇵🇪", name: pick("Perú", "Peru"), detail: pick("Principal — equipo dedicado para BCP", "Primary — dedicated BCP team") },
        { flag: "🇨🇷", name: "Costa Rica", detail: pick("Desarrollo core & arquitectura", "Core development & architecture") },
        { flag: "🇨🇴", name: "Colombia", detail: pick("Desarrollo regional", "Regional development") },
        { flag: "🇸🇻", name: "El Salvador", detail: pick("Desarrollo regional", "Regional development") },
      ],
    },
    {
      icon: Headphones,
      label: pick("Centros de Soporte (SVA)", "Support Centers (SVA)"),
      accent: "from-violet-500 to-violet-600",
      bg: "bg-violet-500/10",
      border: "border-violet-500/25",
      dot: "bg-violet-500",
      countries: [
        { flag: "🇵🇪", name: pick("Perú", "Peru"), detail: pick("Soporte dedicado 24/7", "Dedicated 24/7 support") },
        { flag: "🇨🇷", name: "Costa Rica", detail: pick("Soporte 1er y 2do nivel", "1st & 2nd level support") },
        { flag: "🇨🇴", name: "Colombia", detail: "" },
        { flag: "🇲🇽", name: pick("México", "Mexico"), detail: "" },
        { flag: "🇸🇻", name: "El Salvador", detail: "" },
        { flag: "🇩🇴", name: pick("Rep. Dominicana", "Dominican Republic"), detail: "" },
      ],
    },
  ];

  const regions = [
    { label: pick("Latinoamérica", "Latin America"), icon: "🌎" },
    { label: pick("África", "Africa"), icon: "🌍" },
    { label: pick("Europa", "Europe"), icon: "🌍" },
    { label: "Asia", icon: "🌏" },
  ];

  return (
    <div className="space-y-5 mt-4">
      {/* Global presence banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/70 p-5 text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12)_0%,_transparent_60%)]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-black tracking-tight">
              {pick("Presencia Global", "Global Presence")}
            </span>
          </div>
          <p className="text-[12px] text-primary-foreground/80 leading-relaxed mb-3">
            {pick(
              "SYSDE International tiene presencia en 4 continentes con más de 1,000 instituciones financieras operando con nuestra tecnología.",
              "SYSDE International has presence in 4 continents with over 1,000 financial institutions running on our technology."
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.map((r, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-bold"
              >
                <span>{r.icon}</span>
                {r.label}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category accordion cards */}
      <div className="space-y-3">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isOpen = openCategory === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border ${cat.border} ${cat.bg} overflow-hidden transition-shadow ${isOpen ? "shadow-lg" : "hover:shadow-md"}`}
            >
              <button
                onClick={() => setOpenCategory(isOpen ? null : i)}
                className="w-full flex items-center gap-3 p-4 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.accent} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-extrabold text-foreground">{cat.label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {cat.countries.length} {pick("países", "countries")}
                  </p>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.countries.map((country, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.04 }}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-background/60 border border-border/50"
                        >
                          <span className="text-xl">{country.flag}</span>
                          <div className="min-w-0">
                            <p className="text-[12px] font-bold text-foreground">{country.name}</p>
                            {country.detail && (
                              <p className="text-[10px] text-muted-foreground leading-snug truncate">{country.detail}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* BCP dedicated team */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-5"
      >
        <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          {pick("Equipo Dedicado para BCP", "Dedicated Team for BCP")}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { role: pick("Gerente de Proyecto", "Project Manager"), loc: pick("Perú (on-site)", "Peru (on-site)"), desc: pick("Coordinación y planificación", "Coordination and planning") },
            { role: pick("Consultores Funcionales", "Functional Consultants"), loc: pick("Perú (on-site)", "Peru (on-site)"), desc: pick("Análisis y configuración", "Analysis and configuration") },
            { role: pick("Fábrica de Software", "Software Factory"), loc: pick("Perú", "Peru"), desc: pick("Desarrollo y personalización", "Development and customization") },
            { role: pick("Arquitecto de Solución", "Solution Architect"), loc: pick("Perú / Remoto", "Peru / Remote"), desc: pick("Diseño técnico e integraciones", "Technical design and integrations") },
            { role: pick("Equipo de Soporte", "Support Team"), loc: pick("Perú", "Peru"), desc: pick("Soporte dedicado 24/7", "Dedicated 24/7 support") },
            { role: pick("Integradores", "Integration Devs"), loc: pick("Costa Rica / Remoto", "Costa Rica / Remote"), desc: pick("APIs, conectores, customización", "APIs, connectors, customization") },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-xl border bg-card hover:shadow-sm transition-shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-black text-primary">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-foreground">{item.role}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                <p className="text-[10px] text-primary font-semibold mt-0.5">📍 {item.loc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractivePresence;
