const jwt = require("jsonwebtoken");
//Generar token
const generarToken = (res, uid, isAdmin, isDesigner) => {
const token = jwt.sign({ uid, isAdmin, isDesigner }, process.env.SECRET_JWT_SEED, {
  expiresIn: "30d",
});

//JWT tenemos que guardarlo en una cookie
res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 43200, //12 horas en ms
  });

  return token;
};

module.exports = { generarToken };