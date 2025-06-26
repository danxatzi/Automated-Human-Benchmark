const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');

describe('Reaction', function() {
    this.timeout(0);

    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        //await driver.quit();
    });

    it('Reaction', async () => {
        await driver.get(`https://humanbenchmark.com/`);
        this.timeout(0)

            let Consent = await driver.wait(until.elementLocated(By.css(".fc-button-label")));
            await Consent.click();

            let GetStarted = await driver.wait(until.elementLocated(By.css(".css-de05nr.e19owgy711")));
            await GetStarted.click();
            let PressBlue = await driver.wait(until.elementLocated(By.css(".css-42wpoy.e19owgy79")));
            await PressBlue.click();
        while(true) {
            const PressGreen = await driver.wait(
                until.elementLocated(By.css(".view-go.e18o0sx0.css-saet2v.e19owgy77")),
            );
            await PressGreen.click();

            await driver.sleep(2000);
            let continueGame = await driver.wait(until.elementLocated(By.css(".css-42wpoy.e19owgy79")));
            await continueGame.click();
        }

    });
});