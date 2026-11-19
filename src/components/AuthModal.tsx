import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import type { Lang, UserProfile, UserProgress, CodeSnippet } from '../types/codeverse';
import { TRANSLATIONS } from '../data/translations';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  onAuthSuccess: (payload: {
    token: string;
    user: UserProfile;
    progress: UserProgress;
    snippets: CodeSnippet[];
  }) => void;
}

export function AuthModal({ open, onClose, lang, onAuthSuccess }: AuthModalProps) {
  const t = TRANSLATIONS[lang].auth;
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Tashkent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const body =
        mode === 'register'
          ? { name, email, city, preferredLang: lang }
          : { email };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed.');
        return;
      }
      onAuthSuccess({
        token: data.token,
        user: data.user,
        progress: {
          ...data.progress,
          solvedProblemIds: data.progress?.solvedProblemIds ?? [],
        },
        snippets: data.snippets ?? [],
      });
      onClose();
    } catch {
      setError('Network error while connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/demo', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not load demo account.');
        return;
      }
      onAuthSuccess({
        token: data.token,
        user: data.user,
        progress: {
          ...data.progress,
          solvedProblemIds: data.progress?.solvedProblemIds ?? [],
        },
        snippets: data.snippets ?? [],
      });
      onClose();
    } catch {
      setError('Network error while signing into demo profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-[#0B132B] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="auth-modal-title" className="font-display text-xl font-bold text-white">
              {mode === 'register' ? t.titleRegister : t.titleSignIn}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {t.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dilnoza Rakhimova"
                className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300">
              {t.emailLabel}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@codeverse.uz"
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#3B82F6] focus:outline-none"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300">
                {t.cityLabel}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2.5 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              >
                <option value="Tashkent">Tashkent</option>
                <option value="Samarkand">Samarkand</option>
                <option value="Bukhara">Bukhara</option>
                <option value="Fergana">Fergana</option>
                <option value="Andijan">Andijan</option>
                <option value="Namangan">Namangan</option>
                <option value="Nukus">Nukus</option>
                <option value="Urgench">Urgench</option>
                <option value="Karshi">Karshi</option>
              </select>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-60"
          >
            {loading
              ? '...'
              : mode === 'register'
                ? t.submitRegister
                : t.submitSignIn}
          </button>
        </form>

        <div className="mt-4 border-t border-slate-800 pt-4">
          <button
            type="button"
            disabled={loading}
            onClick={handleDemo}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700 bg-[#060B1A] px-4 py-2.5 text-xs font-semibold text-[#38BDF8] transition-colors hover:border-[#3B82F6] hover:text-white"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.demoButton}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === 'register' ? 'login' : 'register'));
              setError('');
            }}
            className="mt-3 w-full cursor-pointer text-center text-xs text-slate-400 hover:text-white"
          >
            {mode === 'register' ? t.switchToSignIn : t.switchToRegister}
          </button>
        </div>
      </div>
    </div>
  );
}
