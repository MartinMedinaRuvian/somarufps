const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Importo rutas a usar en el servidor
 */
const clienteRuta = require('./control/ClienteCtr')
const usuarioRuta = require('./control/UsuarioCtr')
const categoriaRuta = require('./control/CategoriaCtr')
const insumoRuta = require('./control/InsumoCtr')
const productoRuta = require('./control/ProductoCtr')

/**
 * configuro las rutas del servidor
 */
app.use('/clientes', clienteRuta)
app.use('/usuarios', usuarioRuta)
app.use('/categorias', categoriaRuta)
app.use('/insumos', insumoRuta)
app.use('/productos', productoRuta)

/**
 * Configuro la carpeta publica donde va ir todo el frontend
 */
app.use(express.static(path.join(__dirname, 'publico')))

module.exports = app;
