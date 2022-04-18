const { match } = require("minimatch");
const MatchesDatabase = require("./matches.mongo");
const grabGame = require("../../services/kellyCalculation")

const findAllMatches = async () => {
  return await MatchesDatabase.find({})
}

const matchFactorToMidniteGames = async (factorggData, midniteData) => {
  console.log("Starting matchFactorToMidniteGames")

  const matchGames = []

  if (!midniteData || !factorggData) {
    console.log("Something went wrong")
    return null
  }

  const setup = factorggData.forEach((factorGame) => {
    const factorGameHomeTeam = factorGame.team1.fullName;
    const factorGameAwayTeam = factorGame.team2.fullName;
    // formula based name
    const factorGameHomeTeamFixed = factorGame.team1.fullName
      .toLowerCase()
      .replace("esports", "")
      .replace(" ", "")
      .replace(" ", "");
    const factorGameAwayTeamFixed = factorGame.team2.fullName
      .toLowerCase()
      .replace("esports", "")
      .replace(" ", "")
      .replace(" ", "");

    const filterMidniteGame = midniteData.forEach(async (midniteGame) => {
      const midniteGameHomeTeam = midniteGame.home_team;
      const midniteGameAwayTeam = midniteGame.away_team;
      // formula based name
      const midniteGameHomeTeamFixed = midniteGame.home_team
        .toLowerCase()
        .replace("esports", "")
        .replace(" ", "")
        .replace(" ", "");
      const midniteGameAwayTeamFixed = midniteGame.away_team
        .toLowerCase()
        .replace("esports", "")
        .replace(" ", "")
        .replace(" ", "");
      if (
        (factorGameHomeTeamFixed === midniteGameHomeTeamFixed ||
          factorGameHomeTeamFixed === midniteGameAwayTeamFixed) &&
        (factorGameAwayTeamFixed === midniteGameAwayTeamFixed ||
          factorGameAwayTeamFixed === midniteGameHomeTeamFixed)
      ) {
        console.log("####################################");
        console.log("####################################");
        console.log(
          `FactorGame home team: ${factorGameHomeTeam} and away team: ${factorGameAwayTeam}`
        );
        console.log(
          `MidniteGame home team: ${midniteGameHomeTeam} and away team: ${midniteGameAwayTeam}`
        );
        if (factorGameHomeTeamFixed === midniteGameHomeTeamFixed) {
          console.log("paired");
          if (!midniteGame.market.contracts[0]) {
            return "no price";
          }
          const matchObject = {
            homeTeam: {
              name: midniteGame.home_team,
              prediction: factorGame.prematchWinProbability.team1Winprob,
              odds: +midniteGame.market.contracts[0].price,
            },
            awayTeam: {
              name: midniteGame.away_team,
              prediction: factorGame.prematchWinProbability.team2Winprob,
              odds: +midniteGame.market.contracts[1].price,
            },
            matchStart: midniteGame.start_time,
            factorId: factorGame.factorId,
            midniteMatchId: midniteGame.id,
            upcoming: true,
            betPlaced: false,
          };
          // console.log(matchObject);
          matchGames.push(matchObject)
          const findMatch = await MatchesDatabase.findOne({factorId: matchObject.factorId})
          console.log("calling database")
          console.log(`Checking match: ${matchObject.factorId}`)
          if (!findMatch) {
            console.log("Couldn't find match ID so saving object to database")
            const match = await MatchesDatabase.create(matchObject)
            await match.save()
            console.log(matchObject)
            console.log("Match should be added")
          } else if (findMatch) {
            console.log("ID Found, here's the object")
            if (findMatch.homeTeam.prediction !== matchObject.homeTeam.prediction || findMatch.awayTeam.prediction !== matchObject.awayTeam.prediction) {
              console.log("Prediction has changed")
              findMatch.homeTeam.prediction = +matchObject.homeTeam.prediction
              findMatch.awayTeam.prediction = +matchObject.awayTeam.prediction
              await findMatch.save()
              console.log(`Saved changes to prediction for ${findMatch._id}`)

            } else if (findMatch.homeTeam.odds !== matchObject.homeTeam.odds || findMatch.awayTeam.odds !== matchObject.awayTeam.odds) {
              console.log("Odds have changed")
              findMatch.homeTeam.odds = +matchObject.homeTeam.odds
              findMatch.awayTeam.odds = +matchObject.awayTeam.odds
              await findMatch.save()
              console.log(`Saved changes to odds for ${findMatch._id}`)

            }
            console.log(findMatch)
            console.log(`Predictions and Odds verified`)
            // console.log(`Is prediction hometeams the same? ${findMatch.homeTeam.prediction === matchObject.homeTeam.prediction ? "Yes it is" : "No there's a change"}`)
            // console.log(+findMatch.homeTeam.prediction)
            // console.log(+matchObject.homeTeam.prediction)
            // console.log(`Is odds for hometeams the same? ${findMatch.homeTeam.odds === matchObject.homeTeam.odds ? "Yes it is" : "No there's a change"}`)
            // console.log(+findMatch.homeTeam.odds.toFixed(1))
            // console.log(+matchObject.homeTeam.odds.toFixed(1))
            // console.log("############################################################")
            // console.log("############################################################")
          }
  
        } else {
          console.log("broken");
          if (!midniteGame.market.contracts[0]) {
            return "no price";
          }
          console.log(midniteGame.id);

          const matchObject = {
            homeTeam: {
              name: midniteGame.home_team,
              prediction: factorGame.prematchWinProbability.team2Winprob,
              odds: midniteGame.market.contracts[0].price,
            },
            awayTeam: {
              name: midniteGame.away_team,
              prediction: factorGame.prematchWinProbability.team1Winprob,
              odds: midniteGame.market.contracts[1].price,
            },
            matchStart: midniteGame.start_time,
            factorId: factorGame.factorId,
            midniteMatchId: midniteGame.id,
            upcoming: true,
            betPlaced: false
          };
          // console.log(matchObject);
          matchGames.push(matchObject)
          const findMatch = await MatchesDatabase.find({factorId: matchObject.factorId})
          console.log("calling database")
          if (findMatch.length === 0) {
            const match = await MatchesDatabase.create(matchObject)
            await match.save()
          }
        }
      }
    });
  });
};

const setupBet = async () => {
  const betableGames = await MatchesDatabase.find({betPlaced: false})
  const timeToBetOnGames = betableGames.filter((game) => {
    // Find out when the game is
    const gameStartTime = Date.parse(game.matchStart)
    // Get the current time
    const timeRightNow = +Date.now()
    // Difference between both
    const howLongLeftBeforeGameBegins = gameStartTime - timeRightNow
    // console.log("Checking time variables")
    // console.log(gameStartTime)
    // console.log(timeRightNow)
    // console.log(howLongLeftBeforeGameBegins)
    // Is the game happening in two hours
    console.log(howLongLeftBeforeGameBegins > 7200000 ? true : false)
    return howLongLeftBeforeGameBegins > 7200000 ? true : false
  })
  console.log(`${timeToBetOnGames.length} betable games`)
  // Setup games to bet on
  if (timeToBetOnGames.length > 0) {
    console.log(`Setting up bets`)
    // Looping through each game to setup bet
    timeToBetOnGames.forEach((game) => {
      console.log(`Setup bet for: ${game.factorId}`)
      const teamToBetOn = grabGame(game)
      console.log(teamToBetOn)
      
    })
  }
}

module.exports = {
  matchFactorToMidniteGames,
  findAllMatches,
  setupBet,

};
