const express = require('express');

const router = express.Router();

//Importamos el controlador

const proyectosController = require('../controllers/proyectosController')

module.exports = function () {

    //Genero la ruta para el home

    router.get('/', proyectosController.proyectosHome);

    return router;

};