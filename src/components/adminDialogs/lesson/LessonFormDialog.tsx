import { FC, useEffect, useState } from "react";
import Button from "../../button/buttons";
import { Dialog } from "primereact/dialog";
import DuoInput from "../../input/DuoInput";
import { Lesson } from "@src/utils/interfaces/lesson";
import { InputSwitch } from "primereact/inputswitch";
import { validateLessonForm } from "../validators/lessonValidator";
import styles from "./lessonFormDialog.module.scss";

interface LessonDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (lesson?: Partial<Lesson>) => void;
  lesson?: Lesson;
}

const LessonFormDialog: FC<LessonDialogProps> = ({
  visible,
  onClose,
  lesson: lessonToEdit,
  onSubmit,
}) => {
  const [lesson, setLesson] = useState<Partial<Lesson> | undefined>(
    lessonToEdit
  );
  const [errors, setErrors] = useState<any>({});

  const handleClose = () => {
    setLesson(undefined);
    onClose();
  };

  const validateForm = (handleSubmit: (lesson?: Partial<Lesson>) => void) => {
    const newErrors = validateLessonForm(lesson);

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleSubmit(lesson);
  };

  useEffect(() => {
    if (lessonToEdit) {
      setLesson(lessonToEdit);
    }
  }, [lessonToEdit]);

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

  const handleChange = (key: any, value: any) => {
    setLesson({
      ...lesson,
      [key]: value,
    });
  };

  return (
    <Dialog
      header="Lesson"
      visible={visible}
      style={{ width: "35vw" }}
      onHide={handleClose}
      footer={footerContent}
    >
      <DuoInput
        placeholder="Experience"
        name="experience"
        value={lesson?.experience}
        error={errors.experience}
        onChange={handleChange}
        className={styles.experience}
      />

      <DuoInput
        placeholder="Practice Experience"
        name="practiceExperience"
        type="number"
        value={lesson?.practiceExperience}
        error={errors.practiceExperience}
        onChange={handleChange}
        className={styles.practiceExperience}
      />

      <div className={styles.containerInput}>
        <span className={styles.spanInput}>Enabled</span>
        <InputSwitch
          checked={lesson?.isPractice || false}
          name="isPractice"
          onChange={(e) => handleChange(e.target.name, e.value)}
          className={styles.isPractice}
        />
      </div>

      <DuoInput
        placeholder="Order"
        name="order"
        value={lesson?.order}
        error={errors.order}
        onChange={handleChange}
      />
    </Dialog>
  );
};

export default LessonFormDialog;
