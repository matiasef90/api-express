const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuario = (req = request, res = response) => {
    res.json({
        msg: 'getUsuario'
    })
}

const postUsuario = async (req = request, res = response) => {
    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({nombre, email, password, rol});
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
        msg: 'postUsuario',
        usuario,
    })
}

const putUsuario = async (req = request, res = response) => {
    const { id } = req.params;
    const { email, google, password, ...resto } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'putUsuario',
        usuario,
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