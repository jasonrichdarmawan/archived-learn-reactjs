let idNumber = [];

function submit() {
    let inputFirstName = document.getElementById('inputFirstName').value;
    let inputIDNumber = document.getElementById('inputIDNumber').value;
    push(inputFirstName, inputIDNumber);
}

function push(inputFirstName, inputIDNumber) {
    let lists = document.getElementsByClassName("list-group-item");
    let data = [];
    for (let i = 0; i < lists.length; i++) {
        data.push(lists[i].innerHTML);
    }
    if (!data.includes(inputFirstName) && !idNumber.includes(inputIDNumber)) {
        idNumber.push(inputIDNumber);
        document.getElementById("viewList").innerHTML += `<li class="list-group-item">${inputFirstName}</li>`
    }
}