const express = require('express');
const rutas = express.Router();

const PersonaDAO = require('../DAO/PersonaDAO');

rutas.get('/', async(req, res) =>{
   const dao = new PersonaDAO();
   try {
      const datos = await dao.obtenerTodos();
      res.status(200).json(datos);
   } catch (error) {
      res.status(500).json({mensaje:error});
   }
});

rutas.get('/:codigo_usuario', async(req, res) =>{
   const {codigo_usuario} = req.params
   console.log(codigo_usuario)
   const dao = new PersonaDAO();
   try {
      const datos = await dao.obtener(codigo_usuario);
      res.status(200).json(datos[0]);
   } catch (error) {
      res.status(500).json({mensaje:error});
   }
});

rutas.post('/', async (req, res)=>{
   const datos = req.body;
   const dao = new PersonaDAO();
   try {     
      const yaExiste = await dao.yaExiste(datos.identificacion);
      if(yaExiste){
         res.status(500).json({mensaje:'El Persona ya existe'});
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

rutas.put('/:codigo', async(req, res) =>{
   const {codigo} = req.params;
   const datos = req.body;
   const dao = new PersonaDAO();
   try {
      const respuesta = await dao.actualizar(codigo, datos);
      if(respuesta){
         res.status(200).json({mensaje:'Actualizado correctamente'});
      }else{
         res.status(400).json({mensaje:'Ocurrio algo'});
      }     
   } catch (error) {
      res.status(500).json({mensaje:error})
   }
});

module.exports = rutas;