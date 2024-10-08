document.querySelectorAll('.btn-agregar-carrito').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const nombreProducto = document.querySelectorAll('.data-producto')[index].innerText
        const precioProducto = document.querySelectorAll('.data-precio')[index].innerText
        const imgProducto = document.querySelectorAll('.image-box img')[index].src  
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
        listaProductos.innerHTML = '<li>El carrito está vacío</li>'
    } else {
        productosCarrito.forEach(producto => {
            const li = document.createElement('li')
            li.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" width="50" height="50"> 
                <strong>${producto.nombre}</strong> - ${producto.precio}`
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

// Parte para formulario modal de ticket

function cargarProductosFinalizar() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaProductosFinalizar = document.getElementById('lista-productos-finalizar');

    listaProductosFinalizar.innerHTML = '';

    if (productosCarrito.length === 0) {
        listaProductosFinalizar.innerHTML = '<li>No hay productos en el carrito.</li>';
    } else {
        productosCarrito.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${producto.nombre}</strong> - ${producto.precio}`;
            listaProductosFinalizar.appendChild(li);
        });
    }
}

const finalizarBtn = document.getElementById("finalizar");
finalizarBtn.addEventListener("click", () => {
    cargarProductosFinalizar();
    const modalFinalizar = document.getElementById("modal-finalizar");
    const modalContent = modalFinalizar.querySelector('.modal-content');

    modalFinalizar.style.display = "block";
    document.body.classList.add("no-scroll"); 

    setTimeout(() => {
        modalContent.classList.add("show");
    }, 10);
});

const closeModal = document.getElementById("close-finalizar");
closeModal.addEventListener("click", () => {
    const modalFinalizar = document.getElementById("modal-finalizar");
    const modalContent = modalFinalizar.querySelector('.modal-content');

    modalContent.classList.remove("show");
    setTimeout(() => {
        modalFinalizar.style.display = "none";
        document.body.classList.remove("no-scroll"); 
    }, 300);
    borrar()
});

window.addEventListener("click", (event) => {
    const modalFinalizar = document.getElementById("modal-finalizar");
    if (event.target === modalFinalizar) {
        const modalContent = modalFinalizar.querySelector('.modal-content');
        modalContent.classList.remove("show");
        setTimeout(() => {
            modalFinalizar.style.display = "none";
            document.body.classList.remove("no-scroll"); 
        }, 300);
        
    }
});

function borrar(){
    localStorage.removeItem('carrito');
    cargarCarrito();
}

const borrarBtn = document.getElementById("borrar");
borrarBtn.addEventListener("click", () => {
    borrar()
});

