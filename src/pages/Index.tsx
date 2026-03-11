import { useState } from "react";
import { motion } from "framer-motion";
import { questions, sections } from "@/data/questions";
import HeroSection from "@/components/landing/HeroSection";
import DashboardSection from "@/components/landing/DashboardSection";
import FooterSection from "@/components/landing/FooterSection";
import DiagramCard from "@/components/landing/DiagramCard";
import ChatBot from "@/components/ChatBot";
import AutoScrollBar from "@/components/landing/AutoScrollBar";

import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/I18nContext";

const Index = () => {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <div id="hero-top">
        <HeroSection />
      </div>

      {/* Language Toggle */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-end">
          <div className="shrink-0 flex items-center gap-1 border rounded-full overflow-hidden">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-bold transition-colors ${
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

      <div id="dashboard-section">
        <DashboardSection />
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-24">
        <div className="space-y-16">
          {sections.map((section) => {
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

      <div id="footer-section">
        <FooterSection />
      </div>
      <ChatBot />
      <AutoScrollBar />
    </div>
  );
};

export default Index;
