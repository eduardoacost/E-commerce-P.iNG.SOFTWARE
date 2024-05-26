const express = require("express");
const router = express.Router();

const {
  obtenerDisennos,
  obtenerDisennosPorId,
  crearDisenno,
  actualizarPorId,
  borrarPorId,
  obtenerDisennosusuario,
} = require("../controllers/disenno.js");

router.route("/").get(obtenerDisennos).post(crearDisenno);

router.route("/usu").get(obtenerDisennosusuario);

router
  .route("/:id")
  .put(actualizarPorId)
  .delete(borrarPorId)
  .get(obtenerDisennosPorId);

module.exports = router;
