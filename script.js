let storedValue = 0;
let displayValue = 0;
let storedOperator = "";
let result = 0;
let displayToBeEmptied = true;
let zeroError = false;
const zeroErrorMsg = "No no no";

const displayWindow = document.getElementById("display");

// Value of button clicked gets put on display.
// Stores the displayed value.
function toDisplay(e) {
    if(displayToBeEmptied == true) {
        emptyDisplay();
    }
    

    // Displays error
    if(zeroError == true) {
        displayZeroErrorMsg();

        return;
    }

    // Displays the result
    else if(typeof e == "number") {
        displayWindow.value = e;
        displayValue = e;
        console.log("one");
    }
    // Appends new number to display number
    else {
        displayWindow.value += e.target.textContent;
        displayValue = displayWindow.value;
        console.log("two");
    }

    console.log("out");
}



// Stores the operator when pressed.
function storeOp(e) {
    // On error
    if(zeroError == true) {
        return;
    }
    // On empty stored variable.
    else if(storedValue == 0) {
        storedValue = displayValue;
        storedOperator = e.target.value;
        displayToBeEmptied = true;
    }
    
    // Operating
    else {
        operate();
        storedValue = displayValue;
        storedOperator = e.target.value;
        displayValue = "";
        displayToBeEmptied = true;
    }

    
}

// Evaluates expression and displays it.
function operate() {
    console.log(storedValue + " " + storedOperator + " " + displayValue);

    if(zeroError == true) {
        return;
    }

    switch (storedOperator) {
        case "add":
            result = Number(storedValue) + Number(displayValue);
            break;
        case "sub":
            result = Number(storedValue) - Number(displayValue);
            break;
        case "mul":
            result = Number(storedValue) * Number(displayValue);
            break;
        case "div":
            if(displayValue == 0) {
                // result = zeroErrorMsg;
                zeroError = true;
                break;
            }
            else {
                result = (Number(storedValue)*(1.0)) / Number(displayValue);
                break;
            }
            
    }

    storedValue = 0;
    toDisplay(result);
    displayToBeEmptied = true;
}

// Empties the display and clears the data.
function clearData() {
    zeroError = false;
    zeroDisplay();
    storedValue = 0;
    storedOperator = "";
}

// Displays the zero error message.
function displayZeroErrorMsg() {
    displayWindow.value = zeroErrorMsg;
    displayValue = zeroErrorMsg;
}

// Places only a zero in the display window.
function zeroDisplay() {
    displayWindow.value = 0;
    displayToBeEmptied = true;
}

// Clears the display window.
function emptyDisplay() {
    displayWindow.value = "";
    displayToBeEmptied = false;
}


// Adds event listeners for all numbers when clicked.
const numbers = Array.from(document.querySelectorAll(".num"));
numbers.forEach(num => num.addEventListener("click", toDisplay));

// Adds event listener for operations.
const operations = Array.from(document.querySelectorAll(".op"));
operations.forEach(op => op.addEventListener("click", storeOp));

// Evaulates the expression.
const equals = document.getElementById("equals");
equals.addEventListener("click", operate);


// Adds an event listener for the clear button.
document.getElementById("clear").addEventListener("click", clearData);