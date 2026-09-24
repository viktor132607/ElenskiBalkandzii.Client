"use client";

import { createContext, startTransition, useContext, useEffect, useState } from "react";

type Language = "bg" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("bg");

  useEffect(() => {
    const saved = window.localStorage.getItem("language");

    if (saved === "bg" || saved === "en") {
      document.documentElement.lang = saved;
      startTransition(() => setLanguageState(saved));
    }
  }, []);

  const applyLanguage = (value: Language) => {
    document.documentElement.lang = value;
    window.localStorage.setItem("language", value);
    startTransition(() => setLanguageState(value));
  };

  const setLanguage = (value: Language) => applyLanguage(value);
  const toggleLanguage = () => applyLanguage(language === "bg" ? "en" : "bg");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
