const Insumo = require('../modelo/Insumo')
const conexion = require('../util/conexion_mysql');

const nombreTabla = 'insumo';

class InsumoDAO{

    async obtenerTodos(){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla);
        return datos;
    }

    async yaExiste(descripcion){
        const obj = new Insumo();
        
        obj.descripcion = descripcion;

        const yaExiste = await conexion.query('SELECT descripcion FROM ' + nombreTabla + ' WHERE descripcion=?', [obj.descripcion]);

        if(yaExiste.length > 0){
            return true;
        }
        return false;
    }

    async guardar(datos){

        const {descripcion, stock, costoUnidad} = datos;

        const obj = new Insumo(descripcion, stock, costoUnidad);
        
        const datosGuardar = {
            descripcion: obj.descripcion,
            stock: obj.stock,
            costoUnidad: obj.costoUnidad
        }

        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datosGuardar]);
        
        if(guardar.affectedRows > 0){
            return guardar.insertId;
        }

        return -1;
    }

}

module.exports= InsumoDAO;