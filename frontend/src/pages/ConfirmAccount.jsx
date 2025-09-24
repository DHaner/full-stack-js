import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import IconExclamation from "../components/icons/IconExclamation";
import IconSuccess from "../components/icons/IconSuccess";
import Loading from "../components/Loading";
import veterinarioService from "../services/veterinariosService";
export default function ConfirmAccount() {
  const params = useParams();
  const { token } = params;

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function confirmAccount() {
      try {
        const data = await veterinarioService.confirmarCuenta(token);
        setCuentaConfirmada(true);
        setMessage(data.msg || 'Cuenta confirmada correctamente');

      } catch (error) {
        setMessage(error.response.data.msg || 'Error al confirmar la cuenta');
      }

      setLoading(false);
    }

    confirmAccount();
    console.log("Desde useEffect");
  }, [token]);

  return (
    <>
      <div className={`my-5 text-3xl font-bold flex flex-col items-center ${cuentaConfirmada ? "text-green-500" : "text-red-500"}`}>

        {loading ?
          <Loading />
          :
          (cuentaConfirmada ?
            <IconSuccess className="size-16" />
            :
            <IconExclamation className="size-16" />)
        }

        {message}
      </div>
      <p>Volver a <Link to="/" className="text-indigo-500">Iniciar Sesion</Link></p>
    </>
  );
}
