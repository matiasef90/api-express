const bcryptjs = require('bcryptjs');
const { request, response } = require('express');
const Usuario = require('../models/usuario');

const postAuth = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe!!',
            });
        }
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario fue dado de baja!!',
            });
        }
        const validarPass = bcryptjs.compareSync(password, usuario.password);
        if(!validarPass) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta!!',
            });
        }
        res.json({
            msg: 'Login ok',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error cominiquese con el Admin',
        })
    }
}

module.exports = {
    postAuth,
}