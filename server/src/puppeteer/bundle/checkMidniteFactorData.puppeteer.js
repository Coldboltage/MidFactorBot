// Check both Midnite and FactorGG for games available.
// NEXT STEP: Check which games exists on both

// Modules needed for bundle
const getJsonData = require("../individual/getJsonData.puppeteer");
const { matchFactorToMidniteGames } = require("../../models/matches.model");

const main = async (page) => {
  // const browser = await puppeteer.launch({headless:false})
  
  await page.setRequestInterception(true);

  page.on("request", (req) => {
    if (
      req.resourceType() == "stylesheet" ||
      req.resourceType() == "font" ||
      req.resourceType() == "image"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

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
    "upcomingMatches",
    "domcontentloaded"
  );
  const { item1: midniteData } = await getJsonData(
    page,
    "matches",
    "https://www.midnite.com/esports/lol/",
    "request",
    "test",
    "networkidle2"
  );
  // const midniteBetInfo = checkBetPageJson()
  // TODO: Import matches.model.js function here.
  // It should check the data from both factor and midnite and then pair up the games where possible.
  await matchFactorToMidniteGames(factorggData, midniteData);
  // TODO: Check if betPlaced. If placed, check if the match conditions of a win game is settled
  // Match conditions. Max amount of games / 2. Series = 5/2 = 2.5. Winning team Won series > 2.5
  // await hasGameEnded(finishedFactorggMatches)
};

module.exports = main;
