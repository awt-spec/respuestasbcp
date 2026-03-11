import { motion } from "framer-motion";
import { counts } from "@/data/questions";
import { CheckCircle2, Building2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 mb-5 text-white/90 text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {t("hero.badge")}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 tracking-tight">
            {t("hero.title1")}
            <br />
            <span className="text-white/80">{t("hero.title2")}</span>
          </h1>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-2">
            {t("hero.subtitle")}
          </p>
          <p className="text-sm text-white/40 max-w-xl mx-auto mb-8">
            {t("hero.prepared")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-sm backdrop-blur-sm bg-green-500/20 text-green-300"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xl font-bold">{counts.answered}</span>
              <span className="opacity-80">{t("hero.answered")}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-sm backdrop-blur-sm bg-white/10 text-white/70"
            >
              <Building2 className="w-5 h-5" />
              <span className="text-xl font-bold">1</span>
              <span className="opacity-80">{t("hero.sections")}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
