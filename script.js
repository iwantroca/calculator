let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let result = 0;
let lastOperator = "";

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const operators = [...operatorButtons].map((x) => x.textContent);
const lastDisplay = document.querySelector("#display-last");
const currentDisplay = document.querySelector("#display-current");
const equalButton = document.querySelector("#equal-btn");
const allClearButton = document.querySelector("#allclear-btn");
const clearButton = document.querySelector("#clear-btn");
const decimalButton = document.querySelector("#decimal-btn");

function getNumbers(num) {
  currentDisplay.textContent += num;
}
function getOperator(operator) {
  if (!firstOperand) firstOperand = currentDisplay.textContent ?? 0;
  else if (firstOperand && !currentDisplay.textContent && currentOperator) {
    firstOperand = firstOperand || currentDisplay.textContent || 0;
  } else if (firstOperand != currentDisplay.textContent) {
    firstOperand = currentDisplay.textContent;
  }
  currentOperator = operator;
  updateLastDisplay();
  currentDisplay.textContent = "";
}
function doCalculation(operator, input1, input2) {
  switch (operator) {
    case "+":
      result = Number(input1) + Number(input2);
      break;
    case "-":
      result = Number(input1) - Number(input2);
      break;
    case "×":
      result = Number(input1) * Number(input2);
      break;
    case "÷":
      if (input2 == 0) result = 0;
      else {
        result = Number(input1) / Number(input2);
      }
      break;
    case "%":
      result = Number(input1) / 100;
      break;
  }
  result = Math.round(result * 1000) / 1000;
  return result;
}
function finaliseAnswer() {
  if (currentOperator) {
    secondOperand = currentDisplay.textContent;
    doCalculation(currentOperator, firstOperand, secondOperand);
    currentDisplay.textContent = result;
    updateLastDisplay();
    firstOperand = result;
    secondOperand = "";
    currentOperator = "";
  }
}
function updateLastDisplay() {
  lastDisplay.textContent = `${
    firstOperand || 0
  } ${currentOperator} ${secondOperand}`;
}
function addDecimal() {
  currentDisplay.textContent += ".";
}
function clearWithButton() {
  currentDisplay.textContent = currentDisplay.textContent
    .split("")
    .slice(0, -1)
    .join("");
}
function completeDataClear() {
  currentDisplay.textContent = "";
  lastDisplay.textContent = 0;
  firstOperand = 0;
  result = 0;
}
//Add Keyboard Support
function addKeyboardSupport(e) {
  if (e.key == 0 || e.key <= 9) getNumbers(e.key);
  if (!currentDisplay.textContent.split("").includes(".") && e.key == ".")
    addDecimal();
  if (e.key == "Delete") clearWithButton();
  if (e.key == "+") getOperator("+");
  if (e.key == "-") getOperator("-");
  if (e.key == "/") getOperator("÷");
  if (e.key == "*") getOperator("×");
  if (e.key == "Enter") {
    finaliseAnswer();
  }
}

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    getNumbers(button.textContent);
  })
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    getOperator(button.textContent);
  })
);
equalButton.addEventListener("click", () => {
  finaliseAnswer();
});
decimalButton.addEventListener("click", () => {
  if (currentDisplay.textContent.split("").includes(".")) {
    return;
  } else {
    addDecimal();
  }
});
clearButton.addEventListener("click", clearWithButton);
allClearButton.addEventListener("click", completeDataClear);
window.addEventListener("keyup", addKeyboardSupport);
