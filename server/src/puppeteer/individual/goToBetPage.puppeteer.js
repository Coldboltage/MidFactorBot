// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");
const pluginProxy = require('puppeteer-extra-plugin-proxy');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

puppeteer.use(pluginProxy({
  address: `${process.env.PROXY_IP}`,
  port: process.env.PROXY_PORT
}));

const cheerio = require("cheerio");
// Money Model
const { checkMoney, updateMoney } = require("../../models/money.model");
// Matches Model
const {
  deleteMatch,
  betPlaced,
  hasGameEnded,
} = require("../../models/matches.model");
// Screenshot Model

const {
  betSlipScreenshot,
  confirmBet,
} = require("../../models/screenshot.model");
// Puppeteer modules
const login = require("../individual/login.puppeteer");
const getMoneyAmount = require("./userMoney.puppeteer");
const checkBetPage = require("../individual/checkBetPage.puppeteer");

const goToBetPage = async (listOfGamesToBetOn) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `proxy-server=${process.env.PROXY_IP}`,
    ],
  });
  console.log(process.env.PROXY_IP);
  console.log("goToPage Started");
  // const browser = await puppeteer.launch({
  //   headless: true,
  // });
  let page = await browser.newPage();


  // await page.authenticate({
  //   username: `${process.env.NORDVPN_USERNAME}`,
  //   password: `${process.env.NORDVPN_PASSWORD}`,
  // });

  // await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36");
  await page.setCacheEnabled(true);
  await page.setViewport({
    width: 640,
    height: 800,
  });
  page = await login(page);
  // await page.waitForTimeout(1000000)
  // setup check money here
  const moneyAmount = await getMoneyAmount(page);
  console.log(moneyAmount);
  await page.waitForTimeout(1000);
  await updateMoney(moneyAmount);
  await page.waitForTimeout(1000);
  // money figured out
  // Check games that have been placed
  // await page.goto("https://www.midnite.com/esports/bets/")
  // page = await login(page);
  const gamesWhichHaveEnded = await checkBetPage(page);
  await hasGameEnded(gamesWhichHaveEnded);
  if (listOfGamesToBetOn.length < 1) {
    console.log(
      "There's no games here to bet on. This is the goToBetPage module. DONE"
    );
  }
  for (const game of listOfGamesToBetOn) {
    console.log(game.midniteMatchId);
    console.log(game._id);
    console.log(
      `https://www.midnite.com/esports/lol/match/${game.midniteMatchId}/`
    );
    const availableMoney = await checkMoney();
    console.log(availableMoney);
    await page.goto(
      `https://www.midnite.com/esports/lol/match/${game.midniteMatchId}/`
    );
    console.log(
      "ATTEMPT TO BET HAS BEEN PLACED CARE ############################"
    );
    console.log(
      "ATTEMPT TO BET HAS BEEN PLACED CARE ############################"
    );
    console.log(
      "ATTEMPT TO BET HAS BEEN PLACED CARE ############################"
    );
    await page.waitForTimeout(1000);
    console.log(
      "ATTEMPT TO BET HAS BEEN PLACED CARE ############################"
    );
    console.log(
      "ATTEMPT TO BET HAS BEEN PLACED CARE ############################"
    );
    console.log(
      "ATTEMPT TO BET HAS BEEN PLACED CARE ############################"
    );

    await page.waitForSelector("[Component=MarketContract]");

    const html = await page.content();
    const $ = cheerio.load(html);

    // VALIDATION TO SEE IF MARKET IS HALTED
    const marketCheck = await page.$$(
      "#content > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div:nth-child(1) > div > div:nth-child(3) > div.flex-auto > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) svg"
    );

    console.log("Validation check");
    console.log(game);
    console.log(marketCheck.length);
    console.log(`Market check: ${marketCheck.length > 0}`);
    console.log(`Prediction check: ${+game.prediction <= 0.535}`);
    console.log(`Bet placed: ${game.betPlaced === true}`);
    console.log(typeof game.betPlaced);
    if (
      marketCheck.length > 0 ||
      game.prediction <= 0.535 ||
      game.betPlaced === true
    ) {
      console.log("this game needs to be deleted");
      console.log(game._id);
      await deleteMatch(game._id);
      console.log("Game deleted");
      await page.waitForTimeout(200);
      continue;
    }

    const bankRollToPercentage = game.bankRoll * 100;
    console.log(bankRollToPercentage);

    const amountToBet = Number((availableMoney / 100) * bankRollToPercentage);
    // const amountToBet = Number(0.5);

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
    // Bottom of page, we click this to pull up betting slip
    const bettingSlip =
      "#__layout > div > div.bottom-0 > div > div:nth-child(1)";
    // We double click this so to allow us to add in a money input
    const bettingPutNumber =
      "#mobileBetslipContainer > aside > div:nth-child(2) > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div > div.ant-input-number-input-wrap > input";

    const betMacroExecution = async () => {
      // await page.goto("https://www.whatismyip.com/");
      // await page.waitForTimeout(7000)
      // const woooo = await page.screenshot({
      //   encoding: "base64",
      // });
      // await betSlipScreenshot(game, woooo);
      // console.log("SCREENSHOT WOOO");
      // await page.waitForTimeout(1000000)
      // ABOVE NEEDS DELETED: SCREENSHOT IP
      await page.waitForTimeout(200);
      try {
        await page.click(bettingSlip);
      } catch (error) {
        await page.waitForTimeout(5000);
      }
      console.log("click betting slip");
      await page.click(bettingSlip);
      await page.waitForTimeout(1000);
      console.log("double click");
      await page.waitForSelector(bettingPutNumber);
      await page.click(bettingPutNumber, { clickCount: 2 });
      // await page.click("#mobileBetslipContainer > aside > div:nth-child(2) > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div > div.ant-input-number-input-wrap > input", {clickCount: 2})
      await page.keyboard.type(`${amountToBet.toFixed(2)}`);
      // LOGIC FOR BETTING ADDED HERE
      console.log(game);
      console.log(`The amount to bet for this game is: ${amountToBet}`);
      // CLICK PLACE BET
      console.log("YOU ARE ABOUT TO CONFIRM A BET ######################");
      console.log("YOU ARE ABOUT TO CONFIRM A BET ######################");
      console.log("YOU ARE ABOUT TO CONFIRM A BET #####################");
      await page.waitForTimeout(2000);
      console.log("######### TEST ############");
      console.log("######### TEST ############");
      console.log("######### TEST ############");
      console.log("######### TEST ############");
      // Create database entry
      // TODO screenshotcall
      await page.waitForTimeout(1000);
      await page.waitForSelector(
        "#mobileBetslipContainer > aside > div:nth-child(3) > div > div > div:nth-child(3) > div > div > button"
      );
      await page.click(
        "#mobileBetslipContainer > aside > div:nth-child(3) > div > div > div:nth-child(3) > div > div > button",
        { clickCount: 2 }
      );
      await page.click(
        "#mobileBetslipContainer > aside > div:nth-child(3) > div > div > div:nth-child(3) > div > div > button",
        { clickCount: 2 }
      );
      await page.waitForTimeout(100);
      await page.click(
        "#mobileBetslipContainer > aside > div:nth-child(3) > div > div > div:nth-child(3) > div > div > button",
        { clickCount: 2 }
      );
      await page.waitForTimeout(1000);

      const betSlipScreenshotData = await page.screenshot({
        encoding: "base64",
      });
      await betSlipScreenshot(game, betSlipScreenshotData);
      console.log("clicked bet button, waiting for confirmation");
      await page.waitForTimeout(4000);
      // We have clicked the bet button but we don't know if it's went through. We wait for the selector
      // Look for something to confirm a bet has happened
      await page.waitForSelector(
        "#mobileBetslipContainer > aside > div:nth-child(2) > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > button:nth-child(2)"
      );
      console.log(
        "Confirmation setup, firing call to database to confirm bet has been placed"
      );
      // Game will interact with MatchesDatabase to add betPlaced: true; It'll not come back here as a result
      await page.waitForTimeout(10000);
      console.log(`Did we really find the confirmation?`);
      await page.waitForSelector(
        "#mobileBetslipContainer > aside > div:nth-child(2) > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > button:nth-child(2)"
      );
      console.log(
        "Alan at this point, it should have went through, we need a screenshot"
      );
      const betConfirmedScreenshotData = await page.screenshot({
        encoding: "base64",
      });
      await confirmBet(game, betConfirmedScreenshotData);
      await betPlaced(game._id);
      // GRAB MONEY
      const moneyAmount = await getMoneyAmount(page);
      console.log(`The amount of money now is: ${moneyAmount}`);
      await updateMoney(moneyAmount);
      console.log(`Money shown on website: ${moneyAmount}`);
      console.log(`Money shown on database: ${await checkMoney()}`);
      console.log("Money should be added");
      await page.waitForTimeout(1000);
      console.log("############ Should loop to another game ################");
      console.log(`Was `);
    };

    // Logic to figure out which button to press then execute betMacroExecution
    if ($(buttonOneText).text().includes(game.teamToWin)) {
      console.log("Clicking on first button");
      console.log($(buttonOneText).text().includes(game.teamToWin));
      await page.waitForSelector(buttonOneElement);
      await page.click(buttonOneElement);
      await page.waitForTimeout(200);
      // Bulk of work done here after finding out which buttom to press
      await betMacroExecution();
    } else if ($(buttonTwoText).text().includes(game.teamToWin)) {
      console.log("Clicking on second button");
      console.log($(buttonTwoText).text().includes(game.teamToWin));
      await page.waitForSelector(buttonTwoElement);
      await page.click(buttonTwoElement);
      await betMacroExecution();
    }

    console.log("done");
  }
  await browser.close();
};

module.exports = goToBetPage;
