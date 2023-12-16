import LevelFormDialog from "@src/components/adminDialogs/level/LevelFormDialog";
import { BASE_API_URL } from "@src/config/env";
import { getApiHeader } from "@src/helpers/api.helper";
import { Level } from "@src/utils/interfaces/level";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function LevelAdmin() {
  const [visible, setVisible] = useState(false);
  const [levelToEdit, setLevelToEdit] = useState<Level>();
  const url = `${BASE_API_URL}/levels`;
  const { sectionId } = useParams();
  const [levels, setLevels] = useState<Level[]>([]);
  const navigate = useNavigate();
  const { languageId } = useParams();

  const actionsTemplate = (level: Level) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="secondary"
          onClick={() => openEditLevelForm(level)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="secondary"
          onClick={() => openConfirmDelete(level)}
        />
      </div>
    );
  };

  const enabledTemplate = (level: Level) => {
    return (
      <>
        {level.enabled === true ? (
          <i className="pi pi-check" style={{ color: "green" }}></i>
        ) : (
          <i className="pi pi-times" style={{ color: "red" }}></i>
        )}
      </>
    );
  };

  const sectionAdminLevelsTemplate = (level: Level) => {
    return (
      <Button
        severity="secondary"
        text
        onClick={() => handleAdminSections(level)}
      >
        Administrar niveles
      </Button>
    );
  };

  const getLevelSectionById = async () => {
    const respStream = await fetch(`${url}/${sectionId}`, {
      method: "GET",
      headers: getApiHeader(),
    });
    const resp = await respStream.json();
    if (resp) {
      setLevels(resp);
    }
  };

  const openAddLevelForm = () => {
    setVisible(true);
    setLevelToEdit(undefined);
  };

  const handleAdd = async (level: Level) => {
    const respStream = await fetch(url, {
      method: "POST",
      headers: getApiHeader(),
      body: JSON.stringify({
        ...level,
        sectionId,
        enabled: level.enabled || false,
      }),
    });
    if (respStream.status === 200) {
      getLevelSectionById();
    } else {
      alert("Error creating level");
    }
  };

  const openEditLevelForm = (level: Level) => {
    setVisible(true);
    setLevelToEdit(level);
  };

  const handleEdit = async (level: Level) => {
    const respStream = await fetch(`${url}/${level.id}`, {
      method: "PATCH",
      headers: getApiHeader(),
      body: JSON.stringify(level),
    });
    if (respStream.status === 200) {
      getLevelSectionById();
    } else {
      alert("Error editing level");
    }
  };

  const openConfirmDelete = (level: Level) => {
    confirmDialog({
      header: "Eliminar",
      message: "¿Esta seguro que desea eliminar este nivel?",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
      accept: () => handleDelete(Number(level.id)),
    });
  };

  const handleDelete = async (levelId: number) => {
    const respStream = await fetch(`${url}/${levelId}`, {
      method: "DELETE",
      headers: getApiHeader(),
    });
    if (respStream.status === 200) {
      getLevelSectionById();
    }
  };

  const handleAdminSections = (level: Level) => {
    navigate(
      `/languages/${languageId}/sections/${sectionId}/levels/${level.id}/lessons`
    );
  };

  const handleBackLanguage = () => {
    navigate(`/languages/${languageId}/sections`);
  };

  const handleSubmit = async (level?: Partial<Level>) => {
    if (level?.id) {
      await handleEdit(level as Level);
    } else {
      await handleAdd(level as Level);
    }
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (sectionId) {
      getLevelSectionById();
    }
  }, [sectionId]);

  return (
    <div className="card">
      <LevelFormDialog
        visible={visible}
        onSubmit={handleSubmit}
        onClose={handleClose}
        level={levelToEdit}
      />
      <ConfirmDialog />
      <Button
        icon="pi pi-plus"
        severity="success"
        raised
        label=" Agregar"
        onClick={openAddLevelForm}
      />
      <Button
        icon="pi pi-plus"
        severity="success"
        raised
        label=" Volver"
        onClick={handleBackLanguage}
      />
      <DataTable value={levels} tableStyle={{ width: "100%" }}>
        <Column field="title" header="Level"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="order" header="Order"></Column>
        <Column field="imageUrl" header="imageUrl"></Column>
        <Column field="type" header="type"></Column>
        <Column
          field="enabled"
          header="Enabled"
          body={enabledTemplate}
        ></Column>
        <Column field="name" header="Action" body={actionsTemplate}></Column>
        <Column header="Level" body={sectionAdminLevelsTemplate}></Column>
      </DataTable>
    </div>
  );
}
