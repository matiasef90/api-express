const { request } = require("express");
const { response } = require("express");
const { Producto } = require("../models");

const traerProducto = async (req = request, res = response) => {
    const { id } = req.params
    const producto = await Producto.findById(id).populate(['usuario', 'categoria'])
    res.json(producto)
}
const traerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const [productos, total] = await Promise.all([
        Producto.find({ estado: true })
            .populate(['usuario', 'categoria'])
            .limit(Number(limite))
            .skip(Number(desde)),
        Producto.countDocuments({ estado: true })
    ]);
    res.json({
        productos,
        total
    })
}
const crearProductos = async (req = request, res = response) => {
    const { nombre, categoria, precio, disponible } = req.body
    const data = { nombre: nombre.toUpperCase(), categoria, usuario: req.usuario._id }
    const existe = await Producto.findOne({ ...data, estado: true })
    if (existe) return res.status(400).json({msg: `Ya existe el producto ${nombre} para ese categoria`})
    if (precio) data.precio = precio
    if (disponible) data.disponible = disponible
    const producto = new Producto(data)
    await producto.save()
    res.status(201).json({producto})
}
const actualizarProductos = async (req = request, res = response) => {
    const { id } = req.params
    const existe = await Producto.findById(id)
    if (!existe) return res.json({msg: `No existe un producto con el id ${id}`})
    const { estado, _id, ...data } = req.body
    data.nombre = data.nombre.toUpperCase()
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
    res.json({producto})
}
const eliminarProductos = async (req = request, res = response) => {
    const { id } = req.params
    const existe = await Producto.findById(id)
    if (!existe) return res.json({msg: `NO existe producto con el id ${id}`})
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, { new: true })
    res.json(producto)
}

module.exports = {
    actualizarProductos,
    crearProductos,
    eliminarProductos,
    traerProducto,
    traerProductos,
}