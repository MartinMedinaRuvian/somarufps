class Insumo {

    codigo;
    descripcion;
    stock;
    costoUnidad;

    constructor (descripcion, stock, costoUnidad) {
        this.descripcion = descripcion;
        this.stock = stock;
        this.costoUnidad = costoUnidad;
    }
    
}

module.exports= Insumo;