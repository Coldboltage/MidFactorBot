const MatchesDatabase = require("../../src/models/matches.mongo");
const kelly = require("kelly");

// The actual formula for Kelly Staking is below:
// ((odds-1) * (percentage estimate))  -  (1-percent estimate)     /    (odds-1)         X        100
// *Your percentage estimate must be expressed as a decimal e.g. 70% will be 0.7

// E.g. - Odds of 1.58 with estimated 70% chance
// = ((0.58*0.7 – (1-0.7))  /   0.58)    x  100
// = (0.106/0.58)   x   100
// =18.28%

const grabGame = async () => {
  const object = await MatchesDatabase.findOne({ factorId: 32282 });
  console.log(object);
  if (object.homeTeam.prediction > object.awayTeam.prediction) {
    console.log(object.homeTeam.name);
    console.log(kelly(object.homeTeam.odds, object.homeTeam.prediction));
    return (kelly(object.homeTeam.odds, object.homeTeam.prediction));
  } else {
    console.log(object.awayTeam.name);
    console.log(kelly(object.awayTeam.odds, object.awayTeam.prediction));

    return (kelly(object.awayTeam.odds, object.awayTeam.prediction));
  }
};

module.exports = grabGame;
