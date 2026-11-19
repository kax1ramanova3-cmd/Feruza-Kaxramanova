import { useEffect, useState } from 'react';
import type {
  ChatMessage,
  CodeSnippet,
  Course,
  Lang,
  NavSection,
  UserProfile,
  UserProgress,
} from './types/codeverse';
import { TRANSLATIONS } from './data/translations';
import { localStorageAdapter } from './services/storageAdapter';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CoursesView } from './components/CoursesView';
import { MasalalarView } from './components/MasalalarView';
import { PlaygroundView } from './components/PlaygroundView';
import { TutorView } from './components/TutorView';
import { MaterialsView } from './components/MaterialsView';
import { DashboardView } from './components/DashboardView';
import { AuthModal } from './components/AuthModal';
import { CodeverseLogo } from './components/Logo';

export default function App() {
  const [initial] = useState(() => localStorageAdapter.loadState());

  const [lang, setLang] = useState<Lang>(initial.lang);
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(initial.token);
  const [user, setUser] = useState<UserProfile | null>(initial.user);
  const [progress, setProgress] = useState<UserProgress>(initial.progress);
  const [snippets, setSnippets] = useState<CodeSnippet[]>(initial.snippets);
  const [chats, setChats] = useState<ChatMessage[]>(initial.chats);

  const [authOpen, setAuthOpen] = useState(false);
  const [tutorPrefill, setTutorPrefill] = useState<{
    prompt: string;
    context: string;
  } | null>(null);
  const [playgroundPrefill, setPlaygroundPrefill] = useState<{
    language: CodeSnippet['language'];
    code: string;
  } | null>(null);

  // Persist workspace locally whenever state changes (Firebase-ready adapter)
  useEffect(() => {
    localStorageAdapter.saveState({
      lang,
      token,
      user,
      progress,
      snippets,
      chats,
      updatedAt: new Date().toISOString(),
    });
  }, [lang, token, user, progress, snippets, chats]);

  // Hydrate server session if a Bearer token is present
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401 && !cancelled) {
            setToken(null);
            setUser(null);
          }
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        if (data.user) setUser(data.user);
        if (data.progress) {
          setProgress({
            ...data.progress,
            solvedProblemIds: data.progress.solvedProblemIds ?? [],
          });
        }
        if (Array.isArray(data.snippets)) setSnippets(data.snippets);
        if (Array.isArray(data.chats)) setChats(data.chats);
      })
      .catch(() => {
        // Stay gracefully in localStorage mode if offline
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const navigate = (section: NavSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    navigate('courses');
  };

  const handleEnrollCourse = async (course: Course) => {
    setProgress((prev) => {
      if (prev.enrolledCourseIds.includes(course.id)) return prev;
      return {
        ...prev,
        xp: prev.xp + 20,
        enrolledCourseIds: [...prev.enrolledCourseIds, course.id],
        activities: [
          {
            id: `act-${Date.now()}`,
            type: 'enroll' as const,
            label: `Enrolled in ${course.title[lang]}`,
            xpDelta: 20,
            timestamp: new Date().toISOString(),
          },
          ...prev.activities,
        ].slice(0, 20),
      };
    });

    if (token) {
      try {
        const res = await fetch('/api/progress/enroll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId: course.id, courseTitle: course.title[lang] }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.progress) setProgress(data.progress);
        }
      } catch {
        // Local state already persisted
      }
    }
  };

  const handleCompleteLesson = async (
    course: Course,
    lessonId: string,
    lessonTitle: string,
  ) => {
    setProgress((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      const enrolled = prev.enrolledCourseIds.includes(course.id)
        ? prev.enrolledCourseIds
        : [...prev.enrolledCourseIds, course.id];
      return {
        ...prev,
        xp: prev.xp + 50,
        enrolledCourseIds: enrolled,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
        activities: [
          {
            id: `act-${Date.now()}`,
            type: 'lesson' as const,
            label: `Completed: ${lessonTitle}`,
            xpDelta: 50,
            timestamp: new Date().toISOString(),
          },
          ...prev.activities,
        ].slice(0, 20),
      };
    });

    if (token) {
      try {
        const res = await fetch('/api/progress/complete-lesson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: course.id,
            lessonId,
            lessonTitle,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.progress) setProgress(data.progress);
        }
      } catch {
        // Local state already persisted
      }
    }
  };

  const handleRecordQuizAttempt = async (course: Course, score: number, total: number) => {
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const xpDelta = Math.max(20, score * 30);

    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + xpDelta,
      quizAttempts: [
        {
          id: `qa-${Date.now()}`,
          courseId: course.id,
          courseTitle: course.title[lang],
          score,
          total,
          percentage,
          timestamp: new Date().toISOString(),
        },
        ...prev.quizAttempts,
      ].slice(0, 25),
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'quiz' as const,
          label: `Quiz: ${course.title[lang]} (${percentage}%)`,
          xpDelta,
          timestamp: new Date().toISOString(),
        },
        ...prev.activities,
      ].slice(0, 20),
    }));

    if (token) {
      try {
        const res = await fetch('/api/progress/quiz-attempt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: course.id,
            courseTitle: course.title[lang],
            score,
            total,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.progress) setProgress(data.progress);
        }
      } catch {
        // Local state already persisted
      }
    }
  };

  const handleMarkProblemSolved = async (problemId: string, problemCode: string) => {
    setProgress((prev) => {
      if (prev.solvedProblemIds.includes(problemId)) return prev;
      return {
        ...prev,
        xp: prev.xp + 25,
        solvedProblemIds: [...prev.solvedProblemIds, problemId],
        activities: [
          {
            id: `act-${Date.now()}`,
            type: 'cpp' as const,
            label: `Solved C++ ${problemCode}`,
            xpDelta: 25,
            timestamp: new Date().toISOString(),
          },
          ...prev.activities,
        ].slice(0, 20),
      };
    });

    if (token) {
      try {
        const res = await fetch('/api/progress/solve-cpp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ problemId, problemCode }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.progress) setProgress(data.progress);
        }
      } catch {
        // Local state already persisted
      }
    }
  };

  const handleToggleBookmark = async (materialId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedMaterialIds.includes(materialId);
      return {
        ...prev,
        bookmarkedMaterialIds: exists
          ? prev.bookmarkedMaterialIds.filter((id) => id !== materialId)
          : [...prev.bookmarkedMaterialIds, materialId],
      };
    });

    if (token) {
      try {
        const res = await fetch('/api/progress/bookmark-material', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ materialId }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.progress) setProgress(data.progress);
        }
      } catch {
        // Local state already persisted
      }
    }
  };

  const handleSaveSnippet = async (
    title: string,
    language: CodeSnippet['language'],
    code: string,
  ) => {
    const newSnippet: CodeSnippet = {
      id: `snip-${Date.now()}`,
      title,
      language,
      code,
      updatedAt: new Date().toISOString(),
    };

    setSnippets((prev) => [newSnippet, ...prev].slice(0, 30));
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + 15,
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'snippet' as const,
          label: `Saved snippet: ${title}`,
          xpDelta: 15,
          timestamp: new Date().toISOString(),
        },
        ...prev.activities,
      ].slice(0, 20),
    }));

    if (token) {
      try {
        const res = await fetch('/api/snippets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, language, code }),
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.snippets)) setSnippets(data.snippets);
          if (data.progress) setProgress(data.progress);
        }
      } catch {
        // Local state already persisted
      }
    }
  };

  const handleDeleteSnippet = async (id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
    if (token) {
      try {
        const res = await fetch(`/api/snippets/${encodeURIComponent(id)}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.snippets)) setSnippets(data.snippets);
        }
      } catch {
        // Local state already persisted
      }
    }
  };

  const handleUpdateProfile = async (updates: {
    name: string;
    city: string;
    roleTitle: string;
    preferredLang: Lang;
  }) => {
    setLang(updates.preferredLang);
    if (user) {
      setUser({ ...user, ...updates });
    } else {
      setUser({
        id: 'local-student',
        email: 'learner@codeverse.uz',
        createdAt: new Date().toISOString(),
        ...updates,
      });
    }

    if (token) {
      try {
        const res = await fetch('/api/auth/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUser(data.user);
        }
      } catch {
        // Local profile already saved
      }
    }
  };

  const handleSignOut = async () => {
    const oldToken = token;
    setToken(null);
    setUser(null);
    localStorageAdapter.clearSession();
    if (oldToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${oldToken}` },
        });
      } catch {
        // Already cleared locally
      }
    }
  };

  const handleAskTutor = (prompt: string, context: string) => {
    setTutorPrefill({ prompt, context });
    navigate('tutor');
  };

  const handleOpenInPlayground = (language: CodeSnippet['language'], code: string) => {
    setPlaygroundPrefill({ language, code });
    navigate('playground');
  };

  const navT = TRANSLATIONS[lang].nav;

  return (
    <div className="flex min-h-screen flex-col bg-[#060B1A] text-[#F8FAFC]">
      <Navbar
        activeSection={activeSection}
        onNavigate={navigate}
        lang={lang}
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
      />

      <div className="flex-1">
        {activeSection === 'home' && (
          <HomeView
            lang={lang}
            onChangeLang={setLang}
            onNavigate={navigate}
            onOpenCourse={openCourse}
            progress={progress}
          />
        )}

        {activeSection === 'courses' && (
          <CoursesView
            lang={lang}
            selectedCourseId={selectedCourseId}
            onSelectCourse={setSelectedCourseId}
            progress={progress}
            onEnrollCourse={handleEnrollCourse}
            onCompleteLesson={handleCompleteLesson}
            onRecordQuizAttempt={handleRecordQuizAttempt}
            onAskTutor={handleAskTutor}
          />
        )}

        {activeSection === 'masalalar' && (
          <MasalalarView
            solvedProblemIds={progress.solvedProblemIds}
            onMarkProblemSolved={handleMarkProblemSolved}
            onAskTutor={handleAskTutor}
            onOpenCourse={openCourse}
          />
        )}

        {activeSection === 'playground' && (
          <PlaygroundView
            lang={lang}
            snippets={snippets}
            onSaveSnippet={handleSaveSnippet}
            onDeleteSnippet={handleDeleteSnippet}
            onAskTutor={handleAskTutor}
            initialCode={playgroundPrefill}
            onClearInitialCode={() => setPlaygroundPrefill(null)}
          />
        )}

        {activeSection === 'tutor' && (
          <TutorView
            lang={lang}
            token={token}
            messages={chats}
            onUpdateMessages={setChats}
            onOpenInPlayground={handleOpenInPlayground}
            initialPrompt={tutorPrefill}
            onConsumeInitialPrompt={() => setTutorPrefill(null)}
          />
        )}

        {activeSection === 'materials' && (
          <MaterialsView
            lang={lang}
            bookmarkedIds={progress.bookmarkedMaterialIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeSection === 'dashboard' && (
          <DashboardView
            lang={lang}
            user={user}
            progress={progress}
            snippets={snippets}
            onNavigate={navigate}
            onOpenCourse={openCourse}
            onOpenAuth={() => setAuthOpen(true)}
            onUpdateProfile={handleUpdateProfile}
            onSignOut={handleSignOut}
          />
        )}
      </div>

      {/* Clean Minimal Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#060B1A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-1.5">
            <CodeverseLogo size={24} />
            <p className="text-xs text-slate-400">
              CODEVERSE · Learn. Code. Create. · A World of Programming
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400"
          >
            <button
              type="button"
              onClick={() => navigate('courses')}
              className="cursor-pointer hover:text-white"
            >
              {navT.courses}
            </button>
            <button
              type="button"
              onClick={() => navigate('masalalar')}
              className="cursor-pointer hover:text-white"
            >
              {navT.masalalar}
            </button>
            <button
              type="button"
              onClick={() => navigate('materials')}
              className="cursor-pointer hover:text-white"
            >
              {navT.materials}
            </button>
            <button
              type="button"
              onClick={() => navigate('playground')}
              className="cursor-pointer hover:text-white"
            >
              {navT.playground}
            </button>
            <button
              type="button"
              onClick={() => navigate('tutor')}
              className="cursor-pointer hover:text-white"
            >
              {navT.tutor}
            </button>
            <button
              type="button"
              onClick={() => navigate('dashboard')}
              className="cursor-pointer hover:text-white"
            >
              {navT.dashboard}
            </button>
          </nav>
        </div>
      </footer>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        lang={lang}
        onAuthSuccess={(payload) => {
          setToken(payload.token);
          setUser(payload.user);
          setProgress(payload.progress);
          setSnippets(payload.snippets);
          setLang(payload.user.preferredLang);
        }}
      />
    </div>
  );
}
