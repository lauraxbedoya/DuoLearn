import QuestionFormDialog from "@src/components/adminDialogs/question/QuestionFormDialog";
import { BASE_API_URL } from "@src/config/env";
import { getApiHeader } from "@src/helpers/api.helper";
import { Question } from "@src/utils/interfaces/question";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QuestionAdmin() {
  const [visible, setVisible] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<Question>();
  const url = `${BASE_API_URL}/questions`;
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();
  const { languageId } = useParams();
  const { sectionId } = useParams();
  const { levelId } = useParams();

  const actionsTemplate = (question: Question) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="secondary"
          onClick={() => openEditQuestionForm(question)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="secondary"
          onClick={() => openConfirmDelete(question)}
        />
      </div>
    );
  };

  const getQuestionLessonById = async () => {
    const respStream = await fetch(`${url}/${lessonId}`, {
      method: "GET",
      headers: getApiHeader(),
    });
    const resp = await respStream.json();
    if (resp) {
      setQuestions(resp);
    }
  };

  const openAddQuestionForm = () => {
    setVisible(true);
    setQuestionToEdit(undefined);
  };

  const handleAdd = async (question: Question) => {
    const respStream = await fetch(url, {
      method: "POST",
      headers: getApiHeader(),
      body: JSON.stringify({
        ...question,
        lessonId,
      }),
    });
    if (respStream.status === 200) {
      getQuestionLessonById();
    } else {
      alert("Error creating question");
    }
  };

  const openEditQuestionForm = (question: Question) => {
    setVisible(true);
    setQuestionToEdit(question);
  };

  const handleEdit = async (question: Question) => {
    const respStream = await fetch(`${url}/${question.id}`, {
      method: "PATCH",
      headers: getApiHeader(),
      body: JSON.stringify(question),
    });
    if (respStream.status === 200) {
      getQuestionLessonById();
    } else {
      alert("Error editing question");
    }
  };

  const openConfirmDelete = (question: Question) => {
    confirmDialog({
      header: "Eliminar",
      message: "¿Esta seguro que desea eliminar esta pregunta?",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
      accept: () => handleDelete(Number(question.id)),
    });
  };

  const handleDelete = async (questionId: number) => {
    const respStream = await fetch(`${url}/${questionId}`, {
      method: "DELETE",
      headers: getApiHeader(),
    });
    if (respStream.status === 200) {
      getQuestionLessonById();
    }
  };

  const handleBackLesson = () => {
    navigate(
      `/languages/${languageId}/sections/${sectionId}/levels/${levelId}/lessons`
    );
  };

  const handleSubmit = async (question?: Partial<Question>) => {
    if (question?.id) {
      await handleEdit(question as Question);
    } else {
      await handleAdd(question as Question);
    }
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (lessonId) {
      getQuestionLessonById();
    }
  }, [lessonId]);

  return (
    <div className="card">
      <QuestionFormDialog
        visible={visible}
        onSubmit={handleSubmit}
        onClose={handleClose}
        question={questionToEdit}
      />
      <ConfirmDialog />
      <Button
        icon="pi pi-plus"
        severity="success"
        raised
        label=" Agregar"
        onClick={openAddQuestionForm}
      />
      <Button
        icon="pi pi-plus"
        severity="success"
        raised
        label=" Volver"
        onClick={handleBackLesson}
      />

      <DataTable value={questions} tableStyle={{ width: "100%" }}>
        <Column field="text" header="Question"></Column>
        <Column field="feedback" header="feedback"></Column>
        <Column field="order" header="Order"></Column>
        <Column field="name" header="Action" body={actionsTemplate}></Column>
      </DataTable>
    </div>
  );
}
