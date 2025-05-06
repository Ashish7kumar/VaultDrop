import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USER, EMAIL_SERVICE_PROVIDER } from '../config/server.config';

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE_PROVIDER,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async (receiverEmail: string, SECRET_KEY: string) => {
    
  const mailOptions = {
    from: EMAIL_USER,
    to: receiverEmail,
    subject: 'Your VaultDrop Secret Key 🔐',
    text: `Here is your secret key to access the file: ${SECRET_KEY}\n\nPlease do not share this key with anyone.`,
    html: `
      <h2>VaultDrop Secret Key 🔐</h2>
      <p>Here is your secret key to access the file:</p>
      <h3>${SECRET_KEY}</h3>
      <p><b>Note:</b> Please do not share this key with anyone. Stay secure!</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error while sending email:', error);
  }
};

export default sendEmail;
