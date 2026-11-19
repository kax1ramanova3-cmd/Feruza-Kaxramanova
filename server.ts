import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { GoogleGenAI, Type } from '@google/genai';

const execFileAsync = promisify(execFile);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';
const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'codeverse-store.json');

interface UserRecord {
  id: string;
  name: string;
  email: string;
  city: string;
  roleTitle: string;
  preferredLang: 'en' | 'uz';
  createdAt: string;
}

interface QuizAttemptRecord {
  id: string;
  courseId: string;
  courseTitle: string;
  score: number;
  total: number;
  percentage: number;
  timestamp: string;
}

interface ActivityRecord {
  id: string;
  type: 'enroll' | 'lesson' | 'quiz' | 'snippet' | 'cpp';
  label: string;
  xpDelta: number;
  timestamp: string;
}

interface ProgressRecord {
  xp: number;
  streakDays: number;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  solvedProblemIds: string[];
  quizAttempts: QuizAttemptRecord[];
  bookmarkedMaterialIds: string[];
  activities: ActivityRecord[];
}

interface SnippetRecord {
  id: string;
  title: string;
  language: 'javascript' | 'typescript' | 'python' | 'html' | 'cpp';
  code: string;
  updatedAt: string;
}

interface ChatRecord {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  topic?: string;
}

interface StoreSchema {
  users: Record<string, UserRecord>;
  sessions: Record<string, string>;
  progress: Record<string, ProgressRecord>;
  snippets: Record<string, SnippetRecord[]>;
  chats: Record<string, ChatRecord[]>;
}

const DEMO_USER_ID = 'student-demo-tashkent';

function createEmptyProgress(): ProgressRecord {
  return {
    xp: 0,
    streakDays: 1,
    enrolledCourseIds: [],
    completedLessonIds: [],
    solvedProblemIds: [],
    quizAttempts: [],
    bookmarkedMaterialIds: [],
    activities: [],
  };
}

function createInitialStore(): StoreSchema {
  const now = new Date().toISOString();
  return {
    users: {
      [DEMO_USER_ID]: {
        id: DEMO_USER_ID,
        name: 'Azizbek Karimov',
        email: 'azizbek@codeverse.uz',
        city: 'Tashkent',
        roleTitle: 'Software Engineering Student',
        preferredLang: 'en',
        createdAt: now,
      },
    },
    sessions: {},
    progress: {
      [DEMO_USER_ID]: {
        xp: 355,
        streakDays: 5,
        enrolledCourseIds: ['python-foundations', 'web-engineering'],
        completedLessonIds: ['py-1', 'py-2', 'web-1'],
        solvedProblemIds: ['col-1-begin-1', 'col-1-begin-2', 'col-2-integer-1'],
        quizAttempts: [
          {
            id: 'qa-demo-1',
            courseId: 'python-foundations',
            courseTitle: 'Python & Algorithmic Thinking',
            score: 4,
            total: 4,
            percentage: 100,
            timestamp: now,
          },
        ],
        bookmarkedMaterialIds: ['mat-py-cheatsheet', 'mat-cloud-run'],
        activities: [
          {
            id: 'act-1',
            type: 'quiz',
            label: 'Passed Python & Algorithmic Thinking Quiz (100%)',
            xpDelta: 120,
            timestamp: now,
          },
          {
            id: 'act-2',
            type: 'lesson',
            label: 'Completed: Modern JavaScript: Array Pipelines',
            xpDelta: 60,
            timestamp: now,
          },
          {
            id: 'act-3',
            type: 'lesson',
            label: 'Completed: Control Flow & Tashkent Metro Fare Calculator',
            xpDelta: 50,
            timestamp: now,
          },
        ],
      },
    },
    snippets: {
      [DEMO_USER_ID]: [
        {
          id: 'snip-demo-1',
          title: 'Tashkent Scholarship Check',
          language: 'python',
          code: `score = 92\nprint("Result:", "Grant Eligible" if score >= 86 else "Standard Track")`,
          updatedAt: now,
        },
      ],
    },
    chats: {
      [DEMO_USER_ID]: [],
    },
  };
}

