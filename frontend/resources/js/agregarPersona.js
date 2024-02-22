let tablita = document.getElementById("tabla");
let modalAgregar = document.getElementById("myModal");
let mensajeDiv = document.getElementById("mensaje");

document.getElementById('agregar').addEventListener('click', async () => {
    try {
        let apiUrl = 'http://127.0.0.1:8000/api/persona';

        let nombre = document.getElementById('nombre').value;
        let tipo = document.getElementById('tipo').value;
        let edad = parseInt(document.getElementById('edad').value);
        let grado = document.getElementById('grado').value;
        let fecha = document.getElementById('fecha').value;

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
        if (!validarFormatoGrado(grado)) {
            errores.push('Grado debe tener el formato correcto (números seguidos de % y estar entre 0 y 100).');
            limpiarCampo('grado');
        }
        if (!validarFormatoFecha(fecha)) {
            errores.push('Fecha debe tener el formato correcto (YYYY-MM-DD).');
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
        document.getElementById('nombre').value = "";
        document.getElementById('tipo').value = "";
        document.getElementById('edad').value = "";
        document.getElementById('grado').value = "";
        document.getElementById('fecha').value = "";
        modalAgregar.style.display = "none";
    } catch (error) {
        console.error(error);
        mostrarMensaje("Error al agregar paciente. Consulta la consola para obtener más detalles.");
    }
});

function mostrarMensaje(mensaje) {
    mensajeDiv.innerHTML = mensaje;
}

function esTipoDatoCorrecto(valor, tipo) {
    return typeof valor === tipo;
}

function limpiarCampo(idCampo) {
    document.getElementById(idCampo).value = "";
}

function validarFormatoFecha(fecha) {
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    return regexFecha.test(fecha);
}

function validarFormatoGrado(grado) {
    const regexGrado = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?|\d(\.\d{1,2})?)%$/;
    return regexGrado.test(grado);
}
