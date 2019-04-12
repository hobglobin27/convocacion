const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const grupoSchema = new Schema({
 nombreGrupo: String,
 integrantes: [{
   nombre: String,
   paterno: String,
   materno: String
 }],
 materias: [],
 idUsuario: {type: Schema.ObjectId, ref: "User"},
 aceptado: String,
 terminado: String
}, 
{
 timestamps: true
});

const Grupo = mongoose.model('Grupo', grupoSchema);

module.exports = Grupo;