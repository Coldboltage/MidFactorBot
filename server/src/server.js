const http = require("http");
const app = require("./app");
const cron = require("node-cron");
require("dotenv").config();

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const pluginProxy = require('puppeteer-extra-plugin-proxy');

puppeteer.use(StealthPlugin());

puppeteer.use(
  pluginProxy({
    address: "154.28.84.12",
    port: 29842,
    credentials: {
      username: `${process.env.MPP_PROXY_USERNAME}`,
      password: `${process.env.MPP_PROXY_PASSWORD}`,
    },
  })
);

// Modules when server starts
const { mongoConnect } = require("../services/mongo");
const { setupBet } = require("./models/matches.model");
// Puppeteer Modules
const checkMidniteFactorData = require("./puppeteer/bundle/checkMidniteFactorData.puppeteer");
const placeBet = require("./puppeteer/bundle/placeBet.puppeteer");

const server = http.createServer(app);

const startServer = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let page = await browser.newPage();
  // Establish connection to MongoDB
  await mongoConnect();
  // Grab whatever games we need to get
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  await checkMidniteFactorData(page);
  await setupBet();
  await placeBet(page, browser);
};

startServer();

cron.schedule("*/30 * * * *", async function () {
  console.log("running a task every min");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let page = await browser.newPage();
  await checkMidniteFactorData(page);
  await setupBet();
  await placeBet(page, browser);
});
