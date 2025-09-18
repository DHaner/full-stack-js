import jwt from 'jsonwebtoken';

export default function generarJWT(id) {

    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    )
}

