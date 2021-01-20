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
    User.findById(jwt_payload.id, (err, user) => {
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



// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// var GoogleStrategy = require('passport-google-oauth2').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/auth/google/callback",
//     passReqToCallback: true
// },
//     function (request, accessToken, refreshToken, profile, done) {
//         // User.create({
//         //     googleId: profile.id,
//         //     username: profile.email,
//         //     email: profile.email,
//         //     displayName: profile.displayName,
//         //     firstName: profile.name.givenName,
//         //     lastName: profile.name.familyName
//         // }, function (err, user) {
//         //     return done(err, user);
//         // });
//         console.log(accessToken)
//     }
// ));



// Middlewares
const isAuthenticated = passport.authenticate(['jwt'], { session: false });

module.exports = { isAuthenticated };