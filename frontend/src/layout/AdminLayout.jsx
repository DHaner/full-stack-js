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
            <header className="bg-slate-800 p-4 text-white flex justify-between items-center">
                <h1 className="text-2xl font-bold">Panel de Administración</h1>
                <nav className="flex gap-4">
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/perfiles">Perfiles</Link>
                    <button onClick={cerrarSesion}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                        Cerrar Sesión
                    </button>
                </nav>
            </header>
            
            <Outlet />

            <footer>
                <nav className="bg-slate-800 p-4 text-white mt-10">
                    <p className="text-center">&copy; 2024 Mi Aplicación</p>
                </nav>
            </footer>
        </>
    )
}