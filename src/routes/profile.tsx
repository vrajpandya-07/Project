import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Moon, Sun, Bell, Palette } from "lucide-react";
import { LANGUAGES, STUDENT, DIFFICULTIES } from "@/lib/mock-data";
import { useTheme } from "@/lib/theme";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Vernacular STEM" }] }),
  component: () => <AppShell><Profile /></AppShell>,
});

function Profile() {
  const { theme, toggle } = useTheme();
  const [lang, setLang] = useState("en");
  const [level, setLevel] = useState<string>("Intermediate");
  const [notif, setNotif] = useState({ daily: true, quiz: true, marketing: false });
  const navigate = useNavigate();
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
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile & Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your learning preferences and account.</p>
      </div>

      {/* Student info */}
      <Card className="border-border/60 shadow-card">
        <CardContent className="flex flex-wrap items-center gap-5 p-6">
          <Avatar className="h-20 w-20 border-4 border-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-primary-foreground">
              {student.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <p className="mt-1 text-sm">{student.level} · {student.streak}-day streak 🔥</p>
          </div>
          <Button variant="outline">Edit profile</Button>
        </CardContent>
      </Card>

      {/* Student information form */}
      <Card className="border-border/60 shadow-card">
        <CardHeader><CardTitle>Student information</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>Full name</Label><Input key={`name-${student.name}`} defaultValue={student.name} /></div>
          <div className="space-y-2"><Label>Email</Label><Input key={`email-${student.email}`} defaultValue={student.email} /></div>
          <div className="space-y-2">
            <Label>Learning level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Preferred language</Label>
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{LANGUAGES.map((l) => <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card className="border-border/60 shadow-card">
        <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5" /> Theme</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-xl border border-border/60 p-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <div className="font-medium">{theme === "dark" ? "Dark mode" : "Light mode"}</div>
                <div className="text-xs text-muted-foreground">Switch between light and dark appearance.</div>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggle} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border/60 shadow-card">
        <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "daily", label: "Daily learning reminders", desc: "A gentle nudge to keep your streak going." },
            { key: "quiz", label: "Quiz results", desc: "Get notified when quiz results are ready." },
            { key: "marketing", label: "Product updates", desc: "New features, courses, and improvements." },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between rounded-xl border border-border/60 p-4">
              <div className="min-w-0"><div className="font-medium">{n.label}</div><div className="text-xs text-muted-foreground">{n.desc}</div></div>
              <Switch checked={notif[n.key as keyof typeof notif]} onCheckedChange={(v) => setNotif((prev) => ({ ...prev, [n.key]: v }))} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save + logout */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
        <Button variant="outline" className="gap-2 text-destructive hover:text-destructive" onClick={() => {
          localStorage.removeItem("user");
          toast.success("Signed out");
          setTimeout(() => navigate({ to: "/auth" }), 300);
        }}>
          <LogOut className="h-4 w-4" /> Log out
        </Button>
      </div>
    </div>
  );
}
