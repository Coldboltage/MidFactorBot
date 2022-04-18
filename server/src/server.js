const http = require("http");
const app = require("./app")
require('dotenv').config()


// Modules when server starts
const checkMidniteFactorData = require("./puppeteer/bundle/checkMidniteFactorData.puppeteer")
const {mongoConnect} = require("../services/mongo")
const grabOne = require("../puppeteer/individual/kellyCalculation.puppeteer")

const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect()
  // await checkMidniteFactorData()
  server.listen(8000, () => {
    console.log(`Listening on port ${8000}`)
  })
  await grabOne()
}

startServer()