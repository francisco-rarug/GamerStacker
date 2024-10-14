document.querySelectorAll('.btn-agregar-carrito').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        Swal.fire({
            title: 'Producto añadido al carrito',
            text: 'Se añadio el producto correctamente',
            icon: 'success',
            confirmButtonText: 'Continuar'
        });

        const nombreProducto = document.querySelectorAll('.data-producto')[index].innerText
        const precioProducto = document.querySelectorAll('.data-precio')[index].innerText
        let cantidadProducto = parseInt(document.querySelectorAll('.cantidad-productos')[index].value);
        const precioOriginal = parseFloat(precioProducto.replace('$', ''))
        const imgProducto = document.querySelectorAll('.image-box img')[index].src
        const precio = parseFloat(precioProducto.replace('$', ''))

        let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
        if (isNaN(cantidadProducto) || cantidadProducto <= 0) {
            cantidadProducto = 1;
        }
        const productoExistente = productosCarrito.find(producto => producto.nombre === nombreProducto)
        if (productoExistente) {
            productoExistente.cantidad += cantidadProducto
            productoExistente.precio += (precioOriginal * cantidadProducto)
        } else {
            productosCarrito.push({ nombre: nombreProducto, precio: (precioOriginal * cantidadProducto), img: imgProducto, cantidad: cantidadProducto, precioOriginal: precioOriginal })
        }

        localStorage.setItem('carrito', JSON.stringify(productosCarrito))
    })
})

function cargarCarrito() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
    const listaProductos = document.getElementById('productos-lista')
    listaProductos.innerHTML = ''

    let total = 0

    if (productosCarrito.length === 0) {
        listaProductos.innerHTML = '<li>El carrito está vacío</li>'
    } else {
        productosCarrito.forEach(producto => {
            const li = document.createElement('li')
            total += producto.precio

            li.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" width="50" height="50"> 
                <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(3)} (x${producto.cantidad})`
            listaProductos.appendChild(li)
        })

        const lineaHorizontal = document.createElement('hr')
        const totalElement = document.createElement('p')
        totalElement.innerHTML = `<strong>Total: $${total.toFixed(3)}</strong>`

        listaProductos.appendChild(lineaHorizontal)
        listaProductos.appendChild(totalElement)
    }
}

cargarCarrito()

// Parte para formulario modal de ticket
function cargarProductosFinalizar() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
    const listaProductosFinalizar = document.getElementById('lista-productos-finalizar')
    listaProductosFinalizar.innerHTML = ''

    let total = 0

    productosCarrito.forEach(producto => {
        const li = document.createElement('li')
        total += producto.precio
        li.innerHTML = `<strong>${producto.nombre}</strong> - $${producto.precio.toFixed(3)} (x${producto.cantidad})`
        listaProductosFinalizar.appendChild(li)
    })

    const lineaHorizontal = document.createElement('hr')
    const totalElement = document.createElement('p')
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(3)}</strong>`

    listaProductosFinalizar.appendChild(lineaHorizontal)
    listaProductosFinalizar.appendChild(totalElement)
}


const finalizarBtn = document.getElementById("finalizar")
finalizarBtn.addEventListener("click", () => {

    cargarProductosFinalizar()
    const modalFinalizar = document.getElementById("modal-finalizar")
    const modalContent = modalFinalizar.querySelector('.modal-content')

    modalFinalizar.style.display = "block"
    document.body.classList.add("no-scroll")

    setTimeout(() => {
        modalContent.classList.add("show")
    }, 10)
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
    borrar()
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

function borrar() {

    localStorage.removeItem('carrito')
    cargarCarrito()
}

function borrarUltimoProducto() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

    if (productosCarrito.length > 0) {
        const ultimoProducto = productosCarrito[productosCarrito.length - 1]
        const index = productosCarrito.findIndex(producto => producto.nombre === ultimoProducto.nombre)

        if (index !== -1) {
            if (productosCarrito[index].cantidad > 1) {
                productosCarrito[index].cantidad -= 1
                productosCarrito[index].precio -= productosCarrito[index].precioOriginal
            } else {
                productosCarrito.splice(index, 1)
            }
        }
        localStorage.setItem('carrito', JSON.stringify(productosCarrito))
    }
    cargarCarrito()
}

const borrarBtn = document.getElementById("borrar")
borrarBtn.addEventListener("click", () => {
    borrar()
})
