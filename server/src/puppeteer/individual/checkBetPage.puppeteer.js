const cheerio = require("cheerio");

const betPageJson = async (page) => {
  //I would leave this here as a fail safe
  // await page.setExtraHTTPHeaders({
  //   authorization: `${process.env.BEARER_TOKEN}`,
  // });
  await page.goto("https://api.midnite.com/v0/bets?days=7");
  console.log("loading page");
  await page.waitForTimeout(2000);
  await page.content();
  console.log("I think I'm in the page");
  const html = await page.content();
  const $ = cheerio.load(html);

  const JSONstuff = $("pre").text();
  const data = JSON.parse(JSONstuff);

  const single = data.filter((bet) => bet.type === "single");
  const gamesThatHaveBeenSettled = single.filter((game) => {
    console.log("started filter to find settled game");
    console.log(game.bet_legs[0]);
    const { match_status } = game.bet_legs[0];
    if (match_status === "settled") {
      console.log("A game was settled");
      return true;
    } else {
      console.log("Not settled yet");
      return false;
    }
  });

  const filteredBets = gamesThatHaveBeenSettled.map((game) => {
    const {
      match_status,
      away_score,
      away_team,
      home_score,
      home_team,
      match_id,
    } = game.bet_legs[0];
    console.log(
      `https://www.midnite.com/esports/lol/match/${match_id}/ has ended`
    );
    if (+home_score > +away_score) {
      console.log("home team won");
      return { winner: home_team, midniteMatchId: match_id };
    } else {
      console.log("away team ffs");
      return { winner: away_team, midniteMatchId: match_id };
    }
  });

  console.log(filteredBets);
  await page.waitForTimeout(1000);
  return filteredBets;
  //I will leave this as an excercise for you to
  //  write out to FS...
};

module.exports = betPageJson;
