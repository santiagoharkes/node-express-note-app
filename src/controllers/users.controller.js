const userController = {}

userController.renderSignupForm = (req, res) => {
    res.render('users/signup')
}

userController.userSignUp = (req, res) => {
    res.send('Signup')
}

userController.renderSigninForm = (req, res) => {
    res.render('users/signin')
}

userController.userSignIn = (req, res) => {
    res.send('Signin')
}

userController.logout = (req, res) => {
    res.send('logOut')
}

module.exports = userController