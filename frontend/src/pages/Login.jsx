import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import useAuth from "../hooks/useAuth";
import veterinarioService from "../services/veterinariosService";

export default function Login() {
  const navigate = useNavigate();

  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleForgotPasswordModal() {
    setForgotPasswordModal(!forgotPasswordModal);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const data = await veterinarioService.login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (error) {
      alert(error.response.data.msg || "Error al iniciar sesión");
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-indigo-500">Iniciar Sesion</h1>

      <form className="flex flex-col gap-7 mt-5 w-full" onSubmit={handleSubmit}>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
            placeholder="Ingresa tu email"
            autoComplete="email"
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
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
            placeholder="Ingresa tu contraseña"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end text-indigo-500 text-right text-sm">
            <button
              onClick={handleForgotPasswordModal}
              type="button"
              className="cursor-pointer"
              command="show-modal"
              commandfor="forgot-password-modal"
            >Olvide mi contraseña</button>
          </div>

        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded text-lg font-bold cursor-pointer hover:bg-indigo-600"
        >
          Enviar
        </button>
      </form>

      <div className="flex flex-col items-center mt-5 gap-3 text-sm">
        <p>¿No tienes una cuenta? <Link to="/register" className="text-indigo-500">Regístrate</Link></p>
      </div>

      <dialog
        id="forgot-password-modal"
        closedby="any"
        className="p-8 rounded-lg shadow-lg backdrop:bg-black/70 bg-slate-800 text-slate-100 
        max-w-lg w-[calc(100%-2rem)] sm:w-full m-auto"
      >
        <ForgotPassword onClose={handleForgotPasswordModal} />
      </dialog>

    </>
  );
}

