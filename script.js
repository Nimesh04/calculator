const calculatorBody = document.querySelector(".calculator-body");

let square;
for(let i = 0; i<= 4;i++){
    for(let j = 0; j<= 5; j++){
        square = document.createElement("button");
        calculatorBody.append(square);
    }
}
