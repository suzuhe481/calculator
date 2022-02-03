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
        displayWindow.value = e;
        displayValue = e;
        
        // Clears depressed operations button.
        operations.forEach(op => op.style.backgroundColor = "");
    }

    // Displays decimal point.
    else if(e == ".") {
        displayWindow.value += e;
        displayValue = e;
    }

    // If on screen button is pressed, number appended to end.
    else if(typeof e == "object") {
        displayWindow.value += e.target.textContent;
        displayValue = displayWindow.value;
    }
    
    // If parameter is sent, number appended to end.
    else {
        displayWindow.value += e;
        displayValue = displayWindow.value;
    }
}



// Stores the operator when pressed.
function storeOp(e) {
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
            changeOpColor(e);
        }

        decimalExists = false;
    }
    
    // Operating without pressing equals.
    // Eg. 3 * 5 + 2 / 3 * 12 ...
    else  {
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

    if(zeroError == true) {
        return;
    }

    // Calculates result based on operator.
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
    storedValue = 0;
    displayValue = 0;
    storedOperator = "";
    result = 0;
    zeroError = false;
    decimalExists = false;
    operations.forEach(op => op.style.backgroundColor = "");
    zeroDisplay();
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
    
    // Regular expression to check for the character of "." 
    const decimalRegex = /[.]/g;

    // If number key is pressed.
    if(/\d/.test(keyValue)) {
        toDisplay(keyValue);
        changeKeyColor(e);
    }

    // If operation key is pressed.
    else if(opsRegex.test(keyValue)) {
        storeOp(keyValue);
        changeOpColor(e);
    }

    // If decimal key is pressed.
    else if(decimalRegex.test(keyValue)) {
        addDecimal();
        changeKeyColor(e);
    }

    // If Enter key is pressed.
    else if(keyValue == "Enter") {
        operate();
        changeKeyColor("equals");
    }

    // If Delete or Backspace key is pressed.
    else if(keyValue == "Delete" ||
            keyValue == "Escape") {
        clearData();
        changeKeyColor("clear");
    }

    // If , is pressed.
    else if(keyValue == ",") {
        plusMinus();
        changeKeyColor("plus-minus");
    }

    // If backspace is pressed.
    else if(keyValue == "Backspace") {
        backspace();
        changeKeyColor("backspace");
    }

    else {
        return;
    }
}

// Changes the color of the current operations button.
function changeOpColor(e) {
    // Clears currently pressed operations.
    operations.forEach(op => op.style.backgroundColor = "");

    // If keyboard button is pressed.
    if(e.type == "keydown") {
        let opButton;

        switch (e.key) {
            case "+":
                opButton = document.getElementById("add");
                break;
            case "-":
                opButton = document.getElementById("sub");
                break;
            case "*":
                opButton = document.getElementById("mul");
                break;
            case "/":
                opButton = document.getElementById("div");
                break;
        }

        opButton.style.backgroundColor = "rgb(156, 155, 155)";
    }
    // If on screen button is pressed.
    else {
        operations.forEach(op => op.style.backgroundColor = "");
        e.target.style.backgroundColor = "rgb(156, 155, 155)";
    }
}

// Changes button colors when using keyboard.
function changeKeyColor(e) {
    if(e == "equals") {
        let element = document.getElementById("equals");
        element.style.backgroundColor = "rgb(156, 155, 155)";
    }
    else if(e == "clear") {
        let element = document.getElementById("clear");
        element.style.backgroundColor = "rgb(156, 155, 155)";
    }
    else if(e.key == ".") {
        let element = document.getElementById("decimal");
        element.style.backgroundColor = "rgb(156, 155, 155)";
    }
    else if(e == "plus-minus") {
        let element = document.getElementById(e);
        element.style.backgroundColor = "rgb(156, 155, 155)";
    }
    else if(e == "backspace") {
        let element = document.getElementById(e);
        element.style.backgroundColor = "rgb(156, 155, 155)";
    }
    else {
        let element = document.getElementById(e.key);
        element.style.backgroundColor = "rgb(156, 155, 155)";
    }
}

// Deletes the last number in the display.
function backspace() {
    // If going to delete the final digit of display..
    if(displayValue.length == 1) {
        zeroDisplay();
    }
    // If a result was just outputted, disable backspace.
    else if(typeof displayValue == "number") {
        return;
    }
    // Deletes last digit on display..
    else {
        let numMinusLast = displayValue.slice(0, -1);

        displayToBeEmptied = true;
        toDisplay(numMinusLast);
    }

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

document.getElementById("backspace").addEventListener("click", backspace);;

// Event listener when a keyboard number is pressed.
window.addEventListener("keydown", inputKey);

// Event listener when a key is raised.
window.addEventListener("keyup", resetKeyColor);


// Resets button colors back to default when using keyboard.
function resetKeyColor(e) {
    // let elementValue = e.key;
    // console.log("e is: " + e);
    // console.log("e.key is: " + e.key);

    // Regular expression to check for the character of "." 
    const decimalRegex = /[.]/g;
    
    // If number key is raised.
    if(/\d/.test(e.key)) {
        let element = document.getElementById(e.key);
        // console.log(element.style.backgroundColor);
        element.style.backgroundColor = "";
    }

    // If decimal key is raised.
    else if(decimalRegex.test(e)) {
        let element = document.getElementById("decimal");
        element.style.backgroundColor = "";
    }

    // If Enter key is raised.
    else if(e.key == "Enter") {
        let element = document.getElementById("equals");
        element.style.backgroundColor = "";
    }

    // If Delete or Escape key is raised.
    else if(e.key == "Delete" ||
            e.key == "Escape") {
        let element = document.getElementById("clear");
        element.style.backgroundColor = "";
    }

    // If comma(+/-) key is raised.
    else if(e.key == ",") {
        let element = document.getElementById("plus-minus");
        element.style.backgroundColor = "";
    }

    // If Backspace is raised.
    else if(e.key == "Backspace") {
        let element = document.getElementById("backspace");
        element.style.backgroundColor = "";
    }

    else {
        return;
    }
    
}


