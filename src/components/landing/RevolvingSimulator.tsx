import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, DollarSign, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface Movement {
  id: number;
  type: "compra" | "pago";
  label: string;
  amount: number;
}

const defaultMovements: Movement[] = [
  { id: 1, type: "compra", label: "Compra TV", amount: 600 },
  { id: 2, type: "pago", label: "Pago cuota #1 (capital)", amount: 100 },
  { id: 3, type: "compra", label: "Compra Refrigeradora", amount: 800 },
  { id: 4, type: "pago", label: "Pago cuota #2 (capital)", amount: 150 },
];

const defaultMovements_en: Movement[] = [
  { id: 1, type: "compra", label: "TV Purchase", amount: 600 },
  { id: 2, type: "pago", label: "Payment #1 (principal)", amount: 100 },
  { id: 3, type: "compra", label: "Refrigerator Purchase", amount: 800 },
  { id: 4, type: "pago", label: "Payment #2 (principal)", amount: 150 },
];

const defaultMovements_fr: Movement[] = [
  { id: 1, type: "compra", label: "Achat TV", amount: 600 },
  { id: 2, type: "pago", label: "Paiement #1 (capital)", amount: 100 },
  { id: 3, type: "compra", label: "Achat Réfrigérateur", amount: 800 },
  { id: 4, type: "pago", label: "Paiement #2 (capital)", amount: 150 },
];

