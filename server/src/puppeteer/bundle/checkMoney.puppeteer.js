const puppeteer = require("puppeteer");


// Check both Midnite and FactorGG for games available. 
// NEXT STEP: Check which games exists on both 

// Modules needed for bundle
const login = require("../individual/login.puppeteer")
const grabMoney = require("../individual/grabMoney.puppeteer")
const updateMoney = require("../../models/money.model")

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // Grab data
  const loginPage = await login(page);
  const moneyAmount = await grabMoney(loginPage)
  console.log(moneyAmount)
  await updateMoney(moneyAmount)

  await browser.close();
};

module.exports = main