import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import type { Lang, NavSection, UserProfile } from '../types/codeverse';
import { TRANSLATIONS } from '../data/translations';
import { CodeverseLogo } from './Logo';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  lang: Lang;
  user: UserProfile | null;
  onOpenAuth: () => void;
}

export function Navbar({
  activeSection,
  onNavigate,
  lang,
  user,
  onOpenAuth,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  const navItems: Array<{ id: NavSection; label: string }> = [
    { id: 'courses', label: t.courses },
    { id: 'masalalar', label: t.masalalar },
    { id: 'playground', label: t.playground },
    { id: 'tutor', label: t.tutor },
    { id: 'dashboard', label: t.dashboard },
  ];

  const handleNav = (id: NavSection) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060B1A]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6]"
          aria-label="CODEVERSE Home"
        >
          <CodeverseLogo size={30} />
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`cursor-pointer whitespace-nowrap shrink-0 border-b-2 py-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6] ${
                  isActive
                    ? 'border-[#3B82F6] text-white'
                    : 'border-transparent text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <button
              type="button"
              onClick={() => handleNav('dashboard')}
              className="hidden sm:inline-flex cursor-pointer items-center gap-2 whitespace-nowrap shrink-0 rounded-lg border border-slate-700 bg-[#0B132B] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#3B82F6] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            >
              <User className="h-3.5 w-3.5 text-[#38BDF8]" />
              <span className="max-w-[140px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="hidden sm:inline-flex cursor-pointer items-center whitespace-nowrap shrink-0 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              {t.signIn}
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#0B132B] text-slate-300 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-[#060B1A] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#101B3B] text-white'
                    : 'text-slate-300 hover:bg-[#0B132B]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                if (user) {
                  handleNav('dashboard');
                } else {
                  onOpenAuth();
                }
              }}
              className="mt-2 w-full rounded-lg bg-[#2563EB] px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              {user ? user.name : t.signIn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
