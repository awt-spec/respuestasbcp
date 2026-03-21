import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { Plug, Users, Landmark, Building2, CreditCard, Shield, PenTool, Database, BarChart3, X } from "lucide-react";

const integrations = [
  { id: "crm", icon: Users, label: "CRM", desc: "Gestión comercial, prospectos y sincronización de datos", desc_en: "Commercial management, prospects, and data sync", protocol: "API REST", direction: "Bidireccional" },
  { id: "core", icon: Landmark, label: "Core Bancario", label_en: "Core Banking", desc: "Saldos, productos existentes, registro de desembolsos", desc_en: "Balances, existing products, disbursement recording", protocol: "API REST / Mensajería", direction: "Bidireccional" },
  { id: "erp", icon: Building2, label: "ERP / SAP", desc: "Asientos contables, catálogos, conciliación", desc_en: "Accounting entries, catalogs, reconciliation", protocol: "API REST + Batch", direction: "SYSDE → ERP" },
  { id: "pagos", icon: CreditCard, label: "Pagos / ACH", label_en: "Payments / ACH", desc: "Transferencia de fondos y cobros automáticos", desc_en: "Fund transfers and automatic collections", protocol: "API REST", direction: "Bidireccional" },
  { id: "buros", icon: Shield, label: "Burós de Crédito", label_en: "Credit Bureaus", desc: "Equifax, TransUnion — historial crediticio", desc_en: "Equifax, TransUnion — credit history", protocol: "API / Web Service", direction: "Consulta" },
  { id: "firma", icon: PenTool, label: "Firma Electrónica", label_en: "E-Signature", desc: "Certificados digitales del proveedor del banco", desc_en: "Bank provider digital certificates", protocol: "API REST", direction: "SYSDE → Proveedor" },
  { id: "dwh", icon: Database, label: "Data Warehouse", desc: "Extracción de datos y analítica avanzada", desc_en: "Data extraction and advanced analytics", protocol: "API / DB Views", direction: "SYSDE → DWH" },
  { id: "canales", icon: BarChart3, label: "Canales Digitales", label_en: "Digital Channels", desc: "App móvil, banca web, portal de autoservicio", desc_en: "Mobile app, web banking, self-service portal", protocol: "API REST / JWT", direction: "Canales → SYSDE" },
];

const ORBIT_RADIUS = 180;
const CORE_SIZE = 100;
const PLANET_SIZE = 52;

const IntegrationOrbit = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en?: T): T => (lang === "en" && en ? en : es);
  const [selected, setSelected] = useState<string | null>(null);

  const containerSize = (ORBIT_RADIUS + PLANET_SIZE) * 2 + 40;
  const center = ORBIT_RADIUS + PLANET_SIZE + 20;

  const selectedIntegration = integrations.find((i) => i.id === selected);

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
          {pick("Integraciones vía Core de APIs", "Integrations via API Core")}
        </p>
        <h4 className="text-lg font-extrabold text-foreground">
          {pick("SYSDE PLUS como ", "SYSDE PLUS as the ")}
          <span className="text-primary">{pick("centro de integración", "integration hub")}</span>
        </h4>
        <p className="text-xs text-muted-foreground mt-1">
          {pick("Haz clic en un sistema para ver detalles", "Click a system for details")}
        </p>
      </div>

      <div className="flex justify-center overflow-x-auto">
        <div className="relative shrink-0" style={{ width: containerSize, height: containerSize }}>
          {/* Orbit ring */}
          <div
            className="absolute border-2 border-dashed border-muted-foreground/15 rounded-full"
            style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2, top: center - ORBIT_RADIUS, left: center - ORBIT_RADIUS }}
          />

          {/* Core */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 rounded-full bg-gradient-to-br from-primary to-[hsl(352,70%,35%)] flex flex-col items-center justify-center shadow-xl shadow-primary/20"
            style={{ width: CORE_SIZE, height: CORE_SIZE, top: center - CORE_SIZE / 2, left: center - CORE_SIZE / 2 }}
          >
            <Plug className="w-6 h-6 text-primary-foreground mb-1" />
            <p className="text-primary-foreground text-[9px] font-extrabold text-center leading-tight">API Core<br />SYSDE+</p>
          </motion.div>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none">
            {integrations.map((int, i) => {
              const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2;
              const x = center + Math.cos(angle) * ORBIT_RADIUS;
              const y = center + Math.sin(angle) * ORBIT_RADIUS;
              return (
                <line
                  key={int.id}
                  x1={center} y1={center} x2={x} y2={y}
                  stroke="currentColor"
                  className={`${selected === int.id ? "text-primary" : "text-muted-foreground/20"} transition-colors`}
                  strokeWidth={selected === int.id ? 2 : 1}
                  strokeDasharray={selected === int.id ? "none" : "4 4"}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {integrations.map((int, i) => {
            const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2;
            const x = center + Math.cos(angle) * ORBIT_RADIUS;
            const y = center + Math.sin(angle) * ORBIT_RADIUS;
            const Icon = int.icon;
            const isActive = selected === int.id;
            return (
              <motion.div
                key={int.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 200, damping: 20 }}
                className="absolute flex flex-col items-center gap-1 z-[5]"
                style={{ left: x - PLANET_SIZE / 2, top: y - PLANET_SIZE / 2, width: PLANET_SIZE }}
              >
                <button
                  onClick={() => setSelected(isActive ? null : int.id)}
                  className={`group relative w-full aspect-square rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-110"
                      : "border-primary/20 bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-primary/70"}`} strokeWidth={1.8} />
                </button>
                <span className={`text-[9px] font-medium text-center leading-tight max-w-[70px] ${isActive ? "text-primary font-bold" : "text-foreground"}`}>
                  {pick(int.label, int.label_en)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedIntegration && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-6 rounded-xl border bg-card p-5 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <selectedIntegration.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{pick(selectedIntegration.label, selectedIntegration.label_en)}</p>
                  <p className="text-xs text-muted-foreground">{pick(selectedIntegration.desc, selectedIntegration.desc_en)}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{pick("Protocolo", "Protocol")}</p>
                <p className="text-xs font-semibold text-foreground">{selectedIntegration.protocol}</p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{pick("Dirección", "Direction")}</p>
                <p className="text-xs font-semibold text-foreground">{selectedIntegration.direction}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntegrationOrbit;
