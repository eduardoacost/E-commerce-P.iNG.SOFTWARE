const express = require("express");
const router = express.Router();

const {
  obtenerDisennos,
  obtenerDisennosPorId,
  crearDisenno,
  actualizarPorId,
  borrarPorId,
  obtenerDisennosUsuario,
  obtenerDisennosPorDisennador,
} = require("../controllers/disenno.js");

router.route("/").get(obtenerDisennos).post(crearDisenno);

router.route("/usu").get(obtenerDisennosUsuario);
router.route("/disennador/:disennadorId").get(obtenerDisennosPorDisennador);

router
  .route("/:id")
  .put(actualizarPorId)
  .delete(borrarPorId)
  .get(obtenerDisennosPorId);

module.exports = router;
