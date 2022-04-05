const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuario = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const [usuarios, total] = await Promise.all([
        Usuario.find({ estado: true })
            .limit(Number(limite))
            .skip(Number(desde)),
        Usuario.countDocuments({ estado: true })
    ]);

    console.log(usuarios, total);
    res.json({
        usuarios,
        total
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
    const { _id, email, google, password, ...resto } = req.body;
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

const deleteUsuario = async (req = request, res = response) => {
    const { id } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        msg: 'Usuario Eliminado',
        usuario
    })
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}