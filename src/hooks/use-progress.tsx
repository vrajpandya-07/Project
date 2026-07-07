import { useState, useEffect } from "react";
import { LESSONS } from "@/lib/mock-data";

export interface QuizResult {
  id: string;
  title: string;
  score: number;
  date: string;
}

export interface InProgressLesson {
  id: string;
  progress: number;
}

export interface UserProgress {
  streakDays: number;
  lastActiveDate: string;
  lessonsCompleted: string[];
  quizzesPassed: QuizResult[];
  inProgressLessons: InProgressLesson[];
  weakTopics: string[];
  strongTopics: string[];
}

const DEFAULT_PROGRESS: UserProgress = {
  streakDays: 0,
  lastActiveDate: "",
  lessonsCompleted: [],
  quizzesPassed: [],
  inProgressLessons: [],
  weakTopics: [],
  strongTopics: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setEmail(user.email);
          const savedProgress = localStorage.getItem(`progress_${user.email}`);
          
          if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            // Handle streak update on load
            const today = new Date().toISOString().split("T")[0];
            let newStreak = parsed.streakDays;
            
            if (parsed.lastActiveDate) {
              const lastDate = new Date(parsed.lastActiveDate);
              const currentDate = new Date(today);
              const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
              
              if (diffDays === 1) {
                // Keep streak, handled on save
              } else if (diffDays > 1) {
                newStreak = 0; // Lost streak
              }
            }
            
            setProgress({ ...DEFAULT_PROGRESS, ...parsed, streakDays: newStreak, lastActiveDate: today });
            localStorage.setItem(`progress_${user.email}`, JSON.stringify({ ...parsed, streakDays: newStreak, lastActiveDate: today }));
          } else {
            const initial = { ...DEFAULT_PROGRESS, lastActiveDate: new Date().toISOString().split("T")[0] };
            setProgress(initial);
            localStorage.setItem(`progress_${user.email}`, JSON.stringify(initial));
          }
        } catch (e) {
          console.error("Error loading progress", e);
        }
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    if (email) {
      localStorage.setItem(`progress_${email}`, JSON.stringify(newProgress));
    }
  };

  const updateLessonProgress = (id: string, pct: number) => {
    const updated = { ...progress };
    const idx = updated.inProgressLessons.findIndex(l => l.id === id);
    if (idx !== -1) {
      updated.inProgressLessons[idx].progress = pct;
    } else {
      updated.inProgressLessons.push({ id, progress: pct });
    }
    
    // If complete, add to lessonsCompleted and remove from inProgress
    if (pct === 100) {
      if (!updated.lessonsCompleted.includes(id)) {
        updated.lessonsCompleted.push(id);
      }
      updated.inProgressLessons = updated.inProgressLessons.filter(l => l.id !== id);
    }
    
    // Update streak if needed
    const today = new Date().toISOString().split("T")[0];
    if (updated.lastActiveDate !== today) {
        updated.streakDays += 1;
        updated.lastActiveDate = today;
    } else if (updated.streakDays === 0) {
        updated.streakDays = 1;
    }

    saveProgress(updated);
  };

  const recordQuizResult = (score: number, strong: string[], weak: string[]) => {
    const updated = { ...progress };
    
    // Add quiz
    updated.quizzesPassed.unshift({
      id: Math.random().toString(36).substring(7),
      title: "Adaptive STEM Quiz",
      score,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    
    // Update topics (keep top 5)
    updated.strongTopics = [...new Set([...strong, ...updated.strongTopics])].slice(0, 5);
    updated.weakTopics = [...new Set([...weak, ...updated.weakTopics])].slice(0, 5);
    
    // Update streak
    const today = new Date().toISOString().split("T")[0];
    if (updated.lastActiveDate !== today) {
        updated.streakDays += 1;
        updated.lastActiveDate = today;
    } else if (updated.streakDays === 0) {
        updated.streakDays = 1;
    }

    saveProgress(updated);
  };

  const getOverallProgress = () => {
    const totalLessons = LESSONS.length;
    if (totalLessons === 0) return 0;
    return Math.round((progress.lessonsCompleted.length / totalLessons) * 100);
  };
  
  const getMasteryLevel = () => {
    const p = getOverallProgress();
    if (p < 10) return "Beginner";
    if (p < 30) return "Novice";
    if (p < 60) return "Intermediate";
    if (p < 90) return "Advanced";
    return "Expert";
  };

  return {
    progress,
    updateLessonProgress,
    recordQuizResult,
    getOverallProgress,
    getMasteryLevel,
  };
}
