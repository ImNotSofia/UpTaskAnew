const express = require('express');

const routes = require('./routes');

const path = require('path');

//Creo una App express

const app = express();

//Archivos estaticos

app.use(express.static('public'));

//Habilitar PUG

app.set('view engine', 'pug');

//Añadir la carpeta de vistar

app.set ('views', path.join(__dirname, './views'));

app.use('/', routes() );

app.listen(9000);