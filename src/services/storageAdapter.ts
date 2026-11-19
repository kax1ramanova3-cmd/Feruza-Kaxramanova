import type {
  ChatMessage,
  CodeSnippet,
  Lang,
  UserProfile,
  UserProgress,
} from '../types/codeverse';

export type StorageBackendMode = 'local' | 'firebase';

export interface LocalWorkspaceState {
  lang: Lang;
  token: string | null;
  user: UserProfile | null;
  progress: UserProgress;
  snippets: CodeSnippet[];
  chats: ChatMessage[];
  updatedAt: string;
}

/**
 * Abstraction interface designed so Firebase Authentication and Cloud Firestore
 * can be plugged in later without changing UI components.
 */
export interface CodeversePersistenceAdapter {
  readonly mode: StorageBackendMode;
  readonly description: string;
  loadState(): LocalWorkspaceState;
  saveState(state: LocalWorkspaceState): void;
  clearSession(): void;
}

const STORAGE_KEY = 'codeverse_workspace_v1';

export function createDemoProgress(): UserProgress {
  return {
    xp: 355,
    streakDays: 5,
    enrolledCourseIds: ['python-foundations', 'cpp-foundations'],
    completedLessonIds: ['py-1', 'py-2', 'cpp-1'],
    solvedProblemIds: ['col-1-begin-1', 'col-1-begin-2', 'col-2-integer-1'],
    quizAttempts: [
      {
        id: 'qa-local-1',
        courseId: 'python-foundations',
        courseTitle: 'Python & Algorithmic Thinking',
        score: 4,
        total: 4,
        percentage: 100,
        timestamp: new Date().toISOString(),
      },
    ],
    bookmarkedMaterialIds: ['mat-textbook-cpp', 'mat-cambridge-9618'],
    activities: [
      {
        id: 'act-local-1',
        type: 'cpp',
        label: 'Solved C++ Integer1 (Metrlar hisoblagichi)',
        xpDelta: 25,
        timestamp: new Date().toISOString(),
      },
      {
        id: 'act-local-2',
        type: 'lesson',
        label: 'Completed: C++17 Streams, Types & Precision',
        xpDelta: 50,
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

export function createEmptyGuestProgress(): UserProgress {
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

export function createDefaultSnippets(): CodeSnippet[] {
  return [
    {
      id: 'snip-local-cpp-1',
      title: 'C++17 Fast I/O Template',
      language: 'cpp',
      code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    cout << "Salom, CODEVERSE!" << "\\n";\n    return 0;\n}`,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'snip-local-py-1',
      title: 'Tashkent Grant Calculator',
      language: 'python',
      code: `score = 94\nprint("Status:", "Full Grant" if score >= 90 else "Standard")`,
      updatedAt: new Date().toISOString(),
    },
  ];
}

export const localStorageAdapter: CodeversePersistenceAdapter = {
  mode: 'local',
  description:
    'Local Demo Data + Browser localStorage (Firebase Auth & Cloud Firestore Ready)',

  loadState(): LocalWorkspaceState {
    const fallback: LocalWorkspaceState = {
      lang: 'uz',
      token: null,
      user: null,
      progress: createDemoProgress(),
      snippets: createDefaultSnippets(),
      chats: [],
      updatedAt: new Date().toISOString(),
    };

    if (typeof window === 'undefined') return fallback;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return fallback;
      }
      const parsed = JSON.parse(raw) as Partial<LocalWorkspaceState>;
      return {
        lang: parsed.lang === 'en' ? 'en' : 'uz',
        token: typeof parsed.token === 'string' ? parsed.token : null,
        user: parsed.user ?? null,
        progress: {
          ...createDemoProgress(),
          ...(parsed.progress ?? {}),
          solvedProblemIds: parsed.progress?.solvedProblemIds ?? [],
          enrolledCourseIds: parsed.progress?.enrolledCourseIds ?? [],
          completedLessonIds: parsed.progress?.completedLessonIds ?? [],
          quizAttempts: parsed.progress?.quizAttempts ?? [],
          bookmarkedMaterialIds: parsed.progress?.bookmarkedMaterialIds ?? [],
          activities: parsed.progress?.activities ?? [],
        },
        snippets: Array.isArray(parsed.snippets)
          ? parsed.snippets
          : createDefaultSnippets(),
        chats: Array.isArray(parsed.chats) ? parsed.chats : [],
        updatedAt: parsed.updatedAt ?? new Date().toISOString(),
      };
    } catch {
      return fallback;
    }
  },

  saveState(state: LocalWorkspaceState): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...state,
          updatedAt: new Date().toISOString(),
        }),
      );
    } catch {
      // Ignore storage quota errors cleanly
    }
  },

  clearSession(): void {
    const current = this.loadState();
    this.saveState({
      ...current,
      token: null,
      user: null,
    });
  },
};
