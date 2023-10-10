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
  Swal.fire({
    title: 'Contratación exitosa!',
    icon: 'success',
    confirmButtonText: 'Cerrar'
  });
});

//mostrar fecha 
const fechaHoy = new Date();
const dia = fechaHoy.getDate();
const mes = fechaHoy.getMonth() + 1;
const anio = fechaHoy.getFullYear();
const fechaActual = `${dia}/${mes}/${anio}`;
localStorage.setItem('fecha', fechaActual);
const fechaAlmacenada = localStorage.getItem('fecha');
const elementoFecha = document.getElementById('fecha');

elementoFecha.textContent = fechaAlmacenada;



// Función para controlar el estado de las pestañas y el cambio entre ellas
function controlarPestanas() {
  const selectMarca = document.getElementById("marca");
  const selectModelo = document.getElementById("modelo");
  const selectAnio = document.getElementById("anio");
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const dniInput = document.getElementById("dni");
  const correoInput = document.getElementById("correo");

  // Obtener los botones de las pestañas
  const botonSiguiente = document.getElementById("botonSiguiente");
  const botonSiguiente2 = document.getElementById("botonSiguiente2");

  // Bloquear todas las pestañas excepto la primera (home-tab)
  const pestanas = document.querySelectorAll('.nav-link');
  pestanas.forEach(pestaña => {
    if (pestaña.id !== "home-tab") {
      pestaña.setAttribute('disabled', true);
    }
  });

  // Agregar evento al botón "Siguiente" de la primera pestaña
  botonSiguiente.addEventListener("click", () => {
    // Verificar si los campos de selección están completos
    if (selectMarca.value && selectModelo.value && selectAnio.value) {
      // Desbloquear la segunda pestaña y bloquear las demás
      pestanas.forEach(pestaña => {
        if (pestaña.id === "profile-tab") {
          pestaña.removeAttribute('disabled');
        } else {
          pestaña.setAttribute('disabled', true);
        }
      });

      // Mostrar la segunda pestaña
      document.getElementById("home-tab-pane").classList.remove("show", "active");
      document.getElementById("home-tab").classList.remove("active");
      document.getElementById("profile-tab-pane").classList.add("show", "active");
      document.getElementById("profile-tab").classList.add("active");
      calcularCotizacion();
    } else {
      // Mostrar mensaje de error si los campos no están completos
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos antes de continuar.',
      });
    }
  });

  // Agregar evento al botón "Siguiente2" de la segunda pestaña
  botonSiguiente2.addEventListener("click", (e) => {
    e.preventDefault();
    // Verificar si los campos de texto están completos
    if (nombreInput.value && apellidoInput.value && dniInput.value && correoInput.value) {
      // Desbloquear la tercera pestaña y bloquear las demás
      pestanas.forEach(pestaña => {
        if (pestaña.id === "contact-tab") {
          pestaña.removeAttribute('disabled');
        } else {
          pestaña.setAttribute('disabled', true);
        }
      });

      // Mostrar la tercera pestaña
      document.getElementById("profile-tab-pane").classList.remove("show", "active");
      document.getElementById("profile-tab").classList.remove("active");
      document.getElementById("contact-tab-pane").classList.add("show", "active");
      document.getElementById("contact-tab").classList.add("active");
      calcularCotizacion();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos antes de continuar.',
      });
    }
  });
}

// Llamar a la función para controlar las pestañas cuando se carga la página
document.addEventListener("DOMContentLoaded", controlarPestanas);



// ... (código anterior)

function calcularCotizacion() {
  return new Promise((resolve, reject) => {
    // Traer los valores seleccionados de los elementos <select>
    const marca = selectMarca.value;
    const modelo = selectModelo.value;
    const anio = selectAnio.value;

    // Precio base según la marca seleccionada
    let precioBase = preciosBase[marca] || 0;

    // Agregar precios adicionales 
    if (modelo === "Agile") {
      precioBase += 1000; 
    } else if (modelo === "Aveo") {
      precioBase += 1200; 
    }

    // Costo según el año
    const añoActual = 2023;
    const factorDeDescuento = 0.05; // 5%

    // Verificar si el año está entre 1954 y 2023
    if (anio >= "1954" && anio <= "2023") {
      const añosDiferencia = añoActual - anio;
      const descuento = añosDiferencia * factorDeDescuento;
      const precioConDescuento = precioBase - precioBase * descuento;

      // Establecer un precio mínimo de $14,000 si el resultado da negativo 
      precioBase = Math.max(Math.ceil(precioConDescuento), 14000);
    }

    // Crear un objeto con el precio base y el precio total
    const resultado = {
      precioBase: precioBase,
      precioTotal: precioBase
    };

    // Resolver la promesa con el objeto resultado
    resolve(resultado);
  });
}

function mostrarResultadoEnDOM(resultado) {
  // Crear el resultado HTML con clases de estilo
  let resultadoHTML = `
    <div class="resultado-container">
      <h2>Costo:</h2>
      <p>Nombre:<span class="var"> ${nombreGuardado}</span></p>
      <p>Apellido: <span class="var"> ${apellidoGuardado}</span></p>
      <p>DNI: <span class="var"> ${dniGuardado}</span></p>
      <p>Correo: <span class="var"> ${correoGuardado}</span></p>
      <p>Marca: <span class="var"> ${selectMarca.value}</span></p>
      <p>Modelo: <span class="var"> ${selectModelo.value}</span></p>
      <p>Año: <span class="var"> ${selectAnio.value}</span></p>
      <p class= "costo">Precio Total: <span class="var"> $${resultado.precioTotal}</span></p>
    </div>
  `;

  let resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = resultadoHTML;
}

document.getElementById("botonSiguiente2").addEventListener("click", () => {
  nombreGuardado = document.getElementById("nombre").value;
  apellidoGuardado = document.getElementById("apellido").value;
  dniGuardado = document.getElementById("dni").value;
  correoGuardado = document.getElementById("correo").value;
  calcularCotizacion()
    .then(resultado => {
      mostrarResultadoEnDOM(resultado);
    })
    .catch(error => {
      console.error("Error al calcular la cotización:", error);
    });
});





