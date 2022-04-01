const { Router } = require('express')
const { postUsuario, putUsuario, deleteUsuario, getUsuario } = require('../controller/usuario')

const router = Router()

router.get('/', getUsuario)
router.post('/', postUsuario)
router.put('/', putUsuario)
router.delete('/', deleteUsuario)

module.exports = router