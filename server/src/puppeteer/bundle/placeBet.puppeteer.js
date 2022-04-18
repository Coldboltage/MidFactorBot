const puppeteer = require("puppeteer")
const {betableGamesWithFullInformation} = require("../../models/matches.model")

const placeBet = async () => {
  console.log(await betableGamesWithFullInformation())
}

module.exports = placeBet