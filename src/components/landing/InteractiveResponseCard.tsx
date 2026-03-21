import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { ChevronDown, CheckCircle2 } from "lucide-react";

interface ResponseSection {
  title: string;
  items: string[];
}

function parseResponse(text: string): { confirmation: string; sections: ResponseSection[] } {
  const paragraphs = text.split("\n\n");
  let confirmation = "";
  const sections: ResponseSection[] = [];
  
  // First paragraph(s) without bold header = confirmation
  let i = 0;
  const confirmParts: string[] = [];
  
  for (; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    // Check if it starts with a bold unicode header (𝗕𝗼𝗹𝗱)
    const hasBoldHeader = /^[\u{1D5D4}-\u{1D647}\u{1D7EC}-\u{1D7F5}]/u.test(p.trim());
    if (hasBoldHeader && i > 0) break;
    if (i === 0) {
      // First paragraph - check if it IS a bold header
      if (hasBoldHeader) {
        // It's a section, not confirmation
        break;
      }
      confirmParts.push(p);
    } else {
      confirmParts.push(p);
    }
  }
  
  confirmation = confirmParts.join("\n\n");
  
  // Remaining paragraphs become sections
  let currentSection: ResponseSection | null = null;
  
  for (; i < paragraphs.length; i++) {
    const p = paragraphs[i].trim();
    if (!p) continue;
    
    // Check for bold header line
    const headerMatch = p.match(/^([\u{1D5D4}-\u{1D647}\u{1D7EC}-\u{1D7F5}\s/\-—–()&+.,:']+?)[:：]\s*(.*)/su);
    
    if (headerMatch) {
      if (currentSection) sections.push(currentSection);
      const title = headerMatch[1].trim();
      const rest = headerMatch[2].trim();
      const items: string[] = [];
      
      if (rest) {
        // Split by bullet points or newlines
        const lines = rest.split("\n").map(l => l.trim()).filter(Boolean);
        for (const line of lines) {
          items.push(line.replace(/^[•▪▸]\s*/, ""));
        }
      }
      currentSection = { title, items };
    } else if (currentSection) {
      // Lines with bullets go into current section
      const lines = p.split("\n").map(l => l.trim()).filter(Boolean);
      for (const line of lines) {
        currentSection.items.push(line.replace(/^[•▪▸]\s*/, ""));
      }
    } else {
      // No section yet, add as new section
      if (currentSection) sections.push(currentSection);
      currentSection = { title: "", items: [p] };
    }
  }
  
  if (currentSection) sections.push(currentSection);
  
  return { confirmation, sections };
}

const sectionColors = [
  "from-primary/10 to-primary/5 border-primary/20",
  "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
  "from-blue-500/10 to-blue-500/5 border-blue-500/20",
  "from-amber-500/10 to-amber-500/5 border-amber-500/20",
  "from-violet-500/10 to-violet-500/5 border-violet-500/20",
  "from-rose-500/10 to-rose-500/5 border-rose-500/20",
  "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
  "from-orange-500/10 to-orange-500/5 border-orange-500/20",
];

const dotColors = [
  "bg-primary",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
];

interface Props {
  response: string;
  children?: React.ReactNode; // For embedded components like InteractiveLifecycle
}

const InteractiveResponseCard = ({ response, children }: Props) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { confirmation, sections } = parseResponse(response);

  return (
    <div className="space-y-4">
      {/* Confirmation badge */}
      {confirmation && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-success/10 border border-success/25"
        >
          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <p className="text-[13px] text-foreground leading-relaxed font-medium">{confirmation}</p>
        </motion.div>
      )}

      {/* Embedded component (e.g. InteractiveLifecycle for Q12) */}
      {children}

      {/* Expandable sections */}
      {sections.length > 0 && (
        <div className="space-y-2">
          {sections.map((section, i) => {
            const isOpen = expanded === i;
            const colorClass = sectionColors[i % sectionColors.length];
            const dotColor = dotColors[i % dotColors.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className={`w-full rounded-xl border bg-gradient-to-br ${colorClass} p-3.5 flex items-center gap-3 transition-all hover:shadow-md cursor-pointer`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`} />
                  <span className="text-[13px] font-bold text-foreground flex-1 text-left leading-snug">
                    {section.title || `Detalle ${i + 1}`}
                  </span>
                  {section.items.length > 0 && (
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && section.items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-1 px-4 space-y-1.5">
                        {section.items.map((item, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.03 }}
                            className="flex items-start gap-2 text-xs text-foreground leading-relaxed"
                          >
                            <span className="text-primary font-bold mt-0.5">✓</span>
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InteractiveResponseCard;
