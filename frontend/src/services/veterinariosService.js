import axios from 'axios';
import { API_URL } from '../const';

const veterinarioService = {
    // Obtener perfil
    getPerfil: async (token) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const url = `${API_URL}/api/veterinarios/perfil`;
        const response = await axios.get(url, config);
        return response.data;
    },

    // Iniciar sesión
    login: async (email, password) => {
        const url = `${API_URL}/api/veterinarios/login`;
        const response = await axios.post(url, { email, password });
        return response.data;
    },

    // Confirmar cuenta
    confirmarCuenta: async (token) => {
        const url = `${API_URL}/api/veterinarios/confirmar/${token}`;
        const response = await axios.get(url);
        return response.data;
    },

    // Registrar veterinario
    registrar: async (datos) => {
        const url = `${API_URL}/api/veterinarios`;
        const response = await axios.post(url, datos);
        return response.data;
    },

    // Recuperar contraseña
    olvidePassword: async (email) => {
        const url = `${API_URL}/api/veterinarios/olvide-password`;
        const response = await axios.post(url, { email });
        return response.data;
    },

    // Comprobar token
    comprobarToken: async (token) => {
        const url = `${API_URL}/api/veterinarios/olvide-password/${token}`;
        const response = await axios.get(url);
        return response.data;
    },

    //Crear nueva contraseña
    nuevoPassword: async (token, password) => {
        const url = `${API_URL}/api/veterinarios/olvide-password/${token}`;
        const response = await axios.post(url, { password });
        return response.data;
    },

    //Actualizar perfil
    actualizarPerfil: async (datos) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token provided");
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const url = `${API_URL}/api/veterinarios/perfil/${datos._id}`;
        try {
            const response = await axios.put(url, datos, config);
            return response.data;
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    },

    //Actualizar contraseña
    actualizarPassword: async (datos) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token provided");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const url = `${API_URL}/api/veterinarios/actualizar-password`;
        try {
            const response = await axios.put(url, datos, config);
            return response.data;
        } catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
    }
};

export default veterinarioService;