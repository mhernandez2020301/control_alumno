const express = require('express');
const controlAsignacion = require('../controllers/asignacion.controller');

const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();
api.get('/asignatura', controlAsignacion.ObtenerAsignatura);
api.post('/RegistrarAsignatura', controlAsignacion.RegistrarAsignatura);



module.exports = api;