const { Router } = require('express')
const { check } = require('express-validator');
const { postAuth } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/login', [
    check('email', 'El email ingresado no es válido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
] ,postAuth);

module.exports = router