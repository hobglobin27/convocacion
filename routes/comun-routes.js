const express = require('express');
const nodemailer = require("nodemailer");
const router  = express.Router();
const User       = require('../models/user-model');
const parser       = require('../configs/cloudinary');

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

router.post('/upload/pictures/add/user/:idUser', parser.single('picture'), (req, res, next) => {
  const idUser = req.params.idUser;
  let fotos={
    nombre: req.file.originalname,
    path: req.file.url,
    originalNombre: req.file.originalname
  }
  User.findById({_id: idUser })
  .then(user =>{
    let arrayFotos = user.fotos;
    arrayFotos.push(fotos);
    User.updateOne({_id: idUser }, {$set: { "fotos": arrayFotos}})
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
    .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
});

router.post('/removeimage/:id', (req, res, next) => {
  const nombre=req.body.name;
  const idUsuario=req.params.id;

  console.log("nombre: ", nombre);
  console.log("usuario: ", idUsuario);

  User.findById({_id: idUsuario })
  .then(user =>{
    let arrayFotos = user.fotos.filter(foto => foto.nombre!== nombre);
    User.updateOne({_id: idUsuario }, {$set: { "fotos": arrayFotos}})
    .then(() => {
      res.json({
        success: true
      })
    })
    .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
});

module.exports = router;
