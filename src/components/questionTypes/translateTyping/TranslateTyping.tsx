import DuoInput from "@src/components/input/DuoInput";
import { QuestionMetadata } from "@src/utils/interfaces/question";
import { Button } from "primereact/button";
import { FC, useState } from "react";
import styles from "./translateTyping.module.scss";

interface TranslateTypingProps {
  questionMetadata?: QuestionMetadata;
  onChange: (key: string, value: any) => void;
  errors: any;
}

const TranslateTyping: FC<TranslateTypingProps> = ({
  questionMetadata,
  onChange,
  errors,
}) => {
  const [metadata, setMetadata] = useState<QuestionMetadata>(
    questionMetadata || { answers: [] }
  );

  const handleChange = (key: string, value: any) => {
    const index = Number(key.split("-")[1]);
    const newMetadata = { ...metadata };
    newMetadata.answers![index] = value;

    setMetadata(newMetadata);
    onChange("metadata", newMetadata);
  };

  const handleAddOption = () => {
    const newMetadata = { ...metadata };
    newMetadata.answers?.push("");

    setMetadata(newMetadata);
    onChange("metadata", newMetadata);
  };

  const handleDelete = async (index: number) => {
    const newMetadata = {
      answers: metadata.answers?.filter((_, i) => i !== index),
    };
    setMetadata(newMetadata);
    onChange("metadata", newMetadata);
  };

  return (
    <div className={styles.container}>
      <span className={styles.spanAnswer}>Answers</span>
      {metadata.answers?.map((ans, index) => (
        <div className={styles.containerAnswer}>
          <DuoInput
            placeholder={`Answer ${index + 1}`}
            name={`answer-${index}`}
            value={ans}
            onChange={handleChange}
          />
          <Button
            icon="pi pi-trash"
            rounded
            text
            severity="secondary"
            onClick={() => handleDelete(index)}
          />
        </div>
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

export default TranslateTyping;
