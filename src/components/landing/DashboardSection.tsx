import { motion } from "framer-motion";
import { counts } from "@/data/questions";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const DashboardSection = () => {
  const { t } = useI18n();
  const pct = Math.round((counts.answered / counts.total) * 100);

  return (
    <section id="dashboard" className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border p-5 shadow-sm"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <p className="text-sm font-semibold text-foreground">
                {counts.answered} {t("dash.answered")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <p className="text-sm font-semibold text-foreground">
                {counts.pending} {t("dash.pending")}
              </p>
            </div>
          </div>
          <span className="text-sm font-bold text-foreground">{counts.answered}/{counts.total}</span>
        </div>
        <Progress value={pct} className="h-3 bg-secondary" />
      </motion.div>
    </section>
  );
};

export default DashboardSection;
