import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "../components/ui/Container";

export default function AuthLayout() {
    return (
        <>
            <main className="h-screen flex items-center justify-center">
                <Container className="max-w-md mx-8">
                    <Outlet />
                </Container>
            </main>
        </>
    );
}
