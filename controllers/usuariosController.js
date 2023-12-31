const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const { body, validationResult } = require('express-validator');
const Usuarios = require('../models/Usuarios')

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta'
    })
};

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;

    body('confirmar').notEmpty().withMessage('El password confirmado no puede ir vacío');
    body('confirmar').equals(req.body.password).withMessage('El password es diferente');

    // Obtener los resultados de la validación
    const erroresExpress = validationResult(req);
    console.log(erroresExpress)

    try{
        const nuevoUsuario = await  Usuarios.create(usuario);

        // TODO: Flash Message y redireccionar
    
        console.log('Usuario creado', nuevoUsuario);
    }catch(error){

        // Extraer unicamente el message de los errores
        const erroresSequelize = error.errors.map(err => err.message)

        // Extraer unicamente el msg de los errores
        const errExp = erroresExpress.array().map(err => err.msg);

        // Unirlos
        const listaErrores = [... erroresSequelize, ...errExp]

        req.flash('error', listaErrores);
        res.redirect('/crear-cuenta');
    }
}
