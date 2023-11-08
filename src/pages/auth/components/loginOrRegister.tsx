import Button from "../../../components/button/buttons";
import Login from "../login/login";
import Register from "../register/register";

export default function LoginOrRegister(isLogin: boolean) {
    const handleChangeButton = () => { }

    return (
        <div>
            <div>
                <i></i>
                <Button isMain={false} size="lg" onClick={handleChangeButton}>{isLogin ? "Regístrate" : "Ingresar"}</Button>
            </div>
            <div>
                {/* {isLogin ?
                    <Login isLogin /> :
                    <Register />
                } */}
            </div>
        </div>
    )
}