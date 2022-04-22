const betPageJson = async (page) => {
  //I would leave this here as a fail safe
  await page.setExtraHTTPHeaders({
    authorization: `${process.env.BEARER_TOKEN}`
  });
  await page.goto("https://api.midnite.com/v0/bets")
  console.log("loading page")
  await page.waitForTimeout(1000)
  await page.content();
  console.log("I think I'm in the page")

  filteredBets = await page.evaluate(() => {
    const data = JSON.parse(document.querySelector("pre").innerText);
    return data.filter(bet => bet.type === "single")
  });

  console.log(filteredBets)
  return filteredBets
  //I will leave this as an excercise for you to
  //  write out to FS...
};

module.exports = betPageJson;
