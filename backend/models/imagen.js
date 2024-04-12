const { Schema, model } = require("mongoose");

const imagenSchema = Schema({
  dimensiones: {
    type: "object",
    properties: {
      alto: {
        type: Number,
        require: true,
      },

      ancho: {
        type: Number,
        require: true,
      },
    },
  },

  nombre: {
    type: String,
    require: true,
  },

  formato: {
    type: String,
    require: true,
  },

  urlArchivo: {
    type: String,
    require: true,
  },

  tamanno: {
    type: String,
  },
});

module.exports = model("imagen", imagenSchema);
