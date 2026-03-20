import { motion } from "framer-motion";
import { questions, sections } from "@/data/questions";
import HeroSection from "@/components/landing/HeroSection";
import DashboardSection from "@/components/landing/DashboardSection";
import FooterSection from "@/components/landing/FooterSection";
import DiagramCard from "@/components/landing/DiagramCard";
import ChatBot from "@/components/ChatBot";
import { CheckCircle2, Clock } from "lucide-react";

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

      {/* Section overview grid */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {groupedSections.map((section) => {
            const answeredCount = section.questions.filter(q => q.status === "answered").length;
            const totalCount = section.questions.length;
            const allAnswered = answeredCount === totalCount;
            return (
              <a
                key={section.key}
                href={`#section-${section.key}`}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all hover:shadow-sm ${
                  allAnswered
                    ? "bg-success/5 border-success/20 text-success"
                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <span>{section.emoji}</span>
                <span className="truncate flex-1">{pick(section.label, section.label_en)}</span>
                <span className="shrink-0 text-[10px] font-bold">{answeredCount}/{totalCount}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Questions by section */}
      <div className="max-w-5xl mx-auto px-4 pb-24 space-y-8">
        {groupedSections.map((section) => {
          const answeredCount = section.questions.filter(q => q.status === "answered").length;
          const totalCount = section.questions.length;
          return (
            <div key={section.key} id={`section-${section.key}`} className="scroll-mt-16">
              {/* Section header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{section.emoji}</span>
                  <h2 className="text-sm font-bold text-foreground">
                    {pick(section.label, section.label_en)}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5">
                  {answeredCount > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {answeredCount}
                    </span>
                  )}
                  {answeredCount < totalCount && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      {totalCount - answeredCount}
                    </span>
                  )}
                </div>
              </div>

              <Accordion type="multiple" className="space-y-2">
                {section.questions.map((q, i) => (
                  <DiagramCard key={q.id} item={q} index={i} />
                ))}
              </Accordion>
            </div>
          );
        })}
      </div>

      <div id="footer-section">
        <FooterSection />
      </div>
      <ChatBot />
    </div>
  );
};

export default Index;
