const http = require("http");
const app = require("./app");
const cron = require("node-cron");
require("dotenv").config();

// Modules when server starts
const { mongoConnect } = require("../services/mongo");
const { setupBet } = require("./models/matches.model");
// Puppeteer Modules
const checkMidniteFactorData = require("./puppeteer/bundle/checkMidniteFactorData.puppeteer");
const placeBet = require("./puppeteer/bundle/placeBet.puppeteer");

const server = http.createServer(app);

const startServer = async () => {
  // Establish connection to MongoDB
  await mongoConnect();
  // Grab whatever games we need to get
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  await checkMidniteFactorData();
  // Start backend server
  // Test to see if it will grab games
  // await grabOne()
  // await getMoney()
  await setupBet();
  await placeBet();
};

startServer();

cron.schedule("*/10 * * * *", async function () {
  console.log("running a task every min");
  await checkMidniteFactorData();
  // await getMoney()
  await setupBet();
  await placeBet();
});
