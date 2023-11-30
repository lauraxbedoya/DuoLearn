import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "@src/config/env";
import { getApiHeader } from "@src/helpers/api.helper";
import Button from "../../../components/button/buttons";
import styles from "./language.module.scss";
import { Language } from "../../../utils/interfaces/language";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import LanguageFormDialog from "../../../components/languages/LanguageFormDialog";

export default function Languages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const url = `${BASE_API_URL}/languages`;
  const [visible, setVisible] = useState(false);
  const [languageToEdit, setLanguageToEdit] = useState<Language>();

  const actionsTemplate = (language: Language) => {
    return (
      <div className={styles.containerButtons}>
        <Button isMain size="sm" onClick={() => openEditLanguageForm(language)}>
          Editar
        </Button>
        <Button isMain size="sm" onClick={() => openConfirmDelete(language)}>
          Eliminar
        </Button>
        <Button isMain size="sm" onClick={handleAdminSections}>
          Administrar Secciones
        </Button>
      </div>
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

  const handleAdminSections = async () => {};

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

  const openAddLanguageForm = () => {
    setVisible(true);
    setLanguageToEdit(undefined);
  };

  const openEditLanguageForm = (language: Language) => {
    setVisible(true);
    setLanguageToEdit(language);
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
      <Button isMain={false} size="sm" onClick={openAddLanguageForm}>
        Agregar
      </Button>
      <DataTable value={languages} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Language"></Column>
        <Column field="name" header="Acción" body={actionsTemplate}></Column>
      </DataTable>
    </div>
  );
}
