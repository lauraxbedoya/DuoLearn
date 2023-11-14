import { useEffect, useState } from "react";
import MainInput from "../../../components/input/MainInput";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/buttons";
import styles from "./login.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { signInUser } from "../../../../redux/actions/session.action";

const Login = () => {
  const [values, setValues] = useState({
    email: "daniel@example.com",
    password: "daniel",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.session);

  const handleLogin = async () => {
    if (!values.email || !values.password) {
      alert("Todos los campos son requeridos");
      return;
    }

    try {
      dispatch(signInUser(values));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Button isMain={false} size="md" onClick={handleRegister}>
          Regístrate
        </Button>
        <div>
          <h2 className={styles.titleRegister}>Ingresar</h2>
          <div>
            <MainInput
              placeholder="Correo o usuario"
              value={values.email}
              onChange={handleInputChange}
            />
            <MainInput
              placeholder="Contraseña"
              value={values.password}
              onChange={handleInputChange}
            />
          </div>
          <Button
            isMain={true}
            size="lg"
            onClick={handleLogin}
            disabled={loading}
          >
            Ingresar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
