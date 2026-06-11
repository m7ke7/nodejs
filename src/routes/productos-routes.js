import express from 'express';
import * as productosController from '../controllers/productos-controller.js';

const router = express.Router();

router.get('/', productosController.getProductos);
router.post('/', productosController.newProducto);
router.get('/:id', productosController.getProductoById);
router.delete('/:id', productosController.deleteProducto);

export default router;


