import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Database,
  LogOut,
  Save,
  Terminal,
  User,
} from 'lucide-react';
import type {
  CodeSnippet,
  Lang,
  NavSection,
  UserProfile,
  UserProgress,
} from '../types/codeverse';
import { COURSES, STUDY_MATERIALS } from '../data/curriculum';
import { ALL_CPP_PROBLEMS, computeStudentCppLevel } from '../data/masalalar';
import { TRANSLATIONS } from '../data/translations';

interface DashboardViewProps {
  lang: Lang;
  user: UserProfile | null;
  progress: UserProgress;
  snippets: CodeSnippet[];
  onNavigate: (section: NavSection) => void;
  onOpenCourse: (courseId: string) => void;
  onOpenAuth: () => void;
  onUpdateProfile: (updates: {
    name: string;
    city: string;
    roleTitle: string;
    preferredLang: Lang;
  }) => Promise<void> | void;
  onSignOut: () => void;
}

export function DashboardView({
  lang,
  user,
  progress,
  snippets,
  onNavigate,
  onOpenCourse,
  onOpenAuth,
  onUpdateProfile,
  onSignOut,
}: DashboardViewProps) {
  const t = TRANSLATIONS[lang].dashboardPage;

  const [name, setName] = useState(user?.name ?? 'Guest Learner');
  const [city, setCity] = useState(user?.city ?? 'Tashkent');
  const [roleTitle, setRoleTitle] = useState(
    user?.roleTitle ?? 'Software Engineering Student',
  );
  const [preferredLang, setPreferredLang] = useState<Lang>(user?.preferredLang ?? lang);
  const [saving, setSaving] = useState(false);
  const [savedNote, setSavedNote] = useState('');

  const avgQuiz =
    progress.quizAttempts.length > 0
      ? Math.round(
          progress.quizAttempts.reduce((acc, q) => acc + q.percentage, 0) /
            progress.quizAttempts.length,
        )
      : 0;

  const cppLevel = computeStudentCppLevel(progress.solvedProblemIds.length);
  const totalLessonsCount = COURSES.reduce((acc, c) => acc + c.lessons.length, 0);
  const bookmarkedMaterials = STUDY_MATERIALS.filter((m) =>
    progress.bookmarkedMaterialIds.includes(m.id),
  );

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedNote('');
    try {
      await onUpdateProfile({ name, city, roleTitle, preferredLang });
      setSavedNote(lang === 'uz' ? 'Profil saqlandi.' : 'Profile saved.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <p className="text-xs font-medium text-[#38BDF8]">
            {user
              ? `${user.name} · ${user.city} · ${cppLevel}`
              : lang === 'uz'
                ? `Lokal Demo Rejim · ${cppLevel}`
                : `Local Demo Mode · ${cppLevel}`}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">{t.title}</h1>
          <p className="mt-1.5 max-w-3xl text-sm text-slate-300">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('materials')}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#0B132B] px-4 py-2 text-xs font-semibold text-slate-200 hover:border-[#3B82F6] hover:text-white whitespace-nowrap"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#38BDF8]" />
            <span>{TRANSLATIONS[lang].nav.materials}</span>
          </button>

          {user ? (
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#0B132B] px-4 py-2 text-xs font-semibold text-slate-300 hover:border-rose-500/60 hover:text-white whitespace-nowrap"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t.signOut}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] whitespace-nowrap"
            >
              <User className="h-3.5 w-3.5" />
              <span>{TRANSLATIONS[lang].nav.signIn}</span>
            </button>
          )}
        </div>
      </div>

      {/* 5-Column KPI Strip */}
      <section
        aria-label="Student Progress Metrics"
        className="mt-6 grid grid-cols-2 divide-y divide-slate-800/80 rounded-xl border border-slate-800 bg-[#0B132B] sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-y-0"
      >
        <div className="p-5">
          <div className="font-mono text-2xl font-bold text-[#38BDF8] tabular-nums">
            {progress.xp} XP
          </div>
          <div className="mt-1 text-xs text-slate-400">{t.xpTotal}</div>
        </div>
        <div className="p-5">
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {progress.completedLessonIds.length} / {totalLessonsCount}
          </div>
          <div className="mt-1 text-xs text-slate-400">{t.lessonsDone}</div>
        </div>
        <div className="p-5">
          <div className="font-mono text-2xl font-bold text-[#FB923C] tabular-nums">
            {progress.solvedProblemIds.length} / {ALL_CPP_PROBLEMS.length}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            {lang === 'uz' ? 'Yechilgan C++ Masalalar' : 'C++ Masalalar Solved'}
          </div>
        </div>
        <div className="p-5">
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {avgQuiz}%
          </div>
          <div className="mt-1 text-xs text-slate-400">{t.avgQuizScore}</div>
        </div>
        <div className="p-5">
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {snippets.length}
          </div>
          <div className="mt-1 text-xs text-slate-400">{t.savedSnippetsCount}</div>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Track Mastery + Masalalar Summary + Quiz History */}
        <div className="space-y-6 lg:col-span-7">
          {/* C++ Masalalar Progress Card */}
          <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#FB923C]">
                  {lang === 'uz' ? 'C++ Masalalar Darajasi' : 'C++ Masalalar Rank'}: {cppLevel}
                </p>
                <h2 className="mt-1 font-display text-lg font-bold text-white">
                  {lang === 'uz'
                    ? '19 ta bo‘lim bo‘yicha C++17 amaliyoti'
                    : '19 C++17 Problem Collections'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('masalalar')}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] whitespace-nowrap"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>{lang === 'uz' ? 'Masalalarni davom ettirish' : 'Continue Masalalar'}</span>
              </button>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#FB923C]"
                style={{
                  width: `${Math.max(
                    2,
                    Math.round((progress.solvedProblemIds.length / ALL_CPP_PROBLEMS.length) * 100),
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* 6 Tracks Progress Table */}
          <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
            <h2 className="font-display text-lg font-bold text-white">{t.trackProgress}</h2>
            <div className="mt-4 divide-y divide-slate-800/80">
              {COURSES.map((course) => {
                const done = course.lessons.filter((l) =>
                  progress.completedLessonIds.includes(l.id),
                ).length;
                const pct = Math.round((done / course.lessons.length) * 100);
                return (
                  <div
                    key={course.id}
                    className="flex flex-wrap items-center justify-between gap-4 py-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {course.title[lang]}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-slate-400 tabular-nums">
                        {course.difficulty} · {done}/{course.lessons.length} Lessons
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-[#2563EB]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-9 text-right font-mono text-xs text-slate-300 tabular-nums">
                        {pct}%
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenCourse(course.id)}
                        className="cursor-pointer text-xs font-semibold text-[#38BDF8] hover:underline whitespace-nowrap"
                      >
                        {lang === 'uz' ? 'Ochish' : 'Open'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiz Attempts & Bookmarks */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
              <h3 className="font-display text-base font-bold text-white">
                {lang === 'uz' ? 'Test natijalari' : 'Quiz History'}
              </h3>
              {progress.quizAttempts.length === 0 ? (
                <p className="mt-3 text-xs text-slate-400">
                  {lang === 'uz' ? 'Hali test topshirilmagan.' : 'No quiz attempts yet.'}
                </p>
              ) : (
                <ul className="mt-3 space-y-2.5 text-xs">
                  {progress.quizAttempts.slice(0, 5).map((qa) => (
                    <li
                      key={qa.id}
                      className="flex items-center justify-between gap-2 border-b border-slate-800/70 pb-2 last:border-none"
                    >
                      <span className="truncate text-slate-200">{qa.courseTitle}</span>
                      <span className="shrink-0 font-mono font-semibold text-emerald-400 tabular-nums">
                        {qa.score}/{qa.total} ({qa.percentage}%)
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-white">
                  {lang === 'uz' ? 'Saqlangan darsliklar' : 'Bookmarked Library'}
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate('materials')}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#38BDF8] hover:underline"
                >
                  <span>{lang === 'uz' ? 'Kutubxona' : 'All'}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
              {bookmarkedMaterials.length === 0 ? (
                <p className="mt-3 text-xs text-slate-400">
                  {lang === 'uz'
                    ? 'Kutubxonadan darslik yoki Cambridge qo‘llanmalarini saqlang.'
                    : 'Bookmark textbooks or Cambridge resources in the Library.'}
                </p>
              ) : (
                <ul className="mt-3 space-y-2 text-xs">
                  {bookmarkedMaterials.map((mat) => (
                    <li
                      key={mat.id}
                      className="border-b border-slate-800/70 pb-2 text-slate-200 last:border-none"
                    >
                      <div className="truncate font-medium">{mat.title[lang]}</div>
                      <div className="text-[11px] text-slate-400">
                        {mat.category} · {mat.level}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Right: Activity + Profile + Storage Architecture Ready for Firebase */}
        <div className="space-y-6 lg:col-span-5">
          {/* Storage Mode Card */}
          <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#38BDF8]">
              <Database className="h-4 w-4" />
              <span>
                {lang === 'uz'
                  ? 'Ma’lumotlarni saqlash holati'
                  : 'Persistence & Firebase Readiness'}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {lang === 'uz'
                ? 'Hozirgi vaqtda barcha natijalar brauzer localStorage va lokal demo bazasida saqlanmoqda. StorageAdapter qatlami Firebase Authentication va Cloud Firestore ulanishiga tayyor.'
                : 'Currently running on local demo data + browser localStorage (and Node.js session sync when signed in). The storage adapter is structured for drop-in Firebase Authentication & Cloud Firestore integration.'}
            </p>
          </div>

          {/* Profile Settings */}
          <form
            onSubmit={handleSaveProfile}
            className="rounded-xl border border-slate-800 bg-[#0B132B] p-6"
          >
            <h2 className="font-display text-lg font-bold text-white">{t.profileSettings}</h2>
            <div className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  {lang === 'uz' ? 'Ism familiya' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-2 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300">
                    {lang === 'uz' ? 'Shahar' : 'City'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-2 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300">
                    {lang === 'uz' ? 'Til' : 'Preferred Language'}
                  </label>
                  <select
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value as Lang)}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-2 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                  >
                    <option value="uz">O‘zbekcha</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300">
                  {lang === 'uz' ? 'Maqsad / Yo‘nalish' : 'Learning Goal'}
                </label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-2 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              {savedNote && <p className="text-xs text-emerald-400">{savedNote}</p>}

              <button
                type="submit"
                disabled={saving}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? '...' : t.saveProfile}</span>
              </button>
            </div>
          </form>

          {/* Recent Activity Feed */}
          <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
            <h2 className="font-display text-lg font-bold text-white">{t.recentActivity}</h2>
            {progress.activities.length === 0 ? (
              <p className="mt-3 text-xs text-slate-400">
                {lang === 'uz'
                  ? 'Darslar va masalalarni bajarganingizda faoliyat shu yerda ko‘rinadi.'
                  : 'Complete lessons or C++ exercises to see your learning log.'}
              </p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {progress.activities.slice(0, 8).map((act) => (
                  <li
                    key={act.id}
                    className="flex items-start justify-between gap-3 border-b border-slate-800/70 pb-2.5 text-xs last:border-none"
                  >
                    <span className="text-slate-200">{act.label}</span>
                    <span className="shrink-0 font-mono font-semibold text-emerald-400 tabular-nums">
                      +{act.xpDelta} XP
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
