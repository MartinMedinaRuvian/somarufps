const Producto = require('../modelo/Producto')
const conexion = require('../util/conexion_mysql');

const nombreTabla = 'producto';

class ProductoDAO{

    async obtenerTodos(){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla);
        return datos;
    }

    async yaExiste(descripcion){
        const obj = new Producto();
        
        obj.descripcion = descripcion;

        const yaExiste = await conexion.query('SELECT descripcion FROM ' + nombreTabla + ' WHERE descripcion=?', [obj.descripcion]);

        if(yaExiste.length > 0){
            return true;
        }
        return false;
    }

    async guardar(datos){

        const {descripcion, foto, precioUnidad, codigoCategoria} = datos;

        const obj = new Producto(descripcion, foto, precioUnidad, codigoCategoria);
        
        const datosGuardar = {
            descripcion: obj.descripcion,
            foto: obj.foto,
            precioUnidad: obj.precioUnidad,
            codigoCategoria: obj.codigoCategoria
        }

        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datosGuardar]);
        
        if(guardar.affectedRows > 0){
            return guardar.insertId;
        }

        return -1;
    }

}

module.exports= ProductoDAO;