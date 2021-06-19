const express = require('express');

const router = express.Router();

module.exports = function () {

    //Genero la ruta para el home

    router.get('/', (req, res) => {

        res.send('¡Hola!');
    });

    router.get('/nosotros', (req, res) => {

        res.send('We!');
    });

    return router;

};