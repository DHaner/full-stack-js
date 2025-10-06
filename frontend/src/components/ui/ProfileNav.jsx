import { Link } from "react-router-dom";


export default function ProfileNav() {
    return (
        <nav className="flex gap-8 w-full text-lg font-semibold text-gray-300">
            <Link to="/admin/profile">Perfil</Link>
            <Link to="/admin/change-password">Cambiar Contraseña</Link>
        </nav>
    )
}