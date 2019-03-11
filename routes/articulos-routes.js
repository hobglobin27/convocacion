const express = require('express');
const mongoose = require('mongoose');


const router  = express.Router();

// GET route => to get all the projects
router.get('/prueba', (req, res, next) => {
  res.json({"titulo": "prueba"});
});


module.exports = router;