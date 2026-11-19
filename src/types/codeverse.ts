export type Lang = 'en' | 'uz';

export type Difficulty =
  | 'Beginner'
  | 'Elementary'
  | 'Intermediate'
  | 'Upper-Intermediate'
  | 'Advanced';

export type NavSection =
  | 'home'
  | 'courses'
  | 'masalalar'
  | 'playground'
  | 'tutor'
  | 'materials'
  | 'dashboard';

export interface BilingualText {
  en: string;
  uz: string;
}

export interface LessonChallenge {
  prompt: BilingualText;
  language: 'javascript' | 'python' | 'cpp';
  starterCode: string;
  sampleInput?: string;
  expectedOutputIncludes: string;
  hint: BilingualText;
}

export interface Lesson {
  id: string;
  order: number;
  title: BilingualText;
  durationMinutes: number;
  summary: BilingualText;
  content: BilingualText[];
  codeExample: {
    language: string;
    caption: BilingualText;
    code: string;
  };
  challenge: LessonChallenge;
}

export interface QuizQuestion {
  id: string;
  question: BilingualText;
  options: BilingualText[];
  correctIndex: number;
  explanation: BilingualText;
}

export interface Course {
  id: string;
  slug: string;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  difficulty: Difficulty;
  hours: number;
  image: string;
  technologies: string[];
  outcomes: BilingualText[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export type MaterialCategory =
  | 'Textbook'
  | 'Cambridge Resource'
  | 'Cheat Sheet'
  | 'Architecture Guide'
  | 'Algorithm Reference'
  | 'Interview Prep';

export interface StudyMaterial {
  id: string;
  courseId: string;
  title: BilingualText;
  category: MaterialCategory;
  level: Difficulty;
  author?: string;
  readTime: string;
  format: string;
  chapters?: string[];
  description: BilingualText;
  content: BilingualText;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  roleTitle: string;
  preferredLang: Lang;
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  courseId: string;
  courseTitle: string;
  score: number;
  total: number;
  percentage: number;
  timestamp: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  language: 'javascript' | 'typescript' | 'python' | 'html' | 'cpp';
  code: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  topic?: string;
}

export interface ActivityItem {
  id: string;
  type: 'enroll' | 'lesson' | 'quiz' | 'snippet' | 'cpp';
  label: string;
  xpDelta: number;
  timestamp: string;
}

export interface UserProgress {
  xp: number;
  streakDays: number;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  solvedProblemIds: string[];
  quizAttempts: QuizAttempt[];
  bookmarkedMaterialIds: string[];
  activities: ActivityItem[];
}

export interface CodeReviewResult {
  summary: string;
  complexity: string;
  issues: string[];
  suggestions: string[];
  improvedCode: string;
}
