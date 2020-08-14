if (localStorage.lists === undefined) {
    localStorage.lists = "[]";
}

function submit(request) {
    let lists = JSON.parse(localStorage.lists);

    // logic: idNumbers is unique.
    let idNumbers = [];
    for (let i = 0; i < lists.length; i++) {
        idNumbers.push(lists[i].idNumber);
    }

    let inputIDNumber = document.getElementById('inputIDNumber').value;
    if (request === 'isValid') {
        if (!idNumbers.includes(inputIDNumber)) {
            return true;
        } else return false;
    } else {
        if (!idNumbers.includes(inputIDNumber)) {
            // push the objects to the lists.
            let tempObjects = {};
            tempObjects.idNumber = inputIDNumber;
            tempObjects.firstName = document.getElementById('inputFirstName').value;
            tempObjects.picName = document.getElementById('inputPICName').value;
            tempObjects.intention = document.getElementById('inputIntention').value;

            lists.push(tempObjects);

            // store the lists to local storage
            localStorage.lists = JSON.stringify(lists);
        }
    }
}

function view() {
    // reset
    document.getElementById("viewList").innerHTML = '';

    for (let i = 0; i < JSON.parse(localStorage.lists).length; i++) {
        // innerHTML
        document.getElementById("viewList").innerHTML += `  
            <th scope="row">${i+1}</th>
                <td>${JSON.parse(localStorage.lists)[i].idNumber}</td>
                <td>${JSON.parse(localStorage.lists)[i].firstName}</td>
                <td>${JSON.parse(localStorage.lists)[i].picName}</td>
            <td>${JSON.parse(localStorage.lists)[i].intention}</td>
        `;
    }
}