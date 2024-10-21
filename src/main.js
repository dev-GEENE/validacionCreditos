document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputCodigo = document.getElementById("codigo");
    const submitButton = document.getElementById("submitButton");
    const loadingMessage = document.getElementById("loadingMessage");

    // Asegúrate de que el mensaje de carga esté oculto al cargar la página
    loadingMessage.style.display = "none";

    const params = new URLSearchParams(window.location.search);
    const codigoDesdeUrl = params.get("codigo");

    // Si la URL tiene el código, lo coloca en el input y envía el formulario automáticamente
    if (codigoDesdeUrl) {
        inputCodigo.value = codigoDesdeUrl;

        // Muestra el mensaje de carga y deshabilita el botón, igual que en el proceso manual
        submitButton.disabled = true;
        loadingMessage.style.display = "block";

        procesarFormulario(codigoDesdeUrl);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío estándar del formulario
        const codigoVerificacion = inputCodigo.value.trim();
        
        // Deshabilita el botón y muestra el mensaje de carga
        submitButton.disabled = true;
        loadingMessage.style.display = "block"; // Muestra el mensaje de carga

        procesarFormulario(codigoVerificacion);
    });

    function procesarFormulario(codigoVerificacion) {
        const datosFormulario = { codigo_verificacion: codigoVerificacion };

        fetch('https://prod-05.brazilsouth.logic.azure.com:443/workflows/f1a7c177389e454a93a419e3ea6f30a6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=P4Eb8_Avx72GwbeF3zSceoBD4-tvD9cmOWdE52biQss', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosFormulario)
        })
        .then(response => {
            if (response.ok) {
                console.log('Formulario enviado con éxito');
                window.location.href = "https://agradecimientov.geene.com.py/";
            } else {
                console.error('Error en la respuesta del servidor:', response.status);
                window.location.href = "https://errorvalidacion.geene.com.py/";
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            window.location.href = "https://errorvalidacion.geene.com.py/";
        });
    }
});

