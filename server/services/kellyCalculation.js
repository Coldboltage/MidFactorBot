const MatchesDatabase = require("../src/models/matches.mongo");
const kelly = require("kelly");

// The actual formula for Kelly Staking is below:
// ((odds-1) * (percentage estimate))  -  (1-percent estimate)     /    (odds-1)         X        100
// *Your percentage estimate must be expressed as a decimal e.g. 70% will be 0.7

// E.g. - Odds of 1.58 with estimated 70% chance
// = ((0.58*0.7 – (1-0.7))  /   0.58)    x  100
// = (0.106/0.58)   x   100
// =18.28%

const grabGame = (game) => {
  // Game from database added. Validation has been checked
  const object = game
  // Object name being used as a temp. 
  if (object.homeTeam.prediction > object.awayTeam.prediction) {
    // console.log(object.homeTeam.name);
    // console.log(kelly(object.homeTeam.odds, object.homeTeam.prediction));
    const bankRoll = kelly(+object.homeTeam.odds, object.homeTeam.prediction.toFixed(2))
    return {
      teamName: object.homeTeam.name,
      // Half a Kelly instead of a full Kellly
      bankRoll: +bankRoll.toFixed(2) / 2,
      odds: +object.homeTeam.odds,
      prediction: +object.homeTeam.prediction

    }
  } else {
    // console.log(object.awayTeam.name);
    // console.log(kelly(object.awayTeam.odds, object.awayTeam.prediction));
    const bankRoll = kelly(+object.awayTeam.odds, object.awayTeam.prediction.toFixed(2))
    return {
      teamName: object.awayTeam.name,
      bankRoll: +bankRoll.toFixed(2) / 2,
      odds: +object.awayTeam.odds,
      prediction: +object.awayTeam.prediction
    }
  }
};

module.exports = grabGame;
