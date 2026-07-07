import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Clock, Languages, BookOpen, ArrowRight } from "lucide-react";
import { LESSONS, SUBJECTS, DIFFICULTIES, LANGUAGES } from "@/lib/mock-data";

export const Route = createFileRoute("/lessons")({
  head: () => ({ meta: [{ title: "Lessons — Vernacular STEM" }] }),
  component: () => <AppShell><Lessons /></AppShell>,
});

function Lessons() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [language, setLanguage] = useState("all");

  const filtered = useMemo(() => LESSONS.filter((l) => {
    if (q && !l.title.toLowerCase().includes(q.toLowerCase()) && !l.subject.toLowerCase().includes(q.toLowerCase())) return false;
    if (subject !== "all" && l.subject !== subject) return false;
    if (difficulty !== "all" && l.difficulty !== difficulty) return false;
    if (language !== "all" && l.language !== language) return false;
    return true;
  }), [q, subject, difficulty, language]);

  const diffColor = (d: string) => d === "Beginner" ? "bg-success/10 text-success" : d === "Intermediate" ? "bg-primary/10 text-primary" : "bg-warning/15 text-warning-foreground";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lessons</h1>
        <p className="mt-1 text-muted-foreground">Explore STEM lessons in your preferred language.</p>
      </div>

      {/* Filters */}
      <Card className="border-border/60 shadow-card">
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="relative md:col-span-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search lessons..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All difficulties</SelectItem>
                {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger><SelectValue placeholder="Language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All languages</SelectItem>
                {LANGUAGES.map((l) => <SelectItem key={l.code} value={l.label.split(" ")[0]}>{l.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
              <BookOpen className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">No lessons found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <Card key={l.id} className="group overflow-hidden border-border/60 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
              <CardContent className="p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{l.subject}</Badge>
                  <Badge className={`border-0 text-xs ${diffColor(l.difficulty)}`}>{l.difficulty}</Badge>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary">{l.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{l.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {l.duration} min</span>
                  <span className="flex items-center gap-1"><Languages className="h-3.5 w-3.5" /> {l.language}</span>
                </div>
                {(l.progress ?? 0) > 0 && (
                  <div className="mt-3">
                    <Progress value={l.progress} className="h-1.5" />
                    <div className="mt-1 text-xs text-muted-foreground">{l.progress}% complete</div>
                  </div>
                )}
                <Button asChild className="mt-4 w-full gap-2">
                  <Link to="/lesson/$id" params={{ id: l.id }}>
                    {(l.progress ?? 0) > 0 ? "Continue" : "Start Lesson"} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
