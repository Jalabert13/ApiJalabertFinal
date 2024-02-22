var modal = document.getElementById("myModal");
var modalEditar = document.getElementById("modalEditar");
var btn = document.getElementById("myBtn");
var btnEditar = document.getElementById("editar");
var span = document.getElementsByClassName("close")[0];
var spanEditar = document.getElementsByClassName("close")[1];

btn.onclick = function () {
    modal.style.display = "block";
}

btnEditar.onclick = function () {
    modalEditar.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

spanEditar.onclick = function () {
    modalEditar.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modalEditar) {
        modalEditar.style.display = "none";
    }
};
