const express = require('express');
const rutas = express.Router();

const ProductoDAO = require('../DAO/ProductoDAO');

rutas.get('/', async(req, res) =>{
   const dao = new ProductoDAO();
   const datos = await dao.obtenerTodos();
   res.json(datos)
})

rutas.post('/', async (req, res)=>{
   const datos = req.body;
   const dao = new ProductoDAO();

   const yaExiste = await dao.yaExiste(datos.descripcion);

   if(yaExiste){
      res.status(500).json({mensaje:'Ya existe'});
   }else{

      const codigoDatoGuardado = await dao.guardar(datos);

      if(codigoDatoGuardado !== -1){
         res.status(200).json({
            codigo: codigoDatoGuardado
         });
      }else{
         res.status(500).json({mensaje:'Ocurrio un error'});
      }

   }
})

module.exports = rutas;