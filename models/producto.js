const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precio: {
        type: Number,
        default: 0,
    },
    descripcion: {
        type: String,
    },    
    disponible: {
        type: Boolean,
        default: true,
    },    
    estado: {
        type: Boolean,
        default: true,
    }
});

ProductoSchema.methods.toJSON = function () {
    const { __v, _id: uid, ...producto } = this.toObject();
    return { ...producto, uid };
}


module.exports = model('Producto', ProductoSchema);