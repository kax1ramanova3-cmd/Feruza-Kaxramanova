import { useState } from 'react';
import { ArrowRight, BookOpen, Code2, Cpu, GraduationCap, Layers, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import type { Lang, NavSection, UserProgress } from '../types/codeverse';
import { COURSES, HERO_IMAGE, STUDY_MATERIALS } from '../data/curriculum';
import { ALL_CPP_PROBLEMS, CPP_COLLECTIONS, CPP_LEVELS } from '../data/masalalar';
import { TRANSLATIONS } from '../data/translations';

interface HomeViewProps {
  lang: Lang;
  onChangeLang: (lang: Lang) => void;
  onNavigate: (section: NavSection) => void;
  onOpenCourse: (courseId: string) => void;
  progress: UserProgress;
}

const LEVEL_DESCRIPTIONS: Record<
  (typeof CPP_LEVELS)[number],
  { en: string; uz: string; topics: string }
> = {
  Beginner: {
    en: 'Syntax, I/O streams, integer logic, conditions',
    uz: 'Sintaksis, kirish-chiqish, mantiqiy shartlar',
    topics: 'Python · Begin · Integer · If',
  },
  Elementary: {
    en: 'Switch-case, loops, min/max, basic functions',
    uz: 'Switch-case, sikllar, min/max, sodda funksiyalar',
    topics: 'C++17 · Case · For · While',
  },
  Intermediate: {
    en: '1D arrays, sequences, TypeScript & Cloud Run',
    uz: 'Massivlar, ketma-ketliklar, TypeScript va Cloud',
    topics: 'Array · Series · React · Node.js',
  },
  'Upper-Intermediate': {
    en: '2D matrices, strings, recursion, dynamic structures',
    uz: 'Matritsalar, satrlar, rekursiya, stek/navbat',
    topics: 'Matrix · String · Recursion · STL',
  },
  Advanced: {
    en: 'File I/O, binary streams, Gemini AI engineering',
    uz: 'Matnli va binar fayllar, Gemini AI arxitekturasi',
    topics: 'Text/Binary Files · Gemini SDK',
  },
};

export function HomeView({
  lang,
  onChangeLang,
  onNavigate,
  onOpenCourse,
  progress,
}: HomeViewProps) {
  const t = TRANSLATIONS[lang];
  const [monthlyStudents, setMonthlyStudents] = useState(1200);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const totalLessons = COURSES.reduce((acc, c) => acc + c.lessons.length, 0);

  // Transparent Cloud Run + Gemini API usage estimator
  const estimatedRequests = monthlyStudents * 450;
  const freeRequests = 2_000_000;
  const excessRequests = Math.max(0, estimatedRequests - freeRequests);
  const cloudRunCost = Number(((excessRequests / 1_000_000) * 0.4).toFixed(2));
  const aiRequests = monthlyStudents * 25;
  const estimatedAiCost =
    monthlyStudents <= 1500 ? 0 : Number((((aiRequests - 37500) / 1000) * 0.0003).toFixed(2));
  const totalEstimatedCost = (cloudRunCost + estimatedAiCost).toFixed(2);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Hero Split */}
      <section className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col justify-between lg:col-span-7"
        >
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-medium tracking-wide text-[#38BDF8]">
                {t.hero.kicker}
              </p>
              <div
                className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#0B132B] p-1"
                role="group"
                aria-label={t.hero.langLabel}
              >
                <button
                  type="button"
                  onClick={() => onChangeLang('uz')}
                  className={`cursor-pointer rounded-md px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    lang === 'uz'
                      ? 'bg-[#2563EB] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  O‘zbekcha
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLang('en')}
                  className={`cursor-pointer rounded-md px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    lang === 'en'
                      ? 'bg-[#2563EB] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-[3.25rem]">
              {t.hero.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t.hero.subheadline}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] whitespace-nowrap shrink-0"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('masalalar')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-[#0B132B] px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-[#3B82F6] hover:text-white whitespace-nowrap shrink-0"
            >
              <Terminal className="h-4 w-4 text-[#FB923C]" />
              <span>
                {lang === 'uz' ? '989 ta C++ Masalalar' : '989 C++ Masalalar'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('playground')}
              className="cursor-pointer px-3 py-2 text-sm font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline whitespace-nowrap shrink-0"
            >
              {t.hero.secondaryCta}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-5"
        >
          <div className="h-full min-h-[260px] overflow-hidden rounded-xl border border-slate-800 bg-[#0B132B]">
            {!heroImgFailed ? (
              <img
                src={HERO_IMAGE}
                alt="CODEVERSE modern engineering academy workspace"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgFailed(true)}
                className="h-full w-full object-cover lg:h-full"
              />
            ) : (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center bg-gradient-to-br from-[#0B132B] to-[#172554] p-8 text-center">
                <Code2 className="h-12 w-12 text-[#38BDF8]" />
                <p className="mt-4 font-display text-lg font-semibold text-white">
                  CODEVERSE Studio
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Learn. Code. Create.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Full-Width 4-Column Quantitative Strip */}
      <section
        aria-label="Platform Overview Metrics"
        className="mt-10 grid grid-cols-2 divide-y divide-slate-800/80 rounded-xl border border-slate-800/90 bg-[#0B132B] sm:grid-cols-4 sm:divide-x sm:divide-y-0"
      >
        <div className="p-5">
          <div className="font-mono text-2xl font-semibold text-white tabular-nums">
            {COURSES.length} Tracks
          </div>
          <div className="mt-1 text-xs font-medium text-slate-300">{t.metrics.tracksLabel}</div>
          <div className="mt-0.5 text-xs text-slate-400">{t.metrics.tracksUnit}</div>
        </div>
        <div className="p-5">
          <div className="font-mono text-2xl font-semibold text-white tabular-nums">
            {ALL_CPP_PROBLEMS.length} C++
          </div>
          <div className="mt-1 text-xs font-medium text-slate-300">
            {lang === 'uz' ? 'Masalalar to‘plami' : 'C++ Masalalar'}
          </div>
          <div className="mt-0.5 text-xs text-slate-400">
            {CPP_COLLECTIONS.length} {lang === 'uz' ? 'bo‘lim · g++ tekshiruv' : 'collections · g++ judge'}
          </div>
        </div>
        <div className="p-5">
          <div className="font-mono text-2xl font-semibold text-white tabular-nums">
            {totalLessons} Labs
          </div>
          <div className="mt-1 text-xs font-medium text-slate-300">{t.metrics.lessonsLabel}</div>
          <div className="mt-0.5 text-xs text-slate-400">{t.metrics.lessonsUnit}</div>
        </div>
        <div className="p-5">
          <div className="font-mono text-2xl font-semibold text-[#38BDF8] tabular-nums">
            $0 Base
          </div>
          <div className="mt-1 text-xs font-medium text-slate-300">{t.metrics.tierLabel}</div>
          <div className="mt-0.5 text-xs text-slate-400">{t.metrics.tierUnit}</div>
        </div>
      </section>

      {/* 5 Learning Levels Roadmap */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {lang === 'uz'
                ? '5 ta O‘zlashtirish Darajasi (Beginner → Advanced)'
                : 'Five Mastery Levels (Beginner → Advanced)'}
            </h2>
            <p className="mt-1.5 text-sm text-slate-300">
              {lang === 'uz'
                ? 'Har bir dars, masala va darslik sizning hozirgi bilim darajangizga moslab tasniflangan.'
                : 'Every course track, C++ problem collection, and textbook maps cleanly to five progressive skill tiers.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('masalalar')}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#FB923C] hover:text-white whitespace-nowrap shrink-0"
          >
            <span>{lang === 'uz' ? 'Daraja bo‘yicha masalalar' : 'Filter by Level in Masalalar'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CPP_LEVELS.map((lvl, idx) => (
            <button
              key={lvl}
              type="button"
              onClick={() => onNavigate('courses')}
              className="flex cursor-pointer flex-col justify-between rounded-xl border border-slate-800 bg-[#0B132B] p-4 text-left transition-colors hover:border-[#3B82F6]"
            >
              <div>
                <div className="font-mono text-[11px] font-semibold text-[#38BDF8] tabular-nums">
                  0{idx + 1}. {lvl}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {LEVEL_DESCRIPTIONS[lvl][lang]}
                </p>
              </div>
              <div className="mt-4 border-t border-slate-800/80 pt-2.5 text-[11px] text-slate-400">
                {LEVEL_DESCRIPTIONS[lvl].topics}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Curriculum Tracks Grid */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {t.tracks.heading}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
              {t.tracks.subheading}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('courses')}
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#38BDF8] hover:text-white whitespace-nowrap shrink-0"
          >
            <span>{t.tracks.viewAll}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => {
            const doneCount = course.lessons.filter((l) =>
              progress.completedLessonIds.includes(l.id),
            ).length;
            const started =
              doneCount > 0 || progress.enrolledCourseIds.includes(course.id);

            return (
              <article
                key={course.id}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0B132B] transition-colors hover:border-slate-700"
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
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="font-medium text-[#38BDF8]">{course.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {course.lessons.length} {t.tracks.lessonsUnit}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {course.hours} {t.tracks.hoursUnit}
                      </span>
                      {doneCount > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-emerald-400 tabular-nums">
                            {doneCount}/{course.lessons.length} Done
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold text-white">
                      {course.title[lang]}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                      {course.description[lang]}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                    <span className="truncate text-xs text-slate-400">
                      {course.technologies.join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenCourse(course.id)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8] whitespace-nowrap shrink-0"
                    >
                      <span>{started ? t.tracks.continueCourse : t.tracks.startCourse}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* C++ Masalalar & Textbook / Cambridge Library Split */}
      <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0B132B] p-6 sm:p-7 lg:col-span-7">
          <div>
            <p className="text-xs font-medium text-[#FB923C]">
              {lang === 'uz'
                ? 'C++17 Algoritmlar To‘plami · 19 ta bo‘lim'
                : 'C++17 Algorithmic Problem Set · 19 Collections'}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              {lang === 'uz'
                ? 'MASALALAR: 989 ta amaliy C++ mashqi va jonli g++ tekshiruvi'
                : 'MASALALAR: 989 C++ Exercises with Live g++ Compilation'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {lang === 'uz'
                ? 'Kiritish-chiqarishdan tortib massivlar, matritsalar, rekursiya, stek/navbat va binar fayllargacha barcha mavzular bo‘yicha o‘zbek tilidagi shartlar, namunaviy testlar, maslahatlar va batafsil tahlillar.'
                : 'Complete Uzbek-language C++ problem collections spanning I/O, loops, arrays, matrices, recursion, dynamic structures, and binary files—with real server-side g++ compilation and hints.'}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-5">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 tabular-nums">
              <span>{progress.solvedProblemIds.length} / {ALL_CPP_PROBLEMS.length} {lang === 'uz' ? 'yechilgan' : 'solved'}</span>
              <span aria-hidden="true">·</span>
              <span>g++ -std=c++17</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('masalalar')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8] whitespace-nowrap shrink-0"
            >
              <Layers className="h-4 w-4" />
              <span>{lang === 'uz' ? 'Masalalarni yechish' : 'Open Masalalar'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0B132B] p-6 sm:p-7 lg:col-span-5">
          <div>
            <p className="text-xs font-medium text-[#38BDF8]">
              {lang === 'uz'
                ? `Darsliklar va Cambridge CS · ${STUDY_MATERIALS.length} ta manba`
                : `Textbook Library & Cambridge CS · ${STUDY_MATERIALS.length} Guides`}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              {lang === 'uz'
                ? 'Darsliklar va Cambridge 0478 / 9618 Resurslari'
                : 'Textbooks & Cambridge 0478 / 9618 Resources'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {lang === 'uz'
                ? 'C++17 va Python darsliklari, Prezident maktablari hamda xalqaro dasturlar uchun Cambridge Computer Science psevdokod, trace table va ADT qo‘llanmalari.'
                : 'Structured C++17 and Python textbooks paired with Cambridge IGCSE (0478) & AS/A Level (9618) pseudocode, trace tables, and exam workbooks.'}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <GraduationCap className="h-4 w-4 text-[#FB923C]" />
              <span>Markdown Reader & Download</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate('materials')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-[#060B1A] px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-[#3B82F6] hover:text-white whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-4 w-4 text-[#38BDF8]" />
              <span>{t.nav.materials}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Google Ecosystem & Transparent Free-Tier / Usage Cost Architecture */}
      <section className="mt-16 rounded-xl border border-slate-800 bg-[#0B132B] p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#38BDF8]">
            Google Cloud Run · Gemini API · Local Storage (Firebase Ready)
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">
            {t.cloud.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {t.cloud.subheading}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-[#060B1A] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Cpu className="h-4 w-4 text-[#38BDF8]" />
              <span>{t.cloud.freeTierTitle}</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-slate-300 tabular-nums">
              <li>Cloud Run: 2,000,000 requests/mo free</li>
              <li>Compute: 180,000 vCPU-sec + 360,000 GiB-sec free</li>
              <li>Scale-to-zero: $0 charged during idle night hours</li>
              <li>Local demo + browser storage: $0 offline/local persistence</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#060B1A] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Code2 className="h-4 w-4 text-[#38BDF8]" />
              <span>{t.cloud.usageTitle}</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-slate-300 tabular-nums">
              <li>Cloud Run overage: ~$0.40 per 1M extra requests</li>
              <li>Gemini API (gemini-4-hydrogen): free tier RPM/TPM limits, then pay-as-you-go per 1M tokens</li>
              <li>Future Firebase Auth & Cloud Firestore: Spark free tier (50k reads/day) or Blaze pay-as-you-go</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#060B1A] p-5">
            <div className="text-sm font-semibold text-white">
              {t.cloud.estimatorTitle}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <label htmlFor="student-scale-slider">{t.cloud.studentsLabel}</label>
                <span className="font-mono font-semibold text-white tabular-nums">
                  {monthlyStudents.toLocaleString('en-US')}
                </span>
              </div>
              <input
                id="student-scale-slider"
                type="range"
                min={100}
                max={25000}
                step={100}
                value={monthlyStudents}
                onChange={(e) => setMonthlyStudents(Number(e.target.value))}
                className="mt-3 w-full accent-[#2563EB]"
              />
              <div className="mt-4 flex items-baseline justify-between border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-400">{t.cloud.monthlyEstimate}</span>
                <span className="font-mono text-xl font-bold text-[#38BDF8] tabular-nums">
                  ${totalEstimatedCost}/mo
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400 tabular-nums">
                Est. {estimatedRequests.toLocaleString('en-US')} Cloud Run requests/mo
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
