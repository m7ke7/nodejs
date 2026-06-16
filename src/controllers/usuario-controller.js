    import usuariomodel from '../models/usuario-models.js';

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariomodel.find();
        res.status(200).json({
            exito: true,
            cantidad: usuarios.length,
            datos: usuarios
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuariomodel.findById(id);
        if (!usuario) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        res.status(200).json({
            exito: true,
            datos: usuario
        });
    }
    catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener el usuario',
            error: error.message
        });
    }
};

export const newUsuario = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUsuario = new usuariomodel({ name, email, password, role });
        await newUsuario.save();
        res.status(201).json({  
            exito: true,
            mensaje: 'Usuario creado exitosamente',
            datos: newUsuario
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al crear el usuario',
            error: error.message
        });
    }   
};

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;  
        const deletedUsuario = await usuariomodel.findByIdAndDelete(id);
        if (!deletedUsuario) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        res.status(200).json({
            exito: true,
            mensaje: 'Usuario eliminado exitosamente',
            datos: deletedUsuario
        });
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al eliminar el usuario',
            error: error.message
        });
    }   
};