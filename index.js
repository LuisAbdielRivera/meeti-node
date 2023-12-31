const express = require('express');
const path = require('path');
const router = require('./routes');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Configuración y Modelos BD
const db = require('./config/db');
require('./models/Usuarios');
db.sync().then(() => console.log('Base de Datos conectada con exito')).catch((error) => console.log(error));

// Variables de Desarrollo
require('dotenv').config({path: 'variables.env'});

// Aplicación Principal
const app = express();

// Body parser, leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar EJS como tempkate engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Ubicación vistas
app.set('views', path.join(__dirname, './views'));

// archivos estaticos
app.use(express.static('public'));

// Habilitar cookie parser
app.use(cookieParser());

// Crear la session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}))

// Agrega flash messages
app.use(flash());

// Middleware (usuario logueado, flash message, fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();

    next();
})  

// Routing
app.use('/', router());

// Agrega el puerto
app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionando');
})