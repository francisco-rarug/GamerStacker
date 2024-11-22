import Usuario from "./usuario.js";

const nombreElemento = document.getElementById("nombre");
const apellidoElemento = document.getElementById("apellido");
const loginBtn = document.getElementById("login");

if (loginBtn) {
    loginBtn.onclick = () => middleware(login);
} else {
    actualizarTexto();
}

let nombre = "";
let apellido = "";

function middleware(next) {
    obtenerValoresActuales();

    if (!nombre.trim() || !apellido.trim()) {
        alert("Por favor, complete todos los campos antes de continuar.");
        return;
    }

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetras.test(nombre) || !soloLetras.test(apellido)) {
        alert("Los campos solo deben contener letras y espacios.");
        return;
    }

    next();
}

function obtenerValoresActuales() {
    nombre = nombreElemento.value;
    apellido = apellidoElemento.value;
}

function login() {
    const usuario = new Usuario(nombre, apellido);

    localStorage.clear();
    let usuarios = [];
    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    window.location.href = "../Secciones/principal.html";
}

function actualizarTexto() {
    const datos = document.getElementById("datos");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuario = "";
    usuarios.forEach(element => {
        usuario += element.nombre + " " + element.apellido;
    });
    datos.innerText = usuario;
}
