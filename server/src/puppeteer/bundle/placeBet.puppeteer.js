const puppeteer = require("puppeteer")
const {betableGamesWithFullInformation} = require("../../models/matches.model")
const {checkMoney} = require("../../models/money.model")
// Puppeteer Modules
const goToBetPage = require("../individual/goToBetPage.puppeteer")

const placeBet = async () => {
  const listOfGamesToBetOn = await betableGamesWithFullInformation()
  console.log(listOfGamesToBetOn)
  console.log("Preparing to place bet. Checking Data")

  // Setup for Validation
  const moneyCheck = await checkMoney()
  console.log(`Amount of money available: ${+moneyCheck}`)

  // Begin betting process
  // betPlaced: false, must be false so bets which have already happened, can't be bet on again
  // betableGamesWithFullInformation confirms this via making sure it grabs games with betPlaced: false
  await goToBetPage(listOfGamesToBetOn)
}

module.exports = placeBet