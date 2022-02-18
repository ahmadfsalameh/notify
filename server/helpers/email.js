import sgMail from "@sendgrid/mail";
import configs from "../configs.js";

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
        <p><a href="${configs.frontendURL}/invites/${link}">Accept invitaion</a></p>
    `,
  };
  sgMail.send(msg);
};

export default sendEmail;
