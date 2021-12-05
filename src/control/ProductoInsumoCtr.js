const express = require('express');
const rutas = express.Router();

const ProductoInsumoDAO = require('../DAO/ProductoInsumoDAO');

rutas.get('/', async(req, res) =>{
   const dao = new ProductoInsumoDAO();
   try {
      const datos = await dao.obtenerTodos();
      res.status(200).json(datos);
   } catch (error) {
      res.status(500).json({mensaje:error})
   }
});

rutas.get('/:filtro', async(req, res) =>{
   const { filtro } = req.params
   const dao = new ProductoInsumoDAO();
   try {
      const datos = await dao.obtenerFiltrado(filtro);
      res.status(200).json(datos);
   } catch (error) {
      res.status(500).json({mensaje:error})
   }
});

rutas.get('/filtro-producto/:codigo_producto', async(req, res) =>{
   const { codigo_producto } = req.params
   const dao = new ProductoInsumoDAO();
   try {
      const datos = await dao.filtroPorCodigoProducto(codigo_producto);
      res.status(200).json(datos);
   } catch (error) {
      res.status(500).json({mensaje:error})
   }
});


rutas.post('/', async (req, res)=>{
   const datos = req.body;
   console.log(datos)
   const dao = new ProductoInsumoDAO();  
   try {  
      for(dato of datos){
         await dao.guardar(dato);  
      }  
      res.status(200).json({mensaje:'Guardado correctamente'})
   } catch (error) {
      res.status(500).json({mensaje:error});
   }
});

rutas.delete('/:codigo', async(req, res) =>{
   const {codigo} = req.params;
   const dao = new ProductoInsumoDAO();
   try {
      const datos = await dao.eliminar(codigo);
      res.status(200).json(datos);
   } catch (error) {
      res.status(500).json({mensaje:error})
   }
});

rutas.put('/:codigo', async(req, res) =>{
   const {codigo} = req.params;
   const datos = req.body;

   const dao = new ProductoInsumoDAO();
   try {
      const respuesta = await dao.actualizar(codigo, datos);
      res.status(200).json(respuesta);
   } catch (error) {
      res.status(500).json({mensaje:error})
   }
});

module.exports = rutas;