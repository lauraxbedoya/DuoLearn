import { FC, useEffect, useState } from "react";
import Button from "../../button/buttons";
import { Dialog } from "primereact/dialog";
import DuoInput from "../../input/DuoInput";
import { Question } from "@src/utils/interfaces/question";
import { Dropdown } from "primereact/dropdown";
import { TypesOfQuestionsEnum } from "@src/utils/enums/typesOfQuestions.enum";
// import { TypesOfQuestionsEnum } from "@src/utils/enums/typesOfQuestions.enum";

interface QuestionDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (question?: Partial<Question>) => void;
  question?: Question;
}

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

  const typeOfQuestions = [
    { name: "Translate with tiles", value: TypesOfQuestionsEnum.TRANS_TILES },
    {
      name: "Pair words with tiles",
      value: TypesOfQuestionsEnum.PAIR_WORDS_TILES,
    },
    {
      name: "choose image according to word",
      value: TypesOfQuestionsEnum.CHOOSE_IMAGE_ACCOR_WORD,
    },
    { name: "conversation", value: TypesOfQuestionsEnum.CONVERSATION },
    { name: "Translate typing", value: TypesOfQuestionsEnum.TRANS_TYPING },
  ];

  const handleClose = () => {
    setQuestion(undefined);
    onClose();
  };

  const validateForm = (
    handleSubmit: (question?: Partial<Question>) => void
  ) => {
    const newErrors: any = {};
    if (
      !question?.text ||
      !question?.type ||
      !question?.feedback ||
      !question?.order
    ) {
      newErrors.name = "Field are required";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleSubmit(question);
  };

  useEffect(() => {
    if (questionToEdit) {
      setQuestion(questionToEdit);
    }
  }, [questionToEdit]);

  const footerContent = (
    <div>
      <Button onClick={handleClose} className="p-button-text">
        Cancel
      </Button>
      <Button isMain onClick={() => validateForm(onSubmit)} autoFocus>
        Add
      </Button>
    </div>
  );

  const handleChange = (key: any, value: any) => {
    setQuestion({
      ...question,
      [key]: value,
    });
  };

  return (
    <Dialog
      header="Header"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={handleClose}
      footer={footerContent}
    >
      <DuoInput
        placeholder="text"
        name="text"
        value={question?.text}
        error={errors.text}
        onChange={handleChange}
      />

      <Dropdown
        value={question?.type}
        name="type"
        onChange={(e) => handleChange(e.target.name, e.value)}
        options={typeOfQuestions}
        optionLabel="name"
        optionValue="value"
        placeholder="Select a type of ques"
        className="w-full md:w-14rem"
      />

      {question?.type === TypesOfQuestionsEnum.TRANS_TILES && (
        <DuoInput
          placeholder="text"
          name="text"
          value={question?.metadata}
          error={errors.text}
          onChange={handleChange}
        />
      )}

      <DuoInput
        placeholder="feedback"
        name="feedback"
        value={question?.feedback}
        error={errors.feedback}
        onChange={handleChange}
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
