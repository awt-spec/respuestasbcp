import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward } from "lucide-react";

interface TourStep {
  id: string;
  label: string;
  action: () => void;
}

const AUTO_SCROLL_INTERVAL = 5000;

const scrollToEl = (el: Element | null) => {
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
};

const openAccordion = (questionId: number) => {
  const el = document.querySelector(`[data-question-id="${questionId}"]`);
  if (!el) return;
  scrollToEl(el);
  setTimeout(() => {
    // Find the accordion trigger button
    const trigger = el.querySelector('button[data-state="closed"]') as HTMLElement;
    if (trigger) {
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
  }, 800);
};

const clickTab = (questionId: number, tabId: string) => {
  const el = document.querySelector(`[data-question-id="${questionId}"]`);
  if (!el) return;
  // Don't scroll again, just click the tab
  setTimeout(() => {
    const tab = el.querySelector(`[data-tab-id="${tabId}"]`) as HTMLElement;
    if (tab) tab.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }, 400);
};

const buildSteps = (): TourStep[] => [
  {
    id: "hero",
    label: "Inicio",
    action: () => scrollToEl(document.getElementById("hero-top")),
  },
  {
    id: "dashboard",
    label: "Dashboard",
    action: () => scrollToEl(document.getElementById("dashboard-section")),
  },
  {
    id: "q1-open",
    label: "P1 — Respuesta",
    action: () => openAccordion(1),
  },
  {
    id: "q1-visual",
    label: "P1 — Visual",
    action: () => clickTab(1, "visual"),
  },
  {
    id: "q2-open",
    label: "P2 — Respuesta",
    action: () => openAccordion(2),
  },
  {
    id: "q2-visual",
    label: "P2 — Visual",
    action: () => clickTab(2, "visual"),
  },
  {
    id: "q3-open",
    label: "P3 — Respuesta",
    action: () => openAccordion(3),
  },
  {
    id: "q3-refs",
    label: "P3 — Referencias",
    action: () => clickTab(3, "references"),
  },
  {
    id: "footer",
    label: "Cierre",
    action: () => scrollToEl(document.getElementById("footer-section")),
  },
];

const AutoScrollBar = () => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepsRef = useRef<TourStep[]>(buildSteps());

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const stopAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    setProgress(0);
    clearTimers();
  }, [clearTimers]);

  const goToStep = useCallback((index: number) => {
    const steps = stepsRef.current;
    if (index >= 0 && index < steps.length) {
      setCurrentIndex(index);
      setProgress(0);
      steps[index].action();
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stepsRef.current = buildSteps();
    setIsAutoScrolling(true);
    setCurrentIndex(0);
    setProgress(0);
    stepsRef.current[0].action();
  }, []);

  const skipToNext = useCallback(() => {
    const steps = stepsRef.current;
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= steps.length) {
        stopAutoScroll();
        return prev;
      }
      goToStep(next);
      return next;
    });
  }, [goToStep, stopAutoScroll]);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const progressTick = 50;
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (progressTick / AUTO_SCROLL_INTERVAL) * 100;
        return next >= 100 ? 0 : next;
      });
    }, progressTick);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= stepsRef.current.length) {
          stopAutoScroll();
          return prev;
        }
        setProgress(0);
        stepsRef.current[next].action();
        return next;
      });
    }, AUTO_SCROLL_INTERVAL);

    return clearTimers;
  }, [isAutoScrolling, stopAutoScroll, clearTimers]);

  const steps = stepsRef.current;

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

            <div className="flex items-center gap-0.5 px-1">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    goToStep(i);
                    if (!isAutoScrolling) setCurrentIndex(i);
                  }}
                  title={s.label}
                  className={`relative h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-primary w-4"
                      : i < currentIndex && isAutoScrolling
                      ? "bg-primary/40 w-2"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                  }`}
                />
              ))}
            </div>

            {isAutoScrolling && (
              <button
                onClick={skipToNext}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                title="Siguiente paso"
              >
                <SkipForward className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}

            <span className="text-[10px] text-muted-foreground font-medium min-w-[80px] truncate">
              {steps[currentIndex]?.label}
            </span>

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
