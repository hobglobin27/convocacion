const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const materiaSchema = new Schema({
  nombre: String
}, 
{
  timestamps: true
});

const Materia = mongoose.model('Materia', userSchema);

module.exports = Materia;