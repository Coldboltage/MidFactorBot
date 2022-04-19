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
  await goToBetPage(listOfGamesToBetOn)
}

module.exports = placeBet