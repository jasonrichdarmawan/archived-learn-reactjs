if (localStorage.lists === undefined) {
    localStorage.lists = "[]";
}

function submit() {
    let inputFirstName = document.getElementById('inputFirstName').value;
    let inputIDNumber = document.getElementById('inputIDNumber').value;
    let inputIDPIC = document.getElementById('inputIDPIC').value;
    let inputIntention = document.getElementById('inputIntention').value;

    push(inputFirstName, inputIDNumber, inputIDPIC, inputIntention);
}

function push(inputFirstName, inputIDNumber, inputIDPIC, inputIntention) {
    let lists = JSON.parse(localStorage.lists);

    let idNumbers = [];
    for (let i = 0; i < lists.length; i++) {
        idNumbers.push(lists[i].idNumber);
    }

    if (!idNumbers.includes(inputIDNumber)) {
        let tempObjects = {};
        tempObjects.idNumber = inputIDNumber;
        tempObjects.firstName = inputFirstName;
        tempObjects.idPIC = inputIDPIC;
        tempObjects.intention = inputIntention;

        lists.push(tempObjects);

        // store the lists to local storage
        localStorage.lists = JSON.stringify(lists);
    }
}

function view() {
    // reset
    document.getElementById("viewList").innerHTML = '';

    for (let i = 0; i < JSON.parse(localStorage.lists).length; i++) {
        console.log(JSON.parse(localStorage.lists)[i].firstName);
        document.getElementById("viewList").innerHTML += `<li class="list-group-item">${JSON.parse(localStorage.lists)[i].firstName}</li>`
    }
}