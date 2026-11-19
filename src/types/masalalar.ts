export type CppLevel =
  | 'Beginner'
  | 'Elementary'
  | 'Intermediate'
  | 'Upper-Intermediate'
  | 'Advanced';

export interface PrerequisiteTopic {
  title: string;
  description: string;
  courseId?: string;
}

export interface CppProblem {
  id: string;
  collectionId: string;
  number: number;
  code: string;
  title: string;
  statementUz: string;
  inputSpecUz: string;
  outputSpecUz: string;
  sampleInput: string;
  sampleOutput: string;
  difficulty: CppLevel;
  topicTag: string;
  starterCode: string;
  hintUz: string;
  solutionCode: string;
  explanationUz: string;
}

export interface CppCollection {
  id: string;
  order: number;
  prefix: string;
  title: string;
  descriptionUz: string;
  targetCount: number;
  recommendedLevel: CppLevel;
  prerequisites: PrerequisiteTopic[];
  problems: CppProblem[];
}

export interface CppCheckResult {
  passed: boolean;
  status: 'Accepted' | 'Wrong Answer' | 'Compilation Error' | 'Runtime Error';
  stdout: string;
  stderr: string;
  expectedOutput: string;
  durationMs: number;
}
