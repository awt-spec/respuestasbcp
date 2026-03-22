import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Server, Users, Database, TrendingUp, Zap, Shield, ChevronDown, BarChart3 } from "lucide-react";

interface ScaleMetric {
  icon: React.ElementType;
  value: string;
  label: string;
  label_en: string;
  desc: string;
  desc_en: string;
  color: string;
}

const metrics: ScaleMetric[] = [
  { icon: Users, value: "1,000+", label: "Instituciones en Producción", label_en: "Institutions in Production", desc: "Más de mil instituciones financieras operando en producción con tecnología SYSDE, incluyendo bancos, cooperativas, fondos de pensión y empresas de leasing en América Latina, África, Europa y Asia", desc_en: "Over a thousand financial institutions operating in production with SYSDE technology, including banks, cooperatives, pension funds and leasing companies across Latin America, Africa, Europe and Asia", color: "primary" },
  { icon: TrendingUp, value: "~82%", label: "Mercado de AFPs en LatAm", label_en: "AFP Market in LatAm", desc: "Aproximadamente el 82% del mercado de AFPs y plataformas de pensiones en América Latina opera con SYSDE. Estos sistemas procesan volúmenes que superan ampliamente los requerimientos de una operación de leasing", desc_en: "Approximately 82% of the AFP and pension platform market in Latin America operates with SYSDE. These systems process volumes far exceeding leasing operation requirements", color: "blue-500" },
  { icon: Database, value: "~30%", label: "Microfinanzas LatAm", label_en: "Microfinance LatAm", desc: "Aproximadamente el 30% del mercado de microfinanzas en América Latina utiliza plataformas SYSDE, validando la capacidad de procesamiento masivo de operaciones", desc_en: "Approximately 30% of the microfinance market in Latin America uses SYSDE platforms, validating massive operation processing capacity", color: "emerald-500" },
  { icon: Server, value: "Auto-Scale", label: "Escalamiento Horizontal", label_en: "Horizontal Scaling", desc: "Arquitectura de microservicios sobre Azure con auto-scaling horizontal. El dimensionamiento de infraestructura se revisa anualmente para cada cliente", desc_en: "Microservices architecture on Azure with horizontal auto-scaling. Infrastructure dimensioning reviewed annually for each client", color: "violet-500" },
];

const references = [
  { name: "CCSS Costa Rica", metric: "65,000+", metricLabel: "usuarios internos", metricLabel_en: "internal users", desc: "Fondo de pensiones más grande de Centroamérica. Millones de registros de afiliados procesados mensualmente", desc_en: "Largest pension fund in Central America. Millions of affiliate records processed monthly" },
  { name: "IVM / RIVM", metric: "3M+", metricLabel: "afiliados activos", metricLabel_en: "active affiliates", desc: "Régimen de pensiones con más de 3 millones de afiliados activos en el sistema", desc_en: "Pension regime with over 3 million active affiliates in the system" },
  { name: "CMI (15 países)", metric: "54,000+", metricLabel: "colaboradores", metricLabel_en: "employees", desc: "Conglomerado más grande de Centroamérica. Operaciones multi-país y multi-moneda simultáneas", desc_en: "Largest conglomerate in Central America. Simultaneous multi-country multi-currency operations" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  "primary": { bg: "bg-primary/10", border: "border-primary/25", text: "text-primary", badge: "bg-primary text-primary-foreground" },
  "emerald-500": { bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-500", badge: "bg-emerald-500 text-white" },
  "blue-500": { bg: "bg-blue-500/10", border: "border-blue-500/25", text: "text-blue-500", badge: "bg-blue-500 text-white" },
  "violet-500": { bg: "bg-violet-500/10", border: "border-violet-500/25", text: "text-violet-500", badge: "bg-violet-500 text-white" },
};

const InteractiveScalability = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [expandedMetric, setExpandedMetric] = useState<number | null>(null);
  const [showRefs, setShowRefs] = useState(false);

  return (
    <div className="space-y-6 mt-4">
      {/* Header — factual, not commercial */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-5 px-4 rounded-2xl bg-gradient-to-br from-primary/8 via-primary/4 to-transparent border border-primary/15"
      >
        <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="text-lg font-bold text-foreground mb-2">
          {pick("Capacidad de Escala Comprobada", "Proven Scale Capacity")}
        </h3>
        <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {pick(
            "La misma arquitectura que soporta fondos de pensión con millones de afiliados y conglomerados multinacionales es la base de SYSDE PLUS Leasing. El dimensionamiento se revisa anualmente para cada cliente.",
            "The same architecture supporting pension funds with millions of affiliates and multinational conglomerates is the foundation of SYSDE PLUS Leasing. Dimensioning is reviewed annually for each client."
          )}
        </p>
      </motion.div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          const c = colorMap[m.color];
          const isOpen = expandedMetric === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
            >
              <button
                onClick={() => setExpandedMetric(isOpen ? null : i)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isOpen ? `${c.bg} ${c.border} shadow-lg` : "bg-card border-border hover:shadow-md hover:border-primary/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </div>
                <p className={`text-2xl font-extrabold ${c.text} tracking-tight`}>{m.value}</p>
                <p className="text-xs font-bold text-foreground mt-0.5">{pick(m.label, m.label_en)}</p>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 text-xs text-muted-foreground leading-relaxed">
                      {pick(m.desc, m.desc_en)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Verifiable references */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => setShowRefs(!showRefs)}
          className="w-full flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">
              {pick("Referencias de Volumen en Producción", "Production Volume References")}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {pick("Clientes verificables con volúmenes superiores a leasing bancario", "Verifiable clients with volumes exceeding bank leasing")}
            </p>
          </div>
          <motion.div animate={{ rotate: showRefs ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showRefs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-2">
                {references.map((ref, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-foreground">{ref.name}</p>
                      <p className="text-[10px] text-muted-foreground">{pick(ref.desc, ref.desc_en)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-primary">{ref.metric}</p>
                      <p className="text-[10px] text-muted-foreground">{pick(ref.metricLabel, ref.metricLabel_en)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dimensioning note */}
      <div className="rounded-xl bg-muted/30 border p-4">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">🏗️ {pick("Dimensionamiento", "Dimensioning")}:</span>{" "}
          {pick(
            "SYSDE revisa anualmente el dimensionamiento de infraestructura para cada cliente, asegurando que la capacidad esté siempre alineada con el crecimiento proyectado de la operación.",
            "SYSDE reviews infrastructure dimensioning annually for each client, ensuring capacity is always aligned with projected operational growth."
          )}
        </p>
      </div>
    </div>
  );
};

export default InteractiveScalability;
