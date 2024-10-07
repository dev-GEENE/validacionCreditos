document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputCodigo = document.getElementById("codigo");

    // Capturar el código directamente de la URL
    const pathname = window.location.pathname;
    const codigoDesdeUrl = pathname.substring(1); 
    inputCodigo.value = codigoDesdeUrl;

    // Si la URL tiene el código, envía el formulario automáticamente
    if (codigoDesdeUrl) {
        const datosFormulario = {
            codigo_verificacion: codigoDesdeUrl
        };

        // Realiza la solicitud POST al servidor
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
            } /*else {
                console.error('Error en la respuesta del servidor:', response.status);
                window.location.href = "https://errorvalidacion.geene.com.py/";
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            window.location.href = "https://errorvalidacion.geene.com.py/";*/
        });
    }
});