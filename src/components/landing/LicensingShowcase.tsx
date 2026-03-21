import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Infinity as InfinityIcon, Users, Building2, HeadphonesIcon, GraduationCap, Map, Puzzle, DollarSign, Zap } from "lucide-react";

const benefits = [
  { icon: Users, label: "Usuarios Ilimitados", label_en: "Unlimited Users", desc: "Sin restricción de usuarios concurrentes", desc_en: "No concurrent user restrictions", color: "from-blue-500/15 to-blue-500/5 border-blue-500/25" },
  { icon: Building2, label: "Empresas Ilimitadas", label_en: "Unlimited Companies", desc: "Multi-entidad sin costo adicional", desc_en: "Multi-entity at no additional cost", color: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25" },
  { icon: HeadphonesIcon, label: "Soporte Ilimitado", label_en: "Unlimited Support", desc: "24/7 incluido en la suscripción", desc_en: "24/7 included in subscription", color: "from-violet-500/15 to-violet-500/5 border-violet-500/25" },
  { icon: GraduationCap, label: "Capacitación Ilimitada", label_en: "Unlimited Training", desc: "Formación continua sin costos extra", desc_en: "Ongoing training at no extra cost", color: "from-amber-500/15 to-amber-500/5 border-amber-500/25" },
  { icon: Puzzle, label: "Componente Modular", label_en: "Modular Component", desc: "Activa solo los módulos que necesites", desc_en: "Activate only the modules you need", color: "from-rose-500/15 to-rose-500/5 border-rose-500/25" },
  { icon: DollarSign, label: "Sin Costos Ocultos", label_en: "No Hidden Costs", desc: "Precio predecible, sin sorpresas", desc_en: "Predictable pricing, no surprises", color: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25" },
];

const LicensingShowcase = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);

  return (
    <div>
      {/* Hero badge */}
      <div className="flex justify-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative"
        >
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary via-primary to-[hsl(352,70%,35%)] flex flex-col items-center justify-center shadow-2xl shadow-primary/30">
            <InfinityIcon className="w-10 h-10 text-primary-foreground mb-1" />
            <p className="text-primary-foreground text-sm font-extrabold">{pick("ILIMITADO", "UNLIMITED")}</p>
            <p className="text-primary-foreground/80 text-[9px] font-medium">{pick("Suscripción", "Subscription")}</p>
          </div>
          <motion.div
            className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-8 rounded-full border border-dotted border-primary/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Subscription model */}
      <div className="text-center mb-6">
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
          {pick("Modelo de Suscripción", "Subscription Model")}
        </p>
        <h4 className="text-lg font-extrabold text-foreground">
          {pick("Mensual o Anual — ", "Monthly or Annual — ")}
          <span className="text-primary">{pick("Todo Incluido", "All Inclusive")}</span>
        </h4>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className={`rounded-2xl border bg-gradient-to-br ${benefit.color} p-4 cursor-default`}
            >
              <Icon className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs font-bold text-foreground">{pick(benefit.label, benefit.label_en)}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{pick(benefit.desc, benefit.desc_en)}</p>
            </motion.div>
          );
        })}
      </div>

      {/* BCP Roadmap banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Map className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              {pick("Roadmap Evolutivo BCP", "BCP Evolutionary Roadmap")}
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {pick(
                "Cualquier mejora, ajuste o nueva funcionalidad desarrollada dentro del alcance del proyecto se entrega sin costo adicional como parte de la evolución continua de la plataforma.",
                "Any improvement, adjustment, or new functionality developed within the project scope is delivered at no additional cost as part of the platform's continuous evolution."
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                pick("Mejoras funcionales", "Functional improvements"),
                pick("Nuevas funcionalidades", "New features"),
                pick("Actualizaciones regulatorias", "Regulatory updates"),
                pick("Sin costo adicional", "No additional cost"),
              ].map((tag, i) => (
                <span key={i} className="text-[10px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LicensingShowcase;
