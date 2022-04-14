const { response } = require("express")
const { request } = require("express")
const { Categoria } = require("../models")


const validarCategoriaId = async (req = request, res = response, next) => {
    const { id } = req.params
    try {
        const categoria = await Categoria.findById(id)
        if (!categoria) {
            return res.status(400).json({
                msg: `No existe categoria con id ${id}`,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Cominiquise con el Admin'
        })        
    }
    next()
}

module.exports = { 
    validarCategoriaId,
}