const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarToken");

router.post("/", loginUsuario);

router.post(
  "/new",
  [
    check("identificacion", "El campo identificación es obligatorio")
      .not()
      .isEmpty(),
    check("username", "El campo username es obligatorio").not().isEmpty(),
    check("correo", "El campo correo es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
