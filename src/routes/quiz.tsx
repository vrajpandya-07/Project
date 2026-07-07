import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Timer, CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy, ArrowLeft } from "lucide-react";
import { QUIZ_QUESTIONS, LESSONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Quiz — Vernacular STEM" }] }),
  component: () => <AppShell><QuizPage /></AppShell>,
});

function QuizPage() {
  const { progress, recordQuizResult } = useProgress();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<Array<number | null>>(Array(QUIZ_QUESTIONS.length).fill(null));
  const [showHint, setShowHint] = useState(false);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setTime((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [done]);

  const q = QUIZ_QUESTIONS[idx];
  const isAnswered = selected !== null;
  const correct = isAnswered && selected === q.correct;

  const submit = (i: number) => {
    if (isAnswered) return;
    setSelected(i);
    const next = [...answered]; next[idx] = i; setAnswered(next);
  };

  const next = () => {
    if (idx < QUIZ_QUESTIONS.length - 1) {
      setIdx(idx + 1); setSelected(null); setShowHint(false);
    } else {
      const finalScore = answered.reduce((acc: number, a, i) => acc + (a === QUIZ_QUESTIONS[i].correct ? 1 : 0), 0);
      const pct = Math.round((finalScore / QUIZ_QUESTIONS.length) * 100);
      const strong = answered.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).map((a, i) => QUIZ_QUESTIONS[i].topic);
      const weak = answered.filter((a, i) => a !== null && a !== QUIZ_QUESTIONS[i].correct).map((a, i) => QUIZ_QUESTIONS[i].topic);
      recordQuizResult(pct, strong, weak);
      setDone(true);
    }
  };

  const restart = () => {
    setIdx(0); setSelected(null); setAnswered(Array(QUIZ_QUESTIONS.length).fill(null)); setShowHint(false); setTime(0); setDone(false);
  };

  const score = answered.reduce((acc: number, a, i) => acc + (a === QUIZ_QUESTIONS[i].correct ? 1 : 0), 0);
  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  if (done) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-soft">
          <CardContent className="p-8 text-center sm:p-12">
            <Trophy className="mx-auto h-14 w-14" />
            <h1 className="mt-4 text-3xl font-bold">Quiz complete!</h1>
            <div className="mt-6 text-6xl font-extrabold">{pct}%</div>
            <p className="mt-2 opacity-90">{score} out of {QUIZ_QUESTIONS.length} correct · {mm}:{ss}</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/60 shadow-card">
            <CardContent className="p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4 text-success" /> Strong topics</h3>
              <div className="flex flex-wrap gap-2">{progress.strongTopics.map((t) => <Badge key={t} className="border-0 bg-success/10 text-success">{t}</Badge>)}</div>
            </CardContent>
          </Card>
          <Card className="border-border/60 shadow-card">
            <CardContent className="p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold"><XCircle className="h-4 w-4 text-warning" /> Weak topics</h3>
              <div className="flex flex-wrap gap-2">{progress.weakTopics.map((t) => <Badge key={t} className="border-0 bg-warning/15 text-warning-foreground">{t}</Badge>)}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="border-border/60 shadow-card">
          <CardContent className="p-5">
            <h3 className="mb-3 font-semibold">Recommended next lessons</h3>
            <div className="space-y-2">
              {LESSONS.slice(0, 3).map((l) => (
                <Link key={l.id} to="/lesson/$id" params={{ id: l.id }} className="flex items-center justify-between rounded-xl border border-border/60 p-3 transition-colors hover:border-primary/40 hover:bg-accent/30">
                  <div><div className="text-sm font-medium">{l.title}</div><div className="text-xs text-muted-foreground">{l.subject} · {l.duration} min</div></div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <Button onClick={restart} className="gap-2 flex-1"><RotateCcw className="h-4 w-4" /> Retry Quiz</Button>
          <Button variant="outline" asChild className="flex-1"><Link to="/dashboard">Back to dashboard</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2"><Link to="/dashboard"><ArrowLeft className="h-4 w-4" /> Exit quiz</Link></Button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Adaptive Quiz</h1>
          <p className="text-sm text-muted-foreground">Question {idx + 1} of {QUIZ_QUESTIONS.length}</p>
        </div>
        <Badge variant="outline" className="gap-1.5 px-3 py-1.5"><Timer className="h-3.5 w-3.5" /> {mm}:{ss}</Badge>
      </div>

      <Progress value={((idx + (isAnswered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100} className="h-2" />

      <Card className="border-border/60 shadow-card">
        <CardContent className="p-6 sm:p-8">
          <Badge variant="secondary" className="mb-3">{q.topic}</Badge>
          <h2 className="text-xl font-semibold sm:text-2xl">{q.question}</h2>

          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              const isCorrect = isAnswered && i === q.correct;
              const isWrong = isAnswered && i === selected && i !== q.correct;
              return (
                <button
                  key={i}
                  onClick={() => submit(i)}
                  disabled={isAnswered}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                    !isAnswered && "border-border hover:border-primary hover:bg-accent/30",
                    isCorrect && "border-success bg-success/10",
                    isWrong && "border-destructive bg-destructive/10",
                    isAnswered && !isCorrect && !isWrong && "opacity-60"
                  )}
                >
                  <div className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 text-sm font-semibold",
                    !isAnswered && "border-border",
                    isCorrect && "border-success bg-success text-success-foreground",
                    isWrong && "border-destructive bg-destructive text-destructive-foreground",
                  )}>
                    {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : isWrong ? <XCircle className="h-4 w-4" /> : String.fromCharCode(65 + i)}
                  </div>
                  <span className="font-medium">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={cn(
              "mt-6 rounded-xl border p-4 animate-in fade-in slide-in-from-bottom-2",
              correct ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"
            )}>
              <div className={cn("flex items-center gap-2 font-semibold", correct ? "text-success" : "text-destructive")}>
                {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {correct ? "Correct!" : "Not quite."}
              </div>
              <p className="mt-2 text-sm text-foreground/80">{q.explanation}</p>
            </div>
          )}

          {/* Hint */}
          {!isAnswered && showHint && (
            <div className="mt-4 flex gap-2 rounded-xl border border-warning/40 bg-warning/5 p-4 text-sm">
              <Lightbulb className="h-4 w-4 shrink-0 text-warning" />
              <span>{q.hint}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between gap-3">
        <Button variant="outline" className="gap-2" onClick={() => setShowHint(true)} disabled={isAnswered || showHint}>
          <Lightbulb className="h-4 w-4" /> Hint
        </Button>
        <Button onClick={next} disabled={!isAnswered} className="gap-2">
          {idx === QUIZ_QUESTIONS.length - 1 ? "Finish" : "Next Question"} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
