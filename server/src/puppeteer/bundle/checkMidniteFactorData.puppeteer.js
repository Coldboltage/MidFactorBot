const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const rp = require("request-promise");

// Check both Midnite and FactorGG for games available. 
// NEXT STEP: Check which games exists on both 

// Modules needed for bundle
const getJsonData = require("../individual/getJsonData.puppeteer")
const {matchFactorToMidniteGames} = require("../../models/matches.model")

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // Grab data from both sites. midnite uses request.js while factorgg can use axios. 403 from axios for some reason. 
  const factorggData = await getJsonData(page, "index", "https://www.factor.gg/", "axios");
  const midniteData = await getJsonData(page, "matches", "https://www.midnite.com/esports/lol/", "request");
  // TODO: Import matches.model.js function here. 
  // It should check the data from both factor and midnite and then pair up the games where possible.
  matchFactorToMidniteGames(factorggData, midniteData)
  await browser.close();
};

module.exports = main
