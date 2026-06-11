import productoModel from '../models/models.js';

export const getProductos = async (req, res) => {
    try {
        const productos = await productoModel.find();

        res.status(200).json({
            exito: true,
            cantidad: productos.length,
            datos: productos
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener los productos',
            error: error.message
        });
    }
};
export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productoModel.findById(id);

        if (!producto) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            exito: true,
            datos: producto
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener el producto',
            error: error.message
        });
    }
};

export const newProducto = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const newProducto = new productoModel({ name, description, price, stock });
        await newProducto.save();

        res.status(201).json({
            exito: true,
            mensaje: 'Producto creado exitosamente',
            datos: newProducto
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al crear el producto',
            error: error.message
        });
    }
};


export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProducto = await productoModel.findByIdAndDelete(id);

        if (!deletedProducto) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            exito: true,
            mensaje: 'Producto eliminado exitosamente',
            datos: deletedProducto
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

