import axios from 'axios';
import { API_URL } from '../const';

const veterinarioService = {
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
    }
};

export default veterinarioService;