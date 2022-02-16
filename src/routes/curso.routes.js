// IMPORTACIONES
const express = require('express');
const cursoControlador = require('../controllers/curso.controller');
const md_autenticacion = require('../middlewares/autenticacion');

// RUTAS
const api = express.Router();

api.get('/cursos', cursoControlador.ObtenerCursos);
api.post('/agregarCurso', md_autenticacion.Auth, cursoControlador.AgregarCurso);
api.put('/editarCurso/:idCursos', md_autenticacion.Auth, cursoControlador.EditarCurso);
api.delete('/eliminarCurso/:idCursos', md_autenticacion.Auth, cursoControlador.EliminarCurso);


module.exports = api;