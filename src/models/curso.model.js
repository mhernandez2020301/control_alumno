const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = Schema({
    nombre: String,
    idProfesor: String
})

module.exports = mongoose.model('Curso', CursoSchema);