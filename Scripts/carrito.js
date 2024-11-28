function formatCurrency(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function cargarCarrito() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
    const listaProductos = document.getElementById('productos-lista')
    listaProductos.innerHTML = ''

    let total = 0

    if (productosCarrito.length === 0) {
        listaProductos.innerHTML = '<li>El carrito está vacío</li>'
    } else {
        productosCarrito.forEach((producto, index) => {
            const li = document.createElement('li')
            total += producto.precio

            li.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" width="50" height="50"> 
                <strong>${producto.nombre}</strong> - ${formatCurrency(producto.precio)} (x${producto.cantidad})
                <button class="bin-button" data-index="${index}">
                    <svg class="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                        <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" stroke-width="3"></line>
                    </svg>
                    <svg class="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_8_19" fill="white">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                        </mask>
                        <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)"></path>
                        <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                        <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                    </svg>
                </button>
            `

            listaProductos.appendChild(li)
        })

        const lineaHorizontal = document.createElement('hr')
        const totalElement = document.createElement('p')
        totalElement.innerHTML = `<strong class="precio">Total: ${formatCurrency(total)}</strong>`

        listaProductos.appendChild(lineaHorizontal)
        listaProductos.appendChild(totalElement)
    }

    agregarEventosEliminar()
}

function agregarEventosEliminar() {
    document.querySelectorAll('.bin-button').forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const index = e.target.closest('.bin-button').dataset.index
            eliminarProducto(index)
        })
    })
}

function eliminarProducto(index) {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

    if (productosCarrito[index].cantidad > 1) {
        productosCarrito[index].cantidad -= 1
        productosCarrito[index].precio -= productosCarrito[index].precioOriginal
    } else {
        productosCarrito.splice(index, 1)
    }

    localStorage.setItem('carrito', JSON.stringify(productosCarrito))
    cargarCarrito()
}




async function cargarVenta() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

    let total = 0
    let id_venta
    try {
        const response = await fetch("http://localhost:3000/venta");
        const ventas = await response.json();

        if (ventas.length < 1) {
            id_venta = 1;
        } else {

            let maxId = 0;
            ventas.forEach(venta => {
                if (venta.id_venta > maxId) {
                    maxId = venta.id_venta;
                }
            });
            id_venta = maxId + 1;
        }

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }


    productosCarrito.forEach(productoCarrito => {
        total += productoCarrito.precio
    })

    productosCarrito.forEach(async productoCarrito => {
        try {
            const nombre_usuario = document.getElementById("datos").textContent;

            const pedido = await fetch("http://localhost:3000/venta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_venta: id_venta,
                    nombre_usuario: nombre_usuario,
                    nombre: productoCarrito.nombre,
                    cantidad: productoCarrito.cantidad,
                    precioUnitario: productoCarrito.precioOriginal,
                    totalProducto: productoCarrito.precio,
                    totalVenta: total,
                }),
            });

            const respuesta = await pedido.json();
            console.log(respuesta);
        } catch (error) {
            console.error("Error en la solicitud de guardar venta:", error);
        }
    });
}


const finalizarBtn = document.getElementById("finalizar");
finalizarBtn.addEventListener("click", () => {

    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (productosCarrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, agrega productos al carrito antes de finalizar la compra.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    fetch('http://localhost:3000/guardar-carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito: productosCarrito })
    }).then(() => {
        window.location.href = 'http://localhost:3000/ticket';
    }).catch(error => {
        console.error('Error al guardar el carrito:', error);
    });
});



const descargarBtn = document.getElementById("descargar-ticket")
descargarBtn.addEventListener("click", () => {
    generarPDFTicket()
})

const closeModal = document.getElementById("close-finalizar")
closeModal.addEventListener("click", () => {
    const modalFinalizar = document.getElementById("modal-finalizar")
    const modalContent = modalFinalizar.querySelector('.modal-content')

    modalContent.classList.remove("show")
    setTimeout(() => {
        modalFinalizar.style.display = "none"
        document.body.classList.remove("no-scroll")
    }, 300)
})

window.addEventListener("click", (event) => {
    const modalFinalizar = document.getElementById("modal-finalizar")
    if (event.target === modalFinalizar) {
        const modalContent = modalFinalizar.querySelector('.modal-content')
        modalContent.classList.remove("show")
        setTimeout(() => {
            modalFinalizar.style.display = "none"
            document.body.classList.remove("no-scroll")
        }, 300)
    }
})


cargarCarrito()