let storedValue = 0;
let displayValue = "";
let storedOperator = "";
let result = 0;

let displayToBeCleared = false;

const displayWindow = document.getElementById("display");

// Value of button clicked gets put on display.
// Stores the displayed value.
function toDisplay(e) {
    if(displayToBeCleared == true) {
        displayWindow.value = "";
        displayToBeCleared = false;
    }

    if(typeof e == "string" ||
       typeof e == "number") {
        displayWindow.value = e;
        displayValue = e;
    }
    else {
        displayWindow.value += e.target.textContent;
        displayValue = displayWindow.value;
    }
}

// Stores the operator when pressed.
function storeOp(e) {
    storedValue = displayValue;
    storedOperator = e.target.value;
    displayValue = "";
    displayToBeCleared = true;
}

// Evaluates expression and displays it.
function operate() {
    console.log(storedValue + " " + storedOperator + " " + displayValue);

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
            result = (Number(storedValue)*(1.0)) / Number(displayValue);
            break;
    }

    // storedValue = displayValue;
    toDisplay(result);
    displayToBeCleared = true;
}

function clearDisplay() {
    displayWindow.value = "";
    displayValue = 0;
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
document.getElementById("clear").addEventListener("click", clearDisplay);