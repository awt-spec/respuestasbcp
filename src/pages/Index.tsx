import { motion } from "framer-motion";
import { questions, sections } from "@/data/questions";
import HeroSection from "@/components/landing/HeroSection";
import DashboardSection from "@/components/landing/DashboardSection";
import FooterSection from "@/components/landing/FooterSection";
import DiagramCard from "@/components/landing/DiagramCard";
import ChatBot from "@/components/ChatBot";

import { Accordion } from "@/components/ui/accordion";
import { useI18n } from "@/contexts/I18nContext";

const Index = () => {
  const { lang, setLang } = useI18n();

  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);

  // Group questions by section
  const groupedSections = sections
    .map((s) => ({
      ...s,
      questions: questions.filter((q) => q.section === s.key),
    }))
    .filter((s) => s.questions.length > 0);

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

      <div className="max-w-5xl mx-auto px-4 pb-24 space-y-10">
        {groupedSections.map((section) => (
          <div key={section.key}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{section.emoji}</span>
              <h2 className="text-base font-bold text-foreground">
                {pick(section.label, section.label_en)}
              </h2>
              <span className="text-xs text-muted-foreground">
                ({section.questions.length})
              </span>
            </div>
            <Accordion type="multiple" className="space-y-3">
              {section.questions.map((q, i) => (
                <DiagramCard key={q.id} item={q} index={i} />
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div id="footer-section">
        <FooterSection />
      </div>
      <ChatBot />
    </div>
  );
};

export default Index;
