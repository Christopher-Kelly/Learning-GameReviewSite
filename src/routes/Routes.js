import {RegistrationPage} from "../pages/RegistrationPage";
import {Route, Routes} from "react-router";
import App from "../App";
import {FirstPage} from "../pages/FirstPage";
import {LoginPage} from "../pages/LoginPage";
import {ProtectedRoute} from "../components/ProtectedRoute";
import {ErrorPage} from "../pages/ErrorPage";
import {HomePage} from "../pages/HomePage";
import {GamePage} from "../pages/GamePage";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<App />} />
                    <Route path="/firstPage" element={<FirstPage />} />
                </Route>

                {/* Public routes */}
                <Route path="/games/:id" element={<GamePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
            </Routes>
        </>
    )
}