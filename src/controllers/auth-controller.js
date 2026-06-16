import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/usuario-models.js';

const generarToken = (usuario) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }
    return jwt.sign(
        { id: usuario._id, role: usuario.role },
        secret,
        { expiresIn: '1h' }
    );
};

export const registrar = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ exito: false, mensaje: 'Todos los campos son obligatorios' });
        }

        const usuarioExistente = await UsuarioModel.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ exito: false, mensaje: 'El email ya está registrado' });
        }

        const nuevoUsuario = new UsuarioModel({ name, email, password });
        await nuevoUsuario.save();

        const token = generarToken(nuevoUsuario);

        res.status(201).json({
            exito: true,
            mensaje: 'Usuario registrado exitosamente',
            token,
            usuario: {
                id: nuevoUsuario._id,
                name: nuevoUsuario.name,
                email: nuevoUsuario.email,
                role: nuevoUsuario.role,
                token: token
            }
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al registrar el usuario',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ exito: false, mensaje: 'Todos los campos son obligatorios' });
        }

        const usuario = await UsuarioModel.findOne({ email }).select('+password');

        if (!usuario) {
            return res.status(401).json({
                exito: false,
                mensaje: 'Credenciales inválidas'
            });
        }
            
        const passwordValido = await usuario.compararPassword(password);
        if (!passwordValido) {
            return res.status(401).json({
                exito: false,
                mensaje: 'Credenciales inválidas'
            });
        }

        const token = generarToken(usuario);

        res.status(200).json({
            exito: true,
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                role: usuario.role,
                token: token
            }
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

