document.addEventListener("DOMContentLoaded", function () {
    const productosContainer = document.getElementById("productos");
    const accesoriosContainer = document.getElementById("accesorios");

    fetch("/Scripts/productos.json")
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data.productos, productosContainer);
            mostrarProductos(data.accesorios, accesoriosContainer);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    function mostrarProductos(items, container) {
        items.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'card';

            const divimg = document.createElement('div');
            divimg.className = 'image-box';

            const img = document.createElement('img');
            img.src = item.imagen;
            divimg.appendChild(img);
            div.appendChild(divimg);

            const divcontent = document.createElement('div');
            divcontent.className = 'content';

            const nombre = document.createElement('h2');
            nombre.className = 'data-producto';
            nombre.textContent = item.nombre;
            divcontent.appendChild(nombre);

            const descripcion = document.createElement('p');
            descripcion.textContent = item.descripcion;
            divcontent.appendChild(descripcion);

            const precio = document.createElement('p');
            precio.textContent = item.precio;
            precio.className = 'data-precio';
            divcontent.appendChild(precio);

            const entrada = document.createElement('input');
            entrada.className = 'cantidad-productos';
            entrada.type = 'number';
            entrada.min = 1;
            entrada.placeholder = 'Cantidad: ';
            divcontent.appendChild(entrada);

            const boton = document.createElement('button');
            boton.className = 'btn-agregar-carrito';
            boton.textContent = 'Añadir al Carrito';
            divcontent.appendChild(boton);
            div.appendChild(divcontent);
            container.appendChild(div);

            
            boton.addEventListener('click', () => {
                Swal.fire({
                    icon: 'success',
                    title: "Producto agregado al carrito exitosamente!",
                    showDenyButton: true,
                    confirmButtonText: "Seguir agregando",
                    denyButtonText: `Ir a carrito`,
                    preDeny: () => {
                        window.location.href = 'carrito.html';
                    }
                });

                const cantidadProducto = parseInt(entrada.value);
                const precioOriginal = parseFloat(precio.textContent.replace('$', ''));
                const imgProducto = img.src;

                let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

                const productoExistente = productosCarrito.find(prod => prod.nombre === item.nombre);
                if (productoExistente) {
                    productoExistente.cantidad += cantidadProducto;
                    productoExistente.precio += (precioOriginal * cantidadProducto);
                } else {
                    productosCarrito.push({
                        nombre: item.nombre,
                        precio: (precioOriginal * cantidadProducto),
                        img: imgProducto,
                        cantidad: cantidadProducto,
                        precioOriginal: precioOriginal
                    });
                }

                localStorage.setItem('carrito', JSON.stringify(productosCarrito));
            });
        });
    }
});
