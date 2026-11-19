import { COLLECTIONS_1_TO_7 } from './collections1to7';
import { COLLECTIONS_8_TO_13 } from './collections8to13';
import { COLLECTIONS_14_TO_19 } from './collections14to19';
import type { CppCollection, CppLevel, CppProblem } from '../../types/masalalar';

export const CPP_COLLECTIONS: CppCollection[] = [
  ...COLLECTIONS_1_TO_7,
  ...COLLECTIONS_8_TO_13,
  ...COLLECTIONS_14_TO_19,
];

export const ALL_CPP_PROBLEMS: CppProblem[] = CPP_COLLECTIONS.flatMap((c) => c.problems);

export const CPP_LEVELS: CppLevel[] = [
  'Beginner',
  'Elementary',
  'Intermediate',
  'Upper-Intermediate',
  'Advanced',
];

export function computeStudentCppLevel(solvedCount: number): CppLevel {
  if (solvedCount >= 250) return 'Advanced';
  if (solvedCount >= 120) return 'Upper-Intermediate';
  if (solvedCount >= 50) return 'Intermediate';
  if (solvedCount >= 15) return 'Elementary';
  return 'Beginner';
}

export function recommendNextProblem(
  solvedIds: string[],
  targetLevel?: CppLevel,
): CppProblem | undefined {
  const solvedSet = new Set(solvedIds);
  const level = targetLevel ?? computeStudentCppLevel(solvedIds.length);
  const matchingLevel = ALL_CPP_PROBLEMS.find(
    (p) => !solvedSet.has(p.id) && p.difficulty === level,
  );
  if (matchingLevel) return matchingLevel;
  return ALL_CPP_PROBLEMS.find((p) => !solvedSet.has(p.id)) ?? ALL_CPP_PROBLEMS[0];
}
