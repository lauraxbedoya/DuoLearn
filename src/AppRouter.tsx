import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Register from "./pages/auth/register/register";
import Login from "./pages/auth/login/login";

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            ></Route>
            <Route
                path="/register"
                element={<Register />}
            ></Route>
            <Route
                path="/login"
                element={<Login />}
            ></Route>
        </Routes>
    )
}

export default AppRouter;