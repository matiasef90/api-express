const { request } = require("express");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");


const validarJwt = async (req = request, res = response, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token el la peticion'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        req.usuario = usuario;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Acceso no autorizado'
        })
    }
};

module.exports = validarJwt;