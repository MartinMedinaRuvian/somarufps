const express = require('express');
const rutas = express.Router();

const ClienteDAO = require('../DAO/ClienteDAO');

rutas.get('/', async(req, res) =>{
   const dao = new ClienteDAO();
   const datos = await dao.obtenerTodos();
   res.json(datos)
})

rutas.post('/', async (req, res)=>{
   const datos = req.body;

   const dao = new ClienteDAO();

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
})

module.exports = rutas;