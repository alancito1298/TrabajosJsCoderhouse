function verSocios() {
    const socios = JSON.parse(localStorage.getItem("socios")) || [];
    const lista = document.getElementById("lista");
  
    if (socios.length === 0) {
      lista.innerHTML = "No hay datos guardados";
      return;
    }
  
    lista.innerHTML = "";
  
    socios.forEach((socio) => {
      lista.innerHTML += `
        <th> ${socio.nombre}</th><th>  ${socio.dni}</th>
        <th><button class="btn btn-danger" onclick="borrarSocio('${socio.dni}')">borrar socio</button></th>
      `;
    });
  }
  
  
  function agregarSocio(event) {
    event.preventDefault();
  
    const socioNombre = document.getElementById("socioNombre").value;
    const socioDni = document.getElementById("socioDni").value;
  
    let nuevoSocio = {
      nombre: socioNombre,
      dni: socioDni,
      pago: false
    };
  
    let socios = JSON.parse(localStorage.getItem("socios")) || [];
  
    socios.push(nuevoSocio);
  
    localStorage.setItem("socios", JSON.stringify(socios));
  
    alert("Socio agregado: " + nuevoSocio.nombre);
    verSocios(); 
  }


  function borrarSocio(dni){
    let socios = JSON.parse(localStorage.getItem("socios")) || [];

socios= socios.filter(socio => socio.dni !== dni);

localStorage.setItem("socios", JSON.stringify(socios));
alert("Socio eliminado correctamente");
verSocios(); 
  }