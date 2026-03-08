let respuesta = "";
let listaSocios = [];


function verSocios() {
    console.log("----- LISTA DE SOCIOS -----");

    if (listaSocios.length === 0) {
        console.log("No hay socios registrados");
        return;
    }

    for (let i = 0; i < listaSocios.length; i++) {
        console.log("__________________________"
            (i + 1) + " - " + listaSocios[i].nombre +
            " | Pago: " + (listaSocios[i].pago ? "SI" : "NO")
        );
    }
}


function agregarSocio(nombre) {
    let socio = {
        nombre: nombre,
        pago: false
    };

    listaSocios.push(socio);
    alert("Socio agregado correctamente");
}


function borrarSocio(nombre) {

    for (let i = 0; i < listaSocios.length; i++) {

        if (listaSocios[i].nombre === nombre) {

            listaSocios.splice(i, 1);

            alert("Socio eliminado");
            return;
        }
    }

    alert("Socio no encontrado");
}


function registrarPago(nombre) {

    for (let i = 0; i < listaSocios.length; i++) {

        if (listaSocios[i].nombre === nombre) {

            listaSocios[i].pago = true;

            alert("Pago registrado correctamente");
            return;
        }
    }

    alert("Socio no encontrado");
}

console.log("ADMINISTRADOR DE SOCIOS");
console.log("-----------------------");

while (true) {

    respuesta = prompt(
        "ADMINISTRADOR DE SOCIOS\n\n" +
        "1 - Agregar socio\n" +
        "2 - Mostrar socios\n" +
        "3 - Registrar pago\n" +
        "4 - Borrar socio\n" +
        "x - Salir"
    );

    if (respuesta === "1") {

        let nombre = prompt("Ingrese el nombre del nuevo socio");
        agregarSocio(nombre);

    } else if (respuesta === "2") {

        verSocios();

    } else if (respuesta === "3") {

        let nombre = prompt("Ingrese el nombre del socio que pagó");
        registrarPago(nombre);

    } else if (respuesta === "4") {

        let nombre = prompt("Ingrese el nombre del socio a borrar");
        borrarSocio(nombre);

    } else if (respuesta === "x") {

        alert("Saliendo del sistema");
        break;
    }
}