import DuoInput from "@src/components/input/DuoInput";
import { PairMetadata, QuestionMetadata } from "@src/utils/interfaces/question";
import { Button } from "primereact/button";
import { FC, useState } from "react";
import styles from "./pairWordsTiles.module.scss";

interface PairWordsTileProps {
  questionMetadata?: QuestionMetadata;
  onChange: (key: string, value: any) => void;
  errors: any;
}

const PairWordsTile: FC<PairWordsTileProps> = ({
  questionMetadata,
  onChange,
  errors,
}) => {
  const [metadata, setMetadata] = useState<QuestionMetadata>(
    questionMetadata || { pairs: [{ word: "", match: "" }] }
  );

  const handleChange = (key: keyof PairMetadata, value: any, index: number) => {
    const newMetadata = { ...metadata };
    newMetadata.pairs![index][key] = value;

    setMetadata(newMetadata);
    onChange("metadata", newMetadata);
  };

  const handleAddOption = () => {
    const newMetadata = { ...metadata };
    newMetadata.pairs!.push({ word: "", match: "" });

    setMetadata(newMetadata);
    onChange("metadata", newMetadata);
  };

  return (
    <div>
      <span className={styles.spanPair}>Pairs</span>
      {metadata.pairs?.map((pair, index) => (
        <div className={styles.containerPair}>
          <DuoInput
            placeholder="Word"
            name="word"
            value={pair.word}
            onChange={(key, value) =>
              handleChange(key as keyof PairMetadata, value, index)
            }
            className={styles.word}
          />
          <DuoInput
            placeholder="Match"
            name="match"
            value={pair.match}
            onChange={(key, value) =>
              handleChange(key as keyof PairMetadata, value, index)
            }
            className={styles.match}
          />
        </div>
      ))}
      {errors && (
        <small style={{ color: "red", fontSize: "14px", marginTop: "7px" }}>
          {errors}
        </small>
      )}
      <Button onClick={handleAddOption} className={styles.addButton}>
        Add pairs
      </Button>
    </div>
  );
};

export default PairWordsTile;
