import { FC, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import DuoInput from "../../input/DuoInput";
import { Language } from "../../../utils/interfaces/language";
import Button from "../../button/buttons";
import { validateLanguageForm } from "../validators/languageValidator";
import styles from "./languageFormDialog.module.scss";

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
    const newErrors = validateLanguageForm(language);

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
    setLanguage({
      ...language,
      [key]: value,
    });
  };

  return (
    <div className="card">
      <Dialog
        header="Language"
        visible={visible}
        style={{ width: "35vw" }}
        onHide={handleClose}
        footer={footerContent}
      >
        <div>
          <DuoInput
            placeholder="Name or Language"
            name="name"
            value={language?.name}
            error={errors.name}
            onChange={handleChange}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default LanguageFormDialog;
