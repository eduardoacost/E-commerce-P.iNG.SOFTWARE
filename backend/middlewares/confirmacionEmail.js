const { MailtrapClient } = require("mailtrap");

function enviarEmail(emailUser, username) {
  const TOKEN = process.env.MAILTRAP_TOKEN;
  const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

  const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

  const sender = {
    email: "hola@bastiandevs.engineer",
    name: "Soporte SportiFusion",
  };
  const recipients = [
    {
      email: emailUser,
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "a5083270-ecca-4fab-9974-437a5a408bef",
      template_variables: {
        user_name: username
      },
    })
    .then(console.log, console.error);
}

module.exports = { enviarEmail };