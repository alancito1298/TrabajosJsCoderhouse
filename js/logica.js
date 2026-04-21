import { tablaPagos, btnPago, cambiarAnio } from "./pagos.js";

document.addEventListener("DOMContentLoaded", async () => {

  await cargarDatosIniciales();

 
  // FORMULARIO

  const form = document.getElementById("formSocio");

  if (form) {
    form.addEventListener("submit", agregarSocio);
  }

 
  // TABLA SOCIOS

  const tablaSocios = document.getElementById("tablaSocios");

  if (tablaSocios) {
    verSocios();

    tablaSocios.addEventListener("click", (e) => {
      const dni = e.target.dataset.dni;

      if (!dni) return;

      if (e.target.classList.contains("btnEliminar")) {
        borrarSocio(dni);
      }
    });
  }


  // PAGOS

  const tablaPagosEl = document.getElementById("tablaPagos");

  if (tablaPagosEl) {
    tablaPagos();

    tablaPagosEl.addEventListener("click", (e) => {
      const dni = e.target.dataset.dni;
      const mes = e.target.dataset.mes;
      const anio = e.target.dataset.anio;

      if (!dni || !mes || !anio) return;

      btnPago(dni, mes, anio);
      tablaPagos();
    });

    document.getElementById("prevYear").addEventListener("click", () => {
      cambiarAnio(-1);
    });

    document.getElementById("nextYear").addEventListener("click", () => {
      cambiarAnio(1);
    });
  }

});



// VER SOCIOS

function verSocios() {
  const socios = JSON.parse(localStorage.getItem("socios")) || [];
  const tabla = document.getElementById("tablaSocios");

  if (!tabla) return;

  if (socios.length === 0) {
    tabla.innerHTML = "<tr><td colspan='4'>No hay datos</td></tr>";
    return;
  }

  tabla.innerHTML = "";

  socios.forEach((socio) => {
    tabla.innerHTML += `
      <tr>
        <td>${socio.nombre}</td>
        <td>${socio.dni}</td>
        <td>${socio.id}</td>
        <td>${socio.celular}</td>
        <td>
          <button class="btn btn-danger btnEliminar" data-dni="${socio.dni}">
            ❌
          </button>
        </td>
      </tr>
    `;
  });
}



//  AGREGAR SOCIO

function agregarSocio(event) {
  event.preventDefault();

  const socioNombre = document.getElementById("socioNombre").value;
  const socioDni = document.getElementById("socioDni").value;
  const socioNumero = document.getElementById("socioNumero").value;
  const celular = document.getElementById("celular").value;

  let socios = JSON.parse(localStorage.getItem("socios")) || [];

  if (socios.some(s => s.dni === socioDni)) {
    Swal.fire("Error", "El DNI ya existe", "error");
    return;
  }

  let nuevoSocio = {
    nombre: socioNombre,
    dni: socioDni,
    id: socioNumero,
    activo: true,
    pagos: crearPagosDesde(2026, 5),
    celular: celular
  };

  socios.push(nuevoSocio);

  localStorage.setItem("socios", JSON.stringify(socios));

  Swal.fire("Listo", "Socio agregado", "success");

  event.target.reset();
}



//  BORRAR SOCIO

function borrarSocio(dni) {
  let socios = JSON.parse(localStorage.getItem("socios")) || [];

  socios = socios.filter(s => s.dni !== dni);

  localStorage.setItem("socios", JSON.stringify(socios));

  Swal.fire("Eliminado", "Socio eliminado", "warning");

  verSocios();
}



//  CARGA JSON INICIAL

async function cargarDatosIniciales() {

  if (localStorage.getItem("socios")) return;

  try {
    const res = await fetch("./data/socios.json");
    const data = await res.json();

    localStorage.setItem("socios", JSON.stringify(data));

    console.log("Datos iniciales cargados");
  } catch (error) {
    console.error("Error cargando JSON:", error);
  }
}




function crearMeses() {
  return {
    enero: false,
    febrero: false,
    marzo: false,
    abril: false,
    mayo: false,
    junio: false,
    julio: false,
    agosto: false,
    septiembre: false,
    octubre: false,
    noviembre: false,
    diciembre: false
  };
}

function crearPagosDesde(anioInicio = 2026, cantidad = 5) {
  let pagos = {};

  for (let i = 0; i < cantidad; i++) {
    const anio = anioInicio + i;
    pagos[anio] = crearMeses();
  }

  return pagos;
}