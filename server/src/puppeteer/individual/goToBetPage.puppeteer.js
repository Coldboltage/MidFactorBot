const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const {checkMoney} = require("../../models/money.model")
const login = require("../individual/login.puppeteer")

const goToBetPage = async (listOfGamesToBetOn) => {
  const browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  await page.setViewport({
    width: 640,
    height: 800,
  });
  page = await login(page)

  for (const game of listOfGamesToBetOn) {
    console.log(game.midniteMatchId);
    console.log(
      `https://www.midnite.com/esports/lol/match/${game.midniteMatchId}/`
    );
    const availableMoney = await checkMoney()
    console.log(availableMoney)
    await page.goto(
      `https://www.midnite.com/esports/lol/match/${game.midniteMatchId}/`
    );
    await page.waitForSelector("[Component=MarketContract]");

    const html = await page.content();
    const $ = cheerio.load(html);

    const bankRollToPercentage = game.bankRoll * 100
    console.log(bankRollToPercentage)

    const amountToBet = Number(((10 / 100) * bankRollToPercentage))
    console.log(`Amount to bet: ${amountToBet}`)

    const buttonOne = $(
      "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(1) > button > div > span:nth-child(1)"
    );
    const buttonTwo = $(
      "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > button > div > span:nth-child(1)"
    );

    if ($(buttonOne).text().includes(game.teamToWin)) {
      await page.click(
        "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(1) > button > div > span:nth-child(1)"
      );
      await page.waitForTimeout(1000);
      await page.click(
        "#__layout > div > div.bottom-0 > div > div:nth-child(1)"
      );
      await page.waitForTimeout(1000);
      await page.click("#mobileBetslipContainer > aside > div:nth-child(2) > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div > div.ant-input-number-input-wrap > input", {clickCount: 2})
      await page.keyboard.type(`${amountToBet.toFixed(2)}`)
      await page.waitForTimeout(1000);

    } else if ($(buttonTwo).text().includes(game.teamToWin)) {
      await page.click(
        "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > button > div > span:nth-child(1)"
      );
      await page.waitForTimeout(1000);
      await page.click(
        "#__layout > div > div.bottom-0 > div > div:nth-child(1)"
      );
      await page.waitForTimeout(1000);
      await page.click("#mobileBetslipContainer > aside > div:nth-child(2) > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div > div.ant-input-number-input-wrap > input", {clickCount: 2})
      await page.keyboard.type(`${amountToBet.toFixed(2)}`)
      await page.waitForTimeout(1000);
    }

    console.log("done");
  }
  await browser.close()
};

module.exports = goToBetPage;
