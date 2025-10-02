import { useState } from "react";
import { Link } from "react-router-dom";
import veterinarioService from "../services/veterinariosService";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";
import Input from "../components/ui/Input";
export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== rPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    //Crear el usuario en la API
    try {
      const data = await veterinarioService.registrar({ nombre, email, password });
      alert(data.msg || "Usuario creado correctamente");
      
    } catch (error) {
      console.error(error.response);
      alert(error.response.data.msg || "Error al crear el usuario");
    }
  }

  return (
    <>
      <Title>Registrate</Title>

      <form action="" className="flex flex-col gap-7 mt-5 w-full" onSubmit={handleSubmit}>

        <Input
          label="Nombre:"
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          name="name"
          autoComplete="name"
          required
        />

        <Input
          label="Email:"
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
          autoComplete="email"
        />

        <Input
          label="Contraseña:"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          name="password"
          autoComplete="password"
        />

        <Input
          label="Repite tu contraseña:"
          type="password"
          placeholder="Repite tu contraseña"
          value={rPassword}
          onChange={(e) => setRPassword(e.target.value)}
          required
          minLength={6}
          name="repeat-password"
          autoComplete="password"
        />

        <Button type="submit">Enviar</Button>
      </form>

      <div className="flex flex-col items-center mt-5 gap-3 text-sm">
        <p>¿Ya tienes una cuenta? <Link to="/" className="text-indigo-500">Inicia sesión</Link></p>
      </div>
    </>
  );
}
