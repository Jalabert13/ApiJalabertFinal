function toggleMenu() {
    const menuLateral = document.getElementById("menu-lateral");
    const contenidoPrincipal = document.getElementById("contenido-principal");

    if (menuLateral.style.left === "0px") {
        menuLateral.style.left = "-250px";
        contenidoPrincipal.style.marginLeft = "0";
    } else {
        menuLateral.style.left = "0px";
        contenidoPrincipal.style.marginLeft = "250px";
    }
}
