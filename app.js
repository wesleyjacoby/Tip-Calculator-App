const form = document.querySelector('.main-form');

let bill = document.querySelector('#bill');
const billContainer = document.querySelector('.bill-container');

const tipPercentBox = document.querySelectorAll('.tip-percentage');
const tipPercentAndLabel = document.querySelectorAll('input[type="radio"]');
let customPercent = document.querySelector('#custom');
let numPeople = document.querySelector('#people');

const billError = document.querySelector('.bill-error');
const peopleError = document.querySelector('.people-error');

const button = document.querySelector('button');

const tipNumber = document.querySelector('.tip');
const totalNumber = document.querySelector('.total');

let tip = 0;

button.addEventListener('click', (e) => {
    e.preventDefault();

    form.reset();
    numPeople.disabled = true;
    button.disabled = true;

    tipNumber.textContent = '$0.00';
    totalNumber.textContent = '$0.00';

    billError.textContent = '';
    peopleError.textContent = '';

    if ((window.innerWidth || document.documentElement.clientWidth) < 768) {
        billContainer.style.marginBottom = '32px'
        billError.textContent = ''
    }
    else {
        billContainer.style.marginBottom = '40px'
        billError.textContent = '';
    }
})

bill.addEventListener('keyup', () => {
    checkBill(bill.value);
})

customPercent.addEventListener('click', () => {
    tipPercentAndLabel.forEach(box => {
        box.checked = false;
    })
})

customPercent.addEventListener('keyup', () => {
    checkCustomTip(customPercent.value);
})

numPeople.addEventListener('keyup', () => {
    checkNumPeople(numPeople.value);
})

function checkBill(bill) {

    bill = parseFloat(bill);

    if (bill < 0) {
        billContainer.style.marginBottom = '16px';
        billError.textContent = 'Seriously?';
        numPeople.disabled = true;
    } else if (bill === 0) {
        billContainer.style.marginBottom = '16px';
        billError.textContent = "Can't be zero";
        numPeople.disabled = true;
    } else {
        if ((window.innerWidth || document.documentElement.clientWidth) < 768) {
            billContainer.style.marginBottom = '32px'
            billError.textContent = ''
            numPeople.disabled = false;
            button.disabled = false;
        }
        else {
            billContainer.style.marginBottom = '40px'
            billError.textContent = '';
            numPeople.disabled = false;
            button.disabled = false;
        }
    }
}

function checkCustomTip(percent) {

    percent = parseFloat(percent);

    if (percent < 0 || typeof (percent) !== 'number' || percent > 100) {
        customPercent.style.border = '2px solid hsla(13, 70%, 61%, 1)'
        numPeople.disabled = true;
    } else {
        customPercent.style.border = '2px solid hsl(189, 41%, 97%)'
        numPeople.disabled = false;
        button.disabled = false;
    }
}

function checkNumPeople(people) {
    people = parseFloat(numPeople.value);

    if (people < 0) {
        numPeople.style.border = '2px solid hsla(13, 70%, 61%, 1)';
        peopleError.textContent = 'Really?'
    } else if (people === 0) {
        numPeople.style.border = '2px solid hsla(13, 70%, 61%, 1)';
        peopleError.textContent = "Can't be zero";
    } else if (isNaN(people)) {
        numPeople.style.border = '2px solid hsl(189, 41%, 97%)';
        peopleError.textContent = '';
        tipNumber.textContent = '$0.00';
        totalNumber.textContent = '$0.00';
    } else {
        numPeople.style.border = '2px solid hsl(189, 41%, 97%)';
        peopleError.textContent = '';

        calculateTip(tip, customPercent.value);

        tipNumber.textContent = tipPerPerson(bill.value, tip, numPeople.value);
        totalNumber.textContent = totalPerPerson(bill.value, tip, numPeople.value);
    }
}

tipPercentBox.forEach(box => {
    box.addEventListener('click', () => {
        tip = box.textContent.replace('%', '');
    })
})

function calculateTip(tip, customTip) {
    if (customTip > 0) {
        tip = customTip;
    }
    return tip;
}

function tipPerPerson(bill, tip, people) {
    const tipPerPerson = (((bill * tip) / 100) / people).toFixed(2);

    return `$${tipPerPerson}`;
}

function totalPerPerson(bill, tip, people) {
    const totalBill = ((bill * tip) / 100) + parseFloat(bill);

    const totalPerPerson = (totalBill / people).toFixed(2);

    return `$${totalPerPerson}`;
}