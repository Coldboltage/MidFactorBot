const login = async (page) => {
  console.log("entered login puppet");
  await page.setCacheEnabled(true);
  await page.waitForTimeout(1000);
  await page.click("#__layout > div > div.top-0 > header > div > div.flex.items-center.justify-end.space-x-1 > div > button.btn.focus\\:outline-none.focus\\:ring-2.focus\\:ring-offset-2.btn--secondary.focus\\:ring-carbon-300.focus\\:ring-offset-carbon-600.btn--s");
  await page.waitForTimeout(1000);
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
