const { Schema } = require('mongoose');

const categoriaSchema = Schema({
    identificador: {
        type: String,
        require: true,
        unique: true
    },

    nombre: {
        type: String,
        require: true,
        unique: true
    },

    subCategoria: {
        type: String
    }
});

const categoria = mongoose.model('categoria', categoriaSchema);
export default categoria;