export function getCardType(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');

    const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        mir: /^220[0-4][0-9]{12,15}$/
    };

    for (const [type, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cleaned)) {
            return type;
        }
    }
    return 'unknown';
}
