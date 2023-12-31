const Usuarios = require('../models/Usuarios')

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta'
    })
};

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;
    try{
        const nuevoUsuario = await  Usuarios.create(usuario);

        // TODO: Flash Message y redireccionar
    
        console.log('Usuario creado', nuevoUsuario);
    }catch(error){
        console.log(error);
    }
}
