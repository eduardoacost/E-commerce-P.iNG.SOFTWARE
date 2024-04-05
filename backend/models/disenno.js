const { Schema } = require('mongoose');

const disennoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },

    descripcion: {
        type: String,
        require: true
    },

    fechaCreacion: {
        type: Date,
        require: true
    }

});

const disenno = mongoose.model('disenno',disennoSchema);
export default disenno;