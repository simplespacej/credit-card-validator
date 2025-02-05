const puppeteer = require('puppeteer');
const { fork } = require('child_process');

let browser;
let page;
let server;
const baseUrl = 'http://localhost:9000';

describe('Credit Card Validator E2E Tests', () => {
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    
    await new Promise((resolve) => setTimeout(resolve, 5000));

    browser = await puppeteer.launch();
    page = await browser.newPage();
    
    let serverReady = false;
    for (let i = 0; i < 10; i++) {
      try {
        await page.goto(baseUrl, { waitUntil: 'networkidle2' });
        serverReady = true;
        break;
      } catch (e) {
        console.log(`Waiting for server... (${i + 1}/10)`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    if (!serverReady) {
      throw new Error('Server did not start in time');
    }
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
    await page.type('#card-number', '4111111111111111');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const validationMessage = await page.$eval('#validation-message', el => el.textContent);
    expect(validationMessage).toContain('✅');
  }, 15000);
});
