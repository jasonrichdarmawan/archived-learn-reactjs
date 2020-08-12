function submit() {
    let firstName = document.getElementById('inputFirstName').value;
    push(firstName);
}

function push(firstName) {
    let lists = document.getElementsByClassName("list-group-item");
    let data = [];
    for (let i = 0; i < lists.length; i++) {
        data.push(lists[i].innerHTML);
    }
    if (!data.includes(firstName)) {
        document.getElementById("viewList").innerHTML += `<li class="list-group-item">${firstName}</li>`
    }
}