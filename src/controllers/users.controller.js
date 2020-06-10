const userController = {}

const passport = require('passport')

const User = require('../models/User')

userController.renderSignupForm = (req, res) => {
    res.render('users/signup')
}

userController.userSignUp = async (req, res) => {
    const errors = []
    const { name, email, password, confirm_password } = req.body
    if (password != confirm_password) {
        errors.push({ text: 'Passwords do not match' })
    }

    if (password.length < 4) {
        errors.push({ text: 'Passwords must be at least 4 characters' })
    }

    if (errors.length > 0) {
        res.render('users/signup', {
            errors, name, email,
        })
    } else {
        const emailUser = await User.findOne({ email: email })

        if (emailUser) {
            req.flash('error_msg', 'The mail is already in use')
            res.redirect('/signup')
        } else {
            const newUser = new User({ name, email, password })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('suc_msg', "You are in! Please SignIn")
            res.redirect('/signin')
        }
    }
}

userController.renderSigninForm = (req, res) => {
    res.render('users/signin')
}

// Hay varias formas para incorporar passport acá, esta es una
// Authenticate, lo que hace es usar la función que escribimos en config de 'login'
// Le pasamos un 'local', que es por defecto, y un objeto, que es lo que tiene que hacer passport despues de que valide, si hay errores o no

userController.userSignIn = passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/notes',
    failureFlash: true
})

userController.logout = (req, res) => {
    req.logout()
    req.flash('suc_msg', 'See you soon!')
    res.redirect('/')
}

module.exports = userController