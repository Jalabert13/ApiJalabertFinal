// mostrarTabla.js
function mostrarTabla() {
    let contador = 0;
    const apiUrl = 'http://127.0.0.1:8000/api/personas';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let tablita = document.getElementById("tabla");

            tablita.innerHTML = "";
            for (const datos of data) {
                let tr = document.createElement("tr");
                tr.className = "table-info";
                contador++;
                for (const key in datos) {
                    let col = document.createElement("td");
                    let textocol = document.createTextNode(datos[key]);

                    col.appendChild(textocol);
                    tr.appendChild(col);
                }
                let eliminar = document.createElement("button");
                let editar = document.createElement("button");
                eliminar.id = "eliminar";
                eliminar.className = "myBtn2";
                eliminar.innerHTML = "Eliminar";
                eliminar.value = contador;

                editar.id = "editar";
                editar.className = "myBtn2";
                editar.innerHTML = "Editar";
                editar.value = contador;
                tr.appendChild(editar);
                tr.appendChild(eliminar);
                tablita.appendChild(tr);
            }
        })
        .catch(error => console.error('Error al obtener pacientes:', error));
}

document.getElementById('todos').addEventListener('click', mostrarTabla);
