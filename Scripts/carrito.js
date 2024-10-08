document.querySelectorAll('.btn-agregar-carrito').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const nombreProducto = document.querySelectorAll('.data-producto')[index].innerText;
        const precioProducto = document.querySelectorAll('.data-precio')[index].innerText;
        const imgProducto = document.querySelectorAll('.image-box img')[index].src;  
        const precio = parseFloat(precioProducto.replace('$', ''));
        
        let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const productoExistente = productosCarrito.find(producto => producto.nombre === nombreProducto);
        if (productoExistente) {
            productoExistente.cantidad += 1;
            productoExistente.precio += precio;
        } else {
            productosCarrito.push({ nombre: nombreProducto, precio, img: imgProducto, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(productosCarrito));

        const modal = document.getElementById("modal");
        modal.style.display = "flex";

        modalInteracciones();
    });
});

function cargarCarrito() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaProductos = document.getElementById('productos-lista');
    listaProductos.innerHTML = '';

    let total = 0;

    if (productosCarrito.length === 0) {
        listaProductos.innerHTML = '<li>El carrito está vacío</li>';
    } else {
        productosCarrito.forEach(producto => {
            const li = document.createElement('li');
            total += producto.precio; 

            li.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" width="50" height="50"> 
                <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(3)} (x${producto.cantidad})`;
            listaProductos.appendChild(li);
        });

        const lineaHorizontal = document.createElement('hr');
        const totalElement = document.createElement('p');
        totalElement.innerHTML = `<strong>Total: $${total.toFixed(3)}</strong>`;

        listaProductos.appendChild(lineaHorizontal);
        listaProductos.appendChild(totalElement);
    }
}

cargarCarrito();

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

// Parte para formulario modal de ticket
function cargarProductosFinalizar() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaProductosFinalizar = document.getElementById('lista-productos-finalizar');
    listaProductosFinalizar.innerHTML = '';

    let total = 0;

    productosCarrito.forEach(producto => {
        const li = document.createElement('li');
        total += producto.precio; 
        li.innerHTML = `<strong>${producto.nombre}</strong> - $${producto.precio.toFixed(3)} (x${producto.cantidad})`;
        listaProductosFinalizar.appendChild(li);
    });

    const lineaHorizontal = document.createElement('hr');
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(3)}</strong>`;

    listaProductosFinalizar.appendChild(lineaHorizontal);
    listaProductosFinalizar.appendChild(totalElement);
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

function borrar(){
    localStorage.removeItem('carrito')
    cargarCarrito()
}

function borrarUltimoProducto() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

    if (productosCarrito.length > 0) {
        productosCarrito.pop()
        localStorage.setItem('carrito', JSON.stringify(productosCarrito))
    }

    cargarCarrito()
}

const borrarBtn = document.getElementById("borrar");
borrarBtn.addEventListener("click", () => {
    borrarUltimoProducto()
})
