document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal");
    const botonesAñadirCarrito = document.querySelectorAll(".add-cart-btn");
    const botonFinalizarCompra = document.getElementById("finalizar-compra");
    const botonSeguirComprando = document.getElementById("seguir-comprando");
    const close = document.querySelector(".close");

    botonesAñadirCarrito.forEach(boton => {
        boton.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    });

    close.addEventListener("click", () => {
        modal.style.display = "none";
    });

    botonFinalizarCompra.addEventListener("click", () => {
        window.location.href = "carrito.html";
    });

    botonSeguirComprando.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
