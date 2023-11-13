import { useState } from "react";
import MainInput from "../../../components/input/MainInput";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/buttons";
import styles from "./login.module.scss";
import { useAppDispatch } from "../../../../redux/store";
import { BASE_API_URL } from '../../../../config/env'
import { signInUser } from "../../../../redux/actions/session.action";

const Login = () => {
    const [values, setValues] = useState({
        email: "laura@gmail.com",
        password: "laura"
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        if (!values.email || !values.password) {
            alert("Todos los campos son requeridos");
            return;
        };

        try {
            dispatch(signInUser(values));

            if (resp) {
                localStorage.setItem('tkn', resp.data);
                alert('Admin logado exitosamente');
                dispatch({ type: 'STORE_USER_INFO', payload: { ...resp.user, active: true } });
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

    const handleRedirect = () => {
        navigate('/register')
    }

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <Button isMain={false} size="md" onClick={handleRedirect}>Regístrate</Button>
                <div>
                    <h2 className={styles.titleRegister}>Ingresar</h2>
                    <div>
                        <MainInput placeholder="Correo o usuario" value={values.email} onChange={handleInputChange} />
                        <MainInput placeholder="Contraseña" value={values.password} onChange={handleInputChange} />
                    </div>
                    <Button isMain={true} size="lg" onClick={handleLogin}>Ingresar</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;