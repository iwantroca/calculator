const buttons = document.querySelectorAll("button");
const input = document.getElementById("input");
const operatorsNode = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal-btn");
let allNumbers = [];
let operatorsValue = [...operatorsNode].map((x) => x.textContent);
let operatorPosition;
// let input1;
let num1;
let num2;
let currentOperator;

function getInput(e) {
  allNumbers.push(e.target.textContent);
  findOperatorPosition(allNumbers);
}
function findOperatorPosition(arr) {
  operatorPosition = arr.findIndex((x) => operatorsValue.includes(x));
  if (operatorPosition >= 0 && operatorPosition != arr.length - 1) {
    num2 = allNumbers.slice(operatorPosition + 1);
    currentOperator = allNumbers.slice(operatorPosition);
  }
  num1 = parseInt(allNumbers.slice(0, operatorPosition).join(""));
}

buttons.forEach((button) => button.addEventListener("click", getInput));
