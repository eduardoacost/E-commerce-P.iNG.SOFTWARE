const express = require("express");
const Tarea = require("../models/tarea");

const crearTarea = async (req, res = express.request) => {
  const task = new Tarea(req.body);

  try {
    task.user = req.uid;
    const saved = await task.save();
    res.json({
      ok: true,
      task: saved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      task: "Internal error",
    });
  }
};

const listarTareas = async (req, res = express.request) => {
  const tareas = await Tarea.find().populate("Usuario", "nombre");

  try {
    res.statusCode(200).json({
      ok: true,
      tareas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno",
    });
  }
};

module.exports = {
  crearTarea,
  listarTareas,
};
