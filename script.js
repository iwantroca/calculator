const buttons = document.querySelectorAll("button");
const input = document.getElementById("input");
const operatorsNode = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal-btn");
const resultDisplay = document.querySelector("#result");
let allNumbers = [];
let operatorsValue = [...operatorsNode].map((x) => x.value);
let operatorPosition;
let num1;
let num2;
let currentOperator;
let result = 0;

function getInput(e) {
  allNumbers.push(e.target.textContent);
  findOperatorPosition(allNumbers);
}
function findOperatorPosition(arr) {
  operatorPosition = arr.findIndex((x) => operatorsValue.includes(x));
  if (operatorPosition >= 0 && operatorPosition != arr.length - 1) {
    num2 = parseInt(allNumbers.slice(operatorPosition + 1).join(""));
    currentOperator = allNumbers[operatorPosition];
  }
  num1 = result || parseInt(allNumbers.slice(0, operatorPosition).join(""));
}
function doCalculation(operator, input1, input2) {
  switch (operator) {
    case "+":
      result = input1 + input2;
      break;
    case "-":
      result = input1 - input2;
      break;
    case "*":
      result = input1 * input2;
      break;
    case "/":
      result = input1 / input2;
      break;
    case "%":
      result = input1 / 100;
      break;
    default:
      console.log("error");
  }
}

buttons.forEach((button) => button.addEventListener("click", getInput));
equalButton.addEventListener("click", () => {
  doCalculation(currentOperator, num1, num2);
});
