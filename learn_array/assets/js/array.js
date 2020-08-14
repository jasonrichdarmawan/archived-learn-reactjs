function filter(request) {
    let tempArray = [10, 23, 456, 21, 77, 85, 19, 92, 43, 35];

    let result = tempArray.filter((number) => {
        // prime number
        if (request === "prime number") {
            // trial division method
            for (let i = 2; i < Math.sqrt(number); i++) {
                if (number % i === 0) return false;
            }
            return true;
        }
        // divisible by 3
        else if (request === "divisible by 3") {
            if (number % 3 === 0) return true;
        }
        // result more than 636 after multiplied by 17
        else if (request === "more than 636 after multiplied by 17") {
            if (number * 17 > 636) return true;
        }
    });

    console.log(result);
}

function map(request) {
    let tempArray = [10, 23, 456, 21, 77, 85, 19, 92, 43, 35];
    let result = tempArray.map((number) => {
        // value of circle area
        if (request === "circle area") {
            // pi * r^2
            return 22 / 7 * Math.pow(number, 2);
        }
        // value of square area
        else if (request === "square area") {
            // s^2
            return Math.pow(number, 2);
        }
        // value of cubic volume
        else if (request === "cubic volume") {
            // s^3
            return Math.pow(number, 3);
        }
    });

    console.log(result);
}