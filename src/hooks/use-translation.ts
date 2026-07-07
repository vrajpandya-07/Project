import { useState } from "react";

export function useTranslation() {
  const [translating, setTranslating] = useState(false);

  const translate = async (text: string, lang: string): Promise<string> => {
    if (lang === "en") return text;
    
    setTranslating(true);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`
      );
      const data = await response.json();
      
      if (data && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
      return text;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    } finally {
      setTranslating(false);
    }
  };

  return { translate, translating };
}
