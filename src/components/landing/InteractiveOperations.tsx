import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Shield, Receipt, AlertTriangle, Flame, ChevronDown } from "lucide-react";

interface OpSection {
  id: string;
  icon: React.ElementType;
  label: string;
  label_en: string;
  color: string;
  items: string[];
  items_en: string[];
}

const sections: OpSection[] = [
  {
    id: "seguros", icon: Shield, label: "Seguros", label_en: "Insurance",
    color: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-blue-600",
    items: [
      "Registro de pólizas asociadas al activo arrendado",
      "Control de vigencia con alertas automáticas de vencimiento",
      "Cobro de primas al arrendatario (en cuota o separado)",
      "Integración con aseguradoras para consulta de estado",
    ],
    items_en: [
      "Policy registration linked to leased asset",
      "Automatic expiration alerts and renewal control",
      "Premium collection from lessee (in installment or separate)",
      "Insurer integration for status queries",
    ],
  },
  {
    id: "impuestos", icon: Receipt, label: "Impuestos", label_en: "Taxes",
    color: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-emerald-600",
    items: [
      "Cálculo automático de IVA, ISR e impuestos locales",
      "Facturación electrónica conforme a normativa fiscal",
      "Retención de impuestos en la fuente cuando aplica",
      "Reportes fiscales periódicos automatizados",
    ],
    items_en: [
      "Automatic VAT, income tax, and local tax calculation",
      "Electronic invoicing per local fiscal regulations",
      "Withholding at source when applicable",
      "Automated periodic fiscal reports",
    ],
  },
  {
    id: "multas", icon: AlertTriangle, label: "Multas", label_en: "Fines",
    color: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-600",
    items: [
      "Registro y seguimiento de multas asociadas al activo",
      "Flujo: notificación → cobro → seguimiento de pago",
      "Traslado al arrendatario o absorción según contrato",
      "Integración con entidades (tránsito, municipales)",
    ],
    items_en: [
      "Registration and tracking of asset-related fines",
      "Flow: notification → collection → payment tracking",
      "Transfer to lessee or absorption per contract",
      "Integration with entities (traffic, municipal)",
    ],
  },
  {
    id: "siniestros", icon: Flame, label: "Siniestros", label_en: "Claims",
    color: "from-rose-500/15 to-rose-500/5 border-rose-500/25 text-rose-600",
    items: [
      "Registro del siniestro (pérdida total, parcial, daño)",
      "Flujo de reclamación ante aseguradora",
      "Cálculo de impacto: saldo pendiente vs. indemnización",
      "Cierre anticipado en pérdida total + contabilidad automática",
    ],
    items_en: [
      "Claim registration (total loss, partial, damage)",
      "Insurance claim flow management",
      "Impact calculation: outstanding balance vs. indemnity",
      "Early closure for total loss + automatic accounting",
    ],
  },
];

const InteractiveOperations = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] text-center mb-4">
        {pick("Gestión Operativa Integrada", "Integrated Operational Management")}
      </p>
      {sections.map((section, i) => {
        const Icon = section.icon;
        const isOpen = expanded === section.id;
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : section.id)}
              className={`w-full rounded-xl border bg-gradient-to-br ${section.color} p-4 flex items-center gap-3 transition-all hover:shadow-md cursor-pointer`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-foreground flex-1 text-left">
                {pick(section.label, section.label_en)}
              </span>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-1 px-4 space-y-2">
                    {pick(section.items, section.items_en).map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                        className="flex items-start gap-2 text-xs text-foreground"
                      >
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        {item}
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
  );
};

export default InteractiveOperations;
