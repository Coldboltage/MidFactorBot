const login = async (page) => {
  await page.goto("https://www.midnite.com/login");
  await page.waitForSelector("#formulate--login-1");
  await page.focus("#formulate--login-1");
  await page.keyboard.type(`${process.env.MIDNITE_EMAIL}`);
  await page.focus("#formulate--login-2");
  await page.keyboard.type(`${process.env.MIDNITE_PASSWORD}`);
  await page.click("button:nth-child(2)");
  // TODO, WAIT FOR THE FUCKING PAGE TO LOAD THEN LEAVE THIS HELL SCAPE.
  await page.waitForSelector("[Component=CountUp]");
  return page;
};

module.exports = login;
