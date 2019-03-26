const express = require('express');
const mongoose = require('mongoose');
const Perfil = require('../models/perfil-model')


const router  = express.Router();

// GET route => to get all the projects
router.get('/toptutores', (req, res, next) => { 
  Perfil.find({tipoUsuario: "T"}).limit(12)
    .then(perfil =>{
      console.log(perfil)
      res.json(perfil);
    })
    .catch(err =>{
      console.log(err)
    })
});

router.get('/totaltutores', (req, res, next) => { 
  Perfil.find({tipoUsuario: "T"}).count().limit(12)
    .then(perfil =>{
      console.log(perfil)
      res.json(perfil);
    })
    .catch(err =>{
      console.log(err)
    })
});

module.exports = router;