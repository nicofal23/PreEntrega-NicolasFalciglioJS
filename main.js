// variables de datos
let nombreGuardado = "";
let apellidoGuardado = "";
let dniGuardado = "";
let correoGuardado = "";
let costoTotal = 0;

// marca de vehículos
const vehiculos = [
  new Vehiculo("Chevrolet"),
  new Vehiculo("Ford"),
  new Vehiculo("Peugeot"),
  new Vehiculo("Citroën"),
  new Vehiculo("Renault"),
  new Vehiculo("Volkswagen"),
  new Vehiculo("Toyota"),
  new Vehiculo("Honda"),
  new Vehiculo("Hyundai"),
  new Vehiculo("Kia"),
  new Vehiculo("Mercedes-Benz"),
  new Vehiculo("BMW"),
  new Vehiculo("Audi"),
];

const selectMarca = document.getElementById("marca");
const selectModelo = document.getElementById("modelo");
const selectAnio = document.getElementById("anio");

// Recorrer el arreglo de vehículos y agregar opciones al selectMarca
vehiculos.forEach((vehiculo) => {
  const option = document.createElement("option");
  option.value = vehiculo.marca;
  option.text = vehiculo.marca;
  selectMarca.appendChild(option);
});

// Objeto que almacena las opciones de año para cada marca y modelo
const opcionesAnio = {
  Chevrolet: {
    Agile: [2020, 2021, 2022],
    Aveo: [2019, 2020, 2021],
    // Agregar opciones de año para otros modelos de Chevrolet
  },
  Ford: {
    EcoSport: [2020, 2021, 2022],
    Escape: [2019, 2020, 2021],
    // Agregar opciones de año para otros modelos de Ford
  },
  Peugeot: {
    "208": [2020, 2021, 2022],
    "2008": [2019, 2020, 2021],
    // Agregar opciones de año para otros modelos de Peugeot
  },
  // Agregar opciones de año para otras marcas y modelos
};

// Función para llenar el select de año en función de la marca y el modelo seleccionados
function llenarSelectAnio(marca, modelo) {
  const opciones = opcionesAnio[marca] ? opcionesAnio[marca][modelo] : [];

  // Obtener el elemento selectAnio
  const selectAnio = document.getElementById("anio");

  // Limpiar las opciones anteriores
  selectAnio.innerHTML = '<option value="anio">Año...</option>';

  // Llenar el select con las opciones de año
  opciones.forEach((anio) => {
    const option = document.createElement("option");
    option.value = anio;
    option.text = anio;
    selectAnio.appendChild(option);
  });
}

// Agregar un evento de cambio al elemento selectMarca
selectMarca.addEventListener("change", () => {
  // Habilitar el elemento selectModelo
  selectModelo.disabled = false;

  const marcaSeleccionada = selectMarca.value;

  // Lógica para agregar opciones de modelo según la marca seleccionada
  if (marcaSeleccionada === "Chevrolet") {
    selectModelo.innerHTML = `
    <option value="Elegir">Elegir</option>
      <option value="Agile">Agile</option>
      <option value="Aveo">Aveo</option>
    `;
  } else if (marcaSeleccionada === "Ford") {
    selectModelo.innerHTML = `
      <option value="EcoSport">EcoSport</option>
      <option value="Escape">Escape</option>
      `;
  } else if (marcaSeleccionada === "Peugeot") {
    selectModelo.innerHTML = `
      <option value="208">208</option>
      <option value="2008">2008</option>
    `;
  }
  

  // Llenar el select de año dependiendo la marca y modelo seleccionado
  llenarSelectAnio(marcaSeleccionada, selectModelo.value);
});

// Agregar un evento de cambio al elemento selectModelo
selectModelo.addEventListener("change", () => {
  // Habilitar el elemento selectAnio
  selectAnio.disabled = false;

  const marcaSeleccionada = selectMarca.value;
  const modeloSeleccionado = selectModelo.value;

  // Llenar el select de año en función de la marca y el modelo seleccionados
  llenarSelectAnio(marcaSeleccionada, modeloSeleccionado);
});

// Función para mostrar la segunda pestaña al hacer clic en el botón "siguiente" en la primera pestaña
function mostrarPerfil() {
  // Ocultar la primera pestaña
  document.getElementById("home-tab-pane").classList.remove("show", "active");
  // Mostrar la segunda pestaña
  document.getElementById("profile-tab-pane").classList.add("show", "active");
}

function mostrarPerfil1() {
  // Obtener los valores ingresados por el usuario
  nombreGuardado = document.getElementById("nombre").value;
  apellidoGuardado = document.getElementById("apellido").value;
  dniGuardado = document.getElementById("dni").value;
  correoGuardado = document.getElementById("correo").value;

  // Verificar si se han completado los datos antes de avanzar
  if (nombreGuardado && apellidoGuardado && dniGuardado && correoGuardado) {
      // Avanzar a la pestaña "Costo"
      document.getElementById("contact-tab").removeAttribute("disabled");
      document.getElementById("myTab").querySelector('[data-bs-target="#contact-tab-pane"]').click();
  } else {
      // Mostrar un mensaje de error si no se completaron los datos
      alert("Por favor, complete todos los campos antes de continuar.");
  }
}


function calcularCotizacion() {
    let resultadoHTML = "<h2>Costo:</h2>";
    resultadoHTML += "<p>Nombre: " + nombreGuardado + "</p>";
    resultadoHTML += "<p>Apellido: " + apellidoGuardado + "</p>";
    resultadoHTML += "<p>DNI: " + dniGuardado + "</p>";
    resultadoHTML += "<p>Correo: " + correoGuardado + "</p>";
    resultadoHTML += "<p>Marca: " + marca + "</p>";
    resultadoHTML += "<p>Modelo: " + modelo + "</p>";
    resultadoHTML += "<p>Año: " + anio + "</p>";

    let resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = resultadoHTML;
}