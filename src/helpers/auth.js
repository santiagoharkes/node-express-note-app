const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'Not authorized, please sign in!')
    res.redirect('/signin')
}

module.exports = helpers