const nodemailer = require("nodemailer");

// Aqui creo el transporter, básicamente es el que se encarga de configurar el remitente de correo
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "pinkie.powlowski66@ethereal.email",
    pass: "VCxDupE63Sp5db2h6K",
  },
});

// Objeto mensaje, usé eethereal.email para pruebas, pero se puede cambiar a cualquier otro servicio de correo menos Gmail y Outlook por el OAuth2
let message = {
  from: "Pinkie Powlowski <pinkie.powlowski66@ethereal.email>",
  to: "Beaulah Hamil <beaulah.hamill20@ethereal.email>",
  subject: "Nodemailer es la re verga",
  text: "BUENASSS",
  html: "<p><b>Hola</b> to myself!</p>",
};

// Envio el mensaje
transporter.sendMail(message, (err, info) => {
  if (err) {
    console.log("ERROR. " + err.message);
    return process.exit(1);
  }

  console.log("Mensaje enviado: %s", info.messageId);
  console.log("URL de preview: %s", nodemailer.getTestMessageUrl(info));
});
