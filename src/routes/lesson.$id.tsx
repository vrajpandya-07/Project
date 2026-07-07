import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Volume2,
  Languages as LanguagesIcon,
  ArrowRight,
  Sparkles,
  ImageIcon,
  ArrowLeft,
  Video,
  Play,
  Pause,
  Square,
  VideoOff,
  Flame,
  VolumeX,
  RotateCcw,
  ArrowRightLeft,
  Plus,
  Minus,
  CheckCircle,
  StopCircle,
  Loader2,
} from "lucide-react";
import { LESSONS, LANGUAGES } from "@/lib/mock-data";
import { getTranslatedLesson } from "@/lib/translations";
import { toast } from "sonner";
import { useTTS } from "@/hooks/use-tts";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/lesson/$id")({
  loader: ({ params }) => {
    const lesson = LESSONS.find((l) => l.id === params.id);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.lesson.title} — Vernacular STEM` : "Lesson" }],
  }),
  component: () => <AppShell><LessonPage /></AppShell>,
  notFoundComponent: () => (
    <AppShell>
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Button asChild className="mt-4">
          <Link to="/lessons">Back to lessons</Link>
        </Button>
      </div>
    </AppShell>
  ),
});

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const [lang, setLang] = useState("en");
  const [section, setSection] = useState(0);
  const { updateLessonProgress } = useProgress();

  // Translations
  const translated = getTranslatedLesson(lesson.id, lang);
  const displayTitle = translated ? translated.title : lesson.title;
  const displayDesc = translated ? translated.description : lesson.description;

  const defaultSections = [
    { title: "Introduction", body: `Welcome to ${lesson.title}. In this lesson, we'll explore the core ideas step by step, with examples in your language.` },
    { title: "Core Concept", body: `The fundamental idea behind ${lesson.title} is built on a few key principles. AI will explain each in a way tailored to your level.` },
    { title: "Worked Examples", body: `Let's walk through practical examples that connect these ideas to real-world situations you might encounter.` },
    { title: "Practice", body: `Now it's your turn — try a small exercise before we move on to the quiz.` },
  ];

  const sections = translated ? translated.sections : defaultSections;
  const current = sections[section];

  useEffect(() => {
    const pct = Math.round(((section + 1) / sections.length) * 100);
    updateLessonProgress(lesson.id, pct);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, sections.length, lesson.id]);

  // ── TTS & Translation state ─────────────────────────────────────────────
  const [translatedBody, setTranslatedBody] = useState<string | null>(null);
  const { speak, stop, speaking } = useTTS();
  const { translate, translating } = useTranslation();

  // Reset translation whenever the user changes section or language
  useEffect(() => {
    setTranslatedBody(null);
    if (speaking) stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, lang]);

  const displayedBody = translatedBody ?? current.body;

  const handleListen = () => {
    if (speaking) {
      stop();
      return;
    }
    speak(displayedBody, lang);
  };

  const handleTranslate = async () => {
    if (lang === "en") {
      toast.info("Content is already in English.");
      return;
    }
    const result = await translate(current.body, lang);
    setTranslatedBody(result);
    toast.success(`✅ Translated to ${LANGUAGES.find((l) => l.code === lang)?.label ?? lang}`);
  };

  // ==================== TEXT TO SPEECH (TTS) ENGINE ====================
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTtsPanel, setShowTtsPanel] = useState(false);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");
  const [highlightWordIndex, setHighlightWordIndex] = useState<number | null>(null);

  // Re-split body text into word tokens (keeping spaces so we can reconstruct the text perfectly)
  const textWords = useMemo(() => {
    return current.body.split(/(\s+)/);
  }, [current.body]);

  // Precalculate character offsets for each word token
  const wordOffsets = useMemo(() => {
    let offset = 0;
    return textWords.map((word) => {
      const start = offset;
      offset += word.length;
      return { word, start, end: offset };
    });
  }, [textWords]);

  // Fetch available voices for the current language
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const langMap: Record<string, string> = {
        en: "en",
        hi: "hi",
        gu: "gu",
        ta: "ta",
        mr: "mr",
      };
      const prefix = langMap[lang] || "en";
      const filtered = allVoices.filter(
        (v) => v.lang.toLowerCase().startsWith(prefix.toLowerCase())
      );
      setVoices(filtered);

      if (filtered.length > 0) {
        // Auto-select a voice if none is active or active is not in filtered list
        const exists = filtered.some((v) => v.name === selectedVoiceName);
        if (!exists) {
          // Prioritize Indian accent voices for regional languages / English
          const indianVoice = filtered.find((v) => v.lang.includes("IN"));
          setSelectedVoiceName(indianVoice ? indianVoice.name : filtered[0].name);
        }
      } else {
        setSelectedVoiceName("");
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [lang]);

  // Handle current section change: reset speech
  useEffect(() => {
    stopSpeech();
  }, [section]);

  const stopSpeech = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setHighlightWordIndex(null);
    }
  };

  const playSpeech = () => {
    if (typeof window === "undefined") return;

    if (isPlaying && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel(); // cancel any active speech

    const utterance = new SpeechSynthesisUtterance(current.body);

    const langMap: Record<string, string> = {
      en: "en-US",
      hi: "hi-IN",
      gu: "gu-IN",
      ta: "ta-IN",
      mr: "mr-IN",
    };
    utterance.lang = langMap[lang] || "en-US";

    // Set selected voice
    if (selectedVoiceName) {
      const v = window.speechSynthesis.getVoices().find((voice) => voice.name === selectedVoiceName);
      if (v) utterance.voice = v;
    }

    utterance.rate = rate;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setHighlightWordIndex(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setHighlightWordIndex(null);
    };

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const charIndex = event.charIndex;
        const idx = wordOffsets.findIndex((w) => charIndex >= w.start && charIndex < w.end);
        if (idx !== -1) {
          setHighlightWordIndex(idx);
        }
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  // ==================== SIMULATIONS ====================
  
  // 1. Math balance simulation state
  const [mathX, setMathX] = useState(5);
  
  // 2. Physics force/mass slider simulation state
  const [physMass, setPhysMass] = useState(5); // kg
  const [physForce, setPhysForce] = useState(15); // N
  const [physXPos, setPhysXPos] = useState(20); // percentage offset
  const [physVel, setPhysVel] = useState(0);
  const [physAcc, setPhysAcc] = useState(0);
  const [physIsRunning, setPhysIsRunning] = useState(false);
  const animationRef = useRef<number | null>(null);
  const physTimeRef = useRef<number>(0);

  // Run Physics Simulation Loop
  const runPhysics = () => {
    if (physIsRunning) {
      // Pause
      setPhysIsRunning(false);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    } else {
      // Start
      setPhysIsRunning(true);
      physTimeRef.current = performance.now();
      
      const a = physForce / physMass;
      setPhysAcc(a);

      const loop = (timeNow: number) => {
        const dt = (timeNow - physTimeRef.current) / 1000; // seconds
        physTimeRef.current = timeNow;

        setPhysVel((v) => {
          const nextV = v + a * dt;
          setPhysXPos((x) => {
            const nextX = x + nextV * dt * 15; // scalar speed scale
            if (nextX >= 80) {
              setPhysIsRunning(false);
              setPhysVel(0);
              return 80; // stop at boundary
            }
            return nextX;
          });
          return nextV;
        });

        animationRef.current = requestAnimationFrame(loop);
      };
      animationRef.current = requestAnimationFrame(loop);
    }
  };

  const resetPhysics = () => {
    setPhysIsRunning(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setPhysXPos(20);
    setPhysVel(0);
    setPhysAcc(0);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // 3. Mock Custom Video Player State
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setVideoTime(video.currentTime);
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      setVideoPlaying(false);
      setVideoProgress(0);
      setVideoTime(0);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Subtitles generator based on time
  const subtitle = useMemo(() => {
    if (lesson.id === "l1") {
      // Algebra subtitles
      if (videoTime < 5) {
        return lang === "en" ? "Welcome to Algebra! Let's study variables together." :
               lang === "hi" ? "बीजगणित में आपका स्वागत है! आइए मिलकर चरों का अध्ययन करें。" :
               lang === "gu" ? "બીજગણિતમાં આપનું સ્વાગત છે! ચાલો આપણે ચલોનો સાથે અભ્યાસ કરીએ." :
               lang === "ta" ? "இயற்கணிதத்திற்கு வரவேற்கிறோம்! மாறிகளைப் பற்றி ஒன்றாகப் படிப்போம்." :
               "बीजगणितात आपले स्वागत आहे! चला चरांचा एकत्र अभ्यास करूया.";
      } else if (videoTime < 10) {
        return lang === "en" ? "We replace unknown values with letters like 'x'." :
               lang === "hi" ? "हम अज्ञात मानों को 'x' जैसे अक्षरों से प्रतिस्थापित करते हैं।" :
               lang === "gu" ? "આપણે અજ્ઞાત મૂલ્યોને 'x' જેવા અક્ષરોથી બદલીએ છીએ." :
               lang === "ta" ? "தெரியாத மதிப்புகளை 'x' போன்ற எழுத்துக்களால் மாற்றுகிறோம்." :
               "आम्ही अज्ञात मूल्यांना 'x' सारख्या अक्षरांनी बदलतो.";
      } else if (videoTime < 16) {
        return lang === "en" ? "Balancing equations is like balancing a scale." :
               lang === "hi" ? "समीकरणों को संतुलित करना एक तराजू को संतुलित करने जैसा है।" :
               lang === "gu" ? "સમીકરણો સંતુલિત કરવું એ ત્રાજવાને સંતુલિત કરવા જેવું છે." :
               lang === "ta" ? "சமன்பாடுகளைச் சமநிலைப்படுத்துவது ஒரு தராசைச் சமநிலைப்படுத்துவது போன்றது." :
               "समीकरणे संतुलित करणे म्हणजे तराजू संतुलित करण्यासारखे आहे.";
      } else {
        return lang === "en" ? "Solve for x by performing operations on both sides." :
               lang === "hi" ? "दोनों पक्षों पर संक्रियाएँ करके x का मान ज्ञात करें।" :
               lang === "gu" ? "બંને બાજુ ક્રિયાઓ કરીને x ની કિંમત શોધો." :
               lang === "ta" ? "இரு பக்கங்களிலும் கணிதச் செயல்களைச் செய்து x இன் மதிப்பைக் காண்க." :
               "दोन्ही बाजूंवर क्रिया करून x चे मूल्य शोधा.";
      }
    } else {
      // Laws of Motion subtitles
      if (videoTime < 5) {
        return lang === "en" ? "Newton's laws explain how objects move." :
               lang === "hi" ? "न्यूटन के नियम बताते हैं कि वस्तुएं कैसे गति करती हैं।" :
               lang === "gu" ? "ન્યૂટનના નિયમો સમજાવે છે કે પદાર્થો કેવી રીતે ગતિ કરે છે." :
               lang === "ta" ? "பொருள்கள் எவ்வாறு இயங்குகின்றன என்பதை நியூட்டனின் விதிகள் விளக்குகின்றன." :
               "न्यूटनचे नियम वस्तू कशा फिरतात हे स्पष्ट करतात.";
      } else if (videoTime < 10) {
        return lang === "en" ? "First law: objects resist changes to their motion." :
               lang === "hi" ? "पहला नियम: वस्तुएं अपनी गति में परिवर्तन का विरोध करती हैं।" :
               lang === "gu" ? "પ્રથમ નિયમ: પદાર્થો તેમની ગતિમાં ફેરફારનો પ્રતિકાર કરે છે." :
               lang === "ta" ? "முதல் விதி: பொருள்கள் தங்கள் இயக்கத்தில் ஏற்படும் மாற்றத்தை எதிர்க்கின்றன." :
               "पहिला नियम: वस्तू त्यांच्या गतीतील बदलाला विरोध करतात.";
      } else if (videoTime < 16) {
        return lang === "en" ? "Force equals mass times acceleration (F = ma)." :
               lang === "hi" ? "बल द्रव्यमान और त्वरण के गुणनफल के बराबर होता है (F = ma)।" :
               lang === "gu" ? "બળ એ દળ અને પ્રવેગના ગુણાકાર બરાબર છે (F = ma)." :
               lang === "ta" ? "விசை என்பது நிறை மற்றும் முடுக்கத்தின் பெருக்கற்பலனுக்குச் சமம் (F = ma)." :
               "बल हे वस्तुमान आणि प्रवेगाच्या गुणाकाराएवढे असते (F = ma).";
      } else {
        return lang === "en" ? "Action and reaction are equal and opposite." :
               lang === "hi" ? "क्रिया और प्रतिक्रिया समान और विपरीत होती हैं।" :
               lang === "gu" ? "ક્રિયા અને પ્રતિક્રિયા સમાન અને વિરુદ્ધ હોય છે." :
               lang === "ta" ? "ஒவ்வொரு வினைக்கும் சமமான மற்றும் எதிர் வினை உண்டு." :
               "क्रिया आणि प्रतिक्रिया समान आणि विरुद्ध असतात.";
      }
    }
  }, [lesson.id, videoTime, lang]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
        <Link to="/lessons">
          <ArrowLeft className="h-4 w-4" /> All lessons
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{lesson.subject}</Badge>
          <Badge variant="outline">{lesson.difficulty}</Badge>
          <Badge variant="outline">{lesson.duration} min</Badge>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">{displayTitle}</h1>
        <p className="text-muted-foreground">{displayDesc}</p>
      </div>

      {/* Toolbar */}
      <Card className="border-border/60 shadow-card">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger className="w-[180px]">
                <LanguagesIcon className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.code} value={l.code}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={speaking ? "destructive" : "outline"}
              size="sm"
              className="gap-2"
              onClick={handleListen}
            >
              {speaking
                ? <StopCircle className="h-4 w-4 animate-pulse" />
                : <Volume2 className="h-4 w-4" />}
              {speaking ? "Stop" : "Listen"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleTranslate}
              disabled={translating}
            >
              {translating
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <LanguagesIcon className="h-4 w-4" />}
              {translating
                ? "Translating…"
                : translatedBody && lang !== "en"
                ? "Re-translate"
                : "Translate"}
            </Button>
          </div>

          <Badge variant="secondary" className="bg-primary/10 text-primary border-transparent px-3 py-1">
            🌐 Translated Native Audio Ready
          </Badge>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex items-center gap-3">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setSection(i)}
            className="flex-1 focus:outline-none"
            aria-label={`Go to section ${i + 1}`}
          >
            <div className={cn("h-2 rounded-full transition-all hover:opacity-80", i <= section ? "bg-primary" : "bg-muted")} />
          </button>
        ))}
      </div>

      {/* TABS CONTAINER */}
      <Tabs defaultValue="explanation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 bg-muted/60">
          <TabsTrigger value="explanation" className="rounded-xl py-2.5 gap-2 transition-all">
            <Sparkles className="h-4 w-4" /> AI Explanation
          </TabsTrigger>
          <TabsTrigger value="video" className="rounded-xl py-2.5 gap-2 transition-all">
            <Video className="h-4 w-4" /> Live Demonstration
          </TabsTrigger>
        </TabsList>

        {/* ==================== AI EXPLANATION TAB ==================== */}
        <TabsContent value="explanation" className="mt-4 focus-visible:outline-none">
          <Card className="border-border/60 shadow-card">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Card Title */}
              <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Section {section + 1} of {sections.length} · AI Vernacular Tutor
                  </div>
                  <h2 className="text-2xl font-bold mt-0.5">{current.title}</h2>
                </div>
              </div>

              {/* Card Body with highlights */}
              <div className="bg-background border border-border/40 rounded-2xl p-5 shadow-inner">
                <p className="text-base leading-relaxed text-foreground/90 font-medium">
  {textWords.map((wordToken, index) => (
    <span
      key={index}
      className={cn(
        "transition-all duration-150 rounded-md px-0.5 py-0.25",
        highlightWordIndex === index
          ? "bg-primary text-primary-foreground font-semibold shadow-md"
          : ""
      )}
    >
      {wordToken}
    </span>
  ))}
