const { Builder, By, until } = require('selenium-webdriver');
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
        await driver.get(`https://humanbenchmark.com/tests/chimp`);

        const consentBtn = await driver.wait(until.elementLocated(By.css(".fc-button-label")));
        await consentBtn.click();

        const startBtn = await driver.wait(until.elementLocated(By.css(".css-de05nr.e19owgy710")));
        await startBtn.click();

    while(true){
        await driver.wait(until.elementsLocated(By.css('[data-cellnumber]')), 10000);

        let elements = await driver.findElements(By.css('[data-cellnumber]'));

        let numberedElements = [];
        for (const elem of elements) {
            let num = await elem.getAttribute('data-cellnumber');
            numberedElements.push({
                number: parseInt(num),
                element: elem
            });
        }

        numberedElements.sort((a, b) => a.number - b.number);

        for (const item of numberedElements) {
            await driver.sleep(100)
            await item.element.click();
        }
        await driver.sleep(200)
        const continueBtn = await driver.wait(until.elementLocated(By.css(".css-de05nr.e19owgy710")));
        await continueBtn.click();

    }

    });
});
