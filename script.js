const mostrarError = (mensaje) => alert(mensaje);
   
const calcularPago = (precioVehiculo, cantidadCuotas, opcion) => {
let montoBase = precioVehiculo / 1500 * cantidadCuotas;


switch (opcion) {
case 1:
    return montoBase + 3000;
    break;
case 2:
    return montoBase + 2000;
    break;
case 3:
    return montoBase + 1000;
    break;
default:
    mostrarError("Opción no válida.");
    return;
}
};
const continuarCalculando = true;
function ingresarMonto() {
while (continuarCalculando) {
// Pide al usuario que ingrese una opción
let opcion = parseInt(prompt("Elegir opción: \n 1-contra todo riesgo \n 2-completo \n 3-contra terceros"));
console.log (opcion)

// Ingresar el nombre del vehículo y el precio
let nombreVehiculo = prompt("Ingrese marca y modelo del vehículo:");
console.log (nombreVehiculo)

let precioVehiculo = parseFloat(prompt("Ingrese el precio aproximado del vehículo:"));
console.log (precioVehiculo)

// Comprueba que el precio sea un valor numérico
if (isNaN(precioVehiculo)) {
    mostrarError("Por favor, ingrese un valor numérico válido para el precio.");
    continue;
}

// calcular la cuota
let cantidadCuotas = parseInt(prompt("Ingrese la cantidad de meses de contrato:"));
console.log (cantidadCuotas)

// Comprueba la cuota sea un valor numérico
if (isNaN(cantidadCuotas)) {
    mostrarError("Por favor, ingrese un valor numérico válido para la cantidad de meses de contrato.");
    return;
}

// Cálculo de la cuota del seguro
let pagoPorCuota = calcularPago(precioVehiculo, cantidadCuotas, opcion);
console.log (pagoPorCuota)

if (pagoPorCuota) {
    alert("El pago por cuota para el vehículo " + nombreVehiculo + " es: " + pagoPorCuota);
    break;
}
}
//le pregunta al usuario si quiere seguir calculando cuotas
let respuesta = confirm("¿Desea calcular otro seguro? (Sí/No)");


}

