import express from 'express';
import path from 'path';
import puppeteer from "puppeteer"; 
const viewsPath = new URL('./views', import.meta.url).pathname;

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', viewsPath); 
app.get('/', async (req, res) => {

  try {
  const browser = await puppeteer.launch();
const page = await browser.newPage();


await page.goto('https://developer.chrome.com/');

} catch (error) {
  console.error(error);
  res.status(500).send('Something went wrong');
}
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});