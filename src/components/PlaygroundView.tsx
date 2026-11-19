import { useState } from 'react';
import {
  BookmarkPlus,
  Code2,
  Play,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import type {
  CodeReviewResult,
  CodeSnippet,
  Lang,
} from '../types/codeverse';
import { PLAYGROUND_TEMPLATES } from '../data/curriculum';
import { TRANSLATIONS } from '../data/translations';
import {
  runCppJudge,
  runJavaScriptSandbox,
  runPythonServer,
} from '../utils/sandboxRunner';

interface PlaygroundViewProps {
  lang: Lang;
  snippets: CodeSnippet[];
  onSaveSnippet: (
    title: string,
    language: CodeSnippet['language'],
    code: string,
  ) => Promise<void> | void;
  onDeleteSnippet: (id: string) => Promise<void> | void;
  onAskTutor: (prompt: string, context: string) => void;
  initialCode?: { language: CodeSnippet['language']; code: string } | null;
  onClearInitialCode?: () => void;
}

const LANGUAGES: Array<{ id: CodeSnippet['language']; label: string }> = [
  { id: 'cpp', label: 'C++17' },
  { id: 'python', label: 'Python 3.11' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'html', label: 'HTML / CSS' },
];

export function PlaygroundView({
  lang,
  snippets,
  onSaveSnippet,
  onDeleteSnippet,
  onAskTutor,
  initialCode,
  onClearInitialCode,
}: PlaygroundViewProps) {
  const t = TRANSLATIONS[lang].playgroundPage;

  const [language, setLanguage] = useState<CodeSnippet['language']>(
    initialCode?.language ?? PLAYGROUND_TEMPLATES[0].language,
  );
  const [code, setCode] = useState<string>(
    initialCode?.code ?? PLAYGROUND_TEMPLATES[0].code,
  );
  const [cppStdin, setCppStdin] = useState<string>('');
  const [snippetTitle, setSnippetTitle] = useState<string>('');
  const [savingSnippet, setSavingSnippet] = useState(false);

  const [running, setRunning] = useState(false);
  const [stdout, setStdout] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [htmlPreview, setHtmlPreview] = useState<string>('');

  const [reviewing, setReviewing] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [review, setReview] = useState<CodeReviewResult | null>(null);

  // Sync handoff code from TutorView if provided
  if (initialCode && onClearInitialCode) {
    setLanguage(initialCode.language);
    setCode(initialCode.code);
    onClearInitialCode();
  }

  const handleSelectTemplate = (tplId: string) => {
    const found = PLAYGROUND_TEMPLATES.find((item) => item.id === tplId);
    if (!found) return;
    setLanguage(found.language);
    setCode(found.code);
    setStdout('');
    setStderr('');
    setReview(null);
    if (found.language === 'html') {
      setHtmlPreview(found.code);
    } else {
      setHtmlPreview('');
    }
  };

  const handleRun = async () => {
    setRunning(true);
    setStdout('');
    setStderr('');
    setDurationMs(null);

    try {
      if (language === 'html') {
        setHtmlPreview(code);
        setStdout('HTML/CSS preview rendered.');
        setDurationMs(0);
      } else if (language === 'cpp') {
        setHtmlPreview('');
        const res = await runCppJudge(code, cppStdin, '');
        setStdout(res.stdout);
        setStderr(res.stderr);
        setDurationMs(res.durationMs);
      } else if (language === 'python') {
        setHtmlPreview('');
        const res = await runPythonServer(code);
        setStdout(res.stdout);
        setStderr(res.stderr);
        setDurationMs(res.durationMs);
      } else {
        setHtmlPreview('');
        const res = await runJavaScriptSandbox(code, language === 'typescript');
        setStdout(res.stdout);
        setStderr(res.stderr);
        setDurationMs(res.durationMs);
      }
    } finally {
      setRunning(false);
    }
  };

  const handleAiReview = async () => {
    if (!code.trim()) return;
    setReviewing(true);
    setReviewError('');
    setReview(null);
    try {
      const res = await fetch('/api/gemini/review-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        setReviewError(data.error || 'AI review failed.');
        return;
      }
      if (data.review) {
        setReview(data.review as CodeReviewResult);
      }
    } catch {
      setReviewError(
        lang === 'uz'
          ? 'AI kod tahlili serveriga ulanishda xatolik.'
          : 'Network error reaching AI code review service.',
      );
    } finally {
      setReviewing(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setSavingSnippet(true);
    try {
      const title =
        snippetTitle.trim() || `${language.toUpperCase()} · ${new Date().toLocaleDateString()}`;
      await onSaveSnippet(title, language, code);
      setSnippetTitle('');
    } finally {
      setSavingSnippet(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">{t.title}</h1>
          <p className="mt-1.5 max-w-3xl text-sm text-slate-300">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="playground-tpl" className="text-xs text-slate-400">
            {t.templates}:
          </label>
          <select
            id="playground-tpl"
            onChange={(e) => {
              if (e.target.value) handleSelectTemplate(e.target.value);
            }}
            defaultValue=""
            className="cursor-pointer rounded-lg border border-slate-700 bg-[#0B132B] px-3 py-2 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="" disabled>
              {lang === 'uz' ? 'Shablon tanlang...' : 'Load starter template...'}
            </option>
            {PLAYGROUND_TEMPLATES.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Editor + Output */}
        <div className="space-y-5 lg:col-span-8">
          <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Language Switcher */}
              <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#060B1A] p-1">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setLanguage(item.id);
                      setHtmlPreview('');
                    }}
                    className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      language === item.id
                        ? 'bg-[#2563EB] text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={reviewing}
                  onClick={handleAiReview}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2 text-xs font-semibold text-[#38BDF8] hover:border-[#3B82F6] disabled:opacity-60 whitespace-nowrap"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{reviewing ? '...' : t.aiReview}</span>
                </button>

                <button
                  type="button"
                  disabled={running}
                  onClick={handleRun}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60 whitespace-nowrap"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>{running ? '...' : t.runCode}</span>
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              rows={16}
              aria-label="Playground Code Editor"
              className="code-editor mt-4 w-full rounded-lg border border-slate-800 bg-[#060B1A] p-4 font-mono text-xs leading-relaxed text-slate-100 focus:border-[#3B82F6] focus:outline-none sm:text-sm"
            />

            {language === 'cpp' && (
              <div className="mt-3">
                <label
                  htmlFor="cpp-stdin-input"
                  className="block text-xs font-medium text-slate-400"
                >
                  C++ Standard Input (stdin)
                </label>
                <textarea
                  id="cpp-stdin-input"
                  value={cppStdin}
                  onChange={(e) => setCppStdin(e.target.value)}
                  rows={2}
                  placeholder={lang === 'uz' ? 'Masalan: 5 12' : 'Optional input for std::cin...'}
                  className="code-editor mt-1.5 w-full rounded-lg border border-slate-800 bg-[#060B1A] p-2.5 font-mono text-xs text-slate-100 focus:border-[#3B82F6] focus:outline-none"
                />
              </div>
            )}

            {/* Save Snippet Bar */}
            <form
              onSubmit={handleSave}
              className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-4"
            >
              <input
                type="text"
                value={snippetTitle}
                onChange={(e) => setSnippetTitle(e.target.value)}
                placeholder={
                  lang === 'uz' ? 'Kod sarlavhasi (masalan: Binary Search)' : 'Snippet title...'
                }
                className="min-w-[200px] flex-1 rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-[#3B82F6] focus:outline-none"
              />
              <button
                type="submit"
                disabled={savingSnippet}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#060B1A] px-4 py-2 text-xs font-semibold text-white hover:border-[#3B82F6] disabled:opacity-60 whitespace-nowrap"
              >
                <BookmarkPlus className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>{t.saveSnippet}</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  onAskTutor(
                    `Explain or help improve this ${language} snippet:\n\n\`\`\`${language}\n${code}\n\`\`\``,
                    `Playground (${language})`,
                  )
                }
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2 text-xs font-medium text-slate-300 hover:border-[#3B82F6] hover:text-white whitespace-nowrap"
              >
                <Code2 className="h-3.5 w-3.5 text-[#FB923C]" />
                <span>{lang === 'uz' ? 'AI Ustozdan so‘rash' : 'Ask AI Mentor'}</span>
              </button>
            </form>
          </div>

          {/* Execution Output / Live HTML Preview */}
          <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-white">{t.outputTitle}</h2>
                {durationMs !== null && (
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    {durationMs} ms
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setStdout('');
                  setStderr('');
                  setHtmlPreview('');
                  setDurationMs(null);
                }}
                className="cursor-pointer text-xs text-slate-400 hover:text-white"
              >
                {t.clearOutput}
              </button>
            </div>

            {language === 'html' && htmlPreview ? (
              <iframe
                title="HTML Live Preview"
                sandbox="allow-scripts"
                srcDoc={htmlPreview}
                className="mt-3 h-72 w-full rounded-lg border border-slate-800 bg-[#060B1A]"
              />
            ) : (
              <div className="mt-3 space-y-2">
                {stderr && (
                  <pre className="overflow-x-auto rounded-lg border border-rose-500/40 bg-rose-950/25 p-3 font-mono text-xs text-rose-200">
                    {stderr}
                  </pre>
                )}
                <pre className="min-h-[84px] overflow-x-auto rounded-lg border border-slate-800 bg-[#060B1A] p-3 font-mono text-xs text-slate-100">
                  {stdout ||
                    (stderr
                      ? ''
                      : lang === 'uz'
                        ? 'Kodni bajarish uchun "Kodni bajarish" tugmasini bosing.'
                        : 'Click "Run Code" to see execution output here.')}
                </pre>
              </div>
            )}
          </div>

          {/* Gemini AI Code Review Panel */}
          {reviewError && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-950/30 p-4 text-xs text-rose-200">
              {reviewError}
            </div>
          )}

          {review && (
            <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#38BDF8]">
                    Gemini AI Code Review · {review.complexity}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white">{review.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReview(null)}
                  className="cursor-pointer rounded p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-slate-800 bg-[#060B1A] p-4">
                  <div className="text-xs font-semibold text-[#FB923C]">
                    {lang === 'uz' ? 'Aniqlangan kamchiliklar' : 'Issues & Edge Cases'}
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                    {review.issues.length > 0 ? (
                      review.issues.map((item, i) => <li key={i}>• {item}</li>)
                    ) : (
                      <li className="text-emerald-300">
                        {lang === 'uz' ? 'Muhim xatolik topilmadi.' : 'No critical issues detected.'}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="rounded-lg border border-slate-800 bg-[#060B1A] p-4">
                  <div className="text-xs font-semibold text-[#38BDF8]">
                    {lang === 'uz' ? 'Tavsiyalar' : 'Suggestions'}
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                    {review.suggestions.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {review.improvedCode && (
                <div className="mt-4 rounded-lg border border-slate-800 bg-[#060B1A] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-white">
                      {lang === 'uz' ? 'Yaxshilangan kod varianti' : 'Refactored Code'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCode(review.improvedCode)}
                      className="cursor-pointer rounded-md bg-[#2563EB] px-3 py-1 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
                    >
                      {lang === 'uz' ? 'Editorga qo‘llash' : 'Apply to Editor'}
                    </button>
                  </div>
                  <pre className="mt-3 overflow-x-auto font-mono text-xs text-emerald-200">
                    {review.improvedCode}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Saved Snippets Sidebar */}
        <aside className="lg:col-span-4">
          <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-white">{t.savedSnippets}</h2>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {snippets.length}
              </span>
            </div>

            {snippets.length === 0 ? (
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                {lang === 'uz'
                  ? 'Hali saqlangan kodlar yo‘q. Kod yozib "Kodni saqlash" tugmasini bosing.'
                  : 'No saved snippets yet. Write code and click "Save Snippet" to store it.'}
              </p>
            ) : (
              <div className="mt-4 space-y-2.5">
                {snippets.map((snip) => (
                  <div
                    key={snip.id}
                    className="flex items-start justify-between gap-2 rounded-lg border border-slate-800 bg-[#060B1A] p-3"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage(snip.language);
                        setCode(snip.code);
                        if (snip.language === 'html') setHtmlPreview(snip.code);
                        else setHtmlPreview('');
                      }}
                      className="min-w-0 flex-1 cursor-pointer text-left"
                    >
                      <div className="truncate text-xs font-semibold text-white hover:text-[#38BDF8]">
                        {snip.title}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-400">
                        {snip.language} · {new Date(snip.updatedAt).toLocaleDateString()}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteSnippet(snip.id)}
                      aria-label={`Delete ${snip.title}`}
                      className="cursor-pointer rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
