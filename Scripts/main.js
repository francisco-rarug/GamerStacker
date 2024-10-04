const datos = document.getElementById("datos");
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuario = "";
usuarios.forEach(element => {
    usuario += element.nombre + " " + element.apellido
});
datos.innerText = usuario;