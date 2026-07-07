import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Flame, Clock, Target, Trophy } from "lucide-react";
import { WEEKLY_DATA, MONTHLY_DATA, TOPIC_MASTERY, BADGES, STREAK_CALENDAR } from "@/lib/mock-data";
import { useProgress } from "@/hooks/use-progress";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar,
} from "recharts";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "Progress — Vernacular STEM" }] }),
  component: () => <AppShell><ProgressPage /></AppShell>,
});

function Stat({ icon: Icon, label, value, tone }: any) {
  const tones: Record<string, string> = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/15",
    secondary: "text-secondary bg-secondary/10",
  };
  return (
    <Card className="border-border/60 shadow-card">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}><Icon className="h-5 w-5" /></div>
        <div className="min-w-0"><div className="text-sm text-muted-foreground">{label}</div><div className="text-xl font-bold">{value}</div></div>
      </CardContent>
    </Card>
  );
}

function ProgressPage() {
  const { progress } = useProgress();
  
  const avgAccuracy = progress.quizzesPassed.length > 0 
    ? Math.round(progress.quizzesPassed.reduce((acc, q) => acc + q.score, 0) / progress.quizzesPassed.length) 
    : 0;
    
  const timeThisWeek = `${Math.floor((progress.lessonsCompleted.length * 30) / 60)}h ${(progress.lessonsCompleted.length * 30) % 60}m`;
  
  const dynamicBadges = BADGES.map(b => {
    if (b.name === "First Steps") return { ...b, earned: progress.lessonsCompleted.length > 0 };
    if (b.name === "7-Day Streak") return { ...b, earned: progress.streakDays >= 7 };
    if (b.name === "Quiz Master") return { ...b, earned: progress.quizzesPassed.length >= 3 };
    if (b.name === "Perfect Score") return { ...b, earned: progress.quizzesPassed.some(q => q.score === 100) };
    return { ...b, earned: false };
  });
  
  const earnedBadges = dynamicBadges.filter(b => b.earned).length;

  const dynamicMastery = [
    ...progress.strongTopics.map(t => ({ topic: t, mastery: 85 })),
    ...progress.weakTopics.map(t => ({ topic: t, mastery: 40 }))
  ];
  const topicsToDisplay = dynamicMastery.length > 0 ? dynamicMastery : TOPIC_MASTERY;

  const today = new Date().getDate();
  const streakCalendar = Array.from({ length: 35 }, (_, i) => ({
    day: i + 1,
    active: i + 1 <= today && i + 1 > today - progress.streakDays,
  }));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress Analytics</h1>
        <p className="mt-1 text-muted-foreground">Track your learning journey and celebrate every milestone.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Flame} label="Current streak" value={`${progress.streakDays} days`} tone="warning" />
        <Stat icon={Clock} label="Time this week" value={timeThisWeek} tone="primary" />
        <Stat icon={Target} label="Avg. accuracy" value={`${avgAccuracy}%`} tone="success" />
        <Stat icon={Trophy} label="Badges earned" value={`${earnedBadges}/${dynamicBadges.length}`} tone="secondary" />
      </div>

      {/* Learning chart */}
      <Card className="border-border/60 shadow-card">
        <CardHeader><CardTitle>Learning activity</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="week">
            <TabsList><TabsTrigger value="week">Weekly</TabsTrigger><TabsTrigger value="month">Monthly</TabsTrigger></TabsList>
            <TabsContent value="week" className="mt-4">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={WEEKLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                    <Line type="monotone" dataKey="minutes" stroke="var(--primary)" strokeWidth={3} dot={{ fill: "var(--primary)", r: 5 }} />
                    <Line type="monotone" dataKey="score" stroke="var(--secondary)" strokeWidth={3} dot={{ fill: "var(--secondary)", r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="month" className="mt-4">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                    <Bar dataKey="hours" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Topic mastery */}
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle>Topic mastery</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {topicsToDisplay.map((t) => (
              <div key={t.topic}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{t.topic}</span>
                  <span className="text-muted-foreground">{t.mastery}%</span>
                </div>
                <Progress value={t.mastery} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Streak calendar */}
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle>Streak calendar</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {streakCalendar.map((d) => (
                <div key={d.day} className={`aspect-square rounded-lg text-xs font-medium grid place-items-center transition-colors ${
                  d.active ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-card" : "bg-muted text-muted-foreground"
                }`}>{d.day}</div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-gradient-to-br from-primary to-secondary" /> Active</span>
              <span className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-muted" /> Inactive</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card className="border-border/60 shadow-card">
        <CardHeader><CardTitle>Achievement badges</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {dynamicBadges.map((b) => (
              <div key={b.id} className={`flex flex-col items-center rounded-2xl border p-4 text-center transition-all ${
                b.earned ? "border-primary/30 bg-primary/5 hover:-translate-y-1" : "border-border/60 opacity-40"
              }`}>
                <div className="text-4xl">{b.icon}</div>
                <div className="mt-2 text-xs font-medium">{b.name}</div>
                {b.earned && <Badge className="mt-2 border-0 bg-success/10 text-success text-[10px]">Earned</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
