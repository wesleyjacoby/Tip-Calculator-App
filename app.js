const form = document.querySelector('.main-form');

const bill = document.querySelector('#bill');
const billContainer = document.querySelector('.bill-container');

const tipPercentBox = document.querySelectorAll('.tip-percentage');
const customPercent = document.querySelector('#custom');
const numPeople = document.querySelector('#people');

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
})

bill.addEventListener('keyup', () => {
    checkBill(bill.value);
    numPeople.disabled = false;
    button.disabled = false;
})

customPercent.addEventListener('keyup', () => {
    checkCustomTip(customPercent.value);
})

numPeople.addEventListener('keyup', () => {
    checkNumPeople(numPeople.value);

    calculateTip(tip, customPercent.value);

    tipNumber.textContent = tipPerPerson(bill.value, tip, numPeople.value);
    totalNumber.textContent = totalPerPerson(bill.value, tip, numPeople.value);
})

function checkBill(bill) {

    if (bill < 0) {
        billContainer.style.marginBottom = '16px';
        return billError.textContent = 'Seriously?';
    } else if (bill === '0') {
        billContainer.style.marginBottom = '16px';
        return billError.textContent = "Can't be zero";
    } else {
        if ((window.innerWidth || document.documentElement.clientWidth) < 768) {
            billContainer.style.marginBottom = '32px'
            return billError.textContent = ''
        }
        else {
            billContainer.style.marginBottom = '40px'
            return billError.textContent = '';
        }
    }
}

function checkCustomTip(percent) {
    console.log(percent);

    if (percent < 0 || percent > 100) {
        return customPercent.style.border = '2px solid hsla(13, 70%, 61%, 1)';
    } else {
        return customPercent.style.border = '2px solid hsl(189, 41%, 97%)';
    }
}

function checkNumPeople(people) {

    if (people < 0) {
        numPeople.style.border = '2px solid hsla(13, 70%, 61%, 1)';
        return peopleError.textContent = 'Really?'
    } else if (people === '0') {
        numPeople.style.border = '2px solid hsla(13, 70%, 61%, 1)';
        return peopleError.textContent = "Can't be zero";
    } else {
        numPeople.style.border = '2px solid hsl(189, 41%, 97%)';
        return peopleError.textContent = '';
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

        return tip;
    }
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