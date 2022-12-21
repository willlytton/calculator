let firstValue = '';
let operator = '';
let currentOperation = null // used to enter new value and enter to first value or operator
let shouldResetScreen = false;

// calculator operation logic
function operate(a, b, operator) {
    a = Number(a)
    b = Number(b)
    const operation = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    }

    return operator in operation ? operation[operator](a, b) : NaN;
}

// clears screen of all operations
function clear() {
    currentScreenOperation.textContent = '0';
    lastScreenOperation.textContent = '';
    firstValue = '';
    operator = '';
    currentOperation = null;
}

// create function that clears screen when screen is reset to zero and new number is entered after operator
function resetCurrent() {
    currentScreenOperation.textContent = '';
    shouldResetScreen = false;
}

// 1. sets first entered value to screen then sets 2nd after operator is entered
// 2. sets current value aka 2nd value to be add to operation but only if current value is not null
function appendNumber(number) {
    currentScreenOperation.textContent === '0' || shouldResetScreen ? resetCurrent() : undefined;// prepares currentscreenoperation to update with 2nd value 
    currentScreenOperation.textContent += number;  // temporarily saves first value to this 
}

// evaluates first value and operator
function setOperation (operator) { // when operator is selected after ^^ first value is stored to above
    currentOperation !== null ? calculate() :  // an if statement is ran to see if the value can be calculated
    firstValue = currentScreenOperation.textContent; // first value meaning number is stored here
    currentOperation = operator; // operator is stored here
    lastScreenOperation.textContent = `${firstValue} ${operator}`; // first value and operator are stored here waiting input for current value which would be the currentOperation
    shouldResetScreen = true;
}


function calculate() {
    operator = currentScreenOperation.textContent;
    currentScreenOperation.textContent = operate(firstValue, operator, currentOperation);
    lastScreenOperation.textContent = `${firstValue} ${currentOperation} ${operator} =`

}


// ------------------ UI ----------------------- //

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operators]');
const equals = document.getElementById('equals');
const currentScreenOperation = document.getElementById('currentScreenOperation');
const lastScreenOperation = document.getElementById('lastScreenOperation');
const reset = document.getElementById('clear');

reset.addEventListener('click', clear);
equals.addEventListener('click', calculate);

numberButtons.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.textContent)));

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => setOperation(button.textContent)));







