const express = require('express');
const rutas = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UsuarioDAO = require('../DAO/UsuarioDAO');

rutas.get('/', async(req, res) =>{
   const dao = new UsuarioDAO();
   const datos = await dao.obtenerTodos();
   res.json(datos)
})

rutas.post('/', async(req, res)=>{

   const dato = {
      username: req.body.username
    }
  
    dato.password = bcrypt.hashSync(req.body.password, saltRounds);
  
    try {
       
      const dao = new UsuarioDAO()

      const yaExiste = await dao.yaExiste(dato.username)

      if(yaExiste){
         res.status(500).json({mensaje:'Ya existe'})
      }else{
         const idUsuarioGuardar = await dao.guardar(dato)
         if(idUsuarioGuardar > -1){
            res.status(200).json({codigo: idUsuarioGuardar})
         }
      }
      
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error'
      });
    }
  
})

rutas.post('/inicioSesion', async (req, res)=>{
   const dato = req.body;
   const dao = new UsuarioDAO();

   console.log(dato)

   const usuario = await dao.verificarUsuario(dato.username)

   console.log(usuario)

   if(usuario.length > 0){
      if(!bcrypt.compareSync(dato.password, usuario[0].password)){
         res.status(400).json({mensaje:'Verifique la contraseña'})
      }else{
         res.status(200).json(usuario[0])
      }
   }else{
      res.status(500).json({mensaje: 'Verifique el usuario'})
   }
})

module.exports = rutas;