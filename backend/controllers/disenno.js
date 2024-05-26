const disennoModel = require("../models/disenno");
const articuloModel = require("../models/articulo");
const usuarioModel = require("../models/usuario");

// GET TODOS
const obtenerDisennos = async (req, res) => {
  try {
    const disennos = await Disenno.find();
    res.json(disennos);
  } catch (error) {
    res.status(500).json({ error: "ERROR del servidor" });
  }
};

// GET x ID
const obtenerDisennosPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const disenno = await Disenno.obtenerDisennosPorId(id);
    if (!disenno) {
      return res.status(404).json({ error: "Disenno no encontrado" });
    }
    res.json(disenno);
  } catch (error) {
    res.status(500).json({ error: "ERROR del servidor" });
  }
};

// CREATE
const crearDisenno = async (req, res) => {
  const {
    identificador,
    descripcion,
    urlImagen,
    articuloModel,
    estado,
    disennadorEncargado,
    fechaCreacion,
    usuarioModel,
  } = req.body;

  try {
    const nuevoDisenno = new disennoModel({
      identificador,
      descripcion,
      urlImagen,
      articuloModel,
      estado,
      disennadorEncargado,
      fechaCreacion,
      usuarioModel,
    });

    const disennoGuardado = await nuevoDisenno.save();
    res
      .status(201)
      .json({ msg: "Disenno creado correctamente", disennoGuardado });
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
    Articulo,
    estado,
    disennadorEncargado,
    fechaCreacion,
    Usuario,
  } = req.body;

  try {
    const updatedDisenno = await Disenno.obtenerDisennosPorId(
      id,
      {
        descripcion,
        urlImagen,
        Articulo,
        estado,
        disennadorEncargado,
        fechaCreacion,
        Usuario,
      },
      { new: true }
    );
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
    const disennoBorrado = await Disenno.borrarPorId(id);
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
};
