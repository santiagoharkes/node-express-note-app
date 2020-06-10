const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ email })
    if (!user) {
        return done(null, false, { message: 'Not user found! :(' })
    } else {
        const match = await user.matchPassword(password)
        if (match) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Incorrect password' })
        }
    }
}))

// Este metodo lo que hace es guardarlo en la sesion del servidor
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Cuando ya está registrado y navegando, passport comprueba que sea el usuario
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})