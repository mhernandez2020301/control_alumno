const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS

const cursoRoutes = require('./src/routes/curso.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const asignacionRoutes = require('./src/routes/asignacion.routes');

// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api',cursoRoutes, usuariosRoutes, asignacionRoutes);

module.exports = app;