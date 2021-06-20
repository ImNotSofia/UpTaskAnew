const Proyectos = require('../models/Proyectos');

const { render } = require("pug");

exports.proyectosHome = async (req, res) => {

    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
    });

}

exports.formularioProyecto = async (req, res) => {

    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto',{
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    })

}

exports.nuevoProyecto = async (req, res) => {

    const proyectos = await Proyectos.findAll();

    //Enviamos a consola lo que el usuario escriba

    //console.log(req.body)

    //Validamos que haya algo en el input

    const nombre = req.body.nombre

    let errores =[];

    if(!nombre) {

        errores.push({'texto' : 'Agregue un nombre al proyecto'})

    }

    //Si hay errores

    if(errores.length > 0) {

        res.render('nuevoProyecto', {

            nombrePagina : 'Nuevo Proyecto',

            errores,

            proyectos
        })

    } else {

        //No error

        //Insertar en DataBase

        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }

}

exports.proyectoPorUrl = async (req, res, next) => {

    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyectos.findOne({

        where: {
            url: req.params.url
        }
    });

    if(!proyecto) return next();

    //Render a la vista

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}