const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//Referencia al modelo a autenticar

const Usuarios = require('../models/Usuarios');

//Local strategy - Login con credenciales propias (u y p)

passport.use(
    new LocalStrategy(

        //Por default passport espera un u y p

        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {

            try {

                const usuario = await Usuarios.findOne({
                    where: { 
                        email,
                        activo : 1 }
                });

                //Usuario correcto, contraseña incorrecta

                if (!usuario.verificarPassword(password)) {

                    return done(null, false, {
                        message: 'Contraseña incorrecta'

                    });


                }

                //Email existe, y contraseña correcta

                return done(null, usuario);

            } catch (error) {

                //El usuario no existe

                return done(null, false, {
                    message: 'Esa cuenta no existe'

                });

            }
        }
    )
);

//Serializar usuario

passport.serializeUser((usuario, callback) => {

    callback(null, usuario);
});

//Deserializar usuario

passport.deserializeUser((usuario, callback) => {

    callback(null, usuario);
});

//Exportar

module.exports = passport;