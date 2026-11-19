import type { CppCheckResult } from '../types/masalalar';

export interface SandboxRunResult {
  stdout: string;
  stderr: string;
  durationMs: number;
}

/**
 * Strips light TypeScript annotations so students can run TS snippets directly in browser sandbox.
 */
function stripBasicTypeScript(tsCode: string): string {
  return tsCode
    .replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, '')
    .replace(/type\s+\w+\s*=[\s\S]*?;/g, '')
    .replace(/:\s*(string|number|boolean|any|unknown|void|CartItem\[\]|Record<[^>]+>)/g, '')
    .replace(/as\s+\w+(\[\])?/g, '');
}

export async function runJavaScriptSandbox(code: string, isTypeScript = false): Promise<SandboxRunResult> {
  const start = performance.now();
  const logs: string[] = [];
  const prepared = isTypeScript ? stripBasicTypeScript(code) : code;

  const mockConsole = {
    log: (...args: unknown[]) => {
      logs.push(
        args
          .map((a) => (typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a)))
          .join(' '),
      );
    },
    error: (...args: unknown[]) => {
      logs.push('[error] ' + args.map(String).join(' '));
    },
    warn: (...args: unknown[]) => {
      logs.push('[warn] ' + args.map(String).join(' '));
    },
  };

  try {
    const fn = new Function('console', `"use strict";\n${prepared}`);
    const result = fn(mockConsole);
    if (result instanceof Promise) {
      await Promise.race([
        result,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Async execution timed out (2s)')), 2000)),
      ]);
    }
    return {
      stdout: logs.join('\n') || '(Executed with no console output)',
      stderr: '',
      durationMs: Math.round(performance.now() - start),
    };
  } catch (err: unknown) {
    return {
      stdout: logs.join('\n'),
      stderr: err instanceof Error ? err.message : String(err),
      durationMs: Math.round(performance.now() - start),
    };
  }
}

export async function runPythonServer(code: string): Promise<SandboxRunResult> {
  const res = await fetch('/api/execute/python', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      stdout: '',
      stderr: data.error || 'Python execution failed.',
      durationMs: 0,
    };
  }
  return {
    stdout: data.stdout || '',
    stderr: data.stderr || '',
    durationMs: data.durationMs || 0,
  };
}

export async function runCppJudge(
  code: string,
  stdin: string,
  expectedOutput: string,
): Promise<CppCheckResult> {
  const res = await fetch('/api/execute/cpp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, stdin, expectedOutput }),
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      passed: false,
      status: 'Runtime Error',
      stdout: '',
      stderr: data.error || 'C++ tekshiruvida xatolik yuz berdi.',
      expectedOutput,
      durationMs: 0,
    };
  }
  return data as CppCheckResult;
}
