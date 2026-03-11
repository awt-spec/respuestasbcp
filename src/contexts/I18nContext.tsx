import React, { createContext, useContext, useState } from "react";

type Lang = "es" | "en" | "fr";

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.all": { es: "Todas", en: "All", fr: "Toutes" },
  "nav.sectionA": { es: "Consultas Funcionales y Demo", en: "Functional & Demo Queries", fr: "Requêtes Fonctionnelles et Démo" },
  "nav.sectionB": { es: "Consultas Técnicas", en: "Technical Queries", fr: "Requêtes Techniques" },
  "nav.sectionC": { es: "Procesamiento Batch", en: "Batch Processing", fr: "Traitement par Lots" },
  "nav.sectionG": { es: "Preguntas 25 Feb 2026", en: "Questions Feb 25, 2026", fr: "Questions 25 Fév 2026" },

  // Hero
  "hero.badge": { es: "CONFIDENCIAL — Versión 1.0 | 25 febrero 2026", en: "CONFIDENTIAL — Version 1.0 | Feb 25, 2026", fr: "CONFIDENTIEL — Version 1.0 | 25 février 2026" },
  "hero.title1": { es: "Respuestas a Consultas", en: "Responses to Queries", fr: "Réponses aux Requêtes" },
  "hero.title2": { es: "Demo RFP Core Credit System", en: "Demo RFP Core Credit System", fr: "Démo RFP Système de Crédit Core" },
  "hero.subtitle": { es: "Grupo Unicomer — BIG 9", en: "Unicomer Group — BIG 9", fr: "Groupe Unicomer — BIG 9" },
  "hero.prepared": { es: "Preparado por SYSDE S.A. | Referencia: Consultas Post-Demo RFP Core Créditos", en: "Prepared by SYSDE S.A. | Ref: Post-Demo RFP Core Credits Queries", fr: "Préparé par SYSDE S.A. | Réf : Requêtes Post-Démo RFP Crédits Core" },
  "hero.answered": { es: "Consultas Respondidas", en: "Queries Answered", fr: "Requêtes Répondues" },
  "hero.sections": { es: "Secciones", en: "Sections", fr: "Sections" },

  // Dashboard
  "dash.answered": { es: "consultas respondidas", en: "queries answered", fr: "requêtes répondues" },
  "dash.of": { es: "de", en: "of", fr: "de" },

  // Sections
  "section.A.title": { es: "Sección A — Consultas Funcionales y Demo", en: "Section A — Functional & Demo Queries", fr: "Section A — Requêtes Fonctionnelles et Démo" },
  "section.B.title": { es: "Sección B — Consultas Técnicas", en: "Section B — Technical Queries", fr: "Section B — Requêtes Techniques" },
  "section.C.title": { es: "Sección C — Procesamiento Batch", en: "Section C — Batch Processing", fr: "Section C — Traitement par Lots" },
  "section.G.title": { es: "Preguntas Enviadas — 25 de Febrero del 2026", en: "Questions Submitted — February 25, 2026", fr: "Questions Envoyées — 25 Février 2026" },

  // Cards
  "card.answered": { es: "✅ Respondida", en: "✅ Answered", fr: "✅ Répondue" },
  "card.requirement": { es: "Requerimiento", en: "Requirement", fr: "Exigence" },
  "card.response": { es: "Respuesta SYSDE", en: "SYSDE Response", fr: "Réponse SYSDE" },
  "card.value": { es: "Valor para Unicomer", en: "Value for Unicomer", fr: "Valeur pour Unicomer" },
  "card.diagrams": { es: "Detalle Visual / Diagramas", en: "Visual Detail / Diagrams", fr: "Détail Visuel / Diagrammes" },
  "card.example": { es: "Ejemplo Concreto Unicomer", en: "Concrete Example — Unicomer", fr: "Exemple Concret — Unicomer" },
  "card.considerations": { es: "Consideraciones Técnicas", en: "Technical Considerations", fr: "Considérations Techniques" },
  "card.demo": { es: "🚀 Ver Demo Interactiva", en: "🚀 View Interactive Demo", fr: "🚀 Voir la Démo Interactive" },

  // Footer
  "footer.slogan": { es: "Somos Tecnología para Crecer", en: "We are Technology to Grow", fr: "Nous sommes la Technologie pour Grandir" },
  "footer.contact": { es: "Contacto", en: "Contact", fr: "Contact" },

  // Question titles
  "q1.title": { es: "Demo Script con Pantallas Reales de SAF+", en: "Demo Script with Real SAF+ Screens", fr: "Script Démo avec Écrans Réels SAF+" },
  "q2.title": { es: "Agrupación de Cuentas para Procesamiento Automático", en: "Account Grouping for Automatic Processing", fr: "Regroupement de Comptes pour Traitement Automatique" },
  "q3.title": { es: "Configuración de Parámetros (Account, Loan, Interest, Fees)", en: "Parameter Configuration (Account, Loan, Interest, Fees)", fr: "Configuration des Paramètres (Compte, Prêt, Intérêts, Frais)" },
  "q4.title": { es: "Manejo de Zonas Especiales", en: "Special Zones Management", fr: "Gestion des Zones Spéciales" },
  "q5.title": { es: "Soporte de Intereses Moratorios (Arrears Interest)", en: "Arrears Interest Support", fr: "Support des Intérêts de Retard" },
  "q6.title": { es: "Trazabilidad de Pagos por Cuota e Instalación", en: "Payment Tracking by Installment & Bucket", fr: "Traçabilité des Paiements par Échéance et Composante" },
  "q7.title": { es: "Aplicación de Pagos con Distribución Proporcional", en: "Payment Application with Proportional Distribution", fr: "Application de Paiements avec Distribution Proportionnelle" },
  "q8.title": { es: "Manejo de Desgloses de IVA", en: "IVA/Tax Breakdown Management", fr: "Gestion de la Ventilation TVA/Taxes" },
  "q9.title": { es: "Límite de Crédito, CMM, LEM y Fechas de Vencimiento", en: "Credit Limit, CMM, LEM & Due Dates", fr: "Limite de Crédit, CMM, LEM et Dates d'Échéance" },
  "q10.title": { es: "Pantallas Web Responsivas", en: "Responsive Web Screens", fr: "Écrans Web Réactifs" },
  "q11.title": { es: "Crédito Revolvente en SYSDE", en: "Revolving Credit in SYSDE", fr: "Crédit Renouvelable dans SYSDE" },
  "q12.title": { es: "Configuración de Idioma por Usuario", en: "Per-User Language Configuration", fr: "Configuration de Langue par Utilisateur" },
  "q13.title": { es: "Módulo de Tarjetas (Cards)", en: "Cards Module", fr: "Module de Cartes" },
  "q14.title": { es: "Catálogo de APIs", en: "API Catalog", fr: "Catalogue d'APIs" },
  "q15.title": { es: "Documentación en Inglés", en: "English Documentation", fr: "Documentation en Anglais" },
  "q16.title": { es: "Alertas de Fraude y Detección en Tiempo Real", en: "Real-Time Fraud Alerts & Detection", fr: "Alertes de Fraude et Détection en Temps Réel" },
  "q17.title": { es: "Período de Pruebas para Despliegues y Upgrades", en: "Testing Period for Deployments & Upgrades", fr: "Période de Test pour Déploiements et Mises à Jour" },
  "q18.title": { es: "Actualización Masiva de Campos y Disponibilidad en Línea", en: "Mass Field Updates & Online Availability", fr: "Mise à Jour Massive de Champs et Disponibilité en Ligne" },
  "q19.title": { es: "Ventanas Batch e Impacto en Operación en Línea", en: "Batch Windows & Online Operations Impact", fr: "Fenêtres Batch et Impact sur les Opérations en Ligne" },
  "q20.title": { es: "Batch para Grupo Seleccionado de Cuentas", en: "Batch for Selected Account Groups", fr: "Batch pour Groupe Sélectionné de Comptes" },
  "q21.title": { es: "Ciclo de Procesamiento Batch (Nightly / Monthly)", en: "Batch Processing Cycle (Nightly / Monthly)", fr: "Cycle de Traitement Batch (Nocturne / Mensuel)" },
  "q22.title": { es: "Generación Automática de Reportes", en: "Automated Report Generation", fr: "Génération Automatique de Rapports" },
  "q23.title": { es: "Segmentación de Instancias por País", en: "Instance Segmentation by Country", fr: "Segmentation des Instances par Pays" },
  "q24.title": { es: "Convivencia de Crédito APR y Plano", en: "APR and Flat Credit Coexistence", fr: "Coexistence Crédit APR et Fixe" },
  "q25.title": { es: "Carga de Cargos: Seguros, Asistencias, Garantías", en: "Fee Loading: Insurance, Assistance, Warranties", fr: "Chargement des Frais" },
  "q26.title": { es: "Cuotas Fijas (Fixed Installments)", en: "Fixed Installments", fr: "Mensualités Fixes" },
  "q27.title": { es: "Scores Internos: CMM, LEM y Clasificación de Clientes", en: "Internal Scores: CMM, LEM and Client Classification", fr: "Scores Internes : CMM, LEM et Classification" },
  "q28.title": { es: "Módulo de Tarjetas de Crédito y Débito", en: "Credit and Debit Cards Module", fr: "Module de Cartes de Crédit et Débit" },
};

const I18nContext = createContext<I18nContextType>({
  lang: "es",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string) => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
