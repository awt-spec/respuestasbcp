import { motion } from "framer-motion";
import { counts } from "@/data/questions";
import { CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const HeroSection = () => {
  const { lang, t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-primary min-h-[70vh] flex items-center">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-10 left-[10%] w-[500px] h-[500px] rounded-full border border-white/40" />
        <div className="absolute top-20 left-[15%] w-[400px] h-[400px] rounded-full border border-white/30" />
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full border border-white/20" />
      </div>

      {/* Bottom-right white triangle accent */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[200px] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[200px] border-b-white border-l-[300px] border-l-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-6">
            Sysde
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] mb-8 tracking-tight uppercase">
            {lang === "es" ? "Respuestas a" : "Responses to"}
            <br />
            {lang === "es" ? "Consultas BCP" : "BCP Queries"}
          </h1>

          <div className="flex items-start gap-8 mb-10">
            <div className="border-r border-white/30 pr-8">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                {lang === "es" ? "Preparado por:" : "Prepared by:"}
              </p>
              <p className="text-white font-bold text-sm">SYSDE</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                {lang === "es" ? "Preparado para:" : "Prepared for:"}
              </p>
              <p className="text-white font-bold text-sm">
                {lang === "es" ? "BANCO DE CRÉDITO DEL PERÚ — LEASING" : "BANCO DE CRÉDITO DEL PERÚ — LEASING"}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-10">
            <p className="text-white/50 text-xs uppercase tracking-wider">
              {lang === "es" ? "Detalles de contacto" : "Contact details"}
            </p>
            <p className="text-white/80 text-sm">📞 +506 8657 0390</p>
            <p className="text-white/80 text-sm">✉ info@sysde.com</p>
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-sm bg-white/10 backdrop-blur-sm text-white"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xl font-bold">{counts.answered}</span>
              <span className="opacity-80">{t("hero.answered")}</span>
            </motion.div>
            <span className="text-white/40 text-xs">
              10 / {lang === "es" ? "marzo" : "March"} / 2026
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
