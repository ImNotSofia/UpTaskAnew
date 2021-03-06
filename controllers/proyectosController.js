const Proyectos = require('../models/Proyectos');

const Tareas = require('../models/Tareas');

const { render } = require("pug");

exports.proyectosHome = async (req, res) => {

    const usuarioId = res.locals.usuario.id;

    const proyectos = await Proyectos.findAll({ where: { usuarioId }});

    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
    });

}

exports.formularioProyecto = async (req, res) => {

    const usuarioId = res.locals.usuario.id;

    const proyectos = await Proyectos.findAll({ where: { usuarioId }});

    res.render('nuevoProyecto',{
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    })

}

exports.nuevoProyecto = async (req, res) => {

    const usuarioId = res.locals.usuario.id;

    const proyectos = await Proyectos.findAll({ where: { usuarioId }});

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

        const usuarioId = res.locals.usuario.id;

        await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');
    }

}

exports.proyectoPorUrl = async (req, res, next) => {

    const usuarioId = res.locals.usuario.id;

    const proyectosPromise = Proyectos.findAll({ where: { usuarioId }});

    const proyectoPromise = Proyectos.findOne({

        where: {
            url: req.params.url,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]); 

    //Consultar tareas del proyecto

    const tareas = await Tareas.findAll({
        where: {

            proyectoId: proyecto.id
        }
    });

    if(!proyecto) return next();

    //Render a la vista

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {

    const usuarioId = res.locals.usuario.id;

    const proyectosPromise = Proyectos.findAll({ where: { usuarioId }});

    const proyectoPromise = Proyectos.findOne({

        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Render a la vista

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
}

exports.actualizarProyecto = async (req, res) => {

    //Sidebar

    const usuarioId = res.locals.usuario.id;

    const proyectos = await Proyectos.findAll({ where: { usuarioId }});

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

        await Proyectos.update(
            {nombre: nombre},
            {where: {id: req.params.id}});
        res.redirect('/');
    }

}

exports.eliminarProyecto = async (req, res, next) => {

    //Request: query o params

    const {urlProyecto} = req.query

    const resultado = await Proyectos.destroy({ where: {url: urlProyecto}});

    if(!resultado){

        return next();
    }

    res.status(200).send('El proyecto se ha eliminado correctamente');
}