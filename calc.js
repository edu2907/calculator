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
        storeNumber(number_buttons.indexOf(button))
    })
})
let operation = ''
storeNumber = (algarism) => {
    operation += String(algarism)
    updateScreen(operation)
}
const screen = document.querySelector("#screen > span") 
updateScreen =  operation => {
    screen.innerText = operation
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