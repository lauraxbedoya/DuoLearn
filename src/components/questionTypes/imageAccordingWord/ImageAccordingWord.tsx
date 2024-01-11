import { QuestionMetadata } from "@src/utils/interfaces/question";
import QuestionType from "../QuestionType";
import { FC } from "react";

interface ImageAccordingWordProps {
  questionMetadata?: QuestionMetadata;
  onChange: (key: string, value: any) => void;
  errors: any;
}

const ImageAccordingWord: FC<ImageAccordingWordProps> = ({
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

export default ImageAccordingWord;
