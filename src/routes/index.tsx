import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Globe2, Brain, TrendingUp, Languages, Headphones, Trophy, ArrowRight, Check, Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const FEATURES = [
  { icon: Languages, title: "5+ Regional Languages", desc: "Learn in English, Hindi, Gujarati, Tamil, or Marathi — instantly." },
  { icon: Brain, title: "AI-Powered Adaptation", desc: "Lessons adjust to your pace, strengths, and areas that need more practice." },
  { icon: Headphones, title: "Listen & Learn", desc: "Text-to-speech in your language for hands-free learning anywhere." },
  { icon: TrendingUp, title: "Track Progress", desc: "Detailed analytics show mastery, streaks, and personal growth over time." },
  { icon: Trophy, title: "Gamified Journey", desc: "Earn badges, keep streaks, and stay motivated with adaptive quizzes." },
  { icon: Globe2, title: "Built for India", desc: "Curriculum-aligned STEM content designed for regional classrooms." },
];

const STEPS = [
  { n: "01", title: "Pick your language", desc: "Choose from 5 regional languages. Switch anytime." },
  { n: "02", title: "Learn with AI", desc: "Get explanations, examples, and translations powered by AI." },
  { n: "03", title: "Practice & grow", desc: "Adaptive quizzes identify weak topics and recommend next lessons." },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Student, Grade 10", quote: "Learning physics in Hindi finally clicked for me. My marks jumped in one term." },
  { name: "Rohan M.", role: "Student, Grade 9", quote: "The AI quizzes know exactly where I struggle. It's like having a personal tutor." },
  { name: "Ms. Kavitha", role: "Teacher, Chennai", quote: "My students engage far more when lessons are in Tamil. Game-changer for STEM." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-soft">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-base font-bold">Vernacular STEM</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild><Link to="/auth">Log in</Link></Button>
            <Button size="sm" asChild><Link to="/auth">Get Started</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.18_245/0.15),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 gap-1.5 rounded-full px-3 py-1">
              <Sparkles className="h-3 w-3" /> AI-Powered Adaptive Learning
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Learn STEM in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Language</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              An adaptive learning platform that translates STEM lessons into regional languages
              and personalizes each step based on how you learn best.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild className="gap-2 shadow-soft">
                <Link to="/auth">Get Started <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">See a Demo</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["English", "हिन्दी", "ગુજરાતી", "தமிழ்", "मराठी"].map((l) => (
                <span key={l} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-success" /> {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to master STEM</h2>
          <p className="mt-3 text-muted-foreground">Built for students who deserve to learn in their own voice.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="border-border/60 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
              <CardContent className="p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to personalized learning.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <Card key={s.n} className="relative overflow-hidden border-border/60 shadow-card">
                <CardContent className="p-8">
                  <div className="text-5xl font-extrabold text-primary/15">{s.n}</div>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Loved by students & teachers</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="border-border/60 shadow-card">
              <CardContent className="p-6">
                <div className="mb-3 flex text-warning">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-sm">"{t.quote}"</p>
                <div className="mt-4 border-t border-border pt-4">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-soft">
          <CardContent className="p-10 text-center sm:p-14">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to learn in your language?</h2>
            <p className="mx-auto mt-3 max-w-xl opacity-90">Join thousands of students mastering STEM every day.</p>
            <Button size="lg" variant="secondary" asChild className="mt-6 gap-2">
              <Link to="/auth">Start Learning Free <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-bold">Vernacular STEM</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">STEM education, translated.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Lessons", "Pricing"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Support", links: ["Help Center", "Contact", "Privacy"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="mb-3 text-sm font-semibold">{col.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {col.links.map((l) => <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © 2026 Vernacular STEM. Built with care for learners everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
}
