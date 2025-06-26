const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');

describe('sequence', function () {
    this.timeout(0);

    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        // await driver.quit();
    });

    it('sequence', async () => {
        await driver.get(`https://humanbenchmark.com/tests/sequence`);

        const consentBtn = await driver.wait(until.elementLocated(By.css(".fc-button-label")));
        await consentBtn.click();

        const startBtn = await driver.wait(until.elementLocated(By.css(".css-de05nr.e19owgy710")));
        await startBtn.click();

        await driver.wait(until.elementLocated(By.css(".square")));
        let allButtons = await driver.findElements(By.css('.square'));

        while (true) {
            let sequence = [];

            const seenButtons = new Set();

            let idleCycles = 0;

            while (true) {
                let foundNew = false;

                for (let btn of allButtons) {
                    const className = await btn.getAttribute("class");

                    if (className.includes("active")) {
                        sequence.push(btn);
                        seenButtons.add(btn);
                        foundNew = true;
                        await driver.wait(async () => {
                            const currentClass = await btn.getAttribute("class");
                            return !currentClass.includes("active");
                        });
                    }
                }

                if (!foundNew) {
                    idleCycles++;
                    if (idleCycles >= 5) break;
                } else {
                    idleCycles = 0;
                }

            }

            for (let btn of sequence) {
                await driver.sleep(300);
                await btn.click();
            }



        }

    });
});
