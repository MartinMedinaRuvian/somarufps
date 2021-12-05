const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/**
 * El history le permite al backend relacionar el modo history de vue para que las rutas se maneje directamente en el front
 */
app.use(history());

/**
 * Configuro la carpeta publica donde va ir todo el frontend
 */
 app.use(express.static(path.join(__dirname, 'publico')))

 /**
  * Configuro carpeta publica y estatica para acceder a las imagenes
  */
  app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

/**
 * Importo rutas a usar en el servidor
 */
const personaRuta = require('./control/PersonaCtr')
const usuarioRuta = require('./control/UsuarioCtr')
const categoriaRuta = require('./control/CategoriaCtr')
const insumoRuta = require('./control/InsumoCtr')
const productoRuta = require('./control/ProductoCtr')
const subirArchivosRuta = require('./control/SubirArchivosCtr')
const productoInsumoRuta = require('./control/ProductoInsumoCtr')

/**
 * configuro las rutas del servidor
 */
app.use('/personas', personaRuta)
app.use('/usuarios', usuarioRuta)
app.use('/categorias', categoriaRuta)
app.use('/insumos', insumoRuta)
app.use('/productos', productoRuta)
app.use('/subir', subirArchivosRuta)
app.use('/producto-insumo', productoInsumoRuta)

module.exports = app;
