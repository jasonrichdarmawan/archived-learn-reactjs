let names = JSON.parse(localStorage.names);
let idNumbers = JSON.parse(localStorage.idNumbers);

function submit() {
    let inputFirstName = document.getElementById('inputFirstName').value;
    let inputIDNumber = document.getElementById('inputIDNumber').value;

    // logic to prevent submit if one of the variable is empty.
    if (!inputFirstName == "" && !inputIDNumber == "") {
        push(inputFirstName, inputIDNumber);
    }
}

function push(inputFirstName, inputIDNumber) {
    if (!names.includes(inputFirstName) && !idNumbers.includes(inputIDNumber)) {
        names.push(inputFirstName);
        idNumbers.push(inputIDNumber);

        // store to local storage
        if (localStorage.names == "" || localStorage.idNumbers == "") {
            localStorage.names = "[]";
            localStorage.idNumbers = "[]";
        } else {
            localStorage.names = JSON.stringify(names);
            localStorage.idNumbers = JSON.stringify(idNumbers);
        }
    }
}

function view() {
    // reset
    document.getElementById("viewList").innerHTML = '';

    for (let i = 0; i < JSON.parse(localStorage.names).length; i++) {
        document.getElementById("viewList").innerHTML += `<li class="list-group-item">${JSON.parse(localStorage.names)[i]}</li>`
    }
}