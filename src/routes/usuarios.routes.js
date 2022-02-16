const express = require('express');
const controladorUsuarios = require('../controllers/usuarios.controller');

const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();
//CRUD
//CREATE (Crear/Registrar)
api.post('/registrarAlumno', controladorUsuarios.RegistrarAlumno);
api.post('/registrarMaestro', controladorUsuarios.RegistrarMaestro);

//READ (Leer/Obtener)
api.get('/usuarios', controladorUsuarios.ObtenerAlumnos);

// UPDATE (Actualizar/Editar)
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, controladorUsuarios.EditarUsuarios);

//DELETE (Eliminar/Borrar)
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.Auth, controladorUsuarios.EliminarUsuarios);

//LOGEARSE (Para obtener token)
api.post('/login', controladorUsuarios.Login);

//LOGEARSE (Con token para tener permisos)
api.post('/logintoken', md_autenticacion.Auth, controladorUsuarios.Login);

module.exports = api;

