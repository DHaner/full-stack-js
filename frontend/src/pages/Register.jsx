import { useState } from "react";
import { Link } from "react-router-dom";
import veterinarioService from "../services/veterinariosService";
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
      <h1 className="text-3xl font-bold text-indigo-500">Regístrate</h1>

      <form action="" className="flex flex-col gap-7 mt-5 w-full" onSubmit={handleSubmit}>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="r-password">Repite tu contraseña:</label>
          <input
            type="password"
            id="r-password"
            name="r-password"
            autoComplete="r-password"
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
            placeholder="Repite tu contraseña"
            value={rPassword}
            onChange={(e) => setRPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded text-lg font-bold cursor-pointer hover:bg-indigo-600 mt-2"
        >
          Enviar
        </button>
      </form>

      <div className="flex flex-col items-center mt-5 gap-3 text-sm">
        <p>¿Ya tienes una cuenta? <Link to="/" className="text-indigo-500">Inicia sesión</Link></p>
      </div>
    </>
  );
}
