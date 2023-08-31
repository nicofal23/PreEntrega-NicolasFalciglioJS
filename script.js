function ingresarMonto() {
    while (true) {
        // Pide al usuario que ingrese una opción
        let opcion = parseInt(prompt("Elegir opción que desea realizar: \n 1-contra todo riesgo \n 2-completo \n 3-contra terceros"));

        // Ingresar el nombre del vehículo y el precio
        let nombreVehiculo = prompt("Ingrese el nombre del vehículo:");
        let precioVehiculo = parseFloat(prompt("Ingrese el precio del vehículo:"));

        // Comprueba que el precio sea un valor numérico
        if (isNaN(precioVehiculo)) {
            mostrarError("Por favor, ingrese un valor numérico válido para el precio.");
            return;
        }

        // calcular la cuota
        let cantidadCuotas = parseInt(prompt("Ingrese la cantidad de meses de contrato:"));
        
        if (isNaN(cantidadCuotas)) {
            mostrarError("Por favor, ingrese un valor numérico válido para la cantidad de meses de contrato.");
            return;
        }

        // Cálculo de la cuota del seguro
        let pagoPorCuota = Math.round(precioVehiculo / 1500 * cantidadCuotas);

        alert(`El pago por cuota para el vehículo ${nombreVehiculo} es: ${pagoPorCuota}`);
    }
}

const mostrarError = (mensaje) => alert(mensaje);

const calcularPago = (precioVehiculo, cantidadCuotas) => Math.round(precioVehiculo / 1500 * cantidadCuotas);
