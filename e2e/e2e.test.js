const puppeteer = require('puppeteer');
const { fork } = require('child_process');

let browser;
let page;
let server;
const baseUrl = 'http://localhost:9000';

describe('Credit Card Validator E2E Tests', () => {
    beforeAll(async () => {
        server = fork(`${__dirname}/e2e.server.js`);
        
        // Ждём, пока сервер поднимется
        await new Promise(resolve => setTimeout(resolve, 5000));

        browser = await puppeteer.launch({
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        page = await browser.newPage();

        // Логируем все сообщения из браузерной консоли
        page.on('console', msg => console.log(`🖥️  Browser log:`, msg.text()));

        await page.goto(baseUrl, { waitUntil: 'networkidle2' });

        console.log('🚀 Страница загружена, начинаем тестирование.');
    }, 60000);

    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
        if (server) {
            server.kill();
        }
    });

    test('Should validate a correct Visa card', async () => {
        console.log('✍️ Ввод номера карты...');
        await page.type('#card-number', '4111111111111111');

        console.log('🔘 Нажатие на кнопку проверки...');
        await page.click('#validate-button');

        console.log('⏳ Ждём 2 секунды...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('📸 Делаем скриншот...');
        await page.screenshot({ path: 'debug-screenshot.png' });

        console.log('📄 Получаем HTML всей страницы...');
        const pageContent = await page.content();
        console.log(pageContent);

        console.log('🔍 Ищем validation-message...');
        const messageExists = await page.$('#validation-message') !== null;
        console.log(`✅ Элемент найден: ${messageExists}`);

        if (messageExists) {
            const validationText = await page.$eval('#validation-message', el => el.textContent);
            console.log(`📢 Текст валидации: "${validationText}"`);
        } else {
            console.log('❌ validation-message отсутствует!');
        }

        console.log('⏳ Ожидаем появления ✅ в validation-message...');
        await page.waitForFunction(
            () => document.querySelector('#validation-message')?.textContent.includes('✅'),
            { timeout: 10000 }
        );

        const validationMessage = await page.$eval('#validation-message', el => el.textContent);
        console.log(`✅ Найдено сообщение: "${validationMessage}"`);
        expect(validationMessage).toContain('✅');
    }, 30000);
});
