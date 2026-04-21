let anioActual = 2026;

const meses = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];


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


export function tablaPagos(filtro = "") {
  const socios = JSON.parse(localStorage.getItem("socios")) || [];
  const tabla = document.getElementById("tablaPagos");
  const titulo = document.getElementById("tituloAnio");

  const meses = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre"
  ];

  if (!tabla || !titulo) return;

  titulo.textContent = `Año ${anioActual}`;
  tabla.innerHTML = "";


  const filtrados = socios.filter(socio =>
    socio.nombre.toLowerCase().includes(filtro) ||
    socio.id.toString().includes(filtro)
  );

  if (filtrados.length === 0) {
    tabla.innerHTML = `<tr><td colspan="14">No hay resultados</td></tr>`;
    return;
  }

  filtrados.forEach((socio) => {

    if (!socio.pagos[anioActual]) {
      socio.pagos[anioActual] = crearMeses();
    }

    let fila = `
      <tr> <td>${socio.id}</td>
        <td>${socio.nombre}</td>
       
    `;

    meses.forEach((mes) => {
      const estado = socio.pagos[anioActual][mes] ? "bg-success" : "bg-danger";

      fila += `
        <td 
          class="${estado} text-white"
          data-dni="${socio.dni}"
          data-mes="${mes}"
          data-anio="${anioActual}"
          style="cursor:pointer"
        >
          ${socio.pagos[anioActual][mes] ? "✔" : "✖"}
        </td>
      `;
    });

    fila += `</tr>`;
    tabla.innerHTML += fila;
  });

  localStorage.setItem("socios", JSON.stringify(socios));
}


export function cambiarAnio(delta) {
  anioActual += delta;

  if (anioActual < 2026) anioActual = 2026; // 🔒 límite opcional

  tablaPagos();
}


export function btnPago(dni, mes, anio) {
  let socios = JSON.parse(localStorage.getItem("socios")) || [];

  socios = socios.map((socio) => {
    if (socio.dni === dni) {

      if (!socio.pagos[anio]) {
        socio.pagos[anio] = crearMeses();
      }

      socio.pagos[anio][mes] = !socio.pagos[anio][mes];
    }
    return socio;
  });

  localStorage.setItem("socios", JSON.stringify(socios));
}

const buscadorPagos = document.getElementById("buscadorPagos");

if (buscadorPagos) {
  buscadorPagos.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    tablaPagos(texto);
  });
}