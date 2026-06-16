import express from 'express';
import dotenv from 'dotenv';
import dbConection from './config/db.js';
import usuarioRoutes from './routes/usuario-routes.js';
import productosRoutes from './routes/productos-routes.js';
import orderRoutes from './routes/order-routes.js';
import authRoutes from './routes/auth-routes.js';



// cargar variables de entorno desde el .env del proyecto
dotenv.config();

const app = express();

// conexion a la base de datos
dbConection();

// middlewares
app.use(express.json());

// rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/orders', orderRoutes);


// lanza el server web
app.listen(3000, () => {
    console.log('Example app listening on port http://localhost:3000');
});