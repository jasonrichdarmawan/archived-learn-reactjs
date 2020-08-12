# Usage

Front desk's offline form for guests to fill information.

# Function List

1. HTML5 Offline Storage to store names and idNumbers.

# Task Lists

- [ ] Staff panel to view the guest's National Identification Number.

- [ ] Store the data in objects.

    ```
    let data = [
        {idNumber:"1", name:"Smith", purpose:"Meet Jack'}
    ];

    // 1. push
    data.push(
        {idNumber:"2", name:"Smith", purpose:"Meet Ma"}
    );

    console.log(data);
    <!-- output: [
        {idNumber:"1", name:"Smith", purpose:"Meet Jack"},
        {idNumber:"2", name:"Smith", purpose:"Meet Ma"}
    ]; -->

    // 2. store the data in string on the local storage
    localStorage.data = JSON.stringify(data);

    // 3. rebuild the data from the local storage
    data = JSON.parse(localStorage.data);
    ```