// Grab things from the model
const {findAllMatches} = require("../../models/matches.model")


const httpGetAllMatches = async (req, res) => {
  return res.status(200).json(await findAllMatches())
}

module.exports = {
  httpGetAllMatches,
}