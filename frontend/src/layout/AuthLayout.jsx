import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <main className="bg-slate-800 flex flex-col items-center py-10 px-8 rounded-lg shadow-md w-full max-w-md mx-7">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
