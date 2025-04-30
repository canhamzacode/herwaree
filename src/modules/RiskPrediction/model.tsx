export interface IRiskPredictions {
  question: string;
  options: string[];
}

export type QuestionType = 'option' | 'text' | 'date' | 'number';

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: {
    value: string;
    label: string;
  }[];
  description?: string;
  image?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: any;
}

export interface RiskPredictionValues {
  T1: number;
  T2: number;
  N_Biop: number;
  HypPlas: string;
  AgeMen: string;
  Age1st: string;
  N_Rels: string;
  Race: string;
}
