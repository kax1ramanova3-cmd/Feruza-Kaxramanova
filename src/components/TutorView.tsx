import { useEffect, useState } from 'react';
import { Code2, Copy, RotateCcw, Send, Sparkles } from 'lucide-react';
import type { ChatMessage, CodeSnippet, Lang } from '../types/codeverse';
import { COURSES } from '../data/curriculum';
import { TRANSLATIONS } from '../data/translations';

interface TutorViewProps {
  lang: Lang;
  token: string | null;
  messages: ChatMessage[];
  onUpdateMessages: (next: ChatMessage[]) => void;
  onOpenInPlayground: (language: CodeSnippet['language'], code: string) => void;
  initialPrompt?: { prompt: string; context: string } | null;
  onConsumeInitialPrompt?: () => void;
}

const QUICK_PROMPTS: Record<Lang, Array<{ label: string; prompt: string }>> = {
  uz: [
    {
      label: 'C++ massiv va pointer farqi',
      prompt: 'C++ tilida oddiy massiv, std::vector va havola (&) orasidagi farqni sodda misollar bilan tushuntiring.',
    },
    {
      label: 'Ikkilik qidiruv O(log n)',
      prompt: 'Binary Search algoritmi qanday ishlaydi va nima uchun O(log n) vaqt oladi? Python va C++ da misol keltiring.',
    },
    {
      label: 'Cambridge 9618 Trace Table',
      prompt: 'Cambridge AS Level Computer Science 9618 imtihonida Trace Table va psevdokod yozishda eng ko‘p uchraydigan xatolar qaysilar?',
    },
    {
      label: 'Cloud Run bepul limiti',
      prompt: 'Google Cloud Run bepul tarifi nimalarni o‘z ichiga oladi va O‘zbekistondagi startaplar xarajatlarni qanday kamaytirishi mumkin?',
    },
  ],
  en: [
    {
      label: 'C++ vector vs reference (&)',
      prompt: 'Explain why passing const std::vector<int>& is faster than pass-by-value in C++17 with a clear example.',
    },
    {
      label: 'Binary Search O(log n)',
      prompt: 'Explain how Binary Search achieves O(log n) complexity and show clean Python and C++17 implementations.',
    },
    {
      label: 'Cambridge 9618 Trace Tables',
      prompt: 'What are the most important rules for writing Cambridge 9618 pseudocode and completing trace tables accurately?',
    },
    {
      label: 'Google Cloud Run Free Tier',
      prompt: 'Break down the Google Cloud Run free tier quotas and scale-to-zero best practices.',
    },
  ],
};

function renderMessageBlocks(
  content: string,
  onOpenInPlayground: (language: CodeSnippet['language'], code: string) => void,
) {
  const parts = content.split(/```(\w*)\n([\s\S]*?)```/g);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i += 3) {
    const textPart = parts[i];
    if (textPart && textPart.trim()) {
      elements.push(
        <p key={`t-${i}`} className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
          {textPart.trim()}
        </p>,
      );
    }
    const rawLang = (parts[i + 1] || '').toLowerCase();
    const codePart = parts[i + 2];
    if (codePart !== undefined) {
      const mappedLang: CodeSnippet['language'] =
        rawLang === 'cpp' || rawLang === 'c++'
          ? 'cpp'
          : rawLang === 'python' || rawLang === 'py'
            ? 'python'
            : rawLang === 'ts' || rawLang === 'typescript'
              ? 'typescript'
              : rawLang === 'html'
                ? 'html'
                : 'javascript';

      elements.push(
        <div
          key={`c-${i}`}
          className="my-3 overflow-hidden rounded-lg border border-slate-800 bg-[#060B1A]"
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1.5 text-[11px] text-slate-400">
            <span>{rawLang || 'code'}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(codePart)}
                className="inline-flex cursor-pointer items-center gap-1 text-slate-300 hover:text-white"
              >
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenInPlayground(mappedLang, codePart.trim())}
                className="inline-flex cursor-pointer items-center gap-1 text-[#38BDF8] hover:text-white"
              >
                <Code2 className="h-3 w-3" />
                <span>Open in Playground</span>
              </button>
            </div>
          </div>
          <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-[#38BDF8]">
            {codePart.trim()}
          </pre>
        </div>,
      );
    }
  }

  return elements;
}

