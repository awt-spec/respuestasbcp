import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, Eye, PiggyBank, Briefcase, Smartphone, Building2, BarChart3, FileText, Shield, CreditCard, TrendingUp, Wallet, FolderOpen, Receipt, BookOpen, Scale, Droplets, ClipboardList, Lock, Phone, Globe, Plug, MessageCircle, Landmark, ClipboardCheck, Brain, Search, KeyRound, ScrollText, ShieldCheck, PenTool, Mail, Bell, Webhook, Calculator, FileCode, FileSpreadsheet } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface SubModule {
  id: string;
  icon: React.ElementType;
  label: string;
  label_en?: string;
  hasPlus?: boolean;
}

interface Module {
  id: string;
  icon: React.ElementType;
  label: string;
  label_en?: string;
  subs: SubModule[];
}

const modules: Module[] = [
  {
    id: "colocacion", icon: Users, label: "Colocación", label_en: "Lending",
    subs: [
      { id: "prestamos", icon: TrendingUp, label: "Préstamos", label_en: "Loans", hasPlus: true },
      { id: "arrendamiento", icon: CreditCard, label: "Arrendamiento", label_en: "Leasing" },
      { id: "factoraje", icon: TrendingUp, label: "Factoraje", label_en: "Factoring", hasPlus: true },
      { id: "pasivos", icon: CreditCard, label: "Adm. de Pasivos", label_en: "Liabilities Mgmt" },
      { id: "terceros", icon: CreditCard, label: "Cartera de Terceros", label_en: "Third-Party Portfolio" },
    ],
  },
  {
    id: "clientes", icon: Eye, label: "Adm. de Clientes 360°", label_en: "Client Mgmt 360°",
    subs: [
      { id: "perfil", icon: Users, label: "Perfil Integral", label_en: "Full Profile" },
      { id: "kyc", icon: ShieldCheck, label: "KYC / Due Diligence", label_en: "KYC / Due Diligence" },
      { id: "exposicion", icon: BarChart3, label: "Exposición Global", label_en: "Global Exposure" },
      { id: "scoring", icon: TrendingUp, label: "Scoring Interno", label_en: "Internal Scoring" },
    ],
  },
  {
    id: "captacion", icon: PiggyBank, label: "Captación", label_en: "Deposits",
    subs: [
      { id: "ahorro", icon: Wallet, label: "Cuentas de Ahorro", label_en: "Savings Accounts" },
      { id: "plazo", icon: ClipboardList, label: "Depósitos a Plazo", label_en: "Term Deposits" },
      { id: "certificados", icon: ScrollText, label: "Certificados", label_en: "Certificates" },
      { id: "corrientes", icon: Landmark, label: "Cuentas Corrientes", label_en: "Checking" },
      { id: "inversiones", icon: TrendingUp, label: "Inversiones", label_en: "Investments" },
    ],
  },
  {
    id: "tesoreria", icon: Briefcase, label: "Tesorería y Auxiliares", label_en: "Treasury & Auxiliaries",
    subs: [
      { id: "contabilidad", icon: BookOpen, label: "Contabilidad", label_en: "Accounting" },
      { id: "conciliacion", icon: Scale, label: "Conciliación", label_en: "Reconciliation" },
      { id: "flujo", icon: Droplets, label: "Flujo de Caja", label_en: "Cash Flow" },
      { id: "presupuestos", icon: ClipboardList, label: "Presupuestos", label_en: "Budgets" },
      { id: "cierre", icon: Lock, label: "Cierre Contable", label_en: "Closing" },
    ],
  },
  {
    id: "canales", icon: Smartphone, label: "Canales Digitales", label_en: "Digital Channels",
    subs: [
      { id: "movil", icon: Phone, label: "Banca Móvil", label_en: "Mobile Banking" },
      { id: "web", icon: Globe, label: "Banca Web", label_en: "Web Banking" },
      { id: "api", icon: Plug, label: "API Gateway", label_en: "API Gateway" },
      { id: "whatsapp", icon: MessageCircle, label: "WhatsApp Banking", label_en: "WhatsApp Banking" },
      { id: "atm", icon: Landmark, label: "ATM / Kiosk", label_en: "ATM / Kiosk" },
    ],
  },
  {
    id: "componentes", icon: Building2, label: "Componentes Integrados", label_en: "Integrated Components",
    subs: [
      { id: "workflow", icon: TrendingUp, label: "Motor de Workflow", label_en: "Workflow Engine" },
      { id: "docs", icon: FileText, label: "Gestión Documental", label_en: "Document Mgmt" },
      { id: "notif", icon: Bell, label: "Notificaciones", label_en: "Notifications" },
      { id: "firmas", icon: PenTool, label: "Firmas Digitales", label_en: "Digital Signatures" },
    ],
  },
  {
    id: "reporteria-reg", icon: FileText, label: "Reportería Regulatoria", label_en: "Regulatory Reporting",
    subs: [
      { id: "cnbv", icon: CreditCard, label: "Reportes CNBV", label_en: "CNBV Reports" },
      { id: "banco-central", icon: CreditCard, label: "Reportes Banco Central", label_en: "Central Bank Reports" },
      { id: "cumplimiento", icon: ClipboardCheck, label: "Cumplimiento Normativo", label_en: "Regulatory Compliance" },
    ],
  },
  {
    id: "reporteria-bi", icon: BarChart3, label: "Reportería y BI", label_en: "Reporting & BI",
    subs: [
      { id: "regulatorios", icon: FileSpreadsheet, label: "Reportes Regulatorios", label_en: "Regulatory Reports" },
      { id: "dashboards", icon: BarChart3, label: "Dashboards", label_en: "Dashboards" },
      { id: "analitica", icon: Brain, label: "Analítica Avanzada", label_en: "Advanced Analytics" },
      { id: "adhoc", icon: Search, label: "Reportes Ad-hoc", label_en: "Ad-hoc Reports" },
    ],
  },
  {
    id: "seguridad", icon: Shield, label: "Seguridad y Reglas de Negocios", label_en: "Security & Business Rules",
    subs: [
      { id: "acceso", icon: KeyRound, label: "Control de Acceso", label_en: "Access Control" },
      { id: "auditoria", icon: ClipboardCheck, label: "Auditoría", label_en: "Audit" },
      { id: "pld", icon: ShieldCheck, label: "PLD / AML", label_en: "AML" },
      { id: "firmas", icon: PenTool, label: "Firmas Digitales", label_en: "Digital Signatures" },
    ],
  },
];