const RevolvingSimulator = () => {
  const { lang } = useI18n();

  const initialMovements = lang === "en" ? defaultMovements_en : lang === "fr" ? defaultMovements_fr : defaultMovements;

  const [cupo, setCupo] = useState(1500);
  const [movements, setMovements] = useState<Movement[]>(initialMovements);
  const [newType, setNewType] = useState<"compra" | "pago">("compra");
  const [newLabel, setNewLabel] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const getRunningDisponible = () => {
    let disp = cupo;
    return movements.map((m) => {
      if (m.type === "compra") disp -= m.amount;
      else disp += m.amount;
      return disp;
    });
  };

  const disponibles = getRunningDisponible();
  const finalDisp = disponibles.length > 0 ? disponibles[disponibles.length - 1] : cupo;
  const utilizado = cupo - finalDisp;
  const utilizacion = cupo > 0 ? Math.min(Math.round((utilizado / cupo) * 100), 100) : 0;

  const addMovement = () => {
    const amt = parseFloat(newAmount);
    if (!newLabel || isNaN(amt) || amt <= 0) return;
    setMovements([...movements, { id: Date.now(), type: newType, label: newLabel, amount: amt }]);
    setNewLabel("");
    setNewAmount("");
  };

  const removeMovement = (id: number) => {
    setMovements(movements.filter((m) => m.id !== id));
  };

  const t = {
    cupoAutorizado: lang === "en" ? "Authorized Limit:" : lang === "fr" ? "Plafond Autorisé :" : "Cupo Autorizado:",
    utilizacion: lang === "en" ? "Limit utilization" : lang === "fr" ? "Utilisation du plafond" : "Utilización del cupo",
    disponible: lang === "en" ? "Available" : lang === "fr" ? "Disponible" : "Disponible",
    utilizado: lang === "en" ? "Used" : lang === "fr" ? "Utilisé" : "Utilizado",
    cupoInicial: lang === "en" ? "Initial authorized limit" : lang === "fr" ? "Plafond initial autorisé" : "Cupo inicial autorizado",
    disp: "Disp",
    agregar: lang === "en" ? "Add movement:" : lang === "fr" ? "Ajouter mouvement :" : "Agregar movimiento:",
    compra: lang === "en" ? "Purchase" : lang === "fr" ? "Achat" : "Compra",
    pago: lang === "en" ? "Payment" : lang === "fr" ? "Paiement" : "Pago",
    descripcion: lang === "en" ? "Description" : lang === "fr" ? "Description" : "Descripción",
    monto: lang === "en" ? "Amount" : lang === "fr" ? "Montant" : "Monto",
    footer:
      lang === "en"
        ? "No new application · No contract signing · No manual approval"
        : lang === "fr"
        ? "Sans nouveau dossier · Sans signature de contrat · Sans approbation manuelle"
        : "Sin expediente nuevo · Sin firma de contratos · Sin aprobación manual",
  };

  return (
    <div className="rounded-2xl border bg-card p-5 md:p-6 space-y-5">
      {/* Cupo input */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm font-semibold text-foreground">{t.cupoAutorizado}</span>
        <div className="flex items-center gap-1 border rounded-lg px-3 py-2 bg-background">
          <span className="text-sm font-bold text-primary">$</span>
          <input
            type="number"
            value={cupo}
            onChange={(e) => setCupo(Number(e.target.value) || 0)}
            className="w-24 text-sm font-bold text-foreground bg-transparent outline-none text-right"
          />
        </div>
      </div>

      {/* Utilization bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{t.utilizacion}</span>
          <motion.span
            key={utilizacion}
            initial={{ scale: 1.4, color: "hsl(var(--primary))" }}
            animate={{ scale: 1, color: "hsl(var(--foreground))" }}
            className="font-bold"
          >
            {utilizacion}%
          </motion.span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                utilizacion > 80
                  ? "linear-gradient(90deg, hsl(var(--primary)), hsl(0 84% 40%))"
                  : "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))",
            }}
            initial={false}
            animate={{ width: `${Math.min(Math.max(utilizacion, 0), 100)}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">
            {t.disponible}:{" "}
            <motion.span
              key={finalDisp}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-bold text-foreground inline-block"
            >
              ${finalDisp.toLocaleString()}
            </motion.span>
          </span>
          <span className="text-muted-foreground">
            {t.utilizado}:{" "}
            <span className="font-bold text-foreground">${utilizado.toLocaleString()}</span>
          </span>
        </div>
      </div>

      {/* Movements list */}
      <div className="space-y-2">
        {/* Initial cupo row */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-background"
        >
          <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" />
          <span className="text-sm text-foreground flex-1">{t.cupoInicial}</span>
          <span className="text-sm font-bold text-primary">${cupo.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
            {t.disp}: <b>${cupo.toLocaleString()}</b>
          </span>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {movements.map((m, i) => {
            const disp = disponibles[i];
            const isCompra = m.type === "compra";
            return (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-background hover:shadow-sm transition-shadow">
                  {isCompra ? (
                    <ShoppingCart className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <DollarSign className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                  <span className="text-sm text-foreground flex-1 truncate">{m.label}</span>
                  <motion.span
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className={`text-sm font-bold shrink-0 ${isCompra ? "text-destructive" : "text-green-600 dark:text-green-400"}`}
                  >
                    {isCompra ? "−" : "+"}${m.amount.toLocaleString()}
                  </motion.span>
                  <span className="text-xs text-muted-foreground ml-2 shrink-0 hidden sm:inline">
                    {t.disp}: <b>${disp.toLocaleString()}</b>
                  </span>
                  <button
                    onClick={() => removeMovement(m.id)}
                    className="text-muted-foreground/30 hover:text-destructive transition-colors ml-1 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add movement form */}
      <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
        <p className="text-xs font-bold text-foreground">{t.agregar}</p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border">
            <button
              onClick={() => setNewType("compra")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                newType === "compra" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
              }`}
            >
              {t.compra}
            </button>
            <button
              onClick={() => setNewType("pago")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                newType === "pago" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
              }`}
            >
              {t.pago}
            </button>
          </div>
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder={t.descripcion}
            className="flex-1 min-w-[120px] px-3 py-1.5 text-xs border rounded-lg bg-background outline-none focus:ring-1 ring-primary transition-shadow"
          />
          <input
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder={t.monto}
            type="number"
            className="w-20 px-3 py-1.5 text-xs border rounded-lg bg-background outline-none focus:ring-1 ring-primary transition-shadow"
            onKeyDown={(e) => e.key === "Enter" && addMovement()}
          />
          <button
            onClick={addMovement}
            className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground italic">{t.footer}</p>
    </div>
  );
};

export default RevolvingSimulator;
