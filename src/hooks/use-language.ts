import { useState, useEffect } from "react";

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("preferred_language") || "en";
    }
    return "en";
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      const current = localStorage.getItem("preferred_language") || "en";
      setLang(current);
    };

    window.addEventListener("preferred-language-changed", handleLanguageChange);
    return () => {
      window.removeEventListener("preferred-language-changed", handleLanguageChange);
    };
  }, []);

  const changeLanguage = (newLang: string) => {
    localStorage.setItem("preferred_language", newLang);
    setLang(newLang);
    window.dispatchEvent(new Event("preferred-language-changed"));
  };

  return { lang, changeLanguage };
}
