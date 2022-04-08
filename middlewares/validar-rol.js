const { request, response } = require("express");

const validarAdminRol = ( req = request, res = response, next ) => {
    if (!req.usuario) {
        return res.status(500).json({msg: 'No se ha validado el jsonwebtoken'})
    }
    if (req.usuario.rol !== 'ADMIN_ROLE') {
        return res.status(401).json({msg: 'El usuario no es administrador'})
    }
    next();
}
const validarRoles = (...resto) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({msg: 'No se ha validado el jsonwebtoken'})
        }
        if(!resto.includes(req.usuario.rol)) {
            return res.status(401).json({msg: `La funcionalidad es accesible para los roles ${resto}`})
        }
        next();
    }
}

module.exports = {
    validarAdminRol,
    validarRoles,
};