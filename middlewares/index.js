const ValidarCampos = require('../middlewares/validar-campos')
const ValidarRoles = require('../middlewares/validar-rol')
const ValidarJwt = require('../middlewares/validar-jwt')
const ValidarCategoria = require('./validar-categoria')

module.exports = {
    ...ValidarCampos,
    ...ValidarRoles,
    ...ValidarJwt,
    ...ValidarCategoria
}