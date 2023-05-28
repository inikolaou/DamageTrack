import nodemailer from 'nodemailer';
import 'dotenv/config'

// Create a transporter object using your Gmail account credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.adminEmail,
    pass: process.env.adminEmail_code,
  },
});

// Construct the email message
const mailOptions = {
  from: process.env.adminEmail,
  to: process.env.adminEmail,
  subject: 'New Damage Report',
  text: 'A new damage report has been uploaded.',
};


export { transporter, mailOptions };