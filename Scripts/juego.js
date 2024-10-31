class Juego {
    nombre = "";
    descripcion = "";
    precio = 0;
    imagen = "";

    constructor(nombre, descripcion, precio, imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }


}
module.exports = Juego;