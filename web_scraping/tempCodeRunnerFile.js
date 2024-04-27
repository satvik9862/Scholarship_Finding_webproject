const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465
    auth: {
      user: 'gaikwadsurekha555@gmail.com',
      pass: 'pzhu tuna fmvn jssr'
    }
  });
  const mailOptions = {
    from: 'Your Name <gaikwadsatvik555@gmail.com>', // Sender information
    to: 'gaikwadsatvik555@gmail.com', // Recipient email address
    subject: 'Scholarship  Notification', // Email subject line
    text: 'New Scholarship updated' // Plain text body
    // You can also add HTML content using the 'html' property
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  