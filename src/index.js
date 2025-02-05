import './styles/style.css';
import { isValidCardNumber } from './cardValidator';
import { getCardType } from './cardType';

import visaLogo from './assets/visa.png';
import mastercardLogo from './assets/mastercard.png';
import amexLogo from './assets/amex.png';
import mirLogo from './assets/mir.png';

const cardLogos = {
    visa: document.getElementById('visa-logo'),
    mastercard: document.getElementById('mastercard-logo'),
    amex: document.getElementById('amex-logo'),
    mir: document.getElementById('mir-logo')
};

const input = document.getElementById('card-number');
const validateButton = document.getElementById('validate-button');
const validationMessage = document.getElementById('validation-message');

document.addEventListener('DOMContentLoaded', () => {
    cardLogos.visa.src = visaLogo;
    cardLogos.mastercard.src = mastercardLogo;
    cardLogos.amex.src = amexLogo;
    cardLogos.mir.src = mirLogo;

    Object.values(cardLogos).forEach(logo => logo.classList.add('active'));
});

input.addEventListener('input', () => {
    const cardNumber = input.value.trim();
    const cardType = getCardType(cardNumber);

    Object.values(cardLogos).forEach(logo => logo.classList.remove('active', 'dimmed'));

    if (cardType !== 'unknown' && cardLogos[cardType]) {
        Object.values(cardLogos).forEach(logo => logo.classList.add('dimmed'));
        cardLogos[cardType].classList.add('active');
    } else {
        Object.values(cardLogos).forEach(logo => logo.classList.add('active'));
    }
});

validateButton.addEventListener('click', () => {
    const cardNumber = input.value.trim();
    const isValid = isValidCardNumber(cardNumber);
    
    validationMessage.textContent = isValid ? '✅ Card number is valid' : '❌ Invalid card number';
    validationMessage.style.color = isValid ? 'green' : 'red';
});
