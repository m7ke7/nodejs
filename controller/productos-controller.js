const productos = [
    {  id: 1, name: 'Producto 1', price: 10.99 },
    {  id: 2, name: 'Producto 2', price: 19.99 },
    {  id: 3, name: 'Producto 3', price: 5.99 }

]

const getProductos = (req, res) => {
    res.status(200).json(productos);
}

const newProducto = (req, res) => {
    const { name, price } = req.body;
    const newProducto = {
        id: productos.length + 1,
        name,
        price
    };
    productos.push(newProducto);
    res.status(201).json(newProducto);
};

module.exports = {
    getProductos,
    newProducto
};