let storedValue = 0;
let displayValue = 0;
let storedOperator = "";
let result = 0;
let displayToBeEmptied = true;
let zeroError = false;
let decimalExists = false;

const zeroErrorMsg = "Can't do that.";
const buttonClickColor = buttonClickColor;

const displayWindow = document.getElementById("display");

/*
Description: Takes in a parameter to display.
@Param: A single parameter.
    -If number: Will replace and display on display.
    -If decimal: Will append a decimal to display content. 
    -If an object: Mouse object. Will append number clicked to display.
    -If string: From key event. Will append number key pressed to display.
*/
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
        // console.log(e);
        let num = e.target.textContent;

        displayWindow.value += num;
        displayValue = displayWindow.value;
    }
    
    // If parameter is sent, number appended to end.
    else if (typeof e == "string") {
        // console.log(typeof e);
        // console.log(e);
        let num = e;

        displayWindow.value += num;
        displayValue = displayWindow.value;
    }
    else {
        // Nothing
    }
}


/*
Description: Stores the operator selected. Will also call operate() 
if multiple operators are selected.
@Param: A single parameter.
    If string - Keyboard press. Stores appropriate operator.
    Others - Button pressed. Stores appropriaet operator.
*/
function storeOp(e) {
    // On error
    if(zeroError == true) {
        return;
    }
    
    // On empty stored variable.
    else if(storedValue == 0) {
        storedValue = displayValue;
        // Keyboard press.
        if(typeof e == "string") {
            storedOperator = e;
        }
        // On screen button press.
        else {
            storedOperator = e.target.value;
            changeOpColor(e);
        }

        displayToBeEmptied = true;
        decimalExists = false;
    }
    
    // Operating without pressing equals.
    // Eg. 3 * 5 + 2 / 3 * 12 ...
    else  {
        operate();
        storedValue = displayValue;

        // Keyboard press.
        if(typeof e == "string") {
            storedOperator = e;
        }
        // On screen button press.
        else {
            storedOperator = e.target.value;
        }

        displayValue = "";
        displayToBeEmptied = true;
    }
}


/*
Description: Takes the storedValue, the storedOperator, and 
the displayValue and performs the operation on them.
Calls toDisplay() to display the results.
*/
function operate() {
    if(storedValue == 0) {
        return;
    }

    if(zeroError == true) {
        return;
    }

    // Calculates result based on operator.
    switch (storedOperator) {
        case "+":
            result = Number(storedValue) + Number(displayValue);
            break;
        case "-":
            result = Number(storedValue) - Number(displayValue);
            break;
        case "*":
            result = Number(storedValue) * Number(displayValue);
            break;
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
    
    // Displays result and resets variables to get ready 
    // for next operation.
    storedValue = 0;
    toDisplay(result);
    displayToBeEmptied = true;
    decimalExists = false;
}


/*
Description: Empties the display, clears stored data, resets colors.
*/
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


/*
Description: Displays teh zero error message.
*/
function displayZeroErrorMsg() {
    displayWindow.value = zeroErrorMsg;
    displayValue = zeroErrorMsg;
}


/*
Description: Places only a zero in the display window.
*/
function zeroDisplay() {
    displayWindow.value = 0;
    displayToBeEmptied = true;
}


/*
Description: Clears the display window.
*/
function emptyDisplay() {
    displayWindow.value = "";
    displayToBeEmptied = false;
}


/*
Description: Adds a decimal, unless one is already on screen.
*/
function addDecimal() {
    if(decimalExists == true) {
        return;
    }
    else {
        toDisplay(".");
        decimalExists = true;
    }
}


/*
Description: Lowers or resets opacity of display text when mouse hovers over solar panel.
*/
function lowerOpacity() {
    displayWindow.style.color = "rgba(0, 0, 0, 0.4)";
}
function resetOpacity() {
    displayWindow.style.color = "rgba(0, 0, 0, 1)";
}


/*
Description: Changes the display value from positive to negative and the reverse.
*/
function plusMinus() {
    displayWindow.value = (-1)*(displayWindow.value);
    displayValue = displayWindow.value;
}


/*
Description: Performs on operation depending on which keyboard 
key was pressed.
@Param: Keyboard event.
*/
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


/*
Description: Changes the color of the operations button selected.
@Param: The keyboard event or the onscreen button clicked.
*/
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

        opButton.style.backgroundColor = buttonClickColor;
    }
    // If on screen button is pressed.
    else {
        operations.forEach(op => op.style.backgroundColor = "");
        e.target.style.backgroundColor = buttonClickColor;
    }
}


/*
Description: Changes button colors when using keyboard.
@Param: The keyboard event.
*/
function changeKeyColor(e) {
    if(e == "equals") {
        let element = document.getElementById("equals");
        element.style.backgroundColor = buttonClickColor;
    }
    else if(e == "clear") {
        let element = document.getElementById("clear");
        element.style.backgroundColor = buttonClickColor;
    }
    else if(e.key == ".") {
        let element = document.getElementById("decimal");
        element.style.backgroundColor = buttonClickColor;
    }
    else if(e == "plus-minus") {
        let element = document.getElementById(e);
        element.style.backgroundColor = buttonClickColor;
    }
    else if(e == "backspace") {
        let element = document.getElementById(e);
        element.style.backgroundColor = buttonClickColor;
    }
    else {
        let element = document.getElementById(e.key);
        element.style.backgroundColor = buttonClickColor;
    }
}


/*
Description: Deletes the last number in the display.
*/
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
    

/*
Description: Resets button colors back to default when using keyboard.
@Param: Keyboard event.
*/
function resetKeyColor(e) {
    // Regular expression to check for the character of "." 
    const decimalRegex = /[.]/g;
    
    // If number key is raised.
    if(/\d/.test(e.key)) {
        let element = document.getElementById(e.key);
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


// Event listeners.
// Listens to onscreen number buttons.
const numbers = Array.from(document.querySelectorAll(".num"));
numbers.forEach(num => num.addEventListener("click", toDisplay));

// Listens to onscreen operation buttons.
const operations = Array.from(document.querySelectorAll(".op"));
operations.forEach(op => op.addEventListener("click", storeOp));

// Listens to onscreen equals button.
document.getElementById("echangeOpColorecimal").addEventListener("click", addDecimal);

// Listens to onscreen onscreen plus/minus button,
document.getElementById("plus-minus").addEventListener("click", plusMinus);

// Listens to onscreen backspace button.
document.getElementById("backspace").addEventListener("click", backspace);;

// Listens to keyboard keys when pressed.
window.addEventListener("keydown", inputKey);

// Listens to when a keyboard key is raised.
window.addEventListener("keyup", resetKeyColor);

// Event listener for solar panel text opacity.
document.getElementById("solar-panel").addEventListener("mouseover", lowerOpacity);
document.getElementById("solar-panel").addEventListener("mouseout", resetOpacity);