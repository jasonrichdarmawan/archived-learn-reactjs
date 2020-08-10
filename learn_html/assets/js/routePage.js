let listPage = ["home", "about"];

function routeToPage(page) {
    for (let i = 0; i < listPage.length; i++) {
        if (listPage[i] == page) {
            // show page
            let classPage = document.getElementById(page).classList;
            classPage.remove("hide-page");
            continue;
        }
    }

    // hide page
    let classPage = document.getElementById(listPage[i]).classList;
    classPage.add("hide-page")
}

routeToPage("home"); // main