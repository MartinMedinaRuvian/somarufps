const Categoria = require('../modelo/Categoria')
const conexion = require('../util/conexion_mysql');

const nombreTabla = 'categoria';

class CategoriaDAO{

    async obtenerTodos(){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla);
        return datos;
    }

    async yaExiste(descripcion){
        const obj = new Categoria();
        
        obj.descripcion = descripcion;

        const yaExiste = await conexion.query('SELECT descripcion FROM ' + nombreTabla + ' WHERE descripcion=?', [obj.descripcion]);

        if(yaExiste.length > 0){
            return true;
        }
        return false;
    }

    async guardar(datos){

        const {descripcion} = datos;

        const obj = new Categoria(descripcion);
        
        const datosGuardar = {
            descripcion: obj.descripcion
        }

        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datosGuardar]);
        
        if(guardar.affectedRows > 0){
            return guardar.insertId;
        }

        return -1;
    }

}

module.exports= CategoriaDAO;