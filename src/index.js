import './styles/style.css';
import { isValidCardNumber } from './cardValidator';
import { getCardType } from './cardType';

// Импортируем изображения
import visaLogo from './assets/visa.png';
import mastercardLogo from './assets/mastercard.png';
import amexLogo from './assets/amex.png';
import mirLogo from './assets/mir.png';

// Найдём элементы DOM
const cardLogos = {
    visa: document.getElementById('visa-logo'),
    mastercard: document.getElementById('mastercard-logo'),
    amex: document.getElementById('amex-logo'),
    mir: document.getElementById('mir-logo')
};

const input = document.getElementById('card-number');
const validateButton = document.getElementById('validate-button');

document.addEventListener('DOMContentLoaded', () => {
    cardLogos.visa.src = visaLogo;
    cardLogos.mastercard.src = mastercardLogo;
    cardLogos.amex.src = amexLogo;
    cardLogos.mir.src = mirLogo;
});

input.addEventListener('input', () => {
    const cardNumber = input.value.trim();
    const cardType = getCardType(cardNumber);
    const logoContainer = document.querySelector('.card-logos');

    logoContainer.classList.remove('dimmed');
    if (cardType !== 'unknown') {
        logoContainer.classList.add('dimmed');
        Object.values(cardLogos).forEach(logo => logo.classList.remove('active'));
        if (cardLogos[cardType]) {
            cardLogos[cardType].classList.add('active');
        }
    } else {
        Object.values(cardLogos).forEach(logo => logo.classList.remove('active'));
    }
});

validateButton.addEventListener('click', () => {
    const cardNumber = input.value.trim();
    const isValid = isValidCardNumber(cardNumber);
    alert(isValid ? '✅ Card number is valid' : '❌ Invalid card number');
});
