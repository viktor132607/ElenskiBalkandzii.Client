"use client";

import { createContext, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Language = "bg" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function stripLocale(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

function localizePath(pathname: string, language: Language) {
  let basePath = stripLocale(pathname);

  if (basePath === "/project") {
    basePath = "/products";
  }

  if (language === "en") {
    return basePath === "/" ? "/en" : `/en${basePath}`;
  }

  return basePath;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const language: Language = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "bg";

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (value: Language) => {
    const targetPath = localizePath(pathname, value);
    router.push(`${targetPath}${window.location.hash}`);
  };

  const toggleLanguage = () => setLanguage(language === "bg" ? "en" : "bg");

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
