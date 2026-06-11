import express from "express"
import * as orderController from '../controllers/order-controller.js';


const router = express.Router();

router.get('/', orderController.getOrder);
router.post('/', orderController.addorder);

export default router;