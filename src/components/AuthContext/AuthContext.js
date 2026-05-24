import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem("token"));

    const logout = () => {
        localStorage.removeItem("token");
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
