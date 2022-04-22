const { Router } = require('express')
const router = Router()

const { login, register } = require('../controllers/auth.controllers.js')
const { postLoginRequestValidation,
        postRegisterRequestValidations
        } = require('../middleweare/auth.middleware.js')


router.post('/login', postLoginRequestValidation, login);
router.post('/register', postRegisterRequestValidations, register);


module.exports = router;