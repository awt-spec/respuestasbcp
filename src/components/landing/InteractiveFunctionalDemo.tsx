import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import {
  CheckCircle2, CircleDollarSign, FileText, AlertTriangle,
  Truck, Calendar, Plus, ArrowRight, Clock, DollarSign,
  ChevronRight, BarChart3, Shield, Settings
} from "lucide-react";

type DemoType = "disbursement" | "schedule" | "leaseback" | "surcharge" | "asset-card";

interface Props {
  type: DemoType;
}

/* ═══════════════════════════════════════════════════════
   DEMO 1: Desembolsos Parciales — simulación de tramos
   ═══════════════════════════════════════════════════════ */
const DisbursementDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const tranches = [
    { id: 1, label: pick("Tramo 1 — Anticipo", "Tranche 1 — Advance"), amount: 45000, condition: pick("Firma del contrato", "Contract signature"), date: "15/01/2026" },
    { id: 2, label: pick("Tramo 2 — Entrega parcial", "Tranche 2 — Partial delivery"), amount: 60000, condition: pick("Entrega 50% del equipo", "50% equipment delivery"), date: "28/02/2026" },
    { id: 3, label: pick("Tramo 3 — Entrega final", "Tranche 3 — Final delivery"), amount: 80000, condition: pick("Entrega total + validación", "Full delivery + validation"), date: "15/04/2026" },
  ];

  const [released, setReleased] = useState<number[]>([]);
  const totalContract = tranches.reduce((s, t) => s + t.amount, 0);
  const totalReleased = tranches.filter(t => released.includes(t.id)).reduce((s, t) => s + t.amount, 0);
  const pct = Math.round((totalReleased / totalContract) * 100);

  const releaseTranche = (id: number) => {
    if (!released.includes(id)) {
      // Must release in order
      const idx = tranches.findIndex(t => t.id === id);
      if (idx === 0 || released.includes(tranches[idx - 1].id)) {
        setReleased([...released, id]);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
          <CircleDollarSign className="w-4 h-4 text-primary" />
          {pick("Simulador de Desembolsos por Tramos", "Tranche Disbursement Simulator")}
        </h4>
        {released.length > 0 && (
          <button onClick={() => setReleased([])} className="text-[10px] text-primary hover:underline">
            {pick("Reiniciar", "Reset")}
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="text-muted-foreground">{pick("Progreso de desembolso", "Disbursement progress")}</span>
          <span className="font-bold text-foreground">{pct}% — USD {totalReleased.toLocaleString()} / {totalContract.toLocaleString()}</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Tranches */}
      <div className="space-y-2">
        {tranches.map((tranche, i) => {
          const isReleased = released.includes(tranche.id);
          const canRelease = !isReleased && (i === 0 || released.includes(tranches[i - 1].id));

          return (
            <motion.div
              key={tranche.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-xl border p-4 transition-all ${
                isReleased
                  ? "bg-success/5 border-success/30"
                  : canRelease
                    ? "bg-primary/5 border-primary/30 cursor-pointer hover:shadow-md"
                    : "bg-muted/20 border-border opacity-60"
              }`}
              onClick={() => canRelease && releaseTranche(tranche.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isReleased ? "bg-success/15 text-success" : canRelease ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {isReleased ? <CheckCircle2 className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-foreground">{tranche.label}</p>
                  <p className="text-[10px] text-muted-foreground">{pick("Condición", "Condition")}: {tranche.condition}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-bold text-foreground">USD {tranche.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">{tranche.date}</p>
                </div>
                {canRelease && (
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-primary">
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
              {isReleased && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t border-success/20">
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div className="bg-success/10 rounded-lg p-2 text-center">
                      <p className="text-muted-foreground">{pick("Asiento", "Entry")}</p>
                      <p className="font-bold text-success">✓ {pick("Generado", "Generated")}</p>
                    </div>
                    <div className="bg-success/10 rounded-lg p-2 text-center">
                      <p className="text-muted-foreground">{pick("Saldo", "Balance")}</p>
                      <p className="font-bold text-foreground">USD {(totalContract - tranches.filter(t => released.includes(t.id)).reduce((s, t) => s + t.amount, 0)).toLocaleString()}</p>
                    </div>
                    <div className="bg-success/10 rounded-lg p-2 text-center">
                      <p className="text-muted-foreground">{pick("Usuario", "User")}</p>
                      <p className="font-bold text-foreground">J. Pérez</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {released.length === 0 && (
        <p className="text-[10px] text-primary text-center animate-pulse">
          👆 {pick("Haz clic en el Tramo 1 para simular la liberación", "Click Tranche 1 to simulate the release")}
        </p>
      )}
      {released.length === tranches.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl bg-success/10 border border-success/30 p-4 text-center">
          <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="text-sm font-bold text-success">{pick("¡Desembolso completo!", "Full disbursement complete!")}</p>
          <p className="text-[10px] text-muted-foreground">{pick("Todos los tramos han sido liberados con asientos contables generados", "All tranches released with accounting entries generated")}</p>
        </motion.div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DEMO 2: Cronograma Tailor-Made — editor interactivo
   ═══════════════════════════════════════════════════════ */
const ScheduleDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const presets = [
    { id: "regular", label: pick("Regular", "Regular"), icon: "📊" },
    { id: "grace", label: pick("Grace Period", "Grace Period"), icon: "⏸️" },
    { id: "bullet", label: "Bullet", icon: "🎯" },
    { id: "balloon", label: "Balloon", icon: "🎈" },
    { id: "seasonal", label: pick("Estacional", "Seasonal"), icon: "🌊" },
  ];

  const schedules: Record<string, { months: { m: string; cap: number; int: number; note: string }[] }> = {
    regular: {
      months: [
        { m: "1", cap: 8333, int: 2500, note: "" }, { m: "2", cap: 8333, int: 2361, note: "" },
        { m: "3", cap: 8333, int: 2222, note: "" }, { m: "...", cap: 8333, int: 0, note: "..." },
        { m: "12", cap: 8333, int: 139, note: pick("Última cuota", "Last payment") },
      ],
    },
    grace: {
      months: [
        { m: "1", cap: 0, int: 2500, note: pick("Grace", "Grace") }, { m: "2", cap: 0, int: 2500, note: pick("Grace", "Grace") },
        { m: "3", cap: 0, int: 2500, note: pick("Grace", "Grace") }, { m: "4", cap: 11111, int: 2500, note: pick("Inicio pagos", "Payments start") },
        { m: "12", cap: 11111, int: 278, note: pick("Final", "Final") },
      ],
    },
    bullet: {
      months: [
        { m: "1", cap: 0, int: 2500, note: pick("Solo interés", "Interest only") }, { m: "6", cap: 0, int: 2500, note: pick("Solo interés", "Interest only") },
        { m: "11", cap: 0, int: 2500, note: pick("Solo interés", "Interest only") },
        { m: "12", cap: 100000, int: 2500, note: pick("¡Pago único capital!", "Single principal payment!") },
      ],
    },
    balloon: {
      months: [
        { m: "1", cap: 5000, int: 2500, note: "" }, { m: "6", cap: 5000, int: 1875, note: "" },
        { m: "11", cap: 5000, int: 1250, note: "" },
        { m: "12", cap: 45000, int: 625, note: pick("Cuota balloon 🎈", "Balloon payment 🎈") },
      ],
    },
    seasonal: {
      months: [
        { m: pick("Ene", "Jan"), cap: 12000, int: 2500, note: pick("Temporada alta", "Peak season") },
        { m: pick("Feb", "Feb"), cap: 12000, int: 2350, note: pick("Temporada alta", "Peak season") },
        { m: pick("Mar", "Mar"), cap: 3000, int: 2200, note: pick("Temporada baja", "Low season") },
        { m: pick("Jun", "Jun"), cap: 3000, int: 1800, note: pick("Temporada baja", "Low season") },
        { m: pick("Nov", "Nov"), cap: 12000, int: 800, note: pick("Temporada alta", "Peak season") },
      ],
    },
  };

  const [active, setActive] = useState("regular");
  const data = schedules[active];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary" />
        {pick("Editor de Cronogramas — Vista Práctica", "Schedule Editor — Practical View")}
      </h4>

      {/* Preset selector */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map(p => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all ${
              active === p.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent hover:border-border"
            }`}
          >
            <span>{p.icon}</span> {p.label}
          </button>
        ))}
      </div>

      {/* Live schedule table */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-primary/5">
                  <th className="px-3 py-2.5 text-left font-bold">{pick("Período", "Period")}</th>
                  <th className="px-3 py-2.5 text-right font-bold">{pick("Capital", "Principal")}</th>
                  <th className="px-3 py-2.5 text-right font-bold">{pick("Interés", "Interest")}</th>
                  <th className="px-3 py-2.5 text-right font-bold">Total</th>
                  <th className="px-3 py-2.5 text-left font-bold">{pick("Nota", "Note")}</th>
                </tr>
              </thead>
              <tbody>
                {data.months.map((row, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-2.5 font-medium">{row.m}</td>
                    <td className={`px-3 py-2.5 text-right font-mono ${row.cap === 0 ? "text-muted-foreground" : "text-foreground font-bold"}`}>
                      ${row.cap.toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">${row.int.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold">${(row.cap + row.int).toLocaleString()}</td>
                    <td className="px-3 py-2.5">
                      {row.note && <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{row.note}</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DEMO 3: Leaseback — simulación paso a paso
   ═══════════════════════════════════════════════════════ */
const LeasebackDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const steps = [
    { icon: "🏢", title: pick("Cliente vende activo", "Client sells asset"), detail: pick("Maquinaria valorada en USD 200,000", "Equipment valued at USD 200,000"), accounting: pick("Débito: Caja → Crédito: Activo Fijo", "Debit: Cash → Credit: Fixed Asset") },
    { icon: "📋", title: pick("BCP tasa y registra", "BCP appraises & registers"), detail: pick("Tasación: USD 195,000 — Diferencia: $5,000 ajuste", "Appraisal: USD 195,000 — Difference: $5,000 adjustment"), accounting: pick("Débito: Activo adquirido → Crédito: Banco", "Debit: Acquired asset → Credit: Bank") },
    { icon: "📝", title: pick("Constitución leasing", "Lease constitution"), detail: pick("Plazo: 48 meses — Opción compra: 1%", "Term: 48 months — Purchase option: 1%"), accounting: pick("Débito: CxC Leasing → Crédito: Ingreso diferido", "Debit: Lease receivable → Credit: Deferred income") },
    { icon: "💵", title: pick("Desembolso al cliente", "Disbursement to client"), detail: pick("Transferencia: USD 195,000 a cuenta del cliente", "Transfer: USD 195,000 to client account"), accounting: pick("Débito: CxC → Crédito: Banco", "Debit: Receivable → Credit: Bank") },
    { icon: "🔄", title: pick("Operación activa", "Active operation"), detail: pick("Cliente usa el activo y paga cuotas mensuales", "Client uses asset and pays monthly installments"), accounting: pick("Débito: Banco → Crédito: Ingreso + Capital", "Debit: Bank → Credit: Income + Principal") },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
        <ArrowRight className="w-4 h-4 text-primary" />
        {pick("Simulación Sale & Leaseback", "Sale & Leaseback Simulation")}
      </h4>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setCurrentStep(i)}
            className={`relative flex gap-3 mb-3 pl-0 cursor-pointer group`}
          >
            <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all ${
              i <= currentStep ? "bg-primary/15 shadow-sm" : "bg-muted"
            }`}>
              {i < currentStep ? <CheckCircle2 className="w-5 h-5 text-success" /> : step.icon}
            </div>
            <div className={`flex-1 rounded-xl border p-3 transition-all ${
              i === currentStep ? "bg-primary/5 border-primary/30 shadow-sm" : i < currentStep ? "bg-success/5 border-success/20" : "bg-card"
            }`}>
              <p className="text-[12px] font-bold text-foreground">{step.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{step.detail}</p>
              <AnimatePresence>
                {i === currentStep && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <div className="mt-2 pt-2 border-t border-primary/20">
                      <p className="text-[10px] text-muted-foreground">{pick("Asiento contable:", "Accounting entry:")}</p>
                      <p className="text-[11px] font-mono font-bold text-primary mt-0.5">{step.accounting}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}
          className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-30 transition-all">
          ← {pick("Anterior", "Previous")}
        </button>
        <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1}
          className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 transition-all">
          {pick("Siguiente", "Next")} →
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DEMO 4: Gastos Sobrevinientes — registro en vivo
   ═══════════════════════════════════════════════════════ */
const SurchargeDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const chargeTypes = [
    { icon: "🏛️", label: pick("Impuesto vehicular", "Vehicle tax"), amount: 1200 },
    { icon: "🚦", label: pick("Multa de tránsito", "Traffic fine"), amount: 350 },
    { icon: "🛡️", label: pick("Prima de seguro", "Insurance premium"), amount: 2800 },
    { icon: "🔧", label: pick("Reparación", "Repair"), amount: 950 },
  ];

  const [charges, setCharges] = useState<{ icon: string; label: string; amount: number; mode: string; status: string }[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  const addCharge = (type: typeof chargeTypes[0]) => {
    setCharges([...charges, {
      ...type,
      mode: pick("Cobro independiente", "Independent charge"),
      status: pick("Pendiente aprobación", "Pending approval"),
    }]);
    setShowAdd(false);
    // Auto-approve after 1.5s
    setTimeout(() => {
      setCharges(prev => prev.map((c, i) => i === prev.length - 1 ? { ...c, status: pick("✅ Aprobado", "✅ Approved") } : c));
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          {pick("Registro de Gastos Sobrevinientes", "Supervening Charges Registration")}
        </h4>
        <button onClick={() => { setCharges([]); setShowAdd(false); }} className="text-[10px] text-primary hover:underline">
          {pick("Reiniciar", "Reset")}
        </button>
      </div>

      {/* Contract context */}
      <div className="rounded-xl border bg-card p-3 flex items-center gap-3">
        <Truck className="w-8 h-8 text-primary shrink-0" />
        <div className="text-[11px]">
          <p className="font-bold text-foreground">{pick("Contrato", "Contract")} #LEA-2026-0047</p>
          <p className="text-muted-foreground">Volvo FH16 — USD 185,000 — {pick("Cuota mensual", "Monthly payment")}: $4,250</p>
        </div>
      </div>

      {/* Charges list */}
      {charges.length > 0 && (
        <div className="space-y-2">
          {charges.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card p-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">{c.icon}</span>
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-foreground">{c.label}</p>
                  <p className="text-[10px] text-muted-foreground">{c.mode}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-bold text-foreground">USD {c.amount.toLocaleString()}</p>
                  <motion.p className={`text-[10px] font-medium ${c.status.includes("✅") ? "text-success" : "text-amber-500"}`}
                    animate={c.status.includes("✅") ? {} : { opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}>
                    {c.status}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add charge */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <div className="grid grid-cols-2 gap-2">
              {chargeTypes.map((ct, i) => (
                <button key={i} onClick={() => addCharge(ct)}
                  className="flex items-center gap-2 p-3 rounded-xl border bg-card hover:bg-primary/5 hover:border-primary/30 transition-all text-left">
                  <span className="text-lg">{ct.icon}</span>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">{ct.label}</p>
                    <p className="text-[10px] text-muted-foreground">USD {ct.amount.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setShowAdd(!showAdd)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-primary/30 text-primary text-[11px] font-bold hover:bg-primary/5 transition-all">
        <Plus className="w-4 h-4" />
        {pick("Agregar Gasto Sobreviniente", "Add Supervening Charge")}
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DEMO 5: Ficha Técnica del Activo — tarjeta interactiva
   ═══════════════════════════════════════════════════════ */
const AssetCardDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const [activeTab, setActiveTab] = useState("info");
  const tabs = [
    { id: "info", label: pick("Información", "Information"), icon: FileText },
    { id: "depreciation", label: pick("Depreciación", "Depreciation"), icon: BarChart3 },
    { id: "docs", label: pick("Documentos", "Documents"), icon: Shield },
    { id: "history", label: pick("Historial", "History"), icon: Clock },
  ];

  const depreciationYears = [
    { year: 2026, value: 185000, dep: 0 },
    { year: 2027, value: 148000, dep: 37000 },
    { year: 2028, value: 111000, dep: 37000 },
    { year: 2029, value: 74000, dep: 37000 },
    { year: 2030, value: 37000, dep: 37000 },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
        <Settings className="w-4 h-4 text-primary" />
        {pick("Ficha Técnica — Vista Práctica", "Technical Sheet — Practical View")}
      </h4>

      {/* Asset header card */}
      <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">🚛</div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Volvo FH16 — 2026</p>
            <p className="text-[11px] text-muted-foreground">S/N: YV2RTK0A5RB-XXXXX • {pick("Placa", "Plate")}: ABC-1234</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold">{pick("Activo", "Active")}</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">#LEA-2026-0047</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">$185,000</p>
            <p className="text-[10px] text-muted-foreground">{pick("Valor comercial", "Market value")}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/40 border">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-[10px] font-bold transition-all ${
                activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
              }`}>
              <Icon className="w-3 h-3" /> {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "info" && (
          <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-2">
              {[
                [pick("Marca", "Brand"), "Volvo"], [pick("Modelo", "Model"), "FH16"],
                [pick("Año", "Year"), "2026"], [pick("Color", "Color"), pick("Blanco", "White")],
                [pick("Proveedor", "Supplier"), "Divemotor S.A."], [pick("Ubicación", "Location"), "Lima, Perú"],
                [pick("Valor residual", "Residual"), "$37,000 (20%)"], [pick("Depreciación", "Depreciation"), pick("Línea recta", "Straight-line")],
              ].map(([label, value], i) => (
                <div key={i} className="rounded-lg border bg-card p-2.5">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{label}</p>
                  <p className="text-[12px] font-bold text-foreground mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {activeTab === "depreciation" && (
          <motion.div key="dep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-2">
              {depreciationYears.map((y, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-muted-foreground w-10">{y.year}</span>
                  <div className="flex-1 h-6 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(y.value / 185000) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-foreground w-20 text-right">${y.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {activeTab === "docs" && (
          <motion.div key="docs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-2">
              {[
                { name: pick("Factura de compra", "Purchase invoice"), type: "PDF", size: "2.4 MB", date: "15/01/2026" },
                { name: pick("Fotos del activo", "Asset photos"), type: "JPG", size: "8.1 MB", date: "15/01/2026" },
                { name: pick("Informe de tasación", "Appraisal report"), type: "PDF", size: "1.8 MB", date: "16/01/2026" },
                { name: pick("Póliza de seguro", "Insurance policy"), type: "PDF", size: "540 KB", date: "18/01/2026" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border bg-card p-3 hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{doc.type}</div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-foreground">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground">{doc.size} • {doc.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {activeTab === "history" && (
          <motion.div key="hist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-2">
              {[
                { date: "15/01/2026", action: pick("Activo registrado en el sistema", "Asset registered in system"), user: "M. López" },
                { date: "16/01/2026", action: pick("Tasación completada — $195,000", "Appraisal completed — $195,000"), user: "J. Pérez" },
                { date: "18/01/2026", action: pick("Póliza de seguro adjuntada", "Insurance policy attached"), user: "A. García" },
                { date: "20/01/2026", action: pick("Contrato de leasing constituido", "Leasing contract constituted"), user: "M. López" },
                { date: "15/02/2026", action: pick("Primera cuota cobrada — $4,250", "First installment collected — $4,250"), user: "Sistema" },
              ].map((entry, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-foreground">{entry.action}</p>
                    <p className="text-[10px] text-muted-foreground">{entry.date} — {entry.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════ */

const InteractiveFunctionalDemo = ({ type }: Props) => {
  switch (type) {
    case "disbursement": return <DisbursementDemo />;
    case "schedule": return <ScheduleDemo />;
    case "leaseback": return <LeasebackDemo />;
    case "surcharge": return <SurchargeDemo />;
    case "asset-card": return <AssetCardDemo />;
    default: return null;
  }
};

export default InteractiveFunctionalDemo;
