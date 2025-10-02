import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Login from '../pages/Login';
import Loading from './Loading';

/**
 * Componente que maneja la redirección desde la raíz ('/') según el estado de autenticación.
 * Si el usuario está autenticado, redirige a '/admin'.
 * Si no está autenticado, muestra el componente Login.
 * Mientras se verifica el estado de autenticación, muestra un indicador de carga.
 */
function RootRedirect() {
    const { auth, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            // Si el usuario está autenticado (tiene datos en auth), redirigir a /admin
            if (auth && auth._id) {
                navigate('/admin', { replace: true });
            }
        }
        console.log("desde useEffect del RootRedirect ");
    }, [auth, loading, navigate]);

    // Mostrar loading mientras se verifica la autenticación
    if (loading) {
        return <Loading />;
    }

    // Si no está autenticado, mostrar el componente Login
    if (!auth || !auth.id && !loading) {
        return <Login />;
    }

    // Este return no debería ejecutarse debido al useEffect, pero por seguridad
    return <Loading />;
}

export default RootRedirect;