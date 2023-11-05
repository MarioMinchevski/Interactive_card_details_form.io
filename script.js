'use strict';

//global variables

const cardNumberFront = document.getElementById('cardNumber');
const cardUserNameFront = document.getElementById('userCardName');
const cardExpiryMonthFront = document.getElementById('expDateMonthFront');
const cardExpiryYearFront = document.getElementById('expDateYearFront');
const cardCvcNumFront = document.getElementById('cvcNum');

const cardForm = document.querySelector('.card-form');
const userName = document.getElementById('username');
const userNumber = document.getElementById('userCardNumber')
const expDateMonth = document.getElementById('expDateMonth');
const expDateYear = document.getElementById('expDateYear');
const cvcNumber = document.getElementById('cvc');
const thankYouBox = document.querySelector('.thank-you-box')
const thankYouBtn = document.getElementById('thankYouBtn');

// error and success messages/classes

const setError = (input, message) => {
    const inputControl = input.parentElement;
    const displayMessage = inputControl.querySelector('.message');

    inputControl.classList.add('error');
    displayMessage.textContent = message;
}

const setErrorForDates = (input, message) => {
    const inputControl = input.closest('.form-group');
    const displayMessage = inputControl.querySelector('.message');

    inputControl.classList.add('error');
    displayMessage.textContent = message;
}

const setSuccess = (input, message) => {
    const inputControl = input.parentElement;
    const displayMessage = inputControl.querySelector('.message');

    inputControl.classList.remove('error');
    displayMessage.textContent = message;
}

const setSuccessForDates = (input, message) => {
    const inputControl = input.closest('.form-group');
    const displayMessage = inputControl.querySelector('.message');

    inputControl.classList.remove('error');
    displayMessage.textContent = message;
}

//input regexs

const validName = (value) => {
    return value.trim() !== "" && /^[a-zA-Z\s]*$/.test(value);
}

const validNumber = (value) => {
    const regex = /^\d{16}$/;
    return regex.test(value);
}

const validMonth = (value) => {
    const numberRegex = /^\d+$/;

    if (numberRegex.test(value)) {
        const number = parseInt(value);
        return number >= 1 && number <= 12;
    } else {
        return false;
    }
}

const validYear = (value) => {
    const numberRegex = /^\d+$/;

    if (numberRegex.test(value)) {
        const number = parseInt(value);
        return number >= 21 && number <= 29;
    } else {
        return false;
    }
}

// input validation func 

const validateInputs = () => {
    const cardNameValue = userName.value.trim();
    const cardNumberValue = userNumber.value.trim()
    const cardExpDateMonthValue = expDateMonth.value.trim();
    const cardExpDateYearValue = expDateYear.value.trim();
    const cardCvcValue = cvcNumber.value.trim();

    if (cardNameValue === '') {
        setError(userName, "Can't be blank");
    } else if (!validName(cardNameValue)) {
        setError(userName, "Wrong format, text only");
    } else {
        setSuccess(userName);
    }

    if (cardNumberValue === '') {
        setError(userNumber, "Can't be blank");
    } else if (cardNumberValue.length < 16) {
        setError(userNumber, "Number must be 16 digits");
    } else {
        setSuccess(userNumber);
    }

    if (cardExpDateYearValue === '') {
        setErrorForDates(expDateYear, "Can't be blank");
    } else if (!validYear(cardExpDateYearValue)) {
        setErrorForDates(expDateYear, "Invalid year");
    }

    if (cardExpDateMonthValue === '') {
        setErrorForDates(expDateMonth, "Can't be blank");
    } else if (!validMonth(cardExpDateMonthValue)) {
        setErrorForDates(expDateMonth, "Invalid month");
    }

    if (validMonth(cardExpDateMonthValue) && validYear(cardExpDateYearValue)) {
        setSuccessForDates(expDateMonth);
        setSuccessForDates(expDateYear);
    }

    if (cardCvcValue === '') {
        setError(cvcNumber, "Can't be blank")
    } else if (cardCvcValue.length < 3) {
        setError(cvcNumber, "Number must be 3 digits")
    } else {
        setSuccess(cvcNumber)
    }

    const formFilledCorrectly =
        validName(cardNameValue) &&
        cardNameValue !== '' &&
        validNumber(cardNumberValue) &&
        cardNumberValue !== '' &&
        validMonth(cardExpDateMonthValue) &&
        cardExpDateMonthValue !== '' &&
        validYear(cardExpDateYearValue) &&
        cardExpDateYearValue !== '' &&
        cardCvcValue !== '';

    if (formFilledCorrectly) {
        cardForm.classList.add('displayNone');
        thankYouBox.classList.remove('displayNone');

        cardForm.reset();
        setFieldsToInitialValues();
    }
}

// instant validation 

