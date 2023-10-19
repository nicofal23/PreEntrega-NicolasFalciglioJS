
document.addEventListener('DOMContentLoaded', () => {

// autocompletar nombre
const nombreInput = document.getElementById("nombre");
const nombreInput2 = document.getElementById("nombre");
nombreInput2.value = nombreInput.value;
//autocompletar apellido
const apellidoInput = document.getElementById("apellido");
const apellidoInput2 = document.getElementById("apellido");
apellidoInput2.value = apellidoInput.value;

    // Obtén el botón "Contratar" por su ID
    const botonContratar = document.getElementById('botonContratar');
    // Agrega un evento click al botón "Contratar"
    botonContratar.addEventListener('click', function() {
        // Obtén los valores seleccionados en los elementos de selección
        const marcaSeleccionada = selectMarca.value;
        const modeloSeleccionado = selectModelo.value;
        const anioSeleccionado = selectAnio.value;
        // Crea el mensaje guardado con los valores seleccionados
        const mensajeGuardado = `Hola, quiero contratar un seguro para mi vehículo ${marcaSeleccionada} ${modeloSeleccionado} año: ${anioSeleccionado}`;
        // Obtén el contenedor por su clase
        const contenedor = document.querySelector('#myTabContent');
        // Crea el formulario con los elementos necesarios
        const formularioHTML = `
            <form id="contact_form">
                <div class="form-row">
                    <div>
                        <label for="name">Name:</label>
                        <input type="text" id="nombre" name="name" required value="${nombreGuardado} ${apellidoGuardado}">
                    </div>
                    <div>
                        <label for="telefono">Telefono:</label>
                        <input type="telefono" id="telefono" name="telefono" required>
                    </div>
                </div>
                <div>
                    <label for="message">Message:</label><br>
                    <textarea id="message" name="message" rows="4" cols="50" required>${mensajeGuardado}</textarea>
                </div>
                <div class="form-btn">
                    <input type="submit" value="Enviar">
                </div>
            </form>
        `;

        // Reemplaza el contenido del contenedor con el formulario
        contenedor.innerHTML = formularioHTML;
        
        // Obtén el formulario por su ID después de crearlo
        const contactForm = document.getElementById('contact_form');
        const userName = document.querySelector('#nombre');
        const userTel = document.querySelector('#telefono');
        const message = document.querySelector('#message');

        // Agrega un evento submit al formulario
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const body = {
                service_id: 'service_a39bl8f',
                template_id: 'template_fe28b3a',
                user_id: 'O4mvOOZbR9fx_QTde',
                template_params: {
                    'to_name': userName.value,
                    'from_name': userTel.value,
                    'message': message.value,
                }
            };

            try {
                const response = await sendEmail(body);
                console.log(response);
                if (response && response.includes('OK')) {
                    // Mostrar SweetAlert de éxito
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'El correo electrónico se ha enviado correctamente.',
                    });
            
                    // Limpiar los campos del formulario
                    userName.value = '';
                    userTel.value = '';  // Corregí userEmail por userTel
                    message.value = '';
                } else {
                    // Mostrar SweetAlert de error si la respuesta no contiene 'OK'
                    showErrorAlert();
                }
            } catch (error) {
                // Mostrar SweetAlert de error si hay un error en la solicitud
                showErrorAlert();
            }
        });

        const showErrorAlert = () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un problema al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.',
            });
        };

        const sendEmail = async (body) => {
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", settings);
            const data = await response.text(); // Obtener la respuesta como texto
            return data;
        };
    });
});
