// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");
const nordConfig = require("../../../services/nordvpn");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const cheerio = require("cheerio");
const axios = require("axios");
const rp = require("request-promise");

// Check both Midnite and FactorGG for games available.
// NEXT STEP: Check which games exists on both

// Modules needed for bundle
const getJsonData = require("../individual/getJsonData.puppeteer");
const { matchFactorToMidniteGames } = require("../../models/matches.model");

const main = async () => {
  // const browser = await puppeteer.launch({headless:false})
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // await page.authenticate({
  //   username: `${process.env.NORDVPN_USERNAME}`,
  //   password: `${process.env.NORDVPN_PASSWORD}`,
  // });

  await page.setCacheEnabled(true);
  // Grab data from both sites. midnite uses request.js while factorgg can use axios. 403 from axios for some reason.
  const { item1: factorggData } = await getJsonData(
    page,
    "index",
    "https://www.factor.gg/",
    "axios",
    "upcomingMatches"
  );
  const { item1: midniteData } = await getJsonData(
    page,
    "matches",
    "https://www.midnite.com/esports/lol/",
    "request"
  );
  // const midniteBetInfo = checkBetPageJson()
  await browser.close();
  // TODO: Import matches.model.js function here.
  // It should check the data from both factor and midnite and then pair up the games where possible.
  await matchFactorToMidniteGames(factorggData, midniteData);
  // TODO: Check if betPlaced. If placed, check if the match conditions of a win game is settled
  // Match conditions. Max amount of games / 2. Series = 5/2 = 2.5. Winning team Won series > 2.5
  // await hasGameEnded(finishedFactorggMatches)
};

module.exports = main;
