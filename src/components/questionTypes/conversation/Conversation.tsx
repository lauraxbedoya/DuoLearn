import { QuestionMetadata } from "@src/utils/interfaces/question";
import QuestionType from "../QuestionType";
import { FC } from "react";

interface ConversationProps {
  questionMetadata?: QuestionMetadata;
  onChange: (key: string, value: any) => void;
  errors: any;
}

const Conversation: FC<ConversationProps> = ({
  questionMetadata,
  onChange,
  errors,
}) => {
  return (
    <QuestionType
      questionMetadata={questionMetadata}
      onChange={onChange}
      errors={errors}
    />
  );
};

export default Conversation;
