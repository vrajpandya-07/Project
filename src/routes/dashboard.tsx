import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, BookOpen, Target, TrendingUp, ArrowRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { STUDENT, LESSONS } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Vernacular STEM" }] }),
  component: () => <AppShell><Dashboard /></AppShell>,
});

function StatCard({ icon: Icon, label, value, sub, tone = "primary" }: any) {
  const tones: Record<string, string> = {
    primary: "from-primary/10 to-primary/5 text-primary",
    success: "from-success/10 to-success/5 text-success",
    warning: "from-warning/15 to-warning/5 text-warning",
    secondary: "from-secondary/10 to-secondary/5 text-secondary",
  };
  return (
    <Card className="border-border/60 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-1 text-2xl font-bold">{value}</div>
            {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
          </div>
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { progress, getOverallProgress, getMasteryLevel } = useProgress();
  
  const lessonsWithProgress = LESSONS.map(l => {
    const p = progress.inProgressLessons.find(ip => ip.id === l.id)?.progress || 
             (progress.lessonsCompleted.includes(l.id) ? 100 : 0);
    return { ...l, progress: p };
  });

  const inProgress = lessonsWithProgress.filter((l) => l.progress > 0 && l.progress < 100).slice(0, 3);
  const recommended = lessonsWithProgress.filter((l) => l.progress === 0).slice(0, 3);

  const [student, setStudent] = useState(STUDENT);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const u = JSON.parse(userStr);
          setStudent({
            ...STUDENT,
            name: u.name || STUDENT.name,
            email: u.email || STUDENT.email,
            avatar: u.name ? u.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "US",
          });
        } catch (e) {}
      }
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Welcome */}
      <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-6 text-primary-foreground shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm opacity-90">Welcome back,</div>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{student.name} 👋</h1>
            <p className="mt-1 max-w-xl text-sm opacity-90">You're doing great! Keep the streak alive and finish today's lesson.</p>
          </div>
          <Button size="lg" variant="secondary" asChild className="gap-2">
            <Link to="/lessons">Continue Learning <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-6">
          <div className="mb-1.5 flex items-center justify-between text-xs opacity-90">
            <span>Overall progress</span>
            <span className="font-semibold">{getOverallProgress()}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${getOverallProgress()}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Flame} label="Learning streak" value={`${progress.streakDays} days`} sub={progress.streakDays > 0 ? "Keep it going!" : "Start learning today"} tone="warning" />
        <StatCard icon={BookOpen} label="Lessons complete" value={progress.lessonsCompleted.length.toString()} sub={`of ${LESSONS.length} lessons`} tone="primary" />
        <StatCard icon={Trophy} label="Quizzes passed" value={progress.quizzesPassed.length.toString()} sub={progress.quizzesPassed.length > 0 ? `Avg. ${Math.round(progress.quizzesPassed.reduce((a,b)=>a+b.score,0)/progress.quizzesPassed.length)}%` : "No quizzes yet"} tone="success" />
        <StatCard icon={Target} label="Mastery level" value={getMasteryLevel()} sub="Based on lessons" tone="secondary" />
      </div>

      {/* Continue learning */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 shadow-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Continue learning</CardTitle>
              <Button variant="ghost" size="sm" asChild><Link to="/lessons">View all</Link></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {inProgress.map((l) => (
              <Link key={l.id} to="/lesson/$id" params={{ id: l.id }} className="group block rounded-2xl border border-border/60 p-4 transition-all hover:border-primary/40 hover:bg-accent/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{l.subject}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {l.duration} min</span>
                    </div>
                    <div className="truncate font-semibold group-hover:text-primary">{l.title}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <Progress value={l.progress} className="h-1.5 flex-1" />
                      <span className="text-xs font-medium text-muted-foreground">{l.progress}%</span>
                    </div>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle>Recent quizzes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {progress.quizzesPassed.slice(0, 3).map((q) => (
              <div key={q.id} className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{q.title}</div>
                  <div className="text-xs text-muted-foreground">{q.date}</div>
                </div>
                <div className={`shrink-0 text-lg font-bold ${q.score >= 90 ? "text-success" : q.score >= 70 ? "text-primary" : "text-warning"}`}>
                  {q.score}%
                </div>
              </div>
            ))}
            {progress.quizzesPassed.length === 0 && (
              <div className="rounded-xl border border-border/60 border-dashed p-4 text-center text-sm text-muted-foreground">
                No quizzes taken yet.
              </div>
            )}
            <Button variant="outline" className="w-full" asChild><Link to="/quiz">Take a quiz</Link></Button>
          </CardContent>
        </Card>
      </div>

      {/* Topics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" /> Strong topics</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {progress.strongTopics.length > 0 ? progress.strongTopics.map((t) => (
              <Badge key={t} className="bg-success/10 text-success hover:bg-success/20 border-0 px-3 py-1.5">{t}</Badge>
            )) : <span className="text-sm text-muted-foreground">Take a quiz to see insights</span>}
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><AlertCircle className="h-5 w-5 text-warning" /> Weak topics</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {progress.weakTopics.length > 0 ? progress.weakTopics.map((t) => (
              <Badge key={t} className="border-0 bg-warning/15 text-warning-foreground hover:bg-warning/25 px-3 py-1.5">{t}</Badge>
            )) : <span className="text-sm text-muted-foreground">Take a quiz to see insights</span>}
          </CardContent>
        </Card>
      </div>

      {/* Recommended */}
      <Card className="border-border/60 shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Recommended for you</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((l) => (
            <Link key={l.id} to="/lesson/$id" params={{ id: l.id }} className="group block rounded-2xl border border-border/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card">
              <Badge variant="secondary" className="mb-2 text-xs">{l.subject}</Badge>
              <div className="font-semibold group-hover:text-primary">{l.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{l.difficulty} · {l.duration} min</div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
