import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function AdminLayout() {
    const { auth, loading } = useAuth();
    
    if(loading) {
        console.log("loading desde AdminLayout");
        return <p>Cargando...</p>
    }

    if (!auth._id && !loading) {
        return <Navigate to="/" />
    }

    return (
        <>
            <h1>Admin Layout</h1>
            <Outlet />
        </>
    )
}