const validateInput = (element, validationFunction, errorMessage) => {
    const value = element.value.trim();
    const isValid = validationFunction(value);

    if (isValid) {
        setSuccess(element);
    } else {
        setError(element, errorMessage);
    }
}

const validateInputDates = (element, validationFunction, errorMessage) => {
    const value = element.value.trim();
    const isValid = validationFunction(value);

    if (isValid) {
        setSuccessForDates(element);
    } else {
        setErrorForDates(element, errorMessage);
    }
}

const userNameInputHandler = () => {
    validateInput(userName, validName, "Wrong format, text only");
}

const monthInputHandler = () => {
    validateInputDates(expDateMonth, validMonth, "Invalid month");
}

const yearInputHandler = () => {
    validateInputDates(expDateYear, validYear, "Invalid year");
}

userName.addEventListener('input', userNameInputHandler);
expDateMonth.addEventListener('input', monthInputHandler);
expDateYear.addEventListener('input', yearInputHandler);

// input num limitations 

userNumber.addEventListener('input', () => {
    const currentValue = userNumber.value;
    if (currentValue.length > 16) {

        userNumber.value = currentValue.slice(0, 16);
    }
});

expDateMonth.addEventListener('input', () => {
    const currentValue = expDateMonth.value;
    if (currentValue.length > 2) {

        expDateMonth.value = currentValue.slice(0, 2);
    }
});

expDateYear.addEventListener('input', () => {
    const currentValue = expDateYear.value;
    if (currentValue.length > 2) {

        expDateYear.value = currentValue.slice(0, 2);
    }
});

cvcNumber.addEventListener('input', () => {
    const currentValue = cvcNumber.value;
    if (currentValue.length > 3) {

        cvcNumber.value = currentValue.slice(0, 3);
    }
});

// keyboard keys that are allowed when the input is fully filled 

userNumber.addEventListener('keydown', (e) => {
    if (expDateYear.value.length >= 16 && e.key !== "Backspace" && !/^\d$/.test(e.key) && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        e.preventDefault();
    }
})

expDateYear.addEventListener('keydown', (e) => {
    if (expDateYear.value.length >= 2 && e.key !== "Backspace" && !/^\d$/.test(e.key) && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        e.preventDefault();
    }
})

expDateYear.addEventListener('keydown', (e) => {
    if (expDateYear.value.length >= 2 && e.key !== "Backspace" && !/^\d$/.test(e.key) && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        e.preventDefault();
    }
})

cvcNumber.addEventListener('keydown', (e) => {
    if (cvcNumber.value.length >= 3 && e.key !== "Backspace" && !/^\d$/.test(e.key) && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        e.preventDefault();
    }
});

// live card update 

const setCardName = (e) => {
    cardUserNameFront.innerText = format(e.target.value);
}

const setCardNumber = (e) => {
    cardNumberFront.innerText = format(e.target.value);
}

const setCardExpMonth = (e) => {
    cardExpiryMonthFront.innerText = format(e.target.value);
}

const setCardExpYear = (e) => {
    cardExpiryYearFront.innerText = format(e.target.value);
}

const setCardCvc = (e) => {
    cardCvcNumFront.innerText = format(e.target.value);
}

userName.addEventListener("input", setCardName);
userNumber.addEventListener("input", setCardNumber);
expDateMonth.addEventListener("input", setCardExpMonth);
cvcNumber.addEventListener("input", setCardCvc);

const format = (e) => {
    return e.toString().replace(/\d{4}(?=.)/g, "$& ");
}

// default initial text if input is emptied 

userNumber.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    const formattedValue = format(inputValue);

    if (inputValue.length === 0) {
        cardNumberFront.innerText = '0000 0000 0000 0000';
    } else {
        cardNumberFront.innerText = formattedValue;
    }
});

expDateMonth.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    const formattedValue = format(inputValue);

    if (inputValue.length === 0) {
        cardExpiryMonthFront.innerText = '00';
    } else {
        cardExpiryMonthFront.innerText = formattedValue;
    }
});

expDateYear.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    const formattedValue = format(inputValue);

    if (inputValue.length === 0) {
        cardExpiryYearFront.innerText = '00';
    } else {
        cardExpiryYearFront.innerText = formattedValue;
    }
});

cvcNumber.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    const formattedValue = format(inputValue);

    if (inputValue.length === 0) {
        cvcNum.innerText = '000';
    } else {
        cvcNum.innerText = formattedValue;
    }
});

cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
})

thankYouBtn.addEventListener('click', () => {
    cardForm.classList.remove('displayNone');
    thankYouBox.classList.add('displayNone')
})

const setFieldsToInitialValues = () => {
    cardNumberFront.innerText = '0000 0000 0000 0000';
    cardUserNameFront.innerText = 'felicia leire';
    cardExpiryMonthFront.innerText = '00';
    cardExpiryYearFront.innerText = '00';
    cardCvcNumFront.innerText = '000';
}

