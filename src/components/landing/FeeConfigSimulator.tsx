import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, HeartPulse, Award, Plus, Trash2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

type FeeType = "seguro" | "asistencia" | "garantia";

interface Fee {
  id: number;
  type: FeeType;
  name: string;
  amount: number;
  frequency: "mensual" | "unica";
}

const defaultFees: Fee[] = [
  { id: 1, type: "seguro", name: "Seguro de Vida", amount: 15.0, frequency: "mensual" },
  { id: 2, type: "asistencia", name: "Asistencia Vial", amount: 8.5, frequency: "mensual" },
  { id: 3, type: "garantia", name: "Garantía Extendida", amount: 120.0, frequency: "unica" },
];

const icons: Record<FeeType, React.ElementType> = {
  seguro: Shield,
  asistencia: HeartPulse,
  garantia: Award,
};

const colors: Record<FeeType, string> = {
  seguro: "text-blue-500",
  asistencia: "text-green-500",
  garantia: "text-purple-500",
};

const FeeConfigSimulator = () => {
  const { lang } = useI18n();
  const [fees, setFees] = useState<Fee[]>(defaultFees);
  const [newType, setNewType] = useState<FeeType>("seguro");
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newFreq, setNewFreq] = useState<"mensual" | "unica">("mensual");
  const [loanTerm] = useState(12);

  const totalMonthly = fees.filter((f) => f.frequency === "mensual").reduce((s, f) => s + f.amount, 0);
  const totalOneTime = fees.filter((f) => f.frequency === "unica").reduce((s, f) => s + f.amount, 0);
  const totalLife = totalMonthly * loanTerm + totalOneTime;

  const addFee = () => {
    const amt = parseFloat(newAmount);
    if (!newName || isNaN(amt) || amt <= 0) return;
    setFees([...fees, { id: Date.now(), type: newType, name: newName, amount: amt, frequency: newFreq }]);
    setNewName("");
    setNewAmount("");
  };

  const removeFee = (id: number) => setFees(fees.filter((f) => f.id !== id));

  const t = {
    insurance: lang === "en" ? "Insurance" : lang === "fr" ? "Assurance" : "Seguro",
    assistance: lang === "en" ? "Assistance" : lang === "fr" ? "Assistance" : "Asistencia",
    warranty: lang === "en" ? "Warranty" : lang === "fr" ? "Garantie" : "Garantía",
    monthly: lang === "en" ? "Monthly" : lang === "fr" ? "Mensuel" : "Mensual",
    oneTime: lang === "en" ? "One-time" : lang === "fr" ? "Unique" : "Única",
    add: lang === "en" ? "Add fee:" : lang === "fr" ? "Ajouter frais :" : "Agregar cargo:",
    name: lang === "en" ? "Name" : lang === "fr" ? "Nom" : "Nombre",
    amount: lang === "en" ? "Amount" : lang === "fr" ? "Montant" : "Monto",
    monthlyTotal: lang === "en" ? "Monthly Fees" : lang === "fr" ? "Frais Mensuels" : "Cargos Mensuales",
    oneTimeTotal: lang === "en" ? "One-time Fees" : lang === "fr" ? "Frais Uniques" : "Cargos Únicos",
    lifeTotal: lang === "en" ? `Total over ${loanTerm} months` : lang === "fr" ? `Total sur ${loanTerm} mois` : `Total en ${loanTerm} meses`,
    footer: lang === "en" ? "Fees are independent components — no interest is applied on them" : lang === "fr" ? "Les frais sont des composants indépendants — aucun intérêt n'est appliqué" : "Los cargos son componentes independientes — no se les aplica interés",
  };

  const typeLabels: Record<FeeType, string> = { seguro: t.insurance, asistencia: t.assistance, garantia: t.warranty };
  const freqLabels = { mensual: t.monthly, unica: t.oneTime };
  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="rounded-2xl border bg-card p-5 md:p-6 space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t.monthlyTotal, value: fmt(totalMonthly), color: "text-primary" },
          { label: t.oneTimeTotal, value: fmt(totalOneTime), color: "text-amber-500" },
          { label: t.lifeTotal, value: fmt(totalLife), color: "text-foreground" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <motion.p key={s.value} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className={`text-lg font-bold ${s.color}`}>{s.value}</motion.p>
          </div>
        ))}
      </div>

      {/* Fee List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {fees.map((f) => {
            const Icon = icons[f.type];
            return (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-background"
              >
                <Icon className={`w-5 h-5 shrink-0 ${colors[f.type]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground">{typeLabels[f.type]} · {freqLabels[f.frequency]}</p>
                </div>
                <span className="text-sm font-bold text-foreground">{fmt(f.amount)}</span>
                <button onClick={() => removeFee(f.id)} className="text-muted-foreground/30 hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add Fee */}
      <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
        <p className="text-xs font-bold text-foreground">{t.add}</p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border">
            {(["seguro", "asistencia", "garantia"] as FeeType[]).map((ft) => (
              <button
                key={ft}
                onClick={() => setNewType(ft)}
                className={`px-2.5 py-1.5 text-[10px] font-semibold transition-colors ${newType === ft ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}
              >
                {typeLabels[ft]}
              </button>
            ))}
          </div>
          <div className="flex rounded-lg overflow-hidden border">
            {(["mensual", "unica"] as const).map((fr) => (
              <button
                key={fr}
                onClick={() => setNewFreq(fr)}
                className={`px-2.5 py-1.5 text-[10px] font-semibold transition-colors ${newFreq === fr ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}
              >
                {freqLabels[fr]}
              </button>
            ))}
          </div>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.name} className="flex-1 min-w-[100px] px-3 py-1.5 text-xs border rounded-lg bg-background outline-none focus:ring-1 ring-primary" />
          <input value={newAmount} onChange={(e) => setNewAmount(e.target.value)} placeholder={t.amount} type="number" className="w-20 px-3 py-1.5 text-xs border rounded-lg bg-background outline-none focus:ring-1 ring-primary" onKeyDown={(e) => e.key === "Enter" && addFee()} />
          <button onClick={addFee} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 active:scale-95">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground italic">{t.footer}</p>
    </div>
  );
};

export default FeeConfigSimulator;
