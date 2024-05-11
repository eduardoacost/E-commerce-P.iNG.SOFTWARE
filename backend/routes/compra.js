const express = require("express");
const router = express.Router();

const { obtenerCompras, agregarCompra, eliminarCompra, actualizarCompra, buscarCompraPorConsecutivo , obtenerComprasPorUsuario} = require("../controllers/compra.js");

router
  .route("/")
  .get(obtenerCompras)
  .post(agregarCompra)

  router.route("/search").get(buscarCompraPorConsecutivo)
  
  router.route("/del").delete(eliminarCompra)
  router.route("/upd").put(actualizarCompra)
  
  router.route("/usuario").get(obtenerComprasPorUsuario);


module.exports = router;
