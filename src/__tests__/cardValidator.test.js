import { isValidCardNumber, getCardType } from '../cardValidator';

describe('Luhn Algorithm Validation', () => {
    test('Valid Visa card', () => {
        expect(isValidCardNumber('4111111111111111')).toBe(true);
    });

    test('Valid MasterCard', () => {
        expect(isValidCardNumber('5500000000000004')).toBe(true);
    });

    test('Valid Amex card', () => {
        expect(isValidCardNumber('378282246310005')).toBe(true);
    });

    test('Valid Mir card', () => {
        expect(isValidCardNumber('2201382000000013')).toBe(true);
    });

    test('Invalid card number', () => {
        expect(isValidCardNumber('1234567812345678')).toBe(false);
    });
});

describe('Card Type Detection', () => {
    test('Visa detection', () => {
        expect(getCardType('4111111111111111')).toBe('visa');
    });

    test('MasterCard detection', () => {
        expect(getCardType('5500000000000004')).toBe('mastercard');
    });

    test('Amex detection', () => {
        expect(getCardType('378282246310005')).toBe('amex');
    });

    test('Mir detection', () => {
        expect(getCardType('2201382000000013')).toBe('mir');
    });

    test('Unknown card type', () => {
        expect(getCardType('0000000000000000')).toBe('unknown');
    });
});
