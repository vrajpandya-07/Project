import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Auth — Vernacular STEM" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();

  // STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [forgot, setForgot] = useState(false);

  // RESET STATE (optional simple handler)
  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  // AUTH HANDLER
  const submit = async (e: React.FormEvent, type: "login" | "signup") => {
    e.preventDefault();

    const url =
      type === "login"
        ? "http://localhost:5000/login"
        : "http://localhost:5000/signup";

    const body =
      type === "login"
        ? { email, password }
        : { name, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success(data.message || "Success");

      if (type === "login" && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else if (type === "signup") {
        localStorage.setItem("user", JSON.stringify({ name, email }));
      }

      resetFields();

      // Small delay to let toast be visible
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 500);
    } catch (err) {
      toast.error("Server not running");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary to-secondary text-white">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 grid place-items-center rounded-xl bg-white/20">
            <Sparkles />
          </div>
          <span className="font-bold text-lg">Vernacular STEM</span>
        </Link>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Learn STEM in your language
          </h1>
          <p className="mt-3 opacity-90">
            Adaptive micro-learning for every student
          </p>
        </div>

        <p className="text-sm opacity-70">© 2026</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          {forgot ? (
            <Card>
              <CardContent className="p-6">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const res = await fetch("http://localhost:5000/forgot-password", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }),
                      });
                      const data = await res.json();
                      if (!res.ok) {
                        toast.error(data.error || "Password reset failed");
                        return;
                      }
                      toast.success(data.message || "Reset link sent successfully");
                      setForgot(false);
                    } catch (err) {
                      toast.error("Server not running");
                    }
                  }}
                  className="space-y-4"
                >
                  <h1 className="text-xl font-bold">Reset Password</h1>

                  <div className="space-y-1">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">Send Reset Link</Button>

                  <button
                    type="button"
                    className="text-sm text-blue-500 block hover:underline"
                    onClick={() => setForgot(false)}
                  >
                    Back to login
                  </button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">

                <h1 className="text-2xl font-bold mb-4">
                  Welcome
                </h1>

                <Tabs defaultValue="login" onValueChange={() => resetFields()}>

                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                  </TabsList>

                  {/* LOGIN */}
                  <TabsContent value="login">
                    <form
                      onSubmit={(e) => submit(e, "login")}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <Button type="submit" className="w-full">Login</Button>
                    </form>

                    <button
                      className="text-xs text-blue-500 mt-2"
                      onClick={() => setForgot(true)}
                    >
                      Forgot password?
                    </button>
                  </TabsContent>

                  {/* SIGNUP */}
                  <TabsContent value="signup">
                    <form
                      onSubmit={(e) => submit(e, "signup")}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="signup-name">Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          autoComplete="name"
                          required
                          minLength={2}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          autoComplete="new-password"
                          required
                          minLength={6}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Create account
                      </Button>
                    </form>
                  </TabsContent>

                </Tabs>

              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}