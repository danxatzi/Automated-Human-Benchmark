const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');

describe('Minesweeper Online Test', function() {
    this.timeout(0);
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        //await driver.quit();
    });

    it('should set custom height and click a cell', async () => {
        this.timeout(0);
        await driver.get(`https://humanbenchmark.com/tests/number-memory`);

        let Consent = await driver.wait(until.elementLocated(By.css(".fc-button-label")));
        await Consent.click();
        while(true) {
            let GetStarted = await driver.wait(until.elementLocated(By.css(".css-de05nr.e19owgy710")));
            await GetStarted.click();
            let PressBlue = await driver.wait(until.elementLocated(By.css(".big-number")));
            let PressBlueText = await PressBlue.getText()
            let numInput = await driver.wait(
                until.elementLocated(By.css(".css-1qvtbrk.e19owgy78 input")),
            );
            for (let char of PressBlueText) {
                await numInput.sendKeys(char);
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            let sumbit = await driver.wait(until.elementLocated(By.css(".css-de05nr.e19owgy710")));
            await sumbit.click();
        }

    });
});