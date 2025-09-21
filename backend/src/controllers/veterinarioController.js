import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import { emailRegistro } from '../helpers/emailRegistro.js';

export async function registrar(req, res) {

    //Prevenir usuarios duplicados
    const { email, nombre } = req.body;
    const existeVeterinario = await Veterinario.findOne({ email });
    if (existeVeterinario) {
        const error = new Error('El veterinario ya está registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        //Guardar veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        //Enviar email de registro
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })


        res.json(veterinarioGuardado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al registrar veterinario' });
    }

}

export async function perfil(req, res) {
    const {veterinario} = req;
    res.json({
        msg: 'Perfil veterinario',
        perfil : veterinario
    });
}

export async function confirmar(req, res) {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({ msg: 'Cuenta confirmada' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al confirmar cuenta' });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    const usuario = await Veterinario.findOne({ email });

    //Comprobar si el usuario existe
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    //Comprobar si el usuario está confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    //Comprobar si la contraseña es correcta
    if (await usuario.comprobarPassword(password)) {
        //Autenticar
        const id = usuario.id;
        res.json({ token: generarJWT(id) });
    } else {
        const error = new Error('La contraseña es incorrecta');
        return res.status(403).json({ msg: error.message });
    }    

    res.json({ msg: 'Login correcto' });
}

export async function olvidePassword(req, res) {
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne({ email });

    if (!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    try {
        // Generar un nuevo token
        const token = generarJWT(existeVeterinario.id);
        existeVeterinario.token = token;
        await existeVeterinario.save();

        // Enviar correo electrónico
        // Aquí iría la lógica para enviar el correo con el token

        res.json({ msg: 'Se ha enviado un correo con las instrucciones' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al enviar correo' });
    }
}

export async function comprobarToken(req, res) {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });

    if (tokenValido) {
        return res.json({ msg: 'Token válido y el usuario existe' });
    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message });
    }
}

export async function nuevoPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    const veterinario = await Veterinario.findOne({ token });
    
    if (!veterinario) {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Hashear la nueva contraseña y guardarla
        veterinario.password = password;
        veterinario.token = null;
        await veterinario.save();
        res.json({ msg: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al actualizar la contraseña' });
    }
}
