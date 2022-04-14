const { Router } = require('express')
const { check } = require('express-validator');
const { getListaCategoria, getCategoria, createCategoria, actualizarCategoria, borrarCategoria } = require('../controller/categoria');
const { 
    validarJwt,
    validarCategoriaId,
    validarCampos,
    validarAdminRol,
} = require('../middlewares');


const router = Router();

router.get('/',getListaCategoria);

router.get('/:id',[
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
    validarCategoriaId
],getCategoria);

router.post('/', [
    validarJwt,    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] ,createCategoria);

router.put('/:id', [
    validarJwt, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
    validarCategoriaId
], actualizarCategoria);

router.delete('/:id',[
    validarJwt,
    validarAdminRol,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
    validarCategoriaId,
], borrarCategoria);

module.exports = router