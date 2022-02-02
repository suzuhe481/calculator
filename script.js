let storedValue = 0;
let displayValue = 0;
let storedOperator = "";
let result = 0;
let displayToBeEmptied = true;
let zeroError = false;
const zeroErrorMsg = "No no no";
let decimalExists = false;

const displayWindow = document.getElementById("display");

// Value of button clicked gets put on display.
// Stores the displayed value.
function toDisplay(e) {
    // If display needs to be emptied.
    if(displayToBeEmptied == true) {
        emptyDisplay();
    }

    // Displays error.
    if(zeroError == true) {
        displayZeroErrorMsg();

        return;
    }

    
    // Displays result
    else if(typeof e == "number") {
        // Checks if whole number or decimal.
        if(e % 1 != 0) {
            displayWindow.value = e;
            displayValue = e;
        }
        else {
            displayWindow.value = e;
            displayValue = e;
        }
        // Clears depressed operations button.
        operations.forEach(op => op.style.backgroundColor = "");
    }

    // Displays decimal point.
    else if(e == ".") {
        displayWindow.value += e;
        displayValue = e;
    }

    // If on screen button is pressed.
    else if(typeof e == "object") {
        displayWindow.value += e.target.textContent;
        displayValue = displayWindow.value;
    }
    
    // If parameter is sent.
    else {
        displayWindow.value += e;
        displayValue = displayWindow.value;
    }
}



// Stores the operator when pressed.
function storeOp(e) {
    changeOpColor(e);

    // On error
    if(zeroError == true) {
        return;
    }
    
    // On empty stored variable.
    else if(storedValue == 0) {
        // Keyboard press
        if(typeof e == "string") {
            storedValue = displayValue;
            storedOperator = e;
            displayToBeEmptied = true;
        }
        else {
            storedValue = displayValue;
            storedOperator = e.target.value;
            displayToBeEmptied = true;
        }
        
    }
    
    // Operating without pressing equals.
    else {
        if(typeof e == "string") {
            operate();
            storedValue = displayValue;
            storedOperator = e;
            displayValue = "";
            displayToBeEmptied = true;
        }
        else {
            operate();
            storedValue = displayValue;
            storedOperator = e.target.value;
            displayValue = "";
            displayToBeEmptied = true;
        }
    }
}

// Evaluates expression and displays it.
function operate() {
    if(storedValue == 0) {
        return;
    }

    console.log(storedValue + " " + storedOperator + " " + displayValue);

    if(zeroError == true) {
        return;
    }

    switch (storedOperator) {
        case "add":
        case "+":
            result = Number(storedValue) + Number(displayValue);
            break;
        case "sub":
        case "-":
            result = Number(storedValue) - Number(displayValue);
            break;
        case "mul":
        case "*":
            result = Number(storedValue) * Number(displayValue);
            break;
        case "div":
        case "/":
            if(displayValue == 0) {
                zeroError = true;
                break;
            }
            else {
                result = (Number(storedValue)*(1.0)) / Number(displayValue);
                break;
            }
            
    }

    // Checks if whole number or decimal.
    // If decimal, convert to float.
    if(result % 1 != 0) {
        result = parseFloat(result.toFixed(8));
    }
    
    storedValue = 0;
    toDisplay(result);
    displayToBeEmptied = true;
    decimalExists = false;
}

// Empties the display and clears data.
function clearData() {
    zeroError = false;
    zeroDisplay();
    storedValue = 0;
    displayValue = 0;
    result = 0;
    storedOperator = "";
    decimalExists == false;
    operations.forEach(op => op.style.backgroundColor = "");
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

// Adds a decimal, unless one is already on screen.
function addDecimal() {
    if(decimalExists == true) {
        return;
    }
    else {
        toDisplay(".");
        decimalExists = true;
    }
}

// Lowers or resets opacity of display text when mouse hovers over solar panel.
function lowerOpacity() {
    displayWindow.style.color = "rgba(0, 0, 0, 0.4)";
}
function resetOpacity() {
    displayWindow.style.color = "rgba(0, 0, 0, 1)";
}

// Changes the display value from positive to negative and the reverse.
function plusMinus() {
    displayWindow.value = (-1)*(displayWindow.value);
    displayValue = displayWindow.value;
}


function inputKey(e) {
    let keyValue = e.key;

    // Regular expression to check for the 4 characters of + - * / .
    const opsRegex = /[\+\-\*\/]/g;
    
    // Regulat expressoin to check for the character of "." 
    const decimalRegex = /[.]/g;

    // If number key is pressed.
    if(/\d/.test(keyValue)) {
        toDisplay(keyValue);
    }

    // If operation key is pressed.
    else if(opsRegex.test(keyValue)) {
        storeOp(keyValue);
    }

    // If decimal key is pressed.
    else if(decimalRegex.test(keyValue)) {
        addDecimal();
    }

    // If Enter key is pressed.
    else if(keyValue == "Enter") {
        operate();
    }

    // If Delete or Backspace key is pressed.
    else if(keyValue == "Delete" || keyValue == "Backspace") {
        clearData();
    }

    // If , is pressed.
    else if(keyValue == ",") {
        plusMinus();
    }

    else {
        return;
    }
}

// Changes the color of the current operations button.
function changeOpColor(e) {
    operations.forEach(op => op.style.backgroundColor = "");
    e.target.style.backgroundColor = "rgb(156, 155, 155)";
}

// Event listeners to add numbers to display.
const numbers = Array.from(document.querySelectorAll(".num"));
numbers.forEach(num => num.addEventListener("click", toDisplay));

// Event listener for operations.
const operations = Array.from(document.querySelectorAll(".op"));
operations.forEach(op => op.addEventListener("click", storeOp));

// Event listener for equals.
document.getElementById("equals").addEventListener("click", operate);

// Event listener for clear button.
document.getElementById("clear").addEventListener("click", clearData);

// Event listener for decimal button.
document.getElementById("decimal").addEventListener("click", addDecimal);

document.getElementById("plus-minus").addEventListener("click", plusMinus);

// Event listener for solar panel text opacity.
document.getElementById("solar-panel").addEventListener("mouseover", lowerOpacity);
document.getElementById("solar-panel").addEventListener("mouseout", resetOpacity);

// Detects when a keyboard number is pressed.
window.addEventListener("keydown", inputKey);