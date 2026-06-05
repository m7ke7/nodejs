const express = require('express');
const router = express.Router();
const productosController = require('../controller/productos-controller');

router.get('/', productosController.getProductos);
router.post('/', productosController.newProducto);

module.exports = router;