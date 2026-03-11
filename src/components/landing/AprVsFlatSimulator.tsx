import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const AprVsFlatSimulator = () => {
  const { lang } = useI18n();
  const [principal, setPrincipal] = useState(10000);
  const [term, setTerm] = useState(12);
  const [rate, setRate] = useState(18);

  // APR (Saldo Decreciente / Declining Balance) — French amortization
  const monthlyRate = rate / 100 / 12;
  const aprPayment = monthlyRate > 0
    ? (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term))
    : principal / term;
  const aprTotal = aprPayment * term;
  const aprInterest = aprTotal - principal;

  // Flat (Tasa Plana)
  const flatInterest = principal * (rate / 100) * (term / 12);
  const flatPayment = (principal + flatInterest) / term;
  const flatTotal = principal + flatInterest;

  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const t = {
    principal: lang === "en" ? "Loan Amount:" : lang === "fr" ? "Montant du Prêt :" : "Monto del Préstamo:",
    term: lang === "en" ? "Term (months):" : lang === "fr" ? "Durée (mois) :" : "Plazo (meses):",
    rate: lang === "en" ? "Annual Rate (%):" : lang === "fr" ? "Taux Annuel (%) :" : "Tasa Anual (%):",
    apr: lang === "en" ? "Declining Balance (APR)" : lang === "fr" ? "Solde Dégressif (APR)" : "Saldo Decreciente (APR)",
    flat: lang === "en" ? "Flat Rate" : lang === "fr" ? "Taux Fixe" : "Tasa Plana",
    monthly: lang === "en" ? "Monthly Payment" : lang === "fr" ? "Mensualité" : "Cuota Mensual",
    totalInt: lang === "en" ? "Total Interest" : lang === "fr" ? "Intérêts Totaux" : "Interés Total",
    totalPay: lang === "en" ? "Total Paid" : lang === "fr" ? "Total Payé" : "Total a Pagar",
    savings: lang === "en" ? "Client saves with APR" : lang === "fr" ? "Le client économise avec APR" : "El cliente ahorra con APR",
    sameInstance: lang === "en" ? "Both methods coexist in the same instance for the same client" : lang === "fr" ? "Les deux méthodes coexistent dans la même instance pour le même client" : "Ambos métodos conviven en la misma instancia para el mismo cliente",
  };

  const diff = flatTotal - aprTotal;

  return (
    <div className="rounded-2xl border bg-card p-5 md:p-6 space-y-5">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: t.principal, value: principal, set: setPrincipal, min: 1000, max: 100000, step: 500 },
          { label: t.term, value: term, set: setTerm, min: 1, max: 60, step: 1 },
          { label: t.rate, value: rate, set: setRate, min: 1, max: 50, step: 0.5 },
        ].map((input) => (
          <div key={input.label} className="space-y-1">
            <label className="text-xs font-semibold text-foreground">{input.label}</label>
            <input
              type="range"
              min={input.min}
              max={input.max}
              step={input.step}
              value={input.value}
              onChange={(e) => input.set(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-center text-sm font-bold text-primary">
              {input.label.includes("Tasa") || input.label.includes("Rate") || input.label.includes("Taux") ? `${input.value}%` : input.label.includes("Plazo") || input.label.includes("Term") || input.label.includes("Durée") ? input.value : fmt(input.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: t.apr, payment: aprPayment, interest: aprInterest, total: aprTotal, color: "primary" },
          { title: t.flat, payment: flatPayment, interest: flatInterest, total: flatTotal, color: "amber-500" },
        ].map((m) => (
          <div key={m.title} className={`rounded-xl border-2 p-4 space-y-3 ${m.color === "primary" ? "border-primary/30 bg-primary/5" : "border-amber-500/30 bg-amber-500/5"}`}>
            <p className={`text-sm font-bold ${m.color === "primary" ? "text-primary" : "text-amber-600 dark:text-amber-400"}`}>{m.title}</p>
            {[
              { label: t.monthly, value: fmt(m.payment) },
              { label: t.totalInt, value: fmt(m.interest) },
              { label: t.totalPay, value: fmt(m.total) },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{row.label}</span>
                <motion.span key={row.value} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="font-bold text-foreground">{row.value}</motion.span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Savings */}
      {diff > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-center"
        >
          <span className="text-xs text-green-600 dark:text-green-400 font-bold">💰 {t.savings}: {fmt(diff)}</span>
        </motion.div>
      )}

      <p className="text-center text-xs text-muted-foreground italic">{t.sameInstance}</p>
    </div>
  );
};

export default AprVsFlatSimulator;
