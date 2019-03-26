const express = require('express');
const nodemailer = require("nodemailer");
const router  = express.Router();

router.post('/send-email', (req, res, next) => {
  let { email, subject, message} = req.body;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD
    }
  });

  transporter.sendMail({
    from: '"Convocacion" <convocacion@project.com>',
    to: email, 
    subject: subject, 
    text: message,
    html: `${message}`
  })
  .then(res.status(200).json({ message: 'Envio de correo correcto!' }))
  .catch(error => console.log(error));
  
});

module.exports = router;
