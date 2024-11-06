document.addEventListener("DOMContentLoaded", async function () {
    const productosContainer = document.getElementById("productos");
    const accesoriosContainer = document.getElementById("accesorios");


    let listaJuegos = [];
    let listaPerrifericos = [];


    let esEdicion = false;
    let productoActual = null;

    const modalAñadir = new bootstrap.Modal(document.getElementById('modalAñadir'));


    try {
        const response = await fetch("http://localhost:3000/juego");
        const productos = await response.json();

        productos.forEach(producto => {
            if (producto.tipo === 'juego') {
                listaJuegos.push(producto);
            } else {
                listaPerrifericos.push(producto);
            }
        });


        mostrarProductos(listaJuegos, productosContainer);
        mostrarProductos(listaPerrifericos, accesoriosContainer);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }

    function mostrarProductos(productos, container) {
        productos.forEach((producto) => {
            const div = document.createElement('div');
            div.className = 'card';

            const divimg = document.createElement('div');
            divimg.className = 'image-box';

            const img = document.createElement('img');
            img.src = producto.imagen;
            divimg.appendChild(img);
            div.appendChild(divimg);

            const divcontent = document.createElement('div');
            divcontent.className = 'content';

            const nombre = document.createElement('h2');
            nombre.className = 'data-producto';
            nombre.textContent = producto.nombre;
            divcontent.appendChild(nombre);

            const descripcion = document.createElement('p');
            descripcion.textContent = producto.descripcion;
            divcontent.appendChild(descripcion);


            const precio = document.createElement('p');
            precio.textContent = producto.precio;
            precio.className = 'data-precio';
            divcontent.appendChild(precio);


            const editar = document.createElement('button');
            editar.className = 'btn-editar';
            editar.textContent = 'Editar';
            divcontent.appendChild(editar);


            const eliminar = document.createElement('button');
            eliminar.className = 'btn-eliminar';
            eliminar.textContent = 'Eliminar';
            divcontent.appendChild(eliminar);


            div.appendChild(divcontent);
            container.appendChild(div);


            eliminar.addEventListener('click', () => {

                Swal.fire({
                    icon: 'warning',
                    title: "Desea eliminar el producto?",
                    showDenyButton: true,
                    confirmButtonText: "Ok",
                    denyButtonText: "Cancelar",
                }).then(async (resultado) => {
                    if (resultado.isConfirmed) {
                        try {

                            const pedido = await fetch(`http://localhost:3000/juego/${producto.id}`, {
                                method: "DELETE",
                            });
                            const respuesta = await pedido.json();
                            location.reload();
                        } catch (error) {
                            console.error('Error al eliminar el producto:', error);
                        }
                    }
                });
            });


            editar.addEventListener('click', () => {
                abrirFormularioEdicion(producto);
            });
        });
    }


    const formAgregar = document.getElementById("guardarJuego");
    formAgregar.addEventListener("click", async () => {

        const datos = new FormData();
        datos.append("nombre", document.getElementById("nombreJuego").value);
        datos.append("descripcion", document.getElementById("descripcionJuego").value);
        datos.append("precio", document.getElementById("precioJuego").value);
        datos.append("imagen", document.getElementById("imagenJuego").files[0]);
        datos.append("tipo", document.getElementById("tipoJuego").value);


        if (esEdicion && productoActual) {
            try {

                const pedido = await fetch("http://localhost:3000/juego/" + productoActual.id, {
                    method: "PUT",
                    body: datos,
                });
                const respuesta = await pedido.json();

                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado correctamente',
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => location.reload());
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        } else {

            try {

                const pedido = await fetch("http://localhost:3000/juego", {
                    method: "POST",
                    body: datos,
                });
                const respuesta = await pedido.json();

                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado correctamente',
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => location.reload());
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        }


        modalAñadir.hide();
    });


    function abrirFormularioEdicion(producto) {
        esEdicion = true;
        productoActual = producto;

        document.getElementById("modalAñadirLabel").textContent = "Editar Juego"

        document.getElementById("nombreJuego").value = producto.nombre;
        document.getElementById("descripcionJuego").value = producto.descripcion;
        document.getElementById("precioJuego").value = producto.precio;
        document.getElementById("tipoJuego").value = producto.tipo;


        modalAñadir.show();
    }

    modalElement.addEventListener('hidden.bs.modal', () => {
        limpiarFormulario();
    });


    function limpiarFormulario() {
        document.getElementById("modalAñadirLabel").textContent = "Añadir Nuevo Producto"
        document.getElementById("nombreJuego").value = '';
        document.getElementById("descripcionJuego").value = '';
        document.getElementById("precioJuego").value = '';
        document.getElementById("imagenJuego").value = '';
        document.getElementById("tipoJuego").value = 'juego';
    }
});

/*
fetch("/Scripts/productos.json")
    .then(response => response.json())
    .then(data => {
        agregarDb(data.productos);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

async function agregarDb(productos) {
    for (const producto of productos) {
        const datos = {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagen: producto.imagen,
            tipo: producto.tipo,
        };

        try {
            const pedido = await fetch("http://localhost:3000/juego", {
                method: "POST",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!pedido.ok) {
                throw new Error(Error en la respuesta: ${pedido.status});
            }

            const respuesta = await pedido.json();
            console.log('Producto agregado:', respuesta);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }
}*/