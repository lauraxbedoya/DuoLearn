import { Level } from "@src/utils/interfaces/level";
import { FC, useEffect, useState } from "react";
import Button from "../button/buttons";
import { Dialog } from "primereact/dialog";
import DuoInput from "../input/DuoInput";
import { InputSwitch } from "primereact/inputswitch";

interface LevelDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (level?: Partial<Level>) => void;
  level?: Level;
}

const LevelFormDialog: FC<LevelDialogProps> = ({
  visible,
  onClose,
  level: levelToEdit,
  onSubmit,
}) => {
  const [level, setLevel] = useState<Partial<Level> | undefined>(levelToEdit);
  const [errors, setErrors] = useState<any>({});

  const handleClose = () => {
    setLevel(undefined);
    onClose();
  };

  const validateForm = (handleSubmit: (level?: Partial<Level>) => void) => {
    const newErrors: any = {};
    if (!level?.description || !level?.title || !level?.type || !level?.order) {
      newErrors.name = "Field are required";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleSubmit(level);
  };

  useEffect(() => {
    if (levelToEdit) {
      setLevel(levelToEdit);
    }
  }, [levelToEdit]);

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
    setLevel({
      ...level,
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
        placeholder="Title"
        name="title"
        value={level?.title}
        error={errors.title}
        onChange={handleChange}
      />

      <DuoInput
        placeholder="Description"
        name="description"
        value={level?.description}
        error={errors.description}
        onChange={handleChange}
      />

      <DuoInput
        placeholder="Image"
        name="imageUrl"
        value={level?.imageUrl}
        error={errors.imageUrl}
        onChange={handleChange}
      />

      <DuoInput
        placeholder="Order"
        name="order"
        value={level?.order}
        error={errors.order}
        onChange={handleChange}
      />

      <DuoInput
        placeholder="Type"
        name="type"
        value={level?.type}
        error={errors.type}
        onChange={handleChange}
      />

      <InputSwitch
        checked={level?.enabled || false}
        name="enabled"
        onChange={(e) => handleChange(e.target.name, e.value)}
      />
    </Dialog>
  );
};

export default LevelFormDialog;
