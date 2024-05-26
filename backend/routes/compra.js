const express = require("express");
const router = express.Router();

const {
  obtenerCompras,
  agregarCompra,
  eliminarCompra,
  actualizarCompra,
  buscarCompraPorConsecutivo,
  obtenerComprasPorUsuario,
} = require("../controllers/compra.js");

router.route("/").get(obtenerCompras).post(agregarCompra);

router.route("/search").get(buscarCompraPorConsecutivo);

router.route("/usuario").get(obtenerComprasPorUsuario);

router.route("/:id").put(actualizarCompra).delete(eliminarCompra);

module.exports = router;
