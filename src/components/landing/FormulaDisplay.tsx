import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FormulaItem {
  name: string;
  expression: string;
  description: string;
}

interface Props {
  title?: string;
  formulas: FormulaItem[];
}

/* Renders mathematical expression with styled tokens */
const MathExpression = ({ expr }: { expr: string }) => {
  // Highlight operators, Greek letters, and special math symbols
  const parts = expr.split(/([\+\−\-×÷=≥≤><\(\)\^]|Σ|PD|LGD|CCF|CFE)/g);

  return (
    <span className="font-mono tracking-wide">
      {parts.map((part, i) => {
        if (["Σ"].includes(part)) {
          return (
            <span key={i} className="text-primary font-black text-base mx-0.5">
              {part}
            </span>
          );
        }
        if (["PD", "LGD", "CCF", "CFE"].includes(part)) {
          return (
            <span key={i} className="text-primary font-bold bg-primary/10 px-1 rounded text-xs">
              {part}
            </span>
          );
        }
        if (["+", "−", "-", "×", "÷", "=", "≥", "≤", ">", "<"].includes(part)) {
          return (
            <span key={i} className="text-foreground/60 font-bold mx-1">
              {part}
            </span>
          );
        }
        if (["(", ")"].includes(part)) {
          return (
            <span key={i} className="text-foreground/40 font-light">
              {part}
            </span>
          );
        }
        if (part === "^") {
          return (
            <span key={i} className="text-primary/60 text-[10px] align-super">
              ^
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const FormulaDisplay = ({ title, formulas }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-3">
      {title && <h4 className="text-sm font-bold text-foreground mb-3">{title}</h4>}
      <div className="space-y-2">
        {formulas.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 20 }}
            className="rounded-xl border bg-card overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left group"
            >
              <motion.span
                whileHover={{ scale: 1.15 }}
                className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-primary/20 transition-colors"
              >
                {i + 1}
              </motion.span>
              <span className="text-sm font-semibold text-foreground flex-1">{f.name}</span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 250, damping: 28 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3">
                    {/* Formula expression - mathematical styling */}
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      className="rounded-lg bg-gradient-to-br from-muted/80 to-muted/30 border px-4 py-4 text-center"
                    >
                      <div className="text-sm leading-relaxed">
                        <MathExpression expr={f.expression} />
                      </div>
                    </motion.div>
                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-xs text-muted-foreground leading-relaxed pl-1"
                    >
                      {f.description}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FormulaDisplay;
