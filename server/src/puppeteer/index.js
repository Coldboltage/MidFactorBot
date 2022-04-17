const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const rp = require("request-promise");

// Modules to test
const checkMidniteFactorData = require("./bundle/checkMidniteFactorData.puppeteer")

const main = async () => {
  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  checkMidniteFactorData()
}

main();
