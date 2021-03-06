const Sequelize = require('sequelize');

const db = require('../config/db');

const slug = require('slug');

const shortid = require('shortid');

const Proyectos = db.define('proyectos', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre : {
        type: Sequelize.STRING(100)
    },

    url: Sequelize.STRING(100)
    
}, {

    hooks: {

        beforeCreate(proyecto) {

            const url = slug(proyecto.nombre).toLowerCase();


            proyecto.url = `${url}-${shortid.generate()}`;
        }

        /*beforeUpdate(proyecto) { --> Actualizaría la url y shortid luego de un update, no agregado, pero importante

            const url = slug(proyecto.nombre).toLowerCase();


            proyecto.url = `${url}-${shortid.generate()}`;
        }*/
    }
});

module.exports = Proyectos;
