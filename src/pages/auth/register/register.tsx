import { useState } from "react";
import MainInput from "../../../components/input/MainInput";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.scss";
import Button from "../../../components/button/buttons";
import { Nullable } from "primereact/ts-helpers";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { BASE_API_URL } from "../../../../config/env";
import { Calendar } from 'primereact/calendar';
import { GoogleAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { signInGoogleUser, signInUser } from "../../../../redux/actions/session.action";
import { auth } from "../../../utils/firebase.ts";
import { setToast } from "../../../../redux/slices/common.slice.ts";


export default function Register() {
    const [formValues, setFormValues] = useState({
        name: "Aleyda",
        email: "aleyda@gmail.com",
        password: "aleyda",
    });
    const navigate = useNavigate();
    const [date, setDate] = useState<Nullable<Date>>();
    const dispatch = useDispatch();

    const validateForm = () => {
        if (!formValues.email || !formValues.password) {
            alert("Todos los campos son requeridos");
            return false;
        };

        if (!date) {
            alert("Fecha de nacimiento requerida")
            return false
        }
        return true
    }

    const handleRegister = async () => {
        if (!validateForm()) {
            return
        }

        const dateOfBirth = dayjs(date).format("YYYY-MM-DD")

        try {
            const url = BASE_API_URL;
            const respStream = await fetch(url, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ ...formValues, dateOfBirth })
            });
            const resp = await respStream.json();
            if (resp.token) {
                const { type } = await dispatch(signInUser());
                if (type === 'session/signInUser/fulfilled') {
                    localStorage.setItem('tkn', resp.token);
                    dispatch({ type: 'STORE_USER_INFO', payload: { ...formValues, active: true } });
                    navigate('/');
                    dispatch(
                        setToast({
                            severity: 'success',
                            summary: 'Felicitaciones',
                            detail: 'Cuenta creada exitosamente',
                        }),
                    );
                }
            } else {
                alert("incorrecto")
            }
        } catch (error: any) {
            for (const message of error.response.data.message) {
                dispatch(
                    setToast({
                        severity: 'error',
                        summary: 'Error',
                        detail: message,
                    }),
                );
            }
        }
    };

    const googleProvider = new GoogleAuthProvider();
    const handleSignUpGoogle = async () => {
        const result: UserCredential = await signInWithPopup(auth, googleProvider);
        const { type } = await dispatch(signInGoogleUser(result.user));
        if (type === 'session/signInGoogleUser/fulfilled') {
            navigate('/');
            dispatch(
                setToast({
                    severity: 'success',
                    summary: 'Felicitaciones',
                    detail: 'Cuenta creada exitosamente con google.',
                }),
            );
        }
    };

    const handleInputChange = (e: any) => {
        setFormValues(
            {
                ...formValues,
                [e.target.name]: e.target.value,
            }
        )
    };

    const handleRedirect = () => {
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <Button isMain={false} size="md" onClick={handleRedirect}>Ingresar</Button>
                <div>
                    <h2 className={styles.titleRegister}>Crea tu perfil</h2>
                    <div>
                        <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="yy/mm/dd" showIcon />
                        <MainInput placeholder="Nombre (opcional)" value={formValues.name} onChange={handleInputChange} />
                        <MainInput placeholder="Correo" value={formValues.email} onChange={handleInputChange} />
                        <MainInput placeholder="Contraseña" value={formValues.password} onChange={handleInputChange} />
                    </div>
                    <Button isMain={true} size="lg" onClick={handleRegister}>Crear Cuenta</Button>
                    <div
                        className={styles.signUpWithSocialMedia}
                        onClick={handleSignUpGoogle}
                    ></div>
                </div>
            </div>
        </div>
    )
}