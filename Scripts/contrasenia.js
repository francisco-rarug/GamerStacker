document.addEventListener("DOMContentLoaded", () => {
    const nombreElemento = document.getElementById("Usuario");
    const passwordElemento = document.getElementById("password");

    const loginBtn = document.getElementById("login");
    loginBtn.addEventListener("click", async () => {
        /*try {
            const datos = {
                nombre: nombreElemento.value,
                contrasenia: apellidoElemento.value,
            };

            const pedido = await fetch("http://localhost:3000/contrasenia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });

            const respuesta = await pedido.json();
            console.log(respuesta); // Para verificar la respuesta
        } catch (error) {
            console.error("Error en la solicitud de contraseña:", error);
        }*/

        try {
            const response = await fetch("http://localhost:3000/contrasenia");
            const usuarios = await response.json();


            usuarios.forEach(usuario => {

                if (usuario.nombre === nombreElemento.value && usuario.contrasenia === passwordElemento.value) {
                    window.location.href = "/Secciones/panelAdmin.html";
                } else {
                    console.log("hola")
                }
            });



        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    });
});
