const Proyectos = require('../models/Proyectos');

const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {

    //Obtenemos el proyecto actual/main

    const proyecto = await Proyectos.findOne({where: {url : req.params.url }})

    //Leemos el input

    const {tarea} = req.body;

    //Estado e ID

    const estado = 0;

    const proyectoId = proyecto.id;

    //Insertamos en DB

    const resultado = await Tareas.create({ tarea, estado, proyectoId});

    if(!resultado){
        return next();
    }

    //Redireccionamos

    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = (req, res) => {

    res.send('Todo bien...')
}