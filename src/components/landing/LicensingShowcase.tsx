import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import {
  Infinity as InfinityIcon,
  Users,
  Building2,
  HeadphonesIcon,
  GraduationCap,
  Map,
  Puzzle,
  DollarSign,
  Zap,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const LicensingShowcase = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());

  const toggleCard = (i: number) => {
    setRevealedCards((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const pillars = [
    {
      icon: Users,
      number: "∞",
      title: pick("Usuarios", "Users"),
      subtitle: pick("Sin límites. Sin cobro por usuario.", "No limits. No per-user charges."),
      detail: pick(
        "Usuarios concurrentes, registrados, administrativos — todos incluidos. Crece tu equipo sin preocuparte por el costo.",
        "Concurrent, registered, administrative users — all included. Grow your team without worrying about cost."
      ),
      accent: "from-blue-500 to-blue-600",
      bg: "from-blue-500/10 to-blue-600/5",
      border: "border-blue-500/20",
    },
    {
      icon: Building2,
      number: "∞",
      title: pick("Empresas", "Companies"),
      subtitle: pick("Multi-entidad. Multi-país. Una suscripción.", "Multi-entity. Multi-country. One subscription."),
      detail: pick(
        "Sucursales, filiales, entidades reguladas — todas dentro de la misma plataforma sin cargos adicionales.",
        "Branches, subsidiaries, regulated entities — all within the same platform at no extra cost."
      ),
      accent: "from-emerald-500 to-emerald-600",
      bg: "from-emerald-500/10 to-emerald-600/5",
      border: "border-emerald-500/20",
    },
    {
      icon: HeadphonesIcon,
      number: "∞",
      title: pick("Soporte Ilimitado", "Unlimited Support"),
      subtitle: pick("Soporte ilimitado sin costo adicional. Sin tickets de pago. Sin cobro por incidente.", "Unlimited support at no additional cost. No paid tickets. No per-incident charges."),
      detail: pick(
        "Soporte técnico y funcional ilimitado, incluido en la suscripción sin costo adicional. Sin cobro por ticket, sin cobro por incidente, sin tiers de servicio. Siempre premium, sin restricciones.",
        "Unlimited technical and functional support, included in the subscription at no additional cost. No per-ticket charges, no per-incident charges, no service tiers. Always premium, no restrictions."
      ),
      accent: "from-violet-500 to-violet-600",
      bg: "from-violet-500/10 to-violet-600/5",
      border: "border-violet-500/20",
    },
    {
      icon: GraduationCap,
      number: "∞",
      title: pick("Capacitación", "Training"),
      subtitle: pick("Formación continua, consultas puntuales y sesiones de entrenamiento — sin costo.", "Ongoing training, ad-hoc consultations and enablement sessions — no cost."),
      detail: pick(
        "Sesiones de onboarding, capacitación programada, entrenamiento por módulo, consultas puntuales funcionales o técnicas — todo incluido sin costo adicional. El equipo de BCP siempre tendrá acceso a acompañamiento.",
        "Onboarding sessions, scheduled training, per-module enablement, ad-hoc functional or technical consultations — all included at no additional cost. BCP's team will always have access to support."
      ),
      accent: "from-amber-500 to-amber-600",
      bg: "from-amber-500/10 to-amber-600/5",
      border: "border-amber-500/20",
    },
    {
      icon: DollarSign,
      number: "∞",
      title: pick("Transacciones Ilimitadas", "Unlimited Transactions"),
      subtitle: pick("Desembolsos, cobros, consultas — ilimitados sin costo adicional.", "Disbursements, collections, queries — unlimited at no additional cost."),
      detail: pick(
        "No importa el volumen: 100 o 100,000 operaciones mensuales, el costo no cambia. Transacciones ilimitadas incluidas en la suscripción.",
        "Volume doesn't matter: 100 or 100,000 monthly operations, the cost stays the same. Unlimited transactions included in the subscription."
      ),
      accent: "from-rose-500 to-rose-600",
      bg: "from-rose-500/10 to-rose-600/5",
      border: "border-rose-500/20",
    },
    {
      icon: Sparkles,
      number: "∞",
      title: pick("Desarrollo Evolutivo Ilimitado", "Unlimited Evolutionary Dev."),
      subtitle: pick("Mejoras, nuevas funcionalidades y regulatorio — ilimitado sin costo adicional.", "Improvements, new features and regulatory — unlimited at no additional cost."),
      detail: pick(
        "Todas las mejoras funcionales, ajustes regulatorios y nuevas funcionalidades se entregan como parte de la suscripción sin límite. Desarrollo evolutivo ilimitado.",
        "All functional improvements, regulatory adjustments and new functionalities are delivered as part of the subscription without limit. Unlimited evolutionary development."
      ),
      accent: "from-teal-500 to-teal-600",
      bg: "from-teal-500/10 to-teal-600/5",
      border: "border-teal-500/20",
    },
    {
      icon: Puzzle,
      number: pick("Modular", "Modular"),
      title: pick("Arquitectura", "Architecture"),
      subtitle: pick("Activa solo lo que necesitas. Expande sin renegociar.", "Activate only what you need. Expand without renegotiating."),
      detail: pick(
        "Leasing, Factoring, Créditos, Pensiones — módulos independientes que se integran perfectamente.",
        "Leasing, Factoring, Credits, Pensions — independent modules that integrate seamlessly."
      ),
      accent: "from-cyan-500 to-cyan-600",
      bg: "from-cyan-500/10 to-cyan-600/5",
      border: "border-cyan-500/20",
    },
  ];

  return (
    <div className="space-y-10">
      {/* ── Act I: The Big Statement ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[11px] font-bold text-primary tracking-wider uppercase">
            {pick("Modelo de Licenciamiento", "Licensing Model")}
          </span>
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight">
          {pick("Una suscripción.", "One subscription.")}
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {pick("Todo ilimitado.", "Everything unlimited.")}
          </span>
        </h3>
        <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
          {pick(
            "Sin sorpresas. Sin costos ocultos. Sin letra pequeña. Así de simple.",
            "No surprises. No hidden costs. No fine print. That simple."
          )}
        </p>
      </motion.div>

      {/* ── Act II: The Reveal — "One more thing..." style cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          const isRevealed = revealedCards.has(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, type: "spring", stiffness: 180 }}
              onClick={() => toggleCard(i)}
              className={`group relative rounded-2xl border ${pillar.border} bg-gradient-to-br ${pillar.bg} p-6 cursor-pointer transition-all hover:shadow-xl overflow-hidden`}
            >
              {/* Background glow */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-bl ${pillar.accent} opacity-[0.07] blur-2xl group-hover:opacity-[0.12] transition-opacity`} />

              {/* Number — the star */}
              <motion.p
                className={`text-4xl font-black bg-gradient-to-br ${pillar.accent} bg-clip-text text-transparent mb-1 tracking-tighter`}
                animate={isRevealed ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {pillar.number}
              </motion.p>

              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-extrabold text-foreground">{pillar.title}</p>
              </div>

              <p className="text-[11px] text-muted-foreground leading-snug">{pillar.subtitle}</p>

              {/* Reveal detail */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-foreground/10">
                      <p className="text-[11px] text-foreground/80 leading-relaxed">{pillar.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Click hint */}
              <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-60 transition-opacity">
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Act III: "And one more thing..." — BCP Roadmap ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Dramatic gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />

        <div className="relative p-8 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Zap className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="text-[10px] font-bold text-primary-foreground/70 uppercase tracking-[0.25em]">
              {pick("Y una cosa más…", "And one more thing…")}
            </span>
          </div>

          <h4 className="text-xl md:text-2xl font-black text-primary-foreground leading-tight mb-3">
            {pick("Roadmap Evolutivo", "Evolutionary Roadmap")}
            <br />
            <span className="text-primary-foreground/80">
              {pick("exclusivo para BCP", "exclusive to BCP")}
            </span>
          </h4>

          <p className="text-sm text-primary-foreground/70 max-w-lg leading-relaxed mb-6">
            {pick(
              "Cualquier mejora, ajuste o nueva funcionalidad desarrollada dentro del alcance del proyecto se entrega sin costo adicional como parte de la evolución continua de la plataforma.",
              "Any improvement, adjustment, or new functionality developed within the project scope is delivered at no additional cost as part of the platform's continuous evolution."
            )}
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: Check, text: pick("Mejoras funcionales", "Functional improvements") },
              { icon: Check, text: pick("Nuevas funcionalidades", "New features") },
              { icon: Check, text: pick("Actualizaciones regulatorias", "Regulatory updates") },
              { icon: Check, text: pick("Sin costo adicional", "No additional cost") },
            ].map((tag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm px-3.5 py-2 rounded-full"
              >
                <tag.icon className="w-3.5 h-3.5 text-primary-foreground" />
                <span className="text-[11px] font-bold text-primary-foreground">{tag.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LicensingShowcase;
