const passport = require('passport');

const Usuarios = require('../models/Usuarios');

const Sequelize = require('sequelize');

const bcrypt = require('bcrypt-nodejs');

const crypto = require('crypto');

const enviarEmail = require('../handler/email');

const Op = Sequelize.Op

exports.autenticarUsuario = passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//Funcion para revisar login 

exports.usuarioAutenticado = (req, res, next) => {

    //Si el usuario esta autenticado, prosigue

    if (req.isAuthenticated()) {

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

//Generación de token si el usuario es valido

exports.enviarToken = async (req, res) => {

    //Verificar existencia del usuario

    const usuario = await Usuarios.findOne({ where: { email: req.body.email } })

    //Si no existe

    if (!usuario) {

        req.flash('error', 'No existe esa cuenta');

        res.redirect('/reestablecer');
    }

    //Usuario existe 

    usuario.token = crypto.randomBytes(20).toString('hex');

    usuario.expiracion = Date.now() + 3600000;

    //Guardar en DB

    await usuario.save();

    //URL del reset

    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

    //Enviar correo con token 

    await enviarEmail.enviar({

        usuario,
        subject : 'Reestablecer contraseña', 
        resetUrl,
        archivo: 'reestablecer-password.pug'
    });

    //Terminar ejecución

    req.flash('correcto', 'Se envió un mensaje a tu correo')

    res.redirect('/iniciar-sesion')

}

exports.validarToken = async (req, res) => {

    const usuario = await Usuarios.findOne({

        where: {
            token: req.params.token
        }
    });

    //Si no encuentra al usuario

    if (!usuario) {

        req.flash('error', 'No válido');

        res.redirect('/reestablecer')
    }

    //Formulario para generar el pass

    res.render('resetPassword', {

        nombrePagina: 'Reestablecer Contraseña'
    })

}

//Cambiar password por uno nuevo

exports.actualizarPassword = async (req, res) => {

    //Verifica token válido, y fecha

    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    });

    //Verificamos que exista

    if (!usuario) {

        req.flash('error', 'No válido');
        res.redirect('/reestablecer');
    }

    //Hashear password 

    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    usuario.token = null;

    usuario.expiracion = null;

    //Guardamos nuevo pass

    await usuario.save();

    req.flash('correcto', 'Tu contraseña se ha modificado correctamente');

    res.redirect('/iniciar-sesion');

}