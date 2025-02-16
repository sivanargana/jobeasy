import express from "express";
import puppeteer from "puppeteer";
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.get("/", async (req, res) => {
  let role = "angular";
  let exp = "fresher";
  let location = "hyderabad";
  let browser = await puppeteer.launch({
    defaultViewport: false,
    headless: true,
    args: ["--disable-blink-features=AutomationControlled", "--disable-web-security"],
  });
  let page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
  await page.goto(`https://www.naukri.com/${role}-jobs-in-hyderabad-secunderabad?experience=0`);
  await page.waitForSelector(".srp-jobtuple-wrapper");
  let naukri = await page.$$eval(".srp-jobtuple-wrapper", (ele) => {
    return ele.map((item) => {
      return {
        title: item.querySelector(".title").textContent,
        link: item.querySelector(".title").href,
        company: item.querySelector(".comp-name").textContent.trim(),
        exp: item.querySelector(".exp-wrap").textContent,
      };
    });
  });
  await page.goto(`https://www.linkedin.com/jobs/search?keywords=${role}&location=Hyderabad&geoId=&distance=25&f_E=2&currentJobId=&position=1&pageNum=0`);
  await page.waitForSelector(".jobs-search__results-list");
  let linkedin = await page.$$eval(".jobs-search__results-list li", (ele) => {
    return ele.map((item) => {
      if (item.querySelector(".base-card__full-link span")) {
        console.log(item.querySelector(".base-card__full-link span").textContent);
      }
      return {
        title: item.querySelector(".base-card__full-link") ? item.querySelector(".base-card__full-link").textContent.trim() : "empty",
        link: item.querySelector(".base-card__full-link") ? item.querySelector(".base-card__full-link").href : "empty",
        company: item.querySelector(".base-search-card__subtitle") ? item.querySelector(".base-search-card__subtitle").textContent.trim() : "empty",
        exp: "Entry Level",
      };
    });
  });
 
  res.render("index", { naukri, linkedin });
 
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
