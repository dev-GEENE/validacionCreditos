document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputCodigo = document.getElementById("codigo");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const codigo = inputCodigo.value.trim();

        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(codigo)) {
            alert("Código de validación correcto.");

            const data = {
                codigo_verificacion: codigo 
            };

            // Realiza la solicitud POST al servidor
            fetch('https://prod-05.brazilsouth.logic.azure.com:443/workflows/f1a7c177389e454a93a419e3ea6f30a6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=P4Eb8_Avx72GwbeF3zSceoBD4-tvD9cmOWdE52biQss', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Formulario enviado con éxito');
                    alert('Formulario enviado con éxito');
                } else {
                    console.error('Error en la respuesta del servidor:', response.status);
                    alert('Hubo un problema al enviar el formulario.');
                }
                return response.text();
            })
            .then(text => {
                if (!text) {
                    console.warn('La respuesta está vacía');
                    alert('Formulario enviado, pero la respuesta está vacía');
                } else {
                    try {
                        const jsonData = JSON.parse(text);
                        console.log('Respuesta JSON:', jsonData);
                    } catch (error) {
                        console.error('Error al analizar JSON:', error);
                    }
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert('Hubo un error al enviar el formulario');
            });

        } else {
            alert("El código debe contener letras y números.");
        }
    });
});

