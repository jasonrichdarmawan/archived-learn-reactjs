let names = JSON.parse(localStorage.names);
let idNumbers = JSON.parse(localStorage.idNumbers);

function submit() {
    let inputFirstName = document.getElementById('inputFirstName').value;
    let inputIDNumber = document.getElementById('inputIDNumber').value;
    push(inputFirstName, inputIDNumber);
}

function push(inputFirstName, inputIDNumber) {
    // let lists = document.getElementsByClassName("list-group-item");
    // let data = [];
    // for (let i = 0; i < lists.length; i++) {
    //     data.push(lists[i].innerHTML);
    // }
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
        // document.getElementById("viewList").innerHTML += `<li class="list-group-item">${inputFirstName}</li>`
    }
}

function view() {
    // reset
    document.getElementById("viewList").innerHTML = '';

    for (let i = 0; i < JSON.parse(localStorage.names).length; i++) {
        console.log(i);
        document.getElementById("viewList").innerHTML += `<li class="list-group-item">${JSON.parse(localStorage.names)[i]}</li>`
    }
}