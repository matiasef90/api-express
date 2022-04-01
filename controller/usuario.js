const { request, response } = require('express')

const getUsuario = (req = request, res = response) => {
    res.json({
        msg: 'getUsuario'
    })
}

const postUsuario = (req = request, res = response) => {
    const body = req.body
    console.log(body)
    res.json({
        msg: 'postUsuario',
        body
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