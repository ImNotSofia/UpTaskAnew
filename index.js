const express = require('express');

const routes = require('./routes');

const path = require('path');

const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

const flash = require('connect-flash');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const passport = require('./config/passport');

//Helpers con algunas funciones

const helpers = require('./helpers');

//Creo la conexión a la DataBase

const db = require('./config/db');

//Importamos modelos

require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then (() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

//Creo una App express

const app = express();

//Archivos estaticos

app.use(express.static('public'));

//Habilitar PUG

app.set('view engine', 'pug');

//Habilitamos BodyParser para poder leer los datos del formulario

app.use(bodyParser.urlencoded({extended : true}));  //bodyParser deprecated, express is an option, anyway, still work.

//Agregamos express validator a toda la aplicación

app.use(expressValidator());

//Añadir la carpeta de vistar

app.set ('views', path.join(__dirname, './views'));

//Agregamos flash messages

app.use(flash());

app.use(cookieParser());

//Sesiones, navegar sin desloguear

app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

//Pasamos vardump a la aplicación

app.use((req, res, next) => {

    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    console.log(res.locals.usuario);
    next();
})

app.use('/', routes() );

app.listen(9000);