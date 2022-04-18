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

const server = http.createServer(app);

// cron.schedule('*/10 * * * *', function() {
//   console.log('running a task every min');
//   checkMidniteFactorData()
// });

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
  await setupBet()

}

startServer()