import sgMail from "@sendgrid/mail";

const sendEmail = (to, sender, team, link) => {
  const apiKey = process.env.sendgrid_api;
  if (!apiKey) return;
  sgMail.setApiKey(apiKey);
  const msg = {
    to,
    from: process.env.email,
    subject: `${sender} has invited you to join his team`,
    html: `
        <h1>You are invited to join ${team} team</h1>
        <p><a href="http://127.0.0.1:3000/invites/${link}">Accept invitaion</a></p>
    `,
  };
  sgMail.send(msg);
};

export default sendEmail;
