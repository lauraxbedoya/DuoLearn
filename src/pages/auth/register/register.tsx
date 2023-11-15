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

const Register = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [date, setDate] = useState<Nullable<Date>>();
    const dispatch = useAppDispatch();

    const validateForm = () => {
        if (!formValues.email || !formValues.password) {
            dispatch(
                setToast({
                    severity: "error",
                    summary: "Error",
                    detail: "Campos 'email' y 'password' son requeridos",
                })
            );
            return false;
        }

        if (!date) {
            dispatch(
                setToast({
                    severity: "error",
                    summary: "Error",
                    detail: "Campo 'Fecha de Nacimiento' es requerido",
                })
            );
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
        <div className={styles.mainContainer}>
            <div className={styles.containerButtonRegister}>
                <Button isMain={false} size="md" onClick={handleRedirect} className={styles.buttonRegister}>
                    Ingresar
                </Button>
            </div>

            <div className={styles.containerForm}>
                <div className={styles.subContainerForm}>
                    <h2 className={styles.titleRegister}>Crea tu perfil</h2>
                    <Calendar
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        dateFormat="yy/mm/dd"
                        showIcon
                        placeholder="Fecha de Nacimiento"
                        className={styles.input}
                    />
                    <MainInput
                        placeholder="Nombre (opcional)"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                    <MainInput
                        placeholder="Correo"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                    />
                    <MainInput
                        placeholder="Contraseña"
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
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

export default Register;
