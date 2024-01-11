import DuoInput from "@src/components/input/DuoInput";
import { QuestionMetadata } from "@src/utils/interfaces/question";
import { Button } from "primereact/button";
import { FC, useState } from "react";
import styles from "./questionType.module.scss";

interface QuestionTypeProps {
  questionMetadata?: QuestionMetadata;
  onChange: (key: string, value: any) => void;
  errors: any;
}

const QuestionType: FC<QuestionTypeProps> = ({
  questionMetadata,
  onChange,
  errors,
}) => {
  const [metadata, setMetadata] = useState<QuestionMetadata>(
    questionMetadata || { answer: "", options: [] }
  );

  const handleChange = (key: string, value: any) => {
    const newMetadata = { ...metadata };

    if (key !== "answer") {
      const index = Number(key.split("-")[1]);
      newMetadata.options![index] = value;
    } else {
      newMetadata.answer = value;
    }
    setMetadata(newMetadata);
    onChange("metadata", newMetadata);
  };

  const handleAddOption = () => {
    const newMetadata = { ...metadata };
    newMetadata.answer = metadata.answer;
    newMetadata.options?.push("");

    setMetadata(newMetadata);
    onChange("metadata", newMetadata);
  };

  return (
    <div>
      <span className={styles.spanAnswer}>Answer</span>
      <DuoInput
        placeholder="Answer"
        name="answer"
        value={metadata.answer}
        onChange={handleChange}
        className={styles.answer}
      />
      {metadata.options?.map((opt, index) => (
        <DuoInput
          placeholder={`Option ${index + 1}`}
          name={`option-${index}`}
          value={opt}
          onChange={handleChange}
        />
      ))}
      {errors && (
        <small style={{ color: "red", fontSize: "14px", marginTop: "7px" }}>
          {errors}
        </small>
      )}
      <Button onClick={handleAddOption} className={styles.addButton}>
        Add option
      </Button>
    </div>
  );
};

export default QuestionType;
