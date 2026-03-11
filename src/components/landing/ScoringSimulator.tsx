import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { TrendingUp, Target, Percent } from "lucide-react";

interface ClientProfile {
  paymentHistory: number; // 0-100
  avgBalance: number; // 0-100
  tenure: number; // months
  productsCount: number;
}

const ScoringSimulator = () => {
  const { lang } = useI18n();
  const [profile, setProfile] = useState<ClientProfile>({
    paymentHistory: 85,
    avgBalance: 60,
    tenure: 24,
    productsCount: 3,
  });

  // CMM (Capacidad de Manejo Mensual)
  const cmm = Math.round(
    profile.paymentHistory * 0.4 +
    profile.avgBalance * 0.25 +
    Math.min(profile.tenure / 60, 1) * 100 * 0.2 +
    Math.min(profile.productsCount / 5, 1) * 100 * 0.15
  );

  // LEM (Límite Estimado Máximo)
  const lem = Math.round(cmm * 50 + profile.tenure * 10);

  // Scoring tier
  const tier = cmm >= 80 ? "A" : cmm >= 60 ? "B" : cmm >= 40 ? "C" : "D";
  const tierColors: Record<string, string> = {
    A: "text-green-500 border-green-500/30 bg-green-500/10",
    B: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    C: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    D: "text-red-500 border-red-500/30 bg-red-500/10",
  };

  // Interest rate by tier
  const rateByTier: Record<string, number> = { A: 12, B: 18, C: 24, D: 36 };
  const assignedRate = rateByTier[tier];

  // Campaign eligibility
  const eligibleCampaign = cmm >= 60;
  const eligibleLoyalty = cmm >= 70 && profile.tenure >= 12;

  const t = {
    paymentHistory: lang === "en" ? "Payment History" : lang === "fr" ? "Historique de Paiement" : "Historial de Pago",
    avgBalance: lang === "en" ? "Avg. Balance Usage" : lang === "fr" ? "Utilisation Moy. du Solde" : "Uso Prom. del Saldo",
    tenure: lang === "en" ? "Tenure (months)" : lang === "fr" ? "Ancienneté (mois)" : "Antigüedad (meses)",
    products: lang === "en" ? "Products" : lang === "fr" ? "Produits" : "Productos",
    cmmScore: "CMM Score",
    lemLimit: lang === "en" ? "LEM (Max Estimated Limit)" : lang === "fr" ? "LEM (Limite Estimée Max)" : "LEM (Límite Estimado Máximo)",
    tier: lang === "en" ? "Tier" : lang === "fr" ? "Segment" : "Segmento",
    assignedRate: lang === "en" ? "Assigned Rate" : lang === "fr" ? "Taux Assigné" : "Tasa Asignada",
    campaigns: lang === "en" ? "Eligible for Campaigns" : lang === "fr" ? "Éligible aux Campagnes" : "Elegible para Campañas",
    loyalty: lang === "en" ? "Eligible for Loyalty" : lang === "fr" ? "Éligible Fidélisation" : "Elegible para Fidelización",
    collections: lang === "en" ? "Collections Priority" : lang === "fr" ? "Priorité Recouvrement" : "Prioridad Cobranza",
    yes: lang === "en" ? "Yes" : lang === "fr" ? "Oui" : "Sí",
    no: lang === "en" ? "No" : lang === "fr" ? "Non" : "No",
    low: lang === "en" ? "Low" : lang === "fr" ? "Basse" : "Baja",
    medium: lang === "en" ? "Medium" : lang === "fr" ? "Moyenne" : "Media",
    high: lang === "en" ? "High" : lang === "fr" ? "Haute" : "Alta",
    footer: lang === "en" ? "Scores dynamically determine rates, campaigns, and collection strategies" : lang === "fr" ? "Les scores déterminent dynamiquement les taux, campagnes et stratégies de recouvrement" : "Los puntajes determinan dinámicamente tasas, campañas y estrategias de cobranza",
  };

  const collectionsPriority = tier === "D" ? t.high : tier === "C" ? t.medium : t.low;

  return (
    <div className="rounded-2xl border bg-card p-5 md:p-6 space-y-5">
      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: t.paymentHistory, key: "paymentHistory" as const, value: profile.paymentHistory, min: 0, max: 100, step: 5, display: `${profile.paymentHistory}%` },
          { label: t.avgBalance, key: "avgBalance" as const, value: profile.avgBalance, min: 0, max: 100, step: 5, display: `${profile.avgBalance}%` },
          { label: t.tenure, key: "tenure" as const, value: profile.tenure, min: 1, max: 120, step: 1, display: `${profile.tenure}` },
          { label: t.products, key: "productsCount" as const, value: profile.productsCount, min: 1, max: 10, step: 1, display: `${profile.productsCount}` },
        ].map((s) => (
          <div key={s.key} className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-foreground">{s.label}</label>
              <span className="text-xs font-bold text-primary">{s.display}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={(e) => setProfile({ ...profile, [s.key]: Number(e.target.value) })} className="w-full accent-primary" />
          </div>
        ))}
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-3 text-center">
          <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-[10px] text-muted-foreground uppercase">{t.cmmScore}</p>
          <motion.p key={cmm} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-2xl font-bold text-primary">{cmm}</motion.p>
        </div>
        <div className="rounded-xl border bg-muted/30 p-3 text-center">
          <Target className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
          <p className="text-[10px] text-muted-foreground uppercase">{t.lemLimit}</p>
          <motion.p key={lem} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-xl font-bold text-foreground">${lem.toLocaleString()}</motion.p>
        </div>
        <div className={`rounded-xl border-2 p-3 text-center ${tierColors[tier]}`}>
          <p className="text-[10px] text-muted-foreground uppercase">{t.tier}</p>
          <motion.p key={tier} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-3xl font-black">{tier}</motion.p>
        </div>
        <div className="rounded-xl border bg-muted/30 p-3 text-center">
          <Percent className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
          <p className="text-[10px] text-muted-foreground uppercase">{t.assignedRate}</p>
          <motion.p key={assignedRate} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-2xl font-bold text-foreground">{assignedRate}%</motion.p>
        </div>
      </div>

      {/* Eligibility */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t.campaigns, eligible: eligibleCampaign },
          { label: t.loyalty, eligible: eligibleLoyalty },
          { label: t.collections, eligible: null, value: collectionsPriority },
        ].map((e) => (
          <div key={e.label} className="rounded-lg border p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{e.label}</p>
            {e.eligible !== null && e.eligible !== undefined ? (
              <span className={`text-sm font-bold ${e.eligible ? "text-green-500" : "text-red-500"}`}>
                {e.eligible ? `✅ ${t.yes}` : `❌ ${t.no}`}
              </span>
            ) : (
              <span className={`text-sm font-bold ${e.value === t.high ? "text-red-500" : e.value === t.medium ? "text-amber-500" : "text-green-500"}`}>
                {e.value}
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground italic">{t.footer}</p>
    </div>
  );
};

export default ScoringSimulator;
