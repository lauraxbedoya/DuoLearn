import LessonFormDialog from "@src/components/adminDialogs/lesson/LessonFormDialog";
import { BASE_API_URL } from "@src/config/env";
import { getApiHeader } from "@src/helpers/api.helper";
import { Lesson } from "@src/utils/interfaces/lesson";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./lesonAdmin.module.scss";

export default function LessonAdmin() {
  const [visible, setVisible] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState<Lesson>();
  const url = `${BASE_API_URL}/lessons`;
  const { levelId } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const navigate = useNavigate();

  const actionsTemplate = (lesson: Lesson) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="secondary"
          onClick={() => openEditLessonForm(lesson)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="secondary"
          onClick={() => openConfirmDelete(lesson)}
        />
      </div>
    );
  };

  const isPracticeTemplate = (lesson: Lesson) => {
    return (
      <>
        {lesson.isPractice === true ? (
          <i className="pi pi-check" style={{ color: "green" }}></i>
        ) : (
          <i className="pi pi-times" style={{ color: "red" }}></i>
        )}
      </>
    );
  };

  const levelAdminLessonsTemplate = (lesson: Lesson) => {
    return (
      <Button
        severity="secondary"
        text
        onClick={() => handleAdminLessons(lesson)}
      >
        Manage questions
      </Button>
    );
  };

  const getLessonLevelById = async () => {
    const respStream = await fetch(`${url}/${levelId}`, {
      method: "GET",
      headers: getApiHeader(),
    });
    const resp = await respStream.json();
    if (resp) {
      setLessons(resp);
    }
  };

  const openAddLessonForm = () => {
    setVisible(true);
    setLessonToEdit(undefined);
  };

  const handleAdd = async (lesson: Lesson) => {
    const respStream = await fetch(url, {
      method: "POST",
      headers: getApiHeader(),
      body: JSON.stringify({
        ...lesson,
        levelId,
        isPractice: lesson.isPractice || false,
      }),
    });
    if (respStream.status === 200) {
      getLessonLevelById();
    } else {
      alert("Error creating lesson");
    }
  };

  const openEditLessonForm = (lesson: Lesson) => {
    setVisible(true);
    setLessonToEdit(lesson);
  };

  const handleEdit = async (lesson: Lesson) => {
    const respStream = await fetch(`${url}/${lesson.id}`, {
      method: "PATCH",
      headers: getApiHeader(),
      body: JSON.stringify(lesson),
    });
    if (respStream.status === 200) {
      getLessonLevelById();
    } else {
      alert("Error editing lesson");
    }
  };

  const openConfirmDelete = (lesson: Lesson) => {
    confirmDialog({
      header: "Eliminar",
      message: "¿Esta seguro que desea eliminar esta lección?",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
      accept: () => handleDelete(Number(lesson.id)),
    });
  };

  const handleDelete = async (lessonId: number) => {
    const respStream = await fetch(`${url}/${lessonId}`, {
      method: "DELETE",
      headers: getApiHeader(),
    });
    if (respStream.status === 200) {
      getLessonLevelById();
    }
  };

  const handleAdminLessons = (lesson: Lesson) => {
    navigate(`/lessons/${lesson.id}/questions`);
  };

  const handleSubmit = async (lesson?: Partial<Lesson>) => {
    if (lesson?.id) {
      await handleEdit(lesson as Lesson);
    } else {
      await handleAdd(lesson as Lesson);
    }
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (levelId) {
      getLessonLevelById();
    }
  }, [levelId]);

  return (
    <div className={styles.card}>
      <LessonFormDialog
        visible={visible}
        onSubmit={handleSubmit}
        onClose={handleClose}
        lesson={lessonToEdit}
      />

      <ConfirmDialog />

      <div>
        <Button
          icon="pi pi-plus"
          severity="success"
          raised
          label="Add"
          onClick={openAddLessonForm}
          className={styles.addOrBackButton}
        />
        <Button
          icon="pi pi-plus"
          severity="success"
          raised
          label="Back"
          onClick={() => navigate(-1)}
          className={styles.addOrBackButton}
        />
      </div>

      <DataTable
        value={lessons}
        scrollable
        scrollHeight="600px"
        tableStyle={{ width: "100%" }}
      >
        <Column field="experience" header="Experience"></Column>
        <Column
          field="practiceExperience"
          header="Practice Experience"
        ></Column>
        <Column
          field="isPractice"
          header="Is Practice"
          body={isPracticeTemplate}
        ></Column>
        <Column field="order" header="Order"></Column>
        <Column field="name" header="Action" body={actionsTemplate}></Column>
        <Column header="Lesson" body={levelAdminLessonsTemplate}></Column>
      </DataTable>
    </div>
  );
}
