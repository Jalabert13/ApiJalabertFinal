let mensajeMostrado = false;
let valorDelTD;

tablita.addEventListener("click", (e) => {
    let boton = e.target;
    valor = e.target.value;
    let primeraFila = tablita.rows[valor - 1];
    valorDelTD = primeraFila.cells[0].textContent;  // Asignar el valor aquí

    function mostrarModal() {
        const apiUrl = 'http://127.0.0.1:8000/api/persona/' + valorDelTD;
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("nombreActualizar").value = data["nombre"];
            document.getElementById("tipoActualizar").value = data["tipo"];
            document.getElementById("edadActualizar").value = data["edad"];
            document.getElementById("gradoActualizar").value = data["grado"];
            document.getElementById("fechaActualizar").value = data["fecha"];
            modalEditar.style.display = "block";
        })
        .catch(error => console.error('Error al obtener pacientes:', error));
    }

    if (e.target.innerHTML === 'Editar') {
        mostrarModal();
    } else {
        const apiUrl = 'http://127.0.0.1:8000/api/persona/' + valorDelTD;

        return fetch(apiUrl, {
            method: 'delete',
            cache: 'no-cache',
        })
        .then(response => response.json())
        .then(data => {
            let nombre = data["nombre"];
            if (!mensajeMostrado) {
                mostrarMensaje("Persona " + nombre + " eliminada correctamente");
                mensajeMostrado = true;  // Marcar que el mensaje se ha mostrado
            }
            mostrarTabla();
        })
        .catch(error => console.error('Error al obtener Persona:', error));
    }
});

document.getElementById('editarPersona').addEventListener('click', () => {
    const apiUrl = 'http://127.0.0.1:8000/api/persona/' + valorDelTD;
    let nombre = document.getElementById("nombreActualizar").value;
    let tipo = document.getElementById("tipoActualizar").value;
    let edad = parseInt(document.getElementById("edadActualizar").value);  // Convertir a número
    let grado = parseInt(document.getElementById("gradoActualizar").value);  // Convertir a número
    let fecha = document.getElementById("fechaActualizar").value;

    // Verificar tipos de datos
    let errores = [];
    if (!esTipoDatoCorrecto(nombre, 'string')) {
        errores.push('Nombre debe ser de tipo string.');
        limpiarCampo('nombreActualizar');
    }
    if (!esTipoDatoCorrecto(tipo, 'string')) {
        errores.push('Tipo debe ser de tipo string.');
        limpiarCampo('tipoActualizar');
    }
    if (isNaN(edad)) {
        errores.push('Edad debe ser de tipo number.');
        limpiarCampo('edadActualizar');
    }
    if (isNaN(grado)) {
        errores.push('Grado debe ser de tipo number.');
        limpiarCampo('gradoActualizar');
    }
    if (!esTipoDatoCorrecto(fecha, 'string')) {
        errores.push('Fecha debe ser de tipo string.');
        limpiarCampo('fechaActualizar');
    }

    if (errores.length > 0) {
        mostrarMensajeEditar('Errores de tipo de datos:\n' + errores.join('\n'));
        return;
    }

    const datos = {
        nombre: nombre,
        tipo: tipo,
        edad: edad,
        grado: grado,
        fecha: fecha
    };

    fetch(apiUrl, {
        method: 'put',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
    })
    .then(response => response.json())
    .then(data => {
        let nombre = data["nombre"];
        if (!mensajeMostrado) {
            mostrarMensajeEditar("Persona " + nombre + " editada correctamente");
            mensajeMostrado = true;  // Marcar que el mensaje se ha mostrado
        }
        mostrarTabla();
        modalEditar.style.display = "none"; // Cerrar modal después de actualizar
        mostrarMensajeEditar("Persona " + nombre + " editada correctamente"); // Mostrar mensaje de éxito
        mensajeMostrado = true;  // Marcar que el mensaje se ha mostrado
    })
    .catch(error => {
        console.error('Error al editar pacientes:', error);
        mostrarMensajeEditar("Error al editar pacientes. Consulta la consola para obtener más detalles.");
    });
});

function mostrarMensajeEditar(mensaje) {
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
