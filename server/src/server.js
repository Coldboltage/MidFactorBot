const http = require("http");
const checkMidniteFactorData = require("./puppeteer/bundle/checkMidniteFactorData.puppeteer")

const server = http.createServer();

const startServer = async () => {
  await checkMidniteFactorData()
}

startServer()