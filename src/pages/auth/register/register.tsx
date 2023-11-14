import { useState } from "react";
import MainInput from "../../../components/input/MainInput";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.scss";
import Button from "../../../components/button/buttons";
import { Nullable } from "primereact/ts-helpers";
import dayjs from "dayjs";
import { Calendar } from "primereact/calendar";

import { registerUser } from "../../../../redux/actions/session.action";
import { setToast } from "../../../../redux/slices/common.slice.ts";
import { useAppDispatch } from "../../../../redux/store.ts";

export default function Register() {
  const [formValues, setFormValues] = useState({
    name: "Aleyda",
    email: "aleyda@gmail.com",
    password: "aleyda",
  });
  const navigate = useNavigate();
  const [date, setDate] = useState<Nullable<Date>>();
  const dispatch = useAppDispatch();

  const validateForm = () => {
    if (!formValues.email || !formValues.password) {
      alert("Todos los campos son requeridos");
      return false;
    }

    if (!date) {
      alert("Fecha de nacimiento requerida");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    const dateOfBirth = dayjs(date).format("YYYY-MM-DD");

    try {
      dispatch(registerUser({ ...formValues, dateOfBirth }));
    } catch (error: any) {
      for (const message of error.response.data.message) {
        dispatch(
          setToast({
            severity: "error",
            summary: "Error",
            detail: message,
          })
        );
      }
    }
  };

  const handleInputChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Button isMain={false} size="md" onClick={handleRedirect}>
          Ingresar
        </Button>
        <div>
          <h2 className={styles.titleRegister}>Crea tu perfil</h2>
          <div>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              dateFormat="yy/mm/dd"
              showIcon
            />
            <MainInput
              placeholder="Nombre (opcional)"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <MainInput
              placeholder="Correo"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <MainInput
              placeholder="Contraseña"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <Button isMain={true} size="lg" onClick={handleRegister}>
            Crear Cuenta
          </Button>
          {/* <div
            className={styles.signUpWithSocialMedia}
            onClick={handleSignUpGoogle}
          ></div> */}
        </div>
      </div>
    </div>
  );
}
