import { createContext, useState, useEffect } from "react";
import veterinarioService from "../services/veterinariosService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPerfil() {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const data = await veterinarioService.getPerfil(token);
                setAuth(data.perfil);
                console.log("data ", data);
            } catch (error) {
                console.error(error.response.data.msg);
            }
            setLoading(false);
        }
        getPerfil();
    }, []);

    function cerrarSesion() {
        setAuth({});
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;