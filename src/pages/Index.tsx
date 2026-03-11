import { useState } from "react";
import { motion } from "framer-motion";
import { questions, sections } from "@/data/questions";
import HeroSection from "@/components/landing/HeroSection";
import DashboardSection from "@/components/landing/DashboardSection";
import FooterSection from "@/components/landing/FooterSection";
import DiagramCard from "@/components/landing/DiagramCard";

import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/I18nContext";


const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("all");
  const { lang, setLang, t } = useI18n();

  const visibleSections =
    activeSection === "all"
      ? sections
      : sections.filter((s) => s.key === activeSection);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Section Nav + Language Toggle */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
            <button
              onClick={() => setActiveSection("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "all"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              📋 {t("nav.all")}
            </button>
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === s.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {s.emoji} {t(`nav.section${s.key}`)}
              </button>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="shrink-0 flex items-center gap-1 border rounded-full overflow-hidden">
            {(["es", "en", "fr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 text-xs font-bold transition-colors ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <DashboardSection />

      <div className="max-w-5xl mx-auto px-4 pb-24">
        <div className="space-y-16">
          {visibleSections.map((section) => {
            const items = questions.filter((q) => q.section === section.key);
            if (items.length === 0) return null;

            return (
              <motion.section
                key={section.key}
                id={section.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <span>{section.emoji}</span> {t(`section.${section.key}.title`)}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {items.length}
                  </Badge>
                </h2>

                <Accordion type="multiple" className="space-y-3">
                  {items.map((q, i) => (
                    <DiagramCard key={q.id} item={q} index={i} />
                  ))}
                </Accordion>
              </motion.section>
            );
          })}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Index;
