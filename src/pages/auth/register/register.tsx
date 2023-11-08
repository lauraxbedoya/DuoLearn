import { useState } from "react";
import MainInput from "../../../components/input/MainInput";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.scss";
import Button from "../../../components/button/buttons";

export default function Register() {
    const [values, setValues] = useState({
        name: "Aleyda",
        email: "aleyda@gmail.com",
        age: 19,
        password: "aleyda",
    });
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!values.email || !values.password) {
            alert("Todos los campos son requeridos");
            return;
        };

        try {
            const url = 'http://localhost:5179/users';
            const respStream = await fetch(url, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(values)
            });
            const resp = await respStream.json();
            if (resp) {
                localStorage.setItem('tkn', resp.data);
                alert('Admin creado exitosamente');
                // dispatch({ type: 'STORE_USER_INFO', payload: { ...resp.user, active: true } });
                navigate('/');
            } else {
                alert("incorrecto")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleInputChange = (e: any) => {
        setValues(
            {
                ...values,
                [e.target.name]: e.target.value,
            }
        )
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.titleRegister}>Crea tu perfil</h2>
            <div>
                <MainInput placeholder="Edad" value={values.age} onChange={handleInputChange} />
                <MainInput placeholder="Nombre (opcional)" value={values.name} onChange={handleInputChange} />
                <MainInput placeholder="Correo" value={values.email} onChange={handleInputChange} />
                <MainInput placeholder="Contraseña" value={values.password} onChange={handleInputChange} />
            </div>
            <Button isMain={true} size="lg" onClick={handleRegister}>Crear Cuenta</Button>
        </div>
    )
}