const MAIN_ORBIT_RADIUS = 220;
const MAIN_CORE_SIZE = 120;
const MAIN_PLANET_SIZE = 56;

const SUB_ORBIT_RADIUS = 180;
const SUB_CORE_SIZE = 120;
const SUB_PLANET_SIZE = 56;

const OrbitNode = ({
  Icon,
  label,
  x,
  y,
  size,
  delay,
  onClick,
  hasPlus,
}: {
  Icon: React.ElementType;
  label: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  onClick?: () => void;
  hasPlus?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
    className="absolute flex flex-col items-center gap-1.5 z-[5]"
    style={{ left: x - size / 2, top: y - size / 2, width: size }}
  >
    <button
      onClick={onClick}
      className="group relative w-full aspect-square rounded-full border-2 border-primary/20 bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex items-center justify-center transition-all duration-300"
    >
      <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
      {hasPlus && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">+</span>
      )}
    </button>
    <span className="text-[10px] font-medium text-foreground text-center leading-tight max-w-[80px]">
      {label}
    </span>
  </motion.div>
);

const SafEcosystem = () => {
  const { lang } = useI18n();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const currentModule = modules.find((m) => m.id === selectedModule);

  const containerSize = (radius: number, planetSize: number) => (radius + planetSize) * 2 + 40;
  const center = (radius: number, planetSize: number) => radius + planetSize + 20;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
          {pick("Ecosistema SAF+", "SAF+ Ecosystem")}
        </p>
        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">
          {pick("Una plataforma ", "A comprehensive ")}
          <span className="text-primary">{pick("integral", "platform")}</span>
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {selectedModule && currentModule
            ? `${pick("Explorando", "Exploring")}: ${pick(currentModule.label, currentModule.label_en)}`
            : pick("Haz clic en un módulo para explorar sus componentes", "Click a module to explore its components")
          }
        </p>
      </div>

      <AnimatePresence mode="wait">
        {selectedModule && currentModule ? (
          <motion.div
            key={`sub-${selectedModule}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border bg-card hover:bg-muted/50 text-sm text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {pick("Volver al sistema principal", "Back to main system")}
              </button>
            </div>

            {/* Sub orbit */}
            <div className="flex justify-center overflow-x-auto">
              <div
                className="relative shrink-0"
                style={{
                  width: containerSize(SUB_ORBIT_RADIUS, SUB_PLANET_SIZE),
                  height: containerSize(SUB_ORBIT_RADIUS, SUB_PLANET_SIZE),
                }}
              >
                {/* Orbit ring */}
                <div
                  className="absolute border-2 border-dashed border-muted-foreground/15 rounded-full"
                  style={{
                    width: SUB_ORBIT_RADIUS * 2,
                    height: SUB_ORBIT_RADIUS * 2,
                    top: center(SUB_ORBIT_RADIUS, SUB_PLANET_SIZE) - SUB_ORBIT_RADIUS,
                    left: center(SUB_ORBIT_RADIUS, SUB_PLANET_SIZE) - SUB_ORBIT_RADIUS,
                  }}
                />

                {/* Core */}
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-10 rounded-full bg-gradient-to-br from-primary to-[hsl(352,70%,35%)] flex flex-col items-center justify-center shadow-xl shadow-primary/20"
                  style={{
                    width: SUB_CORE_SIZE,
                    height: SUB_CORE_SIZE,
                    top: center(SUB_ORBIT_RADIUS, SUB_PLANET_SIZE) - SUB_CORE_SIZE / 2,
                    left: center(SUB_ORBIT_RADIUS, SUB_PLANET_SIZE) - SUB_CORE_SIZE / 2,
                  }}
                >
                  {(() => {
                    const CoreIcon = currentModule.icon;
                    return <CoreIcon className="w-7 h-7 text-primary-foreground mb-1" strokeWidth={1.5} />;
                  })()}
                  <p className="text-primary-foreground text-[10px] font-bold text-center px-2 leading-tight">
                    {pick(currentModule.label, currentModule.label_en)}
                  </p>
                </motion.div>

                {/* Sub nodes */}
                {currentModule.subs.map((sub, i) => {
                  const angle = (i / currentModule.subs.length) * 2 * Math.PI - Math.PI / 2;
                  const cx = center(SUB_ORBIT_RADIUS, SUB_PLANET_SIZE);
                  const cy = center(SUB_ORBIT_RADIUS, SUB_PLANET_SIZE);
                  return (
                    <OrbitNode
                      key={sub.id}
                      Icon={sub.icon}
                      label={pick(sub.label, sub.label_en)}
                      x={cx + Math.cos(angle) * SUB_ORBIT_RADIUS}
                      y={cy + Math.sin(angle) * SUB_ORBIT_RADIUS}
                      size={SUB_PLANET_SIZE}
                      delay={0.1 + i * 0.06}
                      hasPlus={sub.hasPlus}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Main orbit */}
            <div className="flex justify-center overflow-x-auto">
              <div
                className="relative shrink-0"
                style={{
                  width: containerSize(MAIN_ORBIT_RADIUS, MAIN_PLANET_SIZE),
                  height: containerSize(MAIN_ORBIT_RADIUS, MAIN_PLANET_SIZE),
                }}
              >
                {/* Orbit ring */}
                <div
                  className="absolute border-2 border-dashed border-muted-foreground/15 rounded-full"
                  style={{
                    width: MAIN_ORBIT_RADIUS * 2,
                    height: MAIN_ORBIT_RADIUS * 2,
                    top: center(MAIN_ORBIT_RADIUS, MAIN_PLANET_SIZE) - MAIN_ORBIT_RADIUS,
                    left: center(MAIN_ORBIT_RADIUS, MAIN_PLANET_SIZE) - MAIN_ORBIT_RADIUS,
                  }}
                />

                {/* Core */}
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-10 rounded-full bg-gradient-to-br from-primary to-[hsl(352,70%,35%)] flex flex-col items-center justify-center shadow-xl shadow-primary/20"
                  style={{
                    width: MAIN_CORE_SIZE,
                    height: MAIN_CORE_SIZE,
                    top: center(MAIN_ORBIT_RADIUS, MAIN_PLANET_SIZE) - MAIN_CORE_SIZE / 2,
                    left: center(MAIN_ORBIT_RADIUS, MAIN_PLANET_SIZE) - MAIN_CORE_SIZE / 2,
                  }}
                >
                  <p className="text-primary-foreground text-sm font-extrabold">SYSDE</p>
                  <p className="text-primary-foreground text-xs font-bold">SAF+</p>
                </motion.div>

                {/* Module nodes */}
                {modules.map((mod, i) => {
                  const angle = (i / modules.length) * 2 * Math.PI - Math.PI / 2;
                  const cx = center(MAIN_ORBIT_RADIUS, MAIN_PLANET_SIZE);
                  const cy = center(MAIN_ORBIT_RADIUS, MAIN_PLANET_SIZE);
                  return (
                    <OrbitNode
                      key={mod.id}
                      Icon={mod.icon}
                      label={pick(mod.label, mod.label_en)}
                      x={cx + Math.cos(angle) * MAIN_ORBIT_RADIUS}
                      y={cy + Math.sin(angle) * MAIN_ORBIT_RADIUS}
                      size={MAIN_PLANET_SIZE}
                      delay={0.05 + i * 0.05}
                      onClick={() => setSelectedModule(mod.id)}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SafEcosystem;
