// Capture all the major buttons

const numberBtn = document.querySelectorAll(".button.numbers");
const operateBtn = document.querySelectorAll(".button.operator");
const equalBtn = document.querySelector(".button.equal");
const clearBtn = document.querySelector(".button.clear");
const display = document.querySelector("#display");

let waitingForSecondOperand = false;
let anotherOperatorPressed = false;
let previous, current, operator;


// Calculator basic functionality

function add(a, b){
    operator = '';
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}   

function divide(a, b){
    return (a / b).toFixed(2);
}

// Function performs the appropriate arithmetic according to the operator

function operate(previous, current, operator){
    let displayValue;
    switch(operator){
        case "/":
            displayValue = divide(previous, current);
            break;
        case "*":
            displayValue = multiply(previous, current);
            break;
        case "Del":
            break;
        case "-":
            displayValue = subtract(previous, current);
            break;
        case "+":
            displayValue = add(previous, current);
            break;
    }
    display.textContent = displayValue;
    return displayValue;
}

// Function, if we know the operator was already pressed before hand then we empty the current display to make sure that we capture the second
// operand that we need to compute, but we have to make sure that once the display is emptied we set that to false to make sure we capture all the
// values for the current.

function assignValues(element){
    if(anotherOperatorPressed){
        display.textContent = '';
        anotherOperatorPressed = false;
    }
    if(waitingForSecondOperand){
        display.textContent = display.textContent + element.textContent;
        current = display.textContent;
    }else{
        display.textContent = display.textContent + element.textContent;
        previous = display.textContent;
    }
}

// Function, if we know the operator isn't empty then we know there is a pair number already, so when operator isn't empty, we first
// acknowledge that, then we compute the value of the previous operation which would be displayed and then only set the operator to the
// current operator and the previous value to the computed value otherwise we just go with initializing the operator

function assignOperator(element){
    if(operator == undefined){
        operator = element.textContent;
        display.textContent = '';
        waitingForSecondOperand = true;
    }else{
        anotherOperatorPressed = true;
        let value = operate(parseFloat(previous), parseFloat(current), operator);
        previous = value;
        console.log("previous: ", previous, "value: ", value);
        operator = element.textContent;
        display.textContent =value;
    }
    
}


numberBtn.forEach(element => element.addEventListener("click",() => assignValues(element)));
operateBtn.forEach(element => element.addEventListener("click", () => assignOperator(element)));
equalBtn.addEventListener("click", () => operate(parseFloat(previous), parseFloat(current), operator));
clearBtn.addEventListener("click", () =>{
    previous = 0;
    current = 0;
    operator = undefined;
    anotherOperatorPressed = false;
    waitingForSecondOperand =false;
    display.textContent = '';
})