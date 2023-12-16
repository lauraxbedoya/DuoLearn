import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "@src/config/env";
import { getApiHeader } from "@src/helpers/api.helper";
import styles from "./language.module.scss";
import { Language } from "../../../utils/interfaces/language";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import LanguageFormDialog from "../../../components/adminDialogs/language/LanguageFormDialog";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export default function LanguagesAdmin() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const url = `${BASE_API_URL}/languages`;
  const [visible, setVisible] = useState(false);
  const [languageToEdit, setLanguageToEdit] = useState<Language>();
  const navigate = useNavigate();

  const actionsTemplate = (language: Language) => {
    return (
      <div className={styles.containerButtons}>
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="secondary"
          onClick={() => openEditLanguageForm(language)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="secondary"
          onClick={() => openConfirmDelete(language)}
        />
      </div>
    );
  };

  const languageAdminSectionsTemplate = (language: Language) => {
    return (
      <Button
        severity="secondary"
        text
        onClick={() => handleAdminSections(language)}
      >
        Administrar secciones
      </Button>
    );
  };

  const handleGetLanguages = async () => {
    const respStream = await fetch(url, {
      method: "GET",
      headers: getApiHeader(),
    });
    const resp = await respStream.json();
    if (resp) {
      setLanguages(resp);
    }
  };

  const openAddLanguageForm = () => {
    setVisible(true);
    setLanguageToEdit(undefined);
  };

  const handleAdd = async (language: Language) => {
    const respStream = await fetch(url, {
      method: "POST",
      headers: getApiHeader(),
      body: JSON.stringify(language),
    });
    if (respStream.status === 200) {
      handleGetLanguages();
    } else {
      alert("Error creating language");
    }
  };

  const openEditLanguageForm = (language: Language) => {
    setVisible(true);
    setLanguageToEdit(language);
  };

  const handleEdit = async (language: Language) => {
    const respStream = await fetch(`${url}/${language.id}`, {
      method: "PATCH",
      headers: getApiHeader(),
      body: JSON.stringify(language),
    });
    if (respStream.status === 200) {
      handleGetLanguages();
    } else {
      alert("Error editing language");
    }
  };

  const openConfirmDelete = (language: Language) => {
    confirmDialog({
      header: "Eliminar",
      message: "¿Esta seguro que desea eliminar este lenguage?",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
      accept: () => handleDelete(Number(language.id)),
    });
  };

  const handleDelete = async (languageId: number) => {
    const respStream = await fetch(`${url}/${languageId}`, {
      method: "DELETE",
      headers: getApiHeader(),
    });
    if (respStream.status === 200) {
      handleGetLanguages();
    }
  };

  const handleAdminSections = async (language: Language) => {
    navigate(`/languages/${language.id}/sections`);
  };

  const handleSubmit = async (language?: Partial<Language>) => {
    if (language?.id) {
      await handleEdit(language as Language);
    } else {
      await handleAdd(language as Language);
    }
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    handleGetLanguages();
  }, []);

  return (
    <div className="card">
      <LanguageFormDialog
        visible={visible}
        onSubmit={handleSubmit}
        onClose={handleClose}
        language={languageToEdit}
      />
      <ConfirmDialog />
      <Button
        icon="pi pi-plus"
        severity="success"
        raised
        label=" Agregar"
        onClick={openAddLanguageForm}
      />
      <DataTable value={languages} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Language"></Column>
        <Column field="name" header="Action" body={actionsTemplate}></Column>
        <Column header="Language" body={languageAdminSectionsTemplate}></Column>
      </DataTable>
    </div>
  );
}
