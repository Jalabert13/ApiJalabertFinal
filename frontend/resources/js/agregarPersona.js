let tablita = document.getElementById("tabla");
let modalAgregar = document.getElementById("myModal");
let mensajeDiv = document.getElementById("mensaje");

document.getElementById('agregar').addEventListener('click', async () => {
    try {
        let apiUrl = 'http://127.0.0.1:8000/api/persona';

        let nombre = document.getElementById('nombre').value;
        let tipo = document.getElementById('tipo').value;
        let edad = parseInt(document.getElementById('edad').value);
        let grado = parseInt(document.getElementById('grado').value);
        let fecha = document.getElementById('fecha').value;

        // Verificar tipos de datos
        let errores = [];
        if (!esTipoDatoCorrecto(nombre, 'string')) {
            errores.push('Nombre debe ser de tipo string.');
            limpiarCampo('nombre');
        }
        if (!esTipoDatoCorrecto(tipo, 'string')) {
            errores.push('Tipo debe ser de tipo string.');
            limpiarCampo('tipo');
        }
        if (isNaN(edad)) {
            errores.push('Edad debe ser de tipo number.');
            limpiarCampo('edad');
        }
        if (isNaN(grado)) {
            errores.push('Grado debe ser de tipo number.');
            limpiarCampo('grado');
        }
        if (!esTipoDatoCorrecto(fecha, 'string')) {
            errores.push('Fecha debe ser de tipo string.');
            limpiarCampo('fecha');
        }

        if (errores.length > 0) {
            mostrarMensaje('Errores de tipo de datos:\n' + errores.join('\n'));
            return;
        }

        const datos = {
            nombre: nombre,
            tipo: tipo,
            edad: edad,
            grado: grado,
            fecha: fecha
        };

        const response = await fetch(apiUrl, {
            method: 'post',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        });

        if (!response.ok) {
            throw new Error(`Error al agregar paciente: ${response.status}`);
        }

        const data = await response.json();
        mostrarTabla();
        mostrarMensaje("Paciente agregado con éxito");
        // Restablecer los valores de los campos
        document.getElementById('nombre').value = "";
        document.getElementById('tipo').value = "";
        document.getElementById('edad').value = "";
        document.getElementById('grado').value = "";
        document.getElementById('fecha').value = "";
        // Cerrar el modal
        modalAgregar.style.display = "none";
    } catch (error) {
        console.error(error);
        mostrarMensaje("Error al agregar paciente. Consulta la consola para obtener más detalles.");
    }
});

function mostrarMensaje(mensaje) {
    mensajeDiv.innerHTML = mensaje;
}

// Función para verificar el tipo de dato
function esTipoDatoCorrecto(valor, tipo) {
    return typeof valor === tipo;
}

// Función para limpiar el campo
function limpiarCampo(idCampo) {
    document.getElementById(idCampo).value = "";
}
