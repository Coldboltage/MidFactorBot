const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const checkPage = async (page) => {
  // Check the page for random information. We use bg-matchHeader to wait for the page to load. 
  await grabJSON(page);
  await page.goto("https://www.factor.gg/match/32239/X7-TP");
  await page.waitForSelector(".bg-matchHeader", {
    timeout: 10000,
  });
  const html = await page.content();
  const $ = cheerio.load(html);
  const scoreCard = $(
    ".grid.items-center.my-2.text-xl.font-black.font-heading"
  );
  const homeTeam = $(scoreCard).find(".ml-2").text();
  const awayTeam = $(scoreCard).find(".mr-2").text();

  console.log(homeTeam);
  console.log(awayTeam);
  console.log("################ ENDING CHECK PAGE #####################");
}

module.exports = checkPage;