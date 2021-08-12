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

// add eventlisterner to operators buttons so that if currentDisplay is true and
// firstOperand is true
// then take the new Operator and textcontent as second operand

function getNumbers(num) {
  currentDisplay.textContent += num;
}
function getOperator(operator) {
  // firstOperand = currentDisplay.textContent || result;
  firstOperand = result || currentDisplay.textContent;

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
  }
}
function updateLastDisplay() {
  lastDisplay.textContent = `${firstOperand} ${currentOperator} ${secondOperand}`;
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
  if (currentOperator) {
    secondOperand = currentDisplay.textContent;
    doCalculation(currentOperator, firstOperand, secondOperand);
    currentDisplay.textContent = result;
    updateLastDisplay();
    firstOperand = result;
    secondOperand = "";
    currentOperator = "";
  }
});
