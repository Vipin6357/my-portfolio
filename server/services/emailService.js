const nodemailer = require("nodemailer");

const emailUser =
  process.env.EMAIL_USER;

const emailPassword =
  process.env.EMAIL_PASSWORD;

if (!emailUser || !emailPassword) {
  console.warn(
    "Email credentials are missing. Contact form emails will not work."
  );
}

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

const sendContactEmail = async ({
  name,
  email,
  message,
}) => {
  const mailOptions = {
    from: `"Portfolio Contact" <${emailUser}>`,

    to: emailUser,

    replyTo: email,

    subject: `New Portfolio Message from ${name}`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 650px;
        margin: 0 auto;
        padding: 25px;
        background: #0b0712;
        color: #ffffff;
        border-radius: 12px;
      ">

        <h2 style="
          margin-top: 0;
          color: #b46cff;
        ">
          New Portfolio Message
        </h2>

        <div style="
          margin-bottom: 20px;
          padding: 18px;
          background: #15101d;
          border-radius: 8px;
        ">

          <p>
            <strong>Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

        </div>

        <div style="
          padding: 18px;
          background: #15101d;
          border-radius: 8px;
        ">

          <p style="
            margin-top: 0;
            color: #b46cff;
            font-weight: bold;
          ">
            Message
          </p>

          <p style="
            line-height: 1.7;
            white-space: pre-wrap;
          ">
            ${escapeHtml(message)}
          </p>

        </div>

      </div>
    `,
  };

  await transporter.sendMail(
    mailOptions
  );
};


const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};


module.exports = {
  sendContactEmail,
};