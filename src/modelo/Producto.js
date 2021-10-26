class Producto {

    codigo;
    descripcion;
    foto;
    precioUnidad;
    codigoCategoria;

    constructor (descripcion, foto, precioUnidad, codigoCategoria) {
        this.descripcion = descripcion;
        this.foto = foto;
        this.precioUnidad = precioUnidad;
        this.codigoCategoria = codigoCategoria;
    }
    
}

module.exports=  Producto;