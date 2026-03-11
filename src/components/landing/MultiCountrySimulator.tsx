import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Plus, Trash2, Monitor, Cloud, Database, Layout, ArrowDown, Shield, CheckCircle, Zap } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface Country {
  id: number;
  name: string;
  currency: string;
  flag: string;
  isolated: boolean;
}

const defaultCountries: Country[] = [
  { id: 1, name: "Honduras", currency: "HNL", flag: "🇭🇳", isolated: false },
  { id: 2, name: "El Salvador", currency: "USD", flag: "🇸🇻", isolated: false },
  { id: 3, name: "Guatemala", currency: "GTQ", flag: "🇬🇹", isolated: false },
  { id: 4, name: "Costa Rica", currency: "CRC", flag: "🇨🇷", isolated: true },
  { id: 5, name: "Nicaragua", currency: "NIO", flag: "🇳🇮", isolated: false },
  { id: 6, name: "Jamaica", currency: "JMD", flag: "🇯🇲", isolated: false },
  { id: 7, name: "Trinidad y Tobago", currency: "TTD", flag: "🇹🇹", isolated: false },
  { id: 8, name: "Guyana", currency: "GYD", flag: "🇬🇾", isolated: false },
  { id: 9, name: "Ecuador", currency: "USD", flag: "🇪🇨", isolated: true },
];

