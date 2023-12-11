import { FC, useEffect, useState } from "react";
import Button from "../button/buttons";
import { Dialog } from "primereact/dialog";
import DuoInput from "../input/DuoInput";
import { Lesson } from "@src/utils/interfaces/lesson";
import { InputSwitch } from "primereact/inputswitch";

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
    const newErrors: any = {};
    if (
      !lesson?.experience ||
      !lesson?.practiceExperience ||
      !lesson?.isPractice ||
      !lesson?.order
    ) {
      newErrors.name = "Field are required";
    }

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
    setLesson({
      ...lesson,
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
        placeholder="Experience"
        name="experience"
        value={lesson?.experience}
        error={errors.experience}
        onChange={handleChange}
      />

      <DuoInput
        placeholder="Practice Experience"
        name="practiceExperience"
        type="number"
        value={lesson?.practiceExperience}
        error={errors.practiceExperience}
        onChange={handleChange}
      />

      <InputSwitch
        checked={lesson?.isPractice || false}
        name="isPractice"
        onChange={(e) => handleChange(e.target.name, e.value)}
      />

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
