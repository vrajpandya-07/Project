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
  User,
  BookOpen,
} from "lucide-react";
import { LESSONS, LANGUAGES } from "@/lib/mock-data";
import { getTranslatedLesson } from "@/lib/translations";
import { toast } from "sonner";
import { useTTS } from "@/hooks/use-tts";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
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
  const { lang, changeLanguage } = useLanguage();
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

  // 1b. Chemistry chemical bonding state
  const [bondState, setBondState] = useState<'atoms' | 'transferring' | 'bonded'>('atoms');
  const resetBonding = () => setBondState('atoms');

  // 1c. Biology cell structure state
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);

  // 1d. Computer Science loops state
  const [loopStep, setLoopStep] = useState(-1);
  const [loopOutput, setLoopOutput] = useState<string[]>([]);
  const runLoopStep = () => {
    if (loopStep >= 7) {
      setLoopStep(-1);
      setLoopOutput([]);
      return;
    }
    const nextStep = loopStep + 1;
    setLoopStep(nextStep);
    if (nextStep === 0) {
      setLoopOutput([]);
    } else if (nextStep === 2) {
      setLoopOutput(["Output: 20"]);
    } else if (nextStep === 4) {
      setLoopOutput(["Output: 20", "Output: 40"]);
    } else if (nextStep === 6) {
      setLoopOutput(["Output: 20", "Output: 40", "Output: 60"]);
    }
  };
  const resetLoop = () => {
    setLoopStep(-1);
    setLoopOutput([]);
  };

  // 1e. Mathematics quadratic equations state
  const [quadA, setQuadA] = useState(1);
  const [quadB, setQuadB] = useState(-5);
  const [quadC, setQuadC] = useState(6);

  // 1f. Physics thermodynamics state
  const [thermoTemp, setThermoTemp] = useState(300); // K

  // 1g. Biology photosynthesis state
  const [photoLight, setPhotoLight] = useState(50);
  const [photoCO2, setPhotoCO2] = useState(50);
  const [photoActive, setPhotoActive] = useState(false);
  
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
            <Select value={lang} onValueChange={changeLanguage}>
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
                  <div className="grid h-56 place-items-center rounded-2xl border border-border bg-muted/10 p-6">
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
                ) : lesson.id === "l2" ? (
                  <div className="grid h-56 place-items-center rounded-2xl border border-border bg-muted/10 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">🍎</div>
                      <div className="font-semibold text-sm">Newton's Laws Mechanical System</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Visualizing forces <code className="bg-accent px-1.5 py-0.5 rounded text-primary">F</code> acting on a physical object of mass <code className="bg-accent px-1.5 py-0.5 rounded text-primary">m</code>, inducing acceleration <code className="bg-accent px-1.5 py-0.5 rounded text-primary">a</code>.
                      </p>
                      <div className="flex gap-4 items-center justify-center text-xs pt-2">
                        <span className="bg-card border px-2.5 py-1.5 rounded-lg font-medium">Mass (m)</span>
                        <span className="text-primary font-bold">➔ Force (F)</span>
                        <span className="bg-primary/10 text-primary border-primary/20 border px-2.5 py-1.5 rounded-lg font-semibold">a = F / m</span>
                      </div>
                    </div>
                  </div>
                ) : lesson.id === "l3" ? (
                  <div className="grid h-56 place-items-center rounded-2xl border border-border bg-muted/10 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">🧪</div>
                      <div className="font-semibold text-sm">Chemical Bonding Models</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Atoms seek full valence electron shells. <strong>Ionic</strong>: Electron is transferred (e.g., Sodium NaCl). <strong>Covalent</strong>: Electrons are shared (e.g., Water H₂O).
                      </p>
                      <div className="flex gap-4 items-center justify-center text-xs pt-2">
                        <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2.5 py-1 rounded-lg font-medium">Na⁺ ➔ Cl⁻ (Ionic)</span>
                        <span className="bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2.5 py-1 rounded-lg font-medium">H •• O •• H (Covalent)</span>
                      </div>
                    </div>
                  </div>
                ) : lesson.id === "l4" ? (
                  <div className="grid h-56 place-items-center rounded-2xl border border-border bg-muted/10 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">🧬</div>
                      <div className="font-semibold text-sm">Eukaryotic Cell Organelles</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Cells contain specialized organelles. The <strong>Nucleus</strong> holds DNA, the <strong>Mitochondria</strong> creates energy (ATP), and the <strong>Membrane</strong> controls entry.
                      </p>
                      <div className="flex gap-3 items-center justify-center text-xs pt-2">
                        <span className="bg-card border px-2 py-1 rounded-lg font-medium">Nucleus (DNA)</span>
                        <span className="bg-card border px-2 py-1 rounded-lg font-medium">Mitochondria (ATP)</span>
                        <span className="bg-card border px-2 py-1 rounded-lg font-medium">Ribosome (Protein)</span>
                      </div>
                    </div>
                  </div>
                ) : lesson.id === "l5" ? (
                  <div className="grid h-56 place-items-center rounded-2xl border border-border bg-muted/10 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">🔁</div>
                      <div className="font-semibold text-sm">Loop Control Flow Diagram</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Iterative constructs repeat instructions. A <strong>for loop</strong> iterates over a fixed sequence, while a <strong>while loop</strong> checks a condition before every iteration.
                      </p>
                      <div className="flex gap-4 items-center justify-center text-xs pt-1">
                        <div className="bg-card border px-3 py-1.5 rounded-lg font-mono">
                          for i in range(5):<br />
                          &nbsp;&nbsp;print(i)
                        </div>
                        <div className="text-primary font-bold">➔</div>
                        <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg font-semibold">
                          Runs 5 times<br />i = 0,1,2,3,4
                        </div>
                      </div>
                    </div>
                  </div>
                ) : lesson.id === "l6" ? (
                  <div className="grid h-56 place-items-center rounded-2xl border border-border bg-muted/10 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">📈</div>
                      <div className="font-semibold text-sm">Parabolic Curve Analysis</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Graph of quadratic equation <code className="bg-accent px-1 rounded text-primary">y = ax² + bx + c</code>. The points where the curve cuts the x-axis are the solutions or roots of the equation.
                      </p>
                      <div className="flex gap-4 items-center justify-center text-xs pt-2">
                        <span className="bg-card border px-2.5 py-1.5 rounded-lg font-medium">Formula: (-b ± √D) / 2a</span>
                        <span className="bg-primary/10 text-primary border-primary/20 border px-2.5 py-1.5 rounded-lg font-semibold">D = b² - 4ac</span>
                      </div>
                    </div>
                  </div>
                ) : lesson.id === "l7" ? (
                  <div className="grid h-56 place-items-center rounded-2xl border border-border bg-muted/10 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">🔥</div>
                      <div className="font-semibold text-sm">First Law of Thermodynamics</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Conservation of Energy: <code className="bg-accent px-1.5 py-0.5 rounded text-primary">ΔU = Q - W</code>. Adding heat energy (Q) increases the system internal energy (ΔU) and does physical work (W).
                      </p>
                      <div className="flex gap-4 items-center justify-center text-xs pt-2">
                        <span className="bg-card border px-2 py-1 rounded-lg font-medium">ΔU: Internal Energy</span>
                        <span className="bg-card border px-2 py-1 rounded-lg font-medium">Q: Heat Added</span>
                        <span className="bg-card border px-2 py-1 rounded-lg font-medium">W: Work Done</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid h-56 place-items-center rounded-2xl border border-border bg-muted/10 p-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl">🍃</div>
                      <div className="font-semibold text-sm">Photosynthesis Chloroplast Cycle</div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Plants convert light, water, and CO₂ into sugar (chemical energy) and release oxygen as waste.
                        Formula: <code className="bg-accent px-1 rounded text-primary">6CO₂ + 6H₂O + Light ➔ C₆H₁₂O₂ + 6O₂</code>
                      </p>
                      <div className="flex gap-4 items-center justify-center text-xs pt-2">
                        <span className="bg-green-500/10 text-green-600 border border-green-500/20 px-2.5 py-1 rounded-lg font-medium">Inputs: CO₂, H₂O, Light</span>
                        <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2.5 py-1 rounded-lg font-medium">Outputs: Glucose, O₂</span>
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
              {/* RENDER THE LAB SIMULATION OR VIDEO ACCORDING TO LESSON ID */}
              {lesson.id === "l1" ? (
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

                          {/* Beam */}
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
                              <rect x="0" y="-10" width="16" height="16" rx="3" fill="#6366f1" className="shadow-sm" />
                              <text x="8" y="2" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">x</text>
                              
                              <rect x="18" y="-10" width="16" height="16" rx="3" fill="#6366f1" className="shadow-sm" />
                              <text x="26" y="2" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">x</text>
                              
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
                              <CheckCircle className="h-4.5 w-4.5" /> Balanced (x = 5)
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
                          <span>Set Variable value (x)</span>
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
              ) : lesson.id === "l2" ? (
                // PHYSICS NEWTON'S LAWS OF MOTION ACCELERATOR SIMULATION
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <Flame className="h-4 w-4 text-warning" /> Block Accelerator (F = ma)
                      </CardTitle>
                      <CardDescription>
                        Adjust Mass (m) and Force (F), then push the block to see how acceleration changes.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="relative h-44 bg-background border border-border/40 rounded-2xl overflow-hidden">
                        {/* Road/Surface */}
                        <div className="absolute bottom-6 left-0 right-0 h-2 bg-slate-500" />
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-200" />

                        {/* Block */}
                        <div
                          className="absolute bottom-8 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex flex-col items-center justify-center text-primary-foreground shadow-lg transition-all duration-75 border-2 border-white/20"
                          style={{ left: `${physXPos}%` }}
                        >
                          <span className="font-extrabold text-sm">{physMass} kg</span>
                          <span className="text-[10px] opacity-80 uppercase tracking-widest font-semibold">Mass</span>
                        </div>

                        {/* Force Vector Arrow */}
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
                            Acc: {(physForce / physMass).toFixed(2)} m/s²
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
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Block Mass (m)</span>
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

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Push Force (F)</span>
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
              ) : lesson.id === "l3" ? (
                // CHEMISTRY CHEMICAL BONDING LAB (NaCl)
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <Plus className="h-4 w-4 text-primary" /> Ionic Bond Lab: Sodium & Chlorine
                      </CardTitle>
                      <CardDescription>
                        Explore how valence shell stability drives electron transfer to form Sodium Chloride (NaCl).
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="relative h-56 bg-background border border-border/40 rounded-2xl flex items-center justify-center overflow-hidden p-4">
                        <svg viewBox="0 0 400 200" className="w-full h-full max-w-sm">
                          {/* Sodium Atom */}
                          <g transform="translate(100, 100)">
                            <circle cx="0" cy="0" r="30" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,3" />
                            <circle cx="0" cy="0" r="18" fill="#e0e7ff" />
                            <text x="0" y="4" fill="#312e81" fontSize="10" fontWeight="bold" textAnchor="middle">
                              {bondState === "bonded" ? "Na⁺" : "Na"}
                            </text>
                            {/* Inner shell electron mockup */}
                            <circle cx="0" cy="-18" r="3" fill="#6366f1" />
                            <circle cx="0" cy="18" r="3" fill="#6366f1" />
                            {/* Outer shell valence electron */}
                            {bondState === "atoms" && (
                              <circle cx="30" cy="0" r="4.5" fill="#f59e0b" className="animate-pulse" />
                            )}
                          </g>

                          {/* Electron transferring path */}
                          {bondState === "transferring" && (
                            <circle cx="0" cy="0" r="4.5" fill="#f59e0b">
                              <animate attributeName="cx" from="130" to="266" dur="1s" repeatCount="indefinite" />
                              <animate attributeName="cy" from="100" to="100" dur="1s" repeatCount="indefinite" />
                            </circle>
                          )}

                          {/* Chlorine Atom */}
                          <g transform="translate(300, 100)">
                            <circle cx="0" cy="0" r="34" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
                            <circle cx="0" cy="0" r="22" fill="#d1fae5" />
                            <text x="0" y="4" fill="#065f46" fontSize="10" fontWeight="bold" textAnchor="middle">
                              {bondState === "bonded" ? "Cl⁻" : "Cl"}
                            </text>
                            {/* Outer valence shell dots (7 dots) */}
                            <circle cx="0" cy="-34" r="3" fill="#10b981" />
                            <circle cx="0" cy="34" r="3" fill="#10b981" />
                            <circle cx="-34" cy="0" r="3" fill="#10b981" />
                            <circle cx="24" cy="-24" r="3" fill="#10b981" />
                            <circle cx="24" cy="24" r="3" fill="#10b981" />
                            <circle cx="-24" cy="-24" r="3" fill="#10b981" />
                            <circle cx="-24" cy="24" r="3" fill="#10b981" />
                            
                            {/* Received Electron */}
                            {bondState === "bonded" && (
                              <circle cx="-34" cy="0" r="4.5" fill="#f59e0b" className="animate-ping" style={{ animationDuration: "2s" }} />
                            )}
                          </g>

                          {/* Bond indicator */}
                          {bondState === "bonded" && (
                            <line x1="130" y1="100" x2="266" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
                          )}
                        </svg>

                        {/* Status Label overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/95 border px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm text-center">
                          {bondState === "atoms" && (
                            <span className="text-muted-foreground">Neutral Sodium (1 valence e⁻) & Chlorine (7 valence e⁻)</span>
                          )}
                          {bondState === "transferring" && (
                            <span className="text-warning animate-pulse">Sodium transfers its valence electron to Chlorine...</span>
                          )}
                          {bondState === "bonded" && (
                            <span className="text-success flex items-center justify-center gap-1">
                              <CheckCircle className="h-4 w-4" /> Ionic Bond Formed! (Na⁺ + Cl⁻ ➔ NaCl)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          disabled={bondState !== "atoms"}
                          onClick={() => {
                            setBondState("transferring");
                            setTimeout(() => setBondState("bonded"), 1200);
                          }}
                        >
                          Transfer Electron
                        </Button>
                        <Button variant="outline" onClick={resetBonding}>
                          Reset Lab
                        </Button>
                      </div>
                      
                      <div className="p-3 bg-card border rounded-xl text-xs text-muted-foreground leading-relaxed">
                        {bondState === "bonded" ? (
                          <strong>Explanation:</strong> + " By transferring its outer electron, Sodium completes its inner octet and gains a positive charge (Na⁺). Chlorine receives it, completing its valence shell and gaining a negative charge (Cl⁻). The electromagnetic force binds them into table salt (NaCl)."
                        ) : (
                          "Click Transfer Electron to visualize electron movement. Ionic bonds occur between metals (electron donors) and non-metals (electron acceptors)."
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : lesson.id === "l4" ? (
                // BIOLOGY CELL STRUCTURE EXPLORER
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" /> Cell Organelle Explorer
                      </CardTitle>
                      <CardDescription>
                        Click different parts of the cell layout or the buttons below to explore organelle functions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Interactive SVG Cell Schema */}
                        <div className="relative h-60 bg-background border border-border/40 rounded-2xl flex items-center justify-center p-2">
                          <svg viewBox="0 0 200 200" className="w-full h-full max-h-56">
                            {/* Cell Membrane */}
                            <ellipse
                              cx="100"
                              cy="100"
                              rx="90"
                              ry="75"
                              fill="#f8fafc"
                              stroke={selectedOrganelle === "membrane" ? "#3b82f6" : "#cbd5e1"}
                              strokeWidth={selectedOrganelle === "membrane" ? "4" : "2"}
                              className="cursor-pointer transition-all hover:stroke-blue-400"
                              onClick={() => setSelectedOrganelle("membrane")}
                            />
                            
                            {/* Cytoplasm Helper label */}
                            <text x="35" y="55" fill="#94a3b8" fontSize="8" fontStyle="italic">Cytoplasm</text>

                            {/* Nucleus */}
                            <circle
                              cx="95"
                              cy="95"
                              r="30"
                              fill={selectedOrganelle === "nucleus" ? "#dbeafe" : "#f1f5f9"}
                              stroke={selectedOrganelle === "nucleus" ? "#2563eb" : "#94a3b8"}
                              strokeWidth="2"
                              className="cursor-pointer transition-all hover:fill-blue-50"
                              onClick={() => setSelectedOrganelle("nucleus")}
                            />
                            {/* Nucleolus */}
                            <circle cx="95" cy="95" r="10" fill="#3b82f6" opacity="0.3" />

                            {/* Mitochondria 1 */}
                            <ellipse
                              cx="145"
                              cy="80"
                              rx="15"
                              ry="8"
                              transform="rotate(25, 145, 80)"
                              fill={selectedOrganelle === "mitochondria" ? "#fee2e2" : "#f1f5f9"}
                              stroke={selectedOrganelle === "mitochondria" ? "#ef4444" : "#94a3b8"}
                              strokeWidth="1.8"
                              className="cursor-pointer transition-all hover:fill-red-50"
                              onClick={() => setSelectedOrganelle("mitochondria")}
                            />
                            {/* Mitochondria 2 */}
                            <ellipse
                              cx="55"
                              cy="120"
                              rx="15"
                              ry="8"
                              transform="rotate(-40, 55, 120)"
                              fill={selectedOrganelle === "mitochondria" ? "#fee2e2" : "#f1f5f9"}
                              stroke={selectedOrganelle === "mitochondria" ? "#ef4444" : "#94a3b8"}
                              strokeWidth="1.8"
                              className="cursor-pointer transition-all hover:fill-red-50"
                              onClick={() => setSelectedOrganelle("mitochondria")}
                            />

                            {/* Ribosomes (Dots) */}
                            <circle cx="110" cy="50" r="2.5" fill="#f59e0b" className="cursor-pointer" onClick={() => setSelectedOrganelle("ribosome")} />
                            <circle cx="120" cy="130" r="2.5" fill="#f59e0b" className="cursor-pointer" onClick={() => setSelectedOrganelle("ribosome")} />
                            <circle cx="70" cy="70" r="2.5" fill="#f59e0b" className="cursor-pointer" onClick={() => setSelectedOrganelle("ribosome")} />
                            <circle cx="150" cy="115" r="2.5" fill="#f59e0b" className="cursor-pointer" onClick={() => setSelectedOrganelle("ribosome")} />
                          </svg>
                          <div className="absolute top-2 right-2 text-[10px] text-muted-foreground">Click elements to select</div>
                        </div>

                        {/* Description Panel */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div className="flex flex-wrap gap-1.5">
                            <Button size="sm" variant={selectedOrganelle === "nucleus" ? "default" : "outline"} onClick={() => setSelectedOrganelle("nucleus")}>Nucleus</Button>
                            <Button size="sm" variant={selectedOrganelle === "mitochondria" ? "default" : "outline"} onClick={() => setSelectedOrganelle("mitochondria")}>Mitochondria</Button>
                            <Button size="sm" variant={selectedOrganelle === "membrane" ? "default" : "outline"} onClick={() => setSelectedOrganelle("membrane")}>Cell Membrane</Button>
                            <Button size="sm" variant={selectedOrganelle === "ribosome" ? "default" : "outline"} onClick={() => setSelectedOrganelle("ribosome")}>Ribosomes</Button>
                          </div>

                          <Card className="border-border bg-card">
                            <CardContent className="p-4">
                              {selectedOrganelle === "nucleus" ? (
                                <div className="space-y-1">
                                  <h4 className="font-bold text-primary text-sm">Nucleus (केंदक)</h4>
                                  <p className="text-xs text-muted-foreground">
                                    The cell control center. It contains the cell's genetic material (DNA) and directs all cellular activities, including growth, metabolism, and reproduction.
                                  </p>
                                </div>
                              ) : selectedOrganelle === "mitochondria" ? (
                                <div className="space-y-1">
                                  <h4 className="font-bold text-destructive text-sm">Mitochondria (कणाभसूत्र)</h4>
                                  <p className="text-xs text-muted-foreground">
                                    The powerhouse of the cell. Mitochondria generate chemical energy in the form of Adenosine Triphosphate (ATP) by breaking down nutrients through cellular respiration.
                                  </p>
                                </div>
                              ) : selectedOrganelle === "membrane" ? (
                                <div className="space-y-1">
                                  <h4 className="font-bold text-blue-500 text-sm">Cell Membrane (कोशिका झिल्ली)</h4>
                                  <p className="text-xs text-muted-foreground">
                                    The outer protective barrier of the cell. It is selectively permeable, meaning it controls which molecules (nutrients, waste, water) are allowed to enter or leave the cell.
                                  </p>
                                </div>
                              ) : selectedOrganelle === "ribosome" ? (
                                <div className="space-y-1">
                                  <h4 className="font-bold text-warning text-sm">Ribosomes (राइबोसोम)</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Protein builders. These are tiny organelles floating in cytoplasm or attached to endoplasmic reticulum. They synthesize proteins by translating genetic code sequences.
                                  </p>
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground text-center py-6">
                                  Select an organelle above to read its biological function.
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : lesson.id === "l5" ? (
                // COMPUTER SCIENCE LOOP SIMULATOR
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <RotateCcw className="h-4 w-4 text-primary" /> Python Loops Execution Visualizer
                      </CardTitle>
                      <CardDescription>
                        Step through a loop code sequence and observe variables and console outputs in real-time.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Code editor mockup */}
                        <div className="rounded-xl border bg-[#1e1e1e] p-4 font-mono text-xs text-slate-300 space-y-1 shadow-inner relative">
                          <div className="absolute top-2 right-3 text-[9px] text-slate-500 select-none">Python 3</div>
                          <div className={cn("px-2 py-0.5 rounded transition-all", loopStep === 0 ? "bg-primary/20 text-white border-l-2 border-primary" : "")}>
                            <span className="text-slate-500 select-none mr-3">1</span>items = [10, 20, 30]
                          </div>
                          <div className={cn("px-2 py-0.5 rounded transition-all", [1, 3, 5].includes(loopStep) ? "bg-primary/20 text-white border-l-2 border-primary" : "")}>
                            <span className="text-slate-500 select-none mr-3">2</span>for x in items:
                          </div>
                          <div className={cn("px-2 py-0.5 rounded transition-all pl-6", [2, 4, 6].includes(loopStep) ? "bg-primary/20 text-white border-l-2 border-primary" : "")}>
                            <span className="text-slate-500 select-none mr-1">3</span>    print(x * 2)
                          </div>
                          <div className={cn("px-2 py-0.5 rounded transition-all text-slate-500", loopStep === 7 ? "bg-success/20 text-success-foreground border-l-2 border-success" : "")}>
                            <span className="text-slate-500 select-none mr-3">4</span># Loop Finished!
                          </div>
                          
                          {/* Variables debug view */}
                          <div className="mt-6 pt-3 border-t border-slate-800 text-[10px] text-slate-400 space-y-1">
                            <div className="text-slate-500 uppercase tracking-wider font-sans font-bold text-[8px] mb-1">State Variables</div>
                            <div>items: <span className="text-green-400">[10, 20, 30]</span></div>
                            <div>x: <span className="text-warning font-bold">{loopStep === -1 || loopStep === 0 ? "undefined" : loopStep <= 2 ? "10" : loopStep <= 4 ? "20" : loopStep <= 6 ? "30" : "None"}</span></div>
                            <div>Iteration: <span className="text-sky-400">{loopStep <= 0 ? "0" : loopStep <= 2 ? "1" : loopStep <= 4 ? "2" : loopStep <= 6 ? "3" : "Finished"}</span></div>
                          </div>
                        </div>

                        {/* Terminal mockup */}
                        <div className="rounded-xl border bg-black p-4 font-mono text-xs text-green-400 space-y-1 shadow-inner min-h-[150px] flex flex-col">
                          <div className="text-[10px] text-slate-500 select-none border-b border-slate-900 pb-1 mb-2">Console Output Terminal</div>
                          <div className="flex-1 space-y-1 select-all">
                            {loopOutput.map((out, idx) => (
                              <div key={idx} className="animate-in fade-in duration-200">{out}</div>
                            ))}
                            {loopStep === -1 && <div className="text-slate-600 font-sans italic">Click 'Step Code' to begin loop execution...</div>}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={runLoopStep}>
                          {loopStep === -1 ? "Start Loop" : loopStep >= 7 ? "Restart" : "Step Code"}
                        </Button>
                        <Button variant="outline" onClick={resetLoop}>
                          Reset
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : lesson.id === "l6" ? (
                // MATHEMATICS QUADRATIC PLOTTER
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" /> Parabola Plotter: ax² + bx + c = 0
                      </CardTitle>
                      <CardDescription>
                        Drag sliders to alter constants a, b, and c to plot roots and shift the parabolic trajectory.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* SVG Graph View */}
                        <div className="relative h-60 bg-background border border-border/40 rounded-2xl flex items-center justify-center p-2">
                          <svg viewBox="0 0 200 200" className="w-full h-full max-h-56">
                            {/* Gridlines */}
                            <line x1="0" y1="100" x2="200" y2="100" stroke="#cbd5e1" strokeWidth="1" /> {/* X axis */}
                            <line x1="100" y1="0" x2="100" y2="200" stroke="#cbd5e1" strokeWidth="1" /> {/* Y axis */}
                            
                            {/* Grid markers */}
                            <circle cx="100" cy="100" r="1.5" fill="#000" />
                            <text x="104" y="108" fontSize="6" fill="#94a3b8">0</text>

                            {/* Render Parabola Path */}
                            <path
                              d={(() => {
                                let d = "";
                                // Map scale: 100 is (0,0). Each 1 unit = 10 pixels.
                                // so X maps from -10 to 10 (which is 0 to 200px)
                                for (let px = 0; px <= 200; px += 2) {
                                  const x = (px - 100) / 10; // mathematical x (-10 to 10)
                                  const y = quadA * x * x + quadB * x + quadC; // mathematical y
                                  const py = 100 - y * 5; // mathematical y to SVG y coordinate (scaled by 5 to fit)
                                  
                                  if (py >= 0 && py <= 200) {
                                    if (d === "") d += `M ${px} ${py}`;
                                    else d += ` L ${px} ${py}`;
                                  }
                                }
                                return d;
                              })()}
                              fill="none"
                              stroke="#6366f1"
                              strokeWidth="2.5"
                              className="transition-all duration-300"
                            />

                            {/* Draw roots if they exist */}
                            {(() => {
                              const D = quadB * quadB - 4 * quadA * quadC;
                              if (D >= 0) {
                                const r1 = (-quadB + Math.sqrt(D)) / (2 * quadA);
                                const r2 = (-quadB - Math.sqrt(D)) / (2 * quadA);
                                // Map roots onto X SVG coordinates: xVal * 10 + 100
                                const rx1 = r1 * 10 + 100;
                                const rx2 = r2 * 10 + 100;
                                return (
                                  <>
                                    {rx1 >= 0 && rx1 <= 200 && (
                                      <circle cx={rx1} cy="100" r="4.5" fill="#ef4444" className="animate-pulse" />
                                    )}
                                    {rx2 >= 0 && rx2 <= 200 && (
                                      <circle cx={rx2} cy="100" r="4.5" fill="#ef4444" className="animate-pulse" />
                                    )}
                                  </>
                                );
                              }
                              return null;
                            })()}
                          </svg>
                          <div className="absolute top-2 right-2 text-[8px] bg-background/80 px-2 py-0.5 border rounded">Grid scale: 1 div = 1 unit</div>
                        </div>

                        {/* Slider controls */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>Coefficient a: {quadA}</span>
                            </div>
                            <Slider
                              value={[quadA]}
                              min={-3}
                              max={3}
                              step={0.5}
                              onValueChange={(val) => {
                                if (val[0] !== 0) setQuadA(val[0]);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>Coefficient b: {quadB}</span>
                            </div>
                            <Slider
                              value={[quadB]}
                              min={-8}
                              max={8}
                              step={0.5}
                              onValueChange={(val) => setQuadB(val[0])}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>Constant c: {quadC}</span>
                            </div>
                            <Slider
                              value={[quadC]}
                              min={-8}
                              max={8}
                              step={1}
                              onValueChange={(val) => setQuadC(val[0])}
                            />
                          </div>

                          {/* Calculated Roots Details */}
                          <div className="p-3 bg-muted/40 border rounded-xl text-xs space-y-1">
                            <div>Equation: <strong className="text-primary">{quadA}x² + ({quadB})x + ({quadC}) = 0</strong></div>
                            {(() => {
                              const D = quadB * quadB - 4 * quadA * quadC;
                              if (D > 0) {
                                const r1 = (-quadB + Math.sqrt(D)) / (2 * quadA);
                                const r2 = (-quadB - Math.sqrt(D)) / (2 * quadA);
                                return (
                                  <>
                                    <div className="text-success font-semibold">Discriminant D = {D.toFixed(1)} &gt; 0 (Two Real Roots)</div>
                                    <div>Roots: <code className="bg-background px-1.5 py-0.5 rounded font-mono">x₁ = {r1.toFixed(2)}</code>, <code className="bg-background px-1.5 py-0.5 rounded font-mono">x₂ = {r2.toFixed(2)}</code></div>
                                  </>
                                );
                              } else if (D === 0) {
                                const r = -quadB / (2 * quadA);
                                return (
                                  <>
                                    <div className="text-warning font-semibold">Discriminant D = 0 (One Equal Real Root)</div>
                                    <div>Roots: <code className="bg-background px-1.5 py-0.5 rounded font-mono">x = {r.toFixed(2)}</code></div>
                                  </>
                                );
                              } else {
                                return (
                                  <div className="text-destructive font-semibold">Discriminant D = {D.toFixed(1)} &lt; 0 (No Real Roots - Parabola does not cross x-axis!)</div>
                                );
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : lesson.id === "l7" ? (
                // PHYSICS THERMODYNAMICS GAS SIMULATION
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <Flame className="h-4 w-4 text-destructive" /> Piston Thermodynamics Chamber
                      </CardTitle>
                      <CardDescription>
                        Alter gas temperature to watch kinetic particle speed increase and push the volume piston up.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* SVG Piston display */}
                        <div className="relative h-60 bg-background border border-border/40 rounded-2xl flex items-center justify-center p-4 overflow-hidden">
                          {/* Ideal Gas relation: V = k*T (constant Pressure). Piston height depends directly on T. */}
                          {/* Map T (100 to 500) to Piston Y position (140 down to 40) */}
                          {(() => {
                            const pY = 160 - ((thermoTemp - 100) / 400) * 110;
                            return (
                              <svg viewBox="0 0 200 200" className="w-full h-full max-w-[160px]">
                                {/* Chamber Walls */}
                                <rect x="30" y="20" width="140" height="160" fill="none" stroke="#475569" strokeWidth="4" />
                                
                                {/* Chamber Gas Area */}
                                <rect x="32" y={pY + 4} width="136" height={176 - pY} fill="#ef4444" opacity={0.03 + ((thermoTemp - 100) / 400) * 0.12} />

                                {/* Movable Piston */}
                                <g transform={`translate(0, ${pY})`} className="transition-all duration-300">
                                  <rect x="32" y="-4" width="136" height="8" fill="#64748b" stroke="#334155" strokeWidth="1" />
                                  <rect x="96" y="-80" width="8" height="80" fill="#475569" />
                                </g>

                                {/* Heating Fire mockup at the bottom */}
                                <g transform="translate(100, 185)">
                                  <circle cx="-15" cy="0" r={4 + (thermoTemp / 100)} fill="#f59e0b" opacity={thermoTemp > 250 ? 0.8 : 0.2} />
                                  <circle cx="0" cy="-3" r={5 + (thermoTemp / 80)} fill="#ef4444" opacity={thermoTemp > 150 ? 0.9 : 0.1} />
                                  <circle cx="15" cy="0" r={4 + (thermoTemp / 100)} fill="#f59e0b" opacity={thermoTemp > 250 ? 0.8 : 0.2} />
                                </g>

                                {/* Interactive bouncing molecules (SVG dots with keyframes or simple positions) */}
                                <g>
                                  {/* Speed of bouncing simulated via translation loops depending on Temp */}
                                  {[
                                    { cx: 50, cy: 150, dx: 10, dy: -12 },
                                    { cx: 100, cy: 160, dx: -8, dy: 15 },
                                    { cx: 140, cy: 140, dx: 15, dy: -5 },
                                    { cx: 80, cy: 120, dx: -12, dy: -10 },
                                    { cx: 120, cy: 110, dx: 5, dy: 12 }
                                  ].map((mol, idx) => {
                                    // Bouncing bounds depend on piston Y limit (pY)
                                    // Render molecules inside boundaries. Bouncing is simulated with simple CSS pulse.
                                    return (
                                      <circle
                                        key={idx}
                                        cx={mol.cx}
                                        cy={mol.cy > pY + 10 ? mol.cy : pY + 20}
                                        r="3"
                                        fill="#3b82f6"
                                        className="transition-all duration-300"
                                        style={{
                                          animation: `ping ${1.5 - (thermoTemp / 400)}s infinite ease-in-out`
                                        }}
                                      />
                                    );
                                  })}
                                </g>
                              </svg>
                            );
                          })()}
                        </div>

                        {/* Control interface */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>Temperature (T)</span>
                              <span className="bg-card px-2 py-0.5 border rounded text-destructive font-bold">{thermoTemp} K</span>
                            </div>
                            <Slider
                              value={[thermoTemp]}
                              min={100}
                              max={500}
                              step={20}
                              onValueChange={(val) => setThermoTemp(val[0])}
                            />
                          </div>

                          {/* Ideal Gas relation HUD metrics */}
                          <div className="p-3 bg-muted/40 border rounded-xl text-xs space-y-2">
                            <div className="flex justify-between">
                              <span>Gas Temperature (T):</span>
                              <strong>{thermoTemp} K</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Chamber Volume (V):</span>
                              <strong>{((thermoTemp / 300) * 1.5).toFixed(2)} Liters</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Internal Energy (U):</span>
                              <strong className="text-destructive">{(1.5 * 8.314 * thermoTemp / 10).toFixed(0)} Joules</strong>
                            </div>
                          </div>

                          <div className="text-[10px] text-muted-foreground leading-relaxed">
                            <strong>Thermodynamics Principle:</strong> According to Charles's Law, at constant Pressure, Volume is directly proportional to Temperature (V ∝ T). Heating the gas increases molecular speed, which increases the kinetic force collisions and expands the piston.
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                // BIOLOGY PHOTOSYNTHESIS CHAMBER
                <div className="space-y-6">
                  <Card className="border-border/80 bg-accent/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-green-500" /> Chloroplast Cycle: 6CO₂ + 6H₂O ➔ C₆H₁₂O₆ + 6O₂
                      </CardTitle>
                      <CardDescription>
                        Change Sun Intensity & Carbon Dioxide levels to watch the photosynthetic sugar production change.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* SVG leaf representation */}
                        <div className="relative h-60 bg-background border border-border/40 rounded-2xl flex items-center justify-center p-4 overflow-hidden">
                          <svg viewBox="0 0 200 200" className="w-full h-full max-w-[160px]">
                            {/* Sun rays mockup (opacity based on light intensity) */}
                            <circle cx="170" cy="30" r="15" fill="#f59e0b" opacity={0.1 + (photoLight / 100) * 0.9} />
                            <line x1="150" y1="45" x2="120" y2="70" stroke="#f59e0b" strokeWidth="2" opacity={photoLight / 100} />
                            <line x1="170" y1="55" x2="170" y2="90" stroke="#f59e0b" strokeWidth="2" opacity={photoLight / 100} />
                            
                            {/* Leaf */}
                            <path
                              d="M 20 150 C 40 100, 100 80, 160 100 C 140 150, 80 170, 20 150 Z"
                              fill="#22c55e"
                              stroke="#15803d"
                              strokeWidth="2.5"
                              className="transition-all duration-300"
                              opacity={0.5 + (photoLight / 200)}
                            />
                            {/* Leaf Veins */}
                            <path d="M 20 150 L 160 100" stroke="#16a34a" strokeWidth="2" />
                            <path d="M 60 135 L 75 110" stroke="#16a34a" strokeWidth="1.5" />
                            <path d="M 100 120 L 115 95" stroke="#16a34a" strokeWidth="1.5" />

                            {/* Bouncing Oxygen bubbles when reaction active */}
                            {photoActive && (
                              <g>
                                <circle cx="80" cy="70" r="4" fill="#38bdf8" opacity="0.6" className="animate-bounce" style={{ animationDuration: "1s" }} />
                                <circle cx="110" cy="65" r="5" fill="#38bdf8" opacity="0.6" className="animate-bounce" style={{ animationDuration: "1.4s" }} />
                                <circle cx="130" cy="50" r="3" fill="#38bdf8" opacity="0.6" className="animate-bounce" style={{ animationDuration: "0.8s" }} />
                              </g>
                            )}
                          </svg>

                          <div className="absolute top-3 left-4 bg-background/80 backdrop-blur border px-2 py-0.5 rounded text-[10px] font-semibold text-green-600">
                            {photoActive ? "● Reaction Running" : "○ Idle"}
                          </div>
                        </div>

                        {/* Controls interface */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>Sunlight Intensity: {photoLight}%</span>
                            </div>
                            <Slider
                              value={[photoLight]}
                              min={0}
                              max={100}
                              step={5}
                              onValueChange={(val) => setPhotoLight(val[0])}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>Carbon Dioxide (CO₂): {photoCO2}%</span>
                            </div>
                            <Slider
                              value={[photoCO2]}
                              min={0}
                              max={100}
                              step={5}
                              onValueChange={(val) => setPhotoCO2(val[0])}
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              className={cn("flex-1", photoActive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-green-600 hover:bg-green-700 text-white")}
                              onClick={() => setPhotoActive(!photoActive)}
                            >
                              {photoActive ? "Stop Reaction" : "Start Reaction"}
                            </Button>
                          </div>

                          {/* Photosynthetic rate output */}
                          <div className="p-3 bg-muted/40 border rounded-xl text-xs space-y-1">
                            {/* Photosynthesis rate is limiting: min of light and CO2 */}
                            {(() => {
                              const rate = photoActive ? Math.min(photoLight, photoCO2) : 0;
                              return (
                                <>
                                  <div className="flex justify-between">
                                    <span>Rate of Photosynthesis:</span>
                                    <strong className={rate > 70 ? "text-green-600" : "text-primary"}>{rate}%</strong>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Glucose (C₆H₁₂O₆) Output:</span>
                                    <span>{(rate * 0.12).toFixed(2)} mg/min</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Oxygen (O₂) Output:</span>
                                    <span>{(rate * 0.08).toFixed(2)} ml/min</span>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
