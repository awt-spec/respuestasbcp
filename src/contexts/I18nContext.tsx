import React, { createContext, useContext, useState } from "react";

type Lang = "es" | "en";

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.all": { es: "Todas", en: "All" },
  "nav.sectionA": { es: "Consultas BCP — Leasing", en: "BCP Queries — Leasing" },

  // Hero
  "hero.badge": { es: "CONFIDENCIAL — Respuesta a Consultas BCP | Marzo 2026", en: "CONFIDENTIAL — BCP Query Response | March 2026" },
  "hero.title1": { es: "Respuestas a Consultas", en: "Responses to Queries" },
  "hero.title2": { es: "Evaluación Solución Leasing — BCP", en: "Leasing Solution Evaluation — BCP" },
  "hero.subtitle": { es: "BCP — Evaluación de SYSDE PLUS Leasing", en: "BCP — SYSDE PLUS Leasing Evaluation" },
  "hero.prepared": { es: "Preparado por SYSDE S.A. | Referencia: Consultas Evaluación Leasing BCP", en: "Prepared by SYSDE S.A. | Ref: BCP Leasing Evaluation Queries" },
  "hero.answered": { es: "Consultas Respondidas", en: "Queries Answered" },
  "hero.sections": { es: "Sección", en: "Section" },

  // Dashboard
  "dash.answered": { es: "respondidas", en: "answered" },
  "dash.pending": { es: "pendientes", en: "pending" },
  "dash.of": { es: "de", en: "of" },

  // Sections
  "section.A.title": { es: "Consultas BCP — Evaluación Leasing", en: "BCP Queries — Leasing Evaluation" },

  // Cards
  "card.answered": { es: "✅ Respondida", en: "✅ Answered" },
  "card.requirement": { es: "Consulta BCP", en: "BCP Query" },
  "card.response": { es: "Respuesta SYSDE", en: "SYSDE Response" },
  "card.value": { es: "Valor para BCP", en: "Value for BCP" },
  "card.diagrams": { es: "Detalle Visual / Diagramas", en: "Visual Detail / Diagrams" },
  "card.example": { es: "Ejemplo Concreto", en: "Concrete Example" },
  "card.considerations": { es: "Consideraciones Técnicas", en: "Technical Considerations" },
  "card.references": { es: "Referencias", en: "References" },
  "card.demo": { es: "🚀 Ver Demo Interactiva", en: "🚀 View Interactive Demo" },

  // Footer
  "footer.slogan": { es: "Somos Tecnología para Crecer", en: "We are Technology to Grow" },
  "footer.contact": { es: "Contacto", en: "Contact" },
};

const I18nContext = createContext<I18nContextType>({
  lang: "es",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("es");

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
