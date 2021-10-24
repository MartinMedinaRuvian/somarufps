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
      res.status(500).json({mensaje:'El usuario ya existe'});
   }else{

      const idDatoGuardado = await dao.guardar(datos);

      if(idDatoGuardado !== -1){
         res.status(200).json({
            codigo: idDatoGuardado
         });
      }else{
         res.status(500).json({mensaje:'Ocurrio un error'});
      }

   }
})

rutas.post('/inicio-sesion', async (req, res)=>{
   const datos = req.body;
   const dao = new UsuarioDAO();

   const dato = await dao.verificarInicioSesion(datos.username, datos.password);

   if(dato.length > 0){
      res.status(200).json(dato[0])
   }else{
      res.status(500).json({mensaje: 'Usuario o contraseña incorrectos'})
   }
})

module.exports = rutas;