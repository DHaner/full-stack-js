import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Title from "./ui/Title";

export default function Form() {
    const [formData, setFormData] = useState({
        name: "",
        owner: "",
        email: "",
        date: "",
        symptoms: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.values(formData).includes("")) {
            alert("Todos los campos son obligatorios");
            return;
        }
        console.log("Formulario enviado:", formData);
        // Handle form submission
    };

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
                <Button type="submit">Agregar Paciente</Button>
            </form>
        </div>
    )
}