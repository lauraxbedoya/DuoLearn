import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../../../../config/env';
import { getApiHeader } from '../../../../helpers/api.helper';
import Button from '../../../components/button/buttons';
import styles from "./language.module.scss";
import { Language } from '../../../utils/interfaces/language';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import NewLanguageDialog from '../../../components/languages/newLanguageDialog';


export default function Languages() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const url = `${BASE_API_URL}/languages`;
    const [visible, setVisible] = useState(false);
    const [languageToEdit, setLanguageToEdit] = useState<Language>();

    const actionsTemplate = (language: Language) => {
        return (
            <div className={styles.containerButtons}>
                <Button isMain size='sm' onClick={() => openEditLanguageForm(language)}>Editar</Button>
                <Button isMain size='sm' onClick={() => confirmDelete(language)}>Eliminar</Button>
                <Button isMain size='sm' onClick={handleAdminSections}>Administrar Secciones</Button>
            </div >
        )
    }

    const handleGetLanguages = async () => {
        const respStream = await fetch(url, {
            method: "GET",
            headers: getApiHeader(),
        });
        const resp = await respStream.json();
        if (resp) {
            setLanguages(resp);
        }
    }

    const handleEdit = async (languageId: number) => {
        const filterLanguage = languages.filter(
            (language) => language.id !== languageId,
        );
        const respStream = await fetch(`${url}/${languageId}`, {
            method: "PATCH",
            headers: getApiHeader()
        })
        const resp = await respStream.json();
        if (resp) {
            setLanguages(filterLanguage);
        }
    }

    const confirmDelete = (language: Language) => {
        confirmDialog({
            header: 'Eliminar',
            message: '¿Esta seguro que desea eliminar este lenguage?',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => handleDelete(Number(language.id)),
        })
    }

    const handleDelete = async (languageId: number) => {
        const filterLanguage = languages.filter(
            (language) => language.id !== languageId,
        );
        const respStream = await fetch(`${url}/${languageId}`, {
            method: "DELETE",
            headers: getApiHeader(),
        });
        const resp = await respStream.json();
        if (resp) {
            setLanguages(filterLanguage);
        }
    }

    const handleAdminSections = async () => { }

    const handleAddSection = async () => {
        const respLanguage = await fetch(url, {
            method: "POST",
            headers: getApiHeader(),
        })
        const newLanguage = await respLanguage.json();
        if(respLanguage) {
            setLanguages(newLanguage)
        }
    };

    const handleClose = () => {
        setVisible(false);
    }

    const openAddLanguageForm = () => {
        setVisible(true);
        setLanguageToEdit(undefined)
    }

    const openEditLanguageForm = (language: Language) => {
        setVisible(true);
        setLanguageToEdit(language);
    }

    useEffect(() => {
        handleGetLanguages();
    }, [])

    return (
        <div className='card'>
            <NewLanguageDialog
                visible={visible}
                onSubmit={handleAddSection}
                onClose={handleClose}
                language={languageToEdit}
                />
            <ConfirmDialog/>
            <Button isMain={false} size='sm' onClick={openAddLanguageForm}>Agregar</Button>
            <DataTable value={languages} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Language"></Column>
                <Column field="name" header="Acción" body={actionsTemplate}>
                </Column>
            </DataTable>
        </div>
    )
}