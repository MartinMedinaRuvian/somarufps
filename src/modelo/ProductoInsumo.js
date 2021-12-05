class ProductoInsumo {

    codigo;
    codigoProducto;
    codigoInsumo;
    cantidad;

    constructor (codigoProducto, codigoInsumo, cantidad) {
        this.codigoProducto = codigoProducto;
        this.codigoInsumo = codigoInsumo;
        this.cantidad = cantidad;
    }
    
}

module.exports= ProductoInsumo;