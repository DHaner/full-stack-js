import Veterinario from '../models/Veterinario.js';

const registrar = async (req, res) => {

    //Prevenir usuarios duplicados
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne({ email });
    if (existeVeterinario) {
        const error = new Error('El veterinario ya está registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        //Guardar veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        res.json(veterinarioGuardado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al registrar veterinario' });
    }

}

const perfil = (req, res) => {
    res.json({
        msg: 'Perfil veterinario'
    });
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne()
    res.json({ msg: 'Cuenta confirmada', token });
}

export { registrar, perfil, confirmar };