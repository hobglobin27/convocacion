const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const materiaSchema = new Schema({
  descripcion: String
}, 
{
  timestamps: true
});

const Materia = mongoose.model('Materia', materiaSchema);

module.exports = Materia;