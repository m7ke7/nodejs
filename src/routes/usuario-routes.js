import express from 'express';
import * as usuarioController from '../controllers/usuario-controller.js';
import { proteger, autorizar } from '../middleware/auth.js';


const router = express.Router();

router.get('/', proteger, usuarioController.getUsuarios);
router.post('/', proteger, usuarioController.newUsuario);
router.get('/:id', proteger, usuarioController.getUsuarioById);
router.delete('/:id', proteger,autorizar('admin'), usuarioController.deleteUsuario);


export default router;