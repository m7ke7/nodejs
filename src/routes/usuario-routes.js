import express from 'express';
import * as usuarioController from '../controllers/usuario-controller.js';

const router = express.Router();

router.get('/', usuarioController.getUsuarios);
router.post('/', usuarioController.newUsuario);

export default router;