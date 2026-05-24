import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { UnauthorizedPage } from "../../pages/UnauthorizedPage";

export const ProtectedRoute = () => {
    const { isLogged } = useContext(AuthContext);
    return isLogged ? <Outlet /> : <UnauthorizedPage />;
};
