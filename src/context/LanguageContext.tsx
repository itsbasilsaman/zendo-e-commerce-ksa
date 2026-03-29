"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, Locale } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  getLocalizedName: (nameObj: { en: string; ar: string } | undefined | null) => string;
  dir: "ltr" | "rtl";
  isArabic: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Read localStorage synchronously to avoid flash of wrong language
function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("zendo-lang");
    if (saved === "en" || saved === "ar") {
      return saved;
    }
  } catch {
    // localStorage unavailable
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // On mount: apply dir/lang and remove the hiding style injected by the inline script
  useEffect(() => {
    document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", locale);

    // Remove the hiding style now that React has rendered with the correct locale
    const hideStyle = document.getElementById("lang-hide");
    if (hideStyle) {
      hideStyle.remove();
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    // Apply immediately
    document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", newLocale);
    try {
      localStorage.setItem("zendo-lang", newLocale);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[locale] || translations[key]?.en || key;
    },
    [locale]
  );

  const getLocalizedName = useCallback(
    (nameObj: { en: string; ar: string } | undefined | null): string => {
      if (!nameObj) return "";
      return nameObj[locale] || nameObj.en || "";
    },
    [locale]
  );

  const dir = locale === "ar" ? "rtl" : "ltr";
  const isArabic = locale === "ar";

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t, getLocalizedName, dir, isArabic }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
