import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProtectedRoute = () => {
    const loggedIn = useContext(AuthContext);
    console.log(loggedIn);

    return loggedIn.isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};