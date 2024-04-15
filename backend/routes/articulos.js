const express = require("express");
const router = express.Router();
const formidable = require("formidable");

const { añadirArticulo, actualizarArticulo, eliminarArticulo } = require("../controllers/articulos.js");

const validarId = require("../middlewares/validarId.js");

router.route('/').post(añadirArticulo);
router
    .route('/:id')
    .put(actualizarArticulo)
    .delete(eliminarArticulo)









module.exports = router;