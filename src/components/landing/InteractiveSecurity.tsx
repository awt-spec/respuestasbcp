import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Lock, Eye, ShieldCheck, Database, ScrollText, Radio, ChevronDown } from "lucide-react";

interface SecuritySection {
  id: string;
  icon: React.ElementType;
  label: string;
  label_en: string;
  color: string;
  iconBg: string;
  items: string[];
  items_en: string[];
}

const sections: SecuritySection[] = [
  {
    id: "cifrado", icon: Lock, label: "Cifrado de Datos", label_en: "Data Encryption",
    color: "from-blue-500/15 to-blue-500/5 border-blue-500/25",
    iconBg: "text-blue-500 bg-blue-500/10",
    items: [
      "AES-256 para datos en reposo — máximo estándar de la industria",
      "TLS 1.2/1.3 para datos en tránsito — comunicaciones seguras",
      "Claves gestionadas con rotación automática",
    ],
    items_en: [
      "AES-256 for data at rest — industry maximum standard",
      "TLS 1.2/1.3 for data in transit — secure communications",
      "Keys managed with automatic rotation",
    ],
  },
  {
    id: "enmascaramiento", icon: Eye, label: "Enmascaramiento y Tokenización", label_en: "Masking & Tokenization",
    color: "from-violet-500/15 to-violet-500/5 border-violet-500/25",
    iconBg: "text-violet-500 bg-violet-500/10",
    items: [
      "Datos PII/PCI ocultos en UI y logs según perfil de acceso",
      "Tokenización de datos financieros críticos (cuentas, tarjetas)",
      "Segregación lógica o física por cliente/tenant",
    ],
    items_en: [
      "PII/PCI data hidden in UI and logs per access profile",
      "Tokenization of critical financial data (accounts, cards)",
      "Logical or physical segregation per client/tenant",
    ],
  },
  {
    id: "auditoria", icon: ScrollText, label: "Auditoría Inmutable", label_en: "Immutable Audit",
    color: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25",
    iconBg: "text-emerald-500 bg-emerald-500/10",
    items: [
      "Audit trail de todas las acciones (creación, modificación, eliminación, consulta)",
      "Cada registro: usuario, fecha/hora, IP, acción, datos antes/después",
      "Reportes parametrizables por período, usuario, tipo de operación",
      "Integración con SIEM del banco para eventos de seguridad",
    ],
    items_en: [
      "Audit trail of all actions (creation, modification, deletion, query)",
      "Each record: user, timestamp, IP, action, before/after data",
      "Parameterizable reports by period, user, operation type",
      "Integration with bank SIEM for security events",
    ],
  },
  {
    id: "segregacion", icon: Database, label: "Segregación y Ciclo de Vida", label_en: "Segregation & Lifecycle",
    color: "from-amber-500/15 to-amber-500/5 border-amber-500/25",
    iconBg: "text-amber-500 bg-amber-500/10",
    items: [
      "Aislamiento lógico o físico por cliente/tenant",
      "Políticas de retención, purga y archivado conforme a regulaciones",
      "Control de acceso basado en roles con segregación de funciones",
    ],
    items_en: [
      "Logical or physical isolation per client/tenant",
      "Retention, purge, and archival policies per regulations",
      "Role-based access control with function segregation",
    ],
  },
];

const certifications = [
  {
    badge: "ISO 9001:2015",
    label: "Gestión de Calidad",
    label_en: "Quality Management",
    desc: "Procesos de desarrollo, implementación y soporte certificados",
    desc_en: "Certified development, implementation and support processes",
    color: "from-primary/20 to-primary/10 border-primary/30",
  },
  {
    badge: "ISO 27001:2013",
    label: "Seguridad de la Información",
    label_en: "Information Security",
    desc: "Controles de seguridad auditados periódicamente por organismos independientes",
    desc_en: "Security controls periodically audited by independent bodies",
    color: "from-emerald-500/20 to-emerald-500/10 border-emerald-500/30",
  },
];

const InteractiveSecurity = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* ISO Certifications - prominent */}
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] text-center mb-4">
          {pick("Certificaciones Internacionales", "International Certifications")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${cert.color} p-5 text-center`}
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
              <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-lg font-extrabold text-foreground tracking-tight">{cert.badge}</p>
              <p className="text-xs font-bold text-foreground mt-1">{pick(cert.label, cert.label_en)}</p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug">{pick(cert.desc, cert.desc_en)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Controls - expandable */}
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] text-center mb-4">
          {pick("Controles de Seguridad", "Security Controls")}
        </p>
        <div className="space-y-2">
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
                  <div className={`w-10 h-10 rounded-xl ${section.iconBg} flex items-center justify-center shrink-0`}>
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
      </div>
    </div>
  );
};

export default InteractiveSecurity;
