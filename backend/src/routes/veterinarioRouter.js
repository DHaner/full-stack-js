import express from 'express';
import { 
    registrar, 
    perfil, 
    confirmar, 
    login, 
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
} from '../controllers/veterinarioController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//Rutas públicas
router.post('/', registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", login);

router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token")
    .get(comprobarToken)
    .post(nuevoPassword);
// router.get("/olvide-password/:token", comprobarToken);
// router.post("/olvide-password/:token", nuevoPassword);

//Rutas privadas
router.get("/perfil", authMiddleware, perfil);
router.put("/perfil/:id", authMiddleware, actualizarPerfil);
router.put("/actualizar-password", authMiddleware, actualizarPassword);
export default router;