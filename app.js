const express = require('express');
const productosRoutes = require('./routes/productos-routes');
const usuarioRoutes = require('./routes/usuario-routes');
const port = 3000;

const app = express();
app.use(express.json());
app.use('/productos', productosRoutes);
app.use('/usuarios', usuarioRoutes);

app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
});