const express = require('express');

const routes = require('./routes');

//Creo una App express

const app = express();

app.use('/', routes() );

app.listen(9000);