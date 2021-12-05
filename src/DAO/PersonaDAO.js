const Cliente = require('../modelo/Persona')
const conexion = require('../util/conexion_mysql');

const nombreTabla = 'persona';

class PersonaDAO{

    async obtenerTodos(){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla);
        return datos;
    }

    async filtrarPorCategoria(codigoCategoria, descripcion){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE codigo_categoria=? AND descripcion LIKE '%" + descripcion + "%'", [codigoCategoria]);
        return datos;
    }

    async yaExiste(identificacion){
        const obj = new Cliente();
        
        obj.identificacion = identificacion;

        const yaExiste = await conexion.query('SELECT identificacion FROM ' + nombreTabla + ' WHERE identificacion=?', [obj.identificacion]);

        if(yaExiste.length > 0){
            return true;
        }
        return false;
    }

    async guardar(datos){

        const {nombres, apellidos, identificacion, telefono, email, codigo_usuario} = datos;
        let tipo = '1';
    
        const usernameUsuario = await conexion.query('SELECT username FROM usuario WHERE codigo=?', [codigo_usuario]);
        if(usernameUsuario.length > 0){
            if(usernameUsuario[0].username === 'admin'){
                tipo = '2';
            }
        }      
        
        const obj = new Cliente(nombres, apellidos, identificacion, telefono, email, codigo_usuario, tipo);

        const datosGuardar = {
            nombres: obj.nombres,
            apellidos: obj.apellidos,
            identificacion: obj.identificacion,
            telefono: obj.telefono,
            email: obj.email,
            codigo_usuario: obj.codigo_usuario,
            tipo
        }


        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datosGuardar]);
        
        if(guardar.affectedRows > 0){
            return true;
        }

        return false;
    }

    async yaExisteUsuario(codigoUsuario){
        const obj = new Cliente();
        
        obj.codigo_usuario = codigoUsuario;

        const yaExiste = await conexion.query('SELECT codigo_usuario FROM ' + nombreTabla + ' WHERE codigo_usuario=?', [obj.codigo_usuario]);

        if(yaExiste.length > 0){
            return true;
        }
        return false;
    }

    async obtener(codigo_usuario){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE codigo_usuario=?', [codigo_usuario]);
        return datos;
    }

    async actualizar(codigo, datos){
        const actualizar = await conexion.query('UPDATE ' + nombreTabla + ' SET ? WHERE codigo=?', [datos,  codigo]);
        if(actualizar.affectedRows > 0){
            return true;
        }
        return false;
    }

}

module.exports= PersonaDAO;