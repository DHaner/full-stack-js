import { useState } from "react";
import Input from "../../components/ui/Input";
import ProfileNav from "../../components/ui/ProfileNav";
import { Container } from "../../components/ui/Container";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";

export default function ChangePassword() {
    const { updatePassword } = useAuth();
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    async function handleSubmit(e) {
        e.preventDefault();
        if (password.newPassword !== password.confirmNewPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        await updatePassword(password);
        alert("Contraseña Actualizada Correctamente");
    }

    return (
        <>
            <div className="w-full max-w-md flex flex-col mt-12  gap-8 justify-center items-center mx-auto px-4">
                <ProfileNav />
                <Container className="w-full">
                    <Title>Cambiar Contraseña</Title>
                    <p className="my-2">Introduce tu nueva contraseña</p>
                    <form className="w-full flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                        <Input
                            label="Contraseña Actual: *"
                            type="password"
                            name="currentPassword"
                            placeholder="Tu Contraseña Actual"
                            value={password.currentPassword}
                            onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                            minLength={6}
                            required
                        />
                        <Input
                            label="Nueva Contraseña: *"
                            type="password"
                            name="newPassword"
                            placeholder="Tu Nueva Contraseña"
                            value={password.newPassword}
                            onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                            minLength={6}
                            required
                        />
                        <Input
                            label="Confirmar Nueva Contraseña: *"
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirma Tu Nueva Contraseña"
                            value={password.confirmNewPassword}
                            onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })}
                            minLength={6}
                            required
                        />
                        <Button type="submit">Guardar Cambios</Button>
                    </form>
                </Container>

            </div>
        </>
    );
}