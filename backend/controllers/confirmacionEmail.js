const { MailtrapClient } = require("mailtrap");

function emailSender(emailUser, nameUser) {
  const TOKEN = process.env.MAILTRAP_TOKEN;
  const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

  const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

  const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Mailtrap Test",
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
        user_name: nameUser,
      },
    })
    .then(console.log, console.error);
}

module.exports = emailSender;
