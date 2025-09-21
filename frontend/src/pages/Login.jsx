import { Link } from "react-router-dom";

export default function Login() {
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
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500"
            placeholder="Ingresa tu email"
            required
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border border-slate-500 p-2 rounded placeholder:text-slate-500"
            placeholder="Ingresa tu contraseña"
          />
          <div className="flex justify-end text-indigo-500 text-right text-sm">
            <Link to="/forgot-password">Olvide mi contraseña</Link>
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

    </>
  );
}
