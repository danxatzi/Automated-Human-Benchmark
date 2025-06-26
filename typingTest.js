const { Builder, By, until,Key } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');

describe('', function () {
    this.timeout(0);

    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        // await driver.quit();
    });

    it('smarterThanChimp', async () => {

        await driver.get(`https://humanbenchmark.com/tests/typing`);

        const consentBtn = await driver.wait(until.elementLocated(By.css(".fc-button-label")));
        await consentBtn.click();
        await driver.sleep(1000);
        const letters = await driver.findElements(By.css(".incomplete"));
        const letterSpans  = await driver.findElements(By.css(".incomplete"));
        let actions = driver.actions({ async: true });
        for (const span of letterSpans) {
            const char = await span.getText();
            const actions = driver.actions({ async: true });

            if (char === "") {
                await actions.sendKeys(Key.SPACE).perform();
            } else {
                await actions.sendKeys(char).perform();
            }

        }
        const total = await driver.findElement(By.css(".css-0"));
        let total1 = await total.getText()
        console.log("The total word per minute is",total1);


    });
});
