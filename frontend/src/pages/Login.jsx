import { useState } from "react";
import { Link } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";

export default function Login() {
  const [passwordModal, setPasswordModal] = useState(false);

  function handlePasswordModal() {
    setPasswordModal(!passwordModal);
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-indigo-500">Iniciar Sesion</h1>

      <form action="" className="flex flex-col gap-7 mt-5 w-full">

        <div className="flex flex-col gap-2 ">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
            placeholder="Ingresa tu email"
            autoComplete="email"
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
            required
          />
          <div className="flex justify-end text-indigo-500 text-right text-sm">
            <button
              onClick={handlePasswordModal}
              type="button"
              className="cursor-pointer"
              command="show-modal"
              commandfor="password-modal"
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
        id="password-modal"
        closedby="any"
        className="p-8 rounded-lg shadow-lg backdrop:bg-black/70 bg-slate-800 text-slate-100 
        max-w-lg w-[calc(100%-2rem)] sm:w-full m-auto"
      >
        <ForgotPassword onClose={handlePasswordModal} />
      </dialog>

    </>
  );
}

