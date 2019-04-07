const express = require('express');
const User = require('../models/user-model')
const Materia = require('../models/materia-model')


const router  = express.Router();

// GET route => to get all the projects
router.get('/toptutores', (req, res, next) => { 
  User.find({tipoUsuario: "T"}).limit(12)
    .then(usuario =>{
      res.json(usuario);
    })
    .catch(err =>{
      console.log(err)
    })
});

router.get('/totaltutores', (req, res, next) => { 
  User.find({tipoUsuario: "T"}).countDocuments().limit(12)
    .then(usuario =>{
      res.json(usuario);
    })
    .catch(err =>{
      console.log(err)
    })
});

router.get('/buscatutores/materia', (req, res, next) => {
  const materia = req.query.materia;
  User.find({tipoUsuario: "T", materias: materia})
    .then(usuario =>{
      res.json(usuario);
    })
    .catch(err =>{
      console.log(err)
    })
});

router.get('/buscatutores/direccion', (req, res, next) => {
  const direccion = req.query.direccion;
  User.find({tipoUsuario: "T", direccionesAlternas: direccion})
    .then(usuario =>{
      res.json(usuario);
    })
    .catch(err =>{
      console.log(err)
    })
});

router.get('/buscatutores/direccionmateria', (req, res, next) => {
  const direccion = req.query.direccion;
  const materia = req.query.materia;
  User.find({tipoUsuario: "T", direccionesAlternas: direccion, materias: materia})
    .then(usuario =>{
      res.json(usuario);
    })
    .catch(err =>{
      console.log(err)
    })
});

router.get('/materias', (req, res, next) => { 
  Materia.find()
  .then(materia =>{
    res.json(materia);
  })
  .catch(err =>{
    console.log(err)
  })
});

module.exports = router;