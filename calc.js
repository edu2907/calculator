const screenNum = document.querySelector("#screen > #num") 
const screenPreviousNum = document.querySelector("#screen > #previousNum")
const number_buttons = [
    document.getElementById('zero'),
    document.getElementById('one'),
    document.getElementById('two'),
    document.getElementById('three'),
    document.getElementById('four'),
    document.getElementById('five'),
    document.getElementById('six'),
    document.getElementById('seven'),
    document.getElementById('eight'),
    document.getElementById('nine'),
]
number_buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        storeAlg(number_buttons.indexOf(button))
    })
})
let newNum = ''
storeAlg = (algarism) => {
    newNum += String(algarism)
    screenNum.innerText = newNum   
}

const opList = {
    add: {
        button: document.getElementById('add'),
        sign: '+'
    },
    subtract: {
        button: document.getElementById('subtract'),
        sign: '-',
    },
    multiply: {
        button: document.getElementById('multiply'),
        sign: 'x',
    },
    divide: {
        button: document.getElementById('divide'),
        sign: '/',
    },
}
for(let operator in opList) {
    opList[operator].button.addEventListener('click', function() { 
        addOperator(opList[operator])
    })
}
function addOperator (operator) {
    screenPreviousNum.innerText = newNum + operator.sign
    newNum = ''
    screenNum.innerText = '0'
}

function add(num1, num2) {
    return num1 + num2
}
function subtract(num1, num2) {
    return num1 - num2
}
function multiply(num1, num2) {
    return num1 * num2
}
function divide(num1, num2) {
    return num1 / num2
}
function operate(operator, num1, num2,) {
    return operator(num1, num2)
}