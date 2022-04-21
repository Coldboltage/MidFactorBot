const express = require("express");

// Controllers to be sent down
const {
  httpGetAllMatches,
  httpGetMidniteGame,
  httpGetFactorGame,
  httpGamesThatWon,
  httpGamesThatLose,
  httpGamesPlacedBet,
} = require("./matches.controller");

const matchesRouter = express.Router();

matchesRouter.get("/matches", httpGetAllMatches);
matchesRouter.get("/matches/midnite/:midniteMatchId", httpGetMidniteGame);
matchesRouter.get("/matches/factor/:factorId", httpGetFactorGame);
matchesRouter.get("/matches/won/", httpGamesThatWon);
matchesRouter.get("/matches/lose/", httpGamesThatLose);
matchesRouter.get("/matches/betsplaced/", httpGamesPlacedBet);

module.exports = matchesRouter;
