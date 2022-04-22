const getMoneyAmount = async (page) => {
  //I would leave this here as a fail safe
  // await page.setExtraHTTPHeaders({
  //   authorization: `${process.env.BEARER_TOKEN}`,
  // });
  await page.goto("https://api.midnite.com/v0/users");
  console.log("loading page");
  await page.waitForTimeout(2000);
  await page.content();
  console.log("I think I'm in the page");

  moneyAmount = await page.evaluate(() => {
    const data = JSON.parse(document.querySelector("pre").innerText);
    +data.account.balance + +data.account.bonus;
    return +data.account.balance + +data.account.bonus;
  });
  return moneyAmount;

  //I will leave this as an excercise for you to
  //  write out to FS...
};

module.exports = getMoneyAmount;
