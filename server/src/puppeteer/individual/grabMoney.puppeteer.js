const cheerio = require("cheerio");

const grabMoney = async (page) => {

  await page.goto("https://midnite.com")
  await page.waitForSelector(
    "[component=CountUp]"
  );
  const html = await page.content()
  const $ = cheerio.load(html)
  await page.waitForTimeout(3000);
  const grabNumber = +$("[component=CountUp]").text().replace("£", "")

  console.log(`The amount is ${grabNumber} for cheerio`);
  return grabNumber
};

module.exports = grabMoney;
