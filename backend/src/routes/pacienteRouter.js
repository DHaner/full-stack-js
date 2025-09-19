import express from 'express';
import { 
    agregarPaciente, 
    obtenerPacientes, 
    obtenerPacienteById, 
    actualizarPacienteById, 
    eliminarPacienteById 
} from '../controllers/pacienteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(authMiddleware, agregarPaciente)
    .get(authMiddleware, obtenerPacientes);

router.route('/:id')
    .get(authMiddleware, obtenerPacienteById)
    .put(authMiddleware, actualizarPacienteById)
    .delete(authMiddleware, eliminarPacienteById);

export default router;