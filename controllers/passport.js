const passport = require('passport')

const AUTH_SECRET = process.env.AUTH_SECRET || process.abort();

const User = require('../models/user')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = AUTH_SECRET;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload)
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

// Middlewares
const isAuthenticated = passport.authenticate('jwt', { session: false });

module.exports = { isAuthenticated };