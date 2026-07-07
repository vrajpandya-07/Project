import { useState } from "react";

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);

  const speak = (text: string, lang: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const langMap: Record<string, string> = {
      en: "en-US",
      hi: "hi-IN",
      gu: "gu-IN",
      ta: "ta-IN",
      mr: "mr-IN",
    };
    utterance.lang = langMap[lang] || "en-US";
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return { speak, stop, speaking };
}
