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

matchesRouter.get("/", httpGetAllMatches);
matchesRouter.get("/midnite/:midniteMatchId", httpGetMidniteGame);
matchesRouter.get("/factor/:factorId", httpGetFactorGame);
matchesRouter.get("/won/", httpGamesThatWon);
matchesRouter.get("/lose/", httpGamesThatLose);
matchesRouter.get("/betsplaced/", httpGamesPlacedBet);

module.exports = matchesRouter;
