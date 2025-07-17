// Capture all the major buttons

const numberBtn = document.querySelectorAll(".button.numbers");
const operateBtn = document.querySelectorAll(".button.operator");
const equalBtn = document.querySelector(".button.equal");
const display = document.querySelector("#display");

// display.textContent = 0;

const operationKeys =  ["C", "/", "*", "Del", "-", "+", "="];
let operator = '';
let prev, curr;

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


function operate(previous, current, operator){
    let displayValue;
    switch(operator){
        case "C":
            displayValue = 0;
            break;
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
        // case "=":
        //     break;
    }
    prev = displayValue;
    curr = 0;
    display.textContent = displayValue;
}

// function to figure out the pressed key

function pressedKey(value){
    let val = operationKeys.filter(item => item == value.textContent);
    // console.log("Val: ", val);
    // let equalValue = operationKeys.filter(() => value.textContent == "=");
    // if(equalValue){
    //     operate(parseFloat(prev), parseFloat(curr), operator);
    // }
    if(operator == ''){
        number = display.textContent;
        display.textContent = number + value.textContent;
        prev = display.textContent;
    }else{
        number = display.textContent;
        display.textContent = number + value.textContent;
        curr = display.textContent;
    }
    console.log("Prev: ", prev, "Curr: ", curr, "operator: ", operator);
    // display.textContent = display.textContent + value.textContent;
    // console.log("dp value: ", display.textContent, "value value: ", value.textContent);
}

// From the eventlistener it get's the element's text content and checks if that is in the preassigned array,
// if it is then assigns that to the operator variable otherwise keeps it empty.

function assignOperator(element){
    let checker = element.textContent;
    let val = operationKeys.filter(item => item == checker);
    if(val){
        operator = element.textContent;
        display.textContent = '';
    }else{
        operator = '';
    }
    
}

numberBtn.forEach(element => element.addEventListener("click",() => pressedKey(element)));
operateBtn.forEach(element => element.addEventListener("click",() => assignOperator(element)));
equalBtn.addEventListener("click",() => operate(parseFloat(prev), parseFloat(curr), operator));


