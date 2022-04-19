const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const { checkMoney } = require("../../models/money.model");
const { deleteMatch } = require("../../models/matches.model")
const login = require("../individual/login.puppeteer");

const goToBetPage = async (listOfGamesToBetOn) => {
  const browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  await page.setViewport({
    width: 640,
    height: 800,
  });
  page = await login(page);

  for (const game of listOfGamesToBetOn) {
    console.log(game.midniteMatchId);
    console.log(game._id)
    console.log(
      `https://www.midnite.com/esports/lol/match/${game.midniteMatchId}/`
    );
    const availableMoney = await checkMoney();
    console.log(availableMoney);
    await page.goto(
      `https://www.midnite.com/esports/lol/match/${game.midniteMatchId}/`
    );
    await page.waitForSelector("[Component=MarketContract]");


    const html = await page.content();
    const $ = cheerio.load(html);

    // VALIDATION TO SEE IF MARKET IS HALTED
    const marketCheck = $("#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(1) > button > div > span:nth-child(2) > svg").length
    
    console.log("Validation check")
    console.log(marketCheck)
    if (marketCheck > 0) {
      console.log("this game needs to be deleted")
      console.log(game._id)
      await deleteMatch(game._id)
      console.log("Game deleted")
      await page.waitForTimeout(200)
      continue
    }

    const bankRollToPercentage = game.bankRoll * 100;
    console.log(bankRollToPercentage);

    const amountToBet = Number((10 / 100) * bankRollToPercentage);
    console.log(`Amount to bet: ${amountToBet}`);

    const buttonOneElement =
      "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(1) > button";

    const buttonTwoElement =
      "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > button";

    const buttonOneText = $(
      "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(1) > button > div > span:nth-child(1)"
    );
    const buttonTwoText = $(
      "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > button > div > span:nth-child(1)"
    );

    // List of elements used more than once

    const bettingSlip =
      "#__layout > div > div.bottom-0 > div > div:nth-child(1)";
    const bettingPutNumber =
      "#mobileBetslipContainer > aside > div:nth-child(2) > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div > div.ant-input-number-input-wrap > input";

    const betMacroExecution = async () => {
      await page.waitForTimeout(200);
      try {
        await page.click(bettingSlip);
      } catch (error) {
        await page.waitForTimeout(5000);
      }
      console.log("click betting slip");
      await page.click(bettingSlip);
      // await page.click(
      //   "#__layout > div > div.bottom-0 > div > div:nth-child(1)"
      // );
      await page.waitForTimeout(200);
      console.log("double click");
      await page.waitForSelector(bettingPutNumber);
      await page.click(bettingPutNumber, { clickCount: 2 });
      // await page.click("#mobileBetslipContainer > aside > div:nth-child(2) > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div > div.ant-input-number-input-wrap > input", {clickCount: 2})
      await page.keyboard.type(`${amountToBet.toFixed(2)}`);
      await page.waitForTimeout(200);
    };

    if ($(buttonOneText).text().includes(game.teamToWin)) {
      console.log("Clicking on first button");
      console.log($(buttonOneText).text().includes(game.teamToWin));
      await page.waitForSelector(buttonOneElement);
      await page.click(buttonOneElement);
      await page.waitForTimeout(200);
      await betMacroExecution()
    } else if ($(buttonTwoText).text().includes(game.teamToWin)) {
      console.log("Clicking on second button");
      console.log($(buttonTwoText).text().includes(game.teamToWin));
      await page.waitForSelector(buttonTwoElement);
      await page.click(buttonTwoElement);
      await betMacroExecution()
    }

    console.log("done");
  }
  await browser.close();
};

module.exports = goToBetPage;
