const result = document.querySelector(".result-screen");
const buttons = document.querySelectorAll(".buttons");
const operators = "+ - x ÷";
var systemNum = "none";
var currentNum = 0;
var operator = "none";

function buttonChecker(button) {
    if (operators.includes(button)) {
        operatorSelect(button);
    } else if (button == "C") {
        clear();
    } else if (button == "←") {
        backspace();
    } else if (button == "=") {
        equals();
    } else if ((currentNum != 0 || button != "0") && (button != "x" && button != "÷" && button != "+")){
        update(button);
    }
    currentNum = parseInt(result.innerText);
}

function operatorSelect(button) {
    if (button == "÷") {
        operator = "/";
    } 
    else if (button == "x") {
        operator = "*";
    } else {
        operator = button;
    }
    if (systemNum == "none") {
        systemNum = currentNum;
    } else {
        systemNum = calculate();
    }
    result.innerText = "0";
}

function calculate() {
    return eval(systemNum.toString() + operator + currentNum.toString());
}

function backspace() {
    let newNum = "0";
    if (currentNum == 0) {
        return;
    } else if (Math.abs(currentNum) > 9) {
        newNum = currentNum.toString().substring(0, currentNum.toString().length - 1);
    }
    result.innerText = newNum;
}

function equals() {
    result.innerText = calculate();
    systemNum = "none";
    operator = "none";
}

function clear() {
    systemNum = "none";
    operator = "none";
    result.innerText = "0";
}

function update(number) {
    let updatedNum = 0;
    if (currentNum == 0) {
        updatedNum = parseInt(number);
    } else {
        updatedNum = currentNum.toString() + number;
    }
    result.innerText = updatedNum.toString();
}

function setListeners() {
    buttons.forEach(function(button) {
        button.addEventListener("click", () => {
            buttonChecker(button.innerText);
        });
    });
}

setListeners();
