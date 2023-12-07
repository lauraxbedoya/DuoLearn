import { FC, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import DuoInput from "../input/DuoInput";
import Button from "../button/buttons";
import { Section } from "@src/utils/interfaces/section";
import { InputSwitch } from "primereact/inputswitch";

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
    const newErrors: any = {};
    if (!section?.description || !section?.color || !section?.order) {
      newErrors.name = "Field are required";
    }

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
    setSection({
      ...section,
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
        placeholder="Description"
        name="description"
        value={section?.description}
        error={errors.description}
        onChange={handleChange}
      />

      <DuoInput
        placeholder="Color"
        name="color"
        value={section?.color}
        error={errors.color}
        onChange={handleChange}
      />

      <DuoInput
        placeholder="Order"
        name="order"
        value={section?.order}
        error={errors.order}
        onChange={handleChange}
      />

      <InputSwitch
        checked={section?.enabled || false}
        name="enabled"
        onChange={(e) => handleChange(e.target.name, e.value)}
      />
    </Dialog>
  );
};

export default SectionFormDialog;
