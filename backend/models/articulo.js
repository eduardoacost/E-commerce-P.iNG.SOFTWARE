const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const articuloSchema = Schema({
  serial: {
    type: String,
    require: true,
    unique: true,
  },

  nombre: {
    type: String,
    require: true,
  },

  precioUnitario: {
    type: Number,
    require: true,
  },

  categoria: {
    type: Schema.Types.ObjectId,
    ref: "categoria",
    require: true,
  },

  stock: {
    type: Number,
    require: true,
  },

  comentario: {
    //type: Schema.Types.ObjectId,
    type: String,
    ref: "comentario",
  },

  imagen: {
    type: Schema.Types.ObjectId,
    ref: "imagen",
    require: true,
  },
  isPersonalizable: {
    type: Boolean,
    require: true,
  },
});

const Articulo = mongoose.model("Articulo", articuloSchema);
module.exports = Articulo;