function loadStore(): StoreSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      const initial = createInitialStore();
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    return JSON.parse(raw) as StoreSchema;
  } catch (err) {
    console.error('Failed to load CODEVERSE store, resetting:', err);
    return createInitialStore();
  }
}

function saveStore(store: StoreSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.slice(7).trim();
}

function getSessionUser(req: Request, store: StoreSchema): UserRecord | null {
  const token = getBearerToken(req);
  if (!token) return null;
  const userId = store.sessions[token];
  if (!userId) return null;
  return store.users[userId] || null;
}

function createGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({
      status: 'ok',
      platform: 'CODEVERSE',
      geminiConfigured: hasGemini,
      timestamp: new Date().toISOString(),
    });
  });

  // --- AUTHENTICATION ENDPOINTS ---
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const city = typeof req.body?.city === 'string' && req.body.city.trim() ? req.body.city.trim() : 'Tashkent';
    const preferredLang = req.body?.preferredLang === 'uz' ? 'uz' : 'en';

    if (name.length < 2 || name.length > 80) {
      res.status(400).json({ error: 'Please provide a valid full name (2-80 characters).' });
      return;
    }
    if (!email.includes('@') || email.length > 120) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    const store = loadStore();
    const existing = Object.values(store.users).find((u) => u.email === email);
    let user: UserRecord;

    if (existing) {
      user = existing;
    } else {
      const id = 'student-' + crypto.randomUUID().slice(0, 8);
      user = {
        id,
        name,
        email,
        city,
        roleTitle: 'Programming Learner',
        preferredLang,
        createdAt: new Date().toISOString(),
      };
      store.users[id] = user;
      store.progress[id] = createEmptyProgress();
      store.snippets[id] = [];
      store.chats[id] = [];
    }

    const token = crypto.randomBytes(24).toString('hex');
    store.sessions[token] = user.id;
    saveStore(store);

    res.json({
      token,
      user,
      progress: store.progress[user.id] || createEmptyProgress(),
      snippets: store.snippets[user.id] || [],
    });
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (!email.includes('@')) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    const store = loadStore();
    const user = Object.values(store.users).find((u) => u.email === email);
    if (!user) {
      res.status(404).json({ error: 'No account found with that email. Please create a new student account.' });
      return;
    }

    const token = crypto.randomBytes(24).toString('hex');
    store.sessions[token] = user.id;
    saveStore(store);

    res.json({
      token,
      user,
      progress: store.progress[user.id] || createEmptyProgress(),
      snippets: store.snippets[user.id] || [],
    });
  });

  app.post('/api/auth/demo', (_req: Request, res: Response) => {
    const store = loadStore();
    const user = store.users[DEMO_USER_ID];
    const token = crypto.randomBytes(24).toString('hex');
    store.sessions[token] = user.id;
    saveStore(store);

    res.json({
      token,
      user,
      progress: store.progress[user.id] || createEmptyProgress(),
      snippets: store.snippets[user.id] || [],
    });
  });

  app.get('/api/auth/me', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Session expired or not signed in.' });
      return;
    }
    res.json({
      user,
      progress: store.progress[user.id] || createEmptyProgress(),
      snippets: store.snippets[user.id] || [],
      chats: store.chats[user.id] || [],
    });
  });

  app.patch('/api/auth/profile', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : user.name;
    const city = typeof req.body?.city === 'string' ? req.body.city.trim() : user.city;
    const roleTitle = typeof req.body?.roleTitle === 'string' ? req.body.roleTitle.trim() : user.roleTitle;
    const preferredLang = req.body?.preferredLang === 'uz' ? 'uz' : req.body?.preferredLang === 'en' ? 'en' : user.preferredLang;

    if (name.length < 2 || name.length > 80) {
      res.status(400).json({ error: 'Name must be between 2 and 80 characters.' });
      return;
    }

    const updated: UserRecord = {
      ...user,
      name,
      city: city.slice(0, 60) || 'Tashkent',
      roleTitle: roleTitle.slice(0, 80) || 'Programming Learner',
      preferredLang,
    };
    store.users[user.id] = updated;
    saveStore(store);
    res.json({ user: updated });
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const token = getBearerToken(req);
    if (token) {
      const store = loadStore();
      delete store.sessions[token];
      saveStore(store);
    }
    res.json({ ok: true });
  });

  // --- PROGRESS & LEARNING ENDPOINTS ---
  app.post('/api/progress/enroll', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Sign in required to save course enrollment.' });
      return;
    }
    const courseId = typeof req.body?.courseId === 'string' ? req.body.courseId : '';
    const courseTitle = typeof req.body?.courseTitle === 'string' ? req.body.courseTitle : courseId;
    if (!courseId) {
      res.status(400).json({ error: 'courseId is required.' });
      return;
    }
    const prog = store.progress[user.id] || createEmptyProgress();
    if (!prog.enrolledCourseIds.includes(courseId)) {
      prog.enrolledCourseIds.push(courseId);
      prog.xp += 20;
      prog.activities.unshift({
        id: 'act-' + crypto.randomUUID().slice(0, 8),
        type: 'enroll',
        label: `Enrolled in ${courseTitle}`,
        xpDelta: 20,
        timestamp: new Date().toISOString(),
      });
      prog.activities = prog.activities.slice(0, 20);
    }
    store.progress[user.id] = prog;
    saveStore(store);
    res.json({ progress: prog });
  });

  app.post('/api/progress/complete-lesson', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Sign in required to save lesson progress.' });
      return;
    }
    const lessonId = typeof req.body?.lessonId === 'string' ? req.body.lessonId : '';
    const lessonTitle = typeof req.body?.lessonTitle === 'string' ? req.body.lessonTitle : lessonId;
    const courseId = typeof req.body?.courseId === 'string' ? req.body.courseId : '';
    if (!lessonId) {
      res.status(400).json({ error: 'lessonId is required.' });
      return;
    }
    const prog = store.progress[user.id] || createEmptyProgress();
    if (courseId && !prog.enrolledCourseIds.includes(courseId)) {
      prog.enrolledCourseIds.push(courseId);
    }
    if (!prog.completedLessonIds.includes(lessonId)) {
      prog.completedLessonIds.push(lessonId);
      prog.xp += 50;
      prog.activities.unshift({
        id: 'act-' + crypto.randomUUID().slice(0, 8),
        type: 'lesson',
        label: `Completed: ${lessonTitle}`,
        xpDelta: 50,
        timestamp: new Date().toISOString(),
      });
      prog.activities = prog.activities.slice(0, 20);
    }
    store.progress[user.id] = prog;
    saveStore(store);
    res.json({ progress: prog });
  });

  app.post('/api/progress/quiz-attempt', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Sign in required to save quiz results.' });
      return;
    }
    const courseId = typeof req.body?.courseId === 'string' ? req.body.courseId : '';
    const courseTitle = typeof req.body?.courseTitle === 'string' ? req.body.courseTitle : courseId;
    const score = Number(req.body?.score ?? 0);
    const total = Number(req.body?.total ?? 0);
    if (!courseId || total <= 0) {
      res.status(400).json({ error: 'Valid courseId, score, and total are required.' });
      return;
    }
    const percentage = Math.round((score / total) * 100);
    const xpDelta = Math.max(20, score * 30);
    const prog = store.progress[user.id] || createEmptyProgress();
    const attempt: QuizAttemptRecord = {
      id: 'qa-' + crypto.randomUUID().slice(0, 8),
      courseId,
      courseTitle,
      score,
      total,
      percentage,
      timestamp: new Date().toISOString(),
    };
    prog.quizAttempts.unshift(attempt);
    prog.quizAttempts = prog.quizAttempts.slice(0, 25);
    prog.xp += xpDelta;
    prog.activities.unshift({
      id: 'act-' + crypto.randomUUID().slice(0, 8),
      type: 'quiz',
      label: `Quiz: ${courseTitle} (${percentage}%)`,
      xpDelta,
      timestamp: new Date().toISOString(),
    });
    prog.activities = prog.activities.slice(0, 20);
    store.progress[user.id] = prog;
    saveStore(store);
    res.json({ progress: prog, attempt });
  });

  app.post('/api/progress/bookmark-material', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Sign in required to bookmark materials.' });
      return;
    }
    const materialId = typeof req.body?.materialId === 'string' ? req.body.materialId : '';
    if (!materialId) {
      res.status(400).json({ error: 'materialId is required.' });
      return;
    }
    const prog = store.progress[user.id] || createEmptyProgress();
    if (prog.bookmarkedMaterialIds.includes(materialId)) {
      prog.bookmarkedMaterialIds = prog.bookmarkedMaterialIds.filter((id) => id !== materialId);
    } else {
      prog.bookmarkedMaterialIds.push(materialId);
    }
    store.progress[user.id] = prog;
    saveStore(store);
    res.json({ progress: prog });
  });

  app.post('/api/progress/solve-cpp', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Sign in required to save solved C++ problems.' });
      return;
    }
    const problemId = typeof req.body?.problemId === 'string' ? req.body.problemId : '';
    const problemCode = typeof req.body?.problemCode === 'string' ? req.body.problemCode : problemId;
    if (!problemId) {
      res.status(400).json({ error: 'problemId is required.' });
      return;
    }
    const prog = store.progress[user.id] || createEmptyProgress();
    if (!Array.isArray(prog.solvedProblemIds)) {
      prog.solvedProblemIds = [];
    }
    if (!prog.solvedProblemIds.includes(problemId)) {
      prog.solvedProblemIds.push(problemId);
      prog.xp += 25;
      prog.activities.unshift({
        id: 'act-' + crypto.randomUUID().slice(0, 8),
        type: 'cpp',
        label: `Solved C++ ${problemCode}`,
        xpDelta: 25,
        timestamp: new Date().toISOString(),
      });
      prog.activities = prog.activities.slice(0, 20);
    }
    store.progress[user.id] = prog;
    saveStore(store);
    res.json({ progress: prog });
  });

  // --- SNIPPETS ENDPOINTS ---
  app.post('/api/snippets', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Sign in required to save code snippets.' });
      return;
    }
    const title = typeof req.body?.title === 'string' ? req.body.title.trim().slice(0, 80) : 'Untitled Snippet';
    const language = req.body?.language;
    const code = typeof req.body?.code === 'string' ? req.body.code.slice(0, 20000) : '';
    if (!['javascript', 'typescript', 'python', 'html', 'cpp'].includes(language)) {
      res.status(400).json({ error: 'Unsupported language.' });
      return;
    }
    const list = store.snippets[user.id] || [];
    const snippet: SnippetRecord = {
      id: 'snip-' + crypto.randomUUID().slice(0, 8),
      title: title || 'Untitled Snippet',
      language,
      code,
      updatedAt: new Date().toISOString(),
    };
    list.unshift(snippet);
    store.snippets[user.id] = list.slice(0, 30);

    const prog = store.progress[user.id] || createEmptyProgress();
    prog.xp += 15;
    prog.activities.unshift({
      id: 'act-' + crypto.randomUUID().slice(0, 8),
      type: 'snippet',
      label: `Saved snippet: ${snippet.title}`,
      xpDelta: 15,
      timestamp: new Date().toISOString(),
    });
    prog.activities = prog.activities.slice(0, 20);
    store.progress[user.id] = prog;
    saveStore(store);
    res.json({ snippets: store.snippets[user.id], progress: prog });
  });

  app.delete('/api/snippets/:id', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (!user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }
    const id = req.params.id;
    const list = store.snippets[user.id] || [];
    store.snippets[user.id] = list.filter((s) => s.id !== id);
    saveStore(store);
    res.json({ snippets: store.snippets[user.id] });
  });

  // --- PYTHON 3.11 SANDBOX EXECUTION ---
  app.post('/api/execute/python', async (req: Request, res: Response) => {
    const code = typeof req.body?.code === 'string' ? req.body.code : '';
    if (!code.trim()) {
      res.status(400).json({ error: 'No Python code provided.' });
      return;
    }
    if (code.length > 8000) {
      res.status(400).json({ error: 'Code exceeds 8,000 character sandbox limit.' });
      return;
    }
    const blockedPatterns = [
      /\bimport\s+os\b/,
      /\bfrom\s+os\b/,
      /\bimport\s+subprocess\b/,
      /\bfrom\s+subprocess\b/,
      /\bimport\s+socket\b/,
      /\bimport\s+shutil\b/,
      /\b__import__\b/,
      /\bopen\s*\(/,
    ];
    if (blockedPatterns.some((re) => re.test(code))) {
      res.status(400).json({
        error: 'Sandbox security policy blocks filesystem, network, and subprocess imports (os, subprocess, socket, open).',
      });
      return;
    }

    const start = Date.now();
    try {
      const { stdout, stderr } = await execFileAsync('python3', ['-I', '-c', code], {
        timeout: 3000,
        maxBuffer: 256 * 1024,
      });
      res.json({
        stdout: stdout || '',
        stderr: stderr || '',
        durationMs: Date.now() - start,
      });
    } catch (err: unknown) {
      const durationMs = Date.now() - start;
      const execErr = err as { stdout?: string; stderr?: string; message?: string; killed?: boolean };
      if (execErr.killed) {
        res.json({
          stdout: execErr.stdout || '',
          stderr: 'Execution timed out after 3,000ms (check for infinite loops).',
          durationMs,
        });
        return;
      }
      res.json({
        stdout: execErr.stdout || '',
        stderr: execErr.stderr || execErr.message || 'Python execution failed.',
        durationMs,
      });
    }
  });

  // --- C++17 (G++) SANDBOX COMPILATION & EXECUTION ---
  app.post('/api/execute/cpp', async (req: Request, res: Response) => {
    const code = typeof req.body?.code === 'string' ? req.body.code : '';
    const stdinData = typeof req.body?.stdin === 'string' ? req.body.stdin : '';
    const expectedOutput = typeof req.body?.expectedOutput === 'string' ? req.body.expectedOutput : '';

    if (!code.trim()) {
      res.status(400).json({ error: 'C++ kodi kiritilmagan.' });
      return;
    }
    if (code.length > 16000) {
      res.status(400).json({ error: 'Kod hajmi 16,000 belgidan oshmasligi kerak.' });
      return;
    }
    const blockedCpp = [
      /\bsystem\s*\(/,
      /\bpopen\s*\(/,
      /\bfork\s*\(/,
      /\bexec[lv]/,
      /#include\s*<sys\/socket\.h>/,
      /#include\s*<unistd\.h>/,
    ];
    if (blockedCpp.some((re) => re.test(code))) {
      res.status(400).json({
        error: 'Sandbox xavfsizlik qoidasiga ko‘ra tizim chaqiruvlari (system, fork, socket) taqiqlangan.',
      });
      return;
    }

    const start = Date.now();
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeverse-cpp-'));
    const srcFile = path.join(tmpDir, 'main.cpp');
    const binFile = path.join(tmpDir, 'main');

    try {
      fs.writeFileSync(srcFile, code, 'utf8');
      try {
        await execFileAsync('g++', ['-std=c++17', '-O2', srcFile, '-o', binFile], {
          timeout: 6000,
          maxBuffer: 512 * 1024,
        });
      } catch (compErr: unknown) {
        const ce = compErr as { stderr?: string; message?: string };
        res.json({
          passed: false,
          status: 'Compilation Error',
          stdout: '',
          stderr: (ce.stderr || ce.message || 'Compilation failed').replaceAll(srcFile, 'main.cpp'),
          expectedOutput,
          durationMs: Date.now() - start,
        });
        return;
      }

      const runResult = await new Promise<{ stdout: string; stderr: string; exitCode: number | null; timedOut: boolean }>((resolve) => {
        const child = spawn(binFile, [], { stdio: ['pipe', 'pipe', 'pipe'] });
        let out = '';
        let err = '';
        let timedOut = false;

        const timer = setTimeout(() => {
          timedOut = true;
          child.kill('SIGKILL');
        }, 2500);

        child.stdout.on('data', (chunk: Buffer) => {
          if (out.length < 65536) out += chunk.toString('utf8');
        });
        child.stderr.on('data', (chunk: Buffer) => {
          if (err.length < 65536) err += chunk.toString('utf8');
        });
        child.on('close', (codeExit) => {
          clearTimeout(timer);
          resolve({ stdout: out, stderr: err, exitCode: codeExit, timedOut });
        });

        child.stdin.write(stdinData);
        child.stdin.end();
      });

      const normalize = (val: string) =>
        val
          .replace(/\r\n/g, '\n')
          .split('\n')
          .map((line) => line.trimEnd())
          .join('\n')
          .trim();

      const normOut = normalize(runResult.stdout);
      const normExp = normalize(expectedOutput);
      const durationMs = Date.now() - start;

      if (runResult.timedOut) {
        res.json({
          passed: false,
          status: 'Runtime Error',
          stdout: normOut,
          stderr: 'Vaqt limiti oshib ketdi (2.5 soniya). Cheksiz siklni tekshiring.',
          expectedOutput: normExp,
          durationMs,
        });
        return;
      }

      if (runResult.exitCode !== 0) {
        res.json({
          passed: false,
          status: 'Runtime Error',
          stdout: normOut,
          stderr: runResult.stderr || `Dastur ${runResult.exitCode} kodi bilan to‘xtadi.`,
          expectedOutput: normExp,
          durationMs,
        });
        return;
      }

      const passed = normOut === normExp;
      res.json({
        passed,
        status: passed ? 'Accepted' : 'Wrong Answer',
        stdout: normOut,
        stderr: runResult.stderr,
        expectedOutput: normExp,
        durationMs,
      });
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  // --- GEMINI AI ENDPOINTS ---
  app.post('/api/gemini/tutor', async (req: Request, res: Response) => {
    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'Gemini API key is not configured yet. Please select or add GEMINI_API_KEY in Settings > Secrets.',
      });
      return;
    }

    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    const lang = req.body?.lang === 'uz' ? 'uz' : req.body?.lang === 'both' ? 'both' : 'en';
    const courseContext = typeof req.body?.courseContext === 'string' ? req.body.courseContext.slice(0, 120) : 'General Programming';
    const rawHistory = Array.isArray(req.body?.history) ? req.body.history.slice(-10) : [];

    if (!message || message.length > 4000) {
      res.status(400).json({ error: 'Please enter a valid question (1-4000 characters).' });
      return;
    }

    const langInstruction =
      lang === 'uz'
        ? 'Respond primarily in clear, modern Uzbek (Latin script), using clean English technical keywords in parentheses where helpful.'
        : lang === 'both'
          ? 'Provide a clear explanation in Uzbek (Latin script) followed by a concise English summary.'
          : 'Respond in clear, concise, encouraging English.';

    const systemInstruction = `You are the official CODEVERSE AI Mentor ("Learn. Code. Create."), guiding Uzbek programming students from beginner to advanced software engineering.
Active learning context: ${courseContext}.
${langInstruction}
Teaching guidelines:
- Be concise, structured, and practical.
- When explaining bugs or algorithms, show step-by-step reasoning and clean code blocks.
- Encourage the student to think critically rather than giving vague generic answers.`;

    const contents = [
      ...rawHistory
        .filter((m: unknown): m is { role: string; content: string } => Boolean(m && typeof (m as { content?: unknown }).content === 'string'))
        .map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(m.content).slice(0, 2000) }],
        })),
      { role: 'user', parts: [{ text: message }] },
    ];

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction,
        },
      });

      const reply = response.text?.trim() || 'Unable to generate a response right now. Please try again.';

      const store = loadStore();
      const user = getSessionUser(req, store);
      if (user) {
        const chats = store.chats[user.id] || [];
        const now = new Date().toISOString();
        chats.push(
          { id: 'msg-' + crypto.randomUUID().slice(0, 8), role: 'user', content: message, timestamp: now, topic: courseContext },
          { id: 'msg-' + crypto.randomUUID().slice(0, 8), role: 'assistant', content: reply, timestamp: now, topic: courseContext }
        );
        store.chats[user.id] = chats.slice(-40);
        saveStore(store);
      }

      res.json({ reply });
    } catch (err: unknown) {
      console.error('Gemini tutor error:', err);
      const msg = err instanceof Error ? err.message : 'Gemini API request failed.';
      res.status(500).json({ error: msg });
    }
  });

  app.post('/api/gemini/clear-chat', (req: Request, res: Response) => {
    const store = loadStore();
    const user = getSessionUser(req, store);
    if (user) {
      store.chats[user.id] = [];
      saveStore(store);
    }
    res.json({ ok: true });
  });

  app.post('/api/gemini/review-code', async (req: Request, res: Response) => {
    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'Gemini API key is not configured yet. Please select or add GEMINI_API_KEY in Settings > Secrets.',
      });
      return;
    }

    const code = typeof req.body?.code === 'string' ? req.body.code : '';
    const language = typeof req.body?.language === 'string' ? req.body.language : 'javascript';
    const lang = req.body?.lang === 'uz' ? 'uz' : 'en';

    if (!code.trim() || code.length > 8000) {
      res.status(400).json({ error: 'Provide 1-8000 characters of code to review.' });
      return;
    }

    const languageRule =
      lang === 'uz'
        ? 'Write summary, issues, and suggestions in clear Uzbek (Latin script). Keep improvedCode in valid programming syntax.'
        : 'Write summary, issues, and suggestions in clear, constructive English.';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Review this ${language} student code:\n\n\`\`\`${language}\n${code}\n\`\`\``,
        config: {
          systemInstruction: `You are a senior software engineer reviewing student code on CODEVERSE. ${languageRule}`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING, description: 'Concise 1-2 sentence overall assessment.' },
              complexity: { type: Type.STRING, description: 'Estimated time & space complexity, e.g. O(n) time, O(1) space.' },
              issues: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Specific bugs, edge cases, or anti-patterns found (empty if none).',
              },
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Actionable improvements for readability, safety, or performance.',
              },
              improvedCode: { type: Type.STRING, description: 'Clean refactored version of the code.' },
            },
            required: ['summary', 'complexity', 'issues', 'suggestions', 'improvedCode'],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim());
      res.json({ review: parsed });
    } catch (err: unknown) {
      console.error('Gemini code review error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to review code with Gemini.';
      res.status(500).json({ error: msg });
    }
  });

  app.post('/api/gemini/generate-quiz', async (req: Request, res: Response) => {
    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'Gemini API key is not configured yet. Please select or add GEMINI_API_KEY in Settings > Secrets.',
      });
      return;
    }

    const topic = typeof req.body?.topic === 'string' ? req.body.topic.slice(0, 120) : 'Python Programming';
    const difficulty = typeof req.body?.difficulty === 'string' ? req.body.difficulty : 'Beginner';
    const lang = req.body?.lang === 'uz' ? 'uz' : 'en';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Generate 1 fresh multiple-choice programming practice question about "${topic}" at ${difficulty} level.`,
        config: {
          systemInstruction:
            lang === 'uz'
              ? 'Create accurate programming quiz questions in clear Uzbek (Latin script) with 4 distinct options and a helpful explanation.'
              : 'Create accurate programming quiz questions in clear English with 4 distinct options and a helpful explanation.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
            },
            required: ['question', 'options', 'correctIndex', 'explanation'],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim());
      res.json({ generated: parsed });
    } catch (err: unknown) {
      console.error('Gemini quiz gen error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to generate bonus quiz question.';
      res.status(500).json({ error: msg });
    }
  });

  // --- VITE / STATIC FRONTEND SERVING ---
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CODEVERSE server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
