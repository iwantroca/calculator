const buttons = document.querySelectorAll("button");
const input = document.getElementById("input");
const operatorsNode = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal-btn");
const resultDisplay = document.querySelector("#result");
const decimalButton = document.querySelector("#decimal-btn");
let allNumbers = [];
let operatorsValue = [...operatorsNode].map((x) => x.value);
let operatorPosition;
let num1;
let num2;
let currentOperator;
let result = 0;

function getInput(e) {
  allNumbers.push(e.target.value);
  findOperatorPosition(allNumbers);
  splitOperators(allNumbers);
}
function addDecimal(e) {
  allNumbers.push(".");
}
function findOperatorPosition(arr) {
  operatorPosition = arr.findIndex((x) => operatorsValue.includes(x));
  if (operatorPosition >= 0) {
    for (let i = arr.length - 1; i >= 0; --i) {
      if (operatorsValue.includes(arr[i])) {
        operatorPosition = i;
        break;
      }
    }
  }
  return operatorPosition;
}
function clearAllInput() {
  allNumbers = [];
  currentOperator = "";
  num2 = "";
}
function splitOperators(arr) {
  // if (isNaN(num2)) num2 = "";
  if (operatorPosition >= 0) {
    // if (operatorPosition >= 0 && operatorPosition != arr.length - 1) {
    num2 = parseFloat(allNumbers.slice(operatorPosition + 1).join(""));

    currentOperator = allNumbers[operatorPosition];
  }
  //parseInt(allNumbers.slice(0, operatorPosition).join(""))
  num1 = result || parseFloat(allNumbers.slice(0).join(""));
  if (isNaN(num2)) {
    console.log(`${num1} ${currentOperator ?? ""}`);
  } else {
    console.log(`${num1} ${currentOperator ?? ""} ${num2 ?? ""}`);
  }
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
      // console.log("error");
      result = num1;
  }
}

decimalButton.addEventListener("click", addDecimal);
buttons.forEach((button) => button.addEventListener("click", getInput));
equalButton.addEventListener("click", () => {
  if (!isNaN(num2)) {
    doCalculation(currentOperator, num1, num2);
  } else {
    result = num1;
  }
  clearAllInput();
});
