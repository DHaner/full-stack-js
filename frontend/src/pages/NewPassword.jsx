import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import veterinarioService from '../services/veterinariosService';
import IconExclamation from '../components/icons/IconExclamation';
import Loading from '../components/Loading';
export default function NewPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    async function verifyToken() {
      try {
        await veterinarioService.comprobarToken(token);
        setValidToken(true);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    verifyToken();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await veterinarioService.nuevoPassword(token, newPassword);
      alert("Contraseña actualizada correctamente");
      navigate("/");
    }
    catch (error) {
      console.error(error);
      alert(error.response.data.msg || "Error al actualizar la contraseña");
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-indigo-500 mb-5">
        Restablece tu Contraseña
      </h1>
      {loading ? (
        <Loading />
      ) : (
        validToken ? (
          <>
            <p className="text-slate-300">Asegúrate de elegir una contraseña segura que puedas recordar fácilmente</p>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 mt-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="send-email">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
                  placeholder="Ingresa tu contraseña"
                  autoComplete="password"
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  className="border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1"
                  placeholder="Confirma tu contraseña"
                  autoComplete="password"
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-500 text-white p-2 rounded text-lg font-bold cursor-pointer hover:bg-indigo-600"
              >
                Enviar
              </button>

            </form>
          </>) : (
          <div className='text-red-500 flex flex-col gap-2 items-center'>
            <IconExclamation className="size-16" />
            <p className='text-lg font-semibold'>Hubo un error con el enlace</p>
          </div>
        )
      )}
    </>
  );
}
