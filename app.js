const bill = document.querySelector('#bill');
const billContainer = document.querySelector('.bill-container');

const tipPercentBox = document.querySelectorAll('.tip-percentage');
const customPercent = document.querySelector('#custom');
const numPeople = document.querySelector('#people');

const billError = document.querySelector('.bill-error');
const peopleError = document.querySelector('.people-error');

const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    e.preventDefault();

    checkBill(bill.value);
    checkCustomTip(customPercent.value);
})

function checkBill(bill) {
    console.log(bill);
    if (bill < 0) {
        billContainer.style.marginBottom = '16px';
        return billError.textContent = 'Seriously?';
    } else if (bill === '0') {
        billContainer.style.marginBottom = '16px';
        return billError.textContent = "Can't be zero";
    } else if (bill === '') {
        billContainer.style.marginBottom = '16px';
        return billError.textContent = 'Something went wrong';
    } else {
        billContainer.style.marginBottom = '40px'
        return billError.textContent = '';
    }
}

function checkCustomTip(percent) {
    console.log(customPercent.value)
    if (percent < 0 || percent > 100) {
        return customPercent.style.border = '2px solid hsla(13, 70%, 61%, 1)';
    } else {
        return customPercent.style.border = '2px solid hsl(189, 41%, 97%)';
    }
}

// customPercent.addEventListener('keyup', () => {
//     console.log(customPercent.value);

//     if (customPercent.value < 0 || customPercent.value > 100) {
//         customPercent.style.border = '2px solid hsla(13, 70%, 61%, 1)';
//     } else if (/\D/g.test(customPercent.value === true)) {
//         customPercent.style.border = '2px solid hsla(13, 70%, 61%, 1)';
//     } else {
//         customPercent.style.border = '2px solid hsl(189, 41%, 97%)';
//     }
// })

numPeople.addEventListener('keyup', () => {
    console.log(numPeople.value);
})

tipPercentBox.forEach(box => {
    box.addEventListener('click', () => {
        console.log(box.textContent);
    })
})