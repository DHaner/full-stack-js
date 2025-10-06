import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function AdminLayout() {
    const { auth, loading, cerrarSesion } = useAuth();

    if (loading) {
        console.log("loading desde AdminLayout");
        return <p>Cargando...</p>
    }

    if (!auth._id && !loading) {
        return <Navigate to="/" />
    }

    return (
        <>
            <header className="bg-slate-800 py-8 px-24 text-white flex justify-between items-center gap-4 flex-col md:flex-row">
                <h1 className="text-4xl font-black text-slate-200 text-center">Panel de Administración</h1>
                <nav className="flex gap-4 items-center">
                    <Link to="/admin">Pacientes</Link>
                    <Link to="/admin/profile">Perfil</Link>
                    <button onClick={cerrarSesion}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-nowrap">
                        Cerrar Sesión
                    </button>
                </nav>
            </header>
            
            <main>
                <Outlet />
            </main>

            <footer>
                <nav className="bg-slate-950 py-8 px-24 text-white mt-10">
                    <p className="text-center">&copy; 2025 Mi Aplicación</p>
                </nav>
            </footer>
        </>
    )
}