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

/******************************************************************************/

main2();

function main2() {
    const image = document.querySelector('#change_background_and_image #image_part img');
    const imageUrl = document.getElementById('your_image');
    const buttonImg = document.querySelector('#change_background_and_image #image_part button');
    const color = document.querySelector('#your_color');
    const buttonBgr = document.querySelector('#change_background_and_image #background_part button');
    const section = document.querySelector('#change_background_and_image');
    const defaultBackground = window.getComputedStyle(section).backgroundColor;
    const revertBtn = document.querySelector('#change_background_and_image > button');

    renderImage(image, imageUrl, buttonImg);
    changeBackground(color, buttonBgr, section);
    revertChanges(revertBtn, image, defaultBackground, section, imageUrl, color);
}

function renderImage(image, imageUrl, button) {
    button.addEventListener('click', () => {
        if (!imageUrl.value) {
            imageUrl.classList.add('incorrectField');
        } else {
            image.src = imageUrl.value;
        }
    });

    imageUrl.addEventListener('click', () => {
        imageUrl.classList.remove('incorrectField');
    });

    image.addEventListener('error', () => {
        imageUrl.classList.add('incorrectField');
    });
}

function changeBackground(color, button, section) {
    button.addEventListener('click', () => {
        if (!color.value.match(/^\#([\da-fA-F]{3}|[\da-fA-F]{6})$/)) {
            color.classList.add('incorrectField');
        } else {
            section.style.backgroundColor = color.value;
        }
    });

    color.addEventListener('click', () => {
        color.classList.remove('incorrectField');
    });
}

function revertChanges(revertBtn, image, defaultBackground, section, imageUrl, color) {
    revertBtn.addEventListener('click', () => {
        image.src = '#';
        section.style.backgroundColor = defaultBackground;
        imageUrl.value = color.value = "";
    });
}

/********************************************************************************/

main3();

function main3() {
    const hName = document.querySelector('#hname');
    const hValue = document.querySelector('#hvalue');
    const setBtn = document.querySelector('#setHeader');
    const sendBtn = document.querySelector('#send');
    const clearBtn = document.querySelector('#clear');
    let headers = {};
    
    listenHeaders(setBtn, headers, hName, hValue);
    sendRequest(sendBtn, headers);
    clearResultArea(clearBtn);
}

function sendRequest(sendBtn, headers) {
    sendBtn.addEventListener('click', async () => {
        const method = document.querySelector('select').value;
        const url = document.querySelector('#url').value;
        const textAreaRequest = document.querySelector('#dataJson');
        const textAreaResponse = document.querySelector('#response');
        let res = null;

        if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
            res = await fetch(url, { method, headers });
        } else {
            res = await fetch(url, { method, headers, body: textAreaRequest.value });
        }
        let responseHeanders = {};
        for (let [key, value] of res.headers) {
            responseHeanders[key] = value;
        }
        const body = await res.json();
        console.log("**********Response information**********");
        console.log(prettierOutput(JSON.stringify({ ...responseHeanders, ...body.headers})));
        console.log(body.data);
        textAreaResponse.value = prettierOutput(JSON.stringify({ ...responseHeanders, ...body.headers})) + '\n\n' + body.data;
        for (let h in headers) {
            delete headers[h];
        }
        textAreaRequest.value = "";
    });
}

function listenHeaders(setBtn, headers, hName, hValue) {
    setBtn.addEventListener('click', () => {
        headers[hName.value] = hValue.value;
    });
}

function prettierOutput(str) {
    let quote = 0;
    let newStr = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '"' && !(quote % 4)) {
            quote++;
            newStr += '\n' + str[i];
        } else if (str[i] === '"') {
            quote++;
            newStr += str[i];
        } else {
            newStr += str[i];
        }
    }
    return newStr;
}

function clearResultArea(button) {
    button.addEventListener('click', () => {
        document.querySelector('#response').value = "";
    });
}