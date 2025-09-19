import Paciente from "../models/Paciente.js";
export async function agregarPaciente(req, res) {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario.id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error al agregar paciente' });
    }
}

export async function obtenerPacientes(req, res) {
    try {
        const pacientes = await Paciente.find()
            .where("veterinario")
            .equals(req.veterinario);
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error al obtener pacientes' });
    }
}

export async function obtenerPacienteById(req, res) {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id)
            .where("veterinario")
            .equals(req.veterinario);
        if (!paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado' });
        }
        res.json(paciente);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error al obtener paciente' });
    }
}
export async function actualizarPacienteById(req, res) {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id)
            .where("veterinario")
            .equals(req.veterinario);
        if (!paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado' });
        }

        // Actualizar campos, si vienen en el body
        paciente.nombre = req.body.nombre || paciente.nombre;
        paciente.propietario = req.body.propietario || paciente.propietario;
        paciente.email = req.body.email || paciente.email;
        paciente.fecha = req.body.fecha || paciente.fecha;
        paciente.sintomas = req.body.sintomas || paciente.sintomas;

        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error al actualizar paciente' });
    }
}
export async function eliminarPacienteById(req, res) {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id)
            .where("veterinario")
            .equals(req.veterinario);
        if (!paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado' });
        }

        await paciente.deleteOne();
        res.json({ msg: 'Paciente eliminado' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error al eliminar paciente' });
    }
}