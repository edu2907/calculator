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
let number_buttons = Array.from(document.getElementsByClassName('number'))
number_buttons.sort((btnA, btnB) => {
    if (Number(btnA.textContent) > Number(btnB.textContent)) {
        return 1;
    } else {
        return -1
    }
})

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
    screenNum.innerText = cutStr(newNum, 8)
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

//Operator buttons
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
            screenPreviousNum.innerText = cutStr(newNum, 22) + operator.sign
            screenNum.innerText = '0'
            operation.firstNum = Number(newNum)
            operation.calc = operator.calc
            newNum = ''
        } else {
            screenNum.innerText = cutStr(newNum, 8)
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
    screenNum.innerText = cutStr(newNum, 8)
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
        screenNum.innerText = cutStr(newNum, 8)
    }
}

// Change Signal Button
const changeSignBtn = document.getElementById('changeSign')
changeSignBtn.addEventListener('click', changeSign)
function changeSign() {
    if (!newNum == 0) {
        if (!newNum.includes('-')) {
            newNum = newNum.padStart(newNum.length + 1, '-')
            screenNum.innerText = cutStr(newNum, 8)
        } else {
            newNum = newNum.replace('-', '')
            screenNum.textContent = cutStr(newNum, 8)
        }
    }
}

function cutStr(str, maxLength) {
    if (newNum.includes('-') && str.length > 8) {
        let sign = str[0]
        maxLength--
        let startIndex = str.length - maxLength
        return sign + str.slice(startIndex)
    } else {
        let startIndex = str.length > maxLength ? str.length - maxLength : 0
        return str.slice(startIndex)
    }
}

// Keyboard Support
const allButtons = Array.from(document.getElementsByClassName('button'))
document.addEventListener('keydown', (event) => {
    const isNumber = number_buttons.some(button => {
        return button.textContent == event.key
    })
    const operatorCheck = key => {
        let exists = false
        for (operator in opList) {
            if (opList[operator].sign == key) {
                exists = true
                var obj = opList[operator]
            }
        }
        return {exists, obj}
    }
    const op = operatorCheck(event.key)
    if (event.key == "Backspace") {
        backspace()
    } else if (event.key == "c") {
        reset()
    } else if (event.key == "=" || event.key == "Enter") {
        operate()
    } else if (isNumber) {
        storeAlg(Number(event.key))
    } else if (op.exists) {
        addOperator(op.obj)
    }
})
