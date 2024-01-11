import { FC, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import DuoInput from "../../input/DuoInput";
import Button from "../../button/buttons";
import { Section } from "@src/utils/interfaces/section";
import { InputSwitch } from "primereact/inputswitch";
import { validateSectionForm } from "../validators/sectionValidator";
import styles from "./sectionFormDialog.module.scss";
import { ColorPicker } from "primereact/colorpicker";

interface SectionDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (section?: Partial<Section>) => void;
  section?: Section;
}

const SectionFormDialog: FC<SectionDialogProps> = ({
  visible,
  onClose,
  section: sectionToEdit,
  onSubmit,
}) => {
  const [section, setSection] = useState<Partial<Section> | undefined>(
    sectionToEdit
  );
  const [errors, setErrors] = useState<any>({});

  const handleClose = () => {
    setSection(undefined);
    onClose();
  };

  const validateForm = (handleSubmit: (section?: Partial<Section>) => void) => {
    const newErrors = validateSectionForm(section);

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleSubmit(section);
  };

  useEffect(() => {
    if (sectionToEdit) {
      setSection(sectionToEdit);
    }
  }, [sectionToEdit]);

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
    setSection({
      ...section,
      [key]: value,
    });
  };

  return (
    <Dialog
      header="Section"
      visible={visible}
      style={{ width: "35vw" }}
      onHide={handleClose}
      footer={footerContent}
    >
      <DuoInput
        placeholder="Description"
        name="description"
        value={section?.description}
        error={errors.description}
        onChange={handleChange}
        className={styles.description}
      />

      <div className={styles.containerInput}>
        <span className={styles.spanInput}>Color</span>
        <ColorPicker
          value={section?.color}
          name="color"
          onChange={(e) => handleChange(e.target.name, e.value)}
          className={styles.color}
        />
      </div>

      <DuoInput
        placeholder="Order"
        name="order"
        value={section?.order}
        error={errors.order}
        onChange={handleChange}
        className={styles.order}
      />

      <div className={styles.containerInput}>
        <span className={styles.spanInput}>Enabled</span>
        <InputSwitch
          checked={section?.enabled || false}
          name="enabled"
          onChange={(e) => handleChange(e.target.name, e.value)}
        />
      </div>
    </Dialog>
  );
};

export default SectionFormDialog;
