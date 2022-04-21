// Grab things from the model
const {findAllMatches, getMidniteGame, getFactorGame, gamesThatWon, gamesThatLose, gamesPlacedBet} = require("../../models/matches.model")


const httpGetAllMatches = async (req, res) => {
  return res.status(200).json(await findAllMatches())
}

const httpGetMidniteGame = async (req, res) => {
  return res.status(200).json(await getMidniteGame(req.params.midniteMatchId))
}

const httpGetFactorGame = async (req, res) => {
  return res.status(200).json(await getMidniteGame(req.params.factorId))
}
const httpGamesThatWon = async (req, res) => {
  return res.status(200).json(await gamesThatWon(req.params.won))
}

const httpGamesThatLose = async (req, res) => {
  return res.status(200).json(await gamesThatLose(req.params.won))
}

const httpGamesPlacedBet = async (req, res) => {
  return res.status(200).json(await gamesPlacedBet())
}




module.exports = {
  httpGetAllMatches,
  httpGetMidniteGame,
  httpGetFactorGame,
  httpGamesThatWon,
  httpGamesThatLose,
  httpGamesPlacedBet,

}