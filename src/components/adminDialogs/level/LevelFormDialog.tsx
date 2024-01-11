import { Level } from "@src/utils/interfaces/level";
import { FC, useEffect, useState } from "react";
import Button from "../../button/buttons";
import { Dialog } from "primereact/dialog";
import DuoInput from "../../input/DuoInput";
import { InputSwitch } from "primereact/inputswitch";
import { validateLevelForm } from "../validators/levelValidator";
import styles from "./levelFormDialog.module.scss";

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
    const newErrors = validateLevelForm(level);

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
    setLevel({
      ...level,
      [key]: value,
    });
  };

  return (
    <Dialog
      header="Level"
      visible={visible}
      style={{ width: "35vw" }}
      onHide={handleClose}
      footer={footerContent}
    >
      <DuoInput
        placeholder="Title"
        name="title"
        value={level?.title}
        error={errors.title}
        onChange={handleChange}
        className={styles.title}
      />

      <DuoInput
        placeholder="Description"
        name="description"
        value={level?.description}
        error={errors.description}
        onChange={handleChange}
        className={styles.description}
      />

      <DuoInput
        placeholder="Image"
        name="imageUrl"
        value={level?.imageUrl}
        error={errors.imageUrl}
        onChange={handleChange}
        className={styles.imageUrl}
      />

      <DuoInput
        placeholder="Order"
        name="order"
        value={level?.order}
        error={errors.order}
        onChange={handleChange}
        className={styles.order}
      />

      <DuoInput
        placeholder="Type"
        name="type"
        value={level?.type}
        error={errors.type}
        onChange={handleChange}
        className={styles.type}
      />

      <div className={styles.containerInput}>
        <span className={styles.spanInput}>Enabled</span>
        <InputSwitch
          checked={level?.enabled || false}
          name="enabled"
          onChange={(e) => handleChange(e.target.name, e.value)}
        />
      </div>
    </Dialog>
  );
};

export default LevelFormDialog;
