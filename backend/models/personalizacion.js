const {Schema, model} = require ('mongoose');

const personalizacionSchema = Schema ({
    identificador:{
        type: String,
        require: true,
        unique: true
    },

    disennadorEncargado:{
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        require: true
    },

    estado:{
        type: String,
        require: true
    },

    tipoEnvio:{
        type: String,
        require: true
    }
});
