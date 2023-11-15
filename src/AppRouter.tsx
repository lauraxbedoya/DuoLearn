import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/home";
import Register from "./pages/auth/register/register";
import Login from "./pages/auth/login/login";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { findLoggedUser } from "../redux/actions/session.action";
import { clearSession } from "../redux/slices/session.slice";
import Layout from "./components/Layout/Layout";

const AppRouter = () => {
  const { isAuthenticating, isAuthenticated } = useAppSelector(
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
  }, [isAuthenticated, dispatch]);

  // if (isAuthenticating) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Routes>
      {isAuthenticated ? (

        <Route path="/" element={<Layout onLogout={handleLogout} />}>
          <Route path="/" element={<Home />}></Route>

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
