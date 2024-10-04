document.querySelectorAll('.btn-agregar-carrito').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const nombreProducto = document.querySelectorAll('.data-producto')[index].innerText;
        const precioProducto = document.querySelectorAll('.data-precio')[index].innerText;

        const producto = { nombre: nombreProducto, precio: precioProducto };

        let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        productosCarrito.push(producto);

        localStorage.setItem('carrito', JSON.stringify(productosCarrito));

        alert(`${nombreProducto} fue agregado al carrito`);
    });
});

function cargarCarrito() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const listaProductos = document.getElementById('productos-lista');

    listaProductos.innerHTML = '';

    if (productosCarrito.length === 0) {
        listaProductos.innerHTML = '<li>El carrito está vacio</li>';
    } else {
        productosCarrito.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${producto.nombre}</strong> - ${producto.precio}`;
            listaProductos.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', cargarCarrito);