const MultiCountrySimulator = () => {
  const { lang } = useI18n();
  const [countries, setCountries] = useState<Country[]>(defaultCountries);
  const [newName, setNewName] = useState("");
  const [newCurrency, setNewCurrency] = useState("");

  const shared = countries.filter((c) => !c.isolated);
  const dedicated = countries.filter((c) => c.isolated);

  const toggleIsolation = (id: number) => {
    setCountries(countries.map((c) => (c.id === id ? { ...c, isolated: !c.isolated } : c)));
  };

  const addCountry = () => {
    if (!newName || !newCurrency) return;
    setCountries([...countries, { id: Date.now(), name: newName, currency: newCurrency.toUpperCase(), flag: "🏳️", isolated: false }]);
    setNewName("");
    setNewCurrency("");
  };

  const removeCountry = (id: number) => setCountries(countries.filter((c) => c.id !== id));

  const t = {
    shared: lang === "en" ? "Shared Instance (Multi-Tenant)" : lang === "fr" ? "Instance Partagée (Multi-Tenant)" : "Instancia Compartida (Multi-Tenant)",
    dedicated: lang === "en" ? "Dedicated Instances" : lang === "fr" ? "Instances Dédiées" : "Instancias Dedicadas",
    clickToggle: lang === "en" ? "Click a country to toggle isolation" : lang === "fr" ? "Cliquez sur un pays pour basculer l'isolation" : "Haz clic en un país para cambiar su aislamiento",
    add: lang === "en" ? "Add country:" : lang === "fr" ? "Ajouter pays :" : "Agregar país:",
    name: lang === "en" ? "Name" : lang === "fr" ? "Nom" : "Nombre",
    currency: lang === "en" ? "Currency" : lang === "fr" ? "Devise" : "Moneda",
    countries: lang === "en" ? "countries" : lang === "fr" ? "pays" : "países",
    country: lang === "en" ? "country" : lang === "fr" ? "pays" : "país",
    noCountries: lang === "en" ? "No countries in this mode" : lang === "fr" ? "Aucun pays dans ce mode" : "Sin países en este modo",
    devQaProd: lang === "en" ? "SAF+ Dev / QA / Production Separation" : lang === "fr" ? "Séparation SAF+ Dev / QA / Production" : "Separación SAF+ Desarrollo y Producción",
    dev: lang === "en" ? "Development Instance" : lang === "fr" ? "Instance de Développement" : "Instancia de Desarrollo",
    qa: lang === "en" ? "QA Instance" : lang === "fr" ? "Instance QA" : "Instancia QA",
    prod: lang === "en" ? "Production Instance" : lang === "fr" ? "Instance de Production" : "Instancia de Producción",
    gateway: "Gateway",
    securityTitle: lang === "en" ? "Enhanced Security & Stability by Separating Instances" : lang === "fr" ? "Sécurité et Stabilité Améliorées par Séparation" : "Seguridad Mejorada & Estabilidad al Separar Instancias",
    independence: lang === "en" ? "Independence" : lang === "fr" ? "Indépendance" : "Independencia",
    independenceDesc: lang === "en" ? "Parallel work without interference between development, testing and production." : lang === "fr" ? "Travail parallèle sans interférence entre développement, tests et production." : "Permite trabajo paralelo sin interferencia o riesgo entre desarrollo, pruebas y producción.",
    certification: lang === "en" ? "Certification" : lang === "fr" ? "Certification" : "Certificación",
    certificationDesc: lang === "en" ? "Exhaustive validation of each new version using separate QA resources." : lang === "fr" ? "Validation exhaustive de chaque nouvelle version avec ressources QA séparées." : "Asegura validación exhaustiva de cada nueva versión usando recursos QA separados.",
    stability: lang === "en" ? "Stability" : lang === "fr" ? "Stabilité" : "Estabilidad",
    stabilityDesc: lang === "en" ? "Reduces risk and improves stability by isolating production from untested changes." : lang === "fr" ? "Réduit les risques et améliore la stabilité en isolant la production des modifications non testées." : "Reduce riesgos y mejora la estabilidad al aislar producción de cambios no probados.",
    instanceStrategy: lang === "en" ? "Instance Separation Strategy" : lang === "fr" ? "Stratégie de Séparation d'Instances" : "Estrategia de Separación de Instancias",
    byCountryCompany: lang === "en" ? "by Country and Company" : lang === "fr" ? "par Pays et Entreprise" : "por País y Empresa",
    secureEnv: lang === "en" ? "Independent & Secure Environment for Each Instance" : lang === "fr" ? "Environnement Indépendant et Sécurisé pour Chaque Instance" : "Entorno Independiente y Seguro para Cada Instancia",
  };

  return (
    <div className="rounded-2xl border bg-card p-5 md:p-6 space-y-6">

      {/* ── Sección 1: Separación Dev / QA / Producción ── */}
      <div className="rounded-xl border bg-muted/20 p-5 space-y-4">
        <h4 className="text-sm font-bold text-foreground text-center">{t.devQaProd}</h4>

        {/* 3 Instancias */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t.dev, color: "border-green-500/40 bg-green-500/10", iconColor: "text-green-600" },
            { label: t.qa, color: "border-amber-500/40 bg-amber-500/10", iconColor: "text-amber-600" },
            { label: t.prod, color: "border-red-500/40 bg-red-500/10", iconColor: "text-red-600" },
          ].map((inst) => (
            <div key={inst.label} className={`rounded-xl border-2 ${inst.color} p-3 text-center`}>
              <Server className={`w-6 h-6 mx-auto mb-1 ${inst.iconColor}`} />
              <p className="text-[11px] font-bold text-foreground">{inst.label}</p>
            </div>
          ))}
        </div>

        {/* Flecha → Gateway */}
        <div className="flex justify-center">
          <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
        </div>

        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-destructive text-destructive-foreground font-bold text-sm shadow-md">
            <Shield className="w-4 h-4" />
            {t.gateway}
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
        </div>

        {/* Canales */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Monitor, label: "Web" },
            { icon: Cloud, label: "Cloud" },
            { icon: Layout, label: "Desktop" },
            { icon: Database, label: "Database" },
          ].map((ch) => (
            <div key={ch.label} className="rounded-lg border bg-background p-2.5 text-center">
              <ch.icon className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-[10px] font-medium text-foreground">{ch.label}</p>
            </div>
          ))}
        </div>

        {/* Beneficios de separación */}
        <p className="text-xs font-bold text-foreground text-center pt-2">{t.securityTitle}</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Zap, label: t.independence, desc: t.independenceDesc },
            { icon: CheckCircle, label: t.certification, desc: t.certificationDesc },
            { icon: Shield, label: t.stability, desc: t.stabilityDesc },
          ].map((b) => (
            <div key={b.label} className="rounded-xl border bg-background p-3 text-center space-y-1">
              <b.icon className="w-5 h-5 mx-auto text-muted-foreground" />
              <p className="text-[11px] font-bold text-foreground uppercase">{b.label}</p>
              <p className="text-[10px] text-muted-foreground leading-snug">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sección 2: Estrategia de Separación por País y Empresa ── */}
      <div className="rounded-xl border bg-muted/20 p-5 space-y-4">
        <div className="text-center">
          <h4 className="text-sm font-bold text-foreground">{t.instanceStrategy}</h4>
          <p className="text-xs text-muted-foreground">{t.byCountryCompany}</p>
        </div>

        <p className="text-xs text-center text-muted-foreground italic">{t.clickToggle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shared Instance */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground">{t.shared}</span>
              <span className="ml-auto text-xs text-muted-foreground">{shared.length} {shared.length === 1 ? t.country : t.countries}</span>
            </div>
            <AnimatePresence mode="popLayout">
              {shared.length === 0 && (
                <p className="text-xs text-muted-foreground italic text-center py-3">{t.noCountries}</p>
              )}
              {shared.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => toggleIsolation(c.id)}
                >
                  <span className="text-lg shrink-0">{c.flag}</span>
                  <span className="text-sm font-medium text-foreground flex-1">{c.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{c.currency}</span>
                  <button onClick={(e) => { e.stopPropagation(); removeCountry(c.id); }} className="text-muted-foreground/30 hover:text-destructive transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dedicated */}
          <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-bold text-foreground">{t.dedicated}</span>
              <span className="ml-auto text-xs text-muted-foreground">{dedicated.length} {dedicated.length === 1 ? t.country : t.countries}</span>
            </div>
            <AnimatePresence mode="popLayout">
              {dedicated.length === 0 && (
                <p className="text-xs text-muted-foreground italic text-center py-3">{t.noCountries}</p>
              )}
              {dedicated.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => toggleIsolation(c.id)}
                >
                  <span className="text-lg shrink-0">{c.flag}</span>
                  <span className="text-sm font-medium text-foreground flex-1">{c.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{c.currency}</span>
                  <button onClick={(e) => { e.stopPropagation(); removeCountry(c.id); }} className="text-muted-foreground/30 hover:text-destructive transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Flecha → Gateway */}
        <div className="flex justify-center">
          <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
        </div>
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-destructive text-destructive-foreground font-bold text-sm shadow-md">
            <Shield className="w-4 h-4" />
            {t.gateway}
          </div>
        </div>
        <div className="flex justify-center">
          <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
        </div>

        {/* Regiones recomendadas por SYSDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              name: lang === "en" ? "Region 1 — Central America North" : lang === "fr" ? "Région 1 — Amérique Centrale Nord" : "Región 1 — Centroamérica Norte",
              countries: [
                { flag: "🇭🇳", name: "Honduras", currency: "HNL", pilot: true },
                { flag: "🇳🇮", name: "Nicaragua", currency: "NIO", pilot: false },
                { flag: "🇬🇹", name: "Guatemala", currency: "GTQ", pilot: false },
              ],
            },
            {
              name: lang === "en" ? "Region 2 — Central America South" : lang === "fr" ? "Région 2 — Amérique Centrale Sud" : "Región 2 — Centroamérica Sur",
              countries: [
                { flag: "🇸🇻", name: "El Salvador", currency: "USD", pilot: false },
                { flag: "🇨🇷", name: "Costa Rica", currency: "CRC", pilot: false },
              ],
            },
            {
              name: lang === "en" ? "Region 3 — Caribbean + Ecuador" : lang === "fr" ? "Région 3 — Caraïbes + Équateur" : "Región 3 — Caribe + Ecuador",
              countries: [
                { flag: "🇯🇲", name: "Jamaica", currency: "JMD", pilot: false },
                { flag: "🇹🇹", name: "Trinidad y Tobago", currency: "TTD", pilot: false },
                { flag: "🇬🇾", name: "Guyana", currency: "GYD", pilot: false },
                { flag: "🇪🇨", name: "Ecuador", currency: "USD", pilot: false },
              ],
            },
          ].map((region) => (
            <div key={region.name} className="rounded-xl border-2 border-primary/20 bg-background p-3 space-y-2">
              <div className="flex items-center gap-2 justify-center">
                <Server className="w-4 h-4 text-primary" />
                <p className="text-[11px] font-bold text-foreground text-center">{region.name}</p>
              </div>
              <div className="space-y-1.5">
                {region.countries.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/30">
                    <span className="text-sm">{c.flag}</span>
                    <span className="text-[11px] font-medium text-foreground flex-1">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{c.currency}</span>
                    {c.pilot && (
                      <span className="text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-bold">PILOT</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs font-bold text-primary text-center pt-1">
          {lang === "en" ? "✅ Recommended by SYSDE: 3 Instances" : lang === "fr" ? "✅ Recommandé par SYSDE : 3 Instances" : "✅ Recomendado por SYSDE: 3 Instancias"}
        </p>
      </div>

      {/* Add country */}
      <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
        <p className="text-xs font-bold text-foreground">{t.add}</p>
        <div className="flex flex-wrap items-center gap-2">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.name} className="flex-1 min-w-[100px] px-3 py-1.5 text-xs border rounded-lg bg-background outline-none focus:ring-1 ring-primary" />
          <input value={newCurrency} onChange={(e) => setNewCurrency(e.target.value)} placeholder={t.currency} className="w-16 px-3 py-1.5 text-xs border rounded-lg bg-background outline-none focus:ring-1 ring-primary" onKeyDown={(e) => e.key === "Enter" && addCountry()} />
          <button onClick={addCountry} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiCountrySimulator;
