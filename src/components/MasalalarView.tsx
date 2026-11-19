import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Code2,
  Copy,
  Eye,
  Lightbulb,
  Menu,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import type { CppCheckResult, CppLevel, CppProblem } from '../types/masalalar';
import {
  ALL_CPP_PROBLEMS,
  CPP_COLLECTIONS,
  CPP_LEVELS,
  computeStudentCppLevel,
  recommendNextProblem,
} from '../data/masalalar';
import { runCppJudge } from '../utils/sandboxRunner';

interface MasalalarViewProps {
  solvedProblemIds: string[];
  onMarkProblemSolved: (problemId: string, problemCode: string) => void;
  onAskTutor: (prompt: string, context: string) => void;
  onOpenCourse: (courseId: string) => void;
}

export function MasalalarView({
  solvedProblemIds,
  onMarkProblemSolved,
  onAskTutor,
  onOpenCourse,
}: MasalalarViewProps) {
  const [selectedCollectionId, setSelectedCollectionId] = useState(CPP_COLLECTIONS[0].id);
  const [activeProblem, setActiveProblem] = useState<CppProblem | null>(null);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAllCollections, setSearchAllCollections] = useState(false);
  const [levelFilter, setLevelFilter] = useState<'All' | CppLevel>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [studentLevelOverride, setStudentLevelOverride] = useState<CppLevel | 'auto'>('auto');

  // Solver states
  const [codeDrafts, setCodeDrafts] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<CppCheckResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const solvedSet = useMemo(() => new Set(solvedProblemIds), [solvedProblemIds]);
  const autoLevel = computeStudentCppLevel(solvedProblemIds.length);
  const activeStudentLevel = studentLevelOverride === 'auto' ? autoLevel : studentLevelOverride;

  const recommendedProblem = useMemo(
    () => recommendNextProblem(solvedProblemIds, activeStudentLevel),
    [solvedProblemIds, activeStudentLevel],
  );

  const selectedCollection = useMemo(
    () => CPP_COLLECTIONS.find((c) => c.id === selectedCollectionId) ?? CPP_COLLECTIONS[0],
    [selectedCollectionId],
  );

  const filteredProblems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const pool =
      searchAllCollections && q ? ALL_CPP_PROBLEMS : selectedCollection.problems;

    return pool.filter((p) => {
      const levelOk = levelFilter === 'All' || p.difficulty === levelFilter;
      const isSolved = solvedSet.has(p.id);
      const statusOk =
        statusFilter === 'all' ||
        (statusFilter === 'solved' && isSolved) ||
        (statusFilter === 'unsolved' && !isSolved);
      const textOk =
        !q ||
        p.code.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.statementUz.toLowerCase().includes(q) ||
        p.topicTag.toLowerCase().includes(q);
      return levelOk && statusOk && textOk;
    });
  }, [
    selectedCollection,
    searchAllCollections,
    searchQuery,
    levelFilter,
    statusFilter,
    solvedSet,
  ]);

  const openProblem = (problem: CppProblem) => {
    setSelectedCollectionId(problem.collectionId);
    setActiveProblem(problem);
    setShowHint(false);
    setShowSolution(false);
    setCheckResult(null);
  };

  const handleCheckCpp = async () => {
    if (!activeProblem) return;
    setChecking(true);
    setCheckResult(null);
    const codeToCompile = codeDrafts[activeProblem.id] ?? activeProblem.starterCode;
    try {
      const res = await runCppJudge(
        codeToCompile,
        activeProblem.sampleInput,
        activeProblem.sampleOutput,
      );
      setCheckResult(res);
      if (res.passed) {
        onMarkProblemSolved(activeProblem.id, activeProblem.code);
      }
    } finally {
      setChecking(false);
    }
  };

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const collectionSolvedCount = selectedCollection.problems.filter((p) =>
    solvedSet.has(p.id),
  ).length;
  const collectionPct = Math.round(
    (collectionSolvedCount / selectedCollection.problems.length) * 100,
  );
  const totalSolvedCount = solvedProblemIds.length;
  const totalPct = Math.round((totalSolvedCount / ALL_CPP_PROBLEMS.length) * 100);

  // Adjacent navigation within current collection
  const currentIndexInCollection = activeProblem
    ? selectedCollection.problems.findIndex((p) => p.id === activeProblem.id)
    : -1;
  const prevProblem =
    currentIndexInCollection > 0
      ? selectedCollection.problems[currentIndexInCollection - 1]
      : null;
  const nextProblem =
    currentIndexInCollection >= 0 &&
    currentIndexInCollection < selectedCollection.problems.length - 1
      ? selectedCollection.problems[currentIndexInCollection + 1]
      : null;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpenMobile((o) => !o)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-800 bg-[#0B132B] text-slate-200 lg:hidden"
            aria-label="Bo‘limlar ro‘yxatini ochish"
          >
            {sidebarOpenMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div>
            <p className="text-xs font-medium text-[#FB923C]">
              CODEVERSE C++17 Masalalar · {CPP_COLLECTIONS.length} bo‘lim · {ALL_CPP_PROBLEMS.length} masala
            </p>
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
              MASALALAR
            </h1>
          </div>
        </div>

        {/* Global C++ Progress Summary */}
        <div className="flex flex-wrap items-center gap-5 rounded-xl border border-slate-800 bg-[#0B132B] px-4 py-2.5">
          <div>
            <div className="text-[11px] text-slate-400">Umumiy natija</div>
            <div className="font-mono text-sm font-semibold text-white tabular-nums">
              {totalSolvedCount} / {ALL_CPP_PROBLEMS.length} ({totalPct}%)
            </div>
          </div>
          <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#FB923C] transition-all duration-300"
              style={{ width: `${Math.max(2, totalPct)}%` }}
            />
          </div>
          <div className="border-l border-slate-800 pl-4">
            <label htmlFor="student-level-select" className="block text-[11px] text-slate-400">
              Tavsiya darajasi
            </label>
            <select
              id="student-level-select"
              value={studentLevelOverride}
              onChange={(e) => setStudentLevelOverride(e.target.value as CppLevel | 'auto')}
              className="cursor-pointer bg-transparent text-xs font-semibold text-[#38BDF8] focus:outline-none"
            >
              <option value="auto" className="bg-[#0B132B]">Avto ({autoLevel})</option>
              {CPP_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl} className="bg-[#0B132B]">
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Collections Sidebar + Main Workspace */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT SIDEBAR: 19 Problem Collections */}
        <aside
          className={`${
            sidebarOpenMobile ? 'block' : 'hidden'
          } lg:col-span-4 xl:col-span-3 lg:block`}
        >
          <div className="sticky top-20 rounded-xl border border-slate-800 bg-[#0B132B] p-3">
            <div className="px-2 pb-2 text-xs font-semibold text-slate-400">
              Mavzular to‘plami (19 bo‘lim)
            </div>
            <div className="max-h-[calc(100vh-11rem)] space-y-1.5 overflow-y-auto pr-1">
              {CPP_COLLECTIONS.map((col) => {
                const solvedInCol = col.problems.filter((p) => solvedSet.has(p.id)).length;
                const pct = Math.round((solvedInCol / col.problems.length) * 100);
                const isSelected = col.id === selectedCollection.id;

                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => {
                      setSelectedCollectionId(col.id);
                      setActiveProblem(null);
                      setSidebarOpenMobile(false);
                    }}
                    className={`w-full cursor-pointer rounded-lg border p-3 text-left transition-colors ${
                      isSelected
                        ? 'border-[#3B82F6] bg-[#101B3B] text-white'
                        : 'border-slate-800/70 bg-[#060B1A] text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold leading-snug">
                        {String(col.order).padStart(2, '0')}. {col.title}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] text-slate-400 tabular-nums">
                        {solvedInCol}/{col.problems.length}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            pct === 100
                              ? 'bg-emerald-500'
                              : isSelected
                                ? 'bg-[#FB923C]'
                                : 'bg-[#2563EB]'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                        {pct}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* MAIN AREA: Selected Collection OR Active Problem Solver */}
        <main className="lg:col-span-8 xl:col-span-9">
          {!activeProblem ? (
            <div className="space-y-5">
              {/* Recommended Exercise Strip */}
              {recommendedProblem && (
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-[#0B132B] p-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[#FB923C]">
                      Sizning darajangizga mos tavsiya ({activeStudentLevel})
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-white">
                      {recommendedProblem.code} · {recommendedProblem.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openProblem(recommendedProblem)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] whitespace-nowrap shrink-0"
                  >
                    <span>Masalani boshlash</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Prerequisite Lessons ("Oldingi mavzular") */}
              <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#38BDF8]">
                  <BookOpen className="h-4 w-4" />
                  <span>Oldingi mavzular va zarur bilimlar</span>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectedCollection.prerequisites.map((pre, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3 rounded-lg border border-slate-800 bg-[#060B1A] p-3.5"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">{pre.title}</div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {pre.description}
                        </p>
                      </div>
                      {pre.courseId && (
                        <button
                          type="button"
                          onClick={() => onOpenCourse(pre.courseId!)}
                          className="shrink-0 cursor-pointer text-xs font-semibold text-[#38BDF8] hover:underline"
                        >
                          Darsga o‘tish
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Collection Header + Progress Bar */}
              <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">
                      Bo‘lim {selectedCollection.order} · {selectedCollection.recommendedLevel} ·{' '}
                      {selectedCollection.problems.length} masala
                    </div>
                    <h2 className="mt-1 font-display text-2xl font-bold text-white">
                      {selectedCollection.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
                      {selectedCollection.descriptionUz}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl font-bold text-white tabular-nums">
                      {collectionSolvedCount} / {selectedCollection.problems.length}
                    </div>
                    <div className="text-xs text-slate-400 tabular-nums">
                      {collectionPct}% bajarildi
                    </div>
                  </div>
                </div>

                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-[#2563EB] transition-all duration-300"
                    style={{ width: `${collectionPct}%` }}
                  />
                </div>

                {/* Search + Level Filters + Status Filters */}
                <div className="mt-6 space-y-3 border-t border-slate-800 pt-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Masala raqami (Begin5, Array42), nomi yoki mavzu bo‘yicha qidiring..."
                        className="w-full rounded-lg border border-slate-700 bg-[#060B1A] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#3B82F6] focus:outline-none"
                      />
                    </div>

                    <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-slate-300 select-none">
                      <input
                        type="checkbox"
                        checked={searchAllCollections}
                        onChange={(e) => setSearchAllCollections(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-700 accent-[#2563EB]"
                      />
                      <span>Barcha 989 masaladan qidirish</span>
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* 5 Level Filters */}
                    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#060B1A] p-1">
                      {(['All', ...CPP_LEVELS] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setLevelFilter(lvl)}
                          className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                            levelFilter === lvl
                              ? 'bg-[#2563EB] text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {lvl === 'All' ? 'Barcha darajalar' : lvl}
                        </button>
                      ))}
                    </div>

                    {/* Completion Filter */}
                    <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-[#060B1A] p-1">
                      {(
                        [
                          { id: 'all', label: 'Barchasi' },
                          { id: 'unsolved', label: 'Yechilmagan' },
                          { id: 'solved', label: 'Yechilgan' },
                        ] as const
                      ).map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setStatusFilter(st.id)}
                          className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                            statusFilter === st.id
                              ? 'bg-[#FB923C] text-[#060B1A] font-semibold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Numbered Problem Cards Grid */}
              {filteredProblems.length === 0 ? (
                <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-10 text-center">
                  <p className="text-sm text-slate-300">
                    Tanlangan filtr yoki qidiruv bo‘yicha masala topilmadi.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setLevelFilter('All');
                      setStatusFilter('all');
                    }}
                    className="mt-4 cursor-pointer rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white"
                  >
                    Filtrlarni tozalash
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProblems.map((prob) => {
                    const isSolved = solvedSet.has(prob.id);
                    return (
                      <button
                        key={prob.id}
                        type="button"
                        onClick={() => openProblem(prob)}
                        className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 text-left transition-colors ${
                          isSolved
                            ? 'border-emerald-500/35 bg-[#0B132B] hover:border-emerald-400/60'
                            : 'border-slate-800 bg-[#0B132B] hover:border-[#3B82F6]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-bold text-[#38BDF8] tabular-nums">
                              #{prob.number} · {prob.code}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                                isSolved ? 'text-emerald-400' : 'text-slate-400'
                              }`}
                            >
                              {isSolved ? (
                                <>
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  <span>Yechilgan</span>
                                </>
                              ) : (
                                <>
                                  <Circle className="h-3.5 w-3.5" />
                                  <span>Yechilmagan</span>
                                </>
                              )}
                            </span>
                          </div>

                          <h3 className="mt-2 font-display text-sm font-bold text-white">
                            {prob.title}
                          </h3>
                          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
                            {prob.statementUz}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
                          <span>{prob.difficulty}</span>
                          <span>{prob.topicTag}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* ACTIVE PROBLEM SOLVER WORKSPACE */
            <div className="space-y-5">
              {/* Top Breadcrumb & Problem Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0B132B] px-4 py-3">
                <button
                  type="button"
                  onClick={() => setActiveProblem(null)}
                  className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{selectedCollection.title} ro‘yxatiga qaytish</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!prevProblem}
                    onClick={() => prevProblem && openProblem(prevProblem)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-[#3B82F6] disabled:opacity-40"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Oldingi</span>
                  </button>
                  <button
                    type="button"
                    disabled={!nextProblem}
                    onClick={() => nextProblem && openProblem(nextProblem)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-[#3B82F6] disabled:opacity-40"
                  >
                    <span>Keyingi</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                {/* Left Column: Problem Statement, I/O, Samples, Hint & Solution */}
                <div className="space-y-5 xl:col-span-5">
                  <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-bold text-[#38BDF8] tabular-nums">
                        {activeProblem.code} (#{activeProblem.number}) · {activeProblem.difficulty}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          solvedSet.has(activeProblem.id)
                            ? 'text-emerald-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {solvedSet.has(activeProblem.id) ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Yechilgan</span>
                          </>
                        ) : (
                          <>
                            <Circle className="h-4 w-4" />
                            <span>Yechilmagan</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h2 className="mt-2 font-display text-xl font-bold text-white">
                      {activeProblem.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-200">
                      {activeProblem.statementUz}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-slate-800 pt-4 text-xs">
                      <div>
                        <div className="font-semibold text-slate-300">Kiruvchi ma’lumotlar:</div>
                        <p className="mt-1 text-slate-400">{activeProblem.inputSpecUz}</p>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-300">Chiquvchi ma’lumotlar:</div>
                        <p className="mt-1 text-slate-400">{activeProblem.outputSpecUz}</p>
                      </div>
                    </div>

                    {/* Sample Input & Output */}
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-slate-800 bg-[#060B1A] p-3">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                          <span>Namuna input</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(activeProblem.sampleInput, 'in')}
                            className="cursor-pointer text-slate-400 hover:text-white"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <pre className="mt-2 overflow-x-auto font-mono text-xs text-slate-100">
                          {activeProblem.sampleInput}
                        </pre>
                        {copiedKey === 'in' && (
                          <div className="mt-1 text-[10px] text-[#38BDF8]">Nusxalandi</div>
                        )}
                      </div>

                      <div className="rounded-lg border border-slate-800 bg-[#060B1A] p-3">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                          <span>Namuna output</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(activeProblem.sampleOutput, 'out')}
                            className="cursor-pointer text-slate-400 hover:text-white"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <pre className="mt-2 overflow-x-auto font-mono text-xs text-emerald-300">
                          {activeProblem.sampleOutput}
                        </pre>
                        {copiedKey === 'out' && (
                          <div className="mt-1 text-[10px] text-[#38BDF8]">Nusxalandi</div>
                        )}
                      </div>
                    </div>

                    {/* Hint & Solution Buttons */}
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowHint((h) => !h)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2 text-xs font-semibold text-[#FB923C] hover:border-[#FB923C]"
                      >
                        <Lightbulb className="h-3.5 w-3.5" />
                        <span>{showHint ? 'Maslahatni yashirish' : 'Hint (Maslahat)'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowSolution((s) => !s)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#060B1A] px-3.5 py-2 text-xs font-semibold text-[#38BDF8] hover:border-[#38BDF8]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>{showSolution ? 'Yechimni yashirish' : 'Yechimni ko‘rish'}</span>
                      </button>
                    </div>

                    {showHint && (
                      <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-950/20 p-3.5 text-xs leading-relaxed text-amber-100">
                        <div className="font-semibold text-[#FB923C]">Maslahat:</div>
                        <p className="mt-1">{activeProblem.hintUz}</p>
                      </div>
                    )}

                    {showSolution && (
                      <div className="mt-4 space-y-3 rounded-lg border border-slate-700 bg-[#060B1A] p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#38BDF8]">
                            C++17 Namunaviy Yechim
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setCodeDrafts((prev) => ({
                                ...prev,
                                [activeProblem.id]: activeProblem.solutionCode,
                              }))
                            }
                            className="cursor-pointer text-[11px] font-semibold text-slate-300 hover:text-white"
                          >
                            Editorga ko‘chirish
                          </button>
                        </div>
                        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-100">
                          {activeProblem.solutionCode}
                        </pre>
                        <div className="border-t border-slate-800 pt-3">
                          <div className="text-xs font-semibold text-white">
                            Batafsil tushuntirish:
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-slate-300">
                            {activeProblem.explanationUz}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: C++17 Editor & Tekshirish Judge */}
                <div className="space-y-4 xl:col-span-7">
                  <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white">
                        <Code2 className="h-4 w-4 text-[#38BDF8]" />
                        <span>C++17 Code Editor (g++ -std=c++17)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onAskTutor(
                              `Ushbu C++ masalasini (${activeProblem.code}: ${activeProblem.title}) tushunishda yordam bering:\n${activeProblem.statementUz}\n\nMening hozirgi kodim:\n${
                                codeDrafts[activeProblem.id] ?? activeProblem.starterCode
                              }`,
                              `Masalalar: ${activeProblem.code}`,
                            )
                          }
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#060B1A] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-[#3B82F6] hover:text-white"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-[#38BDF8]" />
                          <span>AI Ustozdan so‘rash</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCodeDrafts((prev) => ({
                              ...prev,
                              [activeProblem.id]: activeProblem.starterCode,
                            }))
                          }
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-700 bg-[#060B1A] px-2.5 py-1.5 text-xs text-slate-300 hover:text-white"
                          title="Kodni tiklash"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Tiklash</span>
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={codeDrafts[activeProblem.id] ?? activeProblem.starterCode}
                      onChange={(e) =>
                        setCodeDrafts((prev) => ({
                          ...prev,
                          [activeProblem.id]: e.target.value,
                        }))
                      }
                      spellCheck={false}
                      rows={16}
                      aria-label="C++ Code Editor"
                      className="code-editor mt-4 w-full rounded-lg border border-slate-800 bg-[#060B1A] p-4 font-mono text-xs leading-relaxed text-slate-100 focus:border-[#3B82F6] focus:outline-none sm:text-sm"
                    />

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-slate-400">
                        Kirish: <code className="text-slate-200">std::cin</code> · Chiqish:{' '}
                        <code className="text-slate-200">std::cout</code>
                      </span>

                      <button
                        type="button"
                        disabled={checking}
                        onClick={handleCheckCpp}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-60"
                      >
                        <Play className="h-4 w-4" />
                        <span>{checking ? 'Kompilyatsiya qilinmoqda...' : 'Tekshirish'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Execution & Verdict Panel */}
                  {checkResult && (
                    <div
                      className={`rounded-xl border p-5 ${
                        checkResult.passed
                          ? 'border-emerald-500/45 bg-emerald-950/25'
                          : 'border-rose-500/45 bg-rose-950/25'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold ${
                              checkResult.passed ? 'text-emerald-300' : 'text-rose-300'
                            }`}
                          >
                            {checkResult.passed
                              ? 'Accepted · Masala muvaffaqiyatli yechildi (+25 XP)'
                              : checkResult.status}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-slate-400 tabular-nums">
                          {checkResult.durationMs} ms
                        </span>
                      </div>

                      {checkResult.stderr && (
                        <div className="mt-3">
                          <div className="text-xs font-semibold text-rose-300">
                            Kompilyator / Ishlash xatosi:
                          </div>
                          <pre className="mt-1 overflow-x-auto rounded-lg bg-[#060B1A] p-3 font-mono text-xs text-rose-200">
                            {checkResult.stderr}
                          </pre>
                        </div>
                      )}

                      {!checkResult.stderr && (
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <div className="text-[11px] font-semibold text-slate-400">
                              Sizning natijangiz:
                            </div>
                            <pre className="mt-1 overflow-x-auto rounded-lg bg-[#060B1A] p-3 font-mono text-xs text-slate-100">
                              {checkResult.stdout || '(bo‘sh)'}
                            </pre>
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold text-slate-400">
                              Kutilgan natija:
                            </div>
                            <pre className="mt-1 overflow-x-auto rounded-lg bg-[#060B1A] p-3 font-mono text-xs text-emerald-300">
                              {checkResult.expectedOutput}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
