import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Copy,
  Play,
  Search,
  Sparkles,
  Award,
} from 'lucide-react';
import type { Course, Difficulty, Lang, QuizQuestion, UserProgress } from '../types/codeverse';
import { COURSES } from '../data/curriculum';
import { TRANSLATIONS } from '../data/translations';
import { runCppJudge, runJavaScriptSandbox, runPythonServer } from '../utils/sandboxRunner';

interface CoursesViewProps {
  lang: Lang;
  selectedCourseId: string | null;
  onSelectCourse: (courseId: string | null) => void;
  progress: UserProgress;
  onEnrollCourse: (course: Course) => void;
  onCompleteLesson: (course: Course, lessonId: string, lessonTitle: string) => void;
  onRecordQuizAttempt: (course: Course, score: number, total: number) => void;
  onAskTutor: (prompt: string, context: string) => void;
}

export function CoursesView({
  lang,
  selectedCourseId,
  onSelectCourse,
  progress,
  onEnrollCourse,
  onCompleteLesson,
  onRecordQuizAttempt,
  onAskTutor,
}: CoursesViewProps) {
  const t = TRANSLATIONS[lang].coursesPage;
  const [query, setQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');

  const selectedCourse = useMemo(
    () => COURSES.find((c) => c.id === selectedCourseId) || null,
    [selectedCourseId],
  );

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // Challenge editor state
  const [challengeCode, setChallengeCode] = useState<string>('');
  const [challengeLessonId, setChallengeLessonId] = useState<string>('');
  const [challengeOutput, setChallengeOutput] = useState<{
    stdout: string;
    stderr: string;
    passed: boolean | null;
  } | null>(null);
  const [runningChallenge, setRunningChallenge] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quiz state
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [bonusQuestions, setBonusQuestions] = useState<QuizQuestion[]>([]);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [quizGenError, setQuizGenError] = useState('');

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COURSES.filter((course) => {
      const diffMatch = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
      const textMatch =
        !q ||
        course.title[lang].toLowerCase().includes(q) ||
        course.description[lang].toLowerCase().includes(q) ||
        course.technologies.some((tech) => tech.toLowerCase().includes(q)) ||
        course.lessons.some((l) => l.title[lang].toLowerCase().includes(q));
      return diffMatch && textMatch;
    });
  }, [query, difficultyFilter, lang]);

  const openCourse = (course: Course) => {
    onSelectCourse(course.id);
    onEnrollCourse(course);
    setActiveLessonIndex(0);
    setShowQuiz(false);
    setBonusQuestions([]);
    setAnswers({});
    setQuizSubmitted(false);
    const firstLesson = course.lessons[0];
    setChallengeLessonId(firstLesson.id);
    setChallengeCode(firstLesson.challenge.starterCode);
    setChallengeOutput(null);
    setShowHint(false);
  };

  if (!selectedCourse) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">{t.title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">{t.subtitle}</p>
        </div>

        {/* Search & Level Filter */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-lg border border-slate-800 bg-[#0B132B] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#3B82F6] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#0B132B] p-1">
            {(
              [
                { id: 'All', label: t.filterAll },
                { id: 'Beginner', label: t.filterBeginner },
                { id: 'Elementary', label: t.filterElementary },
                { id: 'Intermediate', label: t.filterIntermediate },
                { id: 'Upper-Intermediate', label: t.filterUpperIntermediate },
                { id: 'Advanced', label: t.filterAdvanced },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDifficultyFilter(tab.id)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  difficultyFilter === tab.id
                    ? 'bg-[#2563EB] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="mt-10 rounded-xl border border-slate-800 bg-[#0B132B] p-10 text-center">
            <p className="text-sm text-slate-300">{t.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setDifficultyFilter('All');
              }}
              className="mt-4 cursor-pointer rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white"
            >
              {t.clearFilters}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredCourses.map((course) => {
              const completedInCourse = course.lessons.filter((l) =>
                progress.completedLessonIds.includes(l.id),
              ).length;
              const pct = Math.round((completedInCourse / course.lessons.length) * 100);
              return (
                <article
                  key={course.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0B132B]"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden border-b border-slate-800 bg-[#060B1A]">
                    <img
                      src={course.image}
                      alt={course.title[lang]}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                        <span>
                          {course.difficulty} · {course.lessons.length} Lessons · {course.hours}h
                        </span>
                        <span className="font-mono text-[#38BDF8] tabular-nums">{pct}%</span>
                      </div>
                      <h2 className="mt-2 font-display text-xl font-bold text-white">
                        {course.title[lang]}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {course.description[lang]}
                      </p>

                      {/* Progress bar */}
                      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-[#2563EB] transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
                      <span className="text-xs text-slate-400">
                        {course.technologies.join(' · ')}
                      </span>
                      <button
                        type="button"
                        onClick={() => openCourse(course)}
                        className="cursor-pointer rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] whitespace-nowrap shrink-0"
                      >
                        {completedInCourse > 0
                          ? lang === 'uz'
                            ? 'Davom ettirish'
                            : 'Continue'
                          : lang === 'uz'
                            ? 'Kursni ochish'
                            : 'Open Course'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ACTIVE COURSE WORKSPACE
  const activeLesson = selectedCourse.lessons[activeLessonIndex] || selectedCourse.lessons[0];
  const effectiveCode =
    challengeLessonId === activeLesson.id ? challengeCode : activeLesson.challenge.starterCode;
  const isLessonDone = progress.completedLessonIds.includes(activeLesson.id);
  const allQuizQuestions = [...selectedCourse.quiz, ...bonusQuestions];

  const selectLesson = (idx: number) => {
    const lesson = selectedCourse.lessons[idx];
    setShowQuiz(false);
    setActiveLessonIndex(idx);
    setChallengeLessonId(lesson.id);
    setChallengeCode(lesson.challenge.starterCode);
    setChallengeOutput(null);
    setShowHint(false);
  };

  const handleRunChallenge = async () => {
    setRunningChallenge(true);
    setChallengeOutput(null);
    try {
      const codeToRun = effectiveCode;
      const expected = activeLesson.challenge.expectedOutputIncludes;
      let stdout = '';
      let stderr = '';
      let passed = false;

      if (activeLesson.challenge.language === 'cpp') {
        const cppRes = await runCppJudge(
          codeToRun,
          activeLesson.challenge.sampleInput ?? '',
          expected,
        );
        stdout = cppRes.stdout;
        stderr = cppRes.stderr;
        passed = !stderr && (cppRes.passed || stdout.includes(expected));
      } else {
        const result =
          activeLesson.challenge.language === 'python'
            ? await runPythonServer(codeToRun)
            : await runJavaScriptSandbox(codeToRun);
        stdout = result.stdout;
        stderr = result.stderr;
        passed = !stderr && stdout.includes(expected);
      }

      setChallengeOutput({
        stdout,
        stderr,
        passed,
      });
      if (passed && !isLessonDone) {
        onCompleteLesson(selectedCourse, activeLesson.id, activeLesson.title[lang]);
      }
    } finally {
      setRunningChallenge(false);
    }
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const score = allQuizQuestions.reduce(
      (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
      0,
    );
    onRecordQuizAttempt(selectedCourse, score, allQuizQuestions.length);
  };

  const handleGenerateBonusQuestion = async () => {
    setGeneratingQuiz(true);
    setQuizGenError('');
    try {
      const res = await fetch('/api/gemini/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedCourse.title[lang],
          difficulty: selectedCourse.difficulty,
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setQuizGenError(data.error || 'Could not generate bonus question.');
        return;
      }
      const g = data.generated;
      if (g && Array.isArray(g.options)) {
        const newQ: QuizQuestion = {
          id: `bonus-${Date.now()}`,
          question: { en: g.question, uz: g.question },
          options: g.options.slice(0, 4).map((opt: string) => ({ en: opt, uz: opt })),
          correctIndex: Number(g.correctIndex) || 0,
          explanation: { en: g.explanation, uz: g.explanation },
        };
        setBonusQuestions((prev) => [...prev, newQ]);
        setQuizSubmitted(false);
      }
    } catch {
      setQuizGenError('Network error reaching AI quiz generator.');
    } finally {
      setGeneratingQuiz(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => onSelectCourse(null)}
        className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t.backToCourses}</span>
      </button>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Syllabus Sidebar */}
        <aside className="lg:col-span-4">
          <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
            <p className="text-xs text-[#38BDF8]">{selectedCourse.difficulty}</p>
            <h1 className="mt-1 font-display text-xl font-bold text-white">
              {selectedCourse.title[lang]}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {selectedCourse.subtitle[lang]}
            </p>

            <div className="mt-5 border-t border-slate-800 pt-4">
              <div className="text-xs font-semibold text-slate-400">{t.syllabus}</div>
              <div className="mt-3 space-y-2">
                {selectedCourse.lessons.map((lesson, idx) => {
                  const done = progress.completedLessonIds.includes(lesson.id);
                  const active = !showQuiz && idx === activeLessonIndex;
                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => selectLesson(idx)}
                      className={`flex w-full cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                        active
                          ? 'border-[#3B82F6] bg-[#101B3B] text-white'
                          : 'border-slate-800/80 bg-[#060B1A] text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold leading-snug">
                          {lesson.order}. {lesson.title[lang]}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-400 tabular-nums">
                          {lesson.durationMinutes} min · {done ? t.completed : 'In Progress'}
                        </div>
                      </div>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setShowQuiz(true)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                    showQuiz
                      ? 'border-[#3B82F6] bg-[#101B3B] text-white'
                      : 'border-slate-800/80 bg-[#060B1A] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <Award className="h-4 w-4 shrink-0 text-[#FB923C]" />
                  <div>
                    <div className="text-xs font-semibold">{t.takeQuiz}</div>
                    <div className="text-[11px] text-slate-400 tabular-nums">
                      {allQuizQuestions.length} Questions
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Lesson or Quiz Main Pane */}
        <main className="lg:col-span-8">
          {!showQuiz ? (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400 tabular-nums">
                      Lesson {activeLesson.order} of {selectedCourse.lessons.length} ·{' '}
                      {activeLesson.durationMinutes} min
                    </div>
                    <h2 className="mt-1 font-display text-2xl font-bold text-white">
                      {activeLesson.title[lang]}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onCompleteLesson(selectedCourse, activeLesson.id, activeLesson.title[lang])
                    }
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isLessonDone
                        ? 'border border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                        : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isLessonDone ? t.completed : t.markComplete}</span>
                  </button>
                </div>

                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {activeLesson.content.map((para, idx) => (
                    <p key={idx}>{para[lang]}</p>
                  ))}
                </div>

                {/* Code Example */}
                <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-[#060B1A]">
                  <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 text-xs text-slate-400">
                    <span>
                      {activeLesson.codeExample.language} · {activeLesson.codeExample.caption[lang]}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(activeLesson.codeExample.code, 'ex')}
                      className="inline-flex cursor-pointer items-center gap-1 text-slate-300 hover:text-white"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>{copiedId === 'ex' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[#38BDF8] sm:text-sm">
                    {activeLesson.codeExample.code}
                  </pre>
                </div>
              </div>

              {/* Interactive Coding Challenge */}
              <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#38BDF8]">
                      Interactive Lab · {activeLesson.challenge.language}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {activeLesson.challenge.prompt[lang]}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHint((h) => !h)}
                    className="cursor-pointer rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-[#3B82F6] hover:text-white"
                  >
                    {showHint ? 'Hide Hint' : 'Hint'}
                  </button>
                </div>

                {showHint && (
                  <div className="mt-3 rounded-lg border border-slate-700 bg-[#060B1A] p-3 text-xs text-slate-300">
                    {activeLesson.challenge.hint[lang]}
                  </div>
                )}

                {activeLesson.challenge.sampleInput && (
                  <div className="mt-3 rounded-lg border border-slate-800 bg-[#060B1A] px-3 py-2 text-xs text-slate-300">
                    <span className="font-semibold text-slate-400">Sample stdin: </span>
                    <code className="font-mono text-[#38BDF8]">
                      {activeLesson.challenge.sampleInput}
                    </code>
                  </div>
                )}

                <textarea
                  value={effectiveCode}
                  onChange={(e) => {
                    setChallengeLessonId(activeLesson.id);
                    setChallengeCode(e.target.value);
                  }}
                  spellCheck={false}
                  rows={7}
                  aria-label="Lesson Challenge Code Editor"
                  className="code-editor mt-4 w-full rounded-lg border border-slate-800 bg-[#060B1A] p-4 font-mono text-xs leading-relaxed text-slate-100 focus:border-[#3B82F6] focus:outline-none sm:text-sm"
                />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={runningChallenge}
                      onClick={handleRunChallenge}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60"
                    >
                      <Play className="h-3.5 w-3.5" />
                      <span>{runningChallenge ? 'Running...' : t.runChallenge}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onAskTutor(
                          `Help me understand this ${activeLesson.challenge.language} challenge:\n${activeLesson.challenge.prompt[lang]}\n\nMy current code:\n${effectiveCode}`,
                          selectedCourse.title[lang],
                        )
                      }
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-2 text-xs font-medium text-slate-300 hover:border-[#3B82F6] hover:text-white"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#38BDF8]" />
                      <span>Ask AI Mentor</span>
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">
                    Expected output includes: <code className="text-slate-200">{activeLesson.challenge.expectedOutputIncludes}</code>
                  </span>
                </div>

                {challengeOutput && (
                  <div
                    className={`mt-4 rounded-lg border p-4 text-xs ${
                      challengeOutput.passed
                        ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
                        : 'border-amber-500/40 bg-amber-950/20 text-amber-100'
                    }`}
                  >
                    <div className="font-semibold">
                      {challengeOutput.passed
                        ? 'Passed · Lesson marked complete (+50 XP)'
                        : 'Output did not match expected result yet'}
                    </div>
                    {challengeOutput.stdout && (
                      <pre className="mt-2 whitespace-pre-wrap font-mono text-slate-100">
                        {challengeOutput.stdout}
                      </pre>
                    )}
                    {challengeOutput.stderr && (
                      <pre className="mt-2 whitespace-pre-wrap font-mono text-rose-300">
                        {challengeOutput.stderr}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* COURSE QUIZ ENGINE */
            <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">{t.takeQuiz}</h2>
                  <p className="mt-1 text-xs text-slate-300">
                    {selectedCourse.title[lang]} · {allQuizQuestions.length} Questions
                  </p>
                </div>

                <button
                  type="button"
                  disabled={generatingQuiz}
                  onClick={handleGenerateBonusQuestion}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2 text-xs font-semibold text-[#38BDF8] hover:border-[#3B82F6] disabled:opacity-60"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{generatingQuiz ? 'Generating...' : t.generateExtraQuiz}</span>
                </button>
              </div>

              {quizGenError && (
                <div className="mt-4 rounded-lg border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-200">
                  {quizGenError}
                </div>
              )}

              <div className="mt-6 space-y-6">
                {allQuizQuestions.map((q, qIdx) => {
                  const chosen = answers[q.id];
                  return (
                    <div key={q.id} className="rounded-xl border border-slate-800 bg-[#060B1A] p-5">
                      <p className="text-sm font-semibold text-white">
                        {qIdx + 1}. {q.question[lang]}
                      </p>
                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = chosen === optIdx;
                          const isCorrect = q.correctIndex === optIdx;
                          let style =
                            'border-slate-800 bg-[#0B132B] text-slate-300 hover:border-slate-600';
                          if (quizSubmitted) {
                            if (isCorrect) {
                              style = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200';
                            } else if (isSelected && !isCorrect) {
                              style = 'border-rose-500/60 bg-rose-950/40 text-rose-200';
                            }
                          } else if (isSelected) {
                            style = 'border-[#3B82F6] bg-[#101B3B] text-white';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={quizSubmitted}
                              onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                              className={`cursor-pointer rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${style}`}
                            >
                              {opt[lang]}
                            </button>
                          );
                        })}
                      </div>
                      {quizSubmitted && (
                        <p className="mt-3 text-xs text-slate-300">{q.explanation[lang]}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-5">
                {quizSubmitted ? (
                  <div className="text-sm font-semibold text-white tabular-nums">
                    Score:{' '}
                    {allQuizQuestions.reduce(
                      (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
                      0,
                    )}{' '}
                    / {allQuizQuestions.length}
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">
                    Select an answer for each question to submit.
                  </span>
                )}
                <div className="flex items-center gap-3">
                  {quizSubmitted && (
                    <button
                      type="button"
                      onClick={() => {
                        setAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500"
                    >
                      Retake Quiz
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={quizSubmitted}
                    onClick={handleSubmitQuiz}
                    className="cursor-pointer rounded-lg bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-50"
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
