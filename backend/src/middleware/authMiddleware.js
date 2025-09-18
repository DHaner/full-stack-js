import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

// Lógica para verificar la autenticación del usuario
export default async function authMiddleware(req, res, next) {

    let token = req.headers.authorization;
    const isBearerToken = token && token.startsWith('Bearer');
    if (!isBearerToken) {
        return res.status(403).json({ msg: 'No autorizado, token faltante' });
    }
    
    try {
        token = token.split(' ')[1]; // Eliminar 'Bearer ' del token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const veterinario = await Veterinario.findById(decoded.id)
            .select('-password -token -confirmado');

        if (!veterinario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        req.veterinario = veterinario;
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
}