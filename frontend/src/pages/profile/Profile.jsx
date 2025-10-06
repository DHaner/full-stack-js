import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import { Container } from "../../components/ui/Container";
import ProfileNav from "../../components/ui/ProfileNav";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";

export default function Profile() {
    const { auth, updatePerfil } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    if (!profile) {
        return <p>Cargando...</p>;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await updatePerfil(profile);
        alert("Perfil Actualizado Correctamente");
    }

    return (
        <>
            <div className="w-full max-w-md flex flex-col mt-12  gap-8 justify-center items-center mx-auto px-4">
                <ProfileNav />
                <Container className="w-full">
                    <Title>Perfil de Usuario</Title>
                    <p className="my-2">Edita tu información</p>
                    <form className="w-full flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                        <Input
                            label="Nombre:"
                            type="text"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={profile.nombre ?? ""}
                            onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                        />
                        <Input
                            label="Email:"
                            type="email"
                            name="email"
                            placeholder="Tu Email"
                            value={profile.email ?? ""}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                        <Input
                            label="Teléfono:"
                            type="tel"
                            name="telefono"
                            placeholder="(Opcional)"
                            value={profile.telefono ?? ""}
                            onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
                            required={false}
                        />
                        <Input
                            label="Web:"
                            type="url"
                            name="web"
                            placeholder="(Opcional)"
                            value={profile.web ?? ""}
                            onChange={(e) => setProfile({ ...profile, web: e.target.value })}
                            required={false}
                        />
                        <Button type="submit">Guardar Cambios</Button>
                    </form>
                </Container>

            </div>
        </>
    );
}