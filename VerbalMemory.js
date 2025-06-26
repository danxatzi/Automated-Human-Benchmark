require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');

const assert = require('assert');

describe('', function() {
    this.timeout(0);

    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        //await driver.quit();
    });

    it('', async () => {
        await driver.get(`https://humanbenchmark.com/tests/verbal-memory`);
        this.timeout(0)

        let Consent = await driver.wait(until.elementLocated(By.css(".fc-button-label")));
        await Consent.click();

        let Start = await driver.wait(until.elementLocated(By.css(".css-de05nr.e19owgy710")));
        await Start.click();
        const seenWords = [];
        while (true) {
            try {

                await driver.sleep(100)
                const wordElem = await driver.wait(until.elementLocated(By.css('.word')));
                const word = (await wordElem.getText()).trim();

                if (seenWords.includes(word)) {
                    const seenButton = await driver.findElement(By.xpath("/html/body/div/div/div[4]/div[1]/div/div/div/div[3]/button[1]"));
                    await seenButton.click();
                } else {
                    seenWords.push(word);
                    const newButton = await driver.findElement(By.xpath("/html/body/div/div/div[4]/div[1]/div/div/div/div[3]/button[2]"));
                    await newButton.click();
                }

            } catch (err) {
                console.error("Error in loop:", err.message);
                break;
            }
        }
    });
});