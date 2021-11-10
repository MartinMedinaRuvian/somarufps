class Persona {

    codigo;
    nombres;
    apellidos;
    identificacion;
    telefono;
    email;
    codigo_usuario;
    tipo;

    constructor (nombres, apellidos, identificacion, telefono, email, codigo_usuario, tipo) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.identificacion = identificacion;
        this.telefono = telefono;
        this.email = email;
        this.codigo_usuario = codigo_usuario;
        this.tipo = tipo;
    }


}

module.exports= Persona;