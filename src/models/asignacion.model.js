const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsignacionSchema = Schema({
    idAlumno: String,
    idCursos: Array
})

module.exports = mongoose.model('Asignación', AsignacionSchema);