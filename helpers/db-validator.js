const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async ( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol) {
        throw new Error(`El rol ${rol} no es valido`);
    }
};

const existeEmail = async ( email = '' ) => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail) {
        throw new Error(`El email ${email} ya esta registrado`);
    }
};

const existeUsuarioById = async ( id = '' ) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id ${id} no esta registrado`);
    }
};

const validarCategoriaExisteId = async ( categoria = '' ) => {
    const existeCategoria = await Categoria.findById(categoria)
    if (!existeCategoria) {
        throw new Error(`La categoria con id ${categoria} no existe`)
    }
}
const validarProductoExisteId = async ( id = '' ) => {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto) {
        throw new Error(`La categoria con id ${id} no existe`)
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioById,
    validarCategoriaExisteId,
    validarProductoExisteId
}