import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, Navigation } from "lucide-react";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero-top", label: "Inicio" },
  { id: "dashboard-section", label: "Dashboard" },
  { id: "q-1", label: "Pregunta 1" },
  { id: "q-2", label: "Pregunta 2" },
  { id: "q-3", label: "Pregunta 3" },
  { id: "footer-section", label: "Cierre" },
];

const AUTO_SCROLL_INTERVAL = 6000; // 6s per section

const AutoScrollBar = () => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToSection = useCallback((index: number) => {
    const section = sections[index];
    if (!section) return;

    // Try finding by data-question-id first for questions
    let el: Element | null = null;
    if (section.id.startsWith("q-")) {
      const qId = section.id.replace("q-", "");
      el = document.querySelector(`[data-question-id="${qId}"]`);
    } else {
      el = document.getElementById(section.id);
    }

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    setIsAutoScrolling(true);
    setCurrentIndex(0);
    setProgress(0);
    scrollToSection(0);
  }, [scrollToSection]);

  const stopAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const skipToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % sections.length;
      scrollToSection(next);
      setProgress(0);
      return next;
    });
  }, [scrollToSection]);

  useEffect(() => {
    if (!isAutoScrolling) return;

    // Progress bar
    const progressTick = 50;
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (progressTick / AUTO_SCROLL_INTERVAL) * 100;
        return next >= 100 ? 0 : next;
      });
    }, progressTick);

    // Section advance
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= sections.length) {
          stopAutoScroll();
          return prev;
        }
        scrollToSection(next);
        setProgress(0);
        return next;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoScrolling, scrollToSection, stopAutoScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-card/95 backdrop-blur-xl border shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2">
            {/* Auto-scroll toggle */}
            {!isAutoScrolling ? (
              <button
                onClick={startAutoScroll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold hover:bg-primary/90 transition-colors"
              >
                <Play className="w-3 h-3" />
                Auto Tour
              </button>
            ) : (
              <button
                onClick={stopAutoScroll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-[11px] font-bold hover:bg-destructive/90 transition-colors"
              >
                <Pause className="w-3 h-3" />
                Detener
              </button>
            )}

            {/* Section dots / nav */}
            <div className="flex items-center gap-1 px-1">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentIndex(i);
                    scrollToSection(i);
                    setProgress(0);
                  }}
                  title={s.label}
                  className={`relative w-2 h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-primary w-5"
                      : i < currentIndex && isAutoScrolling
                      ? "bg-primary/40"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                >
                  {i === currentIndex && isAutoScrolling && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Skip */}
            {isAutoScrolling && (
              <button
                onClick={skipToNext}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                title="Siguiente sección"
              >
                <SkipForward className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}

            {/* Current section label */}
            {isAutoScrolling && (
              <span className="text-[10px] text-muted-foreground font-medium min-w-[70px]">
                {sections[currentIndex]?.label}
              </span>
            )}

            {/* Manual nav buttons */}
            {!isAutoScrolling && (
              <div className="hidden sm:flex items-center gap-0.5 border-l pl-2 ml-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const idx = sections.indexOf(s);
                      setCurrentIndex(idx);
                      scrollToSection(idx);
                    }}
                    className="px-2 py-1 rounded text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Close */}
            <button
              onClick={() => { stopAutoScroll(); setIsVisible(false); }}
              className="p-1 rounded hover:bg-muted text-muted-foreground text-[10px]"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AutoScrollBar;