</p>
              </div>

              {/* Render dynamic mockup illustrative visual according to topic */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Topic Illustration</h3>
                {lesson.id === "l1" ? (
                  <div className="grid h-56 place-items-center rounded-2xl border-2 border-dashed border-border bg-muted/20 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">🧮</div>
                      <div className="font-semibold text-sm">Algebra Variable Balancing Diagram</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Visualizing <code className="bg-accent px-1.5 py-0.5 rounded text-primary">2x + 5 = 15</code>. To solve for variable <code className="text-primary font-bold">x</code>, we perform identical inverse mathematical operations on both sides.
                      </p>
                      <div className="flex gap-4 items-center justify-center text-xs pt-2">
                        <span className="bg-card border px-2.5 py-1.5 rounded-lg font-medium">Left Side: 2x + 5</span>
                        <span className="text-lg font-bold">＝</span>
                        <span className="bg-card border px-2.5 py-1.5 rounded-lg font-medium">Right Side: 15</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid h-56 place-items-center rounded-2xl border-2 border-dashed border-border bg-muted/20 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">🍎</div>
                      <div className="font-semibold text-sm">Newton's Laws Mechanical System</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Visualizing forces <code className="bg-accent px-1.5 py-0.5 rounded text-primary">F</code> acting on a physical object of mass <code className="bg-accent px-1.5 py-0.5 rounded text-primary">m</code>, inducing acceleration <code className="bg-accent px-1.5 py-0.5 rounded text-primary">a</code>.
                      </p>
                      <div className="flex gap-4 items-center justify-center text-xs pt-2">
                        <span className="bg-card border px-2.5 py-1.5 rounded-lg font-medium">Mass: 5 kg</span>
                        <span className="bg-card border px-2.5 py-1.5 rounded-lg font-medium">Force: 15 N</span>
                        <span className="bg-primary/10 text-primary border-primary/20 border px-2.5 py-1.5 rounded-lg font-semibold">a = 3 m/s²</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Examples List */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Worked Examples</h3>
                <div className="space-y-3">
                  {[1, 2].map((n) => (
                    <div key={n} className="rounded-2xl border border-border bg-accent/20 p-4 transition-all hover:bg-accent/30">
                      <div className="mb-1 text-xs font-bold text-primary uppercase tracking-wider">Example {n}</div>
                      <p className="text-sm font-medium">
                        {lesson.id === "l1"
                          ? n === 1
                            ? "Algebra in daily shopping: If 2 packets of chips plus a 5 rupee beverage cost 15 rupees. 2x + 5 = 15, so x (each packet) cost 5 rupees."
                            : "Solving perimeter: If a rectangular garden has width x, length 2x, and total perimeter 6x = 60m. Solving gives width x = 10m."
                          : n === 1
                            ? "Inertia: A book lying resting on a table remains still until you push it with a physical force (First Law)."
                            : "Action-Reaction: An inflated balloon flying forward as air rushes backward out of the neck (Third Law)."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== LIVE DEMONSTRATION TAB ==================== */}
        <TabsContent value="video" className="mt-4 focus-visible:outline-none">
          <Card className="border-border/60 shadow-card">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    <Video className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Interactive Live Science Labs</div>
                    <h2 className="text-xl font-bold mt-0.5">Visualize in Real-Time</h2>
                  </div>
                </div>
                
                <Badge className="bg-success/15 text-success hover:bg-success/20 border-transparent text-xs py-1">
                  Active Simulation
                </Badge>
              </div>

              {/* RENDER THE LAB SIMULATION OR VIDEO ACCORDING TO SUBJECT */}
              {lesson.subject === "Mathematics" ? (
                // MATH ALGEBRA BALANCE SCALE SIMULATION
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <ArrowRightLeft className="h-4 w-4 text-primary" /> Equation Balancer (2x + 5 = 15)
                      </CardTitle>
                      <CardDescription>
                        Move the slider to find the value of <code className="text-primary font-bold">x</code> that balances the scales.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* SVG Balance scale */}
                      <div className="relative h-48 bg-background border border-border/40 rounded-2xl flex items-center justify-center p-4 overflow-hidden">
                        <svg viewBox="0 0 400 200" className="w-full h-full max-w-sm">
                          {/* Stand base */}
                          <path d="M 180 180 L 220 180 L 200 150 Z" fill="#64748b" />
                          <rect x="196" y="70" width="8" height="85" fill="#475569" />

                          {/* Beam (tilt depends on x value compared to 5) */}
                          {/* Balance logic: mathX=5 => tilt=0. mathX<5 => left is lighter, so tilts UP on left, tilt angle negative. mathX>5 => tilts DOWN on left, angle positive. */}
                          <g
                            transform={`rotate(${(mathX - 5) * 5}, 200, 70)`}
                            className="transition-transform duration-500 ease-out"
                          >
                            {/* main beam */}
                            <line x1="80" y1="70" x2="320" y2="70" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
                            {/* pivot point */}
                            <circle cx="200" cy="70" r="6" fill="#1e293b" />

                            {/* Left pan strings and pan */}
                            <line x1="80" y1="70" x2="50" y2="130" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="80" y1="70" x2="110" y2="130" stroke="#94a3b8" strokeWidth="2" />
                            <path d="M 40 130 Q 80 145 120 130 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />

                            {/* Left Side weights (Representing 2x + 5) */}
                            <g transform="translate(60, 110)">
                              {/* 2 Blocks of x */}
                              <rect x="0" y="-10" width="16" height="16" rx="3" fill="#6366f1" className="shadow-sm" />
                              <text x="8" y="2" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">x</text>
                              
                              <rect x="18" y="-10" width="16" height="16" rx="3" fill="#6366f1" className="shadow-sm" />
                              <text x="26" y="2" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">x</text>
                              
                              {/* + 5 weight */}
                              <circle cx="42" cy="-2" r="8" fill="#f59e0b" />
                              <text x="42" y="1" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">5</text>
                            </g>

                            {/* Right pan strings and pan */}
                            <line x1="320" y1="70" x2="290" y2="130" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="320" y1="70" x2="350" y2="130" stroke="#94a3b8" strokeWidth="2" />
                            <path d="M 280 130 Q 320 145 360 130 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />

                            {/* Right Side weight (representing 15) */}
                            <g transform="translate(300, 110)">
                              <rect x="5" y="-12" width="30" height="18" rx="4" fill="#10b981" />
                              <text x="20" y="1" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">15</text>
                            </g>
                          </g>
                        </svg>

                        {/* Balance Indicator Overlay */}
                        <div className="absolute top-3 right-4 flex items-center gap-1.5 bg-background/80 backdrop-blur border border-border px-3 py-1 rounded-xl text-xs font-semibold">
                          {mathX === 5 ? (
                            <span className="text-success flex items-center gap-1">
                              <CheckCircle className="h-4.5 w-4.5" /> Perfectly Balanced (x = 5)
                            </span>
                          ) : mathX < 5 ? (
                            <span className="text-warning">Lighter on Left (2x + 5 &lt; 15)</span>
                          ) : (
                            <span className="text-destructive">Heavier on Left (2x + 5 &gt; 15)</span>
                          )}
                        </div>
                      </div>

                      {/* Slider Control */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm font-semibold">
                          <span>Set Variable value (<code className="text-primary font-bold">x</code>)</span>
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg">x = {mathX}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button size="icon" variant="outline" onClick={() => setMathX((x) => Math.max(1, x - 1))}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Slider
                            value={[mathX]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(val) => setMathX(val[0])}
                            className="flex-1"
                          />
                          <Button size="icon" variant="outline" onClick={() => setMathX((x) => Math.min(10, x + 1))}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Formula Visual */}
                      <div className="text-center font-bold text-lg bg-card p-4 rounded-xl border border-border/60">
                        Expression: 2({mathX}) + 5 = <span className={mathX === 5 ? "text-success" : "text-primary"}>{2 * mathX + 5}</span> {mathX === 5 ? "＝" : "≠"} 15
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : lesson.subject === "Physics" ? (
                // PHYSICS NEWTON'S LAWS OF MOTION ACCELERATOR SIMULATION
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <Flame className="h-4 w-4 text-warning" /> Interactive Block Accelerator (F = ma)
                      </CardTitle>
                      <CardDescription>
                        Adjust Mass (m) and Force (F), then push the block to see how acceleration changes.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Physics simulation display */}
                      <div className="relative h-44 bg-background border border-border/40 rounded-2xl overflow-hidden">
                        {/* Road/Surface */}
                        <div className="absolute bottom-6 left-0 right-0 h-2 bg-slate-500" />
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-200 repeating-linear-grid" />

                        {/* Block */}
                        <div
                          className="absolute bottom-8 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex flex-col items-center justify-center text-primary-foreground shadow-lg transition-all duration-75 border-2 border-white/20"
                          style={{ left: `${physXPos}%` }}
                        >
                          <span className="font-extrabold text-sm">{physMass} kg</span>
                          <span className="text-[10px] opacity-80 uppercase tracking-widest font-semibold">Mass</span>
                        </div>

                        {/* Force Vector Arrow (only show when running or starting) */}
                        {physIsRunning && (
                          <div
                            className="absolute bottom-16 h-2 bg-warning rounded-full transition-all duration-75"
                            style={{
                              left: `${physXPos - 12}%`,
                              width: `${physForce * 1.5}px`,
                            }}
                          >
                            <div className="absolute -right-1 -top-1.5 w-0 h-0 border-t-5 border-b-5 border-l-8 border-t-transparent border-b-transparent border-l-warning" />
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-warning-foreground bg-warning/20 border border-warning/30 px-1 rounded">
                              F = {physForce} N
                            </div>
                          </div>
                        )}

                        {/* HUD Metrics overlay */}
                        <div className="absolute top-3 left-4 right-4 flex justify-between gap-2 text-xs font-mono font-semibold">
                          <span className="bg-background/80 backdrop-blur border border-border px-2 py-1 rounded-lg">
                            Acc: {physForce / physMass} m/s²
                          </span>
                          <span className="bg-background/80 backdrop-blur border border-border px-2 py-1 rounded-lg">
                            Vel: {physVel.toFixed(2)} m/s
                          </span>
                          <span className="bg-background/80 backdrop-blur border border-border px-2 py-1 rounded-lg">
                            Force: {physForce} N
                          </span>
                        </div>
                      </div>

                      {/* Sliders */}
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Mass Slider */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Block Mass (<code className="text-primary font-bold">m</code>)</span>
                            <span className="bg-card px-2 py-0.5 border rounded">{physMass} kg</span>
                          </div>
                          <Slider
                            value={[physMass]}
                            min={1}
                            max={20}
                            step={1}
                            onValueChange={(val) => {
                              setPhysMass(val[0]);
                              if (!physIsRunning) setPhysAcc(physForce / val[0]);
                            }}
                            disabled={physIsRunning}
                          />
                        </div>

                        {/* Force Slider */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Push Force (<code className="text-warning font-bold">F</code>)</span>
                            <span className="bg-card px-2 py-0.5 border rounded">{physForce} N</span>
                          </div>
                          <Slider
                            value={[physForce]}
                            min={5}
                            max={50}
                            step={5}
                            onValueChange={(val) => {
                              setPhysForce(val[0]);
                              if (!physIsRunning) setPhysAcc(val[0] / physMass);
                            }}
                            disabled={physIsRunning}
                          />
                        </div>
                      </div>

                      {/* Simulation Controls */}
                      <div className="flex gap-2">
                        <Button className="flex-1 gap-2" onClick={runPhysics}>
                          {physIsRunning ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                          {physIsRunning ? "Pause Simulation" : "Apply Force / Run"}
                        </Button>
                        <Button variant="outline" className="gap-2" onClick={resetPhysics}>
                          <RotateCcw className="h-4 w-4" /> Reset
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                // FALLBACK: BEAUTIFUL CUSTOM MP4 LESSON PLAYER WITH REGIONAL SUBTITLES
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden bg-black border border-border shadow-2xl aspect-video group">
                    {/* Real Video Element */}
                    <video
                      ref={videoRef}
                      src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05d00dbda490f14a840c8f0e0dbd632&profile_id=165&oauth2_token_id=57447761"
                      className="w-full h-full object-cover"
                      playsInline
                    />

                    {/* Styled Subtitle Overlay */}
                    <div className="absolute bottom-16 left-4 right-4 text-center pointer-events-none">
                      <span className="bg-black/75 text-white text-sm sm:text-md px-3.5 py-1.5 rounded-lg border border-white/10 shadow-lg font-medium inline-block max-w-[90%] select-none">
                        {subtitle}
                      </span>
                    </div>

                    {/* Video Player Custom HUD */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Subtitle helper badge */}
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded">
                        STEM Smart Video
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-4 cursor-pointer">
                        <div className="bg-primary h-full transition-all duration-100" style={{ width: `${videoProgress}%` }} />
                      </div>

                      {/* Controls Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button onClick={toggleVideo} className="text-white hover:text-primary transition-colors focus:outline-none">
                            {videoPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                          </button>
                          <span className="text-white text-xs font-mono select-none">
                            {Math.floor(videoTime)}s / 20s
                          </span>
                        </div>
                        <Badge variant="outline" className="border-white/20 text-white text-[10px] px-2 py-0.5">
                          HD 1080p
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-muted-foreground italic">
                    Hover over the video for custom player controls. Subtitles automatically translate to your active language selection.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* LOOM-STYLE EXPLAIN/RECORD CALL-TO-ACTION CARD */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl overflow-hidden shadow-soft">
        <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <Badge className="bg-primary/20 text-primary border-transparent px-2.5 py-0.75 text-xs font-bold uppercase tracking-wider">
              Explain in Your Voice
            </Badge>
            <h3 className="text-xl font-bold">Record a Live Explanation Video</h3>
            <p className="text-sm text-muted-foreground max-w-lg">
              Explain the concept of <strong className="text-foreground">{lesson.title}</strong> in your native language. Review your recording, download it, or save it to your local gallery!
            </p>
          </div>
          <Button asChild size="lg" className="shadow-soft gap-2 shrink-0 w-full md:w-auto">
            <Link to="/demo" search={{ lessonId: lesson.id, lessonTitle: lesson.title }}>
              <Video className="h-4.5 w-4.5" /> Start Recording Lab
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* NAV SECTION */}
      <div className="flex justify-between gap-3 pt-4">
        <Button variant="outline" disabled={section === 0} onClick={() => setSection((s) => s - 1)}>
          Previous
        </Button>
        {section < sections.length - 1 ? (
          <Button className="gap-2" onClick={() => setSection((s) => s + 1)}>
            Next section <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-2" asChild>
            <Link to="/quiz">
              Take Quiz <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
