import orderModel from '../models/order.js';


export const getOrder = async (req, res) => {
    try {
        const order = await orderModel.find();
        if(!order || order.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ordenes' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error al obtener las ordenes:', error);
        res.status(500).json({ message: 'Error al obtener las ordenes' });
    }
};

export const addorder = async (req, res) => {
    const { items, item } = req.body;
    const orderItems = Array.isArray(items) ? items : Array.isArray(item) ? item : null;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        return res.status(400).json({ message: 'Items vacíos o formato inválido' });
    }

    try {
        const neworder = new orderModel({
            item: orderItems.map(i => ({
                productId: i.productId,
                name: i.name,
                price: i.price,
                quantity: i.quantity
            })),
            totalPrice: orderItems.reduce((total, i) => total + i.price * i.quantity, 0)
        });
        await neworder.save();
        return res.status(201).json({ message: 'Orden creada exitosamente', order: neworder });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ message: 'Error al crear la orden' });
    }
};
