const ProductoInsumo = require('../modelo/ProductoInsumo')
const conexion = require('../util/conexion_mysql');

const nombreTabla = 'producto_insumo';

class ProductoInsumoDAO{

    async obtenerTodos(){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla);
        return datos;
    }

    async obtenerFiltrado(filtro){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE descripcion LIKE '%" + filtro + "%'");
        return datos;
    }

    async filtroPorCodigoProducto(codigoProducto){
        const datos = await conexion.query('SELECT * FROM insumo WHERE codigo IN (SELECT codigo_insumo FROM producto_insumo WHERE codigo_producto = ?)', [codigoProducto]);
        return datos;
    }

    async guardar(datos){

        const {codigoProducto, codigoInsumo, cantidad} = datos;

        const obj = new ProductoInsumo(codigoProducto, codigoInsumo, cantidad);
        
        const datosGuardar = {
            codigo_producto: obj.codigoProducto,
            codigo_insumo: obj.codigoInsumo,
            cantidad: obj.cantidad
        }

        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datosGuardar]);
        
        if(guardar.affectedRows > 0){
            return guardar.insertId;
        }

        return -1;
    }

    async eliminar(codigo){
        const obj = new ProductoInsumo();
        
        obj.codigo = codigo;

        const eliminar = await conexion.query('DELETE FROM ' + nombreTabla + ' WHERE codigo=?', [obj.codigo]);

        if(eliminar.length > 0){
            return true;
        }
        return false;
    }

    async actualizar(codigo, datos){
        const obj = new ProductoInsumo();
 
        obj.codigo = codigo;

        const actualizar = await conexion.query('UPDATE ' + nombreTabla + ' SET ? WHERE codigo=?', [datos,  obj.codigo]);
        if(actualizar.length > 0){
            return true;
        }
        return false;
    }

}

module.exports= ProductoInsumoDAO;