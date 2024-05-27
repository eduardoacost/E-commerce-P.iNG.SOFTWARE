const express = require("express");
const router = express.Router();

const {
  obtenerDisennos,
  obtenerDisennosPorId,
  crearDisenno,
  actualizarPorId,
  borrarPorId,
  obtenerDisennosUsuario,
} = require("../controllers/disenno.js");

router.route("/").get(obtenerDisennos).post(crearDisenno);

router.route("/usu").get(obtenerDisennosUsuario);

router
  .route("/:id")
  .put(actualizarPorId)
  .delete(borrarPorId)
  .get(obtenerDisennosPorId);

module.exports = router;
