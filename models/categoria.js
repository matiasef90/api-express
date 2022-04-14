const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

CategoriaSchema.methods.toJSON = function () {
    const { __v, _id: uid, ...categoria } = this.toObject();
    return { ...categoria, uid };
}


module.exports = model('Categoria', CategoriaSchema);