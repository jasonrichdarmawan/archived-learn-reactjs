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

    // logic: idNumbers is unique.
    let idNumbers = [];
    for (let i = 0; i < lists.length; i++) {
        idNumbers.push(lists[i].idNumber);
    }

    if (!idNumbers.includes(inputIDNumber)) {
        // push the objects to the lists.
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
        // convert idPIC to namePIC
        let namePIC;
        switch(JSON.parse(localStorage.lists)[i].idPIC) {
            case "1":
                namePIC = "Jack Ma";
                break;
            case "2":
                namePIC = "Jeff Bezos";
                break;
            case "3":
                namePIC = "Elon Musk";
                break;
        }

        // innerHTML
        document.getElementById("viewList").innerHTML += `  
            <th scope="row">${i+1}</th>
                <td>${JSON.parse(localStorage.lists)[i].idNumber}</td>
                <td>${JSON.parse(localStorage.lists)[i].firstName}</td>
                <td>${namePIC}</td>
            <td>${JSON.parse(localStorage.lists)[i].intention}</td>
        `;
    }
}