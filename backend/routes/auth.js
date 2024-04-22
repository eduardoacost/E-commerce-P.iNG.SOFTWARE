const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { crearUsuario, loginUsuario, borrarUsuario } = require("../controllers/auth");

const { validarCampos } = require("../middlewares/validarCampos");

router.post("/login", loginUsuario);
router.delete("/delete", borrarUsuario);

router.post(
  "/new",
  [
    check("username", "username es obligatorio").not().isEmpty(),
    check("identificacion", "Identificación es obligatorio").not().isEmpty(),
    check("correo", "Formato de correo inválido u obligatorio")
      .not()
      .isEmpty()
      .isEmail(),
    check(
      "password",
      "La contraseña es obligatoria y debe ser mínimo de 6 caractéres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

module.exports = router;
