const { Router } = require('express');
const express = require('express');

const router = express.Router();

//Importamos el controlador

const proyectosController = require('../controllers/proyectosController')

module.exports = function () {

    //Genero la ruta para el home

    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);

    return router;

};