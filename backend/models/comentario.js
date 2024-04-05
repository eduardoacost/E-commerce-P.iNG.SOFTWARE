const {Schema} = require('mongoose');

const comentarioSchema = Schema ({
    calificacion:{
        type: int,
        require: true
    },

    contenido:{
        type: String
    },

    titulo:{
        type: String,
        require: true
    }
});

const comentario = mongoose.model('comentario', comentarioSchema);
export default comentario;