import { TypesOfQuestionsEnum } from "@src/utils/enums/typesOfQuestions.enum";
import { Question } from "@src/utils/interfaces/question";

export const validateQuestionForm = (question?: Partial<Question>) => {
  const newErrors: any = {};

  if (!question?.text) {
    newErrors.text = !question?.text && "Text is requeried";
  }

  if (!question?.order) {
    newErrors.order = !question?.order && "The order is requeried";
  }

  if (
    question?.type === undefined ||
    !(question.type in TypesOfQuestionsEnum)
  ) {
    newErrors.type = "type is requeried";
  }

  if (!question?.type) {
    newErrors.type = "debe seleccionar";
  }

  if (question?.type === TypesOfQuestionsEnum.TranslateTyping) {
    if (!question.metadata?.answers?.length) {
      newErrors.metadata = "At least one answer is required";
    }
    if (question.metadata?.options?.some((ans) => !ans)) {
      newErrors.metadata = "All answers must have content";
    }
  }

  if (question?.type === TypesOfQuestionsEnum.PairWordsWithTiles) {
    if (!question.metadata?.pairs?.length) {
      newErrors.metadata = "At least one pair is required";
    }
  }

  if (
    question?.type === TypesOfQuestionsEnum.TranslateWithTiles ||
    question?.type === TypesOfQuestionsEnum.ChooseImageAccordingToWord ||
    question?.type === TypesOfQuestionsEnum.Conversation
  ) {
    if (!question.metadata?.answer?.length) {
      newErrors.metadata = "At least one answer is required";
    }
    if (!question.metadata?.options?.length) {
      newErrors.metadata = "At least one option is required";
    }
  }
  return newErrors;
};
