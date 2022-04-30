const login = async (page) => {
  console.log("entered login puppet");
  await page.setCacheEnabled(true);
  const response = await page.goto("https://www.midnite.com/login", {
    timeout: 0, waitUntil: "networkidle0"
  });
  await page.waitForTimeout(1000)
  console.log("loading loading page");
  await page.waitForSelector("#formulate--login-1");
  await page.focus("#formulate--login-1");
  await page.keyboard.type(`${process.env.MIDNITE_EMAIL}`);
  await page.focus("#formulate--login-2");
  await page.keyboard.type(`${process.env.MIDNITE_PASSWORD}`);
  await page.click("button:nth-child(2)");
  console.log("clicked login");
  // TODO, WAIT FOR THE FUCKING PAGE TO LOAD THEN LEAVE THIS HELL SCAPE.
  console.log("waiting for selector to load");
  await page.waitForSelector("[component=CountUp]");
  console.log("loaded");
  return page;
};

module.exports = login;