export function TutorView({
  lang,
  token,
  messages,
  onUpdateMessages,
  onOpenInPlayground,
  initialPrompt,
  onConsumeInitialPrompt,
}: TutorViewProps) {
  const t = TRANSLATIONS[lang].tutorPage;
  const [input, setInput] = useState('');
  const [courseContext, setCourseContext] = useState('C++17 Masalalar & Algorithms');
  const [mentorLang, setMentorLang] = useState<'uz' | 'en' | 'both'>(lang);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt.prompt);
      if (initialPrompt.context) {
        setCourseContext(initialPrompt.context);
      }
      onConsumeInitialPrompt?.();
    }
  }, [initialPrompt, onConsumeInitialPrompt]);

  const sendMessage = async (textToSend?: string) => {
    const trimmed = (textToSend ?? input).trim();
    if (!trimmed || sending) return;

    setError('');
    setSending(true);
    if (!textToSend) setInput('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
      topic: courseContext,
    };

    const nextHistory = [...messages, userMsg];
    onUpdateMessages(nextHistory);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: trimmed,
          lang: mentorLang,
          courseContext,
          history: messages.slice(-10),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Unable to get mentor response.');
        return;
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toISOString(),
        topic: courseContext,
      };
      onUpdateMessages([...nextHistory, assistantMsg].slice(-40));
    } catch {
      setError(
        lang === 'uz'
          ? 'AI Ustoz bilan aloqa uzildi. Qayta urinib ko‘ring.'
          : 'Network error reaching CODEVERSE AI Mentor.',
      );
    } finally {
      setSending(false);
    }
  };

  const handleClear = async () => {
    onUpdateMessages([]);
    setError('');
    if (token) {
      try {
        await fetch('/api/gemini/clear-chat', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // Local clear already completed
      }
    }
  };

  const contextOptions = [
    'C++17 Masalalar & Algorithms',
    'Cambridge CS 0478 / 9618 Exam Prep',
    ...COURSES.map((c) => c.title[lang]),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <p className="text-xs font-medium text-[#38BDF8]">
            Gemini AI Mentor · O‘zbekcha & English
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">{t.title}</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-slate-300">{t.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#0B132B] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-[#3B82F6] hover:text-white whitespace-nowrap"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{t.clearChat}</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-slate-800 bg-[#0B132B] p-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tutor-context" className="block text-xs font-medium text-slate-400">
            {t.contextLabel}
          </label>
          <select
            id="tutor-context"
            value={courseContext}
            onChange={(e) => setCourseContext(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-2 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
          >
            {contextOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block text-xs font-medium text-slate-400">{t.responseLangLabel}</span>
          <div className="mt-1.5 flex items-center gap-1 rounded-lg border border-slate-800 bg-[#060B1A] p-1">
            {(
              [
                { id: 'uz', label: 'O‘zbekcha' },
                { id: 'en', label: 'English' },
                { id: 'both', label: 'Uzbek + EN' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMentorLang(opt.id)}
                className={`flex-1 cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  mentorLang === opt.id
                    ? 'bg-[#2563EB] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="mt-4 flex flex-wrap gap-2">
        {QUICK_PROMPTS[lang].map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => sendMessage(qp.prompt)}
            className="cursor-pointer rounded-lg border border-slate-800 bg-[#0B132B] px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-[#3B82F6] hover:text-white"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Chat Thread */}
      <div className="mt-5 rounded-xl border border-slate-800 bg-[#0B132B] p-5">
        <div className="max-h-[480px] min-h-[280px] space-y-4 overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="h-8 w-8 text-[#38BDF8]" />
              <p className="mt-3 font-display text-base font-semibold text-white">
                {lang === 'uz'
                  ? 'Savolingizni yozing yoki yuqoridagi tayyor mavzulardan birini tanlang'
                  : 'Ask any coding question or select a quick starter topic above'}
              </p>
              <p className="mt-1 max-w-md text-xs text-slate-400">
                {lang === 'uz'
                  ? 'Masalan: C++ Masalalar, Python, TypeScript, Cloud Run yoki Cambridge 9618 savollari.'
                  : 'Examples: C++ Masalalar debugging, Python algorithms, TypeScript, or Cambridge CS 9618.'}
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-xl border p-4 ${
                  msg.role === 'user'
                    ? 'ml-auto max-w-3xl border-[#2563EB]/40 bg-[#101B3B]'
                    : 'mr-auto max-w-4xl border-slate-800 bg-[#060B1A]'
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-[#38BDF8]">
                    {msg.role === 'user'
                      ? lang === 'uz'
                        ? 'Siz'
                        : 'Student'
                      : 'CODEVERSE AI Mentor'}
                  </span>
                  <span className="tabular-nums">
                    {msg.topic ? `${msg.topic} · ` : ''}
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                {msg.role === 'assistant' ? (
                  renderMessageBlocks(msg.content, onOpenInPlayground)
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-white">
                    {msg.content}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-500/40 bg-rose-950/30 p-3 text-xs text-rose-200">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="mt-4 flex flex-col gap-3 border-t border-slate-800 pt-4 sm:flex-row"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder={t.placeholder}
            className="flex-1 rounded-lg border border-slate-700 bg-[#060B1A] p-3 text-sm text-white placeholder-slate-500 focus:border-[#3B82F6] focus:outline-none"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-xs font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-50 sm:self-end whitespace-nowrap"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{sending ? '...' : t.send}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
