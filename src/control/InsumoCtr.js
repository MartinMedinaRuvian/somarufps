const express = require('express');
const rutas = express.Router();

const InsumoDAO = require('../DAO/InsumoDAO');

rutas.get('/', async(req, res) =>{
   const dao = new InsumoDAO();
   try {
      const datos = await dao.obtenerTodos();
      res.status(200).json(datos);
   } catch (error) {
      res.status(500).json({mensaje:error})
   }
});

rutas.post('/', async (req, res)=>{
   const datos = req.body;
   const dao = new InsumoDAO();  
   try {  
      const yaExiste = await dao.yaExiste(datos.descripcion);
      if(yaExiste){
         res.status(500).json({mensaje:'Ya existe'});
      }else{
         const codigoDatoGuardado = await dao.guardar(datos);  
         if(codigoDatoGuardado !== -1){
            res.status(200).json({
               codigo: codigoDatoGuardado
            });
         }
      }
   } catch (error) {
      res.status(500).json({mensaje:error});
   }
});

module.exports = rutas;