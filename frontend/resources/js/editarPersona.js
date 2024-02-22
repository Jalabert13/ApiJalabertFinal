let mensajeMostrado = false;
let valorDelTD;

tablita.addEventListener("click", (e) => {
    let boton = e.target;
    valor = e.target.value;
    let primeraFila = tablita.rows[valor - 1];
    valorDelTD = primeraFila.cells[0].textContent;

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
                mensajeMostrado = true;
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
    let edad = parseInt(document.getElementById("edadActualizar").value);
    let grado = document.getElementById("gradoActualizar").value;
    let fecha = document.getElementById("fechaActualizar").value;

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
    if (!validarFormatoGrado(grado)) {
        errores.push('Grado debe ser un número seguido de %.');
        limpiarCampo('gradoActualizar');
    }
    if (!validarFormatoFecha(fecha)) {
        errores.push('Fecha debe tener un formato válido.');
        limpiarCampo('fechaActualizar');
    }

    if (errores.length > 0) {
        mostrarMensajeEditar('Errores de tipo de datos o formato:\n' + errores.join('\n'));
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
            mensajeMostrado = true;
        }
        mostrarTabla();
        modalEditar.style.display = "none";
    })
    .catch(error => {
        console.error('Error al editar pacientes:', error);
        mostrarMensajeEditar("Error al editar pacientes. Consulta la consola para obtener más detalles.");
    });
});

function validarFormatoGrado(grado) {
    const regexGrado = /^\d+(\.\d+)?%$/;
    return regexGrado.test(grado);
}

function validarFormatoFecha(fecha) {
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    return regexFecha.test(fecha);
}

function mostrarMensajeEditar(mensaje) {
    mensajeDiv.innerHTML = mensaje;
}

function esTipoDatoCorrecto(valor, tipo) {
    return typeof valor === tipo;
}

function limpiarCampo(idCampo) {
    document.getElementById(idCampo).value = "";
}
