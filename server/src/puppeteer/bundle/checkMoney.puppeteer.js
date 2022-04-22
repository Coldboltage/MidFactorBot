// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const useragentList = require("../../../services/userAgentList")

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
  await page.setCacheEnabled(false);
  // await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36");
  // Grab data
  console.log("Loading page");
  const loginPage = await login(page);
  const moneyAmount = await grabMoney(loginPage);
  console.log(moneyAmount);
  await updateMoney(moneyAmount);

  await browser.close();
};

module.exports = main;
