const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const rp = require("request-promise");
const { extract } = require("tar-stream");

const getJsonData = async (page, name, url, httpRequest, objectName) => {
  // Where the emitter results go into
  const result = [];
  await page.on("request", async (request) => {
    // console.log("firing page.once request")
    const test = request.url();
    // Use Axios
    if (
      test.includes(name) &&
      !test.includes("static") &&
      httpRequest === "axios"
    ) {
      console.log(test);
      console.log(objectName)
      const response = await axios(test);
      const extractData = await response.data.pageProps.data[objectName];
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
  console.log("opening page");
  // Destructure result array as it's own array so no array inception
  const [item1] = result;
  return {
    item1
  };
};

module.exports = getJsonData;
