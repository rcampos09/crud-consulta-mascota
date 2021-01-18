const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
    Tipo: String,
    Nombre: String,
    Rasgos: String
})
const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;