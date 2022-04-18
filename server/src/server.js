const http = require("http");
const app = require("./app")
const cron = require('node-cron')
require('dotenv').config()


// Modules when server starts
const checkMidniteFactorData = require("./puppeteer/bundle/checkMidniteFactorData.puppeteer")
const {mongoConnect} = require("../services/mongo")
const grabOne = require("../puppeteer/individual/kellyCalculation.puppeteer")

const server = http.createServer(app);

cron.schedule('*/1 * * * *', function() {
  console.log('running a task every min');
  checkMidniteFactorData()
});

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
  await grabOne()
}

startServer()