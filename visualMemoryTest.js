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
        await driver.get(`https://humanbenchmark.com/tests/memory`);

        const consentBtn = await driver.wait(until.elementLocated(By.css(".fc-button-label")));
        await consentBtn.click();

        const startBtn = await driver.wait(until.elementLocated(By.css(".css-de05nr.e19owgy710")));
        await startBtn.click();

        while(true){
            await driver.wait(until.elementLocated(By.css(".active.css-lxtdud.eut2yre1")));
            let allButtons = await driver.findElements(By.css('.active.css-lxtdud.eut2yre1'));

            let formerlyActiveButtons = [];

            for (let btn of allButtons) {
                const className = await btn.getAttribute('class');
                if (className.includes('active')) {
                    formerlyActiveButtons.push(btn);
                }
            }
            await driver.wait(async () => {
                for (let btn of formerlyActiveButtons) {
                    const className = await btn.getAttribute('class');
                    if (className.includes('active')) {
                        return false
                    }
                }
                return true;
            });
            for (let btn of formerlyActiveButtons) {
                await btn.click();
            }

        }

    });
});
