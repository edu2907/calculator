let opIsBeingUsed = false
const operation = {
    firstNum: null,
    calc: null,
    secondNum: null,
}
const screenNum = document.querySelector("#screen > #num")
const screenPreviousNum = document.querySelector("#screen > #previousNum")
let newNum = ''

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
storeAlg = (algarism) => {
    if (newNum == Infinity || (operateBtnPressed == true && opIsBeingUsed == false)) {
        reset()
    }
    newNum += String(algarism)
    screenNum.innerText = newNum
}

//Float button 
const floatBtn = document.getElementById('float')
floatBtn.addEventListener('click', function () {
    canUseFloat('.')
})
function canUseFloat(float) {
    if (newNum == Infinity) reset()
    if (newNum == '' || newNum.includes('.')) {
        //do nothing
    } else {
        storeAlg(float)
    }
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
        calc: () => {
            let result = operation.firstNum * operation.secondNum
            const resStr = String(result);
            if (!resStr.includes('.')) {
                return result
            } else {
                const resLength = resStr.split('.')[1].length;
                if (resLength > 4) {
                    return result.toPrecision(4)
                } else {
                    return result
                }
            }
        }
    },
    divide: {
        button: document.getElementById('divide'),
        sign: '/',
        calc: () => {
            if (operation.secondNum == 0) {
                return Infinity
            } else {
                let result = operation.firstNum / operation.secondNum
                const resStr = String(result);
                if (!resStr.includes('.')) {
                    return result
                } else {
                    const resLength = resStr.split('.')[1].length;
                    if (resLength > 4) {
                        return result.toPrecision(4)
                    } else {
                        return result
                    }
                }
            }
        }
    },
}
for (let operator in opList) {
    opList[operator].button.addEventListener('click', function () {
        addOperator(opList[operator])
    })
}
function addOperator(operator) {
    if (newNum == Infinity) {
        reset()
    } else {
        if (newNum == '') {
            newNum = '0'
        }
        if (opIsBeingUsed) {
            operation.secondNum = Number(newNum)
            newNum = String(operation.calc())
        } else {
            opIsBeingUsed = true
        }
        if (newNum != Infinity) {
            screenPreviousNum.innerText = newNum + operator.sign
            screenNum.innerText = '0'
            operation.firstNum = Number(newNum)
            operation.calc = operator.calc
            newNum = ''
        } else {
            screenNum.innerText = newNum
            screenPreviousNum.innerText = ''
        }
    }
}

// Operate Button
const operateBtn = document.getElementById('operate')
let operateBtnPressed = false
operateBtn.addEventListener('click', operate)
function operate() {
    operation.secondNum = Number(newNum)
    newNum = String(operation.calc())
    screenNum.innerText = newNum
    operation.calc = null
    opIsBeingUsed = false
    operateBtnPressed = true
    screenPreviousNum.innerText = ''
}

// Clear Button 
const clearBtn = document.getElementById('clear')
clearBtn.addEventListener('click', reset)
function reset() {
    for (let child in operation) {
        operation[child] = null
    }
    newNum = ''
    opIsBeingUsed = false
    operateBtnPressed = false
    screenNum.innerText = '0'
    screenPreviousNum.innerText = ''
}

//Backspace Button
const backBtn = document.getElementById('backspace')
backBtn.addEventListener('click', backspace)
function backspace() {
    if (newNum == Infinity || operateBtnPressed == true) {
        reset()
    }
    else if (!newNum == '') {
        newNum = newNum.slice(0, -1)
        screenNum.innerText = newNum
    }
}

// Change Signal Button
const changeSignBtn = document.getElementById('changeSign')
changeSignBtn.addEventListener('click', changeSign)
function changeSign() {
    if (!newNum == 0) {
        if (!newNum.includes('-')) {
            newNum = newNum.padStart(newNum.length + 1, '-')
            screenNum.innerText = newNum
        } else {
            screenNum.textContent = newNum
        }
    }
}