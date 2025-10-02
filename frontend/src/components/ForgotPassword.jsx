import { useState } from "react";
import veterinarioService from "../services/veterinariosService";
import IconSuccess from "./icons/IconSuccess";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Title from "./ui/Title";
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
      <Title className="text-center">Olvide mi Contraseña</Title>

      {!enviado ? (
        <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-full">

          <p className="text-slate-300 mb-4">Ingresa tu email y te enviaremos un enlace para recuperar tu contraseña a tu email</p>

          <Input
            label="Email:"
            type="email"
            placeholder="Ingresa tu email"
            name="send-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
            required
          />

          <div className="font-semibold mb-6 mt-2 text-red-500">{message}</div>

          <Button type="submit" onClick={onClose}>Enviar</Button>

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
          commandfor="forgot-password-modal"
          command="close">Cerrar</button>
      </div>
    </>
  );
}
