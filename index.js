const express = require('express')
const path = require('path')
const router = require('./routes');
const expressLayouts = require('express-ejs-layouts');
const { nextTick } = require('process');

require('dotenv').config({path: 'variables.env'})

const app = express();

// Habilitar EJS como tempkate engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Ubicación vistas
app.set('views', path.join(__dirname, './views'));

// archivos estaticos
app.use(express.static('public'))

// Middleware (usuario logueado, flash message, fecha actual)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();

    next();
})  

// Routing
app.use('/', router())

// Agrega el puerto
app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionando')
})