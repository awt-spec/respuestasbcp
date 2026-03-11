import { motion } from "framer-motion";
import { counts, sections, questions } from "@/data/questions";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const DashboardSection = () => {
  const { t } = useI18n();

  const sectionCounts = sections.map((s) => ({
    ...s,
    count: questions.filter((q) => q.section === s.key).length,
  }));

  return (
    <section id="dashboard" className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {sectionCounts.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border bg-card p-5 flex items-center gap-4 shadow-sm"
          >
            <div className="text-2xl">{s.emoji}</div>
            <div>
              <p className="text-sm font-bold text-foreground">{t(`nav.section${s.key}`)}</p>
              <p className="text-xs text-muted-foreground">
                {s.count} {t("dash.answered")}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border p-5 shadow-sm"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <p className="text-sm font-semibold text-foreground">
              {counts.answered} {t("dash.of")} {counts.total} {t("dash.answered")}
            </p>
          </div>
          <span className="text-sm font-bold text-success">100%</span>
        </div>
        <Progress value={100} className="h-3 bg-secondary" />
      </motion.div>
    </section>
  );
};

export default DashboardSection;
