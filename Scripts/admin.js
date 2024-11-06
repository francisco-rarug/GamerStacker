// Espera a que todo el contenido del DOM se haya cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", async function () {
    // Referencias a los contenedores donde se van a mostrar los productos
    const productosContainer = document.getElementById("productos");
    const accesoriosContainer = document.getElementById("accesorios");

    // Arrays para almacenar los productos separados por tipo
    let listaJuegos = [];
    let listaPerrifericos = [];

    // Variables para controlar si estamos editando y qué producto está siendo editado
    let esEdicion = false;  // Bandera para saber si es modo edición o no
    let productoActual = null;  // Referencia al producto que se va a editar

    // Inicializamos el modal de Bootstrap para añadir o editar productos
    const modalAñadir = new bootstrap.Modal(document.getElementById('modalAñadir'));
    const formulario = document.getElementById("formularioProducto");

    // Cargar productos desde el servidor (API)
    try {
        const response = await fetch("http://localhost:3000/juego"); // Solicitud GET a la API
        const productos = await response.json(); // Parsear la respuesta a formato JSON

        // Clasificamos los productos en dos listas: juegos y periféricos
        productos.forEach(producto => {
            if (producto.tipo === 'juego') {
                listaJuegos.push(producto);
            } else {
                listaPerrifericos.push(producto);
            }
        });

        // Mostrar los productos en los respectivos contenedores
        mostrarProductos(listaJuegos, productosContainer);
        mostrarProductos(listaPerrifericos, accesoriosContainer);
    } catch (error) {
        console.error("Error al cargar los datos:", error); // Manejo de errores
    }

    // Función para mostrar los productos dentro del contenedor correspondiente
    function mostrarProductos(productos, container) {
        productos.forEach((producto) => {
            // Crear la tarjeta (card) del producto
            const div = document.createElement('div');
            div.className = 'card';

            // Crear el contenedor de la imagen
            const divimg = document.createElement('div');
            divimg.className = 'image-box';

            // Crear la imagen del producto
            const img = document.createElement('img');
            img.src = producto.imagen;
            divimg.appendChild(img);
            div.appendChild(divimg);

            // Crear el contenedor de los detalles del producto
            const divcontent = document.createElement('div');
            divcontent.className = 'content';

            // Crear y añadir el nombre del producto
            const nombre = document.createElement('h2');
            nombre.className = 'data-producto';
            nombre.textContent = producto.nombre;
            divcontent.appendChild(nombre);

            // Crear y añadir la descripción del producto
            const descripcion = document.createElement('p');
            descripcion.textContent = producto.descripcion;
            divcontent.appendChild(descripcion);

            // Crear y añadir el precio del producto
            const precio = document.createElement('p');
            precio.textContent = producto.precio;
            precio.className = 'data-precio';
            divcontent.appendChild(precio);

            // Botón para editar el producto
            const editar = document.createElement('button');
            editar.className = 'btn-editar';
            editar.textContent = 'Editar';
            divcontent.appendChild(editar);

            // Botón para eliminar el producto
            const eliminar = document.createElement('button');
            eliminar.className = 'btn-eliminar';
            eliminar.textContent = 'Eliminar';
            divcontent.appendChild(eliminar);

            // Añadir los detalles y botones al contenedor principal del producto
            div.appendChild(divcontent);
            container.appendChild(div);

            // Evento de eliminar producto
            eliminar.addEventListener('click', () => {
                // Confirmar antes de eliminar el producto
                Swal.fire({
                    icon: 'warning',
                    title: "Desea eliminar el producto?",
                    showDenyButton: true,
                    confirmButtonText: "Ok",
                    denyButtonText: "Cancelar",
                }).then(async (resultado) => {
                    if (resultado.isConfirmed) {
                        try {
                            // Solicitud DELETE a la API para eliminar el producto
                            const pedido = await fetch(`http://localhost:3000/juego/${producto.id}`, {
                                method: "DELETE",
                            });
                            const respuesta = await pedido.json();
                            location.reload(); // Recargar la página después de eliminar
                        } catch (error) {
                            console.error('Error al eliminar el producto:', error);
                        }
                    }
                });
            });

            // Evento de editar producto
            editar.addEventListener('click', () => {
                abrirFormularioEdicion(producto); // Abrir el modal en modo edición
            });
        });
    }

    // Evento para el botón de guardar un nuevo producto o editar uno existente
    const insertar = document.getElementById("guardarNuevoJuego");
    insertar.addEventListener("click", async () => {
        // Crear un FormData para enviar los datos del producto
        const datos = new FormData();
        datos.append("nombre", document.getElementById("nombreJuego").value);
        datos.append("descripcion", document.getElementById("descripcionJuego").value);
        datos.append("precio", document.getElementById("precioJuego").value);
        datos.append("imagen", document.getElementById("imagenJuego").files[0]);
        datos.append("tipo", document.getElementById("tipoJuego").value);

        // Si estamos en modo edición
        if (esEdicion && productoActual) {
            try {
                const datos = {
                    nombre: document.getElementById("nombreJuego").value,
                    descripcion: document.getElementById("descripcionJuego").value,
                    precio: document.getElementById("precioJuego").value,
                    tipo: document.getElementById("tipoJuego").value,
                    imagen: document.getElementById("imagenJuego").files[0]
                };

                const pedido = await fetch(`http://localhost:3000/juego/${productoActual.id}`, {
                    method: "PUT",
                    body: JSON.stringify(datos),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const respuesta = await pedido.json();
                // Mostrar mensaje de éxito y recargar la página
                Swal.fire({
                    icon: 'success',
                    title: 'Producto actualizado correctamente',
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => location.reload());
            } catch (error) {
                console.error('Error al actualizar producto:', error);
            }
        } else {
            // Si estamos en modo de añadir un nuevo producto
            try {
                // Solicitud POST a la API para crear un nuevo producto
                const pedido = await fetch("http://localhost:3000/juego", {
                    method: "POST",
                    body: datos,
                });
                const respuesta = await pedido.json();
                // Mostrar mensaje de éxito y recargar la página
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

        // Ocultar el modal después de añadir o editar
        modalAñadir.hide();
    });

    // Función para abrir el formulario en modo edición
    function abrirFormularioEdicion(producto) {
        esEdicion = true; // Activar modo edición
        productoActual = producto; // Guardar el producto actual

        // Llenar el formulario con los datos del producto que se va a editar
        document.getElementById("nombreJuego").value = producto.nombre;
        document.getElementById("descripcionJuego").value = producto.descripcion;
        document.getElementById("precioJuego").value = producto.precio;
        document.getElementById("tipoJuego").value = producto.tipo;

        // Mostrar el modal con el formulario
        modalAñadir.show();
    }

    // Evento para abrir el formulario en modo de creación de nuevo producto
    const botonNuevoProducto = document.querySelector('[data-bs-target="#modalAñadir"]');
    botonNuevoProducto.addEventListener('click', () => {
        esEdicion = false; // Desactivar modo edición
        productoActual = null; // No hay producto actual

        limpiarFormulario(); // Limpiar el formulario antes de añadir

        modalAñadir.show(); // Mostrar el modal para añadir nuevo producto
    });

    // Evento que se dispara al cerrar el modal
    modalElement.addEventListener('hidden.bs.modal', () => {
        limpiarFormulario(); // Limpiar el formulario cuando se cierra el modal
    });

    // Función para limpiar los campos del formulario
    function limpiarFormulario() {
        document.getElementById("nombreJuego").value = ''; // Limpiar nombre
        document.getElementById("descripcionJuego").value = ''; // Limpiar descripción
        document.getElementById("precioJuego").value = ''; // Limpiar precio
        document.getElementById("imagenJuego").value = ''; // Limpiar imagen
        document.getElementById("tipoJuego").value = 'juego'; // Resetear el tipo a 'juego'
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