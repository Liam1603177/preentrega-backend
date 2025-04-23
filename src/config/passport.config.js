const passport = require('passport');
const local = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwtCookie'];
  }
  return token;
};

const LocalStrategy = local.Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const initializePassport = () => {

  passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });

      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) return done(null, false, { message: 'Contraseña inválida' });

      return done(null, user);
    }
  ));

  passport.use('current', new JWTstrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: 'claveSecretaJWT'
  }, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
};

module.exports = initializePassport;
