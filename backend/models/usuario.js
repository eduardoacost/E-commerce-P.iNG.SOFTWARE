const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    identificacion:{
        type: String,
        require: true,
        unique: true
    },
    
    nombre:{
        type: String,
        require: true
    },

    apellido:{
        type: String,
        require: true
    },

    username:{
        type: String,
        require: true,
        unique: true
    },

    correo:{
        type: String,
        require: true
    },

    password:{
        type: String,
        require: true
    },

    rol:{
        type: String,
        require: true
    }
});