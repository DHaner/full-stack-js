import { createContext, useState, useEffect } from "react";
import veterinarioService from "../services/veterinariosService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        async function getPerfil() {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const data = await veterinarioService.getPerfil(config);
                setAuth(data);
                console.log(data);
            } catch (error) {
                console.error(error.response.data.msg);
            }
        }
        getPerfil();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;