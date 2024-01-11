import { FC, useEffect, useState } from "react";
import Button from "../../button/buttons";
import { Dialog } from "primereact/dialog";
import DuoInput from "../../input/DuoInput";
import { Question } from "@src/utils/interfaces/question";
import { Dropdown } from "primereact/dropdown";
import { TypesOfQuestionsEnum } from "@src/utils/enums/typesOfQuestions.enum";
import TranslateTyping from "@src/components/questionTypes/translateTyping/TranslateTyping";
import Conversation from "@src/components/questionTypes/conversation/Conversation";
import TranslateTile from "@src/components/questionTypes/translateTiles/TranslateTile";
import ImageAccordingWord from "@src/components/questionTypes/imageAccordingWord/ImageAccordingWord";
import PairWordsTile from "@src/components/questionTypes/pairWordsTiles/PairWordsTiles";
import { validateQuestionForm } from "../validators/questionValidator";
import styles from "./questionFormDialog.module.scss";

interface QuestionDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (question?: Partial<Question>) => void;
  question?: Question;
}

const typeOfQuestions = [
  {
    name: "Translate with tiles",
    value: TypesOfQuestionsEnum.TranslateWithTiles,
  },
  { name: "Translate typing", value: TypesOfQuestionsEnum.TranslateTyping },
  {
    name: "Pair words with tiles",
    value: TypesOfQuestionsEnum.PairWordsWithTiles,
  },
  {
    name: "choose image according to word",
    value: TypesOfQuestionsEnum.ChooseImageAccordingToWord,
  },
  { name: "conversation", value: TypesOfQuestionsEnum.Conversation },
];

const QuestionFormDialog: FC<QuestionDialogProps> = ({
  visible,
  onClose,
  question: questionToEdit,
  onSubmit,
}) => {
  const [question, setQuestion] = useState<Partial<Question> | undefined>(
    questionToEdit
  );
  const [errors, setErrors] = useState<any>({});

  const handleClose = () => {
    setQuestion(undefined);
    onClose();
  };

  const validateForm = (
    handleSubmit: (question?: Partial<Question>) => void
  ) => {
    const newErrors = validateQuestionForm(question);

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleSubmit(question);
  };

  const handleChange = (key: string, value: any) => {
    setQuestion({
      ...question,
      metadata: key === "type" ? undefined : question?.metadata,
      [key]: value,
    });
  };

  useEffect(() => {
    if (visible && questionToEdit) {
      setQuestion(questionToEdit);
    }
  }, [questionToEdit, visible]);

  const footerContent = (
    <div className={styles.containerButtonsAction}>
      <Button
        isMain
        onClick={() => validateForm(onSubmit)}
        autoFocus
        size="sm"
        className={styles.addButton}
      >
        Add
      </Button>
      <Button onClick={handleClose} className={styles.cancelButton} size="sm">
        Cancel
      </Button>
    </div>
  );

  return (
    <Dialog
      header="Question"
      visible={visible}
      style={{ width: "35vw" }}
      onHide={handleClose}
      footer={footerContent}
    >
      <DuoInput
        placeholder="text"
        name="text"
        value={question?.text}
        error={errors.text}
        onChange={handleChange}
        className={styles.text}
      />

      <Dropdown
        value={question?.type}
        name="type"
        onChange={(e) => handleChange(e.target.name, e.value)}
        options={typeOfQuestions}
        optionLabel="name"
        optionValue="value"
        placeholder="Select a type of ques"
        className={`w-full md:w-14rem ${styles.type}`}
      />

      {question?.type === TypesOfQuestionsEnum.TranslateTyping && (
        <TranslateTyping
          questionMetadata={question?.metadata}
          onChange={handleChange}
          errors={errors.metadata}
        />
      )}

      {question?.type === TypesOfQuestionsEnum.Conversation && (
        <Conversation
          questionMetadata={question?.metadata}
          onChange={handleChange}
          errors={errors.metadata}
        />
      )}

      {question?.type === TypesOfQuestionsEnum.TranslateWithTiles && (
        <TranslateTile
          questionMetadata={question?.metadata}
          onChange={handleChange}
          errors={errors.metadata}
        />
      )}

      {question?.type === TypesOfQuestionsEnum.ChooseImageAccordingToWord && (
        <ImageAccordingWord
          questionMetadata={question?.metadata}
          onChange={handleChange}
          errors={errors.metadata}
        />
      )}

      {question?.type === TypesOfQuestionsEnum.PairWordsWithTiles && (
        <PairWordsTile
          questionMetadata={question?.metadata}
          onChange={handleChange}
          errors={errors.metadata}
        />
      )}

      <DuoInput
        placeholder="feedback"
        name="feedback"
        value={question?.feedback}
        error={errors.feedback}
        onChange={handleChange}
        className={styles.feedback}
      />

      <DuoInput
        placeholder="Order"
        name="order"
        value={question?.order}
        error={errors.order}
        onChange={handleChange}
      />
    </Dialog>
  );
};

export default QuestionFormDialog;
