import axios from "axios";
import { API_URL } from "../const";


const patientsService = {
    // Obtener pacientes por veterinario
    getPatients: async () => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token provided");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const url = `${API_URL}/api/pacientes`;

        try {
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    },
    
    // Agregar nuevo paciente
    addPatient: async (patientData) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token provided");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const url = `${API_URL}/api/pacientes`;

        try {
            const response = await axios.post(url, patientData, config);
            return response.data;
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    },
    // Editar paciente existente
    editPatient: async (patientId, patientData) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token provided");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const url = `${API_URL}/api/pacientes/${patientId}`;

        try {
            const response = await axios.put(url, patientData, config);
            return response.data;
        } catch (error) {
            console.error("Error editing patient:", error);
        }
    },
    // Eliminar paciente
    deletePatient: async (patientId) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const url = `${API_URL}/api/pacientes/${patientId}`;

        try {
            const response = await axios.delete(url, config);
            return response.data;
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    },
};

export default patientsService;
