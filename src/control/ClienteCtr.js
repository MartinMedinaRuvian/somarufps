const express = require('express');
const rutas = express.Router();

const ClienteDAO = require('../DAO/ClienteDAO');

rutas.get('/', async(req, res) =>{
   const dao = new ClienteDAO();
   try {
      const datos = await dao.obtenerTodos();
      res.status(200).json(datos);
   } catch (error) {
      res.status(500).json({mensaje:error});
   }
});

rutas.post('/', async (req, res)=>{
   const datos = req.body;
   const dao = new ClienteDAO();
   try {     
      const yaExiste = await dao.yaExiste(datos.identificacion);
      if(yaExiste){
         res.status(500).json({mensaje:'El cliente ya existe'});
      }else{
         const guardar = await dao.guardar(datos);
         if(guardar){
            res.status(200).json(datos);
         }else{
            res.status(500).json({mensaje:'Ocurrio un error'});
         }
      }
   } catch (error) {
      res.status(500).json({mensaje:error});
   }
});

module.exports = rutas;