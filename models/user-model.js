 const mongoose = require('mongoose');
 const Schema   = mongoose.Schema;
 
 const userSchema = new Schema({
  username: String,
  password: String,
  nombre: String,
  paterno: String,
  materno: String,
  genero: String,
  fotos: [{
    nombre: String,
    path: String,
    originalNombre: String
  }],
  hangouts: String,
  skype: String,
  notificacionEmail: String,
  tipoUsuario: String,
  ranking: Number,
  materias:[{type: Schema.ObjectId, ref: "Materia"}],
  direccion: String,
  altitud: String,
  latitud: String
 }, 
 {
  timestamps: true
 });

 const User = mongoose.model('User', userSchema);

 module.exports = User;