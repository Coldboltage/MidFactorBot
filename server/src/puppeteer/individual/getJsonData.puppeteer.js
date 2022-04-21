const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const rp = require("request-promise");


const getJsonData = async (page, name, url, httpRequest, objectName) => {
  // Where the emitter results go into
  const result = []
  page.on("request", async (request) => {
    const test = request.url();
    // Use Axios
    if (
      test.includes(name) &&
      !test.includes("static") &&
      httpRequest === "axios"
    ) {
      // console.log(test);
      const response = await axios(test);
      console.log(objectName)
      const  extractData  = response.data.pageProps.data[objectName];
      result.push(extractData);
    }
    // Use Request
    else if (
      test.includes(name) &&
      !test.includes("static") &&
      httpRequest === "request"
    ) {
      console.log(test);
      try {
        const response = await rp.get(`${test}?page_size=200`);
        const data = JSON.parse(response);
        // console.log(data.data)
        result.push(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  });
  await page.goto(url);
  // Destructure result array as it's own array so no array inception
  const [item1, item2] = result
  return {
    item1, item2
  }
};

module.exports = getJsonData