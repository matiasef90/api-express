const { request, response } = require('express');
const { Categoria } = require('../models');

const getListaCategoria = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const [categorias, total] = await Promise.all([
        Categoria.find({ estado: true })
            .populate('usuario')
            .limit(Number(limite))
            .skip(Number(desde)),
        Categoria.countDocuments({ estado: true })
    ]);
    res.json({
        categorias,
        total
    })
}

const getCategoria = async (req = request, res = response) => {
    const { id } = req.params
    const categoria = await Categoria.findById(id).populate('usuario')
    res.json({
        categoria
    })
}

const createCategoria = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    const existe = await Categoria.findOne({ nombre })
    if (existe) {
        return res.status(404).json({
            msg: `La categoria ${nombre} ya existe!!`
        })
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data)
    await categoria.save()

    res.status(201).json({ categoria })
}

const actualizarCategoria = async(req = request, res = response) => {
    const { id } = req.params
    const usuario = req.usuario
    const categoriaSelec = await Categoria.findById(id).populate('usuario')
    console.log(categoriaSelec.usuario.id)
    console.log(usuario.id)
    if(categoriaSelec.usuario.id !== usuario.id) return res.status(400).json({ msg: 'Solo el autor puede modificar el campo' })
    const nombre = req.body.nombre.toUpperCase()
    const existe = await Categoria.findOne({ nombre })
    if (existe) {
        return res.status(404).json({
            msg: `La categoria ${nombre} ya existe!!`
        })
    }
    const categoria = await Categoria.findByIdAndUpdate(id, { nombre }, {new: true})
    res.json({ categoria })
}

const borrarCategoria = async(req = request, res = response) => {
    const { id } = req.params
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, {new: true})
    res.json({ categoria })
} 

module.exports = {
    getListaCategoria,
    getCategoria,
    createCategoria,
    actualizarCategoria,
    borrarCategoria
}