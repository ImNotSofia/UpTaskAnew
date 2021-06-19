const { render } = require("pug");

exports.proyectosHome = (req, res) => {

    res.render('index', {
        nombrePagina : 'Proyectos'
    });

}
