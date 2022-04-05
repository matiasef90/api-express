const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async ( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    console.log(existeRol);
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

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioById
}