const express = require('express');
const rutas = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs')

crearCarpetaImagenes()

let storage  = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../imagenes'))
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function crearCarpetaImagenes(){
    try {
        fs.mkdirSync(path.join(__dirname, '../imagenes'))
      } catch (err) {
        if (err.code !== 'EEXIST') throw err
      }
}

function eliminarImagen(imagen){
    try {
        fs.unlinkSync(path.join(__dirname, '../imagenes/' + imagen))
        return true;
      } catch(err) {
        console.error('Something wrong happened removing the file', err)
      }
    return false;
}

function eliminarTodasLasImagenes(){
    try {
        fs.unlinkSync(path.join(__dirname, '../imagenes/'))
        return true;
      } catch(err) {
        console.error('Something wrong happened removing the file', err)
      }
    return false;
}


const upload = multer({storage});

rutas.post('/', upload.single('file'), (req, res)=>{
    res.status(200).json(req.file)
})

rutas.delete('/:imagen', (req, res)=>{
    const {imagen} = req.params;
    if(eliminarImagen(imagen)){
        res.status(200).json({mensaje:'Imagen eliminada correctamente'})
    }
    res.status(400).json({mensaje:'Ocurrio un error'})
})

module.exports = rutas;