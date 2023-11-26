import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../../../../config/env';
import { getApiHeader } from '../../../../helpers/api.helper';
import Button from '../../../components/button/buttons';
import styles from "./language.module.scss";
import { Language } from '../../../utils/interfaces/language';

export default function Languages() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const url = `${BASE_API_URL}/languages`;


    const actionsTemplate = (language: Language) => {
        return (
            <div className={styles.containerButtons}>
                <Button isMain size='sm' onClick={handleEdit}>Editar</Button>
                <Button isMain size='sm' onClick={() => handleDelete(Number(language.id))}>Eliminar</Button>
                <Button isMain size='sm' onClick={handleAdminSections}>Administrar Secciones</Button>
            </div >
        )
    }

    const fetchLanguages = async () => {
        const respStream = await fetch(url, {
            method: "GET",
            headers: getApiHeader(),
        });
        const resp = await respStream.json();
        if (resp) {
            setLanguages(resp);
        }
    }

    const handleEdit = async () => { }

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

    const handleAddSection = () => { }

    useEffect(() => {
        fetchLanguages();
    }, [])

    return (
        <div className='card'>
            <Button isMain={false} size='sm' onClick={handleAddSection}>Agregar</Button>
            <DataTable value={languages} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Language"></Column>
                <Column field="name" header="Acción" body={actionsTemplate}>
                </Column>
            </DataTable>
        </div>
    )
}