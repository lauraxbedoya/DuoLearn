import { BASE_API_URL } from "@src/config/env";
import { getApiHeader } from "@src/helpers/api.helper";
import { Section } from "@src/utils/interfaces/section";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./sectionAdmin.module.scss";
import SectionFormDialog from "@src/components/adminDialogs/section/SectionFormDialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { ColorPicker } from "primereact/colorpicker";

export default function SectionAdmin() {
  const { languageId } = useParams();
  const url = `${BASE_API_URL}/sections`;
  const [sections, setSections] = useState<Section[]>([]);
  const [visible, setVisible] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState<Section>();
  const navigate = useNavigate();

  const actionsTemplate = (section: Section) => {
    return (
      <div className={styles.containerButtons}>
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="secondary"
          onClick={() => openEditLanguageForm(section)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="secondary"
          onClick={() => openConfirmDelete(section)}
        />
      </div>
    );
  };

  const colorTemplate = (section: Section) => {
    return <ColorPicker value={section.color} disabled />;
  };

  const enabledTemplate = (section: Section) => {
    return (
      <>
        {section.enabled === true ? (
          <i className="pi pi-check" style={{ color: "green" }}></i>
        ) : (
          <i className="pi pi-times" style={{ color: "red" }}></i>
        )}
      </>
    );
  };

  const sectionAdminLevelsTemplate = (section: Section) => {
    return (
      <Button
        severity="secondary"
        text
        onClick={() => handleAdminSections(section)}
      >
        Manage levels
      </Button>
    );
  };

  const getSectionLanguageById = async () => {
    const respStream = await fetch(`${url}/${languageId}`, {
      method: "GET",
      headers: getApiHeader(),
    });
    const resp = await respStream.json();
    if (resp) {
      setSections(resp);
    }
  };

  const openAddSectionForm = () => {
    setVisible(true);
    setSectionToEdit(undefined);
  };

  const handleAdd = async (section: Section) => {
    const respStream = await fetch(url, {
      method: "POST",
      headers: getApiHeader(),
      body: JSON.stringify({
        ...section,
        languageId,
        enabled: section.enabled || false,
      }),
    });
    if (respStream.status === 200) {
      getSectionLanguageById();
    } else {
      alert("Error creating section");
    }
  };

  const openEditLanguageForm = (section: Section) => {
    setVisible(true);
    setSectionToEdit(section);
  };

  const handleEdit = async (section: Section) => {
    const respStream = await fetch(`${url}/${section.id}`, {
      method: "PATCH",
      headers: getApiHeader(),
      body: JSON.stringify(section),
    });
    if (respStream.status === 200) {
      getSectionLanguageById();
    } else {
      alert("Error editing section");
    }
  };

  const openConfirmDelete = (section: Section) => {
    confirmDialog({
      header: "Eliminar",
      message: "¿Esta seguro que desea eliminar esta sección?",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
      accept: () => handleDelete(Number(section.id)),
    });
  };

  const handleDelete = async (sectionId: number) => {
    const respStream = await fetch(`${url}/${sectionId}`, {
      method: "DELETE",
      headers: getApiHeader(),
    });
    if (respStream.status === 200) {
      getSectionLanguageById();
    }
  };

  const handleAdminSections = (section: Section) => {
    navigate(`/sections/${section.id}/levels`);
  };

  const handleBackLanguage = () => {
    navigate("/languages");
  };

  const handleSubmit = async (section?: Partial<Section>) => {
    if (section?.id) {
      await handleEdit(section as Section);
    } else {
      await handleAdd(section as Section);
    }
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (languageId) {
      getSectionLanguageById();
    }
  }, [languageId]);

  return (
    <div className={styles.card}>
      <SectionFormDialog
        visible={visible}
        onSubmit={handleSubmit}
        onClose={handleClose}
        section={sectionToEdit}
      />
      <ConfirmDialog />

      <div>
        <Button
          icon="pi pi-plus"
          severity="success"
          raised
          label="Add"
          onClick={openAddSectionForm}
          className={styles.addOrBackButton}
        />
        <Button
          icon="pi pi-plus"
          severity="success"
          raised
          label="Back"
          onClick={handleBackLanguage}
          className={styles.addOrBackButton}
        />
      </div>

      <DataTable value={sections} tableStyle={{ minWidth: "50rem" }}>
        <Column field="description" header="Section"></Column>
        <Column field="color" header="Color" body={colorTemplate}></Column>
        <Column field="order" header="Order"></Column>
        <Column
          field="enabled"
          header="Enabled"
          body={enabledTemplate}
        ></Column>
        <Column field="name" header="Action" body={actionsTemplate}></Column>
        <Column
          header="Manage Levels"
          body={sectionAdminLevelsTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
