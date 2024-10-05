document.querySelectorAll('.btn-agregar-carrito').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const nombreProducto = document.querySelectorAll('.data-producto')[index].innerText;
        const precioProducto = document.querySelectorAll('.data-precio')[index].innerText;
        const imgProducto = document.querySelectorAll('.image-box img')[index].src
        const boton = document.querySelectorAll('.btn-agregar-carrito')[index]
        
        const producto = { nombre: nombreProducto, precio: precioProducto, img: imgProducto}
        
        let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
        
        productosCarrito.push(producto)

        localStorage.setItem('carrito', JSON.stringify(productosCarrito))

        const modal = document.getElementById("modal")
        modal.style.display = "flex"
        

        modalInteracciones()
    })
})

function cargarCarrito() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

    const listaProductos = document.getElementById('productos-lista')

    listaProductos.innerHTML = ''

    if (productosCarrito.length === 0) {
        listaProductos.innerHTML = '<li>El carrito está vacio</li>'
    } else {
        productosCarrito.forEach(producto => {
            const li = document.createElement('li')
            li.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" width="50" height="50"> 
                - <strong>${producto.nombre}</strong> - ${producto.precio}`
            listaProductos.appendChild(li)
        })

    }
}

cargarCarrito()


function modalInteracciones() {
    const modal = document.getElementById("modal")
    const botonFinalizarCompra = document.getElementById("finalizar-compra")
    const botonSeguirComprando = document.getElementById("seguir-comprando")
    const close = document.querySelector(".close")

    close.addEventListener("click", () => {
        modal.style.display = "none"
    })

    botonFinalizarCompra.addEventListener("click", () => {
        window.location.href = "/Secciones/carrito.html"
    })

    botonSeguirComprando.addEventListener("click", () => {
        modal.style.display = "none"
    })

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    })
}
const borrarBtn = document.getElementById("borrar")
if (borrarBtn) {
    borrarBtn.onclick = borrar
    boton.style.display = "flex"
}
function borrar() {
    localStorage.removeItem('carrito')
    cargarCarrito()
}

