const { Schema } = require('mongoose');

const usuarioSchema = Schema(
    {
        identificacion: {
            type: String,
            require: true,
            unique: true
        },

        username: {
            type: String,
            require: true,
            unique: true
        },

        correo: {
            type: String,
            require: true
        },

        password: {
            type: String,
            require: true
        },

        isAdmin: {
            type: Boolean,
            require: true,
            default: false
        }
    }, { timestamps: true }
);

const usuario = mongoose.model('usuario',usuarioSchema);
export default usuario;