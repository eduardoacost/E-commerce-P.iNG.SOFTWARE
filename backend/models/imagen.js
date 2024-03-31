const {Schema, model} = require('mongoose');

const imagenSchema = Schema ({
    dimensiones:{
        type: 'object',
        properties:{

            alto:{
                type: int,
                require: true
            },

            ancho:{
                type: int,
                require: true
            }
        }
    },

    nombre:{
        type: String,
        require: true,
    },

    formato:{
        type: String,
        require: true
    },

    urlArchivo:{
        type: String,
        require: true
    },

    tamanno:{
        type: String
    }
})