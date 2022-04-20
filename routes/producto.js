const { Router } = require('express')
const { check } = require('express-validator');
const { traerProducto, crearProductos, actualizarProductos, eliminarProductos, traerProductos } = require('../controller/producto');
const { validarCategoriaExisteId, validarProductoExisteId } = require('../helpers/db-validator');
const { 
    validarJwt,
    validarCategoriaId,
    validarCampos,
    validarAdminRol,
} = require('../middlewares');


const router = Router();

router.get('/',traerProductos);

router.get('/:id',[
    validarJwt, 
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(validarProductoExisteId),
    validarCampos,
], traerProducto);

router.post('/', [
    validarJwt, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'No es un id válido').not().isEmpty(),
    check('categoria').custom(validarCategoriaExisteId),
    check('precio').optional().isNumeric(),
    check('disponible').optional().isBoolean(),
    validarCampos,
], crearProductos);

router.put('/:id', [
    validarJwt, 
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
], actualizarProductos);

router.delete('/:id',[
    validarJwt,
    validarAdminRol,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
], eliminarProductos);

module.exports = router