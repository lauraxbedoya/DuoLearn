import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/home";
import Register from "./pages/auth/register/register";
import Login from "./pages/auth/login/login";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@src/redux/store";
import { findLoggedUser } from "@src/redux/actions/session.action";
import {
  clearSession,
  setSessionStoreKey,
} from "@src/redux/slices/session.slice";
import Layout from "./components/Layout/Layout";
import Languages from "./pages/admin/languagesAdmin/LanguagesAdmin";
import Button from "./components/button/buttons";

const AppRouter = () => {
  const { isAuthenticating, isAuthenticated, error } = useAppSelector(
    (state) => state.session
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(clearSession());
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("tkn");
    if (!isAuthenticated && token) {
      dispatch(findLoggedUser());
    }

    if (!token) {
      dispatch(setSessionStoreKey({ key: "isAuthenticating", value: false }));
    }
  }, [isAuthenticated, dispatch]);

  if (error) {
    return (
      <div>
        {error}
        <Button onClick={() => handleLogout()}>Logout</Button>
      </div>
    );
  }

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<Layout onLogout={handleLogout} />}>
          <Route path="/" element={<Home />}></Route>

          <Route path="/languages" element={<Languages />}></Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
