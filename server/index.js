const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const rp = require("request-promise");

// Modules to test
const checkMidniteFactorData = require("./server/puppeteer/bundle/checkMidniteFactorData.puppeteer")

const main = async () => {
  // const page = await browser.newPage();
  checkMidniteFactorData()
}

main();
