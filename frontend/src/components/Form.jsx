import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Title from "./ui/Title";
import { usePatients } from "../hooks/usePatients";

export default function Form() {
    const { addPatient, pacienteEditar } = usePatients();
    const [pacientID, setPacientID] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        owner: "",
        email: "",
        date: "",
        symptoms: ""
    });

    useEffect(() => {
        if (pacienteEditar) {
            setPacientID(pacienteEditar._id);
            
            // Convert ISO date to yyyy-MM-dd format for date input
            const formatDateForInput = (dateString) => {
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };
            
            setFormData({
                name: pacienteEditar.nombre,
                owner: pacienteEditar.propietario,
                email: pacienteEditar.email,
                date: formatDateForInput(pacienteEditar.fecha),
                symptoms: pacienteEditar.sintomas
            });
        }
    }, [pacienteEditar]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(formData).includes("")) {
            alert("Todos los campos son obligatorios");
            return;
        }
        const newPatient = {
            nombre: formData.name,
            propietario: formData.owner,
            email: formData.email,
            fecha: formData.date,
            sintomas: formData.symptoms,
            id: pacientID
        }
        await addPatient(newPatient);
        alert("Paciente agregado correctamente");
        resetForm();
    };

    function resetForm() {
        setPacientID(null);
        setFormData({
            name: "",
            owner: "",
            email: "",
            date: "",
            symptoms: ""
        });
    }

    return (
        <div className="w-full">
            <Title>Formulario</Title>

            <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
                <Input
                    label="Nombre Mascota"
                    type="text"
                    placeholder="Ingresa el nombre de tu mascota"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                    label="Propietario"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    name="owner"
                    autoComplete="name"
                    required
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Ingresa tu email"
                    name="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                    label="Fecha Alta"
                    type="date"
                    name="date"
                    autoComplete="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <Input
                    label="Síntomas"
                    type="text"
                    placeholder="Describe los síntomas"
                    name="symptoms"
                    autoComplete="symptoms"
                    required
                    isTextArea={true}
                    className="h-20 resize-none"
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                />
                <Button type="submit">
                    {pacientID ? "Guardar Cambios" : "Agregar Paciente"}
                </Button>
            </form>
        </div>
    )
}