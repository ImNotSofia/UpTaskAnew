const { render } = require("pug");

exports.proyectosHome = (req, res) => {

    res.render('index', {
        nombrePagina : 'Proyectos'
    });

}

exports.formularioProyecto = (req, res) => {

    res.render('nuevoProyecto',{
        nombrePagina : 'Nuevo Proyecto'
    })

}

exports.nuevoProyecto = (req, res) => {

    //Enviamos a consola lo que el usuario escriba

    //console.log(req.body)

    //Validamos que haya algo en el input

    const { nombre } = req.body

    let errores =[];

    if(!nombre) {

        errores.push({'texto' : 'Agregue un nombre al proyecto'})

    }

    //Si hay errores

    if(errores.length > 0) {

        res.render('nuevoProyecto', {

            nombrePagina : 'Nuevo Proyecto',

            errores
        })

    } else {

        //No error

        //Insertar en DataBase
    }

}