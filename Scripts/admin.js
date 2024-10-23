document.addEventListener("DOMContentLoaded", () => {
    const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'))
    const productosContainer = document.getElementById("productos")
    const accesoriosContainer = document.getElementById("accesorios")

    fetch('/Scripts/admin.json')
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data.productos, productosContainer)
            mostrarProductos(data.accesorios, accesoriosContainer)
            localStorage.setItem('productos', JSON.stringify(data.productos))
            localStorage.setItem('accesorios', JSON.stringify(data.accesorios))
            borrarProductos()
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error))

    document.getElementById('guardarCambios').addEventListener('click', () => {
        const id = document.getElementById('productoId').value
        const nombre = document.getElementById('nombreProducto').value
        const descripcion = document.getElementById('descripcionProducto').value
        const precio = document.getElementById('precioProducto').value

        const productos = JSON.parse(localStorage.getItem('productos'))
        const card = document.querySelector(`.btn-editar[data-id="${id}"]`).closest('.card')
        card.querySelector('.data-producto').textContent = nombre
        card.querySelector('p').textContent = descripcion
        card.querySelector('.data-precio').textContent = `$${Number(precio).toLocaleString('es-AR')}`

        const index = productos.findIndex(producto => producto.id == id)
        productos[index] = { id, nombre, descripcion, precio }
        localStorage.setItem('productos', JSON.stringify(productos))

        modalEditar.hide()
    })

    function borrarProductos() {
        const deleteButtons = document.querySelectorAll('.btn-eliminar')
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "¡No podrás deshacer esta acción!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const card = event.target.closest('.card')
                        const id = event.target.getAttribute('data-id')

                        card.remove()

                        const productos = JSON.parse(localStorage.getItem('productos'))
                        const index = productos.findIndex(producto => producto.id == id)
                        productos.splice(index, 1)
                        localStorage.setItem('productos', JSON.stringify(productos))

                        Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success')
                    }
                })
            })
        })

        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', (event) => {
                const card = event.target.closest('.card')
                const nombre = card.querySelector('.data-producto').textContent
                const descripcion = card.querySelector('p').textContent
                const precio = card.querySelector('.data-precio').textContent.replace('$', '').replace('.', '').replace(',', '')
                const id = event.target.getAttribute('data-id')

                document.getElementById('nombreProducto').value = nombre
                document.getElementById('descripcionProducto').value = descripcion
                document.getElementById('precioProducto').value = precio
                document.getElementById('productoId').value = id

                modalEditar.show()
            })
        })
    }

    function mostrarProductos(productos, contenedor) {
        contenedor.innerHTML = ''
        productos.forEach(producto => {
            const cardProducto = `
            <div class="card">
                <div class="image-box">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="content">
                    <h2 class="data-producto">${producto.nombre}</h2>
                    <p>${producto.descripcion}</p>
                    <p class="data-precio">$${Number(producto.precio).toLocaleString('es-AR')}</p>
                    <button class="btn-editar" data-id="${producto.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
                </div>
            </div>
        `
            contenedor.innerHTML += cardProducto
        })
    }
})
