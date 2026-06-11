import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const orderSchema = new Schema({
    item: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Producto', required: false },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, required: true, min: 0 },
    
    createdAt: { type: Date, default: Date.now }
});

const OrderModel = models.Order || model('Order', orderSchema);
export default OrderModel;