const { Router } = require('express');

const express = require('express');

const router = express.Router();

const { body } = require('express-validator/check');

//Importamos el controlador

const proyectosController = require('../controllers/proyectosController')

const tareasController = require('../controllers/tareasController');

module.exports = function () {

    //Genero la ruta para el home

    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    //Listar proyectos

    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    //Update proyectos

    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);

    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);

    //Eliminar proyecto

    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    //Tareas

    router.post('/proyectos/:url', tareasController.agregarTarea);

    //Actualizar tarea

    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    return router;

};