import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import veterinarioService from "../services/veterinariosService";
import useAuth from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Title from "../components/ui/Title";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

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

      const perfilData = await veterinarioService.getPerfil(data.token);
      setAuth(perfilData.perfil);
      navigate("/admin");
    } catch (error) {
      alert(error.response.data.msg || "Error al iniciar sesión");
    }
  }

  return (
    <>
      <Title>Iniciar Sesión</Title>

      <form className="flex flex-col gap-7 mt-5 w-full" onSubmit={handleSubmit}>
        <Input
          label="Email:"
          type="email"
          name="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <div>
          <Input
            label="Contraseña:"
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
            required
          />
          <div className="flex justify-end text-indigo-500 text-right text-sm mt-2">
            <button
              onClick={handleForgotPasswordModal}
              type="button"
              className="cursor-pointer"
              command="show-modal"
              commandfor="forgot-password-modal"
            >Olvide mi contraseña</button>
          </div>
        </div>

        <Button type="submit">Enviar</Button>
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

