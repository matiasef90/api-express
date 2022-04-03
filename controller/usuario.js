const { request, response } = require('express')
const Usuario = require('../models/usuario')

const getUsuario = (req = request, res = response) => {
    res.json({
        msg: 'getUsuario'
    })
}

const postUsuario = async (req = request, res = response) => {
    const body = req.body;
    const usuario = new Usuario({body});
    await usuario.save();
    res.json({
        msg: 'postUsuario',
        usuario,
    })
}

const putUsuario = (req = request, res = response) => {
    res.json({
        msg: 'putUsuario'
    })
}

const deleteUsuario = (req = request, res = response) => {
    res.json({
        msg: 'deleteUsuario'
    })
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}