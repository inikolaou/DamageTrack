import nodemailer from 'nodemailer';

// Create a transporter object using your Gmail account credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'od.kopakakis@gmail.com',
    pass: 'efnylykbiljlhtbs',
  },
});

// Construct the email message
const mailOptions = {
  from: 'od.kopakakis@gmail.com',
  to: 'od.kopakakis@gmail.com',
  subject: 'New Damage Report',
  text: 'A new damage report has been uploaded.',
};


export { transporter, mailOptions };