import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Video,
  Monitor,
  Mic,
  Play,
  Pause,
  Square,
  Download,
  Trash2,
  Calendar,
  Clock,
  VideoOff,
  Sparkles,
  AlertCircle,
  FolderHeart,
  Save,
  Languages,
} from "lucide-react";
import { saveRecording, getRecordings, deleteRecording, type LocalRecording } from "@/lib/db";
import { LANGUAGES } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Validate optional query params for lesson context integration
const demoSearchSchema = z.object({
  lessonId: z.string().optional(),
  lessonTitle: z.string().optional(),
});

export const Route = createFileRoute("/demo")({
  validateSearch: (search) => demoSearchSchema.parse(search),
  head: () => ({ meta: [{ title: "Demo Recorder — Vernacular STEM" }] }),
  component: () => <AppShell><DemoPage /></AppShell>,
});

function DemoPage() {
  const search = Route.useSearch();
  const [isMounted, setIsMounted] = useState(false);

  // Recording State
  const [mode, setMode] = useState<"camera" | "screen">("camera");
  const [recordingState, setRecordingState] = useState<"idle" | "recording" | "paused" | "stopped">("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [lastBlob, setLastBlob] = useState<Blob | null>(null);

  // Form Fields
  const [videoTitle, setVideoTitle] = useState("");
  const [recordingLang, setRecordingLang] = useState("en");

  // Gallery
  const [recordings, setRecordings] = useState<LocalRecording[]>([]);
  const [activePlaybackUrl, setActivePlaybackUrl] = useState<string | null>(null);
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);

  // Refs
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Initialize page on client mount
  useEffect(() => {
    setIsMounted(true);
    loadSavedRecordings();
    
    // Set default title based on search parameters
    if (search.lessonTitle) {
      setVideoTitle(`${search.lessonTitle} Explanation`);
    } else {
      setVideoTitle("My STEM Demonstration");
    }

    return () => {
      cleanupStreams();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const loadSavedRecordings = async () => {
    try {
      const list = await getRecordings();
      setRecordings(list);
    } catch (e) {
      console.error(e);
    }
  };

  const cleanupStreams = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (sec: number) => {
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  // Start Capturing Media and Recording
  const startRecording = async () => {
    setPreviewUrl(null);
    setRecordedBlobs([]);
    setLastBlob(null);
    setRecordingTime(0);

    try {
      let captureStream: MediaStream;

      if (mode === "camera") {
        captureStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: "user" },
          audio: true,
        });
      } else {
        // Screen capture mode
        captureStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        // Try to inject voice microphone track too, so they can talk over screen share
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (micStream.getAudioTracks().length > 0) {
            captureStream.addTrack(micStream.getAudioTracks()[0]);
          }
        } catch (micErr) {
          toast.warning("Recording screen without microphone audio (microphone access denied).");
        }
      }

      setStream(captureStream);

      // Hook stream to live video element
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = captureStream;
        liveVideoRef.current.play().catch(() => {});
      }

      // Check supported recording formats
      let options = { mimeType: "video/webm;codecs=vp9" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: "video/webm" };
      }

      const mediaRecorder = new MediaRecorder(captureStream, options);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunks.push(event.data);
          setRecordedBlobs((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const finalBlob = new Blob(chunks, { type: "video/webm" });
        setLastBlob(finalBlob);
        setPreviewUrl(URL.createObjectURL(finalBlob));
        setRecordingState("stopped");
      };

      // Start recording
      mediaRecorder.start(1000); // chunk every 1 second
      setRecordingState("recording");

      // Start Timer
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);

      toast.success("Recording started! Speak clearly.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to start recording. Please allow camera/microphone permissions.");
      setRecordingState("idle");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === "recording") {
      mediaRecorderRef.current.pause();
      setRecordingState("paused");
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      toast.info("Recording paused.");
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState === "paused") {
      mediaRecorderRef.current.resume();
      setRecordingState("recording");
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
      toast.info("Recording resumed.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (recordingState === "recording" || recordingState === "paused")) {
      mediaRecorderRef.current.stop();
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      cleanupStreams();
      toast.success("Recording stopped. Preview ready.");
    }
  };

  const discardRecording = () => {
    cleanupStreams();
    setRecordingState("idle");
    setPreviewUrl(null);
    setLastBlob(null);
    setRecordingTime(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    toast.info("Recording discarded.");
  };

  // Save the recorded video to IndexedDB
  const handleSave = async () => {
    if (!lastBlob) {
      toast.error("No video recorded to save.");
      return;
    }
    if (!videoTitle.trim()) {
      toast.error("Please enter a title for your demo video.");
      return;
    }

    try {
      await saveRecording({
        name: videoTitle.trim(),
        lessonId: search.lessonId || "custom",
        lessonTitle: search.lessonTitle || "General Practice",
        duration: recordingTime,
        language: LANGUAGES.find((l) => l.code === recordingLang)?.label || "English",
        blob: lastBlob,
      });

      toast.success("Recording saved to local vault!");
      discardRecording();
      loadSavedRecordings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save recording.");
    }
  };

  // Delete recording from IndexedDB
  const handleDelete = async (id: string) => {
    try {
      await deleteRecording(id);
      toast.success("Recording deleted.");
      if (activePlaybackId === id) {
        setActivePlaybackUrl(null);
        setActivePlaybackId(null);
      }
      loadSavedRecordings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete recording.");
    }
  };

  // Download video file (.webm)
  const handleDownload = (rec: LocalRecording) => {
    const url = URL.createObjectURL(rec.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rec.name.toLowerCase().replace(/\s+/g, "_")}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download started!");
  };

  const playSavedRecording = (rec: LocalRecording) => {
    if (activePlaybackId === rec.id) {
      // Toggle off
      setActivePlaybackUrl(null);
      setActivePlaybackId(null);
    } else {
      setActivePlaybackUrl(URL.createObjectURL(rec.blob));
      setActivePlaybackId(rec.id);
      toast.info(`Playing: ${rec.name}`);
    }
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (activePlaybackUrl) URL.revokeObjectURL(activePlaybackUrl);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [activePlaybackUrl, previewUrl]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vernacular Demo Recorder</h1>
          <p className="mt-1 text-muted-foreground">
            Record, preview, and download your STEM explanations in regional Indian languages.
          </p>
        </div>
        {search.lessonId && (
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <Link to="/lesson/$id" params={{ id: search.lessonId }}>
              <ArrowLeft className="h-4 w-4" /> Back to Lesson
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Recording Studio */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-card overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" /> Recording Studio
                </CardTitle>
                <div className="flex items-center gap-2">
                  {recordingState !== "idle" && (
                    <Badge
                      variant={recordingState === "recording" ? "default" : "secondary"}
                      className={cn(
                        "font-mono text-xs px-2.5 py-1 flex items-center gap-1.5",
                        recordingState === "recording" && "bg-destructive text-destructive-foreground animate-pulse"
                      )}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                      {recordingState.toUpperCase()} - {formatTime(recordingTime)}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Controls Toggle (only when idle) */}
              {recordingState === "idle" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Capture Device</span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={mode === "camera" ? "default" : "outline"}
                        className="flex-1 gap-2"
                        onClick={() => setMode("camera")}
                      >
                        <Video className="h-4 w-4" /> Camera
                      </Button>
                      <Button
                        type="button"
                        variant={mode === "screen" ? "default" : "outline"}
                        className="flex-1 gap-2"
                        onClick={() => setMode("screen")}
                      >
                        <Monitor className="h-4 w-4" /> Screen Share
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Language</span>
                    <Select value={recordingLang} onValueChange={setRecordingLang}>
                      <SelectTrigger>
                        <Languages className="mr-2 h-4 w-4 text-muted-foreground" />
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
                  </div>
                </div>
              )}

              {/* Video Window Display */}
              <div className="relative aspect-video rounded-3xl bg-black overflow-hidden border border-border/80 shadow-2xl flex items-center justify-center group">
                {/* Live Preview (recording/paused states) */}
                {recordingState !== "stopped" && (
                  <video
                    ref={liveVideoRef}
                    muted
                    playsInline
                    className={cn(
                      "w-full h-full object-cover",
                      recordingState === "idle" && "opacity-30"
                    )}
                  />
                )}

                {/* Stopped Video Preview */}
                {recordingState === "stopped" && previewUrl && (
                  <video src={previewUrl} controls className="w-full h-full object-contain" />
                )}

                {/* Screen record placeholder overlay */}
                {recordingState === "recording" && mode === "screen" && (
                  <div className="absolute inset-0 bg-primary/10 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
                    <Monitor className="h-16 w-16 text-primary animate-pulse mb-3" />
                    <h3 className="font-bold text-lg text-primary-foreground drop-shadow-md">Capturing Screen + Voice Mic</h3>
                    <p className="text-xs text-white/80 max-w-sm mt-1">
                      Minimize your browser window and explain your STEM concept. The voice over is active!
                    </p>
                  </div>
                )}

                {/* Idle overlay */}
                {recordingState === "idle" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                    {mode === "camera" ? (
                      <Video className="h-16 w-16 text-muted-foreground mb-3" />
                    ) : (
                      <Monitor className="h-16 w-16 text-muted-foreground mb-3" />
                    )}
                    <h3 className="font-bold text-lg">No Live Signal</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mt-1">
                      Click the "Start Recording" button below. The browser will request permissions to access your {mode === "camera" ? "webcam and microphone" : "screen output"}.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex gap-2">
                  {recordingState === "idle" && (
                    <Button size="lg" className="gap-2 shadow-soft" onClick={startRecording}>
                      <Play className="h-4 w-4 fill-current" /> Start Recording
                    </Button>
                  )}

                  {recordingState === "recording" && (
                    <>
                      <Button size="lg" variant="outline" className="gap-2" onClick={pauseRecording}>
                        <Pause className="h-4 w-4" /> Pause
                      </Button>
                      <Button size="lg" variant="destructive" className="gap-2 shadow-soft" onClick={stopRecording}>
                        <Square className="h-4 w-4 fill-current" /> Stop
                      </Button>
                    </>
                  )}

                  {recordingState === "paused" && (
                    <>
                      <Button size="lg" className="gap-2" onClick={resumeRecording}>
                        <Play className="h-4 w-4 fill-current" /> Resume
                      </Button>
                      <Button size="lg" variant="destructive" className="gap-2" onClick={stopRecording}>
                        <Square className="h-4 w-4 fill-current" /> Stop
                      </Button>
                    </>
                  )}

                  {(recordingState === "stopped" || recordingState === "paused" || recordingState === "recording") && (
                    <Button size="lg" variant="ghost" className="gap-2" onClick={discardRecording}>
                      Discard
                    </Button>
                  )}
                </div>

                {/* Context badge if recording inside a lesson */}
                {search.lessonTitle && (
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 py-1 px-3 text-xs">
                    Linked to: {search.lessonTitle}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Save panel when recording is complete */}
          {recordingState === "stopped" && lastBlob && (
            <Card className="border-success/30 bg-success/5 animate-in slide-in-from-top-4 duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-success text-success-foreground">
                    <Save className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-md">Save Explanation Video</CardTitle>
                    <CardDescription>Give your video demo a title and save it to your local gallery vault.</CardDescription>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Input
                    placeholder="Enter recording title (e.g. Newton's Inertia Demonstration)"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="flex-1 bg-background"
                  />
                  <Button className="gap-2 shadow-soft" onClick={handleSave}>
                    <Save className="h-4 w-4" /> Save in browser gallery
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Local recordings list */}
        <div className="space-y-6">
          <Card className="border-border/60 shadow-card h-full flex flex-col">
            <CardHeader className="border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <FolderHeart className="h-5 w-5 text-primary" /> My Local Vault
              </CardTitle>
              <CardDescription>
                Recordings are securely saved in your browser's persistent database.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-start">
              {recordings.length === 0 ? (
                <div className="text-center py-20 my-auto space-y-3">
                  <VideoOff className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <div className="font-bold text-sm">No Saved Demos</div>
                  <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
                    Record a video of your STEM lab results or explanations, then save it to see it appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                  {recordings.map((rec) => (
                    <div
                      key={rec.id}
                      className={cn(
                        "rounded-2xl border p-4 space-y-3 transition-all",
                        activePlaybackId === rec.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40 hover:bg-accent/20"
                      )}
                    >
                      {/* Title & Language */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm truncate group-hover:text-primary">{rec.name}</h4>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <Calendar className="h-3 w-3" /> {new Date(rec.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-0 text-[10px] uppercase font-bold shrink-0">
                          {rec.language}
                        </Badge>
                      </div>

                      {/* Lesson Reference Badge */}
                      {rec.lessonTitle && (
                        <div className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1 bg-muted px-2 py-0.75 rounded-md w-fit">
                          Lesson: {rec.lessonTitle}
                        </div>
                      )}

                      {/* Sub-Playback Display */}
                      {activePlaybackId === rec.id && activePlaybackUrl && (
                        <div className="rounded-xl overflow-hidden bg-black border border-border aspect-video">
                          <video src={activePlaybackUrl} controls autoPlay className="w-full h-full object-contain" />
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {formatTime(rec.duration)}
                        </span>
                        
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-primary"
                            onClick={() => playSavedRecording(rec)}
                            title={activePlaybackId === rec.id ? "Stop playback" : "Play recording"}
                          >
                            <Play className="h-4 w-4 fill-current" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => handleDownload(rec)}
                            title="Download WebM"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:border-destructive/40"
                            onClick={() => handleDelete(rec.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
