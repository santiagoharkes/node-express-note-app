const { Router } = require('express')
const router = Router()

const { renderSigninForm, renderSignupForm, userSignIn, userSignUp, logout } = require('../controllers/users.controller')

router.get('/signup', renderSignupForm)
router.post('/signup', userSignUp)

router.get('/signin', renderSigninForm)
router.post('/signin', userSignIn)

router.get('/logout', logout)

module.exports = router