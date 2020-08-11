let listMenu = document.getElementsByClassName('mobile-hide');

function dropdown() {
    for (let i = 0; i < listMenu.length; i++) {
        if (listMenu[i].style.display == "initial") {
            listMenu[i].style.display = "none";
        } else {
            listMenu[i].style.display = "initial";
        }
    }
}