import { usePatients } from "../hooks/usePatients";
import PatientCard from "./ui/PatientCard";
import Title from "./ui/Title";

export default function PatientList() {
    const { patients } = usePatients();
    return (
        <>
            {patients.length ? (
                <>
                    <Title className="mb-4">Lista de Pacientes</Title>
                    <div className="w-full overflow-y-auto">
                        <ul className="mt-4 space-y-4">
                            {patients.map(patient => (
                                <li key={patient._id}>
                                    <PatientCard patient={patient} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <p>No hay pacientes disponibles</p>
            )}
        </>
    )
}