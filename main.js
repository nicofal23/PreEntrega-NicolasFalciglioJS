// variables de datos
let nombreGuardado = "";
let apellidoGuardado = "";
let dniGuardado = "";
let correoGuardado = "";
const selectMarca = document.getElementById("marca");
const selectModelo = document.getElementById("modelo");
const selectAnio = document.getElementById("anio");

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
  new Vehiculo("Citroen"),
  new Vehiculo("Renault"),
  new Vehiculo("Volkswagen"), 
  new Vehiculo("Toyota"),
  new Vehiculo("Honda"),
  new Vehiculo("Hyundai"),
  new Vehiculo("Kia"),
  new Vehiculo("MercedesBenz"),
  new Vehiculo("BMW"),
  new Vehiculo("Audi"),
];


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

//evento para seleccionar modelo, los tipos de modelos estan en modelos.js
selectMarca.addEventListener("change", () => {
  // Habilitar el elemento selectModelo
  selectModelo.disabled = false;

  const marcaSeleccionada = selectMarca.value;
  const modelos = opcionesModelo[marcaSeleccionada];

  // Crear las opciones de modelo según la marca seleccionada
  const opcionesHTML = modelos.map(modelo => `<option value="${modelo}">${modelo || "Elegir"}</option>`).join('');
  selectModelo.innerHTML = opcionesHTML;

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



document.getElementById("botonContratar").addEventListener("click", () => {
  alert("¡Contratación exitosa!");
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
    // Evitar cambiar de pestaña si los campos no están completos
    return;
  }
}


function calcularCotizacion() {
  // traer los valores seleccionados de los elementos <select>
  const marca = selectMarca.value;
  const modelo = selectModelo.value;
  const anio = selectAnio.value;
  // precio base según la marca seleccionada
  let precioBase = preciosBase[marca] || 0;

  // Agregar precios adicionales 
  if (modelo === "Agile") {
    precioBase += 1000; 
  } else if (modelo === "Aveo") {
    precioBase += 1200; 
  }

 //costo segun año
const añoActual = 2023;
const factorDeDescuento = 0.05; // 5%

// Verificar si el año está entre 1954 y 2023
if (anio >= "1954" && anio <= "2023") {
    const añosDiferencia = añoActual - anio;
    const descuento = añosDiferencia * factorDeDescuento;
    const precioConDescuento = precioBase - precioBase * descuento;

    
    //establecer un precio mínimo de $14,000 si el resultado da negativo 
    precioBase = Math.max(Math.ceil(precioConDescuento), 14000);
}


 // Crear el resultado HTML con clases de estilo
 let resultadoHTML = `
 <div class="resultado-container">
   <h2>Costo:</h2>
   <p>Nombre:<span class="var"> ${nombreGuardado}</span></p>
   <p>Apellido: <span class="var"> ${apellidoGuardado}</span></p>
   <p>DNI: <span class="var"> ${dniGuardado}</span></p>
   <p>Correo: <span class="var"> ${correoGuardado}</span></p>
   <p>Marca: <span class="var"> ${marca}</span></p>
   <p>Modelo: <span class="var"> ${modelo}</span></p>
   <p>Año: <span class="var"> ${anio}</span></p>
   <p class= "costo">Precio Total: <span class="var"> $${precioBase}</span></p>
 </div>
`;

  let resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = resultadoHTML;
}


console.log (new Date)


