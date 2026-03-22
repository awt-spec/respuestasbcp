import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { questions, sections } from "@/data/questions";
import HeroSection from "@/components/landing/HeroSection";
import DashboardSection from "@/components/landing/DashboardSection";
import FooterSection from "@/components/landing/FooterSection";
import DiagramCard from "@/components/landing/DiagramCard";
import ChatBot from "@/components/ChatBot";
import { CheckCircle2, Clock, Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Accordion } from "@/components/ui/accordion";
import { useI18n } from "@/contexts/I18nContext";

type SortMode = "section" | "number" | "status" | "date";

const Index = () => {
  const { lang, setLang } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("section");

  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);

  const filteredQuestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return questions;
    return questions.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.title_en && item.title_en.toLowerCase().includes(q)) ||
        item.requerimiento.toLowerCase().includes(q) ||
        item.requerimiento_en.toLowerCase().includes(q) ||
        item.respuesta.toLowerCase().includes(q) ||
        item.respuesta_en.toLowerCase().includes(q) ||
        item.valor.toLowerCase().includes(q) ||
        item.valor_en.toLowerCase().includes(q) ||
        (item.consideraciones && item.consideraciones.toLowerCase().includes(q)) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        `q${item.id}`.includes(q) ||
        `#${item.id}`.includes(q) ||
        String(item.id).includes(q)
    );
  }, [searchQuery]);

  const sortedQuestions = useMemo(() => {
    const arr = [...filteredQuestions];
    switch (sortMode) {
      case "number":
        return arr.sort((a, b) => a.id - b.id);
      case "status":
        return arr.sort((a, b) => {
          if (a.status === b.status) return a.id - b.id;
          return a.status === "pending" ? -1 : 1;
        });
      case "date":
        return arr.sort((a, b) => {
          const da = a.receivedDate || "9999";
          const db = b.receivedDate || "9999";
          return da.localeCompare(db);
        });
      case "section":
      default:
        return arr;
    }
  }, [filteredQuestions, sortMode]);

  const groupedSections = useMemo(() => {
    if (sortMode !== "section") return null;
    return sections
      .map((s) => ({
        ...s,
        questions: sortedQuestions.filter((q) => q.section === s.key),
      }))
      .filter((s) => s.questions.length > 0);
  }, [sortedQuestions, sortMode]);

  const allGroupedSections = sections
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
      <div className="max-w-5xl mx-auto px-4 mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {allGroupedSections.map((section) => {
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

      {/* Search & Sort */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-xl border bg-card">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={pick("Buscar pregunta por título, número o contenido…", "Search by title, number or content…")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm bg-background"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <Select value={sortMode} onValueChange={(v) => setSortMode(v as SortMode)}>
              <SelectTrigger className="w-[180px] h-9 text-sm bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="section">{pick("Por sección", "By section")}</SelectItem>
                <SelectItem value="number">{pick("Por número", "By number")}</SelectItem>
                <SelectItem value="status">{pick("Por estado", "By status")}</SelectItem>
                <SelectItem value="date">{pick("Por fecha", "By date")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {searchQuery && (
          <p className="text-xs text-muted-foreground mt-2 px-1">
            {sortedQuestions.length} {pick("resultado(s)", "result(s)")}
            <button
              onClick={() => setSearchQuery("")}
              className="ml-2 text-primary hover:underline"
            >
              {pick("Limpiar", "Clear")}
            </button>
          </p>
        )}
      </div>

      {/* Questions */}
      <div className="max-w-5xl mx-auto px-4 pb-24 space-y-8">
        {sortMode === "section" && groupedSections ? (
          groupedSections.map((section) => {
            const answeredCount = section.questions.filter(q => q.status === "answered").length;
            const totalCount = section.questions.length;
            return (
              <div key={section.key} id={`section-${section.key}`} className="scroll-mt-16">
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
          })
        ) : (
          <Accordion type="multiple" className="space-y-2">
            {sortedQuestions.map((q, i) => (
              <DiagramCard key={q.id} item={q} index={i} />
            ))}
          </Accordion>
        )}

        {sortedQuestions.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">{pick("No se encontraron resultados", "No results found")}</p>
            <p className="text-xs mt-1">{pick("Intenta con otro término de búsqueda", "Try a different search term")}</p>
          </div>
        )}
      </div>

      <div id="footer-section">
        <FooterSection />
      </div>
      <ChatBot />
    </div>
  );
};

export default Index;
