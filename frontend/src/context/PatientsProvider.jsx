import { createContext, useEffect, useState } from "react";
import patientsService from "../services/patientsService";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

export function PatientsProvider({ children }) {
    const {auth} = useAuth();
    const [patients, setPatients] = useState([]);
    const [pacienteEditar, setPacienteEditar] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            const data = await patientsService.getPatients();
            setPatients(data);
        };
        fetchPatients();
    }, [patients, auth]);

    async function addPatient(patient) {
        // Editar paciente existente
        if (patient.id) {
            const updatedPatient = await patientsService.editPatient(patient.id, patient);
            const updatedPatients = patients.map(p => p.id === patient.id ? updatedPatient : p);
            setPatients(updatedPatients);
            setPacienteEditar(null);
            return;
        }

        // Agregar nuevo paciente
        const newPatient = await patientsService.addPatient(patient);
        setPatients(prevPatients => [...prevPatients, newPatient]);
    }

    async function deletePatient(patientId) {
        if (!confirm("¿Estás seguro de que deseas eliminar este paciente?")) return;

        await patientsService.deletePatient(patientId);
        const updatedPatients = patients.filter(p => p.id !== patientId);
        setPatients(updatedPatients);
    }

    return (
        <PatientsContext.Provider value={{
            patients,
            pacienteEditar,
            addPatient,
            deletePatient,
            setPacienteEditar
        }}>
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext;