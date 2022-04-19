const cheerio = require("cheerio");

const grabMoney = async (page) => {
  console.log("Loading website")
  await page.goto("https://midnite.com")
  console.log("waiting for selector to show")
  await page.waitForSelector(
    "[component=CountUp]"
  );
  console.log("calling grabNumber soon")
  const html = await page.content()
  const $ = cheerio.load(html)
  await page.waitForTimeout(200);
  const grabNumber = +$("[component=CountUp]").text().replace("£", "")

  console.log(`The amount is ${grabNumber} for cheerio`);
  return grabNumber
};

module.exports = grabMoney;
