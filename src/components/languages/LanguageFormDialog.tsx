import { FC, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import DuoInput from "../input/DuoInput";
import { Language } from "../../utils/interfaces/language";
import Button from "../button/buttons";

interface LanguageDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (language?: Partial<Language>) => void;
  language?: Language;
}

const LanguageFormDialog: FC<LanguageDialogProps> = ({
  visible,
  onClose,
  language: languageToEdit,
  onSubmit,
}) => {
  const [language, setLanguage] = useState<Partial<Language> | undefined>(
    languageToEdit
  );
  const [errors, setErrors] = useState<any>({});

  const handleClose = () => {
    setLanguage(undefined);
    onClose();
  };

  const validateForm = (
    handleSubmit: (language?: Partial<Language>) => void
  ) => {
    const newErrors: any = {};
    if (!language?.name) {
      newErrors.name = "Name is required";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleSubmit(language);
  };

  useEffect(() => {
    if (languageToEdit) {
      setLanguage(languageToEdit);
    }
  }, [languageToEdit]);

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
    setLanguage({
      ...language,
      [key]: value,
    });
  };

  return (
    <div>
    <Dialog
      header="Header"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={handleClose}
      footer={footerContent}
    >
      <DuoInput
        placeholder="Name or Language"
        name="name"
        value={language?.name}
        error={errors.name}
        onChange={handleChange}
      />
    </Dialog>
    </div>
  );
};

export default LanguageFormDialog;
