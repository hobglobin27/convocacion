const express = require('express');
const nodemailer = require("nodemailer");
const router  = express.Router();
const User    = require('../models/user-model');
const Grupo    = require('../models/grupo-model');
const parser  = require('../configs/cloudinary');

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

router.post('/upload/pictures', parser.single('picture'), (req, res, next) => {
  /*const idUser = req.params.idUser;
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
  .catch(error => console.log(error))*/
  console.log("Este es el res de upload:", res.header)
  res.json({
    success: true,
    pictureUrl: req.file.url
  })
});

router.post('/removeimage/:id', (req, res, next) => {
  const nombre=req.body.name;
  const idUsuario=req.params.id;

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

router.post('/actualizaperfil', (req, res, next) => {
  const idUsuario = req.body.idUsuario;
  const nombre = req.body.nombre;
  const paterno = req.body.paterno;
  const materno = req.body.materno;
  const genero = req.body.genero;
  const fotos = req.body.fotos;
  const hangouts = req.body.hangouts;
  const skype = req.body.skype;
  const notificacionEmail = req.body.notificacionEmail;
  const tipoUsuario = req.body.tipoUsuario;
  let   materias = req.body.materias;
  let   direccion = req.body.direccion;
  const inmueble = req.body.inmueble;
  let   dataGrupo = req.body.dataGrupo;
  let   grupoLider = req.body.grupoLider;
  const direccionesAlternas = req.body.direccionesAlternas;

  if(inmueble === "N")
    direccion = "";

  if(tipoUsuario === "L"){
    materias = [];
  }

  User.updateOne({_id: idUsuario }, {$set: { nombre: nombre,
                                            paterno: paterno,
                                            materno: materno,
                                            genero: genero,
                                            fotos: fotos,
                                            hangouts: hangouts,
                                            skype: skype,
                                            notificacionEmail: notificacionEmail,
                                            tipoUsuario: tipoUsuario,
                                            materias: materias,
                                            direccion: direccion,
                                            grupos: dataGrupo,
                                            direccionesAlternas: direccionesAlternas
                                          }})
  .then((user) => {
    if(tipoUsuario === "L")
      dataGrupo.forEach(grupo => {
        const newGrupo = new Grupo({
                                    idUsuario   : idUsuario,
                                    nombreGrupo : grupo,
                                    aceptado: "N"
                                  });
    
        newGrupo.save()
        .then( grupo => {
          console.log("Se dio de alta el grupo: ", grupo)
        })
        .catch(err=>console.log(err)) 
      })
    User.find({_id: idUsuario})
    .then(user => res.status(200).json(user))
    .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
});

router.get('/direccionesalternas', (req, res, next) => { 
  User.find().distinct("direccionesAlternas")
  .then(direcciones =>{
    res.json(direcciones);
  })
  .catch(err =>{
    console.log(err)
  })
});

router.get('/grupospendientes/:idusuario', (req, res, next) => {
  const idUsuario = req.params.idusuario
  Grupo.find({ idUsuario: idUsuario, aceptado: "N"})
  .then(grupos =>{
    res.json(grupos);
  })
  .catch(err =>{
    console.log(err)
  })
});

router.get('/gruposasignados/:idusuario', (req, res, next) => {
  const idUsuario = req.params.idusuario
  Grupo.find({ idUsuario: idUsuario, aceptado: "S"})
  .then(grupos =>{
    res.json(grupos);
  })
  .catch(err =>{
    console.log(err)
  })
});


module.exports = router;

module.exports = router;
