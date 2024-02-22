// buscarPersona.js
document.getElementById('botonBuscar').addEventListener('click', () => {
    let id = document.getElementById('buscar').value;
    let apiUrl = 'http://127.0.0.1:8000/api/persona/' + id;

    fetch(apiUrl, {
            method: 'get',
            cache: 'no-cache',
            headers: {
                'content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            let tablita = document.getElementById("tabla");
            tablita.innerHTML = "";

            let tr = document.createElement("tr");
            for (const key in data) {
                let col = document.createElement("td");
                let textocol = document.createTextNode(data[key])
                col.appendChild(textocol);
                tr.appendChild(col);
            }

            let editar = document.createElement("button");
            editar.id = "editar";
            editar.innerHTML = "Editar";
            editar.className = "myBtn2";
            tr.appendChild(editar);
            let eliminar = document.createElement("button");
            eliminar.id = "eliminar";
            eliminar.innerHTML = "Eliminar";
            eliminar.className = "myBtn2";
            tr.appendChild(eliminar);
            tablita.appendChild(tr);

        })
        .catch(error => console.error('Error al obtener persona con id:' + id, error));
});
