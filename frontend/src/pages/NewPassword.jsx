import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import veterinarioService from '../services/veterinariosService';
import IconExclamation from '../components/icons/IconExclamation';
import Loading from '../components/Loading';
import Input from '../components/ui/Input';
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
              <Input
                label="Password:"
                type="password"
                placeholder="Ingresa tu contraseña"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete='password'
                minLength={6}
                required
              />

              <Input
                label="Confirm Password:"
                type="password"
                placeholder="Confirma tu contraseña"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='password'
                minLength={6}
                required
              />
              
              <Button type="submit">Enviar</Button>

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
