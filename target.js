const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');

describe('target', function () {
    this.timeout(0);

    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        // await driver.quit();
    });

    it('sequence', async () => {
        await driver.get(`https://humanbenchmark.com/tests/aim`);

        const consentBtn = await driver.wait(until.elementLocated(By.css(".fc-button-label")));
        await consentBtn.click();
        await driver.wait(until.elementLocated(By.css(".desktop-only")));
        let target = await driver.findElement(By.css('.desktop-only'));
        await target.click();

        while (true) {
            try {
                await driver.wait(until.elementLocated(By.css('.css-ad1j3y.e6yfngs2')), 5000);

                const targets = await driver.findElements(By.css('.css-q4kt6s.e6yfngs1'));

                for (let target of targets) {
                    try {

                        if (await target.isDisplayed() && await target.isEnabled()) {

                            const target = await driver.findElement(By.css('.css-z6vxiy.e6yfngs3'));
                            const rect = await target.getRect();

                            const offsetX = rect.width / 2;
                            const offsetY = rect.height / 2;

                            const actions = driver.actions({ bridge: true });
                            await actions.move({
                                origin: target,
                                x: Math.floor(offsetX),
                                y: Math.floor(offsetY)
                            }).click().perform();
                            await actions.move({ origin: target, x: offsetX, y: offsetY }).click().perform();
                            await target.click();
                        }
                    } catch (err) {

                    }
                }
                let time = await driver.findElement(By.css('.css-0')).getText();
                console.log("Your average time per target was ", time);
            } catch (err) {
            }
        } 

    });
});
