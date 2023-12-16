import { TypesOfQuestionsEnum } from "../enums/typesOfQuestions.enum";

export interface Question {
  id?: number;
  lessonId?: number;
  text: string;
  type: TypesOfQuestionsEnum;
  feedback: string;
  order: number;

  metadata: QuestionMetadata;
}

export interface QuestionMetadata {
  answer?: string;
  options?: string[];
  answers?: string[];
  pairs?: PairMetadata;
}

export interface PairMetadata {
  word: string;
  match: string;
}
