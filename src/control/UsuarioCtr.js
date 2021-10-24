const express = require('express');
const rutas = express.Router();

const UsuarioDAO = require('../DAO/UsuarioDAO');

rutas.get('/', async(req, res) =>{
   const dao = new UsuarioDAO();
   const datos = await dao.obtenerTodos();
   res.json(datos)
})

rutas.post('/', async (req, res)=>{
   const datos = req.body;
   const dao = new UsuarioDAO();

   const yaExiste = await dao.yaExiste(datos.username);

   if(yaExiste){
      res.json('El usuario ya existe');
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