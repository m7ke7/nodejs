const usuarios = [
    { id: 1, name: 'Usuario 1', email: 'usuario1@example.com' },
    { id: 2, name: 'Usuario 2', email: 'usuario2@example.com' }
];

const getUsuarios = (req, res) => {
    res.status(200).json(usuarios);
}
    const newUsuario = (req, res) => {
    const { name, email } = req.body;
    const newUsuario = {
        id: usuarios.length + 1,
        name,
        email  
    };
    usuarios.push(newUsuario);
    res.status(201).json(newUsuario);
};

module.exports = {
    getUsuarios,
    newUsuario
};