const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const mensajeSchema = new Schema({
  titulo: String,
  mensaje: String,
  idRemitente: {type: Schema.ObjectId, ref: "User"},
  idDestinatario: {type: Schema.ObjectId, ref: "User"},
  indicadorLeido: String,
  respuesta: String,
  idpadre: String
}, 
{
 timestamps: true
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;