const mostrarError = (mensaje) => alert(mensaje);

const calcularPago = (precioVehiculo, cantidadCuotas) => {
  let montoBase = precioVehiculo / 1500 * cantidadCuotas;

switch (opcion) {
    case 1:
        return montoBase + 3000;
    case 2:
        return montoBase + 2000;
    case 3:
        return montoBase + 1000;
    default:
        mostrarError("Opción no válida.");
        return;
    }
};

function ingresarMonto() {
    while (true) {
    // Pide al usuario que ingrese una opción
    let opcion = parseInt(prompt("Elegir opción: \n 1-contra todo riesgo \n 2-completo \n 3-contra terceros"));

    // Ingresar el nombre del vehículo y el precio
    let nombreVehiculo = prompt("Ingrese marca y modelo del vehículo:");
    let precioVehiculo = Number(prompt("Ingrese el precio aproximado del vehículo:"));

    // Comprueba que el precio sea un valor numérico
    if (isNaN(precioVehiculo)) {
        mostrarError("Por favor, ingrese un valor numérico válido para el precio.");
        continue;
    }

    // calcular la cuota
    let cantidadCuotas = parseInt(prompt("Ingrese la cantidad de meses de contrato:"));
    
    if (isNaN(cantidadCuotas)) {
        mostrarError("Por favor, ingrese un valor numérico válido para la cantidad de meses de contrato.");
        return;
    }

    // Cálculo de la cuota del seguro
    let pagoPorCuota = calcularPago(precioVehiculo, cantidadCuotas);

    alert("El pago por cuota para el vehículo " + nombreVehiculo + " es: " + pagoPorCuota);
    }
}

