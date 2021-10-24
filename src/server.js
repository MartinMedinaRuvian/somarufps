const express = require('express');
const morgan = require('morgan');

const app = express();

/**
 * Middlewares
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Importo rutas a usar en el servidor
 */
const clienteRuta = require('./control/ClienteCtr')
const usuarioRuta = require('./control/UsuarioCtr')

/**
 * configuro las rutas del servidor
 */
app.use('/clientes', clienteRuta)
app.use('/usuarios', usuarioRuta)

module.exports = app;
