const puppeteer = require("puppeteer");
const randomUseragent = require('random-useragent');

const userAgent = randomUseragent.getRandom()

// Check both Midnite and FactorGG for games available.
// NEXT STEP: Check which games exists on both

// Modules needed for bundle
const login = require("../individual/login.puppeteer");
const grabMoney = require("../individual/grabMoney.puppeteer");
const { updateMoney } = require("../../models/money.model");

const main = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  // const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage();
  await page.setUserAgent(userAgent);
  // Grab data
  console.log("Loading page");
  const loginPage = await login(page);
  const moneyAmount = await grabMoney(loginPage);
  console.log(moneyAmount);
  await updateMoney(moneyAmount);

  await browser.close();
};

module.exports = main;
