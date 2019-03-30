const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const perfilSchema = new Schema({
  nombre: String,
  paterno: String,
  materno: String,
  genero: String,
  fechaNacimiento: Date,
  foto: {
    nombre: String,
    path: String,
    originalNombre: String
  },
  usuario_id: {type: Schema.ObjectId, ref: "User"},
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

const Perfil = mongoose.model('Perfil', perfilSchema);

module.exports = Perfil;