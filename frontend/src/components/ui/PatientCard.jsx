import { usePatients } from "../../hooks/usePatients";
import Button from "./Button";


export default function PatientCard({ patient }) {
    const { nombre, propietario, email, fecha, sintomas } = patient;
    const { setPacienteEditar, deletePatient } = usePatients();

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className="bg-slate-700 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{nombre}</h2>
            <p><span className="font-bold text-indigo-600 text-lg">Propietario:</span> {propietario}</p>
            <p><span className="font-bold text-indigo-600 text-lg">Email:</span> {email}</p>
            <p><span className="font-bold text-indigo-600 text-lg">Fecha de Alta:</span> {formatDate(fecha)}</p>
            <p><span className="font-bold text-indigo-600 text-lg">Síntomas:</span> {sintomas}</p>

            <div className="mt-4 inline-flex gap-4">
                <Button onClick={() => setPacienteEditar(patient)}>
                    Editar
                </Button>
                
                <Button
                    color="red"
                    onClick={() => deletePatient(patient._id)}
                >
                    Eliminar
                </Button>
            </div>
        </div>
    )
}