import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {

  const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

 
await page.goto('https://developer.chrome.com/');
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});