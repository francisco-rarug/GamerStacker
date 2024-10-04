import Usuario from "./usuario.js";

const nombreElemento = document.getElementById("nombre");
const apellidoElemento = document.getElementById("apellido");

const loginBtn = document.getElementById("login");
if (loginBtn) loginBtn.onclick = login;


let nombre = "";
let apellido = ""

function obtenerValoresActuales() {
    nombre = nombreElemento.value;
    apellido = apellidoElemento.value;
}
function login() {

    obtenerValoresActuales();
    const usuario = new Usuario(nombre, apellido);

    localStorage.clear();
    let usuarios = [];


    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    window.location.href = "ingresar.html";
}