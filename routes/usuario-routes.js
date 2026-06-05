const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario-controller');

router.get('/', usuarioController.getUsuarios);
router.post('/', usuarioController.newUsuario);

module.exports = router;