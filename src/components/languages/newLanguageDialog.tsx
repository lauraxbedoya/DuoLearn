import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import DuoInput from '../input/DuoInput';
import { Language } from '../../utils/interfaces/language';
import Button from '../button/buttons';


interface LanguageDialogProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (language?: Language) => void;
    language?: Language;
}

const defaultLanguageValues = {
    name: '',
    flagUrl: ''
};

const NewLanguageDialog: FC<LanguageDialogProps> = ({
    visible,
    onClose,
    language: languageToEdit,
    onSubmit,
}) => {

    const [language, setLanguage] = useState<Language | undefined>(languageToEdit);
    const [errors, setErrors] = useState<any>({});

    const handleClose = () => {
        onClose();
    }

    const validateForm = (handleSubmit: (language?: Language) => void) => {
        const newErrors = { ...errors };
        if (!language?.name) {
            newErrors.name = 'Name is required';
        }

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        handleSubmit(language);
    }

    useEffect(() => {
        if (languageToEdit) {
            setLanguage(languageToEdit);
        }
    }, [languageToEdit]);

    const footerContent = (
        <div>
            <Button onClick={handleClose} className="p-button-text" >Cancel</Button>
            <Button isMain onClick={() => validateForm(onSubmit)} autoFocus >Add</Button>
        </div>
    );

    return (
        <Dialog
            header="Header"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={handleClose}
            footer={footerContent}
        >
            <DuoInput
                placeholder='Name or Language'
                name="name"
                value={language?.name}
                error={errors.name}
            />
        </Dialog>
    )
};

export default NewLanguageDialog;