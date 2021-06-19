const express = require('express');

const routes = require('./routes');

const path = require('path');

const bodyParser = require('body-parser');

//Creo la conexión a la DataBase

const db = require('./config/db');

//Importamos modelos

require('./models/Proyectos');

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

//Añadir la carpeta de vistar

app.set ('views', path.join(__dirname, './views'));

app.use('/', routes() );

app.listen(9000);