const disenno = require("../models/disenno");
const Articulo = require("../models/articulo");
const { asyncHandler } = require("../middlewares/asyncHandler.js");
const usuario = require("../models/usuario");

// GET TODOS
const obtenerDisennos = async (req, res) => {
  try {
    const disennos = await disenno.find().populate('producto').populate('usuario');
    res.json(disennos);
  } catch (error) {
    res.status(500).json({ error: "ERROR del servidor" });
  }
};

// GET x ID
const obtenerDisennosPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const disenno = await disenno.findById(id).populate('producto').populate('usuario');
    if (!disenno) {
      return res.status(404).json({ error: "Disenno no encontrado" });
    }
    res.json(disenno);
  } catch (error) {
    res.status(500).json({ error: "ERROR del servidor" });
  }
};

const obtenerDisennosusuario = asyncHandler(async (req, res) => {
  try {
    const userId = req.query.usuario;
    const disennos = await disenno.find({ usuario: userId }).populate('producto').populate('usuario');
    res.json(disennos);
  } catch (error) {
    res.status(500).json({ error: "ERROR del servidor" });
  }
});

// CREATE
const crearDisenno = async (req, res) => {
  const {
    identificador,
    descripcion,
    urlImagen,
    producto,
    estado,
    fechaCreacion,
    usuario,
  } = req.body;

  try {
    const nuevoDisenno = new Disenno({
      identificador,
      descripcion,
      urlImagen,
      producto,
      estado,
      fechaCreacion,
      usuario,
    });

    const disennoGuardado = await nuevoDisenno.save();
    res.status(201).json({ msg: "Disenno creado correctamente", disennoGuardado });
  } catch (error) {
    res.status(500).json({ error: "ERROR del servidor" });
  }
};

// UPDATE x ID
const actualizarPorId = async (req, res) => {
  const { id } = req.params;
  const {
    descripcion,
    urlImagen,
    producto,
    estado,
    fechaCreacion,
    usuario,
  } = req.body;

  try {
    const updatedDisenno = await disenno.findByIdAndUpdate(
      id,
      {
        descripcion,
        urlImagen,
        producto,
        estado,
        fechaCreacion,
        usuario,
      },
      { new: true }
    ).populate('producto').populate('usuario');
    if (!updatedDisenno) {
      return res.status(404).json({ error: "Disenno no encontrado" });
    }
    res.json(updatedDisenno);
  } catch (error) {
    res.status(500).json({ error: "ERROR del servidor" });
  }
};

// DELETE x ID
const borrarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const disennoBorrado = await disenno.findByIdAndDelete(id);
    if (!disennoBorrado) {
      return res.status(404).json({ error: "Disenno no encontrado" });
    }
    res.status(200).json({ message: "Disenno borrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "ERROR del servidor" });
  }
};

module.exports = {
  obtenerDisennos,
  obtenerDisennosPorId,
  crearDisenno,
  actualizarPorId,
  borrarPorId,
  obtenerDisennosusuario,
};
