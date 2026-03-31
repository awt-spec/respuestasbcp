import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import {
  CheckCircle2, CircleDollarSign, FileText, AlertTriangle,
  Truck, Calendar, Plus, ArrowRight, Clock, DollarSign,
  ChevronRight, BarChart3, Shield, Settings, Edit3, X,
  Save, RotateCcw, Sparkles, Eye, Hash
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

type DemoType = "disbursement" | "schedule" | "leaseback" | "surcharge" | "asset-card";

/* ─── Reusable slider-input control ─── */
const SliderInput = ({ label, value, onChange, min, max, step = 1, prefix = "", suffix = "", color = "primary" }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; prefix?: string; suffix?: string; color?: string;
}) => {
  const pct = Math.round(((value - min) / (max - min)) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">{label}</label>
        <span className="text-sm font-bold font-mono text-foreground">{prefix}{value.toLocaleString()}{suffix}</span>
      </div>
      <div className="relative group">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[8px] text-muted-foreground font-mono">{prefix}{min.toLocaleString()}{suffix}</span>
          <span className="text-[8px] text-muted-foreground font-mono">{prefix}{max.toLocaleString()}{suffix}</span>
        </div>
      </div>
    </div>
  );
};

interface Props {
  type: DemoType;
}

const glassMorphism = "backdrop-blur-xl bg-gradient-to-br from-card/80 to-card/40 border shadow-xl";
const glowBorder = "ring-1 ring-primary/10 hover:ring-primary/25 transition-all";

/* ═══════════════════════════════════════════════════════
   DEMO 1: Desembolsos Parciales — simulación EDITABLE
   ═══════════════════════════════════════════════════════ */
const DisbursementDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const defaultTranches = [
    { id: 1, label: pick("Tramo 1 — Anticipo", "Tranche 1 — Advance"), amount: 45000, condition: pick("Firma del contrato", "Contract signature"), date: "15/01/2026" },
    { id: 2, label: pick("Tramo 2 — Entrega parcial", "Tranche 2 — Partial delivery"), amount: 60000, condition: pick("Entrega 50% del equipo", "50% equipment delivery"), date: "28/02/2026" },
    { id: 3, label: pick("Tramo 3 — Entrega final", "Tranche 3 — Final delivery"), amount: 80000, condition: pick("Entrega total + validación", "Full delivery + validation"), date: "15/04/2026" },
  ];

  const [tranches, setTranches] = useState(defaultTranches);
  const [released, setReleased] = useState<number[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCondition, setEditCondition] = useState("");

  const totalContract = tranches.reduce((s, t) => s + t.amount, 0);
  const totalReleased = tranches.filter(t => released.includes(t.id)).reduce((s, t) => s + t.amount, 0);
  const pct = Math.round((totalReleased / totalContract) * 100);

  const releaseTranche = (id: number) => {
    if (!released.includes(id)) {
      const idx = tranches.findIndex(t => t.id === id);
      if (idx === 0 || released.includes(tranches[idx - 1].id)) {
        setReleased([...released, id]);
      }
    }
  };

  const startEdit = (t: typeof tranches[0]) => {
    setEditing(t.id);
    setEditAmount(String(t.amount));
    setEditCondition(t.condition);
  };

  const saveEdit = (id: number) => {
    setTranches(tranches.map(t => t.id === id ? { ...t, amount: Number(editAmount) || t.amount, condition: editCondition || t.condition } : t));
    setEditing(null);
  };

  const addTranche = () => {
    const newId = Math.max(...tranches.map(t => t.id)) + 1;
    setTranches([...tranches, {
      id: newId,
      label: pick(`Tramo ${newId} — Nuevo`, `Tranche ${newId} — New`),
      amount: 25000,
      condition: pick("Condición personalizada", "Custom condition"),
      date: "—",
    }]);
  };

  const removeTranche = (id: number) => {
    if (tranches.length <= 1) return;
    setTranches(tranches.filter(t => t.id !== id));
    setReleased(released.filter(r => r !== id));
  };

  const reset = () => { setTranches(defaultTranches); setReleased([]); setEditing(null); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <CircleDollarSign className="w-4 h-4 text-primary-foreground" />
          </div>
          {pick("Simulador de Desembolsos por Tramos", "Tranche Disbursement Simulator")}
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider">{pick("100% Editable", "100% Editable")}</span>
        </h4>
        <button onClick={reset} className="flex items-center gap-1 text-[10px] text-primary hover:underline">
          <RotateCcw className="w-3 h-3" /> {pick("Reiniciar", "Reset")}
        </button>
      </div>

      {/* Progress bar */}
      <div className={`rounded-2xl ${glassMorphism} p-4`}>
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="text-muted-foreground">{pick("Progreso de desembolso", "Disbursement progress")}</span>
          <span className="font-bold text-foreground">{pct}% — USD {totalReleased.toLocaleString()} / {totalContract.toLocaleString()}</span>
        </div>
        <div className="h-4 rounded-full bg-muted/60 overflow-hidden relative">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-emerald-500 to-emerald-400 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {pct > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute right-2 top-0 h-full flex items-center text-[9px] font-bold text-foreground">
              {pct}%
            </motion.div>
          )}
        </div>
      </div>

      {/* Tranches */}
      <div className="space-y-2.5">
        {tranches.map((tranche, i) => {
          const isReleased = released.includes(tranche.id);
          const canRelease = !isReleased && (i === 0 || released.includes(tranches[i - 1].id));
          const isEditing = editing === tranche.id;

          return (
            <motion.div
              key={tranche.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-2xl border-2 p-4 transition-all ${
                isReleased
                  ? "bg-gradient-to-r from-success/5 to-success/[0.02] border-success/30 shadow-[0_0_15px_rgba(34,197,94,0.08)]"
                  : canRelease
                    ? `bg-gradient-to-r from-primary/5 to-primary/[0.02] border-primary/30 cursor-pointer hover:shadow-lg hover:border-primary/50 ${glowBorder}`
                    : "bg-muted/10 border-border/50 opacity-50"
              }`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-primary">
                    <Edit3 className="w-3.5 h-3.5" /> {pick("Editando tramo", "Editing tranche")}
                  </div>
                  <SliderInput
                    label={pick("Monto USD", "Amount USD")}
                    value={Number(editAmount) || 0}
                    onChange={(v) => setEditAmount(String(v))}
                    min={5000} max={500000} step={5000}
                    prefix="$"
                  />
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">{pick("Condición", "Condition")}</label>
                    <input type="text" value={editCondition} onChange={e => setEditCondition(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-background border text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(tranche.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold">
                      <Save className="w-3 h-3" /> {pick("Guardar", "Save")}
                    </button>
                    <button onClick={() => setEditing(null)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-[10px] font-bold">
                      <X className="w-3 h-3" /> {pick("Cancelar", "Cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3" onClick={() => canRelease && releaseTranche(tranche.id)}>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isReleased ? "bg-success/15 text-success shadow-sm" : canRelease ? "bg-primary/15 text-primary shadow-sm" : "bg-muted text-muted-foreground"
                    }`}>
                      {isReleased ? <CheckCircle2 className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-foreground">{tranche.label}</p>
                      <p className="text-[10px] text-muted-foreground">{pick("Condición", "Condition")}: {tranche.condition}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground font-mono">USD {tranche.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">{tranche.date}</p>
                    </div>
                    {!isReleased && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); startEdit(tranche); }} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title={pick("Editar", "Edit")}>
                          <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); removeTranche(tranche.id); }} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors" title={pick("Eliminar", "Remove")}>
                          <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    )}
                    {canRelease && (
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="text-primary">
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                  {isReleased && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t border-success/20">
                      <div className="grid grid-cols-3 gap-2 text-[10px]">
                        <div className="bg-success/10 rounded-xl p-2.5 text-center">
                          <p className="text-muted-foreground">{pick("Asiento", "Entry")}</p>
                          <p className="font-bold text-success">✓ {pick("Generado", "Generated")}</p>
                        </div>
                        <div className="bg-success/10 rounded-xl p-2.5 text-center">
                          <p className="text-muted-foreground">{pick("Saldo pendiente", "Remaining")}</p>
                          <p className="font-bold text-foreground font-mono">USD {(totalContract - totalReleased).toLocaleString()}</p>
                        </div>
                        <div className="bg-success/10 rounded-xl p-2.5 text-center">
                          <p className="text-muted-foreground">{pick("Usuario", "User")}</p>
                          <p className="font-bold text-foreground">J. Pérez</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Add tranche button */}
      <button onClick={addTranche}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-primary/30 text-primary text-[11px] font-bold hover:bg-primary/5 hover:border-primary/50 transition-all group">
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
        {pick("Agregar nuevo tramo", "Add new tranche")}
      </button>

      {released.length === 0 && (
        <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}
          className="text-[10px] text-primary text-center flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" /> {pick("Haz clic en el Tramo 1 para simular", "Click Tranche 1 to simulate")}
        </motion.p>
      )}
      {released.length === tranches.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-gradient-to-br from-success/15 to-success/5 border-2 border-success/30 p-5 text-center shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-2" />
          <p className="text-base font-bold text-success">{pick("¡Desembolso completo!", "Full disbursement complete!")}</p>
          <p className="text-[11px] text-muted-foreground">{pick("Todos los tramos liberados con asientos contables", "All tranches released with accounting entries")}</p>
        </motion.div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DEMO 2: Cronograma Tailor-Made — TOTALMENTE EDITABLE
   ═══════════════════════════════════════════════════════ */
const ScheduleDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const presets = [
    { id: "regular", label: pick("Regular", "Regular"), icon: "📊", desc: pick("Cuotas iguales", "Equal payments") },
    { id: "grace", label: "Grace Period", icon: "⏸️", desc: pick("Solo intereses iniciales", "Interest-only start") },
    { id: "bullet", label: "Bullet", icon: "🎯", desc: pick("Capital al final", "Principal at end") },
    { id: "balloon", label: "Balloon", icon: "🎈", desc: pick("Cuota final grande", "Large final payment") },
    { id: "seasonal", label: pick("Estacional", "Seasonal"), icon: "🌊", desc: pick("Según temporada", "Per season") },
    { id: "custom", label: pick("Personalizado", "Custom"), icon: "✏️", desc: pick("Tú defines todo", "You define all") },
  ];

  const presetSchedules: Record<string, { m: string; cap: number; int: number; note: string }[]> = {
    regular: [
      { m: "1", cap: 8333, int: 2500, note: "" }, { m: "2", cap: 8333, int: 2361, note: "" },
      { m: "3", cap: 8333, int: 2222, note: "" }, { m: "...", cap: 8333, int: 0, note: "..." },
      { m: "12", cap: 8333, int: 139, note: pick("Última cuota", "Last payment") },
    ],
    grace: [
      { m: "1", cap: 0, int: 2500, note: "Grace" }, { m: "2", cap: 0, int: 2500, note: "Grace" },
      { m: "3", cap: 0, int: 2500, note: "Grace" }, { m: "4", cap: 11111, int: 2500, note: pick("Inicio pagos", "Payments start") },
      { m: "12", cap: 11111, int: 278, note: pick("Final", "Final") },
    ],
    bullet: [
      { m: "1", cap: 0, int: 2500, note: pick("Solo interés", "Interest only") }, { m: "6", cap: 0, int: 2500, note: pick("Solo interés", "Interest only") },
      { m: "11", cap: 0, int: 2500, note: pick("Solo interés", "Interest only") },
      { m: "12", cap: 100000, int: 2500, note: pick("¡Pago único!", "Single payment!") },
    ],
    balloon: [
      { m: "1", cap: 5000, int: 2500, note: "" }, { m: "6", cap: 5000, int: 1875, note: "" },
      { m: "11", cap: 5000, int: 1250, note: "" },
      { m: "12", cap: 45000, int: 625, note: pick("Balloon 🎈", "Balloon 🎈") },
    ],
    seasonal: [
      { m: pick("Ene", "Jan"), cap: 12000, int: 2500, note: pick("Alta", "Peak") },
      { m: pick("Mar", "Mar"), cap: 3000, int: 2200, note: pick("Baja", "Low") },
      { m: pick("Jun", "Jun"), cap: 3000, int: 1800, note: pick("Baja", "Low") },
      { m: pick("Nov", "Nov"), cap: 12000, int: 800, note: pick("Alta", "Peak") },
    ],
    custom: [
      { m: "1", cap: 10000, int: 3000, note: "" },
      { m: "2", cap: 5000, int: 2800, note: "" },
      { m: "3", cap: 15000, int: 2600, note: "" },
    ],
  };

  const [active, setActive] = useState("regular");
  const [rows, setRows] = useState(presetSchedules.regular);
  const [editingRow, setEditingRow] = useState<number | null>(null);

  const selectPreset = (id: string) => {
    setActive(id);
    setRows([...presetSchedules[id]]);
    setEditingRow(null);
  };

  const updateRow = (i: number, field: "cap" | "int" | "m" | "note", value: string) => {
    const updated = [...rows];
    if (field === "cap" || field === "int") {
      updated[i] = { ...updated[i], [field]: Number(value) || 0 };
    } else {
      updated[i] = { ...updated[i], [field]: value };
    }
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { m: String(rows.length + 1), cap: 5000, int: 1000, note: "" }]);
  };

  const removeRow = (i: number) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((_, idx) => idx !== i));
  };

  const totalCap = rows.reduce((s, r) => s + r.cap, 0);
  const totalInt = rows.reduce((s, r) => s + r.int, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          {pick("Editor de Cronogramas", "Schedule Editor")}
          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-bold uppercase tracking-wider">{pick("Editable", "Editable")}</span>
        </h4>
      </div>

      {/* Preset selector */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
        {presets.map(p => (
          <button key={p.id} onClick={() => selectPreset(p.id)}
            className={`flex flex-col items-center gap-1 p-2.5 rounded-xl text-[10px] font-bold transition-all ${
              active === p.id
                ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                : "bg-muted/40 text-muted-foreground hover:bg-muted border border-transparent hover:border-border"
            }`}>
            <span className="text-lg">{p.icon}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Live schedule table */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <div className={`overflow-x-auto rounded-2xl border-2 ${active === "custom" ? "border-primary/30" : "border-border"}`}>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <th className="px-3 py-3 text-left font-bold">{pick("Período", "Period")}</th>
                  <th className="px-3 py-3 text-right font-bold">{pick("Capital", "Principal")}</th>
                  <th className="px-3 py-3 text-right font-bold">{pick("Interés", "Interest")}</th>
                  <th className="px-3 py-3 text-right font-bold">Total</th>
                  <th className="px-3 py-3 text-left font-bold">{pick("Nota", "Note")}</th>
                  <th className="px-3 py-3 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className={`border-t transition-colors ${editingRow === i ? "bg-primary/5" : "hover:bg-muted/30"}`}>
                    {editingRow === i ? (
                      <>
                        <td className="px-2 py-1.5"><input value={row.m} onChange={e => updateRow(i, "m", e.target.value)} className="w-14 px-2 py-1 rounded-lg bg-background border text-[11px] focus:ring-1 focus:ring-primary/30 outline-none" /></td>
                        <td className="px-2 py-1.5"><input type="number" value={row.cap} onChange={e => updateRow(i, "cap", e.target.value)} className="w-20 px-2 py-1 rounded-lg bg-background border text-[11px] font-mono text-right focus:ring-1 focus:ring-primary/30 outline-none" /></td>
                        <td className="px-2 py-1.5"><input type="number" value={row.int} onChange={e => updateRow(i, "int", e.target.value)} className="w-20 px-2 py-1 rounded-lg bg-background border text-[11px] font-mono text-right focus:ring-1 focus:ring-primary/30 outline-none" /></td>
                        <td className="px-3 py-1.5 text-right font-mono font-bold">${(row.cap + row.int).toLocaleString()}</td>
                        <td className="px-2 py-1.5"><input value={row.note} onChange={e => updateRow(i, "note", e.target.value)} className="w-24 px-2 py-1 rounded-lg bg-background border text-[11px] focus:ring-1 focus:ring-primary/30 outline-none" /></td>
                        <td className="px-2 py-1.5">
                          <div className="flex gap-1">
                            <button onClick={() => setEditingRow(null)} className="p-1 rounded bg-primary text-primary-foreground"><Save className="w-3 h-3" /></button>
                            <button onClick={() => removeRow(i)} className="p-1 rounded bg-destructive/10 text-destructive"><X className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2.5 font-medium">{row.m}</td>
                        <td className={`px-3 py-2.5 text-right font-mono ${row.cap === 0 ? "text-muted-foreground" : "text-foreground font-bold"}`}>${row.cap.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">${row.int.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-right font-mono font-bold">${(row.cap + row.int).toLocaleString()}</td>
                        <td className="px-3 py-2.5">{row.note && <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{row.note}</span>}</td>
                        <td className="px-2 py-2.5">
                          <button onClick={() => setEditingRow(i)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                            <Edit3 className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </td>
                      </>
                    )}
                  </motion.tr>
                ))}
                {/* Totals */}
                <tr className="border-t-2 bg-primary/5 font-bold">
                  <td className="px-3 py-2.5">TOTAL</td>
                  <td className="px-3 py-2.5 text-right font-mono">${totalCap.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-right font-mono">${totalInt.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-primary">${(totalCap + totalInt).toLocaleString()}</td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={addRow}
            className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 border-dashed border-border text-muted-foreground text-[10px] font-bold hover:bg-muted/30 hover:border-primary/30 hover:text-primary transition-all">
            <Plus className="w-3 h-3" /> {pick("Agregar período", "Add period")}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DEMO 3: Leaseback — simulación paso a paso EDITABLE
   ═══════════════════════════════════════════════════════ */
const LeasebackDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const [assetValue, setAssetValue] = useState(200000);
  const [appraisalValue, setAppraisalValue] = useState(195000);
  const [term, setTerm] = useState(48);
  const [purchaseOption, setPurchaseOption] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const monthlyPayment = Math.round((appraisalValue * (1 - purchaseOption / 100)) / term);
  const residual = Math.round(appraisalValue * purchaseOption / 100);
  const diff = assetValue - appraisalValue;

  const steps = [
    { icon: "🏢", title: pick("Cliente vende activo", "Client sells asset"), detail: pick(`Valor: USD ${assetValue.toLocaleString()}`, `Value: USD ${assetValue.toLocaleString()}`), accounting: pick("Débito: Caja → Crédito: Activo Fijo", "Debit: Cash → Credit: Fixed Asset") },
    { icon: "📋", title: pick("BCP tasa y registra", "BCP appraises"), detail: pick(`Tasación: USD ${appraisalValue.toLocaleString()} — Dif: $${diff.toLocaleString()}`, `Appraisal: USD ${appraisalValue.toLocaleString()} — Diff: $${diff.toLocaleString()}`), accounting: pick("Débito: Activo → Crédito: Banco", "Debit: Asset → Credit: Bank") },
    { icon: "📝", title: pick("Constitución leasing", "Lease constitution"), detail: pick(`Plazo: ${term} meses — Opción: ${purchaseOption}% ($${residual.toLocaleString()})`, `Term: ${term} months — Option: ${purchaseOption}% ($${residual.toLocaleString()})`), accounting: pick("Débito: CxC Leasing → Crédito: Ingreso diferido", "Debit: Lease receivable → Credit: Deferred") },
    { icon: "💵", title: pick("Desembolso", "Disbursement"), detail: pick(`USD ${appraisalValue.toLocaleString()} a cuenta del cliente`, `USD ${appraisalValue.toLocaleString()} to client`), accounting: pick("Débito: CxC → Crédito: Banco", "Debit: Receivable → Credit: Bank") },
    { icon: "🔄", title: pick("Operación activa", "Active operation"), detail: pick(`Cuota mensual: ~USD ${monthlyPayment.toLocaleString()}`, `Monthly: ~USD ${monthlyPayment.toLocaleString()}`), accounting: pick("Débito: Banco → Crédito: Ingreso + Capital", "Debit: Bank → Credit: Income + Principal") },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
          {pick("Simulación Sale & Leaseback", "Sale & Leaseback Simulation")}
        </h4>
        <button onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${editMode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
          <Edit3 className="w-3 h-3" /> {pick("Editar valores", "Edit values")}
        </button>
      </div>

      {/* Editable parameters */}
      <AnimatePresence>
        {editMode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gradient-to-br from-violet-500/5 to-transparent border border-violet-500/20">
              <SliderInput label={pick("Valor activo", "Asset value")} value={assetValue} onChange={setAssetValue} min={50000} max={1000000} step={5000} prefix="$" />
              <SliderInput label={pick("Tasación", "Appraisal")} value={appraisalValue} onChange={setAppraisalValue} min={50000} max={1000000} step={5000} prefix="$" />
              <SliderInput label={pick("Plazo (meses)", "Term (months)")} value={term} onChange={setTerm} min={6} max={120} step={6} />
              <SliderInput label={pick("Opción compra %", "Purchase opt %")} value={purchaseOption} onChange={setPurchaseOption} min={1} max={30} step={1} suffix="%" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: pick("Cuota mensual", "Monthly"), value: `$${monthlyPayment.toLocaleString()}`, color: "from-violet-500/10 border-violet-500/20" },
          { label: pick("Valor residual", "Residual"), value: `$${residual.toLocaleString()}`, color: "from-emerald-500/10 border-emerald-500/20" },
          { label: pick("Total operación", "Total operation"), value: `$${(monthlyPayment * term + residual).toLocaleString()}`, color: "from-blue-500/10 border-blue-500/20" },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`rounded-xl bg-gradient-to-br ${c.color} border p-3 text-center`}>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{c.label}</p>
            <p className="text-sm font-bold font-mono text-foreground mt-0.5">{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/40 via-primary/20 to-transparent" />
        {steps.map((step, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            onClick={() => setCurrentStep(i)} className="relative flex gap-3 mb-3 cursor-pointer group">
            <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all ${
              i <= currentStep ? "bg-gradient-to-br from-violet-500/20 to-primary/10 shadow-sm" : "bg-muted"
            }`}>
              {i < currentStep ? <CheckCircle2 className="w-5 h-5 text-success" /> : step.icon}
            </div>
            <div className={`flex-1 rounded-2xl border-2 p-3.5 transition-all ${
              i === currentStep ? "bg-gradient-to-r from-violet-500/5 to-transparent border-violet-500/30 shadow-md" : i < currentStep ? "bg-success/5 border-success/20" : "bg-card border-border/50"
            }`}>
              <p className="text-[12px] font-bold text-foreground">{step.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{step.detail}</p>
              <AnimatePresence>
                {i === currentStep && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <div className="mt-2 pt-2 border-t border-violet-500/20">
                      <p className="text-[10px] text-muted-foreground">{pick("Asiento contable:", "Accounting entry:")}</p>
                      <p className="text-[11px] font-mono font-bold text-violet-600 mt-0.5">{step.accounting}</p>
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
          className="px-4 py-2 rounded-xl text-[10px] font-bold bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-30 transition-all">
          ← {pick("Anterior", "Previous")}
        </button>
        <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1}
          className="px-4 py-2 rounded-xl text-[10px] font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 transition-all">
          {pick("Siguiente", "Next")} →
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DEMO 4: Gastos Sobrevinientes — EDITABLE con montos
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
  const [customLabel, setCustomLabel] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const addCharge = (icon: string, label: string, amount: number) => {
    const newCharge = { icon, label, amount, mode: pick("Cobro independiente", "Independent charge"), status: pick("⏳ Pendiente aprobación", "⏳ Pending approval") };
    setCharges(prev => [...prev, newCharge]);
    setShowAdd(false);
    setShowCustom(false);
    setTimeout(() => {
      setCharges(prev => prev.map((c, i) => i === prev.length - 1 ? { ...c, status: pick("✅ Aprobado", "✅ Approved") } : c));
    }, 1500);
  };

  const toggleMode = (idx: number) => {
    setCharges(charges.map((c, i) => i === idx ? {
      ...c,
      mode: c.mode.includes(pick("independiente", "Independent"))
        ? pick("Incorporar al período", "Add to next period")
        : pick("Cobro independiente", "Independent charge")
    } : c));
  };

  const totalCharges = charges.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          {pick("Registro de Gastos Sobrevinientes", "Supervening Charges Registration")}
        </h4>
        <button onClick={() => { setCharges([]); setShowAdd(false); setShowCustom(false); }} className="flex items-center gap-1 text-[10px] text-primary hover:underline">
          <RotateCcw className="w-3 h-3" /> {pick("Reiniciar", "Reset")}
        </button>
      </div>

      {/* Contract context */}
      <div className={`rounded-2xl ${glassMorphism} p-4 flex items-center gap-4`}>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
          <Truck className="w-6 h-6 text-amber-600" />
        </div>
        <div className="flex-1 text-[11px]">
          <p className="font-bold text-foreground">{pick("Contrato", "Contract")} #LEA-2026-0047</p>
          <p className="text-muted-foreground">Volvo FH16 — USD 185,000 — {pick("Cuota", "Payment")}: $4,250</p>
        </div>
        {totalCharges > 0 && (
          <div className="text-right">
            <p className="text-[9px] text-muted-foreground uppercase">{pick("Gastos extras", "Extra charges")}</p>
            <p className="text-sm font-bold text-amber-600 font-mono">+${totalCharges.toLocaleString()}</p>
          </div>
        )}
      </div>

      {/* Charges list */}
      {charges.length > 0 && (
        <div className="space-y-2">
          {charges.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 bg-card p-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <span className="text-xl">{c.icon}</span>
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-foreground">{c.label}</p>
                  <button onClick={() => toggleMode(i)} className="text-[10px] text-primary hover:underline cursor-pointer mt-0.5">
                    🔀 {c.mode}
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground font-mono">USD {c.amount.toLocaleString()}</p>
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

      {/* Add charge options */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {chargeTypes.map((ct, i) => (
                <button key={i} onClick={() => addCharge(ct.icon, ct.label, ct.amount)}
                  className="flex items-center gap-2.5 p-3.5 rounded-2xl border-2 bg-card hover:bg-primary/5 hover:border-primary/30 transition-all text-left group">
                  <span className="text-xl group-hover:scale-110 transition-transform">{ct.icon}</span>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">{ct.label}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">USD {ct.amount.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
            {/* Custom charge */}
            {showCustom ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl border bg-primary/5 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder={pick("Descripción del gasto", "Charge description")} value={customLabel} onChange={e => setCustomLabel(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-background border text-[11px] focus:ring-1 focus:ring-primary/30 outline-none" />
                  <input type="number" placeholder="USD" value={customAmount} onChange={e => setCustomAmount(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-background border text-[11px] font-mono focus:ring-1 focus:ring-primary/30 outline-none" />
                </div>
                <button onClick={() => { if (customLabel && customAmount) { addCharge("📋", customLabel, Number(customAmount)); setCustomLabel(""); setCustomAmount(""); } }}
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold">
                  {pick("Agregar", "Add")}
                </button>
              </motion.div>
            ) : (
              <button onClick={() => setShowCustom(true)} className="w-full text-[10px] text-primary hover:underline text-center py-1">
                ✏️ {pick("O crea un gasto personalizado", "Or create a custom charge")}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setShowAdd(!showAdd)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-amber-500/30 text-amber-600 text-[11px] font-bold hover:bg-amber-500/5 hover:border-amber-500/50 transition-all group">
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
        {pick("Agregar Gasto Sobreviniente", "Add Supervening Charge")}
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DEMO 5: Ficha Técnica del Activo — EDITABLE
   ═══════════════════════════════════════════════════════ */
const AssetCardDemo = () => {
  const { lang } = useI18n();
  const pick = <T,>(es: T, en: T): T => lang === "en" ? en : es;

  const [activeTab, setActiveTab] = useState("info");
  const [editMode, setEditMode] = useState(false);
  const [assetData, setAssetData] = useState({
    brand: "Volvo", model: "FH16", year: "2026", color: pick("Blanco", "White"),
    supplier: "Divemotor S.A.", location: "Lima, Perú",
    serial: "YV2RTK0A5RB-XXXXX", plate: "ABC-1234",
    marketValue: 185000, residualPct: 20,
  });

  const residualValue = Math.round(assetData.marketValue * assetData.residualPct / 100);
  const annualDep = Math.round((assetData.marketValue - residualValue) / 5);

  const tabs = [
    { id: "info", label: pick("Información", "Information"), icon: FileText },
    { id: "depreciation", label: pick("Depreciación", "Depreciation"), icon: BarChart3 },
    { id: "docs", label: pick("Documentos", "Documents"), icon: Shield },
    { id: "history", label: pick("Historial", "History"), icon: Clock },
  ];

  const depYears = Array.from({ length: 5 }, (_, i) => ({
    year: Number(assetData.year) + i,
    value: Math.max(assetData.marketValue - annualDep * i, residualValue),
  }));

  const updateField = (field: string, value: string) => {
    setAssetData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          {pick("Ficha Técnica del Activo", "Asset Technical Sheet")}
        </h4>
        <button onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${editMode ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}>
          <Edit3 className="w-3 h-3" /> {editMode ? pick("Vista previa", "Preview") : pick("Editar", "Edit")}
        </button>
      </div>

      {/* Asset header card */}
      <div className="rounded-2xl border-2 bg-gradient-to-br from-emerald-500/5 via-card to-transparent p-5 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center text-3xl shadow-sm">🚛</div>
          <div className="flex-1">
            {editMode ? (
              <div className="flex gap-2">
                <input value={assetData.brand} onChange={e => updateField("brand", e.target.value)}
                  className="px-2 py-1 rounded-lg bg-background border text-sm font-bold w-20 focus:ring-1 focus:ring-emerald-500/30 outline-none" />
                <input value={assetData.model} onChange={e => updateField("model", e.target.value)}
                  className="px-2 py-1 rounded-lg bg-background border text-sm font-bold w-16 focus:ring-1 focus:ring-emerald-500/30 outline-none" />
                <input value={assetData.year} onChange={e => updateField("year", e.target.value)}
                  className="px-2 py-1 rounded-lg bg-background border text-sm font-bold w-16 focus:ring-1 focus:ring-emerald-500/30 outline-none" />
              </div>
            ) : (
              <p className="text-sm font-bold text-foreground">{assetData.brand} {assetData.model} — {assetData.year}</p>
            )}
            <p className="text-[11px] text-muted-foreground mt-0.5">S/N: {assetData.serial} • {pick("Placa", "Plate")}: {assetData.plate}</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold border border-success/20">{pick("Activo", "Active")}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">#LEA-2026-0047</span>
            </div>
          </div>
          <div className="text-right">
            {editMode ? (
              <div>
                <label className="text-[9px] text-muted-foreground">USD</label>
                <input type="number" value={assetData.marketValue} onChange={e => updateField("marketValue", e.target.value)}
                  className="w-28 px-2 py-1 rounded-lg bg-background border text-lg font-bold font-mono text-right focus:ring-1 focus:ring-emerald-500/30 outline-none" />
              </div>
            ) : (
              <>
                <p className="text-xl font-bold text-foreground font-mono">${assetData.marketValue.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">{pick("Valor comercial", "Market value")}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl bg-muted/40 border">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl text-[10px] font-bold transition-all ${
                activeTab === tab.id ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md" : "text-muted-foreground hover:bg-muted"
              }`}>
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "info" && (
          <motion.div key="info" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { key: "brand", label: pick("Marca", "Brand") }, { key: "model", label: pick("Modelo", "Model") },
                { key: "year", label: pick("Año", "Year") }, { key: "color", label: "Color" },
                { key: "supplier", label: pick("Proveedor", "Supplier") }, { key: "location", label: pick("Ubicación", "Location") },
              ].map((f, i) => (
                <div key={i} className="rounded-xl border-2 bg-card p-3 hover:border-emerald-500/20 transition-colors">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">{f.label}</p>
                  {editMode ? (
                    <input value={(assetData as any)[f.key]} onChange={e => updateField(f.key, e.target.value)}
                      className="w-full mt-1 px-2 py-1 rounded-lg bg-background border text-[12px] font-bold focus:ring-1 focus:ring-emerald-500/30 outline-none" />
                  ) : (
                    <p className="text-[12px] font-bold text-foreground mt-0.5">{(assetData as any)[f.key]}</p>
                  )}
                </div>
              ))}
              <div className="rounded-xl border-2 bg-card p-3">
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">{pick("Valor residual", "Residual")}</p>
                {editMode ? (
                  <div className="flex items-center gap-1 mt-1">
                    <input type="number" value={assetData.residualPct} onChange={e => updateField("residualPct", e.target.value)}
                      className="w-14 px-2 py-1 rounded-lg bg-background border text-[12px] font-bold font-mono focus:ring-1 focus:ring-emerald-500/30 outline-none" />
                    <span className="text-[11px] text-muted-foreground">%</span>
                  </div>
                ) : (
                  <p className="text-[12px] font-bold text-foreground mt-0.5">${residualValue.toLocaleString()} ({assetData.residualPct}%)</p>
                )}
              </div>
              <div className="rounded-xl border-2 bg-card p-3">
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">{pick("Depreciación", "Depreciation")}</p>
                <p className="text-[12px] font-bold text-foreground mt-0.5">{pick("Línea recta", "Straight-line")}</p>
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === "depreciation" && (
          <motion.div key="dep" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="space-y-3">
              {depYears.map((y, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-muted-foreground w-10">{y.year}</span>
                  <div className="flex-1 h-7 rounded-full bg-muted/50 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(y.value / assetData.marketValue) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground">
                      ${y.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              <div className="rounded-xl bg-muted/30 p-3 text-[10px] text-muted-foreground text-center">
                {pick(`Depreciación anual: $${annualDep.toLocaleString()} — Vida útil: 5 años`, `Annual depreciation: $${annualDep.toLocaleString()} — Useful life: 5 years`)}
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === "docs" && (
          <motion.div key="docs" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="space-y-2">
              {[
                { name: pick("Factura de compra", "Purchase invoice"), type: "PDF", size: "2.4 MB", date: "15/01/2026", color: "from-red-500/10 text-red-500" },
                { name: pick("Fotos del activo", "Asset photos"), type: "JPG", size: "8.1 MB", date: "15/01/2026", color: "from-blue-500/10 text-blue-500" },
                { name: pick("Informe de tasación", "Appraisal report"), type: "PDF", size: "1.8 MB", date: "16/01/2026", color: "from-red-500/10 text-red-500" },
                { name: pick("Póliza de seguro", "Insurance policy"), type: "PDF", size: "540 KB", date: "18/01/2026", color: "from-red-500/10 text-red-500" },
              ].map((doc, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl border-2 bg-card p-3.5 hover:shadow-md hover:border-emerald-500/20 transition-all cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-[10px] font-bold border`}>{doc.type}</div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-foreground group-hover:text-emerald-600 transition-colors">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground">{doc.size} • {doc.date}</p>
                  </div>
                  <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {activeTab === "history" && (
          <motion.div key="hist" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="space-y-2.5">
              {[
                { date: "15/01/2026", action: pick("Activo registrado en el sistema", "Asset registered"), user: "M. López", color: "bg-emerald-500" },
                { date: "16/01/2026", action: pick("Tasación completada — $195,000", "Appraisal — $195,000"), user: "J. Pérez", color: "bg-blue-500" },
                { date: "18/01/2026", action: pick("Póliza de seguro adjuntada", "Insurance attached"), user: "A. García", color: "bg-violet-500" },
                { date: "20/01/2026", action: pick("Contrato de leasing constituido", "Lease constituted"), user: "M. López", color: "bg-primary" },
                { date: "15/02/2026", action: pick("Primera cuota cobrada — $4,250", "First payment — $4,250"), user: "Sistema", color: "bg-amber-500" },
              ].map((entry, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 group">
                  <div className={`w-2.5 h-2.5 rounded-full ${entry.color} mt-1.5 shrink-0 shadow-sm`} />
                  <div className="flex-1 rounded-xl border bg-card p-2.5 group-hover:bg-muted/30 transition-colors">
                    <p className="text-[11px] font-bold text-foreground">{entry.action}</p>
                    <p className="text-[10px] text-muted-foreground">{entry.date} — {entry.user}</p>
                  </div>
                </motion.div>
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
  return (
    <div className="rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-card via-card to-primary/[0.02] p-5 shadow-lg">
      {type === "disbursement" && <DisbursementDemo />}
      {type === "schedule" && <ScheduleDemo />}
      {type === "leaseback" && <LeasebackDemo />}
      {type === "surcharge" && <SurchargeDemo />}
      {type === "asset-card" && <AssetCardDemo />}
    </div>
  );
};

export default InteractiveFunctionalDemo;
