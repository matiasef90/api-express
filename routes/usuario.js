const { Router } = require('express')
const { check } = require('express-validator')
const { postUsuario, putUsuario, deleteUsuario, getUsuario } = require('../controller/usuario');
const { esRolValido, existeEmail, existeUsuarioById } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', getUsuario);

router.post('/', [
    check('email', 'El email ingresado no es válido').isEmail(),
    check('email').custom(existeEmail),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('rol').custom(esRolValido),
    validarCampos
] ,postUsuario);

router.put('/:id', [ 
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    validarCampos,
],putUsuario);

router.delete('/', [
    validarJwt,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
], deleteUsuario);

module.exports = router