const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const rp = require("request-promise");

// Check both Midnite and FactorGG for games available. 
// NEXT STEP: Check which games exists on both 

// Modules needed for bundle
const getJsonData = require("../individual/getJsonData.puppeteer")

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // Grab data from both sites. midnite uses request.js while factorgg can use axios. 403 from axios for some reason. 
  const factorgg = await getJsonData(page, "schedule", "https://www.factor.gg/", "axios");
  const midnite = await getJsonData(page, "matches", "https://www.midnite.com/esports/lol/", "request")
  await browser.close();
};

module.exports = main