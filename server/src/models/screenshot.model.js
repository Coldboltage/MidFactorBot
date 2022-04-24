const ScreenshotDatabase = require("./screenshot.mongo")

const betSlipScreenshot = async (game, screenshot) => {
  const betSlip = await ScreenshotDatabase.create({
    midniteMatchId: game.midniteMatchId,
    factorId: game.factorId,
    betPlaced: false,
    prepareBetSlip: screenshot
  })
  console.log("Screenshot sent to database")
}

const confirmBet = async (game, screenshot) => {
  const betSlip = await ScreenshotDatabase.find({midniteMatchId: game.midniteMatchId})
  betSlip.betPlaced = true
  betSlip.confirmBet = screenshot
  await betSlip.save()
  console.log("Confirmation bet screenshot sent to database")

}

module.exports = {
  betSlipScreenshot,
  confirmBet
}