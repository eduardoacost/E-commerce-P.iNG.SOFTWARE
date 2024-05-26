const express = require("express");
const router = express.Router();

const {
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  listarCategorias,
  buscarCategoria,
} = require("../controllers/categoria");

router.route("/crearcat").post(crearCategoria);
router.route("/:IdCategoria").put(actualizarCategoria);
router.route("/categoriasr/:IdCategoria").delete(eliminarCategoria);
router.route("/categorias").get(listarCategorias);
router.route("/_id").get(buscarCategoria);

router.route("/categoriasr").post(crearCategoria).get(listarCategorias);

module.exports = router;
