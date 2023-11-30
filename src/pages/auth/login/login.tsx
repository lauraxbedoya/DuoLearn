import { useEffect, useState } from "react";
import DuoInput from "@src/components/input/DuoInput";
import { useNavigate } from "react-router-dom";
import Button from "@src/components/button/buttons";
import styles from "./login.module.scss";
import { useAppDispatch, useAppSelector } from "@src/redux/store";
import { signInUser } from "@src/redux/actions/session.action";
import { UserLogin } from "@src/utils/interfaces/user/user";
import { setToast } from "@src/redux/slices/common.slice";

const Login = () => {
  const [values, setValues] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.session);

  const validateForm = () => {
    if (!values.email || !values.password) {
      dispatch(
        setToast({
          severity: "error",
          summary: "Error",
          detail: "Campos 'email' y 'password' son requeridos",
        })
      );
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    validateForm();

    try {
      dispatch(signInUser(values));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
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
    <div className={styles.mainContainer}>
      <div className={styles.containerButtonLogin}>
        <Button
          isMain={false}
          size="md"
          onClick={handleRegister}
          className={styles.buttonLogin}
        >
          Regístrate
        </Button>
      </div>

      <div className={styles.containerForm}>
        <div className={styles.subContainerForm}>
          <h2 className={styles.titleLogin}>Ingresar</h2>
          <DuoInput
            placeholder="Correo o usuario"
            value={values.email}
            name="email"
            onChange={handleInputChange}
          />
          <DuoInput
            placeholder="Contraseña"
            name="password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
          />
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
