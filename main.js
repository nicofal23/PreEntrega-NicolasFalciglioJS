// variables de datos
let nombreGuardado = "";
let apellidoGuardado = "";
let dniGuardado = "";
let correoGuardado = "";

// seleccion marca
class Vehiculo {
  constructor(marca) {
    this.marca = marca;
  }
}

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

// Función para llenar el select de marcas
function llenarSelectMarca() {
  vehiculos.forEach(vehiculo => {
    const option = document.createElement("option");
    option.value = vehiculo.marca;
    option.textContent = vehiculo.marca;
    selectMarca.appendChild(option);
  });
}

// Llenar el select de marcas al cargar la página
llenarSelectMarca();

// Precios base para cada marca
const preciosBase = {
  Chevrolet: 15000,
  Ford: 16000,
  Peugeot: 17000,
};

// constante que almacena las opciones de año para cada marca y modelo
const opcionesAnio = {
  Chevrolet: {
    Agile: [2020, 2021, 2022],
    Aveo: [2019, 2020, 2021],
  },
  Ford: {
    EcoSport: [2020, 2021, 2022],
    Escape: [2019, 2020, 2021],
  },
  Peugeot: {
    "208": [2020, 2021, 2022],
    "2008": [2019, 2020, 2021],
  },
};

// Función para completar año y modelo dependiendo la marca
function llenarSelectAnio(marca, modelo) {
  const opciones = opcionesAnio[marca][modelo] || [];
  // Limpiar las opciones anteriores
  selectAnio.innerHTML = '<option value="">Año...</option>';

  // Llenar el select con las opciones de año
  opciones.forEach((anio) => {
    const option = document.createElement("option");
    option.value = anio;
    option.text = anio;
    selectAnio.appendChild(option);
  });
}

selectMarca.addEventListener("change", () => {
  // Habilitar el elemento selectModelo
  selectModelo.disabled = false;

  const marcaSeleccionada = selectMarca.value;

  // opciones de modelo según la marca seleccionada
  if (marcaSeleccionada === "Chevrolet") {
    selectModelo.innerHTML = `
      <option value="">Elegir</option>
      <option value="Agile">Agile</option>
      <option value="Aveo">Aveo</option>
    `;
  } else if (marcaSeleccionada === "Ford") {
    selectModelo.innerHTML = `
      <option value="">Elegir</option>
      <option value="EcoSport">EcoSport</option>
      <option value="Escape">Escape</option>
    `;
  } else if (marcaSeleccionada === "Peugeot") {
    selectModelo.innerHTML = `
      <option value="">Elegir</option>
      <option value="208">208</option>
      <option value="2008">2008</option>
    `;
  }

  // Llenar el select de año dependiendo la marca y modelo seleccionado
  llenarSelectAnio(marcaSeleccionada, selectModelo.value);
});

// Agregar un cambio al elemento selectModelo
selectModelo.addEventListener("change", () => {
  // Habilitar el elemento selectAnio
  selectAnio.disabled = false;

  const marcaSeleccionada = selectMarca.value;
  const modeloSeleccionado = selectModelo.value;

  // Llenar el select de año en función de la marca y el modelo seleccionados
  llenarSelectAnio(marcaSeleccionada, modeloSeleccionado);
});

// Función para mostrar la segunda pestaña al hacer clic en el botón "siguiente" en la primera pestaña
document.getElementById("botonSiguiente").addEventListener("click", () => {
  // Ocultar la primera pestaña
  document.getElementById("home-tab-pane").classList.remove("show", "active");
  // Quitar la clase "active" del botón de la primera pestaña
  document.getElementById("home-tab").classList.remove("active");
  
  // Mostrar la segunda pestaña
  document.getElementById("profile-tab-pane").classList.add("show", "active");
  // Agregar la clase "active" al botón de la segunda pestaña
  document.getElementById("profile-tab").classList.add("active");
});


// Función para mostrar la tercer pestaña al hacer clic en el botón "siguiente" en la segunda pestaña
document.getElementById("botonSiguiente2").addEventListener("click", (e) => {
  e.preventDefault();
  // Ocultar la segunda pestaña
  document.getElementById("profile-tab-pane").classList.remove("show", "active");
  // Quitar la clase "active" del botón de la segunda pestaña
  document.getElementById("profile-tab").classList.remove("active");

  // Mostrar la tercera pestaña
  document.getElementById("contact-tab-pane").classList.add("show", "active");
  // Agregar la clase "active" al botón de la tercera pestaña
  document.getElementById("contact-tab").classList.add("active");
  mostrarPerfil1();
});


function mostrarPerfil1() {
  // Obtener los valores ingresados por el usuario
  nombreGuardado = document.getElementById("nombre").value;
  apellidoGuardado = document.getElementById("apellido").value;
  dniGuardado = document.getElementById("dni").value;
  correoGuardado = document.getElementById("correo").value;

  // Verificar si se han completado los datos antes de avanzar
  if (nombreGuardado && apellidoGuardado && dniGuardado && correoGuardado) {
    // Habilitar y activar la pestaña "Costo"
    document.getElementById("contact-tab").removeAttribute("disabled");
    document.getElementById("contact-tab").classList.add("active");
    document.getElementById("contact-tab-pane").classList.add("show", "active");

    // Calcular la cotización
    calcularCotizacion();
  } else {
    // Mostrar un mensaje de error si no se completaron los datos
    alert("Por favor, complete todos los campos antes de continuar.");
  }
}

document.getElementById("botonContratar").addEventListener("click", () => {
  alert("¡Contratación exitosa!");
});

function calcularCotizacion() {
  let resultadoHTML = "<h2>Costo:</h2>";
  resultadoHTML += "<p>Nombre: " + nombreGuardado + "</p>";
  resultadoHTML += "<p>Apellido: " + apellidoGuardado + "</p>";
  resultadoHTML += "<p>DNI: " + dniGuardado + "</p>";
  resultadoHTML += "<p>Correo: " + correoGuardado + "</p>";

  // traer los valores seleccionados de los elementos <select>
  const marca = selectMarca.value;
  const modelo = selectModelo.value;
  const anio = selectAnio.value;

  resultadoHTML += "<p>Marca: " + marca + "</p>";
  resultadoHTML += "<p>Modelo: " + modelo + "</p>";
  resultadoHTML += "<p>Año: " + anio + "</p>";

  // precio base según la marca seleccionada
  let precioBase = preciosBase[marca] || 0;

  // Agregar precios adicionales 
  if (modelo === "Agile") {
    precioBase += 1000; 
  } else if (modelo === "Aveo") {
    precioBase += 1200; 
  }

  // Agregar precios adicionales según el año 
  if (anio === "2022") {
    precioBase += 800; 
  } else if (anio === "2021") {
    precioBase += 600; 
  }

  resultadoHTML += "<p>Precio Total: $" + precioBase + "</p>";

  let resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = resultadoHTML;
}
