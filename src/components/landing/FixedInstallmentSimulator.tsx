import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const FixedInstallmentSimulator = () => {
  const { lang } = useI18n();
  const [principal, setPrincipal] = useState(5000);
  const [term, setTerm] = useState(12);
  const [rate, setRate] = useState(24);

  const monthlyRate = rate / 100 / 12;
  const payment = monthlyRate > 0
    ? (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term))
    : principal / term;

  // Generate amortization schedule
  const schedule: { month: number; payment: number; interest: number; principal: number; balance: number }[] = [];
  let balance = principal;
  for (let i = 1; i <= term; i++) {
    const interest = balance * monthlyRate;
    const princ = payment - interest;
    balance = Math.max(balance - princ, 0);
    schedule.push({ month: i, payment, interest, principal: princ, balance });
  }

  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const t = {
    amount: lang === "en" ? "Amount:" : lang === "fr" ? "Montant :" : "Monto:",
    term: lang === "en" ? "Term:" : lang === "fr" ? "Durée :" : "Plazo:",
    rate: lang === "en" ? "Rate:" : lang === "fr" ? "Taux :" : "Tasa:",
    months: lang === "en" ? "months" : lang === "fr" ? "mois" : "meses",
    fixedPayment: lang === "en" ? "Fixed Monthly Payment" : lang === "fr" ? "Mensualité Fixe" : "Cuota Fija Mensual",
    totalInterest: lang === "en" ? "Total Interest" : lang === "fr" ? "Intérêts Totaux" : "Interés Total",
    month: lang === "en" ? "Month" : lang === "fr" ? "Mois" : "Mes",
    payment: lang === "en" ? "Payment" : lang === "fr" ? "Paiement" : "Cuota",
    interest: lang === "en" ? "Interest" : lang === "fr" ? "Intérêts" : "Interés",
    principalH: lang === "en" ? "Principal" : lang === "fr" ? "Capital" : "Capital",
    balance: lang === "en" ? "Balance" : lang === "fr" ? "Solde" : "Saldo",
    footer: lang === "en" ? "French amortization: equal payments, decreasing interest, increasing principal" : lang === "fr" ? "Amortissement français : mensualités égales, intérêts décroissants, capital croissant" : "Amortización francesa: cuotas iguales, interés decreciente, capital creciente",
  };

  const showRows = schedule.length <= 12 ? schedule : [...schedule.slice(0, 3), null, ...schedule.slice(-2)];

  return (
    <div className="rounded-2xl border bg-card p-5 md:p-6 space-y-5">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: t.amount, value: principal, set: setPrincipal, min: 500, max: 50000, step: 500, display: fmt(principal) },
          { label: t.term, value: term, set: setTerm, min: 1, max: 60, step: 1, display: `${term} ${t.months}` },
          { label: t.rate, value: rate, set: setRate, min: 1, max: 50, step: 0.5, display: `${rate}%` },
        ].map((input) => (
          <div key={input.label} className="space-y-1">
            <label className="text-xs font-semibold text-foreground">{input.label}</label>
            <input type="range" min={input.min} max={input.max} step={input.step} value={input.value} onChange={(e) => input.set(Number(e.target.value))} className="w-full accent-primary" />
            <p className="text-center text-sm font-bold text-primary">{input.display}</p>
          </div>
        ))}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.fixedPayment}</p>
          <motion.p key={payment.toFixed(2)} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-2xl font-bold text-primary">{fmt(payment)}</motion.p>
        </div>
        <div className="rounded-xl border bg-muted/30 p-4 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.totalInterest}</p>
          <motion.p key={totalInterest.toFixed(2)} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-2xl font-bold text-foreground">{fmt(totalInterest)}</motion.p>
        </div>
      </div>

      {/* Mini amortization table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-primary/5 border-b">
              {[t.month, t.payment, t.interest, t.principalH, t.balance].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-bold text-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {showRows.map((row, i) =>
              row === null ? (
                <tr key="ellipsis"><td colSpan={5} className="text-center py-2 text-muted-foreground">⋮</td></tr>
              ) : (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-3 py-2 font-medium text-foreground">{row.month}</td>
                  <td className="px-3 py-2 text-muted-foreground">{fmt(row.payment)}</td>
                  <td className="px-3 py-2 text-muted-foreground">{fmt(row.interest)}</td>
                  <td className="px-3 py-2 text-muted-foreground">{fmt(row.principal)}</td>
                  <td className="px-3 py-2 font-medium text-foreground">{fmt(row.balance)}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <p className="text-center text-xs text-muted-foreground italic">{t.footer}</p>
    </div>
  );
};

export default FixedInstallmentSimulator;
