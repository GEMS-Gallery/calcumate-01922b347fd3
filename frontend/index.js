import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let currentOperation = null;
let firstOperand = null;

window.appendToDisplay = (value) => {
    display.value += value;
};

window.appendEmoji = (emoji) => {
    display.value += emoji;
};

window.clearDisplay = () => {
    display.value = '';
    currentOperation = null;
    firstOperand = null;
};

window.setOperation = (operation) => {
    if (display.value !== '') {
        firstOperand = parseFloat(display.value);
        currentOperation = operation;
        display.value = '';
    }
};

window.calculate = async () => {
    if (firstOperand !== null && currentOperation !== null && display.value !== '') {
        const secondOperand = parseFloat(display.value);
        try {
            const result = await backend.calculate(currentOperation, firstOperand, secondOperand);
            display.value = result.toString();
        } catch (error) {
            console.error('Error during calculation:', error);
            display.value = 'Error';
        }
        currentOperation = null;
        firstOperand = null;
    }
};
