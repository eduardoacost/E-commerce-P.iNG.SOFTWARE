const { Schema, model } = require("mongoose");

const comentarioSchema = Schema({
  calificacion: {
    type: Number,
    require: true,
  },

  contenido: {
    type: String,
  },

  titulo: {
    type: String,
    require: true,
  },
});

module.exports = model("comentario", comentarioSchema);
