  
let listPage = document.getElementsByClassName("hide-page");

function routeToPage(page) {
    for (let i = 0; i < listPage.length; i++) {
        // show page
        if (listPage[i].id == page) {
            listPage[i].style.display = "initial";
        }
        
        // hide page
        else {
            listPage[i].style.display = "none";
        }
    }
}

routeToPage('submit'); // main