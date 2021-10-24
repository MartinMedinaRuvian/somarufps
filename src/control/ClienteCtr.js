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
      res.json('El cliente ya existe');
   }else{

      const guardar = await dao.guardar(datos);

      if(guardar){
         res.json('Guardado correctamente')
      }else{
         res.json('Error al guardar')
      }

   }
})

module.exports = rutas;