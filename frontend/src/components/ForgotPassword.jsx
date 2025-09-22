import { useState } from "react";
import veterinarioService from "../services/veterinariosService";
import IconSuccess from "./icons/IconSuccess";
export default function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await veterinarioService.olvidePassword(email);
      setEnviado(true);
      setMessage(data.msg || "Email enviado correctamente");

    } catch (error) {
      setMessage(error.response.data.msg || "Error al enviar el email");
    }
  }
  return (
    <>
      <h1 className="text-3xl font-bold text-indigo-500 text-center">
        Olvide mi Contraseña
      </h1>

      {!enviado ? (
        <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-full">

          <p className="text-slate-300 mb-4">Ingresa tu email y te enviaremos un enlace para recuperar tu contraseña a tu email</p>

          <div className="flex flex-col gap-2">
            <label htmlFor="send-email">Email:</label>
            <input
              type="email"
              id="send-email"
              name="send-email"
              className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
              placeholder="Ingresa tu email"
              autoComplete="send-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="font-semibold mb-6 mt-2 text-red-500">{message}</div>

          <button
            type="submit"
            className="bg-indigo-500 text-white p-2 rounded text-lg font-bold cursor-pointer hover:bg-indigo-600"
            onClick={onClose}
          >
            Enviar
          </button>

        </form>

      ) : (
        <div className="text-center text-green-500 space-y-2 my-4">
          <IconSuccess className="size-10 mx-auto" />
          <p className="font-semibold text-lg">{message}</p>
        </div>
      )}


      <div className="flex justify-center mt-5 gap-3  text-indigo-500">
        <button
          className="cursor-pointer"
          commandfor="password-modal"
          command="close">Cerrar</button>
      </div>
    </>
  );
}
