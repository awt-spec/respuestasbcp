import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Building2, Factory, Headphones, MapPin, ChevronRight, Globe } from "lucide-react";

interface Branch {
  type: "oficinas" | "fabricas" | "sva";
  label: string;
  label_en: string;
  icon: React.ElementType;
  count: string;
  locations: string[];
  locations_en: string[];
  color: string;
}

const branches: Branch[] = [
  {
    type: "oficinas",
    label: "Oficinas",
    label_en: "Offices",
    icon: Building2,
    count: "01",
    locations: [
      "Perú", "Colombia", "México", "Panamá Holding", "Costa Rica (Oficina Central)", "El Salvador", "Senegal"
    ],
    locations_en: [
      "Peru", "Colombia", "Mexico", "Panama Holding", "Costa Rica (Central Office)", "El Salvador", "Senegal"
    ],
    color: "primary",
  },
  {
    type: "fabricas",
    label: "Fábricas",
    label_en: "Factories",
    icon: Factory,
    count: "01",
    locations: ["Perú", "Colombia", "Costa Rica", "El Salvador"],
    locations_en: ["Peru", "Colombia", "Costa Rica", "El Salvador"],
    color: "emerald-500",
  },
  {
    type: "sva",
    label: "SVA",
    label_en: "SVA",
    icon: Headphones,
    count: "03",
    locations: ["Perú", "Colombia", "Costa Rica", "México", "El Salvador", "República Dominicana"],
    locations_en: ["Peru", "Colombia", "Costa Rica", "Mexico", "El Salvador", "Dominican Republic"],
    color: "violet-500",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; ring: string }> = {
  "primary": { bg: "bg-primary/10", border: "border-primary/25", text: "text-primary", badge: "bg-primary text-primary-foreground", ring: "ring-primary/30" },
  "emerald-500": { bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-500", badge: "bg-emerald-500 text-white", ring: "ring-emerald-500/30" },
  "violet-500": { bg: "bg-violet-500/10", border: "border-violet-500/25", text: "text-violet-500", badge: "bg-violet-500 text-white", ring: "ring-violet-500/30" },
};

const areas = [
  { label: "Comercial", label_en: "Commercial" },
  { label: "Desarrollo", label_en: "Development" },
  { label: "Ayuda", label_en: "Support" },
];

const InteractivePresence = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [activeBranch, setActiveBranch] = useState<number>(0);

  return (
    <div className="space-y-6 mt-4">
      {/* Org chart visual */}
      <div className="flex flex-col md:flex-row items-stretch gap-6">
        {/* Left: SYSDE hub */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center shrink-0"
        >
          <div className="w-32 h-32 rounded-full bg-primary flex flex-col items-center justify-center shadow-xl ring-4 ring-primary/20">
            <span className="text-lg font-black text-primary-foreground tracking-tight">SYSDE</span>
            <div className="mt-2 space-y-1">
              {areas.map((a, i) => (
                <div key={i} className="px-3 py-0.5 rounded bg-white/90 text-[9px] font-bold text-primary text-center">
                  {pick(a.label, a.label_en)}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center: connecting lines (hidden on mobile) */}
        <div className="hidden md:flex flex-col items-center justify-center gap-8 py-4">
          {branches.map((_, i) => (
            <div key={i} className="w-12 h-px bg-border" />
          ))}
        </div>

        {/* Right: Branch cards */}
        <div className="flex-1 space-y-3">
          {branches.map((branch, i) => {
            const Icon = branch.icon;
            const c = colorMap[branch.color];
            const isActive = activeBranch === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => setActiveBranch(i)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all ${
                    isActive
                      ? `${c.bg} ${c.border} shadow-lg ring-2 ${c.ring}`
                      : "bg-card border-border hover:shadow-md hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Circle icon */}
                    <div className={`w-12 h-12 rounded-full ${isActive ? c.badge : "bg-muted text-muted-foreground"} flex items-center justify-center transition-colors shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[9px] font-bold ${c.badge} px-1.5 py-0.5 rounded`}>
                          {branch.count}
                        </span>
                        <span className="text-sm font-extrabold text-foreground">
                          {pick(branch.label, branch.label_en)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                        <p className="text-[11px] text-muted-foreground truncate">
                          {pick("Ubicaciones", "Locations")}:
                        </p>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.15 }}>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-foreground/10">
                          <div className="flex flex-wrap gap-2">
                            {pick(branch.locations, branch.locations_en).map((loc, j) => (
                              <motion.span
                                key={j}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: j * 0.05 }}
                                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold ${c.bg} ${c.border} border`}
                              >
                                <Globe className={`w-3 h-3 ${c.text}`} />
                                {loc}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* BCP dedicated team table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-5"
      >
        <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          {pick("Equipo de Implementación para BCP", "Implementation Team for BCP")}
        </h4>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-primary/5">
                <th className="px-4 py-2.5 text-left font-bold text-foreground text-[11px]">{pick("Rol", "Role")}</th>
                <th className="px-4 py-2.5 text-left font-bold text-foreground text-[11px]">{pick("Responsabilidad", "Responsibility")}</th>
                <th className="px-4 py-2.5 text-left font-bold text-foreground text-[11px]">{pick("Ubicación", "Location")}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [pick("Gerente de Proyecto", "Project Manager"), pick("Coordinación y planificación", "Coordination and planning"), pick("Perú (on-site)", "Peru (on-site)")],
                [pick("Consultores Funcionales", "Functional Consultants"), pick("Análisis y configuración", "Analysis and configuration"), pick("Perú (on-site)", "Peru (on-site)")],
                [pick("Fábrica de Software", "Software Factory"), pick("Desarrollo y personalización", "Development and customization"), pick("Perú", "Peru")],
                [pick("Arquitecto de Solución", "Solution Architect"), pick("Diseño técnico e integraciones", "Technical design and integrations"), pick("Perú / Remoto", "Peru / Remote")],
                [pick("Equipo de Soporte", "Support Team"), pick("Soporte dedicado 24/7", "Dedicated 24/7 support"), pick("Perú", "Peru")],
                [pick("Desarrolladores de Integración", "Integration Developers"), pick("APIs, conectores, customización", "APIs, connectors, customization"), pick("Costa Rica / Remoto", "Costa Rica / Remote")],
              ].map((row, i) => (
                <tr key={i} className="border-t hover:bg-muted/30 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-2.5 text-[11px] ${j === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractivePresence;
