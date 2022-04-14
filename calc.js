const operation = {
    firstNum: 0, 
    calc: null,
    secondNum: 0,
}
const screenNum = document.querySelector("#screen > #num") 
const screenPreviousNum = document.querySelector("#screen > #previousNum")

//Numbers Buttons
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

//Operators button
const opList = {
    add: {
        button: document.getElementById('add'),
        sign: '+',
        calc: () => operation.firstNum + operation.secondNum
    },
    subtract: {
        button: document.getElementById('subtract'),
        sign: '-',
        calc: () => operation.firstNum - operation.secondNum
    },
    multiply: {
        button: document.getElementById('multiply'),
        sign: 'x',
        calc: () => operation.firstNum * operation.secondNum
    },
    divide: {
        button: document.getElementById('divide'),
        sign: '/',
        calc: () => operation.firstNum / operation.secondNum
    },
}
for(let operator in opList) {
    opList[operator].button.addEventListener('click', function() { 
        addOperator(opList[operator])
    })
}
let opIsBeingUsed = false
function addOperator (operator) {
    if(opIsBeingUsed) {
    operation.secondNum = Number(newNum)
    newNum = String(operation.calc())
    } else {
        opIsBeingUsed = true
    }
    screenPreviousNum.innerText = newNum + operator.sign
    screenNum.innerText = '0'
    operation.firstNum = Number(newNum)
    operation.calc = operator.calc
    newNum = ''
}

// Operate Button
const operateBtn = document.getElementById('operate')
operateBtn.addEventListener('click', operate)
function operate() {
    operation.secondNum = Number(newNum)
    newNum = String(operation.calc())
    screenNum.innerText = newNum
    operation.calc = null
    opIsBeingUsed = false
    screenPreviousNum.innerText = ''
}
