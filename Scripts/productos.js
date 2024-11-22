document.addEventListener("DOMContentLoaded", async function () {
    const productosContainer = document.getElementById("productos");
    const accesoriosContainer = document.getElementById("accesorios");
    let listaJuegos = [];
    let listaPerrifericos = [];
    let inicioJuegos = 0, finJuegos = 6;
    let inicioPerifericos = 0, finPerifericos = 6;

    try {
        const response = await fetch("http://localhost:3000/juego");
        const productos = await response.json();

        productos.forEach(producto => {
            if (producto.activo === true) {

                if (producto.tipo === "juego") {
                    listaJuegos.push(producto);
                } else {
                    listaPerrifericos.push(producto);
                }
            }
        });

        const btnAnteriorJuegos = document.getElementById("back-page");
        const btnSiguienteJuegos = document.getElementById("next-page");
        const btnAnteriorPerifericos = document.getElementById("back-page2");
        const btnSiguientePerifericos = document.getElementById("next-page2");

        btnSiguienteJuegos.addEventListener("click", () => {
            if (finJuegos < listaJuegos.length) {
                inicioJuegos += 6;
                finJuegos += 6;
                actualizar(listaJuegos, productosContainer, inicioJuegos, finJuegos);
            }
        });

        btnAnteriorJuegos.addEventListener("click", () => {
            if (inicioJuegos > 0) {
                inicioJuegos -= 6;
                finJuegos -= 6;
                actualizar(listaJuegos, productosContainer, inicioJuegos, finJuegos);
            }
        });

        btnSiguientePerifericos.addEventListener("click", () => {
            if (finPerifericos < listaPerrifericos.length) {
                inicioPerifericos += 6;
                finPerifericos += 6;
                actualizar(listaPerrifericos, accesoriosContainer, inicioPerifericos, finPerifericos);
            }
        });

        btnAnteriorPerifericos.addEventListener("click", () => {
            if (inicioPerifericos > 0) {
                inicioPerifericos -= 6;
                finPerifericos -= 6;
                actualizar(listaPerrifericos, accesoriosContainer, inicioPerifericos, finPerifericos);
            }
        });


        function actualizar(lista, container, inicio, fin) {
            container.innerHTML = "";
            const productosAMostrar = lista.slice(inicio, fin);
            mostrarProductos(productosAMostrar, container);
        }


        actualizar(listaJuegos, productosContainer, inicioJuegos, finJuegos);
        actualizar(listaPerrifericos, accesoriosContainer, inicioPerifericos, finPerifericos);

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }


    function mostrarProductos(items, container) {
        items.forEach((item) => {
            const div = document.createElement('div')
            div.className = 'card'

            const divimg = document.createElement('div')
            divimg.className = 'image-box'

            const img = document.createElement('img')
            img.src = item.imagen
            divimg.appendChild(img)
            div.appendChild(divimg)

            const divcontent = document.createElement('div')
            divcontent.className = 'content'

            const nombre = document.createElement('h2')
            nombre.className = 'data-producto'
            nombre.textContent = item.nombre
            divcontent.appendChild(nombre)

            const descripcion = document.createElement('p')
            descripcion.textContent = item.descripcion
            descripcion.className = 'descripcion'
            divcontent.appendChild(descripcion)

            const precio = document.createElement('p')
            precio.textContent = item.precio
            precio.className = 'data-precio'
            divcontent.appendChild(precio)

            const entrada = document.createElement('input')
            entrada.className = 'search-input'
            entrada.type = 'number'
            entrada.min = 1
            entrada.placeholder = 'Cantidad: '
            divcontent.appendChild(entrada)

            const boton = document.createElement('button')
            boton.className = 'btn-agregar-carrito'
            boton.textContent = 'Añadir al Carrito'
            divcontent.appendChild(boton)
            div.appendChild(divcontent)
            container.appendChild(div)


            boton.addEventListener('click', () => {
                if (parseInt(entrada.value) > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: "Producto agregado al carrito exitosamente!",
                        showDenyButton: true,
                        confirmButtonText: "Seguir agregando",
                        denyButtonText: `Ir a carrito`,
                        preDeny: () => {
                            window.location.href = 'carrito.html'
                        },
                        customClass: {
                            popup: 'dark-popup'
                        }

                    })
                    const cantidadProducto = parseInt(entrada.value)
                    const precioOriginal = parseFloat(precio.textContent.replace('$', ''))
                    const imgProducto = img.src

                    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

                    const productoExistente = productosCarrito.find(prod => prod.nombre === item.nombre)
                    if (productoExistente) {
                        productoExistente.cantidad += cantidadProducto
                        productoExistente.precio += (precioOriginal * cantidadProducto)
                    } else {
                        productosCarrito.push({
                            nombre: item.nombre,
                            precio: (precioOriginal * cantidadProducto),
                            img: imgProducto,
                            cantidad: cantidadProducto,
                            precioOriginal: precioOriginal
                        })
                    }

                    localStorage.setItem('carrito', JSON.stringify(productosCarrito))
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cantidad inválida',
                        text: 'Por favor, ingresa una cantidad mayor o igual a 1.',
                        customClass: {
                            popup: 'dark-popup'
                        }
                    });
                    return;
                }
            })
        })
    }
})
