const { raw } = require('express');
const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//Funcion para revisar login 

exports.usuarioAutenticado = (req, res, next) => {

    //Si el usuario esta autenticado, prosigue

    if(req.isAuthenticated()){

        return next();
    }

    //Sino, redirigir a formulario

    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion = (req, res) => {

    req.session.destroy(() => {

        res.redirect('/iniciar-sesion'); 
    })

}