const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const goToBetPage = async (listOfGamesToBetOn) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for (const game of listOfGamesToBetOn) {
    console.log(game.midniteMatchId);
    console.log(
      `https://www.midnite.com/esports/lol/match/${game.midniteMatchId}/`
    );
    await page.goto(
      `https://www.midnite.com/esports/lol/match/${game.midniteMatchId}/`
    );
    await page.waitForSelector("[Component=MarketContract]");

    const html = await page.content();
    const $ = cheerio.load(html);

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
      await page.waitForTimeout(3000);
      await page.click(
        "#__layout > div > div.bottom-0 > div > div:nth-child(1)"
      );
      await page.waitForTimeout(100000);
    } else if ($(buttonTwo).text().includes(game.teamToWin)) {
      await page.click(
        "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > button > div > span:nth-child(1)"
      );
      await page.waitForTimeout(3000);
      await page.click(
        "#__layout > div > div.bottom-0 > div > div:nth-child(1)"
      );
      await page.waitForTimeout(100000);
    }

    console.log("done");
  }
};

module.exports = goToBetPage;
