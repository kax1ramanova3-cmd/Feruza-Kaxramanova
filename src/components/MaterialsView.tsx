import { useMemo, useState } from 'react';
import { Bookmark, BookOpen, Download, FileText, GraduationCap, Search, X } from 'lucide-react';
import type { Lang, MaterialCategory, StudyMaterial } from '../types/codeverse';
import { STUDY_MATERIALS } from '../data/curriculum';
import { TRANSLATIONS } from '../data/translations';

interface MaterialsViewProps {
  lang: Lang;
  bookmarkedIds: string[];
  onToggleBookmark: (materialId: string) => void;
}

const CATEGORIES: Array<'All' | MaterialCategory> = [
  'All',
  'Textbook',
  'Cambridge Resource',
  'Cheat Sheet',
  'Algorithm Reference',
  'Architecture Guide',
  'Interview Prep',
];

export function MaterialsView({
  lang,
  bookmarkedIds,
  onToggleBookmark,
}: MaterialsViewProps) {
  const t = TRANSLATIONS[lang].materialsPage;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | MaterialCategory>('All');
  const [activeMaterial, setActiveMaterial] = useState<StudyMaterial | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STUDY_MATERIALS.filter((m) => {
      const catOk = category === 'All' || m.category === category;
      const textOk =
        !q ||
        m.title[lang].toLowerCase().includes(q) ||
        m.description[lang].toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.level.toLowerCase().includes(q) ||
        (m.chapters?.some((ch) => ch.toLowerCase().includes(q)) ?? false);
      return catOk && textOk;
    });
  }, [query, category, lang]);

  const handleDownload = (mat: StudyMaterial) => {
    const blob = new Blob([mat.content[lang]], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mat.id}-${lang}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const textbookCount = STUDY_MATERIALS.filter((m) => m.category === 'Textbook').length;
  const cambridgeCount = STUDY_MATERIALS.filter((m) => m.category === 'Cambridge Resource').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#38BDF8]">
            {lang === 'uz'
              ? `CODEVERSE Kutubxona · ${textbookCount} ta Darslik · ${cambridgeCount} ta Cambridge Resursi`
              : `CODEVERSE Library · ${textbookCount} Textbooks · ${cambridgeCount} Cambridge Guides`}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">{t.title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 tabular-nums">
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <BookOpen className="h-4 w-4 text-[#38BDF8]" />
            <span>{STUDY_MATERIALS.length} Resources</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <GraduationCap className="h-4 w-4 text-[#FB923C]" />
            <span>Cambridge 0478 & 9618</span>
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                category === cat
                  ? 'bg-[#2563EB] text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((mat) => {
          const isSaved = bookmarkedIds.includes(mat.id);
          return (
            <article
              key={mat.id}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0B132B] p-6 transition-colors hover:border-slate-700"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                  <span
                    className={
                      mat.category === 'Cambridge Resource'
                        ? 'font-medium text-[#FB923C]'
                        : mat.category === 'Textbook'
                          ? 'font-medium text-[#38BDF8]'
                          : ''
                    }
                  >
                    {mat.category} · {mat.level} · {mat.readTime}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(mat.id)}
                    aria-label={isSaved ? t.bookmarked : t.bookmark}
                    className={`cursor-pointer inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors shrink-0 ${
                      isSaved ? 'text-[#38BDF8]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    <span>{isSaved ? t.bookmarked : t.bookmark}</span>
                  </button>
                </div>

                <h2 className="mt-3 font-display text-lg font-bold text-white">
                  {mat.title[lang]}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {mat.description[lang]}
                </p>

                {mat.chapters && mat.chapters.length > 0 && (
                  <ul className="mt-4 space-y-1 border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                    {mat.chapters.slice(0, 3).map((ch, idx) => (
                      <li key={idx} className="truncate">
                        {ch}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-slate-800/80 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveMaterial(mat)}
                  className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] whitespace-nowrap"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{t.readNow}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(mat)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-2 text-xs font-semibold text-slate-200 hover:border-[#3B82F6] whitespace-nowrap"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{t.download}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-xl border border-slate-800 bg-[#0B132B] p-10 text-center">
          <p className="text-sm text-slate-300">
            {lang === 'uz' ? 'Mos material topilmadi.' : 'No study materials match your search.'}
          </p>
        </div>
      )}

      {/* Study Guide Reader Modal */}
      {activeMaterial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl border border-slate-800 bg-[#0B132B]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-5">
              <div>
                <p className="text-xs text-[#38BDF8]">
                  {activeMaterial.category} · {activeMaterial.level} · {activeMaterial.readTime}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  {activeMaterial.title[lang]}
                </h3>
                {activeMaterial.author && (
                  <p className="mt-0.5 text-xs text-slate-400">{activeMaterial.author}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveMaterial(null)}
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200 sm:text-sm">
                {activeMaterial.content[lang]}
              </pre>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-slate-800 p-4">
              <button
                type="button"
                onClick={() => handleDownload(activeMaterial)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{t.download}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
