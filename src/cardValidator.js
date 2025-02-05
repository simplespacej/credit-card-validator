export function isValidCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;

    let sum = 0;
    let alternate = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let num = parseInt(cleaned[i], 10);
        if (alternate) {
            num *= 2;
            if (num > 9) num -= 9;
        }
        sum += num;
        alternate = !alternate;
    }
    return (sum % 10 === 0);
}


export function getCardType(cardNumber) {
    if (/^4/.test(cardNumber)) return 'visa';
    if (/^5[1-5]/.test(cardNumber)) return 'mastercard';
    if (/^3[47]/.test(cardNumber)) return 'amex';
    if (/^220[0-4]/.test(cardNumber)) return 'mir';
    return 'unknown';
}
