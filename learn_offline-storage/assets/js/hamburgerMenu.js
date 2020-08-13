let listMenu = document.getElementsByClassName('collapse');

function collapse() {
    for (let i = 0; i < listMenu.length; i++) {
        if (listMenu[i].style.display == "initial") {
            listMenu[i].style.display = "none";
        } else {
            listMenu[i].style.display = "initial";
        }
    }
}