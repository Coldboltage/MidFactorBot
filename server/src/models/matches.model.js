const mongoose = require("mongoose");
const MatchesDatabase = require("./matches.mongo");

// Midnite Home Team === Factor Team 1
// Midnite Away Team === Factor Team 2

const matchFactorToMidniteGames = async (factorggData, midniteData) => {
  // Check each Factor game versus every Midnite game.
  // First: Check if Midnite has a game with home team
  // Second: In case Midnite have multiple games with the home team, check if the away team also matches
  // Third: Check if the match happens within 2 hours using time protocol.

  const matchedGames = factorggData.map((factorGame) => {
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

    const filterMidniteGame = midniteData.filter((midniteGame) => {
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
            return "no price"
          }
          const matchObject = {
            homeTeam: {
              name: midniteGame.home_team,
              prediction: factorGame.prematchWinProbability.team1Winprob,
              odds: midniteGame.market.contracts[0].price,
            },
            AwayTeam: {
              name: midniteGame.away_team,
              prediction: factorGame.prematchWinProbability.team2Winprob,
              odds: midniteGame.market.contracts[1].price,
            },
            matchStart: midniteGame.start_time,
            factorId: factorGame.factorId,
            midNiteMatchId: midniteGame.id,
            upcoming: true,
          };
          console.log(matchObject);
        } else {
          console.log("broken");
          if (!midniteGame.market.contracts[0]) {
            return "no price"
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
            midNiteMatchId: midniteGame.id,
            upcoming: true,
          };
          console.log(matchObject);
          return matchObject
        }
      }
    });
  });
};

module.exports = {
  matchFactorToMidniteGames,
};
