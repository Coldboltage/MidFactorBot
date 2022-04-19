const http = require("http");
const app = require("./app")
const cron = require('node-cron')
require('dotenv').config()

// Modules when server starts
const {mongoConnect} = require("../services/mongo")
const {setupBet} = require("./models/matches.model")
// Puppeteer Modules
const checkMidniteFactorData = require("./puppeteer/bundle/checkMidniteFactorData.puppeteer")
const grabOne = require("../services/kellyCalculation")
const getMoney = require("./puppeteer/bundle/checkMoney.puppeteer")
const placeBet = require("./puppeteer/bundle/placeBet.puppeteer")

const server = http.createServer(app);

const startServer = async () => {
  // Establish connection to MongoDB
  await mongoConnect()
  // Grab whatever games we need to get
  
  await checkMidniteFactorData()
  // Start backend server
  server.listen(8000, () => {
    console.log(`Listening on port ${8000}`)
  })
  // Test to see if it will grab games
  // await grabOne()
  await getMoney()
  await setupBet()
  await placeBet()
  cron.schedule('*/3 * * * *', async function() {
    console.log('running a task every min');
    await checkMidniteFactorData()
    await getMoney()
    await setupBet()
    await placeBet()
  });
}

startServer()