const ValidarCampos = require('../middlewares/validar-campos')
const ValidarRoles = require('../middlewares/validar-rol')
const ValidarJwt = require('../middlewares/validar-jwt')

module.exports = {
    ...ValidarCampos,
    ...ValidarRoles,
    ...ValidarJwt,
}