// Mock data — replace with API calls when backend integration is added.

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "mr", label: "मराठी (Marathi)" },
];

export const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];
export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

export type Lesson = {
  id: string;
  title: string;
  subject: string;
  difficulty: (typeof DIFFICULTIES)[number];
  duration: number; // minutes
  language: string;
  description: string;
  progress?: number;
};

export const LESSONS: Lesson[] = [
  { id: "l1", title: "Introduction to Algebra", subject: "Mathematics", difficulty: "Beginner", duration: 20, language: "English", description: "Learn variables, expressions, and equations.", progress: 60 },
  { id: "l2", title: "Newton's Laws of Motion", subject: "Physics", difficulty: "Intermediate", duration: 30, language: "Hindi", description: "Understand the three laws that govern motion.", progress: 30 },
  { id: "l3", title: "Chemical Bonding", subject: "Chemistry", difficulty: "Intermediate", duration: 25, language: "Tamil", description: "Ionic, covalent, and metallic bonds.", progress: 0 },
  { id: "l4", title: "Cell Structure", subject: "Biology", difficulty: "Beginner", duration: 15, language: "Gujarati", description: "Explore the building blocks of life.", progress: 100 },
  { id: "l5", title: "Loops in Python", subject: "Computer Science", difficulty: "Beginner", duration: 20, language: "English", description: "For loops, while loops, and iteration.", progress: 45 },
  { id: "l6", title: "Quadratic Equations", subject: "Mathematics", difficulty: "Advanced", duration: 35, language: "Marathi", description: "Solve equations of degree two.", progress: 0 },
  { id: "l7", title: "Thermodynamics Basics", subject: "Physics", difficulty: "Advanced", duration: 40, language: "English", description: "Energy, heat, and the laws of thermodynamics.", progress: 10 },
  { id: "l8", title: "Photosynthesis", subject: "Biology", difficulty: "Intermediate", duration: 22, language: "Hindi", description: "How plants convert light into energy.", progress: 75 },
];

export const STUDENT = {
  name: "Aarav Sharma",
  email: "aarav@vernacular-stem.app",
  level: "Grade 9",
  language: "English",
  avatar: "AS",
  streak: 12,
  overallProgress: 68,
};

export const WEEKLY_DATA = [
  { day: "Mon", minutes: 25, score: 78 },
  { day: "Tue", minutes: 40, score: 82 },
  { day: "Wed", minutes: 15, score: 70 },
  { day: "Thu", minutes: 55, score: 88 },
  { day: "Fri", minutes: 30, score: 85 },
  { day: "Sat", minutes: 60, score: 92 },
  { day: "Sun", minutes: 45, score: 90 },
];

export const MONTHLY_DATA = [
  { month: "Jan", hours: 12 },
  { month: "Feb", hours: 18 },
  { month: "Mar", hours: 15 },
  { month: "Apr", hours: 22 },
  { month: "May", hours: 10 },
  { month: "Jun", hours: 25 },
  { month: "Jul", hours: 20 },
  { month: "Aug", hours: 17 },
  { month: "Sep", hours: 14 },
  { month: "Oct", hours: 21 },
  { month: "Nov", hours: 8 },
  { month: "Dec", hours: 19 },
];

export const TOPIC_MASTERY = [
  { topic: "Algebra", mastery: 85 },
  { topic: "Geometry", mastery: 62 },
  { topic: "Mechanics", mastery: 74 },
  { topic: "Optics", mastery: 45 },
  { topic: "Organic Chem", mastery: 58 },
  { topic: "Cell Biology", mastery: 90 },
];

export const WEAK_TOPICS = ["Optics", "Trigonometry", "Organic Chemistry"];
export const STRONG_TOPICS = ["Cell Biology", "Algebra", "Python Basics"];

export const RECENT_QUIZZES = [
  { id: "q1", title: "Algebra Basics", score: 85, total: 100, date: "2 days ago" },
  { id: "q2", title: "Newton's Laws", score: 72, total: 100, date: "4 days ago" },
  { id: "q3", title: "Cell Biology", score: 96, total: 100, date: "1 week ago" },
];

export const BADGES = [
  { id: "b1", name: "First Steps", icon: "🎯", earned: true },
  { id: "b2", name: "7-Day Streak", icon: "🔥", earned: true },
  { id: "b3", name: "Quiz Master", icon: "🧠", earned: true },
  { id: "b4", name: "Polyglot", icon: "🌏", earned: false },
  { id: "b5", name: "Night Owl", icon: "🦉", earned: true },
  { id: "b6", name: "Perfect Score", icon: "⭐", earned: false },
];

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  hint: string;
  topic: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "qq1",
    question: "What is the value of x in the equation 2x + 5 = 15?",
    options: ["3", "5", "7", "10"],
    correct: 1,
    explanation: "Subtract 5 from both sides: 2x = 10. Then divide by 2: x = 5.",
    hint: "Isolate x by moving constants to the other side.",
    topic: "Algebra",
  },
  {
    id: "qq2",
    question: "Newton's first law is also known as the law of...",
    options: ["Gravity", "Inertia", "Acceleration", "Momentum"],
    correct: 1,
    explanation: "An object at rest stays at rest unless acted on by a force — this is the law of inertia.",
    hint: "Think about objects staying at rest.",
    topic: "Mechanics",
  },
  {
    id: "qq3",
    question: "Which organelle is known as the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    correct: 2,
    explanation: "Mitochondria generate ATP, the energy currency of the cell.",
    hint: "It generates energy (ATP).",
    topic: "Cell Biology",
  },
  {
    id: "qq4",
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: 2,
    explanation: "Au comes from the Latin word 'aurum' meaning gold.",
    hint: "Comes from the Latin 'aurum'.",
    topic: "Chemistry",
  },
  {
    id: "qq5",
    question: "Which Python keyword is used to define a function?",
    options: ["function", "def", "func", "define"],
    correct: 1,
    explanation: "In Python, functions are defined using the `def` keyword.",
    hint: "It's a short 3-letter keyword.",
    topic: "Python",
  },
];

export const STREAK_CALENDAR = Array.from({ length: 35 }, (_, i) => ({
  day: i + 1,
  active: [0, 1, 3, 4, 5, 8, 9, 10, 11, 14, 15, 17, 18, 20, 21, 22, 25, 26, 28, 29].includes(i),
}));
