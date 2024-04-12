const express = require("express");
const router = express.Router();
const mostrarCatalogo = require("../controllers/catalogo.js");

router.get("/", mostrarCatalogo.getData, (req, res) => {
  res.status(200).json({
    msg: "MOSTRANDO CATALOGO",
  });
});

module.exports = router;
