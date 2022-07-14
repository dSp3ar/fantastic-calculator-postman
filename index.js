main();

function main() {
    const firstNumber = document.getElementById('first_number');
    const secondNumber = document.getElementById('second_number');
    const result = document.getElementById('result');
    const [ sumBtn, subtractBtn, multiplyBtn, divideBtn ] = document.querySelectorAll('#operations button');
    const [ clearFieldsBtn, showAlertBtn, showPromptBtn ] = document.querySelectorAll('#controls button');
    const operations = {
        sum: { sign: '+', reference: sumBtn },
        subtract: { sign: '-', reference: subtractBtn },
        multiply: { sign: '*', reference: multiplyBtn },
        divide: { sign: '/', reference: divideBtn }
    };

    blockInput(firstNumber, secondNumber, sumBtn, subtractBtn, multiplyBtn, divideBtn);
    calculateResult(firstNumber, secondNumber, result, operations);
    clearFields(clearFieldsBtn, firstNumber, secondNumber, result);
    showAlert(showAlertBtn);
    showPrompt(showPromptBtn);
}

function calculateResult(firstNumber, secondNumber, result, operations) {
    Object.values(operations).forEach(({ sign, reference }) => {
        reference.addEventListener('click', function() {
            if (!firstNumber.value.match(/^[-+]?\d+[.,]?\d*$/)) {
                firstNumber.classList.add('incorrectField');
            }

            if (!secondNumber.value.match(/^[-+]?\d+[.,]?\d*$/)) {
                secondNumber.classList.add('incorrectField');
            }

            if (firstNumber.value.match(/^[-+]?\d+[.,]?\d*$/) && secondNumber.value.match(/^[-+]?\d+[.,]?\d*$/)) {
                switch (sign) {
                    case '+': {
                        result.value = Number(firstNumber.value) + Number(secondNumber.value);
                        break;
                    }
                    case '-': {
                        result.value = Number(firstNumber.value) - Number(secondNumber.value);
                        break;
                    }
                    case '*': {
                        result.value = Number(firstNumber.value) * Number(secondNumber.value);
                        break;
                    }
                    case '/': {
                        result.value = Number(firstNumber.value) / Number(secondNumber.value);
                        break;
                    }
                    default: {
                        firstNumber.classList.add('incorrectField');
                        secondNumber.classList.add('incorrectField');
                    }
                }

                firstNumber.classList.remove('incorrectField');
                secondNumber.classList.remove('incorrectField');
            }
        });
    });
}

function blockInput(firstNumber, secondNumber, ...buttons) {
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!firstNumber.value || !secondNumber.value) {
                button.classList.add('disabledBtn');
                button.disabled = true;
                if (!firstNumber.value) {
                    firstNumber.classList.add('blank');
                }
                if (!secondNumber.value) {
                    secondNumber.classList.add('blank');
                }
            }
        });

        button.addEventListener('mouseleave', () => {
            button.classList.remove('disabledBtn');
            firstNumber.classList.remove('blank');
            secondNumber.classList.remove('blank');
            button.disabled = false;
        });
    });
}

function clearFields(clearFieldsBtn, ...fields) {
    clearFieldsBtn.addEventListener('click', () => {
        fields.forEach(field => field.classList.remove('incorrectField') || (field.value = ""));
    }); 
}

function showAlert(showAlertBtn) {
    showAlertBtn.addEventListener('click', () => {
        alert("Hey-hey! This calculator might be better than your Windows's one :)");
    });
}

function showPrompt(showPromptBtn) {
    showPromptBtn.addEventListener('click', () => {
        let mood = prompt("Hey man, I'm interested in you! How's going?");
        alert(`'${mood}', blah-blah... You are boring, bye!`);
    });
}